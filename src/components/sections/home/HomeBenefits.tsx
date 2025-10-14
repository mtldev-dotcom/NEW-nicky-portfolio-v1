'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const HomeBenefits = () => {
    const t = useTranslations('home.benefits');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
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
        },
        {
            key: 'visibility',
            icon: '🚀',
            title: t('items.visibility.title'),
            example: t('items.visibility.example'),
        },
        {
            key: 'understanding',
            icon: '🧠',
            title: t('items.understanding.title'),
            example: t('items.understanding.example'),
        },
    ];

    return (
        <section className="relative py-20 px-6 lg:px-8 bg-background">
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
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
                            <span>Real Results</span>
                        </div>

                        <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                            {t('title')}
                        </h2>

                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            {t('subtitle')}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, idx) => (
                            <motion.div
                                key={benefit.key}
                                variants={itemVariants}
                                className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden"
                            >
                                {/* Animated gradient wash on hover */}
                                <motion.div
                                    className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={false}
                                    animate={{}}
                                >
                                    <motion.div
                                        className="absolute -inset-20 bg-[conic-gradient(var(--color-primary)_0deg,transparent_120deg)] opacity-30"
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity }}
                                    />
                                </motion.div>

                                <div className="relative p-8 flex flex-col gap-4">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="text-4xl">{benefit.icon}</div>
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-neon">
                                            <motion.div
                                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                                transition={{ duration: 8, ease: 'easeInOut', repeat: Infinity }}
                                            >
                                                <div className="w-6 h-6 rounded-full bg-primary/20" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold text-foreground mb-4">
                                        {benefit.title}
                                    </h3>

                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {benefit.example}
                                    </p>

                                    <div className="mt-4 flex items-center text-sm text-primary/80">
                                        <span className="font-medium">Learn more</span>
                                        <motion.div
                                            className="ml-1 transition-transform group-hover:translate-x-0.5"
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            →
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeBenefits;
