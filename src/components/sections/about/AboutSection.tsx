'use client';

import { type FC, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import CareerTimeline from './CareerTimeline';
import CredentialsShowcase from './CredentialsShowcase';
import ExperienceCounter from './ExperienceCounter';
import PersonalIntro from './PersonalIntro';

const AboutSection: FC = () => {
  const locale = useLocale();
  const t = useTranslations('about');
  const tGlobal = useTranslations('global');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">

      <main className="pt-16">
        {/* Personal Introduction Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PersonalIntro />
          </div>
        </section>

        {/* Experience Counter Section */}
        <section className="bg-gradient-to-br from-card/20 to-transparent py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <ExperienceCounter />
          </div>
        </section>

        {/* Career Timeline Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <CareerTimeline />
          </div>
        </section>

        {/* Credentials & Recognition Section */}
        <section className="bg-gradient-to-br from-card/20 to-transparent py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <CredentialsShowcase />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
            <div className="space-y-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-12 backdrop-blur-sm">
              <div className="space-y-4">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground lg:text-4xl">
                  {t('sections.cta.title')}
                  <span className="text-glow block text-primary">{t('sections.cta.titleHighlight')}</span>
                </h2>

                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  {t('sections.cta.description')}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-space-grotesk font-semibold text-black transition-smooth hover:bg-primary/90 glow-neon hover:glow-neon-active"
                >
                  {t('sections.cta.buttons.startProject')}
                </Link>

                <Link
                  href={`/${locale}/showroom`}
                  className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-4 font-space-grotesk font-semibold text-foreground transition-smooth hover:border-primary/50"
                >
                  {t('sections.cta.buttons.viewWork')}
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span>{t('sections.cta.status.available')}</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center space-x-2">
                  <span>{t('sections.cta.status.response')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutSection;
