'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';

const ProcessTimeline = () => {
  const t = useTranslations('services.sections.process');
  const [activeStep, setActiveStep] = useState(0);
  const ref = React.useRef(null);
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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const nodeVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(0, 255, 209, 0.1)" },
    active: {
      scale: 1.1,
      backgroundColor: "rgba(0, 255, 209, 0.2)",
      boxShadow: "0 0 20px rgba(0, 255, 209, 0.4)",
      transition: { duration: 0.3 }
    },
  };

  const cardVariants = {
    inactive: {
      scale: 1,
      borderColor: "rgba(255, 255, 255, 0.1)",
      backgroundColor: "rgba(26, 26, 26, 0.5)"
    },
    active: {
      scale: 1.02,
      borderColor: "rgba(0, 255, 209, 0.3)",
      backgroundColor: "rgba(26, 26, 26, 0.8)",
      boxShadow: "0 8px 32px rgba(0, 255, 209, 0.15)",
      transition: { duration: 0.3 }
    },
  };

  const processSteps = [
    {
      phase: t('steps.discovery.phase'),
      icon: "Search",
      title: t('steps.discovery.title'),
      description: t('steps.discovery.description'),
      duration: t('steps.discovery.duration'),
      deliverables: [t('steps.discovery.deliverables.0'), t('steps.discovery.deliverables.1'), t('steps.discovery.deliverables.2'), t('steps.discovery.deliverables.3')]
    },
    {
      phase: t('steps.design.phase'),
      icon: "Palette",
      title: t('steps.design.title'),
      description: t('steps.design.description'),
      duration: t('steps.design.duration'),
      deliverables: [t('steps.design.deliverables.0'), t('steps.design.deliverables.1'), t('steps.design.deliverables.2'), t('steps.design.deliverables.3')]
    },
    {
      phase: t('steps.development.phase'),
      icon: "Code",
      title: t('steps.development.title'),
      description: t('steps.development.description'),
      duration: t('steps.development.duration'),
      deliverables: [t('steps.development.deliverables.0'), t('steps.development.deliverables.1'), t('steps.development.deliverables.2'), t('steps.development.deliverables.3')]
    },
    {
      phase: t('steps.aiIntegration.phase'),
      icon: "Brain",
      title: t('steps.aiIntegration.title'),
      description: t('steps.aiIntegration.description'),
      duration: t('steps.aiIntegration.duration'),
      deliverables: [t('steps.aiIntegration.deliverables.0'), t('steps.aiIntegration.deliverables.1'), t('steps.aiIntegration.deliverables.2'), t('steps.aiIntegration.deliverables.3')]
    },
    {
      phase: t('steps.launch.phase'),
      icon: "Rocket",
      title: t('steps.launch.title'),
      description: t('steps.launch.description'),
      duration: t('steps.launch.duration'),
      deliverables: [t('steps.launch.deliverables.0'), t('steps.launch.deliverables.1'), t('steps.launch.deliverables.2'), t('steps.launch.deliverables.3')]
    }
  ];

  return (
    <motion.div
      ref={ref}
      className="relative"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden lg:block"></div>

      <div className="space-y-8 lg:space-y-12">
        {processSteps?.map((step, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            onMouseEnter={() => setActiveStep(index)}
            onMouseLeave={() => setActiveStep(-1)}
            className="relative flex items-start space-x-6 lg:space-x-8"
          >
            {/* Timeline Node */}
            <div className="relative flex-shrink-0">
              <motion.div
                className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 glow-neon"
                variants={nodeVariants}
                animate={activeStep === index ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
              >
                <Icon
                  name={step?.icon}
                  size={24}
                  className="text-primary"
                />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span className="text-xs font-mono text-primary bg-background px-2 py-1 rounded-md border border-primary/20">
                  {step?.phase}
                </span>
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <motion.div
                className="glass-panel rounded-xl p-6 border border-border card-lift"
                variants={cardVariants}
                animate={activeStep === index ? "active" : "inactive"}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                      {step?.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {step?.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-md">
                      {step?.duration}
                    </div>
                  </div>
                </div>

                {/* Deliverables */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-foreground">{t('keyDeliverables')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {step?.deliverables?.map((deliverable, delIndex) => (
                      <motion.div
                        key={delIndex}
                        className="flex items-center space-x-2 text-xs text-muted-foreground"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: delIndex * 0.05 + index * 0.1 + 0.5 }}
                      >
                        <Icon name="CheckCircle" size={12} className="text-primary flex-shrink-0" />
                        <span>{deliverable}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProcessTimeline;
