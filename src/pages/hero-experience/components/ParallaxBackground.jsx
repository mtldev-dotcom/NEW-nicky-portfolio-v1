import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e?.clientX / window.innerWidth - 0.5) * 20;
      const y = (e?.clientY / window.innerHeight - 0.5) * 20;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-gray-900/50 to-background"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
          transform: `translate(${mousePosition?.x * 0.5}px, ${mousePosition?.y * 0.5}px)`
        }}
      />
      {/* Montreal Skyline Silhouette */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/30 to-transparent"
        style={{
          y: useTransform(scrollY, [0, 500], [0, 100]),
          transform: `translateX(${mousePosition?.x * 0.3}px)`
        }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-16">
          {/* Simplified skyline shapes */}
          <div className="absolute bottom-0 left-1/4 w-8 h-12 bg-gray-700/40"></div>
          <div className="absolute bottom-0 left-1/3 w-6 h-16 bg-gray-600/40"></div>
          <div className="absolute bottom-0 left-1/2 w-10 h-10 bg-gray-700/40"></div>
          <div className="absolute bottom-0 right-1/3 w-7 h-14 bg-gray-600/40"></div>
          <div className="absolute bottom-0 right-1/4 w-9 h-8 bg-gray-700/40"></div>
        </div>
      </motion.div>
      {/* Depth Layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition?.x * 0.2}px, ${mousePosition?.y * 0.2}px)`
        }}
      >
        {/* Layer 1 - Furthest */}
        <div className="absolute top-1/4 left-1/6 w-2 h-2 bg-primary/20 rounded-full blur-sm"></div>
        <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-primary/30 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-primary/25 rounded-full blur-sm"></div>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition?.x * 0.4}px, ${mousePosition?.y * 0.4}px)`
        }}
      >
        {/* Layer 2 - Middle */}
        <div className="absolute top-1/5 right-1/4 w-3 h-3 bg-primary/30 rounded-full blur-sm"></div>
        <div className="absolute top-2/3 left-1/5 w-2 h-2 bg-primary/40 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/4 right-1/3 w-2.5 h-2.5 bg-primary/35 rounded-full blur-sm"></div>
      </motion.div>
      <motion.div
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition?.x * 0.6}px, ${mousePosition?.y * 0.6}px)`
        }}
      >
        {/* Layer 3 - Closest */}
        <div className="absolute top-1/6 left-1/4 w-4 h-4 bg-primary/40 rounded-full blur-sm"></div>
        <div className="absolute top-1/2 right-1/6 w-3 h-3 bg-primary/50 rounded-full blur-sm"></div>
        <div className="absolute bottom-1/5 left-2/3 w-3.5 h-3.5 bg-primary/45 rounded-full blur-sm"></div>
      </motion.div>
      {/* Cinematic Lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent"></div>
    </div>
  );
};

export default ParallaxBackground;