'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, FolderOpen, Clock, MapPin, Zap, Users, Award, CheckCircle } from 'lucide-react';

const HomeIntro = () => {
    const t = useTranslations('home.intro');
    const shouldReduceMotion = useReducedMotion();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.15,
                delayChildren: shouldReduceMotion ? 0 : 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0.1 : 0.8,
                ease: 'easeOut',
            },
        },
    };

    const chipVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0.1 : 0.6,
                ease: 'easeOut',
            },
        },
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                duration: shouldReduceMotion ? 0.1 : 0.5,
                ease: 'easeOut',
            },
        },
    };

    const credentials = [
        {
            label: '20+ Years',
            icon: Calendar,
            value: 20,
            suffix: '+',
            description: 'Experience',
            color: 'from-blue-500/20 to-blue-600/20'
        },
        {
            label: '80+ Projects',
            icon: FolderOpen,
            value: 80,
            suffix: '+',
            description: 'Delivered',
            color: 'from-purple-500/20 to-purple-600/20'
        },
        {
            label: '4,000+ Hours Saved',
            icon: Clock,
            value: 4000,
            suffix: '+',
            description: 'Hours Saved',
            color: 'from-green-500/20 to-green-600/20'
        },
        {
            label: 'Montreal Based',
            icon: MapPin,
            value: null,
            suffix: '',
            description: 'Location',
            color: 'from-orange-500/20 to-orange-600/20'
        },
    ];

    // Count-up animation hook
    const useCountUp = (end: number, duration: number = 2000) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            if (!isInView) return;

            let startTime: number;
            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(end * easeOutQuart));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            requestAnimationFrame(animate);
        }, [end, duration]);

        return count;
    };

    // Individual stat badge component
    const StatBadge = ({ credential, index }: { credential: any, index: number }) => {
        const count20 = useCountUp(20, 2000);
        const count80 = useCountUp(80, 2000);
        const count4000 = useCountUp(4000, 2000);

        const count = credential.value === 20 ? count20 :
            credential.value === 80 ? count80 :
                credential.value === 4000 ? count4000 : null;

        const IconComponent = credential.icon;

        return (
            <motion.div
                key={credential.label}
                variants={chipVariants}
                className="group relative"
                whileHover={shouldReduceMotion ? {} : {
                    scale: 1.05,
                    y: -5
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Glass morphism card */}
                <div className="relative bg-card/30 backdrop-blur-md border border-border/30 rounded-2xl p-6 text-center hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 overflow-hidden">
                    {/* Gradient background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${credential.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                            variants={iconVariants}
                            className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300"
                        >
                            <IconComponent className="w-6 h-6 text-primary" />
                        </motion.div>

                        {/* Number/Value */}
                        <div className="mb-2">
                            {credential.value ? (
                                <motion.div
                                    className="text-2xl font-bold text-primary font-space-grotesk"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                >
                                    {count?.toLocaleString()}{credential.suffix}
                                </motion.div>
                            ) : (
                                <div className="text-2xl font-bold text-primary font-space-grotesk">
                                    M
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm font-medium text-foreground group-hover:text-primary/90 transition-colors duration-300">
                            {credential.description}
                        </p>
                    </div>

                    {/* Floating particles effect */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-2 right-2 w-1 h-1 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                        <div className="absolute bottom-3 left-3 w-1 h-1 bg-primary/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <section ref={ref} className="relative py-16 px-6 lg:px-8 bg-background">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Text Content */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium glow-neon">
                                <span>About Me</span>
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground">
                                {t('greeting')}
                            </h2>

                            <p className="text-lg lg:text-xl font-medium text-primary">
                                {t('tagline')}
                            </p>

                            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/50" />

                            <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                                {t('paragraph')}
                            </p>
                        </motion.div>

                        {/* Right Column - Enhanced Quick Stats */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-6"
                        >
                            <div className="text-center lg:text-left">
                                <h3 className="text-xl font-space-grotesk font-semibold text-foreground mb-2">
                                    Quick Stats
                                </h3>
                                <div className="h-1 w-12 bg-gradient-to-r from-primary to-primary/50 rounded-full mx-auto lg:mx-0" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {credentials.map((credential, index) => (
                                    <StatBadge key={credential.label} credential={credential} index={index} />
                                ))}
                            </div>

                            {/* Enhanced Additional Info */}
                            <motion.div
                                variants={itemVariants}
                                className="relative bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20 overflow-hidden"
                                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Background pattern */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />

                                <div className="relative z-10 flex items-center justify-center space-x-2">
                                    <CheckCircle className="w-5 h-5 text-primary" />
                                    <p className="text-sm text-muted-foreground font-medium">
                                        Available for new projects • Response within 24h
                                    </p>
                                    <Zap className="w-4 h-4 text-primary animate-pulse" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeIntro;
