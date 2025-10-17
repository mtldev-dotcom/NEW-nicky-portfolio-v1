# Brand Style Theme — Nicky Bruno

## Brand Essence
Holographic Modern Technologist. A neon‑mint‑on‑black system that blends creative design with precise engineering. Space Grotesk headlines and Inter body type sit within a glassy, high‑contrast interface lit by calibrated glow, gradients, and micro‑interactions. Animated particles and connecting lines suggest intelligent networks and automated flows, while clear, outcomes‑focused copy keeps the experience human and practical. The overall feel is premium, confident, and future‑forward: a creative technologist's control panel that simplifies complexity and delivers measurable results.

- **Keywords**: innovative, precise, automated, premium, approachable, outcome‑driven
- **Personality**: confident, pragmatic, helpful, calm energy
- **Value promise**: simplify complexity, save time, boost visibility, ship measurable outcomes

---

## Visual Identity

### Color Palette
- **Background**: `#000000` (black)
- **Foreground (text)**: `#FFFFFF` (white)
- **Primary (Neon Mint)**: `#00FFD1`
- **Primary variants**: dark `#00D4AD`, light `#33FFD9`
- **Muted foreground**: `#B0B0B0`
- **Semantic accents**
  - Warning `#FFB800`
  - Error `#FF6B6B`
  - Success reuses Primary

Use the CSS variables already defined in `src/styles/tailwind.css`:
```css
--color-background:#000000; --color-foreground:#FFFFFF;
--color-primary:#00FFD1; --color-neon-mint-dark:#00D4AD; --color-neon-mint-light:#33FFD9;
--color-muted-foreground:#B0B0B0;
--color-warning:#FFB800; --color-error:#FF6B6B;
```

### Shape & Surface
- **Radii**: soft (base `--radius: 8px`) for modern, friendly feel.
- **Surfaces**: glassy panels with subtle blur and neon borders for a premium, dashboard aesthetic.
- **Dividers**: thin, gradient lines (primary tints) as "calibration" accents.

---

## Typography

- **Display/Headings**: Space Grotesk — geometric, confident, contemporary.
- **Body**: Inter — neutral, legible, professional polish.
- **Technical accents**: JetBrains Mono — subtle engineering credibility.
- **Scale** (Tailwind tokens):
  - `text-hero`, `text-display`, `text-heading`, `text-subheading`, `text-body`, `text-caption`, `text-micro`
- **Usage**
  - Headlines: concise, assertive; avoid title case overload.
  - Body: short sentences, scannable lines, outcome‑first phrasing.

Example:
```html
<h1 class="font-space-grotesk text-display leading-tight">Design. Automate. Elevate.</h1>
<p class="font-inter text-body text-muted-foreground">Work smarter and stand out online.</p>
```

---

## Motion Language

- **Signature moves**: soft float/orbit, neon pulse, gentle slide/scale in.
- **Tone**: calm precision; never jittery or playful.
- **Timing**: 0.2–0.8s entrances; longer, low‑amplitude loops for ambience.
- **Accessibility**: honor `prefers-reduced-motion` (already implemented in `src/styles/tailwind.css`).

Examples (Tailwind + Framer Motion classes already present):
- Utility: `animate-glow-pulse`, `transition-smooth`, `glow-neon`, `glow-neon-active`
- Components: holographic particle canvas, magnetic hover for CTAs

---

## Layout & Components

- **Grid**: centered container, generous breathing room (`container.padding: 2rem`, wide 2xl at 1400px).
- **Cards**: dark glass panels with neon borders/shadows; hover elevates subtly.
- **CTAs**: primary mint buttons on black; outline variant with mint border for secondary actions.
- **Stats/Badges**: uppercase, spaced tracking, mint titles, muted labels.

Example CTA:
```html
<button class="glow-neon bg-primary text-primary-foreground rounded-md px-6 py-3 transition-smooth hover:glow-neon-active">
  See My Work
</button>
```

---

## Voice & Messaging

- **Tone**: crisp, benefit‑driven, jargon‑light.
- **Structure**: assertive headline → human subtitle → specific proof/result.
- **Avoid**: deep technical exposition up‑front; save it for case studies and footers.
- **Examples**
  - Headline: "Design. Automate. Elevate."
  - Subtitle: "Powerful digital systems that simplify and scale your business."
  - Proof: "Saves 10+ hours/week"; "45% more bookings in 60 days."

---

## Accessibility & Inclusivity

- **Contrast**: mint on black is for accents and CTAs; avoid using mint for long body text. Prefer white (`foreground`) for paragraphs.
- **Glows**: keep text‑shadow subtle; never use glow as the only contrast source.
- **Motion**: respect `prefers-reduced-motion`; avoid critical information conveyed only via animation.
- **Type**: adequate line-height (`1.5–1.6`) for body; max line length 60–75 chars.

---

## Performance & Quality

- **Animations**: prefer GPU‑friendly transforms; limit heavy box‑shadow repainting on large surfaces.
- **Images**: responsive `sizes`, `loading="eager"` only for the primary hero portrait; otherwise `lazy`.
- **Consistency**: use Tailwind theme tokens and utilities; avoid ad‑hoc colors and timing.

---

## Do / Don't

- **Do**
  - Use mint for emphasis, CTAs, and interaction feedback.
  - Keep layouts spacious; let glow and gradients breathe.
  - Speak to outcomes first; keep copy tight.
- **Don't**
  - Use mint for long paragraphs or dense tables.
  - Stack multiple heavy glows on large elements.
  - Over-animate; the baseline ambience should feel calm.

---

## Quick Snippets

Headline block:
```html
<div>
  <h1 class="font-space-grotesk text-4xl md:text-6xl lg:text-7xl text-foreground">Design. Automate. Elevate.</h1>
  <div class="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full mt-3"></div>
</div>
```

Metric:
```html
<div>
  <div class="font-space-grotesk text-2xl font-bold text-primary">4,000+</div>
  <div class="font-inter text-xs uppercase tracking-wider text-muted-foreground">hours saved</div>
</div>
```

Outline CTA:
```html
<a class="border border-primary/30 text-primary hover:bg-primary/10 rounded-md px-6 py-3 transition-smooth">Book a Discovery Call</a>
```

---

## References (in repo)

- Theme: `tailwind.config.js`
- Tokens & utilities: `src/styles/tailwind.css`
- Base layout: `src/app/layout.tsx`
- Hero & motion: `src/components/sections/hero/*`
- Copy: `src/i18n/messages/en/home.json`
