'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from 'components/AppIcon';

const PrivacyStatement = () => {
    const t = useTranslations('showroom.privacy');
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

    const pulseVariants = shouldReduceMotion ? {} : {
        animate: {
            opacity: [0.3, 0.6, 0.3],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-card/20 to-transparent">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="relative rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 lg:p-12 text-center"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    custom={0}
                >
                    {/* Lock Watermark */}
                    <motion.div
                        className="absolute top-8 right-8 opacity-10"
                        variants={pulseVariants}
                        animate="animate"
                    >
                        <Icon name="Shield" size={48} className="text-primary" />
                    </motion.div>

                    {/* Background Wave Animation */}
                    <motion.div
                        className="absolute inset-0 overflow-hidden rounded-2xl"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-50" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                            animate={{
                                x: ['-100%', '100%'],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: 'linear',
                            }}
                        />
                    </motion.div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center glow-neon">
                                <Icon name="Lock" size={24} className="text-primary" />
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-space-grotesk font-bold text-foreground">
                                {t('title')}
                            </h2>
                        </div>

                        <blockquote className="text-lg lg:text-xl text-muted-foreground leading-relaxed italic">
                            "{t('quote')}"
                        </blockquote>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                            {t.raw('bullets').map((bullet: string, index: number) => (
                                <motion.div
                                    key={index}
                                    className="flex items-center gap-3 p-4 rounded-lg bg-muted/30 border border-border/50"
                                    variants={fadeInUp}
                                    custom={index + 1}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-sm text-muted-foreground">{bullet}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Additional Trust Indicators */}
                        <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-border/50">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="CheckCircle" size={16} className="text-primary" />
                                <span>GDPR Compliant</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="CheckCircle" size={16} className="text-primary" />
                                <span>End-to-End Encryption</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Icon name="CheckCircle" size={16} className="text-primary" />
                                <span>Zero Data Retention</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default PrivacyStatement;
