import Header from 'components/ui/Header';
import Footer from 'components/ui/Footer';
import ShowroomSection from 'components/sections/showroom/ShowroomSection';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'showroom' });

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: {
            canonical: `/${locale}/showroom`,
        },
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            locale: locale,
        },
    };
}

export default function ShowroomPage() {
    return (
        <>
            <Header />
            <ShowroomSection />
            <Footer />
        </>
    );
}
