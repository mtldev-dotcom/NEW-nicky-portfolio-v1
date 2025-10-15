'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const ProjectCard = ({ project, index, onViewDetails }) => {
  const t = useTranslations('portfolio');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-card rounded-xl overflow-hidden border border-border/50 transition-smooth hover:border-primary/30 magnetic-hover">
        {/* Project Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={project?.image}
            alt={project?.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Project Type Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-medium rounded-full backdrop-blur-sm border border-primary/30">
              {project?.type}
            </span>
          </div>

          {/* Featured Badge */}
          {project?.featured && (
            <div className="absolute top-4 right-4">
              <div className="flex items-center space-x-1 px-2 py-1 bg-warning/20 text-warning text-xs font-medium rounded-full backdrop-blur-sm border border-warning/30">
                <Icon name="Star" size={12} />
                <span>{t('featured')}</span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
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
        </div>

        {/* Project Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-space-grotesk font-bold text-foreground group-hover:text-primary transition-smooth">
              {project?.title}
            </h3>
            <div className="flex items-center space-x-2">
              {project?.technologies?.slice(0, 3)?.map((tech, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 bg-muted rounded-full flex items-center justify-center"
                  title={tech}
                >
                  <Icon name={project?.techIcons?.[tech]} size={14} className="text-muted-foreground" />
                </div>
              ))}
              {project?.technologies?.length > 3 && (
                <span className="text-xs text-muted-foreground">+{project?.technologies?.length - 3}</span>
              )}
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
            {project?.description}
          </p>

          {/* Project Stats */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {project?.metrics?.map((metric, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-lg font-bold text-primary">{metric?.value}</div>
                  <div className="text-xs text-muted-foreground">{metric?.label}</div>
                </div>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">
              {project?.year}
            </div>
          </div>

          {/* Client Logo */}
          {project?.client && (
            <div className="flex items-center justify-between pt-4 border-t border-border/30">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-muted-foreground">
                    {project?.client?.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{project?.client}</span>
              </div>
              <Icon name="ArrowUpRight" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
