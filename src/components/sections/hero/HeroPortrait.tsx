'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'components/AppImage';

const HeroPortrait = () => {
  const t = useTranslations('home.hero');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current?.naturalWidth) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative z-10">
      <motion.div
        className="relative"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          scale: isLoaded ? 1 : 0.8,
        }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <div className="relative mx-auto h-80 w-80 lg:h-96 lg:w-96">
          <div className="absolute inset-0 rounded-full bg-gradient-radial from-primary/20 via-primary/10 to-transparent blur-2xl" />

          <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-primary/30 glow-neon">
            <Image
              src="/assets/images/nicky-profile-img.png"
              alt={t('portraitAlt')}
              className="h-full w-full object-cover"
              ref={imageRef}
              onLoad={() => setIsLoaded(true)}
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

          <motion.div
            className="absolute -top-4 -right-4 h-8 w-8 rounded border border-primary/40 bg-primary/10 backdrop-blur-sm"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 flex h-6 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/5 backdrop-blur-sm"
            animate={{
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
            className="absolute top-1/4 -left-8 h-6 w-6 rounded-full border border-primary/35 bg-primary/10 backdrop-blur-sm"
            animate={{
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
            className="absolute top-3/4 -right-8 h-4 w-10 rounded border border-primary/25 bg-primary/5 backdrop-blur-sm"
            animate={{
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

        <motion.div
          className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 items-center space-x-2 rounded-full border border-primary/20 bg-card/80 px-4 py-2 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="h-2 w-2 rounded-full bg-primary"
            animate={{
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
