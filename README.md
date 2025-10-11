# Nicky Bruno Portfolio

A polished portfolio experience for creative technologist Nicky Bruno, now powered by **Next.js 15 (App Router)** and **TypeScript**.  
Each major section (Hero, About, Services, Portfolio, Testimonials, Contact) lives on its own route while sharing a unified visual language with rich motion design and interactive UI.

---

## Tech Stack

- **Next.js 15 (App Router)** — streaming routes, metadata, built-in i18n routing  
- **TypeScript** — typed components, utilities, and strict path aliases  
- **Tailwind CSS** — utility-first styling with custom tokens & motion helpers  
- **shadcn-inspired UI primitives** — accessible buttons, inputs, selects, and checkboxes (Radix + CVA)  
- **next-intl** — locale-aware routing and translation scaffolding (EN/FR)
- **Framer Motion** — layered parallax, animated loaders, and micro-interactions  
- **Lucide Icons** — iconography via the reusable `AppIcon` wrapper  
- Additional libraries available: **Redux Toolkit**, **React Hook Form**, **D3**, **Recharts**, **axios**

---

## Getting Started

### Prerequisites

- **Node.js 18.x** or newer (Next.js 15 baseline)  
- npm (bundled with Node)

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to iterate on the site.

### Production Build & Preview

```bash
npm run build
npm start        # serves the production bundle on port 3000
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
.
├── public/                       # Static assets (logos, favicons, imagery)
└── src/
    ├── app/                      # App Router entries & metadata
    │   ├── layout.tsx            # Root layout (sets <html> lang via middleware header)
    │   ├── [locale]/             # Locale-scoped routes (en/fr)
    │   │   ├── layout.tsx        # Loads messages + wraps with NextIntl provider
    │   │   ├── page.tsx          # Home (hero experience)
    │   │   ├── hero-experience/
    │   │   ├── about-section/
    │   ├── services-section/
    │   ├── portfolio-section/
    │   ├── testimonials-section/
    │   └── contact-section/
    ├── components/
    │   ├── sections/             # Section-specific composition & motion
    │   │   ├── hero/
    │   │   ├── about/
    │   │   ├── services/
    │   │   ├── portfolio/
    │   │   ├── testimonials/
    │   │   └── contact/
    │   └── i18n/ (see below)
    │   └── ui/                   # Reusable primitives (Button, Input, etc.)
    ├── i18n/                     # Locale metadata & placeholders (en/fr)
    ├── styles/                   # Tailwind + global CSS tokens
    └── utils/                    # Shared helpers (e.g., `cn`)
```

**Key routing note:** every section route lives under a locale prefix (e.g., `/en/about-section`, `/fr/services-section`) and renders its client component from `components/sections/**`, matching the layout listed in the brief.

---

## Styling & Theming

- `tailwind.config.js` and `src/styles/tailwind.css` define the dark neon aesthetic, spacing tokens, and custom utilities (`glow-neon`, `transition-smooth`, etc.).  
- `src/app/globals.css` imports the Tailwind layers and resets while the root layout applies `bg-background` / `text-foreground`.  
- shadcn-inspired primitives live under `src/components/ui/` and are ready for extension with additional variants.

---

## Path Aliases

`tsconfig.json` declares the following shortcuts:

- `@/*` → `src/*`  
- `components/*` → `src/components/*`  
- `styles/*` → `src/styles/*`

Use these to keep imports readable and consistent.

---

## Deployment Notes

1. Build locally with `npm run build`.  
2. Deploy `.next` to your hosting provider (Vercel, Netlify, custom Node server, etc.).  
3. Ensure the `middleware.ts` file is deployed so locale negotiation works server-side.  
4. Configure any future environment variables through your host’s dashboard.  
5. The Open Graph image is generated dynamically via `src/app/opengraph-image.tsx`; replace it with your own design if desired.

---

## Next Steps & Ideas

- Add automated checks (Playwright/Cypress, visual regression) for the immersive hero flows.  
- Expand the shadcn-based component library with additional primitives (tabs, dialog, tooltip) as needed.  
- Integrate analytics or a headless CMS once content needs to be editable.  
- Fill in the `src/i18n/messages/{locale}.json` files with copy and wire components to `useTranslations`.  
- Ship translations or theming variants (light mode) if the portfolio grows.

Enjoy building and iterating on the Nicky Bruno experience! 🚀
