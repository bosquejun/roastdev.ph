import { getWritable } from "workflow"
import {
  createUIMessageStream,
  type ModelMessage,
  type UIMessageChunk,
} from "ai"
import { roasterAgent } from "../ai/roaster-agent/agent"

const agentStep = async (messages: ModelMessage[]) => {
  "use step"

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
    if (chunk.type === "tool-output-available") {
      console.log("Scraped Data:", chunk.output)
      // You can process the data here or send it to another service
    }
    await writer.write(chunk)
  }

  await writer.close()
}

export async function roastStartupWorkflow(messages: ModelMessage[]) {
  "use workflow"

  await agentStep(messages)
}
