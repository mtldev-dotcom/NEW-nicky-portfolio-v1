// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import Button from '../../../components/ui/Button';

const HeroContent = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  const glowVariants = {
    animate: {
      textShadow: [
        "0 0 10px rgba(0, 255, 209, 0.5)",
        "0 0 20px rgba(0, 255, 209, 0.8)",
        "0 0 10px rgba(0, 255, 209, 0.5)"
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
      {/* Main Heading */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={0}
      >
        <motion.h1 
          className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-foreground mb-4"
          variants={glowVariants}
          animate="animate"
        >
          nicky bruno
        </motion.h1>
        <motion.div
          className="h-1 w-24 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>
      {/* Tagline */}
      <motion.h2
        className="text-xl md:text-2xl lg:text-3xl font-space-grotesk font-medium text-primary mb-6"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={1}
      >
        creative technologist
      </motion.h2>
      {/* Key Messages */}
      <motion.div
        className="space-y-4 mb-12"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={2}
      >
        <p className="text-lg md:text-xl text-muted-foreground font-inter leading-relaxed">
          Where design, code, and AI meet creativity
        </p>
        <p className="text-base md:text-lg text-muted-foreground font-inter leading-relaxed max-w-2xl mx-auto">
          I don't just build websites—I craft intelligent experiences that think, adapt, and evolve. 
          Montreal-made innovation for global impact.
        </p>
      </motion.div>
      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={3}
      >
        <Button
          variant="default"
          size="lg"
          className="glow-neon hover:glow-neon-active transition-smooth magnetic-hover"
          iconName="Zap"
          iconPosition="left"
          iconSize={20}
        >
          Start a Project
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="border-primary/30 text-primary hover:bg-primary/10 transition-smooth magnetic-hover"
          iconName="Play"
          iconPosition="left"
          iconSize={18}
        >
          Watch Showreel
        </Button>
      </motion.div>
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center space-y-2 text-muted-foreground"
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <span className="text-xs font-inter uppercase tracking-wider">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
          <motion.div
            className="w-2 h-2 border border-primary/50 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </motion.div>
      {/* Stats */}
      <motion.div
        className="absolute bottom-20 left-0 right-0 hidden lg:flex justify-center space-x-12"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={4}
      >
        {[
          { number: "20+", label: "Years Experience" },
          { number: "100+", label: "Projects Delivered" },
          { number: "50+", label: "Happy Clients" }
        ]?.map((stat, index) => (
          <motion.div
            key={stat?.label}
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-2xl font-space-grotesk font-bold text-primary mb-1">
              {stat?.number}
            </div>
            <div className="text-xs font-inter text-muted-foreground uppercase tracking-wider">
              {stat?.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroContent;
