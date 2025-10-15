import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import AboutSection from 'components/sections/about/AboutSection';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/about`,
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      locale: locale,
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <AboutSection />
      <Footer />
    </>
  );
}
