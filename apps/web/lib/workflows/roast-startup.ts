import { getStepMetadata, getWritable, RetryableError } from "workflow"
import {
  createUIMessageStream,
  type ModelMessage,
  type UIMessageChunk,
  AISDKError,
} from "ai"
import { roasterAgent } from "../ai/roaster-agent/agent"

const MAX_RETRIES = 3
const BASE_DELAY_MS = 1000

const agentStep = async (messages: ModelMessage[], retryCount = 0) => {
  "use step"

  const metadata = getStepMetadata()

  const writable = getWritable<UIMessageChunk>()
  const writer = writable.getWriter()

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const result = await roasterAgent.stream({
        messages,
      })

      writer.merge(
        result.toUIMessageStream({
          sendSources: true,
          sendReasoning: true,
        })
      )
    },
  })

  for await (const chunk of stream as unknown as AsyncIterable<UIMessageChunk>) {
    switch (chunk.type) {
      case "error": {
        const { errorText } = chunk
        if (errorText.includes("Rate limit exceeded")) {
          const jitter = Math.random() * 1000
          const retryAfter = Math.ceil(metadata.attempt ** 2 * 5_000 * jitter)

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

export async function roastStartupWorkflow(messages: ModelMessage[]) {
  "use workflow"

  await agentStep(messages)
}
