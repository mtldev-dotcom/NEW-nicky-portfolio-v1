'use client';

import { useTranslations } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import ThemeCustomizer from './ThemeCustomizer';
import ToolPlaceholder from './ToolPlaceholder';

const InteractiveTools = () => {
    const t = useTranslations('showroom.tools');
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

    const tools = t.raw('items');

    return (
        <section className="py-16 lg:py-20">
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
                        Interactive demos and tools you can try right now. Each tool showcases real capabilities in a safe, sandboxed environment.
                    </p>
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={staggerContainer}
                >
                    {/* AI Chat Sandbox */}
                    <ToolPlaceholder
                        tool={tools[0]}
                        icon="MessageCircle"
                        status="coming-soon"
                        index={0}
                    />

                    {/* Workflow Visualizer */}
                    <ToolPlaceholder
                        tool={tools[1]}
                        icon="Workflow"
                        status="coming-soon"
                        index={1}
                    />

                    {/* Theme Customizer - Fully Functional */}
                    <ThemeCustomizer
                        tool={tools[2]}
                        index={2}
                    />

                    {/* Performance Meter */}
                    <ToolPlaceholder
                        tool={tools[3]}
                        icon="Gauge"
                        status="coming-soon"
                        index={3}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default InteractiveTools;
