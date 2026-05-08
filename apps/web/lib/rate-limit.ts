import { Ratelimit, type Duration } from "@upstash/ratelimit"
import { redis } from "@/lib/redis"

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
export const submitRateLimit = createRateLimiter(5, "1m", "submit")

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
