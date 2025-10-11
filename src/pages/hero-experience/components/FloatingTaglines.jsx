import React from 'react';
import { motion } from 'framer-motion';

const FloatingTaglines = () => {
  const taglines = [
    { text: "Creative", delay: 0 },
    { text: "Technologist", delay: 0.5 },
    { text: "AI", delay: 1 },
    { text: "Innovation", delay: 1.5 },
    { text: "Design", delay: 2 },
    { text: "Code", delay: 2.5 }
  ];

  const orbitVariants = {
    animate: (custom) => ({
      rotate: 360,
      transition: {
        duration: 20 + custom * 2,
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      {taglines?.map((tagline, index) => {
        const radius = 200 + index * 30;
        const angle = (index * 60) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        return (
          <motion.div
            key={tagline?.text}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`
            }}
            variants={orbitVariants}
            animate="animate"
            custom={index}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1,
              transition: { delay: tagline?.delay, duration: 0.8 }
            }}
          >
            <motion.div
              variants={floatVariants}
              animate="animate"
              className="relative"
            >
              <div className="px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary/30 rounded-full">
                <span className="text-primary font-space-grotesk font-medium text-sm">
                  {tagline?.text}
                </span>
              </div>
              <div className="absolute inset-0 bg-primary/5 rounded-full blur-sm"></div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default FloatingTaglines;