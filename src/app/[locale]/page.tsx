import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import HeroExperience from 'components/sections/hero/HeroExperience';
import HomeCapabilities from 'components/sections/home/HomeCapabilities';
import HomeFeaturedProjects from 'components/sections/home/HomeFeaturedProjects';
import HomeTestimonials from 'components/sections/home/HomeTestimonials';
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
    siteName: 'Nicky Bruno',
    type: 'website',
  },
};

export default function LocaleHomePage() {
  return (
    <>
      <Header />
      <HeroExperience />
      <HomeCapabilities />
      <HomeFeaturedProjects />
      <HomeTestimonials />
      <Footer />
    </>
  );
}
