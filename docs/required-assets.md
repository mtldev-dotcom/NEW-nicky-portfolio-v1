# Required Visual Assets Documentation

This document outlines all visual assets needed for the Nicky Bruno Portfolio website, organized by section and component.

## Hero Section Assets

### Hero Portrait Image
- **Path**: `/public/assets/images/nicky-hero-portrait.webp`
- **Size**: 800x1000px (4:5 aspect ratio)
- **Format**: WebP (optimized)
- **File Size**: < 200KB
- **Description**: Professional headshot of Nicky Bruno, ideally with subtle lighting that complements the dark theme
- **Alt Text**: Defined in translations (`home.hero.portraitAlt`)

## Project Images (6 Featured Projects)

### 1. AIAA.dev Cover Image
- **Path**: `/public/assets/images/projects/aiaa-dev.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Screenshot or mockup of the AIAA.dev platform interface

### 2. Montreal Tech Hub Cover
- **Path**: `/public/assets/images/projects/montreal-tech-hub.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Community platform interface or event showcase

### 3. EcoTrack Analytics Cover
- **Path**: `/public/assets/images/projects/ecotrack-analytics.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Dashboard or analytics interface showing environmental data

### 4. FinanceFlow Mobile Cover
- **Path**: `/public/assets/images/projects/financeflow-mobile.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Mobile app interface or financial dashboard

### 5. CreativeStudio Pro Cover
- **Path**: `/public/assets/images/projects/creative-studio-pro.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Creative tool interface or design showcase

### 6. HealthConnect Platform Cover
- **Path**: `/public/assets/images/projects/healthconnect-platform.webp`
- **Size**: 1200x800px (3:2 aspect ratio)
- **Format**: WebP
- **File Size**: < 300KB
- **Description**: Healthcare platform interface or patient portal

## Technology Icons

### Existing Icons Location
- **Path**: `/public/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/`
- **Status**: ✅ Available
- **Action Required**: Create mapping document for icon → component usage

### Required Icon Mapping
Create a mapping document (`docs/icon-mapping.md`) that maps:
- Icon filename → Component usage
- Icon filename → Translation key
- Icon filename → Category (Frontend, Backend, AI, Tools)

## Credential Badges

### 1. AWS Certification Badge
- **Path**: `/public/assets/images/credentials/aws-certification.svg`
- **Size**: 200x200px
- **Format**: SVG (preferred) or PNG
- **Description**: Official AWS certification badge

### 2. Google AI/ML Badge
- **Path**: `/public/assets/images/credentials/google-ai-ml.svg`
- **Size**: 200x200px
- **Format**: SVG (preferred) or PNG
- **Description**: Google AI/ML certification badge

### 3. React Advanced Badge
- **Path**: `/public/assets/images/credentials/react-advanced.svg`
- **Size**: 200x200px
- **Format**: SVG (preferred) or PNG
- **Description**: React advanced certification badge

### 4. Adobe UX Badge
- **Path**: `/public/assets/images/credentials/adobe-ux.svg`
- **Size**: 200x200px
- **Format**: SVG (preferred) or PNG
- **Description**: Adobe UX certification badge

## Company Logos (Testimonials)

### 1. Sofia AI Desk Logo
- **Path**: `/public/assets/images/clients/sofia-ai-desk.png`
- **Size**: 300x100px
- **Format**: PNG with transparent background
- **Description**: Company logo for testimonial attribution

### 2. InnovateTech Logo
- **Path**: `/public/assets/images/clients/innovate-tech.png`
- **Size**: 300x100px
- **Format**: PNG with transparent background
- **Description**: Company logo for testimonial attribution

### 3. Pixel Perfect Agency Logo
- **Path**: `/public/assets/images/clients/pixel-perfect-agency.png`
- **Size**: 300x100px
- **Format**: PNG with transparent background
- **Description**: Company logo for testimonial attribution

## Additional Visual Elements

### Background Patterns
- **Parallax Background**: Currently using CSS gradients and shapes
- **Status**: ✅ Implemented
- **Enhancement**: Consider adding subtle texture overlays

### Icon Library Expansion
- **Current**: Lucide Icons via AppIcon component
- **Required Icons**: Calendar, Zap, Award, BookOpen, MapPin, Clock
- **Status**: ✅ Available in Lucide
- **Action**: Verify all required icons are available

## Asset Optimization Guidelines

### Image Optimization
1. **WebP Format**: Use WebP for all photographic content
2. **Responsive Images**: Implement `srcset` for different screen sizes
3. **Lazy Loading**: Implement lazy loading for below-fold images
4. **Compression**: Maintain quality while minimizing file size

### Performance Targets
- **Hero Image**: < 200KB
- **Project Images**: < 300KB each
- **Icons**: < 10KB each
- **Logos**: < 50KB each

### Accessibility Requirements
- **Alt Text**: All images must have descriptive alt text
- **Contrast**: Ensure sufficient contrast for any text overlays
- **Focus Indicators**: Interactive elements must have visible focus states

## Implementation Priority

### Phase 1 (High Priority)
1. Hero portrait image
2. 3 primary project images (AIAA.dev, Montreal Tech Hub, EcoTrack)
3. Credential badges (AWS, Google AI/ML)

### Phase 2 (Medium Priority)
1. Remaining 3 project images
2. Company logos for testimonials
3. Additional credential badges

### Phase 3 (Low Priority)
1. Icon mapping documentation
2. Background texture enhancements
3. Additional visual polish elements

## Asset Delivery Checklist

- [ ] Hero portrait image (800x1000px, WebP, <200KB)
- [ ] 6 project cover images (1200x800px, WebP, <300KB each)
- [ ] 4 credential badges (200x200px, SVG preferred)
- [ ] 3 company logos (300x100px, PNG with transparency)
- [ ] Icon mapping documentation
- [ ] Alt text for all images
- [ ] Performance optimization verification
- [ ] Accessibility compliance check

## Notes

- All assets should be optimized for the dark theme aesthetic
- Consider creating light mode variants if needed
- Maintain consistent visual style across all assets
- Test all assets on various screen sizes and devices
