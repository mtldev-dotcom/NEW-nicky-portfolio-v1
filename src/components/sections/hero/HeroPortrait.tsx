'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PortraitGeometricBackground from './PortraitGeometricBackground';

const HeroPortrait = () => {
  const t = useTranslations('home.hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const animationFrameRef = useRef<number>();
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced mouse tracking with RAF throttling
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 15; // Portrait moves slower
        const y = (e.clientY / window.innerHeight - 0.5) * 15;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldReduceMotion, isMobile]);

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current?.naturalWidth) {
      setIsLoaded(true);
    }
  }, []);

  // Scroll-based transforms for portrait
  const portraitY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 50]);
  const portraitScale = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.95]);
  const portraitOpacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.8]);

  return (
    <div className="relative z-50 w-full flex justify-center">
      {/* Geometric Background Layers */}
      <PortraitGeometricBackground className="absolute inset-0" />

      {/* Portrait Container */}
      <motion.div
        className="relative"
        style={{
          y: portraitY,
          scale: portraitScale,
          opacity: portraitOpacity,
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x}px`,
          translateY: shouldReduceMotion ? 0 : `${mousePosition.y}px`,
          willChange: 'transform',
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.8,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="relative mx-auto h-48 w-48 sm:h-64 sm:w-64 md:h-72 md:w-72 lg:h-80 lg:w-80 xl:h-96 xl:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-2xl" />

          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/30 glow-neon">
            <Image
              src="/assets/images/nicky-profile-img-no-bkground.png"
              alt={t('portraitAlt')}
              width={384}
              height={384}
              className="h-full w-full object-cover"
              ref={imageRef}
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                console.log('Image failed to load, trying fallback');
                const img = e.target as HTMLImageElement;
                img.src = '/assets/images/profil_portrait.jpg';
                setIsLoaded(true);
              }}
              priority
              quality={90}
            />

            <div className="absolute inset-0 mix-blend-overlay bg-gradient-to-br from-primary/10 via-transparent to-primary/5" />

            <motion.div
              className="absolute inset-0 h-8 bg-gradient-to-b from-transparent via-primary/20 to-transparent"
              animate={{
                y: ['-2rem', '24rem', '-2rem'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Enhanced floating decorative elements with better z-index */}
          <motion.div
            className="absolute -top-4 -right-4 h-8 w-8 rounded border border-primary/40 bg-primary/10 backdrop-blur-sm hidden sm:block z-10"
            animate={shouldReduceMotion ? {} : {
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 hidden sm:flex h-6 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm z-10"
            animate={shouldReduceMotion ? {} : {
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <div className="h-2 w-2 rounded-full bg-primary/60" />
          </motion.div>

          <motion.div
            className="absolute top-1/4 -left-8 h-6 w-6 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm hidden sm:block z-10"
            animate={shouldReduceMotion ? {} : {
              x: [0, -5, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />

          <motion.div
            className="absolute top-3/4 -right-8 h-4 w-10 rounded border border-primary/25 bg-primary/5 backdrop-blur-sm hidden sm:block z-10"
            animate={shouldReduceMotion ? {} : {
              x: [0, 8, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <div className="p-1">
              <div className="h-0.5 w-full rounded bg-primary/40" />
            </div>
          </motion.div>
        </div>

        {/* Status indicator with enhanced styling */}
        <motion.div
          className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center space-x-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 backdrop-blur-sm z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-primary"
            animate={shouldReduceMotion ? {} : {
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-xs font-inter text-muted-foreground">
            {t('status')}
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroPortrait;
