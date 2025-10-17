'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Icon from 'components/AppIcon';
import { useTranslations } from 'next-intl';

const CapabilityStats = () => {
  const t = useTranslations('services.stats');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const iconVariants = {
    inactive: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6 }
    },
  };

  const numberVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    {
      icon: "Calendar",
      value: t('experience.value'),
      label: t('experience.label'),
      description: t('experience.description')
    },
    {
      icon: "Briefcase",
      value: t('projects.value'),
      label: t('projects.label'),
      description: t('projects.description')
    },
    {
      icon: "Users",
      value: t('clients.value'),
      label: t('clients.label'),
      description: t('clients.description')
    },
    {
      icon: "Zap",
      value: t('retention.value'),
      label: t('retention.label'),
      description: t('retention.description')
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {stats?.map((stat, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="group text-center"
          whileHover={{ scale: 1.05 }}
        >
          <div className="relative mb-4">
            <motion.div
              className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 glow-neon"
              variants={iconVariants}
              whileHover="hover"
            >
              <Icon
                name={stat?.icon}
                size={24}
                className="text-primary group-hover:text-primary transition-colors duration-300"
              />
            </motion.div>

            {/* Floating particles effect */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute top-0 left-1/2 w-1 h-1 bg-primary rounded-full"
                animate={{
                  y: [-10, -20, -10],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
              <motion.div
                className="absolute top-2 right-2 w-0.5 h-0.5 bg-primary rounded-full"
                animate={{
                  y: [-5, -15, -5],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />
            </motion.div>
          </div>

          <div className="space-y-2">
            <motion.div
              className="text-3xl font-space-grotesk font-bold text-foreground group-hover:text-primary transition-colors duration-300"
              variants={numberVariants}
            >
              {stat?.value}
            </motion.div>
            <div className="text-sm font-medium text-muted-foreground">
              {stat?.label}
            </div>
            <motion.p
              className="text-xs text-muted-foreground/80 leading-relaxed hidden lg:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {stat?.description}
            </motion.p>
          </div>

          {/* Progress bar animation */}
          <motion.div
            className="w-full h-1 bg-muted/20 rounded-full mt-3 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 1.5,
                delay: index * 0.2 + 0.5,
                ease: "easeOut"
              }}
            />
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default CapabilityStats;
