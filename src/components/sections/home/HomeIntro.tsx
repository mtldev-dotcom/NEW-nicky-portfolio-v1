'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const HomeIntro = () => {
    const t = useTranslations('home.intro');

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

    return (
        <section className="relative py-20 px-6 lg:px-8 bg-background">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
            </div>

            <div className="relative max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-12"
                    >
                        <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
                            <span>Personal Introduction</span>
                        </div>

                        <motion.h2
                            className="text-2xl lg:text-3xl font-space-grotesk font-bold text-foreground mb-6"
                            variants={itemVariants}
                        >
                            {t('greeting')}
                        </motion.h2>

                        <motion.p
                            className="text-lg lg:text-xl font-medium text-primary mb-8"
                            variants={itemVariants}
                        >
                            {t('tagline')}
                        </motion.p>

                        <motion.div
                            className="max-w-3xl mx-auto"
                            variants={itemVariants}
                        >
                            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-primary to-primary/50 mx-auto mb-8" />

                            <p className="text-base lg:text-lg leading-relaxed text-muted-foreground">
                                {t('paragraph')}
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HomeIntro;
