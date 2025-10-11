'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

type LoadingAnimationProps = {
  onComplete: () => void;
};

const stepKeys = ['one', 'two', 'three', 'four', 'five'] as const;

const LoadingAnimation = ({ onComplete }: LoadingAnimationProps) => {
  const t = useTranslations('home.loading');
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = useMemo(
    () => stepKeys.map((key) => t(`steps.${key}`)),
    [t]
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + Math.random() * 15;
        if (nextProgress >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => onComplete(), 500);
          return 100;
        }
        return nextProgress;
      });
    }, 200);

    return () => window.clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 800);

    return () => window.clearInterval(stepTimer);
  }, [steps.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-md px-6 text-center">
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70 font-space-grotesk text-2xl font-bold text-black glow-neon">
              NB
            </div>
          </motion.div>

          <motion.h3
            className="mb-4 text-sm font-space-grotesk uppercase tracking-[0.3em] text-muted-foreground"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('title')}
          </motion.h3>

          <div className="mb-6">
            <div className="h-1 w-full overflow-hidden rounded-full bg-gray-800">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.div
              className="mt-2 font-space-grotesk text-lg font-medium text-primary"
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          <motion.div
            className="mb-8 h-6"
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-inter text-muted-foreground">
              {steps[currentStep]}
            </p>
          </motion.div>

          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="h-2 w-2 rounded-full bg-primary/60"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0">
            <motion.div
              className="absolute left-1/4 top-1/4 h-12 w-20 rounded border border-primary/20 backdrop-blur-sm"
              animate={{
                opacity: [0, 0.5, 0],
                rotate: [0, 10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute right-1/4 top-1/3 h-16 w-16 rounded-full border border-primary/15 backdrop-blur-sm"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingAnimation;
