'use client';

import React, { type FC, useEffect, useMemo, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Icon, { type IconName } from "components/AppIcon";

const TARGET_YEARS = 20;
const TARGET_PROJECTS = 150;
const TARGET_CLIENTS = 85;
const TARGET_AWARDS = 12;

type StatSetting = {
  icon: IconName;
  suffix: string;
  labelKey: string;
  descriptionKey: string;
  color: string;
  target: number;
};

const statSettings: StatSetting[] = [
  {
    icon: "Calendar",
    target: TARGET_YEARS,
    suffix: "+",
    labelKey: "years.label",
    descriptionKey: "years.description",
    color: "text-primary",
  },
  {
    icon: "Briefcase",
    target: TARGET_PROJECTS,
    suffix: "+",
    labelKey: "projects.label",
    descriptionKey: "projects.description",
    color: "text-blue-400",
  },
  {
    icon: "Users",
    target: TARGET_CLIENTS,
    suffix: "+",
    labelKey: "clients.label",
    descriptionKey: "clients.description",
    color: "text-green-400",
  },
  {
    icon: "Award",
    target: TARGET_AWARDS,
    suffix: "",
    labelKey: "awards.label",
    descriptionKey: "awards.description",
    color: "text-yellow-400",
  },
];

const ExperienceCounter: FC = () => {
  const t = useTranslations("about.sections.experienceCounter");
  const [progress, setProgress] = useState(0);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  useEffect(() => {
    if (isInView) {
      const durationMs = 2000;
      const steps = 60;
      const stepDuration = durationMs / steps;

      let currentStep = 0;
      const timer = window.setInterval(() => {
        currentStep += 1;
        const nextProgress = Math.min(currentStep / steps, 1);
        setProgress(nextProgress);

        if (nextProgress >= 1) {
          window.clearInterval(timer);
        }
      }, stepDuration);

      return () => window.clearInterval(timer);
    }
  }, [isInView]);

  const stats = useMemo(
    () =>
      statSettings.map((setting) => ({
        ...setting,
        label: t(`stats.${setting.labelKey}`),
        description: t(`stats.${setting.descriptionKey}`),
        value: Math.floor(setting.target * progress),
      })),
    [progress, t]
  );

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm rounded-2xl border border-border/50 p-8 lg:p-12 glass-panel"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <span className="text-sm font-mono text-primary uppercase tracking-wider">{t('badge')}</span>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <h3 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
          {t('title')}
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8" variants={containerVariants}>
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="text-center group"
            variants={statVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-smooth" />

              <motion.div
                className="relative bg-card/80 backdrop-blur-sm rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-smooth glow-neon"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Icon name={stat.icon} size={32} className={stat.color} />
              </motion.div>
            </div>

            <div className="space-y-2">
              <motion.div
                className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                {stat.value}
                <span className={stat.color}>{stat.suffix}</span>
              </motion.div>

              <h4 className="font-space-grotesk font-semibold text-foreground text-lg">
                {stat.label}
              </h4>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-12 pt-8 border-t border-border/30"
        variants={itemVariants}
      >
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">{t('highlights.growth.label')}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('highlights.growth.description')}</p>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Globe" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">{t('highlights.global.label')}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('highlights.global.description')}</p>
          </motion.div>

          <motion.div
            className="space-y-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Zap" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">{t('highlights.pioneer.label')}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('highlights.pioneer.description')}</p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ExperienceCounter;
