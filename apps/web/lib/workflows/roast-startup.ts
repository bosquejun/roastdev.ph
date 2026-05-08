import { getStepMetadata, getWritable, RetryableError } from "workflow"
import { createUIMessageStream, type UIMessageChunk } from "ai"
import { roasterAgent } from "../ai/roaster-agent/agent"
import { redis } from "../redis"

const agentStep = async ({ host }: { host: string }) => {
  "use step"
  const cacheKey = `${host}:roasted-message`

  console.log({ cacheKey })

  const metadata = getStepMetadata()

  const writable = getWritable<UIMessageChunk>()
  const writer = writable.getWriter()

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = await roasterAgent.stream({
        messages: [
          {
            role: "user",
            content: `Roast this startup's landing page ${host}. Seven beats. No mercy. Sige na.`,
          },
        ],
      })

      writer.merge(
        result.toUIMessageStream({
          sendSources: true,
          sendReasoning: true,
          async onFinish({ messages }) {
            console.log(`Finished roasting. Storing cache. ${cacheKey}`)
            // Cache the response text:
            await redis.set(cacheKey, messages)
          },
        })
      )
    },
  })

  for await (const chunk of stream as unknown as AsyncIterable<UIMessageChunk>) {
    switch (chunk.type) {
      case "error": {
        const { errorText } = chunk
        if (errorText.includes("Rate limit exceeded")) {
          const retryAfter = Math.ceil(metadata.attempt ** 2 * 5_000)

          throw new RetryableError(
            `Roasting Error due to rate limit. Backing off for ${retryAfter / 1000}s...`,
            {
              retryAfter,
            }
          )
        }
      }
    }
    await writer.write(chunk)
  }

  await writer.close()
}

export async function roastStartupWorkflow({ host }: { host: string }) {
  "use workflow"

  await agentStep({ host })
}
