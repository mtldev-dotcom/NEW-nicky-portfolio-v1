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

## Localization (i18n)

This project uses next-intl (v4) with Next.js 15 App Router and explicit locale-prefixed routing.

- URLs:
  - / → 307 redirect to /en
  - /en/* and /fr/* serve localized pages under the top-level [locale] segment.
- Locales: English (en), French (fr)

Required files and configuration
- next-intl.config.ts
  ```ts
  export default {
    locales: ['en', 'fr'],
    defaultLocale: 'en',
    // Forces locale prefixes like /en, /fr
    localePrefix: 'always'
  };
  ```
- next.config.mjs
  ```js
  import createNextIntlPlugin from 'next-intl/plugin';

  /** @type {import('next').NextConfig} */
  const nextConfig = { reactStrictMode: true };

  const withNextIntl = createNextIntlPlugin();
  export default withNextIntl(nextConfig);
  ```
- middleware.ts
  ```ts
  import createMiddleware from 'next-intl/middleware';
  import { defaultLocale, locales } from './src/i18n/config';

  export default createMiddleware({
    defaultLocale,
    locales,
    localeDetection: true
  });

  export const config = {
    matcher: ['/', '/(?!_next|.*\\..*|api).+']
  };
  ```
- src/i18n/config.ts
  ```ts
  export const locales = ['en', 'fr'] as const;
  export type Locale = (typeof locales)[number];
  export const defaultLocale: Locale = 'en';
  ```
- src/i18n/request.ts
  Provides request-scoped locale/messages to next-intl (loaded from JSON files).
  ```ts
  import {getRequestConfig} from 'next-intl/server';
  import {defaultLocale, locales, type Locale} from './config';

  export default getRequestConfig(async ({locale}) => {
    const candidate = locale as string | undefined;
    const resolved: Locale =
      candidate && (locales as readonly string[]).includes(candidate)
        ? (candidate as Locale)
        : defaultLocale;

    try {
      const messages = (await import(`./messages/${resolved}.json`)).default;
      return {locale: resolved, messages};
    } catch {
      return {locale: resolved, messages: {}};
    }
  });
  ```
- src/app/[locale]/layout.tsx
  Await params in Next 15 and set the request locale before rendering.
  ```tsx
  import {NextIntlClientProvider} from 'next-intl';
  import {setRequestLocale} from 'next-intl/server';
  import {type Locale, locales} from '@/i18n/config';
  import {getMessages} from '@/i18n/getMessages';

  type Props = {
    children: React.ReactNode;
    params: Promise<{locale: Locale}>;
  };

  export default async function LocaleLayout({children, params}: Props) {
    const {locale} = await params;
    if (!locales.includes(locale)) {
      // notFound()
    }
    setRequestLocale(locale);
    const messages = await getMessages(locale);

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }
  ```
- src/app/page.tsx
  Redirect the root path to the default locale.
  ```tsx
  import {redirect} from 'next/navigation';
  import {defaultLocale} from '@/i18n/config';
  export default function RootRedirect() {
    redirect(`/${defaultLocale}`);
  }
  ```

Messages
- JSON translations live in src/i18n/messages/<locale>.json and namespaced as needed. Example:
  ```json
  {
    "navigation": {
      "home": "Home",
      "about": "About",
      "services": "Services",
      "portfolio": "Portfolio",
      "testimonials": "Testimonials",
      "contact": "Contact",
      "cta": "Start project"
    }
  }
  ```

Using translations and locale in components
- Client components:
  ```tsx
  'use client';
  import {useLocale, useTranslations} from 'next-intl';

  export default function Example() {
    const locale = useLocale();
    const t = useTranslations('navigation');
    return <button>{t('cta')} — {locale}</button>;
  }
  ```
- Links with locale prefix:
  ```tsx
  import Link from 'next/link';
  import {useLocale} from 'next-intl';

  const locale = useLocale();
  <Link href={`/${locale}/about-section`}>About</Link>
  ```

Add a new locale
1) Add the code to src/i18n/config.ts locales.  
2) Add the same code to next-intl.config.ts locales.  
3) Create src/i18n/messages/<new-locale>.json.  
4) Restart the dev server if you changed next.config.mjs.

Troubleshooting
- 404 on /: Ensure src/app/page.tsx exists and middleware.ts matcher includes '/'.  
- 500 “Couldn't find next-intl config file”: Ensure next-intl.config.ts exists at the repo root and restart dev server.  
- Attempted import error 'unstable_setRequestLocale': Use setRequestLocale from next-intl/server (Next 15 / next-intl v4).  
- In route /[locale] params.locale accessed directly: In Next 15, define params as Promise<...> and await it in Server Components.  
- Module not found: next-intl/link: Use next/link and manually prefix hrefs with /${locale}.  
- After editing next.config.mjs or adding request.ts, restart the dev server to pick up changes.

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
