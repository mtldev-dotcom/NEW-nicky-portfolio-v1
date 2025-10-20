'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import DemoGallery from './DemoGallery';
import InteractiveTools from './InteractiveTools';
import PrivacyStatement from './PrivacyStatement';
import CTASection from './CTASection';

const ShowroomSection = () => {
    const t = useTranslations('showroom');
    const shouldReduceMotion = useReducedMotion();

    const fadeInUp = {
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
        visible: (custom: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: custom * 0.1,
                duration: shouldReduceMotion ? 0.1 : 0.6,
                ease: 'easeOut',
            },
        }),
    };

    return (
        <div className="min-h-screen bg-background pt-16">
            {/* Hero Section */}
            <section className="relative py-20 lg:py-32 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,209,0.1),transparent_50%)]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        custom={0}
                    >
                        {/* Lock Icon Animation */}
                        <motion.div
                            className="mb-8 flex justify-center"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center glow-neon">
                                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground mb-6"
                            variants={fadeInUp}
                            custom={1}
                        >
                            {t('hero.headline')}
                        </motion.h1>

                        <motion.p
                            className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
                            variants={fadeInUp}
                            custom={2}
                        >
                            {t('hero.subhead')}
                        </motion.p>

                        {/* Chip Tags */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-3 mb-8"
                            variants={fadeInUp}
                            custom={3}
                        >
                            {t.raw('hero.chips').map((chip: string, index: number) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 rounded-full bg-card/50 border border-border/50 text-sm font-medium text-muted-foreground backdrop-blur-sm"
                                >
                                    {chip}
                                </span>
                            ))}
                        </motion.div>

                        {/* Gradient Divider */}
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto rounded-full"
                            variants={fadeInUp}
                            custom={4}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Intro Section */}
            <section className="py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <motion.div
                        className="text-center space-y-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        custom={0}
                    >
                        <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed">
                            {t('intro.lead')}
                        </p>
                        <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
                            {t('intro.body')}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Demo Gallery */}
            <DemoGallery />

            {/* Interactive Tools */}
            <InteractiveTools />

            {/* Privacy Statement */}
            <PrivacyStatement />

            {/* CTA Section */}
            <CTASection />
        </div>
    );
};

export default ShowroomSection;
