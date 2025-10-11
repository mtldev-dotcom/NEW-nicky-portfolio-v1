'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HolographicOverlay = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    const particles = [];
    const particleCount = 50;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles?.push({
        x: Math.random() * canvas?.width,
        y: Math.random() * canvas?.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      
      // Update and draw particles
      particles?.forEach((particle, index) => {
        particle.x += particle?.vx;
        particle.y += particle?.vy;

        // Wrap around edges
        if (particle?.x < 0) particle.x = canvas?.width;
        if (particle?.x > canvas?.width) particle.x = 0;
        if (particle?.y < 0) particle.y = canvas?.height;
        if (particle?.y > canvas?.height) particle.y = 0;

        // Draw particle
        ctx?.beginPath();
        ctx?.arc(particle?.x, particle?.y, particle?.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 209, ${particle?.opacity})`;
        ctx?.fill();

        // Draw connections
        particles?.slice(index + 1)?.forEach(otherParticle => {
          const dx = particle?.x - otherParticle?.x;
          const dy = particle?.y - otherParticle?.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx?.beginPath();
            ctx?.moveTo(particle?.x, particle?.y);
            ctx?.lineTo(otherParticle?.x, otherParticle?.y);
            ctx.strokeStyle = `rgba(0, 255, 209, ${0.1 * (1 - distance / 100)})`;
            ctx?.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Floating UI Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-32 h-20 border border-primary/30 rounded-lg backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="p-3">
          <div className="w-full h-2 bg-primary/20 rounded mb-2"></div>
          <div className="w-3/4 h-1 bg-primary/30 rounded mb-1"></div>
          <div className="w-1/2 h-1 bg-primary/20 rounded"></div>
        </div>
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-1/4 w-24 h-24 border border-primary/20 rounded-full backdrop-blur-sm flex items-center justify-center"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-8 h-8 bg-primary/30 rounded-full"></div>
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-1/3 w-28 h-16 border border-primary/25 rounded backdrop-blur-sm"
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        <div className="p-2">
          <div className="flex space-x-1 mb-2">
            <div className="w-2 h-2 bg-primary/40 rounded-full"></div>
            <div className="w-2 h-2 bg-primary/30 rounded-full"></div>
            <div className="w-2 h-2 bg-primary/20 rounded-full"></div>
          </div>
          <div className="w-full h-1 bg-primary/25 rounded"></div>
        </div>
      </motion.div>
      {/* Data Lines */}
      <motion.div
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />
    </div>
  );
};

export default HolographicOverlay;
