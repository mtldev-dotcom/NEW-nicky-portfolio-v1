import TestimonialsSection from 'components/sections/testimonials/TestimonialsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials - Nicky Bruno | Creative Technologist',
  description:
    'Hear from leaders, creatives, and innovators who partnered with Nicky Bruno to deliver AI-powered, design-driven experiences.',
  alternates: {
    canonical: '/testimonials-section',
  },
  openGraph: {
    title: 'Testimonials - Nicky Bruno',
    description:
      'Written, video, and LinkedIn reviews that highlight trusted collaborations across industries.',
    type: 'website',
  },
};

export default function TestimonialsPage() {
  return <TestimonialsSection />;
}
