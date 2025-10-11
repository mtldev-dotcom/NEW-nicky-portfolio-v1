# Nicky Bruno Portfolio

A polished portfolio site for creative technologist Nicky Bruno, built with **Next.js 14** and **TypeScript**.  
The project showcases modular sections (Hero, About, Services, Portfolio, Testimonials, Contact) with rich visuals, motion design, and responsive layouts.

---

## Tech Stack

- **Next.js 14 (Pages Router)** – hybrid rendering, file-based routing, SEO helpers  
- **TypeScript** – typed components and utilities for safer refactors  
- **Tailwind CSS** – utility-first styling with custom design tokens  
- **Framer Motion** – animations and subtle UI motion effects  
- **Lucide Icons** – iconography with the `AppIcon` wrapper  
- **Redux Toolkit / React Hook Form / D3 / Recharts** – utilities available for advanced UI and data scenarios

---

## Getting Started

### Prerequisites

- Node.js **18.x** or newer (match the version used by Next.js 14)  
- npm (bundled with Node)

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to view the site while you work.

### Production Build & Preview

```bash
npm run build
npm start        # serves the production build on port 3000
```

### Linting

```bash
npm run lint
```

> The project currently disables type-checking (`// @ts-nocheck`) in components with complex Framer Motion usage.  
> Remove these directives gradually as you introduce typed motion helpers.

---

## Project Structure

```
.
├── public/                  # Static assets (images, favicons, etc.)
├── src/
│   ├── components/          # Reusable UI primitives (buttons, inputs, icons, etc.)
│   ├── pages/               # Next.js Pages Router entries and section subdirectories
│   ├── styles/              # Global CSS (Tailwind + base styles)
│   └── utils/               # Shared utilities (e.g., Tailwind merge helper)
├── tsconfig.json            # TypeScript configuration with path aliases (@/*, components/*, styles/*)
├── next.config.mjs          # Next.js configuration
└── package.json             # Scripts and dependencies
```

Notable route folders under `src/pages`:

- `hero-experience` – landing page experience (also exported as the home page)  
- `about-section`, `services-section`, `portfolio-section`, `testimonials-section`, `contact-section` – individual long-form sections  
- `components/...` directories nested under each route contain section-specific UI

---

## Styling & Theming

- Tailwind CSS powers the design system (`src/styles/tailwind.css` + `tailwind.config.js`).  
- `tailwind-merge` and custom helper `cn` provide ergonomic class composition.  
- Utility classes (e.g., `glow-neon`, `transition-smooth`) are defined in the global CSS.

---

## Path Aliases

`tsconfig.json` defines the following shortcuts:

- `@/*` → `src/*`
- `components/*` → `src/components/*`
- `styles/*` → `src/styles/*`

Use these aliases to keep imports readable.

---

## Deployment Notes

1. Build the project locally: `npm run build`  
2. Deploy the `.next` output using your preferred static hosting or Node server (Vercel, Netlify, etc.).  
3. Ensure environment variables (if introduced later) are configured in your hosting platform.

---

## Contributing / Next Steps

- Replace `// @ts-nocheck` headers with strongly-typed motion wrappers over time.  
- Keep assets in `public/assets` to take advantage of Next.js static optimization.  
- Add integration tests (Playwright / Cypress) and visual regression checks if the project grows.

Enjoy building with Next.js and TypeScript! 🎉
