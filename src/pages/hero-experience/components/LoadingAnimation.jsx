import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingAnimation = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Initializing AI systems...",
    "Loading creative modules...",
    "Connecting neural networks...",
    "Calibrating holographic display...",
    "Ready to create magic..."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps?.length);
    }, 800);

    return () => clearInterval(stepTimer);
  }, [steps?.length]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md mx-auto px-6">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center glow-neon mx-auto">
              <span className="text-black font-space-grotesk font-bold text-2xl">NB</span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.div
              className="text-primary font-space-grotesk font-medium text-lg mt-2"
              key={progress}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </div>

          {/* Loading Steps */}
          <motion.div
            className="h-6 mb-8"
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-muted-foreground font-inter text-sm">
              {steps?.[currentStep]}
            </p>
          </motion.div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2]?.map((index) => (
              <motion.div
                key={index}
                className="w-2 h-2 bg-primary/60 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>

          {/* Holographic Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-20 h-12 border border-primary/20 rounded backdrop-blur-sm"
              animate={{
                opacity: [0, 0.5, 0],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/15 rounded-full backdrop-blur-sm"
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingAnimation;