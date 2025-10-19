'use client';

import { useEffect, useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface GeometricShape {
    id: string;
    type: 'circle' | 'hexagon';
    size: string;
    position: { top: string; left?: string; right?: string };
    opacity: string;
    color: string;
    animationDelay: number;
    rotationSpeed: number;
    scaleRange: [number, number];
}

interface PortraitGeometricBackgroundProps {
    className?: string;
}

const PortraitGeometricBackground = ({ className = '' }: PortraitGeometricBackgroundProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const { scrollY } = useScroll();
    const shouldReduceMotion = useReducedMotion();
    const animationFrameRef = useRef<number>();

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

        const handleMouseMove = (e: MouseEvent) => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }

            animationFrameRef.current = requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 40; // Increased sensitivity
                const y = (e.clientY / window.innerHeight - 0.5) * 40;
                setMousePosition({ x, y });
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [shouldReduceMotion, isMobile]);

    // Memoized geometric shapes configuration for performance
    const geometricShapes = useMemo(() => {
        if (isMobile) {
            // Reduced shapes on mobile for better performance
            return {
                layer1: [
                    {
                        id: 'layer1-circle1',
                        type: 'circle' as const,
                        size: 'w-32 h-32',
                        position: { top: '20%', left: '15%' },
                        opacity: 'bg-primary/10',
                        color: '#00FFD1',
                        animationDelay: 0,
                        rotationSpeed: 20,
                        scaleRange: [0.8, 1.2] as [number, number],
                    },
                    {
                        id: 'layer1-circle2',
                        type: 'circle' as const,
                        size: 'w-24 h-24',
                        position: { top: '70%', right: '20%' },
                        opacity: 'bg-primary/15',
                        color: '#00D4AD',
                        animationDelay: 2,
                        rotationSpeed: 15,
                        scaleRange: [0.9, 1.1] as [number, number],
                    },
                ],
                layer2: [
                    {
                        id: 'layer2-hex1',
                        type: 'hexagon' as const,
                        size: 'w-20 h-20',
                        position: { top: '30%', right: '25%' },
                        opacity: 'bg-primary/20',
                        color: '#33FFD9',
                        animationDelay: 1,
                        rotationSpeed: 25,
                        scaleRange: [0.85, 1.15] as [number, number],
                    },
                ],
                layer3: [
                    {
                        id: 'layer3-circle1',
                        type: 'circle' as const,
                        size: 'w-16 h-16',
                        position: { top: '60%', left: '25%' },
                        opacity: 'bg-primary/25',
                        color: '#00FFD1',
                        animationDelay: 0.5,
                        rotationSpeed: 30,
                        scaleRange: [0.9, 1.1] as [number, number],
                    },
                ],
                layer4: [
                    {
                        id: 'layer4-hex1',
                        type: 'hexagon' as const,
                        size: 'w-12 h-12',
                        position: { top: '40%', left: '30%' },
                        opacity: 'bg-primary/30',
                        color: '#00D4AD',
                        animationDelay: 1.5,
                        rotationSpeed: 35,
                        scaleRange: [0.95, 1.05] as [number, number],
                    },
                ],
            };
        }

        // Full desktop configuration
        return {
            layer1: [
                {
                    id: 'layer1-circle1',
                    type: 'circle' as const,
                    size: 'w-48 h-48',
                    position: { top: '15%', left: '10%' },
                    opacity: 'bg-primary/8',
                    color: '#00FFD1',
                    animationDelay: 0,
                    rotationSpeed: 20,
                    scaleRange: [0.7, 1.3] as [number, number],
                },
                {
                    id: 'layer1-circle2',
                    type: 'circle' as const,
                    size: 'w-40 h-40',
                    position: { top: '75%', right: '15%' },
                    opacity: 'bg-primary/12',
                    color: '#00D4AD',
                    animationDelay: 3,
                    rotationSpeed: 18,
                    scaleRange: [0.8, 1.2] as [number, number],
                },
                {
                    id: 'layer1-circle3',
                    type: 'circle' as const,
                    size: 'w-36 h-36',
                    position: { top: '45%', left: '5%' },
                    opacity: 'bg-primary/10',
                    color: '#33FFD9',
                    animationDelay: 6,
                    rotationSpeed: 22,
                    scaleRange: [0.75, 1.25] as [number, number],
                },
            ],
            layer2: [
                {
                    id: 'layer2-hex1',
                    type: 'hexagon' as const,
                    size: 'w-32 h-32',
                    position: { top: '25%', right: '20%' },
                    opacity: 'bg-primary/15',
                    color: '#00FFD1',
                    animationDelay: 1,
                    rotationSpeed: 25,
                    scaleRange: [0.8, 1.2] as [number, number],
                },
                {
                    id: 'layer2-hex2',
                    type: 'hexagon' as const,
                    size: 'w-28 h-28',
                    position: { top: '65%', left: '20%' },
                    opacity: 'bg-primary/18',
                    color: '#00D4AD',
                    animationDelay: 4,
                    rotationSpeed: 23,
                    scaleRange: [0.85, 1.15] as [number, number],
                },
                {
                    id: 'layer2-hex3',
                    type: 'hexagon' as const,
                    size: 'w-24 h-24',
                    position: { top: '35%', right: '35%' },
                    opacity: 'bg-primary/20',
                    color: '#33FFD9',
                    animationDelay: 7,
                    rotationSpeed: 27,
                    scaleRange: [0.9, 1.1] as [number, number],
                },
            ],
            layer3: [
                {
                    id: 'layer3-circle1',
                    type: 'circle' as const,
                    size: 'w-20 h-20',
                    position: { top: '55%', left: '30%' },
                    opacity: 'bg-primary/25',
                    color: '#00FFD1',
                    animationDelay: 0.5,
                    rotationSpeed: 30,
                    scaleRange: [0.9, 1.1] as [number, number],
                },
                {
                    id: 'layer3-circle2',
                    type: 'circle' as const,
                    size: 'w-18 h-18',
                    position: { top: '20%', right: '40%' },
                    opacity: 'bg-primary/28',
                    color: '#00D4AD',
                    animationDelay: 2.5,
                    rotationSpeed: 32,
                    scaleRange: [0.85, 1.15] as [number, number],
                },
                {
                    id: 'layer3-circle3',
                    type: 'circle' as const,
                    size: 'w-16 h-16',
                    position: { top: '80%', left: '40%' },
                    opacity: 'bg-primary/30',
                    color: '#33FFD9',
                    animationDelay: 5,
                    rotationSpeed: 35,
                    scaleRange: [0.95, 1.05] as [number, number],
                },
            ],
            layer4: [
                {
                    id: 'layer4-hex1',
                    type: 'hexagon' as const,
                    size: 'w-14 h-14',
                    position: { top: '40%', left: '35%' },
                    opacity: 'bg-primary/35',
                    color: '#00FFD1',
                    animationDelay: 1.5,
                    rotationSpeed: 40,
                    scaleRange: [0.95, 1.05] as [number, number],
                },
                {
                    id: 'layer4-hex2',
                    type: 'hexagon' as const,
                    size: 'w-12 h-12',
                    position: { top: '70%', right: '30%' },
                    opacity: 'bg-primary/40',
                    color: '#00D4AD',
                    animationDelay: 3.5,
                    rotationSpeed: 42,
                    scaleRange: [0.9, 1.1] as [number, number],
                },
                {
                    id: 'layer4-hex3',
                    type: 'hexagon' as const,
                    size: 'w-10 h-10',
                    position: { top: '30%', right: '50%' },
                    opacity: 'bg-primary/45',
                    color: '#33FFD9',
                    animationDelay: 6.5,
                    rotationSpeed: 45,
                    scaleRange: [0.95, 1.05] as [number, number],
                },
            ],
        };
    }, [isMobile]);

    // Scroll-based transforms
    const layer1Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 200]);
    const layer2Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 150]);
    const layer3Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 100]);
    const layer4Y = useTransform(scrollY, [0, 500], [0, shouldReduceMotion ? 0 : 50]);

    const layer1Opacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.3]);
    const layer2Opacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.4]);
    const layer3Opacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.5]);
    const layer4Opacity = useTransform(scrollY, [0, 300], [1, shouldReduceMotion ? 1 : 0.6]);

    // Memoized shape renderer for performance
    const renderShape = useMemo(() => {
        const ShapeRenderer = (shape: GeometricShape, layerMultiplier: number) => {
            const mouseMultiplier = shouldReduceMotion ? 0 : layerMultiplier;
            const mouseX = mousePosition.x * mouseMultiplier;
            const mouseY = mousePosition.y * mouseMultiplier;

            const ShapeComponent = motion.div;
            const shapeClasses = `${shape.size} ${shape.opacity} rounded-full blur-sm`;

            return (
                <ShapeComponent
                    key={shape.id}
                    className={shapeClasses}
                    style={{
                        top: shape.position.top,
                        left: shape.position.left,
                        right: shape.position.right,
                        translateX: mouseX,
                        translateY: mouseY,
                        willChange: 'transform',
                    }}
                    animate={shouldReduceMotion ? {} : {
                        rotate: [0, 360],
                        scale: shape.scaleRange,
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        rotate: {
                            duration: shape.rotationSpeed,
                            repeat: Infinity,
                            ease: 'linear',
                        },
                        scale: {
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: shape.animationDelay,
                        },
                        opacity: {
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: shape.animationDelay,
                        },
                    }}
                    whileHover={shouldReduceMotion ? {} : {
                        scale: isHovered ? 1.2 : 1,
                        transition: { duration: 0.2 },
                    }}
                />
            );
        };
        ShapeRenderer.displayName = 'ShapeRenderer';
        return ShapeRenderer;
    }, [mousePosition, shouldReduceMotion, isHovered]);

    return (
        <div
            className={`absolute inset-0 overflow-hidden ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Layer 1 - Furthest, fastest movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    y: layer1Y,
                    opacity: layer1Opacity,
                }}
            >
                {geometricShapes.layer1.map((shape) => renderShape(shape, 1.8))}
            </motion.div>

            {/* Layer 2 - Medium-fast movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    y: layer2Y,
                    opacity: layer2Opacity,
                }}
            >
                {geometricShapes.layer2.map((shape) => renderShape(shape, 1.5))}
            </motion.div>

            {/* Layer 3 - Medium movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    y: layer3Y,
                    opacity: layer3Opacity,
                }}
            >
                {geometricShapes.layer3.map((shape) => renderShape(shape, 1.2))}
            </motion.div>

            {/* Layer 4 - Closest, slowest movement */}
            <motion.div
                className="absolute inset-0"
                style={{
                    y: layer4Y,
                    opacity: layer4Opacity,
                }}
            >
                {geometricShapes.layer4.map((shape) => renderShape(shape, 0.8))}
            </motion.div>

            {/* Additional glow effects */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary/5" />
        </div>
    );
};

export default PortraitGeometricBackground;
