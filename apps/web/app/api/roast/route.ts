import { createUIMessageStreamResponse } from "ai"
import { getRun, start } from "workflow/api"
import { checkRoastRateLimit, createRateLimitHeaders } from "@/lib/rate-limit"
import { redis } from "@/lib/redis"
import { roastStartupWorkflow } from "@/lib/workflows/roast-startup"

export async function POST(req: Request) {
  const { host }: { host: string } = await req.json()

  const { success, remaining, reset, limit, window } =
    await checkRoastRateLimit(req)

  const cached = await redis.get(`${host}:roasted-message`)

  if (!cached) {
    const headers = createRateLimitHeaders(
      limit,
      window,
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
  }

  const cachedWorkflowRunId = await redis.get<string>(`${host}:workflow-run-id`)

  async function startWorkflow() {
    const run = await start(roastStartupWorkflow, [{ host }])

    await redis.set(`${host}:workflow-run-id`, run.runId)

    return createUIMessageStreamResponse({
      stream: run.readable,
    })
  }

  if (cachedWorkflowRunId !== null) {
    const run = getRun(cachedWorkflowRunId)

    const status = await run.status

    if (["cancelled", "error"].includes(status)) {
      return await startWorkflow()
    } else {
      console.log(`resuming workflow stream...`)
      const readable = run.getReadable()

      return createUIMessageStreamResponse({
        stream: readable,
      })
    }
  } else {
    return await startWorkflow()
  }
}
