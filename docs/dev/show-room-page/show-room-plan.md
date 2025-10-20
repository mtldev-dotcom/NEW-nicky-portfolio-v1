# 🧩 Showroom

## Intro
**Content:**  
Most of my client work is protected under NDA — which means I can’t share real client systems.  
Instead, welcome to the **Showroom**: a curated collection of **fictional demos, prototypes, and concept tools** built to demonstrate what’s possible when design, automation, and AI come together.  
Every example you see here represents a real capability — minus the confidential data.

**Layout & Visuals**
- Full-width glassy banner with glowing lock icon morphing into a holographic showcase grid.
- Headline: “Confidential by Design.” Subhead: “Discover secure, anonymized demos that reflect real client solutions.”
- Gradient mint divider under headline.
- Optional tagline chip row: “NDA-Protected • On-Premise • Private Cloud • Fictional Data.”

**(Optional) Animation**
- Lock icon smoothly morphs into a display grid on scroll.
- Headline and divider fade-slide upward on load.
- Particle background (low density, calm drift).

---

## Demo Gallery
**Content:**  
Grid of 6–8 interactive demo project cards. Each card uses **fictional branding and anonymized data**, showcasing your service range.

| Demo | Description | Highlights |
|------|--------------|-------------|
| **Nova AI Assistant** | Conversational agent for appointment booking. | On-premise deployment • Human-handoff mode |
| **Ecomix Storefront** | Bilingual e-commerce demo with smooth checkout flow. | Fast UX • Currency switcher • Live analytics |
| **FlowPilot Dashboard** | Automation control panel visualizing workflows. | n8n integration • real-time logs |
| **DataVault Analytics** | Privacy-first dashboard for KPI tracking. | Encrypted data layer • Role-based access |
| **Lumina Studio CMS** | Creative collaboration tool prototype. | Multi-user • Comment sync • Dark mode |
| **SecurAI Bot** | Local AI chatbot model running offline. | Private inference • Custom context memory |

**Layout & Visuals**
- 3-column responsive grid; each card:  
  - Thumbnail mockup or looping short clip (≤3s).  
  - Title, short description, small icon list (React, Next.js, AI, Automation).  
  - “View Demo” and “See Stack” buttons.
- Modal opens with:
  - Larger demo preview (image/video).
  - “About this Concept” text (explaining the tech behind it).
  - Optional live sandbox embed (iframe or codepen).

**(Optional) Animation**
- Grid items fade-in staggered on scroll.
- Hover → mint border glow + 2° tilt.
- Modal → scale-in with glass backdrop blur.

---

## Interactive Tools
**Content:**  
Mini front-end experiences that visitors can play with, safely isolated from production.

| Tool | Description |
|------|--------------|
| **AI Chat Sandbox** | Test the embedded chatbot demo connected to your n8n workflow. |
| **Workflow Visualizer** | Drag-and-drop automation builder showcasing UI flow ideas. |
| **Theme Customizer** | Toggle dark/light and accent hues for the holographic system. |
| **Performance Meter** | Demo tool visualizing optimization improvements live. |

**Layout & Visuals**
- Split grid (2x2) of interactive glass panels.
- Each tool block: short intro text + “Try it” button opening modal or live iframe.
- Subtle mint outline around active block.

**(Optional) Effects**
- Hover ripple; buttons glow mint.
- Ambient reflections animate slowly (Framer Motion loop).

---

## Privacy Statement
**Content:**  
> “Every project I build is unique — and often private.  
> This showroom features fictional or anonymized examples only.  
> Actual client systems are developed under NDA, hosted securely, and never shared publicly.”

- Add bullet points below:  
  - Signed NDAs for all engagements  
  - Optional local or on-premise hosting  
  - Encrypted communication & backups  
  - Strict confidentiality workflow  

**Layout & Visuals**
- Centered glass card with neon lock watermark behind text.
- Background: faint holographic wave animation.

**(Optional) Animation**
- Lock watermark pulses once every 10s (subtle opacity shift).
- Text slides upward with slight delay for elegance.

---

## Call to Action
**Content:**  
**“Want your own private system?”**  
Let’s design, automate, and deploy it — securely and confidentially.  
→ [Book a Confidential Call] or [Start a Secure Project]

**Layout & Visuals**
- Full-width dark band with centered headline + dual CTAs.
- CTA buttons: one solid mint glow, one outlined mint border.
- Subtext: “Every conversation starts under NDA.”

**(Optional) Effects**
- CTA glow intensifies as section scrolls into view.
- Optional animated line from lock → button (symbolizing trust handshake).

---

## Notes
- File: `/src/app/[locale]/showroom/page.tsx`
- Add new translation namespace: `showroom.json` under `src/i18n/messages/{en,fr}/`
- Update global nav label: “Showroom / Salle d’exposition”
- Internal links:
  - Home “See My Work” → `/[locale]/showroom`
  - About “View Work” → `/[locale]/showroom`
  - Footer “Portfolio” → rename to “Showroom”

---
