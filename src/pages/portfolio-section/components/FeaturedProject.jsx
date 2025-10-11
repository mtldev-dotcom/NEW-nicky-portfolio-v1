import React from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedProject = ({ project, onViewDetails }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="relative bg-gradient-to-br from-card via-card to-muted/30 rounded-2xl overflow-hidden border border-border/50 mb-16"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
      <div className="relative grid lg:grid-cols-2 gap-8 p-8 lg:p-12">
        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full border border-primary/30">
              <Icon name="Star" size={16} />
              <span>Featured Project</span>
            </div>
            <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full">
              {project?.type}
            </span>
          </div>

          <div>
            <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              {project?.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project?.description}
            </p>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-space-grotesk font-bold text-foreground">
              Key Features
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {project?.features?.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                    <Icon name="Check" size={14} className="text-primary" />
                  </div>
                  <span className="text-muted-foreground text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h3 className="text-lg font-space-grotesk font-bold text-foreground">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project?.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted/50 text-foreground text-sm rounded-full border border-border/30"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-6 py-6 border-t border-b border-border/30">
            {project?.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{metric?.value}</div>
                <div className="text-sm text-muted-foreground">{metric?.label}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            <Button
              variant="default"
              iconName="ExternalLink"
              iconPosition="right"
              className="glow-neon"
              onClick={() => onViewDetails(project)}
            >
              View Case Study
            </Button>
            {project?.liveUrl && (
              <Button
                variant="outline"
                iconName="Globe"
                iconPosition="left"
              >
                Live Demo
              </Button>
            )}
            {project?.githubUrl && (
              <Button
                variant="ghost"
                iconName="Github"
                iconPosition="left"
              >
                Source Code
              </Button>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative h-80 lg:h-full rounded-xl overflow-hidden">
            <Image
              src={project?.image}
              alt={project?.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30"
          >
            <Icon name="Zap" size={24} className="text-primary" />
          </motion.div>
          
          <motion.div
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-4 -left-4 w-12 h-12 bg-warning/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-warning/30"
          >
            <Icon name="Sparkles" size={16} className="text-warning" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedProject;