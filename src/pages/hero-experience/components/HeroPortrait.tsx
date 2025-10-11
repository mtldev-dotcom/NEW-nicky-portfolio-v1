// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from '../../../components/AppImage';

const HeroPortrait = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e?.clientX / window.innerWidth - 0.5) * 10;
      const y = (e?.clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (imageRef?.current?.complete && imageRef?.current?.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, []);

  return (
    <div className="relative z-10">
      <motion.div
        className="relative"
        style={{
          transform: `translate(${mousePosition?.x}px, ${mousePosition?.y}px)`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          scale: isLoaded ? 1 : 0.8 
        }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Main Portrait */}
        <div className="relative w-80 h-80 lg:w-96 lg:h-96 mx-auto">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-primary/10 to-transparent rounded-full blur-2xl"></div>
          
          {/* Portrait Container */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/30 glow-neon">
            <Image
              src="/assets/images/profil_portrait.jpg"
              alt="Nicky Bruno - Creative Technologist"
              className="w-full h-full object-cover"
              ref={imageRef}
              onLoad={() => setIsLoaded(true)}
            />
            
            {/* Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 mix-blend-overlay"></div>
            
            {/* Scanning Lines Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/20 to-transparent h-8"
              animate={{
                y: ['-2rem', '24rem', '-2rem']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Floating Elements Around Portrait */}
          <motion.div
            className="absolute -top-4 -right-4 w-8 h-8 border border-primary/40 rounded bg-primary/10 backdrop-blur-sm"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          />

          <motion.div
            className="absolute -bottom-6 -left-6 w-12 h-6 border border-primary/30 rounded-full bg-primary/5 backdrop-blur-sm flex items-center justify-center"
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
          </motion.div>

          <motion.div
            className="absolute top-1/4 -left-8 w-6 h-6 border border-primary/35 rounded-full bg-primary/10 backdrop-blur-sm"
            animate={{
              x: [0, -5, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />

          <motion.div
            className="absolute top-3/4 -right-8 w-10 h-4 border border-primary/25 rounded bg-primary/5 backdrop-blur-sm"
            animate={{
              x: [0, 8, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            <div className="p-1">
              <div className="w-full h-0.5 bg-primary/40 rounded"></div>
            </div>
          </motion.div>
        </div>

        {/* Status Indicator */}
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className="w-2 h-2 bg-primary rounded-full"
            animate={{
              opacity: [1, 0.3, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <span className="text-xs font-inter text-muted-foreground">Available for Projects</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroPortrait;
