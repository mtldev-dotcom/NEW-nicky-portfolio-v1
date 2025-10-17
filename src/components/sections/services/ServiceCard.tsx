'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ServiceCard = ({
  service,
  index,
  onHover,
  isHovered,
  onCaseStudyClick
}) => {
  const t = useTranslations('services');
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: "easeOut",
      },
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

  const iconVariants = {
    inactive: { scale: 1, rotate: 0 },
    active: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    },
  };

  const handleMouseEnter = () => {
    onHover(index);
    setIsDetailExpanded(true);
  };

  const handleMouseLeave = () => {
    onHover(null);
    setIsDetailExpanded(false);
  };

  const toggleDetails = () => {
    setIsDetailExpanded(!isDetailExpanded);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative p-8 rounded-xl border transition-all duration-500 cursor-pointer glass-panel"
        variants={cardVariants}
        animate={isHovered ? "active" : "inactive"}
        whileHover={{ scale: 1.02 }}
      >
        {/* Icon Container */}
        <div className="relative mb-6">
          <motion.div
            className="w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500 bg-primary/10"
            variants={iconVariants}
            animate={isHovered ? "active" : "inactive"}
          >
            <Icon
              name={service?.icon}
              size={32}
              className={`transition-all duration-500 ${isHovered ? 'text-primary' : 'text-primary/80'
                }`}
            />
          </motion.div>

          {/* Skill Level Indicator */}
          <motion.div
            className="absolute -top-2 -right-2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
          >
            <div className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${service?.level === 'Expert' ? 'bg-primary/20 text-primary border border-primary/30'
                : service?.level === 'Advanced' ? 'bg-warning/20 text-warning border border-warning/30' : 'bg-muted text-muted-foreground border border-border'
              }`}>
              {service?.level}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
              {service?.title}
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service?.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {service?.technologies?.slice(0, 4)?.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md font-mono"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: techIndex * 0.05 + index * 0.1 + 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {tech}
              </motion.span>
            ))}
            {service?.technologies?.length > 4 && (
              <motion.span
                className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.6 }}
              >
                +{service?.technologies?.length - 4} {t('more')}
              </motion.span>
            )}
          </div>

          {/* Toggle Button */}
          <motion.button
            onClick={toggleDetails}
            className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isDetailExpanded ? 'Show Less' : 'Show More'}</span>
            <motion.div
              animate={{ rotate: isDetailExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="ChevronDown" size={16} />
            </motion.div>
          </motion.button>

          {/* Expanded Details */}
          <AnimatePresence>
            {isDetailExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 border-t border-border/50 space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-2">{t('keyCapabilities.title')}</h4>
                    <ul className="space-y-1">
                      {service?.capabilities?.map((capability, capIndex) => (
                        <motion.li
                          key={capIndex}
                          className="flex items-start space-x-2 text-xs text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: capIndex * 0.05 }}
                        >
                          <Icon name="Check" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{capability}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Case Study Preview */}
                  {service?.caseStudy && (
                    <motion.div
                      className="bg-muted/30 rounded-lg p-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="text-sm font-medium text-foreground">{t('keyCapabilities.items.webDevelopment.featuredProject.title')}</h5>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="ExternalLink"
                          iconPosition="right"
                          iconSize={12}
                          onClick={() => onCaseStudyClick(service?.caseStudy)}
                          className="text-primary hover:text-primary/80"
                        >
                          {t('keyCapabilities.items.webDevelopment.featuredProject.cta')}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">
                        {service?.caseStudy?.title}
                      </p>
                      <p className="text-xs text-muted-foreground/80">
                        {service?.caseStudy?.preview}
                      </p>
                    </motion.div>
                  )}

                  {/* Certifications */}
                  {service?.certifications && service?.certifications?.length > 0 && (
                    <motion.div
                      className="flex flex-wrap gap-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {service?.certifications?.map((cert, certIndex) => (
                        <motion.div
                          key={certIndex}
                          className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: certIndex * 0.1 + 0.4 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon name="Award" size={10} className="text-primary" />
                          <span className="text-xs text-primary font-medium">{cert}</span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl"></div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ServiceCard;
