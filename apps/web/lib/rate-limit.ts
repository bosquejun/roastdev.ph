import { Ratelimit, type Duration } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"
import { getAnonSessionIdFromCookies } from "@/lib/http/anon-session"

export function createRateLimiter(
  limit: number,
  window: Duration,
  prefix?: string
) {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix,
    analytics: true,
  })
}

export const ratelimit = createRateLimiter(10, "1m")
export const submitRateLimit = createRateLimiter(1, "4h", "submit")

export const anonSessionRateLimit = createRateLimiter(1, "1d", "anon-session")
export const clientKeyRateLimit = createRateLimiter(3, "1d", "client-key")

export function getClientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0]!.trim()
  }
  const realIp = req.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }
  const cfConnectingIP = req.headers.get("cf-connecting-ip")
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  return "anonymous"
}

export function createRateLimitHeaders(
  limit: number,
  window: string,
  remaining: number,
  reset: number,
  success: boolean
): Headers {
  const headers = new Headers()
  headers.set("X-RateLimit-Limit", String(limit))
  headers.set("X-RateLimit-Window", window)

  if (success) {
    headers.set("X-RateLimit-Remaining", String(remaining))
    headers.set("X-RateLimit-Reset", String(reset))
  } else {
    headers.set("Retry-After", "60")
    headers.set("X-RateLimit-Remaining", "0")
    headers.set("X-RateLimit-Reset", String(reset))
  }

  return headers
}

export type RateLimiter = {
  limit: (
    key: string
  ) => Promise<{ success: boolean; remaining: number; reset: number }>
}

export async function checkLayeredRateLimit(
  limiters: Array<{
    limiter: RateLimiter
    key: string
    limit: number
    window: string
  }>,
  options: { exitOnSuccess?: boolean } = {}
): Promise<{
  success: boolean
  remaining: number
  reset: number
  limit: number
  window: string
}> {
  let lastResult: { remaining: number; reset: number } | null = null
  for (const { limiter, key, limit, window } of limiters) {
    if (!key) continue

    const result = await limiter.limit(key)

    lastResult = result

    if (!result.success) {
      return {
        success: false,
        remaining: 0,
        reset: result.reset,
        limit,
        window,
      }
    }
    if (options.exitOnSuccess) {
      return {
        success: true,
        remaining: result.remaining,
        reset: result.reset,
        limit,
        window,
      }
    }
  }

  const last = limiters[limiters.length - 1]!
  return {
    success: true,
    remaining: lastResult?.remaining ?? 0,
    reset: lastResult?.reset ?? 0,
    limit: last.limit,
    window: last.window,
  }
}

export async function checkRoastRateLimit(req: Request) {
  const sessionId = await getAnonSessionIdFromCookies()
  const clientKey = getClientKey(req)

  return checkLayeredRateLimit(
    [
      {
        limiter: anonSessionRateLimit,
        key: sessionId ?? "",
        limit: 1,
        window: "1d",
      },
      { limiter: clientKeyRateLimit, key: clientKey, limit: 3, window: "1d" },
    ],
    { exitOnSuccess: true }
  )
}
