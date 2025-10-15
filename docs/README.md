# Portfolio Documentation

Welcome to the documentation for Nicky Bruno's portfolio website.

## Quick Links

- 📘 [Contact Form n8n Integration](./contact-form-n8n-integration.md) - Complete guide to the contact form automation
- 🔧 [Troubleshooting Guide](./troubleshooting.md) - Common issues and solutions

## Overview

This portfolio is built with:
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **i18n:** next-intl (EN/FR)
- **Automation:** n8n workflows

## Active Integrations

### Contact Form ✅
- **Status:** Active
- **Endpoint:** `https://n8n.nickyhome.casa/webhook-test/contact-form`
- **Documentation:** [contact-form-n8n-integration.md](./contact-form-n8n-integration.md)

## Quick Start

### Testing Contact Form

```bash
# Navigate to contact page
http://localhost:3000/contact

# Or test with cURL
curl -X POST https://n8n.nickyhome.casa/webhook-test/contact-form \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "Test message"
  }'
```

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Documentation Structure

```
docs/
├── README.md (this file - overview and quick links)
├── contact-form-n8n-integration.md (detailed integration guide)
└── troubleshooting.md (common issues and solutions)
```

## Component Locations

- **Contact Form:** `src/components/sections/contact/ContactForm.tsx`
- **UI Components:** `src/components/ui/`
- **Sections:** `src/components/sections/`
- **Translations:** `src/i18n/messages/`

## Maintenance

### Regular Checks

**Weekly:**
- Monitor n8n execution logs
- Verify contact form submissions

**Monthly:**
- Test all integrations
- Update dependencies
- Review analytics

## Support

For questions or issues:
- Email: nickdevmtl@gmail.com
- n8n Dashboard: https://n8n.nickyhome.casa

---

**Last Updated:** October 15, 2025

