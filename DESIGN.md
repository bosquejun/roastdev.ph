# Design System: RoastDevPH (Neo-Brutalist)

This document outlines the design system and visual language used for the **RoastDevPH** application. The aesthetic is inspired by the **Neo-Brutalism** movement, emphasizing raw structural elements, high contrast, and an elite, survival-of-the-fittest energy.

## 1. Visual Language
The brand personality is aggressive, witty, and unapologetically honest. It targets the "hacker" and developer subculture. Key visual traits include:
- **Raw Edges:** 2px solid borders on almost every container.
- **High Contrast:** Deep blacks paired with vibrant semantic accents.
- **Tactile Feedback:** Buttons that shift position on click rather than just changing color.
- **Terminal Aesthetics:** Grid overlays, monospaced-style typography, and window-control "traffic lights."

## 2. Color Palette

### Core Surfaces
- **Background Primary:** `#0F0F10` (The "Ink" black base)
- **Surface Layer:** `#1A1A1C` (Used for cards and sections)
- **Container Secondary:** `#201f1f`

### Semantic Accents
- **Danger (Roast):** `#FF4E4E` (Used for critical failures and primary actions)
- **Warning (Hot Take):** `#FACC15` (Used for scanning status and moderate scores)
- **Success (Respeto):** `#22C55E` (Used for high scores and approval)

### Brand Gradients
- **The "Heat" Gradient:** Linear from `#FF4E4E` (Danger) → `#F97316` (Vibrant Orange) → `#FACC15` (Warning).

## 3. Typography
A dual-font strategy is employed to balance technical precision with readability.

- **Display & Headings:** `Space Grotesk`
  - Style: Bold, often Uppercase, 2px letter-spacing for labels.
  - Used for: Brand logo, hero headers, metric labels, and terminal headers.
- **Body & Content:** `Be Vietnam Pro`
  - Style: Medium weights, italicized blockquotes for the "AI Verdict."
  - Used for: Roast descriptions, community comments, and manifesto text.

## 4. Spacing & Grid
- **Container Max-Width:** `1280px` (7xl)
- **Gutter:** `1.5rem` (24px)
- **Background Grid:** A 40px x 40px grid overlay (`rgba(46, 46, 50, 0.2)`) provides a technical scaffolding.
- **Stack System:**
  - `sm`: 0.5rem (8px)
  - `md`: 1rem (16px)
  - `lg`: 2rem (32px)

## 5. Components & Interactions

### The "Roast Terminal"
The signature container for data display.
- **Header:** Lighter gray bar with three colored dots (Traffic Lights).
- **Body:** Darker surface with a high-contrast preview image (Grayscale by default, color on hover).

### Neo-Brutalist Buttons
- **Style:** 2px solid border, uppercase bold text.
- **Action:** `active:translate-x-[2px] active:translate-y-[2px]` - mimics a physical push-button mechanism.
- **Shadows:** Hard shadows with 0 blur, specifically the "Neo Shadow": `4px 4px 0px 0px rgba(255, 78, 78, 0.5)`.

### Metrics of Shame
- **Bars:** 12px height, dark border, vibrant semantic fill.
- **Glows:** Neon outer glows (e.g., `retro-glow-red`) to emphasize extreme data points.

## 6. Iconography
- **Library:** `lucide-react`
- **Treatment:** Standardized 20px-24px sizing, often using semantic colors (Red for errors, Yellow for alerts).
