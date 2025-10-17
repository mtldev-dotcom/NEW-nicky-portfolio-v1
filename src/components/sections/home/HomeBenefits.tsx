'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

const HomeBenefits = () => {
    const t = useTranslations('home.benefits');
    const shouldReduceMotion = useReducedMotion();
    const [expandedCard, setExpandedCard] = useState<string | null>(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.2,
                delayChildren: shouldReduceMotion ? 0 : 0.1,
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

    const benefits = [
        {
            key: 'timeSavings',
            icon: '💰',
            title: t('items.timeSavings.title'),
            example: t('items.timeSavings.example'),
            metric: '10+',
            metricLabel: 'hours/week saved',
            details: 'Automated workflows that handle repetitive tasks, client communications, and data processing.',
        },
        {
            key: 'visibility',
            icon: '🚀',
            title: t('items.visibility.title'),
            example: t('items.visibility.example'),
            metric: '45%',
            metricLabel: 'more bookings',
            details: 'SEO-optimized websites and Google Business profiles that drive organic traffic and conversions.',
        },
        {
            key: 'understanding',
            icon: '🧠',
            title: t('items.understanding.title'),
            example: t('items.understanding.example'),
            metric: '100%',
            metricLabel: 'clarity',
            details: 'Clear explanations, documentation, and training so you understand and control your systems.',
        },
    ];

    return (
        <section className="relative py-16 px-6 lg:px-8 bg-background">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            </div>

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
                            <span>{t('title')}</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                            {t('subtitle')}
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={benefit.key}
                                variants={itemVariants}
                                className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-smooth"
                                whileHover={shouldReduceMotion ? {} : { y: -4 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                {/* Glass morphism effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="text-3xl">{benefit.icon}</div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary font-space-grotesk">
                                                {benefit.metric}
                                            </div>
                                            <div className="text-xs text-muted-foreground uppercase tracking-wider">
                                                {benefit.metricLabel}
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold text-foreground mb-3">
                                        {benefit.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                        {benefit.example}
                                    </p>

                                    {/* Expandable Details */}
                                    <motion.div
                                        className="overflow-hidden"
                                        initial={false}
                                        animate={{
                                            height: expandedCard === benefit.key ? 'auto' : 0,
                                            opacity: expandedCard === benefit.key ? 1 : 0,
                                        }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <div className="pt-4 border-t border-border/30">
                                            <p className="text-sm text-muted-foreground">
                                                {benefit.details}
                                            </p>
                                        </div>
                                    </motion.div>

                                    <button
                                        onClick={() => setExpandedCard(
                                            expandedCard === benefit.key ? null : benefit.key
                                        )}
                                        className="mt-4 flex items-center text-sm text-primary hover:text-primary/80 transition-colors group"
                                    >
                                        <span className="font-medium">
                                            {expandedCard === benefit.key ? 'Show less' : 'Learn more'}
                                        </span>
                                        <motion.div
                                            className="ml-1 transition-transform"
                                            animate={{
                                                rotate: expandedCard === benefit.key ? 180 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            ↓
                                        </motion.div>
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mt-12"
                    >
                        <p className="text-lg text-muted-foreground mb-6">
                            Ready to see these benefits for your business?
                        </p>
                        <motion.div
                            whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                        >
                            <button className="inline-flex items-center px-6 py-3 bg-primary text-black font-semibold rounded-lg glow-neon hover:glow-neon-active transition-smooth">
                                Get Started Today
                                <motion.span
                                    className="ml-2"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeBenefits;
