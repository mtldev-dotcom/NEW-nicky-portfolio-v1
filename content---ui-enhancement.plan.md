<!-- c4f76c62-4645-40f3-8326-a8fb62ebb879 77ca53fd-4575-40d0-9138-4f1d47f16aee -->
# Portfolio Content Integration & UI/UX Enhancement Plan

## Executive Summary

Comprehensive enhancement of the Nicky Bruno Portfolio by integrating richer content from `docs/dev/site-content/*.md`, optimizing UI/UX components, improving performance, and creating a cohesive visual system with documentation for required assets.

---

## Phase 1: Content Integration & Translation Updates

### 1.1 Global & Navigation Content (Priority: HIGH)

**Files:** `src/i18n/messages/{en|fr}/global.json`

**Enhancements:**

- Update footer content with new Newsletter CTA copy from `01-globals.md`
- Add missing navigation states (Testimonials as standalone section)
- Integrate contact information updates (hello@nickybruno.ca vs .com)
- Add new footer sections structure per content docs

**Why:** Foundation for consistent messaging across all pages

---

### 1.2 Home Page Content Enrichment (Priority: HIGH)

**Files:** `src/i18n/messages/{en|fr}/home.json`

**Content Updates from `02-home.md` and `new-full-text-content.md`:**

- **Hero Section:** Update title to "Design. Automate. Elevate." (shorter, punchier)
- **Intro Section:** Replace with richer narrative from content docs (3 paragraphs → concise 2-paragraph story)
- **Benefits Section:** Expand with real-world examples and concrete metrics
- **Featured Projects:** Add missing project descriptions (Sofia AI Desk details)
- **Testimonials:** Add 3rd testimonial (Marcus Chen) and enhance existing quotes
- **Final CTA:** New compelling copy per content docs

**Component Updates Needed:**

- `HomeIntro.tsx` — adjust layout for richer content
- `HomeBenefits.tsx` — add example cards with hover states
- `HomeFeaturedProjects.tsx` — enhance project cards with year badges

---

### 1.3 About Page Content (Priority: MEDIUM)

**Files:** `src/i18n/messages/{en|fr}/about.json`

**Enhancements from `03-about.md`:**

- **Career Timeline:** Add achievements array for each milestone
- **Experience Counter:** Update stats (80+ projects, 15+ countries, 40% improvement)
- **Credentials Section:** Add Speaking Engagements, Publications, Open Source
- **Values Section:** Expand from 2 to 4 values with descriptions

**Component Updates:**

- `CareerTimeline.tsx` — add expandable achievement lists
- `CredentialsShowcase.tsx` — create tabs/sections for different credential types
- Add visual badges for certifications

---

### 1.4 Services Page Content (Priority: MEDIUM)

**Files:** `src/i18n/messages/{en|fr}/services.json`

**Updates from `04-services.md`:**

- **Process Timeline:** Expand 3-step to full 5-step process (Discovery → Launch)
- **Service Cards:** Add detailed feature lists and technology tags
- **Stats Section:** Update to 150+ projects, 95% retention, 50+ clients
- **Pricing CTA:** Add "free 30-min consultation" emphasis

**Components:**

- `ProcessTimeline.tsx` — expand to 5 phases with deliverables
- `ServiceCard.tsx` — add collapsible feature lists
- `CapabilityStats.tsx` — animated counter with enhanced metrics

---

### 1.5 Portfolio Page Content (Priority: MEDIUM)

**Files:** `src/i18n/messages/{en|fr}/portfolio.json`

**Enhancements from `05-portfolio.md`:**

- Add 6 featured projects with full case study data
- Add project filtering categories (AI & Automation, Web Platforms, Mobile, etc.)
- Include metrics for each project (users, impact, rating)
- Add testimonials per project

**Components:**

- `ProjectCard.tsx` — add metric badges
- `ProjectModal.tsx` — full case study view with process steps
- `ProjectFilter.tsx` — implement category filtering

---

### 1.6 Contact Page Content (Priority: MEDIUM)

**Files:** `src/i18n/messages/{en|fr}/contact.json`

**Updates from `06-contact.md`:**

- Update email to hello@nickybruno.ca (consistent)
- Add budget range options to form
- Expand FAQ from 3 to 6 questions
- Add "Quick Actions" section
- Include detailed project brief multi-step form

**Components:**

- `ContactForm.tsx` — add budget/timeline selects
- `FAQSection.tsx` — expand accordion with 6 items
- `ProjectBrief.tsx` — implement multi-step form wizard

---

### 1.7 Chatbot Content (Priority: LOW)

**Files:** `src/i18n/messages/{en|fr}/chatbot.json`

**New Content from `07-chatbot.md`:**

- Create complete chatbot translations
- Add suggested prompts array
- Typing states and error messages

---

## Phase 2: UI/UX Component Optimization

### 2.1 Home Page — Hero Experience (Priority: HIGH)

**Component:** `src/components/sections/hero/HeroExperience.tsx`

**Optimizations:**

- **Performance:** Lazy-load ParallaxBackground, reduce animation complexity on mobile
- **Accessibility:** Ensure all stats have proper ARIA labels, keyboard nav for CTAs
- **Visual:** Refine glow effects (currently too aggressive), adjust neon mint intensity
- **Mobile:** Optimize portrait scaling, reduce parallax on small screens

**HeroContent.tsx:**

- Adjust stats layout (currently cramped on tablet breakpoint)
- Add status badge ("Available for projects")
- Improve CTA hierarchy with icon animations

**ParallaxBackground.tsx:**

- Implement GPU-accelerated transforms only
- Add `prefers-reduced-motion` support
- Reduce particle count on mobile (performance)

---

### 2.2 Home Page — Section Enhancements (Priority: HIGH)

**HomeIntro.tsx:**

- Add 2-column layout (text left, credential chips right)
- Implement stagger animations for chips
- Add subtle background gradient

**HomeCapabilities.tsx:**

- Enhance card hover states (lift + glow)
- Add icon micro-pulse on hover
- Implement glass morphism effect

**HomeBenefits.tsx:**

- Create example cards with expandable details
- Add count-up animation when entering viewport
- Improve visual hierarchy with icons

**HomeFeaturedProjects.tsx:**

- Add year badges to project cards
- Implement image pan effect on hover (2-4%)
- Add mint border reveal animation
- Create project modal for case study details

**HomeTestimonials.tsx:**

- Implement auto-advance carousel
- Add pause-on-hover functionality
- Include company logos
- Add navigation dots

---

### 2.3 Navigation & Footer (Priority: HIGH)

**Header.tsx:**

- Add scroll-triggered animation (reveal on scroll down)
- Implement active link underline grow animation
- Enhance mobile menu with full-height drawer
- Add magnetic hover to CTA button
- Improve glass backdrop blur effect

**Footer.tsx:**

- Create 4-column grid layout per content spec
- Add newsletter signup section at top
- Implement social links with icon hover effects
- Add "Back to top" button with smooth scroll
- Create thin mint gradient dividers

---

### 2.4 About Page Components (Priority: MEDIUM)

**PersonalIntro.tsx:**

- Add 2-column layout (portrait left, narrative right)
- Implement slow float animation on portrait
- Create attribute badges with stagger-in animation

**CareerTimeline.tsx:**

- Enhance vertical timeline with mint nodes
- Add glass cards for each milestone
- Implement glow-on-hover for timeline nodes
- Create expandable achievements section

**ExperienceCounter.tsx:**

- Add count-up animation on viewport intersection
- Create metrics grid with proper spacing
- Add visual separators

**CredentialsShowcase.tsx:**

- Create tabbed interface (Certifications, Speaking, Publications, Open Source)
- Add credential cards with icons
- Implement popover/modal for detailed view

---

### 2.5 Services Page Components (Priority: MEDIUM)

**ServicesSection.tsx:**

- Enhance service card layout (4-up grid)
- Add feature list with checkmark icons
- Implement technology tag pills

**ProcessTimeline.tsx:**

- Expand to 5-phase horizontal stepper
- Add numbered nodes with connecting mint line
- Create glass cards for each phase
- Implement progress fill animation on scroll

**CapabilityStats.tsx:**

- Create badge row with animated counters
- Add visual emphasis on hover
- Implement spring animations

**TechStack.tsx:**

- Organize by categories (Frontend, Backend, AI, Tools)
- Add hover tooltips with descriptions
- Implement filter/search functionality

---

### 2.6 Portfolio Page Components (Priority: MEDIUM)

**PortfolioSection.tsx:**

- Implement filter tags row
- Add layout shuffle animation on filter change
- Create empty state component

**ProjectCard.tsx:**

- Add year/type badges
- Include metric pills (users, impact, rating)
- Implement image hover effects (pan, border reveal)
- Add "Featured" label for highlighted projects

**ProjectModal.tsx:**

- Create full case study view with sections:
  - Hero with large image
  - Overview with client/industry/duration
  - Key features list
  - Process timeline with steps
  - Results & impact metrics
  - Testimonial quote
  - Navigation (previous/next project)
- Add backdrop blur overlay
- Implement scale-in animation

**ProjectFilter.tsx:**

- Create filter buttons with active states
- Add count badges per category
- Implement smooth transition animations

---

### 2.7 Contact Page Components (Priority: MEDIUM)

**ContactForm.tsx:**

- Add budget range select field
- Add timeline select field
- Implement inline validation with mint accents
- Add newsletter checkbox
- Create success/error toast notifications
- Implement progress indicator on submit

**ContactInfo.tsx:**

- Create info cards with icons (email, phone, location, response time)
- Add copy-to-clipboard functionality
- Implement hover effects

**FAQSection.tsx:**

- Expand to 6 questions with accordion UI
- Add smooth expand/collapse animations
- Include "Don't see your question?" CTA

**ProjectBrief.tsx:**

- Create multi-step wizard (4 steps)
- Add step indicators with progress bar
- Implement form state persistence
- Create summary view before submit

**LocationMap.tsx:**

- Add static map image or embed
- Create location details card overlay
- Add office hours information

---

### 2.8 Chatbot UI (Priority: LOW)

**Chatbot.tsx:**

- Position fixed bottom-right
- Implement bubble → panel expand animation
- Add glass morphism with mint border
- Create minimize/close functionality

**ChatMessage.tsx:**

- Alternate layout (user right, bot left)
- Add avatar images
- Implement slide/fade reveal animation
- Add timestamp on hover

**ChatInput.tsx:**

- Create textarea with auto-resize
- Add send button with icon
- Implement typing indicator
- Add suggested prompts as chips

---

## Phase 3: Visual Assets & Documentation

### 3.1 Required Visual Assets Inventory

**Document Creation:** `docs/required-assets.md`

**Hero Section:**

- [ ] Hero portrait image (high-res, optimized for WebP)
  - Path: `/public/assets/images/nicky-hero-portrait.webp`
  - Size: 800x1000px, < 200KB
  - Alt text defined in translations

**Project Images (6 projects):**

- [ ] AIAA.dev cover image
- [ ] Montreal Tech Hub cover
- [ ] EcoTrack Analytics cover
- [ ] FinanceFlow Mobile cover
- [ ] CreativeStudio Pro cover
- [ ] HealthConnect Platform cover
  - Path: `/public/assets/images/projects/[slug].webp`
  - Size: 1200x800px, < 300KB each

**Technology Icons:**

- Existing: `public/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/`
- Action: Create mapping document for icon → component usage

**Credential Badges:**

- [ ] AWS Certification badge
- [ ] Google AI/ML badge
- [ ] React Advanced badge
- [ ] Adobe UX badge
  - Path: `/public/assets/images/credentials/`
  - Size: 200x200px, SVG preferred

**Company Logos (testimonials):**

- [ ] Sofia AI Desk logo
- [ ] InnovateTech logo
- [ ] Pixel Perfect Agency logo
  - Path: `/public/assets/images/clients/`
  - Size: 300x100px, transparent background

---

### 3.2 Icon Component Enhancement

**File:** `src/components/AppIcon.tsx`

**Updates:**

- Expand icon library with new icons needed (Calendar, Zap, Award, BookOpen, etc.)
- Add size variants (xs, sm, md, lg, xl)
- Implement consistent stroke-width
- Add animation props (pulse, spin, bounce)

---

### 3.3 Image Component Enhancement

**File:** `src/components/AppImage.tsx`

**Updates:**

- Add loading skeleton with mint accent
- Implement blur-up placeholder strategy
- Add error fallback images
- Create optimized srcset generation
- Add zoom-on-hover functionality (optional)

---

## Phase 4: Cross-Cutting Improvements

### 4.1 Performance Optimization

**Actions:**

- [ ] Implement dynamic imports for heavy components (modals, carousels)
- [ ] Add React.memo to expensive components (TechStackCloud, IconSphere)
- [ ] Optimize Framer Motion animations (reduce repaints)
- [ ] Add next/image for all static images with proper sizing
- [ ] Implement font preloading for Space Grotesk & Inter
- [ ] Lazy-load below-fold sections

**Target Metrics:**

- Lighthouse Performance: ≥ 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

### 4.2 Accessibility Enhancements

**Actions:**

- [ ] Audit all interactive elements for keyboard navigation
- [ ] Add visible focus indicators (mint ring)
- [ ] Ensure all images have descriptive alt text
- [ ] Add ARIA labels to icon-only buttons
- [ ] Test screen reader compatibility
- [ ] Implement skip-to-content link
- [ ] Ensure color contrast ratios meet WCAG AA (mint on black = 4.5:1+)
- [ ] Add reduced-motion media query handling to all animations

**Target Metrics:**

- Lighthouse Accessibility: ≥ 95
- Zero critical WCAG violations
- Full keyboard navigability

---

### 4.3 Mobile Responsiveness

**Breakpoints Review:**

- [ ] Mobile (< 640px): Single column, larger touch targets
- [ ] Tablet (640-1024px): 2-column grids, adjusted spacing
- [ ] Desktop (> 1024px): Full multi-column layouts

**Specific Mobile Optimizations:**

- [ ] Reduce parallax effects (performance)
- [ ] Simplify hero animations
- [ ] Increase font sizes for readability
- [ ] Adjust card spacing (more breathing room)
- [ ] Test on real devices (iOS Safari, Chrome Android)

---

### 4.4 Design System Refinement

**Files:** `src/styles/tailwind.css`, `tailwind.config.js`

**Enhancements:**

- [ ] Audit all color usages (ensure mint is accent, not overused)
- [ ] Create spacing scale documentation
- [ ] Define consistent border radius usage
- [ ] Create shadow utility variants (subtle, medium, heavy glow)
- [ ] Document animation duration standards (200ms fast, 300ms smooth, 800ms slow)
- [ ] Create component state variants (default, hover, active, disabled, loading)

**New Utilities to Add:**

```css
.glass-panel { backdrop-blur + subtle border + shadow }
.mint-border-reveal { animated gradient border }
.card-lift { hover transform + shadow transition }
.text-gradient-mint { gradient text effect }
```

---

### 4.5 i18n Consistency Audit

**Actions:**

- [ ] Verify all EN/FR translations have parity (no missing keys)
- [ ] Check for hard-coded strings in components
- [ ] Ensure date/number formatting respects locale
- [ ] Test language switching preserves scroll position
- [ ] Add locale-specific meta tags (hreflang)

---

## Phase 5: Testing & Quality Assurance

### 5.1 Visual Regression Testing

- [ ] Test all pages in both EN and FR locales
- [ ] Screenshot comparison at key breakpoints
- [ ] Verify animations don't cause layout shift

### 5.2 Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari iOS
- [ ] Chrome Android

### 5.3 Performance Testing

- [ ] Run Lighthouse audits on all pages
- [ ] Test on slow 3G connection
- [ ] Verify bundle size impact (< 500KB gzipped)

### 5.4 Accessibility Testing

- [ ] Automated testing (axe DevTools)
- [ ] Keyboard navigation walkthrough
- [ ] Screen reader testing (NVDA/JAWS)
- [ ] Color contrast verification

---

## Implementation Sequence

### Sprint 1: Foundation (Home Page Focus)

1. Update global translations (EN/FR)
2. Enhance Header & Footer components
3. Optimize Hero Experience
4. Update Home page translations & components
5. Create asset requirements doc

### Sprint 2: Content Pages

1. Update About page translations & components
2. Update Services page translations & components
3. Enhance Portfolio page translations & components
4. Update Contact page translations & components

### Sprint 3: Polish & Optimization

1. Implement performance optimizations
2. Accessibility audit & fixes
3. Mobile responsiveness refinements
4. Cross-browser testing & fixes

### Sprint 4: Visual Assets & Final QA

1. Integrate visual assets (or placeholders)
2. Final design system documentation
3. Comprehensive testing
4. Production deployment preparation

---

## Success Metrics

**Content Quality:**

- [ ] 100% translation parity (EN/FR)
- [ ] All placeholder content replaced with final copy
- [ ] 6 complete project case studies

**Technical Performance:**

- [ ] Lighthouse Performance ≥ 90
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Bundle size < 500KB gzipped
- [ ] Zero console errors

**User Experience:**

- [ ] All interactive elements have proper feedback
- [ ] Smooth animations with reduced-motion support
- [ ] Full keyboard navigability
- [ ] Mobile-optimized interactions

**Visual Consistency:**

- [ ] Cohesive neon-mint accent usage
- [ ] Consistent spacing and typography
- [ ] Polished glass morphism effects
- [ ] Professional asset quality

---

## Deliverables

1. **Updated Translation Files:** Complete EN/FR translations for all pages
2. **Enhanced Components:** 25+ optimized React components
3. **Asset Documentation:** Comprehensive list of required visual assets with specs
4. **Performance Report:** Lighthouse scores and optimization summary
5. **Accessibility Report:** WCAG compliance checklist and remediation log
6. **Design System Guide:** Updated documentation of all UI patterns and utilities

### To-dos

- [x] Update global translations (EN/FR) with richer footer, navigation, and contact content from 01-globals.md
- [x] Enhance Home page translations with new hero copy, benefits examples, and expanded testimonials from 02-home.md
- [x] Optimize Header & Footer components with scroll animations, newsletter section, and enhanced mobile menu
- [x] Optimize Hero Experience components (ParallaxBackground, HeroContent) for performance and mobile
- [x] Update Home section components (HomeIntro, HomeCapabilities, HomeBenefits, HomeFeaturedProjects, HomeTestimonials)
- [x] Update About page translations with expanded timeline, credentials, and values from 03-about.md
- [x] Enhance About page components (PersonalIntro, CareerTimeline, ExperienceCounter, CredentialsShowcase)
- [x] Update Services page translations with 5-step process, enhanced features, and updated stats from 04-services.md
- [x] Enhance Services page components (ProcessTimeline to 5 phases, ServiceCard with features, CapabilityStats)
- [x] Update Portfolio page translations with 6 complete case studies and filtering from 05-portfolio.md
- [x] Enhance Portfolio components (ProjectCard with metrics, ProjectModal with case studies, ProjectFilter)
- [x] Update Contact page translations with expanded FAQ, project brief, and new form fields from 06-contact.md
- [x] Enhance Contact components (ContactForm with budget/timeline, FAQSection with 6 items, ProjectBrief wizard)
- [x] Create chatbot translations with suggested prompts from 07-chatbot.md
- [x] Create comprehensive required-assets.md with specs for all images, icons, and visual elements
- [x] Enhance AppIcon and AppImage components with new features (loading states, animations, optimization)
- [x] Implement performance optimizations (dynamic imports, React.memo, image optimization, font preloading)
- [ ] Complete accessibility audit and implement fixes (keyboard nav, ARIA labels, focus indicators, screen reader)
- [ ] Optimize mobile responsiveness across all breakpoints and test on real devices
- [x] Refine design system in tailwind.css with new utilities (glass-panel, mint-border-reveal, card-lift)
- [ ] Audit i18n for consistency, verify EN/FR parity, check for hard-coded strings
- [ ] Complete comprehensive testing (visual regression, cross-browser, performance, accessibility)
