'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import Image from 'next/image';

// Tech stack data with categories
const TECH_STACK = {
    core: [
        { id: 'nextjs', icon: 'nextjs.svg' },
        { id: 'react', icon: 'react.svg' },
        { id: 'typescript', icon: 'typescript.svg' },
        { id: 'tailwind', icon: 'tailwindcss.svg' },
        { id: 'supabase', icon: 'supabase.svg' },
        { id: 'postgresql', icon: 'postgresql.svg' },
        { id: 'prisma', icon: 'prisma.svg' },
        { id: 'nodejs', icon: 'nodejs.svg' },
    ],
    automation: [
        { id: 'n8n', icon: 'n8n.svg' },
        { id: 'openai', icon: 'openai.svg' },
        { id: 'zapier', icon: 'zapier.svg' },
    ],
    cloud: [
        { id: 'docker', icon: 'docker.svg' },
        { id: 'netlify', icon: 'netlify.svg' },
        { id: 'cloudflare', icon: 'cloudflare.svg' },
    ],
};

// Marquee icons (most used)
const MARQUEE_ICONS = [
    { id: 'nextjs', icon: 'nextjs.svg' },
    { id: 'react', icon: 'react.svg' },
    { id: 'typescript', icon: 'typescript.svg' },
    { id: 'tailwind', icon: 'tailwindcss.svg' },
    { id: 'supabase', icon: 'supabase.svg' },
    { id: 'n8n', icon: 'n8n.svg' },
    { id: 'openai', icon: 'openai.svg' },
    { id: 'docker', icon: 'docker.svg' },
    { id: 'netlify', icon: 'netlify.svg' },
    { id: 'cloudflare', icon: 'cloudflare.svg' },
];

type TabType = 'all' | 'core' | 'automation' | 'cloud';

const TechStackShowcase = () => {
    const t = useTranslations('home.techStack');
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const orbitRef = useRef<HTMLDivElement>(null);

    // Get filtered icons based on active tab
    const getFilteredIcons = () => {
        if (activeTab === 'all') {
            return [...TECH_STACK.core, ...TECH_STACK.automation, ...TECH_STACK.cloud];
        }
        return TECH_STACK[activeTab] || [];
    };

    const filteredIcons = getFilteredIcons();

    // Calculate orbit positions
    const getOrbitPosition = (index: number, total: number) => {
        const angle = (index / total) * 360;
        const radius = 120; // Orbit radius in pixels
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;
        return { x, y };
    };

    const tabs = [
        { id: 'all' as TabType, label: t('tabs.all') },
        { id: 'core' as TabType, label: t('tabs.core') },
        { id: 'automation' as TabType, label: t('tabs.automation') },
        { id: 'cloud' as TabType, label: t('tabs.cloud') },
    ];

    return (
        <section className="relative py-20 px-6 lg:px-8 bg-background overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
                        <span>Tech Arsenal</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        {t('subtitle')}
                    </p>

                    <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex items-center bg-card/50 backdrop-blur-sm border border-border/60 rounded-xl p-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300',
                                    activeTab === tab.id
                                        ? 'text-primary bg-primary/10'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-primary/10 rounded-lg glow-neon"
                                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Orbit Animation */}
                <motion.div
                    ref={orbitRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative flex justify-center items-center mb-16"
                >
                    {/* Center avatar/logo placeholder */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center glow-neon">
                        <span className="text-2xl font-bold text-primary-foreground">NB</span>
                    </div>

                    {/* Orbit ring */}
                    <motion.div
                        className="absolute inset-0 border border-primary/20 rounded-full"
                        style={{ width: 280, height: 280 }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Orbiting icons */}
                    <AnimatePresence mode="wait">
                        {filteredIcons.slice(0, 8).map((icon, index) => {
                            const position = getOrbitPosition(index, Math.min(filteredIcons.length, 8));
                            const toolName = t(`tools.${icon.id}.name`);
                            const toolDescription = t(`tools.${icon.id}.description`);
                            const toolUrl = t(`tools.${icon.id}.url`);

                            return (
                                <motion.div
                                    key={`${activeTab}-${icon.id}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: index * 0.1,
                                        type: 'spring',
                                        stiffness: 200
                                    }}
                                    className="absolute group cursor-pointer"
                                    style={{
                                        left: `calc(50% + ${position.x}px)`,
                                        top: `calc(50% + ${position.y}px)`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onMouseEnter={() => setHoveredIcon(icon.id)}
                                    onMouseLeave={() => setHoveredIcon(null)}
                                    onClick={() => window.open(toolUrl, '_blank')}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-xl bg-white/90 backdrop-blur-sm border border-border/60 flex items-center justify-center glow-neon group-hover:glow-neon-active transition-all duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Image
                                            src={`/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/${icon.icon}`}
                                            alt={toolName}
                                            width={24}
                                            height={24}
                                            className="w-6 h-6"
                                        />
                                    </motion.div>

                                    {/* Tooltip */}
                                    <AnimatePresence>
                                        {hoveredIcon === icon.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2 text-xs whitespace-nowrap glow-neon"
                                            >
                                                <div className="font-medium text-foreground">{toolName}</div>
                                                <div className="text-muted-foreground text-xs">{toolDescription}</div>
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border/60" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                {/* Marquee Strip */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="relative"
                >
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 glow-neon">
                            <span>Most Used</span>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        {/* Gradient edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                        <motion.div
                            className="flex space-x-8"
                            animate={{ x: [0, -100 * MARQUEE_ICONS.length] }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        >
                            {/* Duplicate for seamless loop */}
                            {[...MARQUEE_ICONS, ...MARQUEE_ICONS].map((icon, index) => {
                                const toolUrl = t(`tools.${icon.id}.url`);

                                return (
                                    <motion.div
                                        key={`marquee-${index}`}
                                        className="flex-shrink-0 w-16 h-16 rounded-xl bg-white/90 backdrop-blur-sm border border-border/40 flex items-center justify-center glow-neon group cursor-pointer"
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        onClick={() => window.open(toolUrl, '_blank')}
                                    >
                                        <Image
                                            src={`/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-light-mode/${icon.icon}`}
                                            alt={t(`tools.${icon.id}.name`)}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8"
                                        />
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default TechStackShowcase;
