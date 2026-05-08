import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  UIMessage,
} from "ai"
import { start } from "workflow/api"
import { roastStartupWorkflow } from "@/lib/workflows/roast-startup"
import {
  ratelimit,
  getClientKey,
  createRateLimitHeaders,
} from "@/lib/rate-limit"

const RATE_LIMIT_LIMIT = 10
const RATE_LIMIT_WINDOW = "1m"

export async function POST(req: Request) {
  const key = getClientKey(req)

  const { success, remaining, reset } = await ratelimit.limit(key)

  const headers = createRateLimitHeaders(
    RATE_LIMIT_LIMIT,
    RATE_LIMIT_WINDOW,
    remaining,
    reset,
    success
  )

  if (!success) {
    return new Response("Too many requests. Please try again later.", {
      status: 429,
      headers,
    })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()
  const modelMessages = await convertToModelMessages(messages)

  const run = await start(roastStartupWorkflow, [modelMessages])

  return createUIMessageStreamResponse({
    stream: run.readable,
  })
}
