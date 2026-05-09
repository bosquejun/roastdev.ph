import { NextResponse } from "next/server"
import { isValidUrl, normalizeUrl, resolveRedirects } from "@/lib/url"
import { generateHash } from "@/lib/hash"
import {
  getClientKey,
  createRateLimitHeaders,
  submitRateLimit,
} from "@/lib/rate-limit"

const RATE_LIMIT_LIMIT = 5
const RATE_LIMIT_WINDOW = "1m"

export async function POST(req: Request) {
  const key = getClientKey(req)

  const { success, remaining, reset } = await submitRateLimit.limit(key)

  const headers = createRateLimitHeaders(
    RATE_LIMIT_LIMIT,
    RATE_LIMIT_WINDOW,
    remaining,
    reset,
    success
  )

  if (!success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers }
    )
  }

  const { url } = await req.json()

  if (!url || !isValidUrl(url)) {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400, headers })
  }

  const normalizedUrl = normalizeUrl(url)
  const resolved = await resolveRedirects(normalizedUrl)

  if (!resolved) {
    return NextResponse.json(
      { error: "Could not resolve URL" },
      { status: 400, headers }
    )
  }

  const hash = await generateHash(resolved)

  return NextResponse.json({ hash }, { headers })
}
