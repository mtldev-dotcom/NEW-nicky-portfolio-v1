import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from 'components/ui/Header';
import PersonalIntro from './components/PersonalIntro';
import ExperienceCounter from './components/ExperienceCounter';
import CareerTimeline from './components/CareerTimeline';
import CredentialsShowcase from './components/CredentialsShowcase';

const AboutSection = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Head>
        <title>About - Nicky Bruno | The Creative Technologist</title>
        <meta name="description" content="Meet Nicky Bruno, The Creative Technologist with 20+ years of experience bridging design, development, and AI innovation. Montreal-based, globally minded." />
        <meta name="keywords" content="creative technologist, AI automation, web development, Montreal tech, design systems, full-stack developer" />
        <meta property="og:title" content="About - Nicky Bruno | The Creative Technologist" />
        <meta property="og:description" content="Two decades of evolution from creative foundation to AI pioneer, mastering the intersection of human creativity and technological innovation." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about-section" />
      </Head>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          {/* Personal Introduction Section */}
          <section className="py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <PersonalIntro />
            </div>
          </section>

          {/* Experience Counter Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-card/20 to-transparent">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <ExperienceCounter />
            </div>
          </section>

          {/* Career Timeline Section */}
          <section className="py-16 lg:py-24">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
              <CareerTimeline />
            </div>
          </section>

          {/* Credentials & Recognition Section */}
          <section className="py-16 lg:py-24 bg-gradient-to-br from-card/20 to-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <CredentialsShowcase />
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-16 lg:py-24">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-2xl border border-primary/20 p-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground">
                      Ready to Create Something
                      <span className="block text-primary text-glow">Extraordinary?</span>
                    </h2>
                    
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      With two decades of experience bridging creativity and technology, I'm positioned to tackle your most ambitious projects. Let's craft intelligent experiences that think, adapt, and evolve.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                      href="/contact-section"
                      className="inline-flex items-center justify-center px-8 py-4 bg-primary text-black font-space-grotesk font-semibold rounded-lg hover:bg-primary/90 transition-smooth glow-neon hover:glow-neon-active"
                    >
                      Start Your Project
                    </Link>

                    <Link
                      href="/portfolio-section"
                      className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-foreground font-space-grotesk font-semibold rounded-lg border border-border hover:border-primary/50 transition-smooth"
                    >
                      View My Work
                    </Link>
                  </div>

                  <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                      <span>Available for Projects</span>
                    </div>
                    <div className="w-1 h-1 bg-border rounded-full"></div>
                    <div className="flex items-center space-x-2">
                      <span>Response within 24h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default AboutSection;
