# Submit Startup Page — Implementation Plan

**Goal:** Build a dedicated submission page with a detailed form capturing company name, URL, description, and focus areas for the startup roasting feature.

**Architecture:** Single-page form with react-hook-form + zod validation, server action for submission, redirect to roast result page on success.

**Tech Stack:** Next.js 16 (App Router), React 19, react-hook-form, zod, lucide-react, @workspace/ui

---

## File Structure

```
apps/web/
├── app/
│   ├── submit/
│   │   └── page.tsx                    # New: Submit page route
│   └── actions/
│       └── submit.ts                  # New: Server action for form submission
├── components/features/submit/
│   └── submit-startup-form.tsx         # New: Main form component
└── lib/
    └── schemas.ts                      # Modify: Add SubmitStartupSchema
```

---

## Task 1: Add SubmitStartupSchema to schemas.ts

**Files:**
- Modify: `apps/web/lib/schemas.ts:1-40`

- [ ] **Step 1: Add the new schema at the end of schemas.ts**

```typescript
// Add after roastFormSchema

export const submitStartupSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  url: z
    .string()
    .min(1, "URL is required")
    .refine(
      (url) => {
        const trimmed = url.trim();
        if (trimmed.startsWith("http://")) return false;
        let urlToCheck = trimmed;
        if (
          !trimmed.startsWith("http://") &&
          !trimmed.startsWith("https://")
        ) {
          urlToCheck = `https://${trimmed}`;
        }
        try {
          const parsed = new URL(urlToCheck);
          if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
            return false;
          }
          const hostname = parsed.hostname;
          if (!hostname.includes(".") || hostname.endsWith(".")) {
            return false;
          }
          return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i.test(urlToCheck);
        } catch {
          return false;
        }
      },
      {
        message: "Please enter a valid URL (e.g., yourstartup.com or https://yourstartup.com)",
      }
    ),
  description: z.string().max(300, "Description must be less than 300 characters").optional().or(z.literal("")),
  focusAreas: z.array(z.string()).default(["overall"]),
});

export type SubmitStartupSchema = z.infer<typeof submitStartupSchema>;
```

- [ ] **Step 2: Verify file compiles**

Run: `cd apps/web && pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/lib/schemas.ts
git commit -m "feat: add submitStartupSchema for startup submission form"
```

---

## Task 2: Create server action for form submission

**Files:**
- Create: `apps/web/app/actions/submit.ts`
- Depend: `apps/web/app/actions/roast.ts:1-30` (for resolveUrl pattern)

- [ ] **Step 1: Create the server action file**

```typescript
"use server";

import { isValidUrl, normalizeUrl, resolveRedirects } from "@/lib/url";
import { generateHash } from "@/lib/hash";

export interface SubmitResult {
  hash: string;
}

export async function submitStartup(formData: FormData): Promise<SubmitResult | null> {
  const url = formData.get("url") as string;

  if (!url || !isValidUrl(url)) {
    return null;
  }

  const normalizedUrl = normalizeUrl(url);
  const resolved = await resolveRedirects(normalizedUrl);

  if (!resolved) {
    return null;
  }

  const hash = await generateHash(resolved);

  return { hash };
}
```

- [ ] **Step 2: Verify file compiles**

Run: `cd apps/web && pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/app/actions/submit.ts
git commit -m "feat: add submitStartup server action"
```

---

## Task 3: Create the SubmitStartupForm component

**Files:**
- Create: `apps/web/components/features/submit/submit-startup-form.tsx`
- Depend: `apps/web/components/features/home/landing-hero.tsx:1-142` (for styling patterns)
- Depend: `apps/web/lib/schemas.ts:40-60` (for SubmitStartupSchema)

- [ ] **Step 1: Create the form component**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { AlertCircle, Loader, Check } from "lucide-react";
import { submitStartup } from "@/app/actions/submit";
import { SubmitStartupSchema, submitStartupSchema } from "@/lib/schemas";

const FOCUS_OPTIONS = [
  { id: "overall", label: "Overall First Impression" },
  { id: "ux", label: "UX/UI Design" },
  { id: "pricing", label: "Pricing & Value" },
  { id: "copy", label: "Copy & Messaging" },
  { id: "onboarding", label: "Onboarding Flow" },
  { id: "mobile", label: "Mobile Experience" },
];

export function SubmitStartupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SubmitStartupSchema>({
    resolver: zodResolver(submitStartupSchema),
    defaultValues: {
      focusAreas: ["overall"],
    },
    mode: "onChange",
  });

  const description = watch("description") || "";
  const charCount = description.length;

  const onSubmit = async (data: SubmitStartupSchema) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.set("url", data.url);
    formData.set("companyName", data.companyName);
    formData.set("description", data.description || "");
    formData.set("focusAreas", JSON.stringify(data.focusAreas));

    const result = await submitStartup(formData);

    if (result) {
      router.push(`/roasted/${result.hash}`);
    }

    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Company Name */}
      <div className="space-y-2">
        <label
          htmlFor="companyName"
          className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary)"
        >
          Company/Product Name
        </label>
        <Input
          id="companyName"
          {...register("companyName")}
          placeholder="RocketPH, KonekTok, PayMaya..."
          className="w-full bg-(--bg-surface) h-12 border-2 border-(--border-muted) px-4 py-3 text-sm font-medium focus:border-(--accent-warning) focus:ring-0 outline-none transition-colors"
        />
        {errors.companyName && (
          <div className="flex items-center gap-2 text-(--accent-danger) text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.companyName.message}</span>
          </div>
        )}
      </div>

      {/* Website URL */}
      <div className="space-y-2">
        <label
          htmlFor="url"
          className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary)"
        >
          Website URL
        </label>
        <Input
          id="url"
          {...register("url")}
          placeholder="https://yourstartup.com"
          type="text"
          className="w-full bg-(--bg-surface) h-12 border-2 border-(--border-muted) px-4 py-3 text-sm font-medium focus:border-(--accent-warning) focus:ring-0 outline-none transition-colors"
        />
        {errors.url && (
          <div className="flex items-center gap-2 text-(--accent-danger) text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errors.url.message}</span>
          </div>
        )}
      </div>

      {/* Short Description */}
      <div className="space-y-2">
        <label
          htmlFor="description"
          className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary)"
        >
          Short Description
        </label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="A P2P payments app for rural Philippines..."
          className="w-full bg-(--bg-surface) border-2 border-(--border-muted) px-4 py-3 text-sm font-medium focus:border-(--accent-warning) focus:ring-0 outline-none transition-colors min-h-[100px] resize-none"
        />
        <div className="flex justify-between items-center">
          {errors.description && (
            <div className="flex items-center gap-2 text-(--accent-danger) text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errors.description.message}</span>
            </div>
          )}
          <span className={`text-xs ml-auto ${charCount > 270 ? "text-(--accent-warning)" : "text-(--text-secondary)"}`}>
            {charCount}/300
          </span>
        </div>
      </div>

      {/* What to Focus On */}
      <div className="space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
          What to Focus On (Optional)
        </label>
        <div className="grid grid-cols-2 gap-3">
          {FOCUS_OPTIONS.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                value={option.id}
                {...register("focusAreas")}
                className="w-5 h-5 rounded border-2 border-(--border-muted) bg-(--bg-surface) checked:bg-(--accent-danger) checked:border-(--accent-danger) focus:ring-0 cursor-pointer"
              />
              <span className="text-sm font-medium text-(--text-primary) group-hover:text-(--accent-warning) transition-colors">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-(--accent-danger) h-14 text-white font-bold px-8 py-4 border-2 border-(--accent-danger) active:translate-y-1 active:translate-x-[2px] transition-all hover:bg-opacity-90 uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:translate-x-0"
      >
        {isSubmitting ? (
          <>
            <Loader className="w-5 h-5 animate-spin mr-2" />
            Roasting...
          </>
        ) : (
          <>
            <span className="mr-2">🔥</span>
            GET MY ROAST
          </>
        )}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `cd apps/web && pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/features/submit/submit-startup-form.tsx
git commit -m "feat: add SubmitStartupForm component"
```

---

## Task 4: Create the submit page route

**Files:**
- Create: `apps/web/app/submit/page.tsx`
- Depend: `apps/web/components/features/submit/submit-startup-form.tsx` (from Task 3)
- Depend: `apps/web/components/shared/navbar.tsx` (for layout)
- Depend: `apps/web/components/shared/footer.tsx` (for layout)

- [ ] **Step 1: Create the page file**

```tsx
import { SubmitStartupForm } from "@/components/features/submit/submit-startup-form";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

export default function SubmitPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-16 px-4">
        <div className="max-w-xl mx-auto">
          {/* Terminal-style header */}
          <div className="mb-8">
            <div className="bg-(--bg-surface) border-2 border-(--border-muted) rounded-t-lg overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2 bg-(--bg-surface-elevated) border-b border-(--border-muted)">
                <div className="w-3 h-3 rounded-full bg-(--accent-danger)" />
                <div className="w-3 h-3 rounded-full bg-(--accent-warning)" />
                <div className="w-3 h-3 rounded-full bg-(--accent-success)" />
                <span className="ml-3 text-xs font-bold uppercase tracking-wider text-(--text-secondary)">
                  submit_startup.exe
                </span>
              </div>
              <div className="p-6 text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 uppercase italic">
                  Submit Your Startup
                </h1>
                <p className="text-(--text-secondary) font-medium">
                  Enter your details below and get ready for a brutal but constructive roast from the Filipino builder community.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-(--bg-surface) border-2 border-(--border-muted) rounded-lg p-6">
            <SubmitStartupForm />
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-xs text-(--text-secondary)">
            We scan your landing page and generate a detailed roast based on UX, copy, pricing, and first impressions.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verify file compiles**

Run: `cd apps/web && pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Run the app and test manually**

Run: `pnpm dev` (from root)
Navigate to: `http://localhost:3000/submit`
Verify: Page loads, form renders, all fields visible

- [ ] **Step 4: Test form submission**

Fill in all fields and submit. Verify it redirects to `/roasted/[hash]`

- [ ] **Step 5: Commit**

```bash
git add apps/web/app/submit/page.tsx
git commit -m "feat: add /submit page route"
```

---

## Task 5: Add navigation link to navbar

**Files:**
- Modify: `apps/web/components/shared/navbar.tsx`

- [ ] **Step 1: Add Submit link to navbar**

Find the nav links section and add:

```tsx
<Link
  href="/submit"
  className="text-sm font-bold uppercase tracking-wider hover:text-(--accent-danger) transition-colors"
>
  Submit
</Link>
```

- [ ] **Step 2: Verify file compiles**

Run: `cd apps/web && pnpm typecheck`
Expected: No errors

- [ ] **Step 3: Commit**

```bash
git add apps/web/components/shared/navbar.tsx
git commit -m "feat: add submit link to navbar"
```

---

## Verification

After all tasks, run:

```bash
cd apps/web && pnpm typecheck && pnpm lint
```

Expected: All checks pass

---

**Plan complete and saved to `docs/superpowers/plans/2025-05-07-submit-startup-plan.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

Which approach?