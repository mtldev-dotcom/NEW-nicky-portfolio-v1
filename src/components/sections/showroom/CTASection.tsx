'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const CTASection = () => {
    const t = useTranslations('showroom.cta');
    const locale = useLocale();
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

    const glowVariants = shouldReduceMotion ? {} : {
        animate: {
            boxShadow: [
                '0 0 20px rgba(0,255,209,0.3)',
                '0 0 40px rgba(0,255,209,0.5)',
                '0 0 20px rgba(0,255,209,0.3)',
            ],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <section className="py-16 lg:py-20">
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="relative rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-card/50 to-primary/5 backdrop-blur-sm p-8 lg:p-12 text-center overflow-hidden"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    custom={0}
                >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
                    <motion.div
                        className="absolute inset-0"
                        variants={glowVariants}
                        animate="animate"
                    />

                    {/* Lock to Button Animation Line */}
                    <motion.div
                        className="absolute top-8 left-1/2 w-px h-16 bg-gradient-to-b from-primary to-transparent"
                        initial={{ scaleY: 0, opacity: 0 }}
                        whileInView={{ scaleY: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ transformOrigin: 'top' }}
                    />

                    <div className="relative z-10 space-y-8">
                        {/* Lock Icon */}
                        <motion.div
                            className="flex justify-center"
                            variants={fadeInUp}
                            custom={1}
                        >
                            <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center glow-neon">
                                <Icon name="Lock" size={32} className="text-primary" />
                            </div>
                        </motion.div>

                        {/* Headline */}
                        <motion.h2
                            className="text-3xl lg:text-5xl font-space-grotesk font-bold text-foreground"
                            variants={fadeInUp}
                            custom={2}
                        >
                            {t('headline')}
                        </motion.h2>

                        {/* Subhead */}
                        <motion.p
                            className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto"
                            variants={fadeInUp}
                            custom={3}
                        >
                            {t('subhead')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            variants={fadeInUp}
                            custom={4}
                        >
                            <Button
                                asChild
                                variant="default"
                                size="lg"
                                className="glow-neon hover:glow-neon-active magnetic-hover"
                                iconName="Calendar"
                                iconPosition="left"
                                iconSize={20}
                            >
                                <Link href={`/${locale}/contact`}>
                                    {t('primary')}
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="border-primary/50 text-primary hover:bg-primary/10 magnetic-hover"
                                iconName="Zap"
                                iconPosition="left"
                                iconSize={20}
                            >
                                <Link href={`/${locale}/contact`}>
                                    {t('secondary')}
                                </Link>
                            </Button>
                        </motion.div>

                        {/* Footnote */}
                        <motion.div
                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground"
                            variants={fadeInUp}
                            custom={5}
                        >
                            <Icon name="Shield" size={16} className="text-primary" />
                            <span>{t('footnote')}</span>
                        </motion.div>

                        {/* Trust Indicators */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-8 pt-6 border-t border-border/50"
                            variants={fadeInUp}
                            custom={6}
                        >
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="Clock" size={16} className="text-primary" />
                                <span>24h Response Time</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="Globe" size={16} className="text-primary" />
                                <span>Remote & On-Site</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="Award" size={16} className="text-primary" />
                                <span>20+ Years Experience</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CTASection;
