'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

const ServiceCard = ({ 
  service, 
  index, 
  onHover, 
  isHovered, 
  onCaseStudyClick 
}) => {
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  const handleMouseEnter = () => {
    onHover(index);
    setIsDetailExpanded(true);
  };

  const handleMouseLeave = () => {
    onHover(null);
    setIsDetailExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.15,
        ease: [0.4, 0, 0.2, 1]
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`
        relative p-8 rounded-xl border transition-all duration-500 cursor-pointer
        ${isHovered 
          ? 'bg-card border-primary/50 shadow-card-hover glow-neon-active' 
          : 'bg-card/50 border-border hover:border-primary/30 hover:shadow-card'
        }
      `}>
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className={`
            w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-500
            ${isHovered 
              ? 'bg-primary/20 glow-neon' :'bg-primary/10 group-hover:bg-primary/15'
            }
          `}>
            <Icon 
              name={service?.icon} 
              size={32} 
              className={`transition-all duration-500 ${
                isHovered ? 'text-primary' : 'text-primary/80'
              }`}
            />
          </div>
          
          {/* Skill Level Indicator */}
          <div className="absolute -top-2 -right-2">
            <div className={`
              px-2 py-1 rounded-full text-xs font-medium transition-all duration-300
              ${service?.level === 'Expert' ?'bg-primary/20 text-primary border border-primary/30' 
                : service?.level === 'Advanced' ?'bg-warning/20 text-warning border border-warning/30' :'bg-muted text-muted-foreground border border-border'
              }
            `}>
              {service?.level}
            </div>
          </div>
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
              <span
                key={techIndex}
                className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md font-mono"
              >
                {tech}
              </span>
            ))}
            {service?.technologies?.length > 4 && (
              <span className="px-2 py-1 bg-muted/30 text-muted-foreground text-xs rounded-md">
                +{service?.technologies?.length - 4} more
              </span>
            )}
          </div>

          {/* Expanded Details */}
          <motion.div
            initial={false}
            animate={{ 
              height: isDetailExpanded ? 'auto' : 0,
              opacity: isDetailExpanded ? 1 : 0
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-4 border-t border-border/50 space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Key Capabilities:</h4>
                <ul className="space-y-1">
                  {service?.capabilities?.map((capability, capIndex) => (
                    <li key={capIndex} className="flex items-start space-x-2 text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{capability}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Case Study Preview */}
              {service?.caseStudy && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="text-sm font-medium text-foreground">Featured Project</h5>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="ExternalLink"
                      iconPosition="right"
                      iconSize={12}
                      onClick={() => onCaseStudyClick(service?.caseStudy)}
                      className="text-primary hover:text-primary/80"
                    >
                      View Case
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {service?.caseStudy?.title}
                  </p>
                  <p className="text-xs text-muted-foreground/80">
                    {service?.caseStudy?.preview}
                  </p>
                </div>
              )}

              {/* Certifications */}
              {service?.certifications && service?.certifications?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {service?.certifications?.map((cert, certIndex) => (
                    <div
                      key={certIndex}
                      className="flex items-center space-x-1 px-2 py-1 bg-primary/10 rounded-md"
                    >
                      <Icon name="Award" size={10} className="text-primary" />
                      <span className="text-xs text-primary font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <div className={`
          absolute inset-0 rounded-xl transition-opacity duration-500 pointer-events-none
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-xl"></div>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
