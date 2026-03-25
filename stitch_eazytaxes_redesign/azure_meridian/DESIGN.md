# Design System Specification

## 1. Overview & Creative North Star: "The Architectural Ledger"

This design system is built to transform complex financial data into a high-end editorial experience. Moving away from the cluttered, "dashboard-heavy" aesthetics typical of the fintech sector, we embrace a Creative North Star titled **"The Architectural Ledger."**

This concept treats the digital canvas as a premium architectural space. We prioritize structural clarity, intentional white space, and a sophisticated interplay between deep, authoritative teals and vibrant, kinetic oranges. The system breaks the "template" look by utilizing asymmetrical layouts, large-scale serif typography, and a "tonal layering" approach that removes the need for traditional borders and lines.

**Key Aesthetic Principles:**
*   **Editorial Authority:** High-contrast typography scales that mirror a bespoke financial journal.
*   **Layered Sophistication:** Depth is communicated through color blocks and semi-transparent surfaces rather than shadows.
*   **Kinetic Accents:** Orange (`#FFA022`) is used sparingly but with high impact to guide the eye and signify action.

---

## 2. Colors

The palette is anchored by deep, immersive teals that provide a sense of stability, contrasted by a luminous orange for primary interaction points.

### Primary Palette (The Deep End)
*   **Primary (`#002839`):** Our foundational brand color. Used for large headers and background blocks.
*   **Primary Container (`#043F56`):** The primary surface for content containers.
*   **Secondary (`#895100`):** Used for critical highlights and CTA text.
*   **Secondary Container (`#FFA024`):** The "Attention" color. Reserved for primary CTAs and success states.

### Surface & Depth (The "No-Line" Rule)
In this design system, **1px solid borders are strictly prohibited for sectioning.** Hierarchy must be established via color shifts:
*   **Surface (`#F5FAFF`):** The base background for the entire page.
*   **Surface Container Low (`#E9F5FF`):** Used for subtle sectioning transitions.
*   **Surface Container Highest (`#C5E7FF`):** Used for nested cards and utility elements.

### The "Glass & Gradient" Rule
To add visual "soul," use subtle gradients for Hero sections transitioning from `primary` to `primary_container`. For floating navigational elements, apply Glassmorphism:
*   **Background:** `surface_container_lowest` at 70% opacity.
*   **Backdrop Filter:** `blur(12px)`.
*   **Signature Texture:** A very low-opacity noise grain can be applied over deep teal blocks to mimic high-quality matte paper.

---

## 3. Typography

The typography strategy pairs the elegance of **Noto Serif** (Display/Headlines) with the technical precision of **Inter** (Body) and **Work Sans** (Labels).

*   **Display (Noto Serif):** Set at `3.5rem` with a `-0.02em` letter spacing. This is the "voice" of the brand—authoritative and elegant.
*   **Headlines (Noto Serif):** Used for section titles. The contrast between the serif headlines and the clean background creates a high-end editorial feel.
*   **Body (Inter):** All body text uses Inter at `1rem` for the `body-lg` tier. We prioritize legibility and generous line-height (`1.6`).
*   **Labels (Work Sans):** Used for small metadata or chip text. These should be set in All Caps with `+0.05em` tracking to maintain a modern, professional edge.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A card (`surface_container_lowest`) sits on a section background (`surface_container_low`). This creates a soft, natural lift.
*   **Ambient Shadows:** If a floating effect is required (e.g., a modal), use an ultra-diffused shadow: `box-shadow: 0 20px 50px rgba(0, 30, 45, 0.08)`. The shadow color should always be a tint of the `on_surface` color, never pure black.
*   **The "Ghost Border" Fallback:** If a container requires definition against an identical background, use a "Ghost Border": `outline_variant` at 15% opacity. Never use 100% opaque borders.

---

## 5. Components

### Buttons
*   **Primary:** Solid `secondary_container` (`#FFA024`) with `on_secondary_container` (`#693D00`) text. Roundedness: `md` (`0.375rem`).
*   **Secondary:** Ghost style. No background, `outline` colored border (at 20% opacity), and `primary` text.
*   **States:** On hover, primary buttons should shift +10% in brightness; no scale transforms.

### Cards & Lists
*   **Cards:** No borders. Use `surface_container_highest` background. Padding must be generous (Spacing `6` or `8`).
*   **Dividers:** Forbidden. Use vertical white space (Spacing `4` or `5`) to separate list items. If a separator is mandatory, use a subtle 10% opacity `outline-variant` horizontal rule that does not span the full width of the container.

### Input Fields
*   **Styling:** Minimalist. A simple underline using `outline_variant` that transitions to `secondary` on focus.
*   **Labels:** Always use `label-md` (Work Sans) positioned above the input, never as placeholder text.

### Progress Indicators (Custom)
*   **The "Financial Path":** As seen in the reference, use a `secondary_fixed_dim` (`#FFB86B`) path line to connect related content blocks, creating a visual narrative through the page.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins. Offsetting a headline to the left while keeping body text centered creates a "custom" look.
*   **Do** use large spacing values (Spacing `16`, `20`, `24`) between major sections to let the content breathe.
*   **Do** use Serif Italics for emphasis within headlines to add a sense of personality and "tailored" advice.

### Don’t
*   **Don’t** use pure black `#000000` for text. Use `on_surface` (`#001E2D`) to maintain the teal-dominant tonal integrity.
*   **Don’t** use standard "Material" elevation shadows. They look "app-like" and degrade the premium editorial feel.
*   **Don’t** crowd the orange. Orange is a "fire" element; if overused, the design loses its professional composure. Keep it for conversion points only.