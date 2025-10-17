# 🎨 Components & Style Notes

## Component Mapping
- Header/Footer/LanguageSwitcher → `components/ui/*`
- Hero → `sections/hero/*` (ParallaxBackground, HolographicOverlay, HeroContent)
- Home → `sections/home/*` (HomeIntro, HomeBenefits, HomeFeaturedProjects, HomeTestimonials)
- About → `sections/about/*` (PersonalIntro, CareerTimeline, ExperienceCounter, CredentialsShowcase)
- Services → `sections/services/*` (ServicesSection, ServiceCard, ProcessTimeline, CapabilityStats, TechStack)
- Portfolio → `sections/portfolio/*` (ProjectCard, ProjectModal, ProjectFilter, FeaturedProject)
- Testimonials → `sections/testimonials/*` (TestimonialCarousel, TestimonialCard, ClientLogos)
- Contact → `sections/contact/*` (ContactForm, ContactInfo, FAQSection, ProjectBrief, LocationMap)

## Typography
- Space Grotesk (headings), Inter (body), JetBrains Mono (accents).

## Surfaces & Effects
- Soft radii; glass surfaces; neon borders; thin gradient dividers; GPU-friendly transforms only.

## Motion
- Subtle, intentful; respect `prefers-reduced-motion`.
- Avoid long-running heavy animations; keep glow subtle; avoid mint for long text blocks.
