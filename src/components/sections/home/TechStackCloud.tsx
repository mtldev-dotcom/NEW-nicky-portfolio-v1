'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// ============================================================================
// CONFIGURATION - Easy to customize
// ============================================================================

const AUTO_ROTATION_SPEED = 0.005; // Radians per frame
const MOUSE_SENSITIVITY = 0.002;
const ICON_SIZE = 48;

// ============================================================================
// TECH STACK DATA - Using only icons that definitely exist
// ============================================================================

type TabType = 'all' | 'core' | 'automation' | 'cloud' | 'backend' | 'design';

interface TechItem {
    id: string;
    name: string;
    icon: string;
    color: string;
    category: Exclude<TabType, 'all'>;
}

const TECH_STACK: TechItem[] = [
    // 🧩 Core
    { id: 'react', name: 'React', icon: 'react.png', color: '#61DAFB', category: 'core' },
    { id: 'nextjs', name: 'Next.js', icon: 'nextjs.png', color: '#000000', category: 'core' },
    { id: 'typescript', name: 'TypeScript', icon: 'typescript.png', color: '#3178C6', category: 'core' },
    { id: 'javascript', name: 'JavaScript', icon: 'js.png', color: '#F7DF1E', category: 'core' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: 'tailwindcss.png', color: '#06B6D4', category: 'core' },
    { id: 'nodejs', name: 'Node.js', icon: 'nodejs.png', color: '#339933', category: 'core' },
    // { id: 'python', name: 'Python', icon: 'python.png', color: '#3776AB', category: 'core' },
    // { id: 'postgresql', name: 'PostgreSQL', icon: 'postgresql.png', color: '#4169E1', category: 'core' },
    // { id: 'mongodb', name: 'MongoDB', icon: 'mongodb.png', color: '#47A248', category: 'core' },
    // { id: 'graphql', name: 'GraphQL', icon: 'graphql.png', color: '#E10098', category: 'core' },
    // { id: 'git', name: 'Git', icon: 'git.png', color: '#F05032', category: 'core' },
    // { id: 'redux', name: 'Redux', icon: 'redux.png', color: '#764ABC', category: 'core' },
    // { id: 'vite', name: 'Vite', icon: 'vitejs.png', color: '#646CFF', category: 'core' },
    // { id: 'webpack', name: 'Webpack', icon: 'webpack.png', color: '#8DD6F9', category: 'core' },

    // 🤖 Automation / AI
    { id: 'n8n', name: 'n8n', icon: 'n8n.png', color: '#F05A4B', category: 'automation' },
    { id: 'openai', name: 'OpenAI', icon: 'openai.png', color: '#10A37F', category: 'automation' },
    { id: 'huggingface', name: 'Hugging Face', icon: 'huggingface.png', color: '#FFD21E', category: 'automation' },
    // { id: 'langchain', name: 'LangChain', icon: 'langchain.png', color: '#2EC866', category: 'automation' },
    // { id: 'ollama', name: 'Ollama', icon: 'ollama.png', color: '#000000', category: 'automation' },
    // { id: 'replicate', name: 'Replicate', icon: 'replicate.png', color: '#00AEEF', category: 'automation' },
    // { id: 'vapi', name: 'Vapi', icon: 'vapi.png', color: '#8E24AA', category: 'automation' },
    // { id: 'cursor', name: 'Cursor AI', icon: 'cursor.png', color: '#0A84FF', category: 'automation' },
    // { id: 'chatgpt', name: 'ChatGPT', icon: 'chatgpt.png', color: '#10A37F', category: 'automation' },
    // { id: 'anthropic', name: 'Claude', icon: 'claude.png', color: '#FFD580', category: 'automation' },
    // { id: 'airflow', name: 'Apache Airflow', icon: 'airflow.png', color: '#017CEE', category: 'automation' },
    // { id: 'zapier', name: 'Zapier', icon: 'zapier.png', color: '#FF4A00', category: 'automation' },

    // ☁️ Cloud / DevOps
    { id: 'aws', name: 'AWS', icon: 'aws.png', color: '#FF9900', category: 'cloud' },
    { id: 'firebase', name: 'Firebase', icon: 'firebase.png', color: '#FFCA28', category: 'cloud' },
    { id: 'docker', name: 'Docker', icon: 'docker.png', color: '#2496ED', category: 'cloud' },
    { id: 'netlify', name: 'Netlify', icon: 'netlify.png', color: '#00AD9F', category: 'cloud' },
    { id: 'cloudflare', name: 'Cloudflare', icon: 'cloudflare.png', color: '#F38020', category: 'cloud' },
    { id: 'supabase', name: 'Supabase', icon: 'supabase.png', color: '#3ECF8E', category: 'cloud' },
    // { id: 'vercel', name: 'Vercel', icon: 'vercel.png', color: '#000000', category: 'cloud' },
    // { id: 'railway', name: 'Railway', icon: 'railway.png', color: '#0B0D0E', category: 'cloud' },
    // { id: 'digitalocean', name: 'DigitalOcean', icon: 'digitalocean.png', color: '#0080FF', category: 'cloud' },
    // { id: 'hetzner', name: 'Hetzner', icon: 'hetzner.png', color: '#D50C2D', category: 'cloud' },
    // { id: 'caddy', name: 'Caddy', icon: 'caddy.png', color: '#00BFA6', category: 'cloud' },
    // { id: 'traefik', name: 'Traefik', icon: 'traefik.png', color: '#24A1C1', category: 'cloud' },
    // { id: 'portainer', name: 'Portainer', icon: 'portainer.png', color: '#13BEF9', category: 'cloud' },
    // { id: 'kubernetes', name: 'Kubernetes', icon: 'kubernetes.png', color: '#326CE5', category: 'cloud' },

    // 🧠 Backend / API
    { id: 'fastapi', name: 'FastAPI', icon: 'fastapi.png', color: '#009688', category: 'backend' },
    { id: 'nestjs', name: 'NestJS', icon: 'nestjs.png', color: '#E0234E', category: 'backend' },
    { id: 'express', name: 'Express.js', icon: 'expressjs.png', color: '#000000', category: 'backend' },
    { id: 'prisma', name: 'Prisma', icon: 'prisma.png', color: '#2D3748', category: 'backend' },
    // { id: 'redis', name: 'Redis', icon: 'redis.png', color: '#DC382D', category: 'backend' },
    // { id: 'meilisearch', name: 'Meilisearch', icon: 'meilisearch.png', color: '#FF5CAA', category: 'backend' },
    // { id: 'strapi', name: 'Strapi', icon: 'strapi.png', color: '#2E7EEA', category: 'backend' },
    // { id: 'payload', name: 'Payload CMS', icon: 'payload.png', color: '#000000', category: 'backend' },
    // { id: 'medusajs', name: 'MedusaJS', icon: 'medusa.png', color: '#1C1C1C', category: 'backend' },
    // { id: 'shopify', name: 'Shopify', icon: 'shopify.png', color: '#95BF47', category: 'backend' },

    // 🎨 Design / Tools
    { id: 'figma', name: 'Figma', icon: 'figma.png', color: '#F24E1E', category: 'design' },
    { id: 'adobe', name: 'Adobe Creative Cloud', icon: 'adobe.png', color: '#FF0000', category: 'design' },
    { id: 'canva', name: 'Canva', icon: 'canva.png', color: '#00C4CC', category: 'design' },
    { id: 'framer', name: 'Framer', icon: 'framer.png', color: '#0055FF', category: 'design' },
    // { id: 'sketch', name: 'Sketch', icon: 'sketch.png', color: '#F7B500', category: 'design' },
    // { id: 'threejs', name: 'Three.js', icon: 'threejs.png', color: '#000000', category: 'design' },
    // { id: 'motion', name: 'Framer Motion', icon: 'motion.png', color: '#E32BFF', category: 'design' },
    // { id: 'illustrator', name: 'Adobe Illustrator', icon: 'illustrator.png', color: '#FF9A00', category: 'design' },
    // { id: 'photoshop', name: 'Adobe Photoshop', icon: 'ps.png', color: '#31A8FF', category: 'design' },
    // { id: 'aftereffects', name: 'After Effects', icon: 'ae.png', color: '#9999FF', category: 'design' },
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
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [hasMounted, setHasMounted] = useState(false);

    // Tabs config
    const tabs: { id: TabType; label: string }[] = [
        { id: 'all', label: t('tabs.all') },
        { id: 'core', label: t('tabs.core') },
        { id: 'automation', label: t('tabs.automation') },
        { id: 'cloud', label: t('tabs.cloud') },
        { id: 'backend', label: t('tabs.backend') },
        { id: 'design', label: t('tabs.design') },
    ];

    // Filtered tech list based on active tab
    const filteredTech = useMemo(() => (
        activeTab === 'all' ? TECH_STACK : TECH_STACK.filter((tch) => tch.category === activeTab)
    ), [activeTab]);

    // Responsive sphere radius
    const sphereRadius = useMemo(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth < 640 ? 120 : 200; // 120 for mobile, 200 for desktop
        }
        return 200; // Default for SSR
    }, []);

    // Generate positions sized to the filtered list
    const positions = useMemo(() => (
        generateSpherePositions(filteredTech.length, sphereRadius)
    ), [filteredTech.length, sphereRadius]);

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
        // Ensure client-only rendering for dynamic positions to avoid hydration mismatches
        setHasMounted(true);
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
        <div className={`relative flex flex-col items-center justify-center ${className}`}>
            {/* Tabs */}
            <div className="mb-6 w-full max-w-full px-4">
                <div className="flex items-center justify-center bg-card/50 backdrop-blur-sm border border-border/60 rounded-xl p-1 overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 whitespace-nowrap flex-shrink-0 ${activeTab === tab.id
                                ? 'text-primary bg-primary/10'
                                : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                                }`}
                        >
                            {activeTab === tab.id && (
                                <div className="absolute inset-0 bg-primary/10 rounded-lg" />
                            )}
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
            {/* 3D Container */}
            <div
                ref={containerRef}
                className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] mx-auto cursor-grab active:cursor-grabbing"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => {
                    setIsHovering(false);
                    setHoveredIcon(null);
                }}
                onTouchStart={(e) => {
                    e.preventDefault();
                    setIsHovering(true);
                }}
                onTouchMove={(e) => {
                    e.preventDefault();
                    if (e.touches.length === 1) {
                        const touch = e.touches[0];
                        if (containerRef.current) {
                            const rect = containerRef.current.getBoundingClientRect();
                            const centerX = rect.left + rect.width / 2;
                            const centerY = rect.top + rect.height / 2;

                            setMousePos({
                                x: touch.clientX - centerX,
                                y: touch.clientY - centerY,
                            });
                        }
                    }
                }}
                onTouchEnd={() => {
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


                {/* Tech Icons - render only after mount to avoid SSR/CSR mismatch */}
                {hasMounted && filteredTech.map((tech, index) => {
                    const basePos = positions[index];
                    const rotatedPos = rotatePoint(basePos, rotation);

                    // Calculate depth effects
                    const depth = rotatedPos.z + sphereRadius;
                    const maxDepth = sphereRadius * 2;
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
                                willChange: 'transform, opacity',
                            }}
                        >
                            {/* Icon container with animation isolated to child so transforms don't clash */}
                            <motion.div
                                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl backdrop-blur-sm border border-border/40 glow-neon group cursor-pointer transition-all duration-300 hover:glow-neon-active active:scale-95"
                                style={{
                                    backgroundColor: `${tech.color}15`,
                                    borderColor: `${tech.color}40`,
                                    boxShadow: `0 0 20px ${tech.color}20`,
                                }}
                                initial={false}
                                animate={{ opacity: opacity }}
                                transition={{ duration: 0.25, ease: 'easeOut', type: 'tween' }}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setHoveredIcon(tech.id)}
                                onMouseLeave={() => setHoveredIcon(null)}
                                onTouchStart={() => setHoveredIcon(tech.id)}
                                onTouchEnd={() => setHoveredIcon(null)}
                                onClick={() => handleIconClick(tech)}
                            >
                                <Image
                                    src={`/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/${tech.icon}`}
                                    alt={toolName}
                                    width={32}
                                    height={32}
                                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 object-contain transition-transform duration-200 group-hover:scale-110"
                                />
                            </motion.div>

                            {/* Tooltip */}
                            {hoveredIcon === tech.id && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm whitespace-nowrap shadow-2xl z-50 max-w-[200px] sm:max-w-none"
                                    style={{
                                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                        borderColor: `${tech.color}60`,
                                        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.8), 0 0 20px ${tech.color}40`,
                                    }}
                                >
                                    <div className="font-bold text-white text-sm sm:text-base">{toolName}</div>
                                    <div className="text-gray-300 text-xs sm:text-sm mt-1">{toolDescription}</div>
                                    <div
                                        className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 sm:border-l-6 sm:border-r-6 sm:border-t-6 border-transparent"
                                        style={{ borderTopColor: 'rgba(0, 0, 0, 0.95)' }}
                                    />
                                </motion.div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Instructions */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center px-4">
                <p className="text-xs text-muted-foreground/60">
                    {t('subtitle')}
                </p>
            </div>
        </div>
    );
};

export default memo(TechStackCloud);
