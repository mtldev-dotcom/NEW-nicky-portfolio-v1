'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import DemoCard from './DemoCard';

const DemoGallery = () => {
    const t = useTranslations('showroom.gallery');
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

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
            },
        },
    };

    return (
        <section className="py-16 lg:py-20 bg-gradient-to-br from-card/20 to-transparent">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeInUp}
                    custom={0}
                >
                    <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                        {t('sectionTitle')}
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t('sectionSubtitle')}
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {t.raw('cards').map((card: any, index: number) => (
                        <DemoCard key={card.id} card={card} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default DemoGallery;
