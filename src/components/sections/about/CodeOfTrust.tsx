'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { FileText, Server, Lock, Key } from 'lucide-react';

interface TrustCardProps {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    delay: number;
}

function TrustCard({ icon: Icon, title, description, delay }: TrustCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-background/80 hover:scale-[1.02]"
        >
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div className="relative z-10">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-4 font-space-grotesk text-xl font-semibold text-foreground">
                    {title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                    {description}
                </p>
            </div>
        </motion.div>
    );
}

export default function CodeOfTrust() {
    const t = useTranslations('about.codeOfTrust');

    const trustCards = [
        {
            icon: FileText,
            title: t('cards.nda.title'),
            description: t('cards.nda.description'),
            delay: 0
        },
        {
            icon: Server,
            title: t('cards.deployment.title'),
            description: t('cards.deployment.description'),
            delay: 0.1
        },
        {
            icon: Lock,
            title: t('cards.encryption.title'),
            description: t('cards.encryption.description'),
            delay: 0.2
        },
        {
            icon: Key,
            title: t('cards.transparency.title'),
            description: t('cards.transparency.description'),
            delay: 0.3
        }
    ];

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-center"
                >
                    <div className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                        <Lock className="mr-2 h-4 w-4" />
                        {t('badge')}
                    </div>

                    <h2 className="mb-6 font-space-grotesk text-3xl font-bold text-foreground md:text-4xl">
                        {t('title')}
                    </h2>

                    <p className="mx-auto max-w-3xl text-lg text-muted-foreground leading-relaxed">
                        {t('description')}
                    </p>
                </motion.div>

                {/* Trust Cards Grid */}
                <div className="grid gap-8 md:grid-cols-2">
                    {trustCards.map((card, index) => (
                        <TrustCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            delay={card.delay}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
