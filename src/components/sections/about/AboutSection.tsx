'use client';

import { type FC, useEffect } from 'react';
import Link from 'next/link';
import Header from 'components/ui/Header';
import CareerTimeline from './CareerTimeline';
import CredentialsShowcase from './CredentialsShowcase';
import ExperienceCounter from './ExperienceCounter';
import PersonalIntro from './PersonalIntro';

const AboutSection: FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

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
                  Ready to Create Something
                  <span className="text-glow block text-primary">Extraordinary?</span>
                </h2>

                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  With two decades of experience bridging creativity and technology, I&apos;m positioned to tackle your most ambitious projects. Let&apos;s craft intelligent experiences that think, adapt, and evolve.
                </p>
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact-section"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-4 font-space-grotesk font-semibold text-black transition-smooth hover:bg-primary/90 glow-neon hover:glow-neon-active"
                >
                  Start Your Project
                </Link>

                <Link
                  href="/portfolio-section"
                  className="inline-flex items-center justify-center rounded-lg border border-border px-8 py-4 font-space-grotesk font-semibold text-foreground transition-smooth hover:border-primary/50"
                >
                  View My Work
                </Link>
              </div>

              <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  <span>Available for Projects</span>
                </div>
                <div className="h-1 w-1 rounded-full bg-border" />
                <div className="flex items-center space-x-2">
                  <span>Response within 24h</span>
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
