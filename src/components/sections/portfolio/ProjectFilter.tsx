'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

interface Filter {
  id: string;
  label: string;
  count?: number;
  icon?: string;
}

interface ProjectFilterProps {
  filters: Filter[];
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
}

const ProjectFilter = ({ filters, activeFilter, onFilterChange }: ProjectFilterProps) => {
  const t = useTranslations('portfolio');
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "rgba(26, 26, 26, 0.5)",
      borderColor: "rgba(255, 255, 255, 0.1)"
    },
    active: {
      scale: 1.05,
      backgroundColor: "rgba(0, 255, 209, 0.1)",
      borderColor: "rgba(0, 255, 209, 0.3)",
      boxShadow: "0 4px 20px rgba(0, 255, 209, 0.2)",
      transition: { duration: 0.3 }
    },
  };

  return (
    <motion.div
      ref={ref}
      className="flex flex-wrap items-center justify-center gap-3 mb-12"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {filters?.map((filter, index) => (
        <motion.div
          key={filter?.id}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            variants={buttonVariants}
            animate={activeFilter === filter?.id ? "active" : "inactive"}
            whileHover={{ scale: 1.05 }}
          >
            <Button
              variant={activeFilter === filter?.id ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange(filter?.id)}
              className={`relative transition-smooth group ${activeFilter === filter?.id
                ? 'glow-neon'
                : 'hover:border-primary/50 hover:text-primary'
                }`}
            >
              <div className="flex items-center space-x-2">
                {filter?.icon && (
                  <motion.div
                    animate={{ rotate: activeFilter === filter?.id ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon name={filter?.icon} size={16} />
                  </motion.div>
                )}
                <span>{filter?.label}</span>
                {filter?.count && (
                  <motion.span
                    className="ml-2 text-xs opacity-70 bg-muted/50 px-1.5 py-0.5 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {filter?.count}
                  </motion.span>
                )}
              </div>

              {/* Active indicator */}
              {activeFilter === filter?.id && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* Hover glow effect */}
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-lg"></div>
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      ))}

      {/* Filter stats */}
      <motion.div
        className="flex items-center space-x-2 text-sm text-muted-foreground ml-4"
        variants={itemVariants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: filters?.length * 0.1 + 0.3 }}
      >
        <Icon name="Filter" size={16} />
        <span>
          {t('showing')} {filters?.find(f => f?.id === activeFilter)?.count || 0} {t('projectsCount')}
        </span>
      </motion.div>
    </motion.div>
  );
};

export default ProjectFilter;
