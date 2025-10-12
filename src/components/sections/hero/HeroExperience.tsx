'use client';

import { useCallback, useEffect, useState } from 'react';
import Header from 'components/ui/Header';
import FloatingTaglines from './FloatingTaglines';
import HeroContent from './HeroContent';
import HeroPortrait from './HeroPortrait';
import HolographicOverlay from './HolographicOverlay';
import LoadingAnimation from './LoadingAnimation';
import ParallaxBackground from './ParallaxBackground';

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
      {isLoading && <LoadingAnimation onComplete={handleLoadingComplete} />}

      <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
        <ParallaxBackground />
        <HolographicOverlay />

        <Header />

        <main className="relative z-10 flex min-h-screen flex-col items-stretch justify-center pt-16">
          <section className="relative w-full min-h-[calc(100vh-4rem)] px-6 lg:px-8 flex items-center">
            <FloatingTaglines />

            <div className="relative mx-auto w-full max-w-7xl grid items-center justify-items-start gap-10 md:gap-14 lg:gap-16 lg:grid-cols-[1.2fr_0.8fr]">
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
