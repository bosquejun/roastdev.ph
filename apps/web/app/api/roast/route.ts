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
import { redis } from "@/lib/redis"
import objectHash from "object-hash"

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

  const roastKey = `${host}:roasted-message`

  console.log({ roastKey })
  // Check if we have a cached response
  const cached = (await redis.get(roastKey)) as string | null

  console.log(`Has cached roasted: ${Boolean(cached)}`)

  if (cached != null) {
    return new Response(cached, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    })
  }

  const run = await start(roastStartupWorkflow, [{ host }])

  return createUIMessageStreamResponse({
    stream: run.readable,
  })
}
