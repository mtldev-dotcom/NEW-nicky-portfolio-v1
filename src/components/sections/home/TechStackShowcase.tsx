'use client';

import { useState, memo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import TechStackCloud from 'components/sections/home/TechStackCloud';

// Marquee icons (most used)
const MARQUEE_ICONS = [
    { id: 'nextjs', icon: 'nextjs.png' },
    { id: 'react', icon: 'react.png' },
    { id: 'typescript', icon: 'typescript.png' },
    { id: 'tailwind', icon: 'tailwindcss.png' },
    { id: 'supabase', icon: 'supabase.png' },
    { id: 'n8n', icon: 'n8n.png' },
    { id: 'openai', icon: 'openai.png' },
    { id: 'docker', icon: 'docker.png' },
    { id: 'netlify', icon: 'netlify.png' },
    { id: 'cloudflare', icon: 'cloudflare.png' },
];

type TabType = 'all' | 'core' | 'automation' | 'cloud';

const TechStackShowcase = () => {
    const t = useTranslations('home.techStack');
    const [activeTab, setActiveTab] = useState<TabType>('all');
    const [clickedMarqueeIcon, setClickedMarqueeIcon] = useState<string | null>(null);

    const tabs = [
        { id: 'all' as TabType, label: t('tabs.all') },
        { id: 'core' as TabType, label: t('tabs.core') },
        { id: 'automation' as TabType, label: t('tabs.automation') },
        { id: 'cloud' as TabType, label: t('tabs.cloud') },
    ];

    // Close marquee tooltip when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (clickedMarqueeIcon && !(event.target as Element).closest('.marquee-icon-container')) {
                setClickedMarqueeIcon(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [clickedMarqueeIcon]);

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
                        <span>{t('title')}</span>
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>

                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Tabs */}
                {/* <motion.div
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
                                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${activeTab === tab.id
                                    ? 'text-primary bg-primary/10'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-card/50'
                                    }`}
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
                </motion.div> */}

                {/* 3D Icon Cloud */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-16"
                >
                    <TechStackCloud className="w-full h-[500px]" />
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
                            <span>{t('mostUsed')}</span>
                        </div>
                    </div>

                    <div className="relative overflow-hidden">
                        {/* Gradient edges */}
                        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                        <div className="flex">
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
                                    const toolName = t(`tools.${icon.id}.name`);
                                    const toolDescription = t(`tools.${icon.id}.description`);

                                    return (
                                        <div key={`marquee-${index}`} className="relative">
                                            <motion.div
                                                className="marquee-icon-container flex-shrink-0 w-16 h-16 rounded-xl backdrop-blur-sm border border-border/40 flex items-center justify-center glow-neon group cursor-pointer"
                                                whileHover={{ scale: 1.05, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setClickedMarqueeIcon(clickedMarqueeIcon === icon.id ? null : icon.id)}
                                                onTouchStart={() => setClickedMarqueeIcon(clickedMarqueeIcon === icon.id ? null : icon.id)}
                                            >
                                                <img
                                                    src={`/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/${icon.icon}`}
                                                    alt={toolName}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </motion.div>

                                            {/* Tooltip for marquee icons */}
                                            {clickedMarqueeIcon === icon.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute -top-20 left-1/2 -translate-x-1/2 bg-black/95 backdrop-blur-md border border-white/20 rounded-xl px-3 py-2 text-xs whitespace-nowrap shadow-2xl z-50"
                                                >
                                                    <div className="font-bold text-white text-sm">{toolName}</div>
                                                    <div className="text-gray-300 text-xs mt-1">{toolDescription}</div>
                                                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
                                                </motion.div>
                                            )}
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default memo(TechStackShowcase);
