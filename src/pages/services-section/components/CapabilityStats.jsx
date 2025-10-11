import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const CapabilityStats = () => {
  const stats = [
    {
      icon: "Calendar",
      value: "20+",
      label: "Years Experience",
      description: "Two decades mastering the evolution from traditional design to AI-powered creativity"
    },
    {
      icon: "Briefcase",
      value: "150+",
      label: "Projects Delivered",
      description: "Successful launches across startups, agencies, and enterprise clients"
    },
    {
      icon: "Users",
      value: "50+",
      label: "Happy Clients",
      description: "Long-term partnerships built on trust, quality, and innovative solutions"
    },
    {
      icon: "Zap",
      value: "95%",
      label: "Client Retention",
      description: "Clients return because we deliver results that exceed expectations"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: [0.4, 0, 0.2, 1]
          }}
          viewport={{ once: true }}
          className="group text-center"
        >
          <div className="relative mb-4">
            <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:glow-neon">
              <Icon 
                name={stat?.icon} 
                size={24} 
                className="text-primary group-hover:scale-110 transition-transform duration-300" 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-3xl font-space-grotesk font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {stat?.value}
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {stat?.label}
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed hidden lg:block">
              {stat?.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CapabilityStats;