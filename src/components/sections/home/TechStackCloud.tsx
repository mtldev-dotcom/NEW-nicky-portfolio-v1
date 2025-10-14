'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ============================================================================
// CONFIGURATION - Easy to customize
// ============================================================================

const AUTO_ROTATION_SPEED = 0.005; // Radians per frame
const MOUSE_SENSITIVITY = 0.002;
const SPHERE_RADIUS = 180;
const ICON_SIZE = 48;

// ============================================================================
// TECH STACK DATA - Using only icons that definitely exist
// ============================================================================

interface TechItem {
    id: string;
    name: string;
    icon: string;
    color: string;
}

const TECH_STACK: TechItem[] = [
    { id: 'react', name: 'React', icon: 'react.png', color: '#61DAFB' },
    { id: 'nextjs', name: 'Next.js', icon: 'nextjs.png', color: '#000000' },
    { id: 'typescript', name: 'TypeScript', icon: 'typescript.png', color: '#3178C6' },
    { id: 'javascript', name: 'JavaScript', icon: 'js.png', color: '#F7DF1E' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwindcss.png', color: '#06B6D4' },
    { id: 'nodejs', name: 'Node.js', icon: 'nodejs.png', color: '#339933' },
    { id: 'python', name: 'Python', icon: 'python.png', color: '#3776AB' },
    { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql.png', color: '#4169E1' },
    { id: 'mongodb', name: 'MongoDB', icon: 'mongodb.png', color: '#47A248' },
    { id: 'graphql', name: 'GraphQL', icon: 'graphql.png', color: '#E10098' },
    { id: 'aws', name: 'AWS', icon: 'aws.png', color: '#FF9900' },
    { id: 'firebase', name: 'Firebase', icon: 'firebase.png', color: '#FFCA28' },
    { id: 'docker', name: 'Docker', icon: 'docker.png', color: '#2496ED' },
    { id: 'git', name: 'Git', icon: 'git.png', color: '#F05032' },
    { id: 'redux', name: 'Redux', icon: 'redux.png', color: '#764ABC' },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Generate positions on a sphere using Fibonacci spiral
 */
const generateSpherePositions = (count: number, radius: number) => {
    const positions = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
        const theta = 2 * Math.PI * i / goldenRatio;
        const phi = Math.acos(1 - 2 * (i + 0.5) / count);

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        positions.push({ x, y, z });
    }

    return positions;
};

/**
 * Rotate a 3D point around X and Y axes
 */
const rotatePoint = (point: { x: number; y: number; z: number }, rotation: { x: number; y: number }) => {
    let { x, y, z } = point;

    // X-axis rotation
    const cosX = Math.cos(rotation.x);
    const sinX = Math.sin(rotation.x);
    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;
    y = y1;
    z = z1;

    // Y-axis rotation
    const cosY = Math.cos(rotation.y);
    const sinY = Math.sin(rotation.y);
    const x1 = x * cosY + z * sinY;
    const z2 = -x * sinY + z * cosY;
    x = x1;
    z = z2;

    return { x, y, z };
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

interface TechStackCloudProps {
    className?: string;
}

const TechStackCloud: React.FC<TechStackCloudProps> = ({ className = '' }) => {
    const t = useTranslations('home.techStack');
    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<number>();

    // State
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    // Generate positions
    const positions = generateSpherePositions(TECH_STACK.length, SPHERE_RADIUS);

    // Animation loop
    const animate = useCallback(() => {
        setRotation(prev => {
            if (isHovering) {
                return {
                    x: mousePos.y * MOUSE_SENSITIVITY,
                    y: mousePos.x * MOUSE_SENSITIVITY,
                };
            } else {
                return {
                    x: prev.x + AUTO_ROTATION_SPEED,
                    y: prev.y + AUTO_ROTATION_SPEED * 0.7,
                };
            }
        });

        animationRef.current = requestAnimationFrame(animate);
    }, [isHovering, mousePos]);

    // Start animation
    useEffect(() => {
        animationRef.current = requestAnimationFrame(animate);
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [animate]);

    // Mouse handlers
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        setMousePos({
            x: e.clientX - centerX,
            y: e.clientY - centerY,
        });
    }, []);

    const handleIconClick = useCallback((tech: TechItem) => {
        const url = t(`tools.${tech.id}.url`);
        if (url && url !== `tools.${tech.id}.url`) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    }, [t]);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* 3D Container */}
            <div
                ref={containerRef}
                className="relative w-[500px] h-[500px] mx-auto cursor-grab active:cursor-grabbing"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                    setIsHovering(false);
                    setHoveredIcon(null);
                }}
                style={{
                    perspective: '1000px',
                    transformStyle: 'preserve-3d'
                }}
            >
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl" />

                {/* Center logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 backdrop-blur-sm border border-white/10 flex items-center justify-center glow-neon">
                    <span className="text-lg font-bold text-primary-foreground">NB</span>
                </div>

                {/* Tech Icons */}
                {TECH_STACK.map((tech, index) => {
                    const basePos = positions[index];
                    const rotatedPos = rotatePoint(basePos, rotation);

                    // Calculate depth effects
                    const depth = rotatedPos.z + SPHERE_RADIUS;
                    const maxDepth = SPHERE_RADIUS * 2;
                    const depthRatio = Math.max(0.1, depth / maxDepth);

                    const scale = 0.4 + 0.6 * depthRatio;
                    const opacity = Math.max(0.2, depthRatio);
                    const blur = Math.max(0, (1 - depthRatio) * 2);

                    const toolName = t(`tools.${tech.id}.name`) || tech.name;
                    const toolDescription = t(`tools.${tech.id}.description`) || `${tech.name} technology`;

                    return (
                        <div
                            key={tech.id}
                            className="absolute left-1/2 top-1/2"
                            style={{
                                // Keep full 3D positioning and depth scaling here so it isn't overridden
                                transform: `translate(-50%, -50%) translate3d(${rotatedPos.x}px, ${rotatedPos.y}px, ${rotatedPos.z}px) scale(${scale})`,
                                opacity: opacity,
                                filter: `blur(${blur}px)`,
                                zIndex: Math.round(depth),
                            }}
                        >
                            {/* Icon container with animation isolated to child so transforms don't clash */}
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 rounded-xl backdrop-blur-sm border border-border/40 glow-neon group cursor-pointer transition-all duration-300 hover:glow-neon-active"
                                style={{
                                    backgroundColor: `${tech.color}15`,
                                    borderColor: `${tech.color}40`,
                                    boxShadow: `0 0 20px ${tech.color}20`,
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: opacity }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.05,
                                    type: 'spring',
                                    stiffness: 200,
                                }}
                                whileHover={{ scale: 1.2 }}
                                onMouseEnter={() => setHoveredIcon(tech.id)}
                                onMouseLeave={() => setHoveredIcon(null)}
                                onClick={() => handleIconClick(tech)}
                            >
                                <Image
                                    src={`/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/${tech.icon}`}
                                    alt={toolName}
                                    width={24}
                                    height={24}
                                    className="w-6 h-6 object-contain transition-transform duration-200 group-hover:scale-110"
                                />
                            </motion.div>

                            {/* Tooltip */}
                            {hoveredIcon === tech.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2 text-xs whitespace-nowrap glow-neon z-50"
                                    style={{
                                        backgroundColor: `${tech.color}10`,
                                        borderColor: `${tech.color}30`,
                                    }}
                                >
                                    <div className="font-medium text-foreground">{toolName}</div>
                                    <div className="text-muted-foreground text-xs">{toolDescription}</div>
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent"
                                        style={{ borderTopColor: `${tech.color}30` }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center">
                <p className="text-xs text-muted-foreground/60">
                    Hover to interact • Click icons to learn more
                </p>
            </div>
        </div>
    );
};

export default TechStackCloud;
