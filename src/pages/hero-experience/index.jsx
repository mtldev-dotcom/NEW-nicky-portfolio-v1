import React, { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import Header from 'components/ui/Header';
import ParallaxBackground from './components/ParallaxBackground';
import FloatingTaglines from './components/FloatingTaglines';
import HeroContent from './components/HeroContent';
import HeroPortrait from './components/HeroPortrait';
import HolographicOverlay from './components/HolographicOverlay';
import LoadingAnimation from './components/LoadingAnimation';

const HeroExperience = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Nicky Bruno | Creative Technologist & Experience Designer</title>
        <meta
          name="description"
          content="Step into the immersive hero experience of Nicky Bruno, the creative technologist blending design, engineering, and AI-driven storytelling."
        />
        <meta property="og:title" content="Nicky Bruno | Creative Technologist" />
        <meta
          property="og:description"
          content="Navigate a holographic-inspired interface showcasing the innovation and craft behind Nicky Bruno's work."
        />
        <link rel="canonical" href="/hero-experience" />
      </Head>

      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
        <ParallaxBackground />
        <HolographicOverlay />

        <Header />

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pt-24 pb-16">
          <section className="relative w-full max-w-6xl mx-auto px-6 lg:px-8">
            <FloatingTaglines />

            <div className="relative grid gap-16 lg:grid-cols-[1.1fr_0.9fr] items-center justify-items-center">
              <HeroContent />
              <HeroPortrait />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default HeroExperience;
