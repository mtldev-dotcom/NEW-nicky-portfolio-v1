import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import HeroExperience from 'components/sections/hero/HeroExperience';
import HomeIntro from 'components/sections/home/HomeIntro';
import HomeCapabilities from 'components/sections/home/HomeCapabilities';
import HomeBenefits from 'components/sections/home/HomeBenefits';
import TechStackShowcase from 'components/sections/home/TechStackShowcase';
import HomeFeaturedProjects from 'components/sections/home/HomeFeaturedProjects';
import HomeTestimonials from 'components/sections/home/HomeTestimonials';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}`,
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      siteName: t('metadata.ogSiteName'),
      type: 'website',
      locale: locale,
    },
  };
}

export default function LocaleHomePage() {
  return (
    <>
      <Header />
      <HeroExperience />
      <HomeIntro />
      <HomeCapabilities />
      <HomeBenefits />
      <TechStackShowcase />
      <HomeFeaturedProjects />
      <HomeTestimonials />
      <Footer />
    </>
  );
}
