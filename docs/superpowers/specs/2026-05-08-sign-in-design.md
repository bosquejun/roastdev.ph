# Sign-In Page Design — RoastDevPH

## Overview

A custom sign-in page for the `/auth/sign-in` route using Clerk for authentication with GitHub OAuth. The page uses the Neo-Brutalist design system with a "Terminal Frame" aesthetic.

## Layout: Terminal Frame

The sign-in page is presented as a "Roast Terminal" — a signature component from the design system.

### Structure

```
┌──────────────────────────────────────┐
│ ● ● ●   AUTH_TERMINAL                │  ← Traffic light header
├──────────────────────────────────────┤
│                                      │
│         🔥 ROAST SESSION              │  ← Header text
│                                      │
│     Access requires authentication   │  ← Body text
│                                      │
│    ┌────────────────────────────┐    │
│    │  Continue with GitHub  🐙  │    │  ← Primary CTA button
│    └────────────────────────────┘    │
│                                      │
│         No account? Join the roast →  │  ← Link to sign-up
│                                      │
└──────────────────────────────────────┘
        ↑ 2px border, hard shadow
```

### Responsive Behavior

- **Desktop:** Terminal frame is centered, max-width 480px, with generous vertical padding
- **Mobile:** Full-width terminal with reduced padding, same structure

## Visual Specifications

### Terminal Frame Container
- Background: `#1A1A1C` (surface)
- Border: `2px solid #2a2a2e`
- Border radius: `0px` (no rounding — brutalist)
- Box shadow: `8px 8px 0px 0px rgba(255, 78, 78, 0.3)` (neo shadow in danger color)
- Padding: `48px` desktop, `24px` mobile

### Traffic Light Header
- Background: `#201f1f`
- Three dots: `#FF4E4E` (red), `#FACC15` (yellow), `#22C55E` (green), 12px each, 8px gap
- Padding: `12px 16px`
- Label: `AUTH_TERMINAL` in `--font-mono`, uppercase, `10px`, `#6b6b6b`

### Content
- Header: `ACCESS REQUIRED` — `--font-heading`, uppercase, `24px`, `#FF4E4E`
- Subtext: `Authenticate to continue your roasting session.` — `--font-body`, `14px`, `#9ca3af`
- Vertical spacing: `24px` between elements

### GitHub Button
- Style: Neo-Brutalist button as per design system
- 2px solid border, uppercase bold text
- Active state: `translate-x-[2px] translate-y-[2px]` with no shadow
- Shadow: `4px 4px 0px 0px rgba(255, 78, 78, 0.5)`
- Icon: GitHub mark (lucide-react `Github` icon)
- Width: `100%` of container
- Height: `48px`

### Footer Link
- Text: `No account? Join the roast →`
- Link to `/auth/sign-up`
- Style: muted text with accent-danger on hover

## Components

### `<SignInTerminal />`
Main container component. Receives Clerk's `SignIn` component or handles redirect.

### `<TerminalHeader />`
Displays the traffic lights and label.

### `<GitHubButton />`
Triggers Clerk's GitHub OAuth flow.

## Route Structure

```
app/
├── auth/
│   ├── sign-in/
│   │   └── page.tsx      ← Sign-in page
│   └── sign-up/
│       └── page.tsx      ← Sign-up page (placeholder for now)
```

## Technical Approach

- Use `ClerkProvider` wrapping the app (already configured or to be added)
- Create custom page component that handles sign-in
- Clerk's `<SignIn>` component will be used but custom-styled via CSS overrides
- For the GitHub button specifically, use Clerk's `useSignIn` hook to trigger OAuth

## Implementation Notes

- The page should NOT include the Navbar and Footer — it's a focused auth experience
- The root layout's decorative rails should be hidden on this page (via layout prop)
- All text follows the Neo-Brutalist brand voice: raw, direct, with personality