import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import PortfolioSection from 'components/sections/portfolio/PortfolioSection';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'portfolio' });

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
    alternates: {
      canonical: `/${locale}/portfolio`,
    },
    openGraph: {
      title: t('metadata.ogTitle'),
      description: t('metadata.ogDescription'),
      type: 'website',
      locale: locale,
    },
  };
}

export default function PortfolioPage() {
  return (
    <>
      <Header />
      <PortfolioSection />
      <Footer />
    </>
  );
}
