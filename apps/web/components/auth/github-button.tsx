"use client"

import { useSignIn } from "@clerk/nextjs"
import { Button } from "@workspace/ui/components/button"

export function GitHubButton() {
  const { signIn } = useSignIn()

  async function handleGitHubSignIn() {
    try {
      await signIn.sso({
        strategy: "oauth_github",
        redirectUrl: "/auth/callback",
        redirectCallbackUrl: "/",
      })
    } catch (error) {
      console.error("OAuth error:", error)
    }
  }

  return (
    <Button
      onClick={handleGitHubSignIn}
      className="hidden h-12 w-full border-2 border-border bg-gradient-to-r from-accent-danger via-orange-vibrant to-accent-warning px-6 py-2 text-lg font-bold text-white uppercase shadow-[4px_4px_0px_0px_#7f1d1d] transition-all hover:brightness-105 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none md:block"
      style={{
        boxShadow: "4px 4px 0px 0px rgba(255, 78, 78, 0.5)",
      }}
    >
      Continue with GitHub
    </Button>
  )
}
