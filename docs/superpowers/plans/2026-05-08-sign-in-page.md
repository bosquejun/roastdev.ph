# Sign-In Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create a custom sign-in page at `/auth/sign-in` with GitHub OAuth via Clerk, using the Neo-Brutalist Terminal Frame design.

**Architecture:** A custom page component renders a Terminal Frame UI with a GitHub sign-in button. Clerk's `useSignIn` hook handles the OAuth flow. The page is isolated from the main layout (no navbar/footer).

**Tech Stack:** Next.js 16 (App Router), Clerk, shadcn/ui, Tailwind CSS

---

## File Structure

```
apps/web/
├── app/
│   ├── auth/
│   │   ├── sign-in/
│   │   │   └── page.tsx          ← Sign-in page (creates)
│   │   └── (auth)/
│   │       └── layout.tsx        ← Auth layout without navbar/footer (creates)
│   ├── layout.tsx                ← Modify: hide rails on auth routes
├── components/
│   └── auth/
│       ├── sign-in-terminal.tsx   ← Terminal frame component (creates)
│       └── github-button.tsx      ← GitHub OAuth button (creates)
└── lib/
    └── clerk.ts                   ← Clerk instance (creates)
```

---

## Task 1: Install Clerk

**Files:**
- Modify: `apps/web/package.json`

- [ ] **Step 1: Add Clerk dependencies**

Run: `cd /home/junbosque/roastdev.ph && pnpm add @clerk/nextjs`
Expected: Installs `@clerk/nextjs` and adds to dependencies

- [ ] **Step 2: Verify installation**

Run: `pnpm list @clerk/nextjs`
Expected: Shows installed version

---

## Task 2: Create Clerk Configuration

**Files:**
- Create: `apps/web/lib/clerk.ts`

- [ ] **Step 1: Create Clerk instance file**

```typescript
import { ClerkProvider } from "@clerk/nextjs";

export function ClerkClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      {children}
    </ClerkProvider>
  );
}
```

- [ ] **Step 3: Create `.env.local` template**

Run: `cat >> apps/web/.env.example << 'EOF'
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
EOF`

---

## Task 3: Create Auth Layout

**Files:**
- Create: `apps/web/app/auth/(auth)/layout.tsx`

- [ ] **Step 1: Create auth layout without navbar/footer**

```tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Verify layout structure**

File should exist at `apps/web/app/auth/(auth)/layout.tsx`

---

## Task 4: Create Terminal Frame Component

**Files:**
- Create: `apps/web/components/auth/sign-in-terminal.tsx`

- [ ] **Step 1: Create the Terminal Frame component**

```tsx
import { Github } from "lucide-react";

interface SignInTerminalProps {
  children?: React.ReactNode;
}

export function SignInTerminal({ children }: SignInTerminalProps) {
  return (
    <div className="w-full max-w-md">
      {/* Terminal Window */}
      <div className="border-2 border-border bg-card shadow-[8px_8px_0px_0px_rgba(255,78,78,0.3)]">
        {/* Traffic Light Header */}
        <div className="flex items-center gap-2 bg-muted px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#ff5f56]" />
            <div className="size-3 rounded-full bg-[#ffbd2e]" />
            <div className="size-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            AUTH_TERMINAL
          </span>
        </div>

        {/* Content */}
        <div className="px-8 py-10 space-y-6">
          {children}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify component exists**

File should exist at `apps/web/components/auth/sign-in-terminal.tsx`

---

## Task 5: Create GitHub Button Component

**Files:**
- Create: `apps/web/components/auth/github-button.tsx`

- [ ] **Step 1: Create GitHub OAuth button**

```tsx
"use client";

import { useSignIn } from "@clerk/nextjs";
import { Github } from "lucide-react";
import { useRouter } from "next/navigation";

export function GitHubButton() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  async function handleGitHubSignIn() {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_github",
        redirectUrl: "/auth/callback",
        redirectUrlComplete: "/",
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
      <Github className="size-5" />
      Continue with GitHub
    </button>
  );
}
```

---

## Task 6: Create Sign-In Page

**Files:**
- Create: `apps/web/app/auth/sign-in/page.tsx`

- [ ] **Step 1: Create the sign-in page**

```tsx
import { SignIn } from "@clerk/nextjs";
import { GitHubButton } from "@/components/auth/github-button";
import { SignInTerminal } from "@/components/auth/sign-in-terminal";
import Link from "next/link";

export default function SignInPage() {
  return (
    <SignInTerminal>
      {/* Header */}
      <div className="text-center">
        <h1 className="font-heading text-2xl font-bold uppercase tracking-wide text-accent-danger">
          Access Required
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Authenticate to continue your roasting session.
        </p>
      </div>

      {/* GitHub Button */}
      <GitHubButton />

      {/* Footer Link */}
      <div className="text-center">
        <p className="font-body text-sm text-muted-foreground">
          No account?{" "}
          <Link
            href="/auth/sign-up"
            className="text-accent-warning transition-colors hover:text-accent-danger"
          >
            Join the roast →
          </Link>
        </p>
      </div>
    </SignInTerminal>
  );
}
```

- [ ] **Step 2: Verify page structure**

File should exist at `apps/web/app/auth/sign-in/page.tsx`

---

## Task 7: Configure Environment Variables

**Files:**
- Modify: `apps/web/.env.local` (create if doesn't exist)

- [ ] **Step 1: Create .env.local with placeholder keys**

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_placeholder
CLERK_SECRET_KEY=sk_test_placeholder
```

---

## Task 8: Add TypeScript Path Alias

**Files:**
- Modify: `apps/web/tsconfig.json`

- [ ] **Step 1: Verify @/components/auth alias works**

Run: `cd /home/junbosque/roastdev.ph/apps/web && pnpm typecheck`
Expected: No errors related to imports

---

## Verification Checklist

- [ ] Sign-in page accessible at `/auth/sign-in`
- [ ] Terminal frame displays with traffic lights
- [ ] GitHub button triggers OAuth flow
- [ ] No navbar/footer on auth pages
- [ ] Design matches Neo-Brutalist system (2px borders, hard shadows, brand colors)

---

**Plan complete.** Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?