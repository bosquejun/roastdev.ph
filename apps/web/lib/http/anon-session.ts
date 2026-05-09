// lib/session.ts
import { NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { cookies } from "next/headers"

interface SetAnonSessionOptions {
  maxAge?: number // seconds
  secure?: boolean
  sameSite?: "lax" | "strict" | "none"
  path?: string
}

export const ANONYMOUS_SESSION_COOKIE_NAME = `anon_roaster`

/**
 * Sets an anonymous session cookie if not already present.
 * Returns a NextResponse object with the cookie set.
 */
export function setAnonSessionCookie(
  res: NextResponse,
  existingSessionId?: string,
  options?: SetAnonSessionOptions
) {
  const sessionId = existingSessionId || `roaster_${nanoid()}`

  res.cookies.set(ANONYMOUS_SESSION_COOKIE_NAME, sessionId, {
    httpOnly: true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
    sameSite: options?.sameSite ?? "lax",
    path: options?.path ?? "/",
    maxAge: options?.maxAge ?? 60 * 60 * 24 * 30, // default 30 days
  })

  return res
}

export const getAnonSessionIdFromCookies = async () => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get(ANONYMOUS_SESSION_COOKIE_NAME)?.value
  return sessionId
}
