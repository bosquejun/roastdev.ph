import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import {
  ANONYMOUS_SESSION_COOKIE_NAME,
  setAnonSessionCookie,
} from "./lib/http/anon-session"

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/sign-in(.*)",
  "/auth/sign-up(.*)",
  "/roasted/(.*)",
  "/api/roast",
])

const isWorkflowRoute = createRouteMatcher([
  "/.well-known/workflow(.*)",
  "/api/workflow(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  const existingSessionId = req.cookies.get(
    ANONYMOUS_SESSION_COOKIE_NAME
  )?.value

  if (isWorkflowRoute(req)) {
    return setAnonSessionCookie(NextResponse.next(), existingSessionId)
  }
  if (!isPublicRoute(req)) {
    await auth.protect()
  }

  return setAnonSessionCookie(NextResponse.next(), existingSessionId)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
}
