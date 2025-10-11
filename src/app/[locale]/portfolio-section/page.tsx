import PortfolioSection from 'components/sections/portfolio/PortfolioSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Nicky Bruno | Creative Technologist',
  description:
    'Dive into AI automation, immersive web experiences, and strategic digital products crafted by Nicky Bruno.',
  alternates: {
    canonical: '/portfolio-section',
  },
  openGraph: {
    title: 'Portfolio - Nicky Bruno',
    description:
      'Case studies and featured projects spanning AI platforms, experiential design, and full-stack builds.',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return <PortfolioSection />;
}
