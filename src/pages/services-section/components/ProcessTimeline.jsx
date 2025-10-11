import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ProcessTimeline = () => {
  const processSteps = [
    {
      phase: "Discovery",
      icon: "Search",
      title: "Strategic Analysis",
      description: "Deep dive into your business goals, target audience, and competitive landscape to craft the perfect solution strategy.",
      duration: "1-2 weeks",
      deliverables: ["Market Research", "User Personas", "Technical Audit", "Strategy Document"]
    },
    {
      phase: "Design",
      icon: "Palette",
      title: "Creative Development",
      description: "Transform insights into compelling visual experiences that resonate with your audience and drive engagement.",
      duration: "2-3 weeks",
      deliverables: ["Wireframes", "Visual Design", "Prototypes", "Design System"]
    },
    {
      phase: "Development",
      icon: "Code",
      title: "Technical Implementation",
      description: "Build robust, scalable solutions using cutting-edge technologies and best practices for optimal performance.",
      duration: "3-6 weeks",
      deliverables: ["Frontend Development", "Backend Integration", "Testing", "Optimization"]
    },
    {
      phase: "AI Integration",
      icon: "Brain",
      title: "Intelligence Layer",
      description: "Integrate AI capabilities to automate processes, enhance user experience, and provide intelligent insights.",
      duration: "1-2 weeks",
      deliverables: ["AI Models", "Automation Scripts", "Analytics Setup", "Performance Monitoring"]
    },
    {
      phase: "Launch",
      icon: "Rocket",
      title: "Deployment & Growth",
      description: "Launch your solution with comprehensive monitoring, optimization, and ongoing support for continuous improvement.",
      duration: "1 week",
      deliverables: ["Production Deploy", "Performance Monitoring", "User Training", "Growth Strategy"]
    }
  ];

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/30 to-transparent hidden lg:block"></div>
      <div className="space-y-8 lg:space-y-12">
        {processSteps?.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.15,
              ease: [0.4, 0, 0.2, 1]
            }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative flex items-start space-x-6 lg:space-x-8"
          >
            {/* Timeline Node */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 glow-neon">
                <Icon 
                  name={step?.icon} 
                  size={24} 
                  className="text-primary" 
                />
              </div>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                <span className="text-xs font-mono text-primary bg-background px-2 py-1 rounded-md border border-primary/20">
                  {step?.phase}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="bg-card/50 rounded-xl p-6 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-card">
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
                  <h4 className="text-sm font-medium text-foreground">Key Deliverables:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {step?.deliverables?.map((deliverable, delIndex) => (
                      <div
                        key={delIndex}
                        className="flex items-center space-x-2 text-xs text-muted-foreground"
                      >
                        <Icon name="CheckCircle" size={12} className="text-primary flex-shrink-0" />
                        <span>{deliverable}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;