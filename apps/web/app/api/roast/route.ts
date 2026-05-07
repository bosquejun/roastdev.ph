import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai"
import { start } from "workflow/api"
import { roastStartupWorkflow } from "@/lib/workflows/roast-startup"

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const modelMessages = await convertToModelMessages(messages)

  const run = await start(roastStartupWorkflow, [modelMessages])

  return createUIMessageStreamResponse({
    stream: run.readable,
  })
}
