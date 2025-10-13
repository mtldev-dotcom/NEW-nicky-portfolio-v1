import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import ServicesSection from 'components/sections/services/ServicesSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Nicky Bruno | Creative Technologist',
  description:
    'Explore creative design, full-stack development, AI automation, and strategic consulting services crafted by Nicky Bruno.',
  alternates: {
    canonical: '/services-section',
  },
  openGraph: {
    title: 'Services - Nicky Bruno',
    description:
      'Comprehensive creative technology services spanning design systems, full-stack builds, and intelligent automation.',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <ServicesSection />
      <Footer />
    </>
  ) ;
}
