'use client';

import React, { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const ProjectCard = ({ project, index, onViewDetails }) => {
  const t = useTranslations('portfolio');
  const [isHovered, setIsHovered] = useState(false);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
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

  const imageVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.1 + 0.2, duration: 0.3 }
    },
  };

  const metricVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: index * 0.1 + 0.4, duration: 0.3 }
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative glass-panel rounded-xl overflow-hidden border border-border/50 transition-smooth card-lift"
        variants={cardVariants}
        animate={isHovered ? "active" : "inactive"}
        whileHover={{ scale: 1.02 }}
      >
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            variants={imageVariants}
            animate={isHovered ? "active" : "inactive"}
          >
            <Image
              src={project?.image}
              alt={project?.title}
              className="w-full h-full object-cover transition-smooth"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Project Type Badge */}
          <motion.div
            className="absolute top-4 left-4"
            variants={badgeVariants}
          >
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm border border-primary/30 glow-neon">
              {project?.type}
            </span>
          </motion.div>

          {/* Featured Badge */}
          {project?.featured && (
            <motion.div
              className="absolute top-4 right-4"
              variants={badgeVariants}
            >
              <div className="flex items-center space-x-1 px-2 py-1 bg-warning/20 text-warning text-xs font-medium rounded-full backdrop-blur-sm border border-warning/30 glow-warning">
                <Icon name="Star" size={12} />
                <span>{t('featured')}</span>
              </div>
            </motion.div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isHovered ? 1 : 0.8, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="default"
                size="sm"
                iconName="ExternalLink"
                iconPosition="right"
                className="glow-neon"
                onClick={() => onViewDetails(project)}
              >
                {t('viewDetails')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Floating particles effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-1 h-1 bg-primary rounded-full"
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
              className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-primary rounded-full"
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

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <motion.h3
              className="text-xl font-space-grotesk font-bold text-foreground group-hover:text-primary transition-smooth"
              whileHover={{ scale: 1.02 }}
            >
              {project?.title}
            </motion.h3>
            <div className="flex items-center space-x-2">
              {project?.technologies?.slice(0, 3)?.map((tech, idx) => (
                <motion.div
                  key={idx}
                  className="w-6 h-6 bg-muted rounded-full flex items-center justify-center group/tech"
                  title={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 + idx * 0.05 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <Icon name={project?.techIcons?.[tech]} size={14} className="text-muted-foreground group-hover/tech:text-primary transition-colors" />
                </motion.div>
              ))}
              {project?.technologies?.length > 3 && (
                <motion.span
                  className="text-xs text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  +{project?.technologies?.length - 3}
                </motion.span>
              )}
            </div>
          </div>

          <motion.p
            className="text-muted-foreground text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            {project?.description}
          </motion.p>

          {/* Enhanced Project Stats */}
          <motion.div
            className="flex items-center justify-between mb-4"
            variants={metricVariants}
          >
            <div className="flex items-center space-x-4">
              {project?.metrics?.map((metric, idx) => (
                <motion.div
                  key={idx}
                  className="text-center group/metric"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-lg font-bold text-primary group-hover/metric:text-primary transition-colors"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 + idx * 0.1 }}
                  >
                    {metric?.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground">{metric?.label}</div>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {project?.year}
            </motion.div>
          </motion.div>

          {/* Client Logo */}
          {project?.client && (
            <motion.div
              className="flex items-center justify-between pt-4 border-t border-border/30"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <span className="text-xs font-bold text-muted-foreground">
                    {project?.client?.charAt(0)}
                  </span>
                </motion.div>
                <span className="text-sm text-muted-foreground">{project?.client}</span>
              </div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
              >
                <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
              </motion.div>
            </motion.div>
          )}

          {/* Progress bar animation */}
          <motion.div
            className="w-full h-1 bg-muted/20 rounded-full mt-4 overflow-hidden"
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

export default ProjectCard;
