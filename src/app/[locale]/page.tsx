import HeroExperience from 'components/sections/hero/HeroExperience';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nicky Bruno | Creative Technologist & Experience Designer',
  description:
    'Step into the immersive hero experience of Nicky Bruno, the creative technologist blending design, engineering, and AI-driven storytelling.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nicky Bruno | Creative Technologist',
    description:
      "Navigate a holographic-inspired interface showcasing the innovation and craft behind Nicky Bruno's work.",
    url: 'https://nickybruno.ca/',
    siteName: 'Nicky Bruno',
    type: 'website',
  },
};

export default function HomePage() {
  return <HeroExperience />;
}
