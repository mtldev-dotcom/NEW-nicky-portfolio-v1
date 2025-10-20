# Nicky Bruno Portfolio

A sophisticated portfolio experience for creative technologist Nicky Bruno, built with **Next.js 15 (App Router)** and **TypeScript**.  
This project showcases a modern dark-themed design with holographic-inspired UI elements, comprehensive internationalization, and a robust component architecture.

## 🎯 Project Overview

This portfolio demonstrates advanced web development practices including:
- **Immersive hero experience** with parallax backgrounds and animated elements
- **Comprehensive i18n implementation** with structured translation management
- **Modern component architecture** with reusable UI primitives
- **Sophisticated animation system** using Framer Motion
- **Responsive design** with mobile-first approach
- **Performance optimization** with proper code splitting and lazy loading

---

## 🛠 Tech Stack
 
### Core Framework
- **Next.js 15 (App Router)** — streaming routes, metadata, built-in i18n routing  
- **TypeScript** — typed components, utilities, and strict path aliases  
- **React 18** — modern React patterns with concurrent features

### Styling & Design
- **Tailwind CSS** — utility-first styling with custom tokens & motion helpers  
- **shadcn-inspired UI primitives** — accessible buttons, inputs, selects, and checkboxes (Radix + CVA)  
- **Framer Motion** — layered parallax, animated loaders, and micro-interactions  
- **Custom CSS Properties** — comprehensive design system with neon-mint theme

### Internationalization
- **next-intl v4** — locale-aware routing and translation scaffolding (EN/FR)
- **Structured translations** — organized by pages and global components

### Additional Libraries
- **Lucide Icons** — iconography via the reusable `AppIcon` wrapper  
- **Redux Toolkit** — state management (available)
- **React Hook Form** — form handling (available)
- **D3** — data visualization (available)
- **Recharts** — chart components (available)
- **axios** — HTTP client (available)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 20.19.0** or newer (as specified in package.json engines)
- npm (bundled with Node)

### Installation

```bash
npm install
```

### Local Development

```bash
npm run dev
```

Visit `http://localhost:3000` to iterate on the site. The app will automatically redirect to `/en` (default locale).

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

---

## 📁 Project Structure

```

Directory structure:
└── mtldev-dotcom-new-nicky-portfolio-v1/
    ├── README.md
    ├── middleware.ts
    ├── next-intl.config.ts
    ├── next.config.mjs
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── .cursorignore
    ├── .dockerignore
    ├── .eslintrc.json
    ├── docs/
    │   ├── README.md
    │   ├── ai-agent-configuration-guide.md
    │   ├── chatbot-n8n-integration.md
    │   ├── chatbot-webhook-setup-troubleshooting.md
    │   ├── chatbot-workflow-enhancement-plan.md
    │   ├── chatbot-workflow-implementation-guide.md
    │   ├── contact-form-n8n-integration.md
    │   ├── conversation-analytics-tracking-guide.md
    │   ├── enhanced-response-format-frontend-integration.md
    │   ├── nickbruno-text-content.md
    │   ├── rate-limiting-security-implementation.md
    │   ├── troubleshooting.md
    │   └── dev/
    │       └── new-full-text-content.md
    ├── public/
    │   ├── _redirects
    │   ├── manifest.json
    │   └── assets/
    │       └── icons/
    │           └── Tech-Stack-Icons-Design-Stack-Icons-dark-mode/
    │               ├── chatgpt.webp
    │               └── svgtopng.zip
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── not-found.tsx
        │   ├── opengraph-image.tsx
        │   ├── page.tsx
        │   └── [locale]/
        │       ├── layout.tsx
        │       ├── page.tsx
        │       ├── about/
        │       │   └── page.tsx
        │       ├── contact/
        │       │   └── page.tsx
        │       ├── portfolio/
        │       │   └── page.tsx
        │       └── services/
        │           └── page.tsx
        ├── components/
        │   ├── AppIcon.tsx
        │   ├── AppImage.tsx
        │   ├── ErrorBoundary.tsx
        │   ├── ScrollToTop.tsx
        │   ├── sections/
        │   │   ├── about/
        │   │   │   ├── AboutSection.tsx
        │   │   │   ├── CareerTimeline.tsx
        │   │   │   ├── CredentialsShowcase.tsx
        │   │   │   ├── ExperienceCounter.tsx
        │   │   │   └── PersonalIntro.tsx
        │   │   ├── contact/
        │   │   │   ├── ContactForm.tsx
        │   │   │   ├── ContactInfo.tsx
        │   │   │   ├── ContactSection.tsx
        │   │   │   ├── FAQSection.tsx
        │   │   │   ├── LocationMap.tsx
        │   │   │   └── ProjectBrief.tsx
        │   │   ├── hero/
        │   │   │   ├── FloatingTaglines.tsx
        │   │   │   ├── HeroContent.tsx
        │   │   │   ├── HeroExperience.tsx
        │   │   │   ├── HeroPortrait.tsx
        │   │   │   ├── HolographicOverlay.tsx
        │   │   │   ├── LoadingAnimation.tsx
        │   │   │   └── ParallaxBackground.tsx
        │   │   ├── home/
        │   │   │   ├── HomeBenefits.tsx
        │   │   │   ├── HomeCapabilities.tsx
        │   │   │   ├── HomeFeaturedProjects.tsx
        │   │   │   ├── HomeIntro.tsx
        │   │   │   ├── HomeTestimonials.tsx
        │   │   │   ├── IconSphere.tsx
        │   │   │   ├── TechStackCloud.tsx
        │   │   │   └── TechStackShowcase.tsx
        │   │   ├── portfolio/
        │   │   │   ├── FeaturedProject.tsx
        │   │   │   ├── PortfolioSection.tsx
        │   │   │   ├── ProjectCard.tsx
        │   │   │   ├── ProjectFilter.tsx
        │   │   │   └── ProjectModal.tsx
        │   │   ├── services/
        │   │   │   ├── CapabilityStats.tsx
        │   │   │   ├── ProcessTimeline.tsx
        │   │   │   ├── ServiceCard.tsx
        │   │   │   ├── ServicesSection.tsx
        │   │   │   └── TechStack.tsx
        │   │   └── testimonials/
        │   │       ├── ClientLogos.tsx
        │   │       ├── IndustryBadges.tsx
        │   │       ├── LinkedInRecommendations.tsx
        │   │       ├── TestimonialCard.tsx
        │   │       ├── TestimonialCarousel.tsx
        │   │       ├── TestimonialsSection.tsx
        │   │       └── VideoTestimonial.tsx
        │   ├── shadcn/
        │   │   └── ui/
        │   │       ├── button.tsx
        │   │       ├── checkbox.tsx
        │   │       └── input.tsx
        │   └── ui/
        │       ├── Button.tsx
        │       ├── Chatbot.tsx
        │       ├── ChatInput.tsx
        │       ├── ChatMessage.tsx
        │       ├── Checkbox.tsx
        │       ├── Footer.tsx
        │       ├── Header.tsx
        │       ├── Input.tsx
        │       ├── LanguageSwitcher.tsx
        │       ├── LinkButton.tsx
        │       └── Select.tsx
        ├── i18n/
        │   ├── config.ts
        │   ├── getMessages.ts
        │   ├── request.ts
        │   └── messages/
        │       ├── en/
        │       │   ├── about.json
        │       │   ├── chatbot.json
        │       │   ├── contact.json
        │       │   ├── global.json
        │       │   ├── home.json
        │       │   ├── portfolio.json
        │       │   └── services.json
        │       └── fr/
        │           ├── about.json
        │           ├── chatbot.json
        │           ├── contact.json
        │           ├── global.json
        │           ├── home.json
        │           ├── portfolio.json
        │           └── services.json
        ├── styles/
        │   ├── index.css
        │   └── tailwind.css
        └── utils/
            └── cn.ts


```


```
.
├── public/                       # Static assets (logos, favicons, imagery)
│   └── assets/
│       ├── icons/                # Tech stack icons (light/dark modes)
│       └── images/               # Profile images and graphics
└── src/
    ├── app/                      # Next.js App Router entries & metadata
    │   ├── layout.tsx            # Root layout (sets <html> lang via middleware header)
    │   ├── globals.css           # Global styles and CSS imports
    │   ├── [locale]/             # Locale-scoped routes (en/fr)
    │   │   ├── layout.tsx        # Loads messages + wraps with NextIntl provider
    │   │   ├── page.tsx          # Home (hero experience)
    │   │   ├── about/            # About page
    │   │   ├── services/         # Services page
    │   │   ├── portfolio/        # Portfolio page
    │   │   └── contact/          # Contact page
    │   └── opengraph-image.tsx   # Dynamic OG image generation
    ├── components/
    │   ├── sections/             # Section-specific composition & motion
    │   │   ├── hero/             # Hero experience components
    │   │   ├── about/            # About section components
    │   │   ├── services/         # Services section components
    │   │   ├── portfolio/        # Portfolio section components
    │   │   ├── testimonials/    # Testimonials section components
    │   │   ├── contact/          # Contact section components
    │   │   └── home/             # Home page specific components
    │   ├── ui/                   # Reusable UI primitives
    │   │   ├── Button.tsx         # Enhanced button with icon support
    │   │   ├── Input.tsx         # Form input component
    │   │   ├── Header.tsx        # Navigation header
    │   │   ├── Footer.tsx        # Site footer
    │   │   └── ...               # Other UI components
    │   ├── shadcn/               # shadcn/ui components
    │   │   └── ui/               # Base shadcn components
    │   ├── AppIcon.tsx           # Icon wrapper component
    │   ├── AppImage.tsx          # Image wrapper component
    │   ├── ErrorBoundary.tsx     # Error boundary component
    │   └── ScrollToTop.tsx       # Scroll to top functionality
    ├── i18n/                     # Internationalization configuration
    │   ├── config.ts             # Locale configuration
    │   ├── getMessages.ts         # Message loading utility
    │   ├── request.ts            # next-intl request configuration
    │   └── messages/             # Translation files
    │       ├── en/               # English translations
    │       │   ├── global.json   # Global/common translations
    │       │   ├── home.json     # Home page translations
    │       │   ├── about.json    # About page translations
    │       │   ├── services.json # Services page translations
    │       │   ├── portfolio.json# Portfolio page translations
    │       │   └── contact.json  # Contact page translations
    │       └── fr/               # French translations
    │           ├── global.json   # Global/common translations
    │           ├── home.json     # Home page translations
    │           ├── about.json   # About page translations
    │           ├── services.json# Services page translations
    │           ├── portfolio.json# Portfolio page translations
    │           └── contact.json  # Contact page translations
    ├── styles/                   # Styling configuration
    │   ├── tailwind.css          # Tailwind CSS with custom properties
    │   └── index.css             # Additional custom styles
    └── utils/                     # Shared utilities
        └── cn.ts                  # Class name utility (clsx + tailwind-merge)
```

**Key Architecture Notes:**
- **Locale-scoped routing**: All pages live under `/[locale]/*` for proper i18n support
- **Component organization**: Clear separation between UI primitives and section-specific components
- **Translation structure**: Organized by pages and global components for better maintainability
- **Design system**: Comprehensive CSS custom properties with neon-mint theme

---

## 🌐 Internationalization (i18n)

This project uses **next-intl v4** with Next.js 15 App Router and explicit locale-prefixed routing.

### URL Structure
- `/` → 307 redirect to `/en`
- `/en/*` and `/fr/*` serve localized pages under the top-level `[locale]` segment
- **Supported locales**: English (en), French (fr)

### Translation File Structure

The project uses a **structured translation approach** for better organization and maintainability:

```
src/i18n/messages/
├── en/                    # English translations
│   ├── global.json       # Global/common translations (navigation, buttons, etc.)
│   ├── home.json         # Home page specific translations
│   ├── about.json        # About page specific translations
│   ├── services.json     # Services page specific translations
│   ├── portfolio.json    # Portfolio page specific translations
│   └── contact.json      # Contact page specific translations
└── fr/                    # French translations
    ├── global.json       # Global/common translations
    ├── home.json         # Home page specific translations
    ├── about.json        # About page specific translations
    ├── services.json     # Services page specific translations
    ├── portfolio.json    # Portfolio page specific translations
    └── contact.json      # Contact page specific translations
```

### Using Translations in Components

**Client Components:**
```tsx
'use client';
import { useLocale, useTranslations } from 'next-intl';

export default function Example() {
  const locale = useLocale();
  const tGlobal = useTranslations('global');
  const tHome = useTranslations('home');
  
  return (
    <div>
      <h1>{tHome('hero.title')}</h1>
      <button>{tGlobal('navigation.cta')}</button>
      <span>Current locale: {locale}</span>
    </div>
  );
}
```

**Server Components:**
```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('home.hero');
  
  return <h1>{t('title')}</h1>;
}
```

**Language Switcher:**
The project includes a built-in language switcher component that allows users to switch between English and French:

```tsx
import LanguageSwitcher from 'components/ui/LanguageSwitcher';

// Desktop version
<LanguageSwitcher variant="desktop" />

// Mobile version (full width)
<LanguageSwitcher variant="mobile" />
```

**Links with Locale Prefix:**
```tsx
import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function Navigation() {
  const locale = useLocale();
  
  return (
    <Link href={`/${locale}/about`}>
      About
    </Link>
  );
}
```

### Adding New Translations

1. **Add new keys** to the appropriate JSON file in both `en/` and `fr/` directories
2. **Use nested objects** for better organization (e.g., `home.hero.title`)
3. **Keep translations consistent** across all locales
4. **Test both locales** to ensure proper rendering

---

## 🎨 Design System & Styling

### Theme Configuration
- **Dark theme** with neon-mint (#00FFD1) primary accent color
- **Comprehensive CSS custom properties** defined in `src/styles/tailwind.css`
- **Custom Tailwind utilities** for glow effects, smooth transitions, and magnetic hover
- **Typography hierarchy** using Space Grotesk (headings) and Inter (body text)

### Key Design Tokens
```css
/* Primary Colors */
--color-primary: #00FFD1;        /* neon-mint */
--color-background: #000000;     /* black */
--color-foreground: #FFFFFF;     /* white */

/* Custom Utilities */
.glow-neon { box-shadow: var(--shadow-glow); }
.transition-smooth { transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.magnetic-hover:hover { transform: scale(1.02); }
```

### Component Styling Guidelines
1. **Use CSS custom properties** for consistent theming
2. **Apply glow effects** sparingly for emphasis
3. **Maintain smooth transitions** for all interactive elements
4. **Follow responsive design** patterns with mobile-first approach

---

## 🛠 Developer Guidelines

### Code Style & Conventions

**Component Structure:**
  ```tsx
'use client'; // Only for client components

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';

// Type definitions at the top
interface ComponentProps {
  title: string;
  description?: string;
}

// Component implementation
const ComponentName = ({ title, description }: ComponentProps) => {
  const t = useTranslations('namespace');
  const locale = useLocale();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <h2 className="font-space-grotesk text-2xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="font-inter text-muted-foreground">
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default ComponentName;
```

**Translation Usage:**
- **Always use structured translations** with proper namespacing
- **Extract all user-facing text** to translation files
- **Use semantic keys** (e.g., `hero.title` instead of `title1`)
- **Test both locales** during development

**Animation Guidelines:**
- **Use Framer Motion** for complex animations
- **Apply consistent easing** with `cubic-bezier(0.4, 0, 0.2, 1)`
- **Respect reduced motion** preferences
- **Keep animations purposeful** and not distracting

### File Organization

**Component Files:**
- **One component per file** with matching filename
- **Export default** the main component
- **Use PascalCase** for component names
- **Group related components** in the same directory

**Import Order:**
1. React/Next.js imports
2. Third-party libraries
3. Internal components (UI primitives first)
4. Types and utilities
5. Relative imports

### Performance Best Practices

1. **Use dynamic imports** for heavy components
2. **Implement proper loading states** for async operations
3. **Optimize images** with Next.js Image component
4. **Minimize bundle size** with proper code splitting
5. **Use React.memo** for expensive components when needed

---

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Deployment Checklist
- [ ] **Build succeeds** without errors or warnings
- [ ] **All translations** are properly loaded
- [ ] **Images and assets** are optimized
- [ ] **Environment variables** are configured
- [ ] **Middleware** is deployed for i18n routing
- [ ] **Open Graph images** are generated correctly

### Hosting Recommendations
- **Vercel** (recommended for Next.js)
- **Netlify** with proper redirects
- **Custom Node.js server** with PM2
- **Docker** containerization for scalability

---

## 🔧 Development Tools

### Recommended VS Code Extensions
- **Tailwind CSS IntelliSense** - Autocomplete for Tailwind classes
- **TypeScript Importer** - Auto-import TypeScript modules
- **ES7+ React/Redux/React-Native snippets** - React code snippets
- **Prettier** - Code formatting
- **ESLint** - Code linting

### Useful Commands
```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run lint            # Run ESLint

# Translation management
# Add new translation keys to both en/ and fr/ directories
# Test both locales: http://localhost:3000/en and http://localhost:3000/fr
```

---

## 📈 Future Enhancements

### Planned Features
- **Automated testing** with Playwright/Cypress
- **Visual regression testing** for design consistency
- **Performance monitoring** with Web Vitals
- **Analytics integration** for user behavior tracking
- **CMS integration** for content management
- **Light mode theme** variant
- **Additional language support** (Spanish, German)

### Technical Improvements
- **Component library expansion** with more shadcn/ui primitives
- **Advanced animation system** with GSAP integration
- **Progressive Web App** features
- **SEO optimization** with structured data
- **Accessibility improvements** (WCAG 2.1 AA compliance)

---

## 🤝 Contributing

### Development Workflow
1. **Create feature branch** from `main`
2. **Follow naming conventions** for components and files
3. **Add translations** for both English and French
4. **Test on both locales** before committing
5. **Write descriptive commit messages**
6. **Create pull request** with detailed description

### Code Review Checklist
- [ ] **Translations** are complete for both locales
- [ ] **TypeScript** types are properly defined
- [ ] **Responsive design** works on all screen sizes
- [ ] **Animations** are smooth and purposeful
- [ ] **Performance** impact is minimal
- [ ] **Accessibility** standards are met

---

**Happy coding! 🚀** 

This portfolio showcases modern web development practices and serves as a comprehensive example of Next.js 15, TypeScript, and internationalization best practices.
