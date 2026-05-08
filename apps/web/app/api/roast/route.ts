import {
  createUIMessageStreamResponse,
  simulateReadableStream,
  type UIMessageChunk,
} from "ai"
import { start } from "workflow/api"
import {
  roastStartupWorkflow,
  ROAST_CACHE_KEY,
} from "@/lib/workflows/roast-startup"
import {
  ratelimit,
  getClientKey,
  createRateLimitHeaders,
} from "@/lib/rate-limit"

const RATE_LIMIT_LIMIT = 1
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

  const { host }: { host: string } = await req.json()

  const run = await start(roastStartupWorkflow, [{ host }])

  return createUIMessageStreamResponse({
    stream: run.readable,
  })
}
