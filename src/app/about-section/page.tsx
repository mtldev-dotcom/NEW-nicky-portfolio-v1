import AboutSection from 'components/sections/about/AboutSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - Nicky Bruno | The Creative Technologist',
  description:
    'Meet Nicky Bruno, the creative technologist bridging design, development, and AI innovation from Montreal to the world.',
  alternates: {
    canonical: '/about-section',
  },
  openGraph: {
    title: 'About - Nicky Bruno | The Creative Technologist',
    description:
      'Two decades of evolution from creative foundation to AI pioneer, mastering the intersection of human creativity and technological innovation.',
    type: 'website',
  },
};

export default function AboutPage() {
  return <AboutSection />;
}
