# Submit Startup Page — Design Spec

**Date:** 2025-05-07
**Status:** Approved

## Overview

A dedicated page for Filipino startup founders to submit their products for brutal but constructive roasting. Goes beyond the quick URL-only submission on the home page by capturing company info, context, and specific feedback focus areas.

---

## Layout & Structure

- Single centered column, max-width 640px
- Terminal-style container with traffic-light dots header
- Page header above form: "SUBMIT YOUR STARTUP" in Space Grotesk bold uppercase
- Brief subhead explaining what happens next
- Form below header, CTA button at bottom

---

## Form Fields

### 1. Company/Product Name
- **Type:** Text input
- **Validation:** Required, 2–100 characters
- **Placeholder:** "RocketPH", "KonekTok", "PayMaya..."

### 2. Website URL
- **Type:** URL input
- **Validation:** Required, must be valid URL format (https:// preferred)
- **Placeholder:** "https://yourstartup.com"

### 3. Short Description
- **Type:** Textarea
- **Validation:** Optional, max 300 characters
- **Placeholder:** "A P2P payments app for rural Philippines..."
- **UX:** Live character counter below field (e.g., "0/300")

### 4. What to Focus On
- **Type:** Multi-select checkboxes
- **Validation:** Optional
- **Default:** "Overall First Impression" pre-checked
- **Options:**
  - Overall First Impression (default, pre-checked)
  - UX/UI Design
  - Pricing & Value
  - Copy & Messaging
  - Onboarding Flow
  - Mobile Experience

---

## Visual States

### Default State
- All fields visible, single stacked form
- Terminal header with colored dots (red, yellow, green)

### Field Focus
- Input border changes to `--accent-warning` (yellow) on focus
- No shadow, just border color change

### Error State
- Red border on invalid field
- Inline error message below field in red
- Error icon (AlertCircle) next to message

### Loading State
- Submit button shows spinner (Loader icon) + "Roasting..."
- Button disabled, pointer-events none
- Form inputs disabled

### Success State
- Redirect to `/roasted/{hash}`

---

## Component: SubmitStartupForm

**Location:** `apps/web/components/features/submit/submit-startup-form.tsx`

**Props:** None (client component with internal state)

**Dependencies:**
- `react-hook-form` for form management
- `zod` + `@hookform/resolvers/zod` for validation
- `lucide-react` for icons (Loader, AlertCircle, Flame)
- UI components from `@workspace/ui`

---

## Validation Schema (Zod)

```ts
const SubmitStartupSchema = z.object({
  companyName: z.string().min(2).max(100),
  url: z.string().url(),
  description: z.string().max(300).optional(),
  focusAreas: z.array(z.string()).default(["overall"])
});
```

---

## Error Handling

- Inline errors appear below the relevant field on blur or submit attempt
- Red border highlights invalid fields
- Network errors trigger toast notification
- All errors are user-friendly, not technical

---

## Responsiveness

- Full-width on mobile (padding 16px)
- Centered column on tablet and up
- Max-width 640px on desktop

---

## Micro-interactions

- Button: `active:translate-y-1` on click (neo-brutalist push)
- Checkbox: Custom styled with accent color
- Character counter: Updates in real-time
- Focus ring: Yellow border, no glow

---

## Redirect Logic

On successful submit:
1. Show loading state
2. Call server action `submitStartup(formData)`
3. Receive `{ hash: string }`
4. Redirect to `/roasted/{hash}`

---

## Page Route

**Route:** `/submit` (or `/submit-startup`)
**File:** `apps/web/app/submit/page.tsx`

---

## Related Files

- Form component: `apps/web/components/features/submit/submit-startup-form.tsx`
- Server action: `apps/web/app/actions/submit.ts`
- Schema: `apps/web/lib/schemas/submit.ts` (extend existing schemas)
- Page: `apps/web/app/submit/page.tsx`