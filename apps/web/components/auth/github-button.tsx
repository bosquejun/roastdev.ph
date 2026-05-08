"use client";

import { useSignIn } from "@clerk/nextjs";

export function GitHubButton() {
  const { signIn } = useSignIn();

  async function handleGitHubSignIn() {
    try {
      await signIn.sso({
        strategy: "oauth_github",
        redirectUrl: "/auth/callback",
        redirectCallbackUrl: "/",
      });
    } catch (error) {
      console.error("OAuth error:", error);
    }
  }

  return (
    <button
      onClick={handleGitHubSignIn}
      className="neo-brutal-btn flex w-full items-center justify-center gap-3 bg-[#24292e] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white hover:brightness-110 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
      style={{
        boxShadow: "4px 4px 0px 0px rgba(255, 78, 78, 0.5)",
      }}
    >
      Continue with GitHub
    </button>
  );
}