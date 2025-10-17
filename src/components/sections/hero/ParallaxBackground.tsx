'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Optimized transforms with reduced motion support
  const backgroundY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 150]);
  const backgroundOpacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.3]);
  const skylineY = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 100]);

  // Detect mobile for performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Throttled mouse movement for better performance
  useEffect(() => {
    if (shouldReduceMotion || isMobile) return;

    let animationFrame: number;
    const handleMouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }

      animationFrame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMousePosition({ x, y });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [shouldReduceMotion, isMobile]);

  // Memoized particle configuration for performance
  const particles = useMemo(() => {
    if (isMobile) {
      // Reduced particles on mobile
      return {
        layer1: [
          { top: '25%', left: '16%', size: 'w-1 h-1', opacity: 'bg-primary/20' },
          { top: '33%', right: '20%', size: 'w-0.5 h-0.5', opacity: 'bg-primary/30' },
        ],
        layer2: [
          { top: '20%', right: '25%', size: 'w-2 h-2', opacity: 'bg-primary/30' },
          { top: '66%', left: '20%', size: 'w-1.5 h-1.5', opacity: 'bg-primary/40' },
        ],
        layer3: [
          { top: '16%', left: '25%', size: 'w-3 h-3', opacity: 'bg-primary/40' },
          { top: '50%', right: '16%', size: 'w-2 h-2', opacity: 'bg-primary/50' },
        ]
      };
    }

    return {
      layer1: [
        { top: '25%', left: '16%', size: 'w-2 h-2', opacity: 'bg-primary/20' },
        { top: '33%', right: '20%', size: 'w-1 h-1', opacity: 'bg-primary/30' },
        { top: '66%', left: '33%', size: 'w-1.5 h-1.5', opacity: 'bg-primary/25' },
      ],
      layer2: [
        { top: '20%', right: '25%', size: 'w-3 h-3', opacity: 'bg-primary/30' },
        { top: '66%', left: '20%', size: 'w-2 h-2', opacity: 'bg-primary/40' },
        { top: '75%', right: '33%', size: 'w-2.5 h-2.5', opacity: 'bg-primary/35' },
      ],
      layer3: [
        { top: '16%', left: '25%', size: 'w-4 h-4', opacity: 'bg-primary/40' },
        { top: '50%', right: '16%', size: 'w-3 h-3', opacity: 'bg-primary/50' },
        { top: '80%', left: '66%', size: 'w-3.5 h-3.5', opacity: 'bg-primary/45' },
      ]
    };
  }, [isMobile]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background via-gray-900/50 to-background"
        style={{
          y: backgroundY,
          opacity: backgroundOpacity,
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x * 0.5}px`,
          translateY: shouldReduceMotion ? 0 : `${mousePosition.y * 0.5}px`,
        }}
      />

      {/* Montreal Skyline Silhouette */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800/30 to-transparent"
        style={{
          y: skylineY,
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x * 0.3}px`,
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

      {/* Depth Layers - Optimized for performance */}
      <motion.div
        className="absolute inset-0"
        style={{
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x * 0.2}px`,
          translateY: shouldReduceMotion ? 0 : `${mousePosition.y * 0.2}px`,
        }}
      >
        {/* Layer 1 - Furthest */}
        {particles.layer1.map((particle, index) => (
          <div
            key={`layer1-${index}`}
            className={`absolute ${particle.size} ${particle.opacity} rounded-full blur-sm`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x * 0.4}px`,
          translateY: shouldReduceMotion ? 0 : `${mousePosition.y * 0.4}px`,
        }}
      >
        {/* Layer 2 - Middle */}
        {particles.layer2.map((particle, index) => (
          <div
            key={`layer2-${index}`}
            className={`absolute ${particle.size} ${particle.opacity} rounded-full blur-sm`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className="absolute inset-0"
        style={{
          translateX: shouldReduceMotion ? 0 : `${mousePosition.x * 0.6}px`,
          translateY: shouldReduceMotion ? 0 : `${mousePosition.y * 0.6}px`,
        }}
      >
        {/* Layer 3 - Closest */}
        {particles.layer3.map((particle, index) => (
          <div
            key={`layer3-${index}`}
            className={`absolute ${particle.size} ${particle.opacity} rounded-full blur-sm`}
            style={{
              top: particle.top,
              left: particle.left,
              right: particle.right,
            }}
          />
        ))}
      </motion.div>

      {/* Cinematic Lighting */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80"></div>
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/80 to-transparent"></div>
    </div>
  );
};

export default ParallaxBackground;
