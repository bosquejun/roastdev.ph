import { redis } from "@/lib/redis"
import { type LanguageModelMiddleware, simulateReadableStream } from "ai"
import objectHash from "object-hash"

export const cachedResponseMiddleware: LanguageModelMiddleware = {
  specificationVersion: "v3",
  wrapStream: async ({ doStream, params }) => {
    const cacheKey = objectHash(params)

    // Check if the result is in the cache
    const cached = await redis.get(cacheKey)

    // If cached, return a simulated ReadableStream that yields the cached result
    if (cached !== null) {
      // Format the timestamps in the cached response
      const formattedChunks = (cached as any[]).map((p) => {
        if (p.type === "response-metadata" && p.timestamp) {
          return { ...p, timestamp: new Date(p.timestamp) }
        } else return p
      })
      return {
        stream: simulateReadableStream({
          initialDelayInMs: 0,
          chunkDelayInMs: 20,
          chunks: formattedChunks,
        }),
      }
    }

    // If not cached, proceed with streaming
    const { stream, ...rest } = await doStream()

    const fullResponse: any[] = []

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        fullResponse.push(chunk)
        controller.enqueue(chunk)
      },
      flush() {
        // Store the full response in the cache after streaming is complete
        redis.set(cacheKey, fullResponse)
      },
    })

    return {
      stream: stream.pipeThrough(transformStream),
      ...rest,
    }
  },
}
