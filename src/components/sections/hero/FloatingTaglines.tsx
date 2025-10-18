'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

const FloatingTaglines = () => {
  const t = useTranslations('home.floatingTaglines');
  const taglineKeys = ['one', 'two', 'three'] as const; // Reduced to 2-3 as requested

  const taglines = taglineKeys.map((key, index) => ({
    text: t(key),
    delay: index * 0.35,
  }));

  const orbitVariants = {
    animate: (custom) => ({
      rotate: 360,
      transition: {
        duration: 25 + custom * 3, // Slower loop (20-30s as requested)
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
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {taglines?.map((tagline, index) => {
        // Shallow arc positioning near headline, not over body copy
        const radius = 120 + index * 20; // Smaller radius for shallow arc
        const angle = (index * 120) * (Math.PI / 180); // 120° spacing for 3 items
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius - 50; // Offset upward to stay near headline

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
            initial={{ opacity: 0.5, scale: 0 }}
            whileInView={{
              opacity: 0.5,
              scale: 1,
              transition: { delay: tagline?.delay, duration: 0.8 }
            }}
            whileHover={{
              opacity: 1,
              scale: 1.1,
              transition: { duration: 0.3 }
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
