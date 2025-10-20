import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// Dynamic imports for heavy components
const HeroExperience = dynamic(() => import('components/sections/hero/HeroExperience'), {
  loading: () => <div className="h-screen bg-background" />,
});

const HomeIntro = dynamic(() => import('components/sections/home/HomeIntro'), {
  loading: () => <div className="h-96 bg-background" />,
});

const HomeCapabilities = dynamic(() => import('components/sections/home/HomeCapabilities'), {
  loading: () => <div className="h-96 bg-background" />,
});

const HomeBenefits = dynamic(() => import('components/sections/home/HomeBenefits'), {
  loading: () => <div className="h-96 bg-background" />,
});

const HomeTrust = dynamic(() => import('components/sections/home/HomeTrust'), {
  loading: () => <div className="h-96 bg-background" />,
});

const TechStackShowcase = dynamic(() => import('components/sections/home/TechStackShowcase'), {
  loading: () => <div className="h-96 bg-background" />,
});

const HomeFeaturedProjects = dynamic(() => import('components/sections/home/HomeFeaturedProjects'), {
  loading: () => <div className="h-96 bg-background" />,
});

const HomeTestimonials = dynamic(() => import('components/sections/home/HomeTestimonials'), {
  loading: () => <div className="h-96 bg-background" />,
});

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
      <main id="main-content" role="main">
        <HeroExperience />
        <HomeIntro />
        <HomeCapabilities />
        <HomeBenefits />
        <HomeTrust />
        <TechStackShowcase />
        <HomeFeaturedProjects />
        <HomeTestimonials />
      </main>
      <Footer />
    </>
  );
}
