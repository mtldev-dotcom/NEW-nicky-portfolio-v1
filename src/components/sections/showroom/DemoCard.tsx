'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import DemoModal from './DemoModal';

interface DemoCardProps {
    card: {
        id: string;
        title: string;
        tagline: string;
        description: string;
        highlights: string[];
        stack: string[];
        primaryCta: string;
        secondaryCta: string;
    };
    index: number;
}

const DemoCard = ({ card, index }: DemoCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    // Use existing portfolio images as placeholders
    const placeholderImages = [
        '/assets/projects/aiaa-dev.webp',
        '/assets/projects/creative-studio-pro.webp',
        '/assets/projects/ecotrack-analytics.webp',
        '/assets/projects/financeflow-mobile.webp',
        '/assets/projects/healthconnect-platform.webp',
        '/assets/projects/montreal-tech-hub.webp',
    ];

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
            },
        },
    };

    const hoverVariants = shouldReduceMotion ? {} : {
        y: -4,
        rotateX: 2,
        transition: { duration: 0.3, ease: 'easeOut' },
    };

    return (
        <>
            <motion.div
                className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
                variants={cardVariants}
                whileHover={hoverVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
            >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                    <Image
                        src={placeholderImages[index % placeholderImages.length]}
                        alt={card.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Demo Badge */}
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary backdrop-blur-sm">
                            DEMO
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <h3 className="text-xl font-space-grotesk font-semibold text-foreground mb-2">
                            {card.title}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-3">
                            {card.tagline}
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {card.description}
                        </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {card.highlights.map((highlight, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 rounded-md bg-muted/50 text-xs text-muted-foreground"
                                >
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                            {card.stack.map((tech, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 rounded-md bg-primary/10 border border-primary/20 text-xs text-primary"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <Button
                            variant="default"
                            size="sm"
                            className="flex-1 glow-neon hover:glow-neon-active"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {card.primaryCta}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {card.secondaryCta}
                        </Button>
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: 'linear-gradient(135deg, rgba(0,255,209,0.1) 0%, transparent 50%, rgba(0,255,209,0.05) 100%)',
                    }}
                />
            </motion.div>

            {/* Modal */}
            <DemoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                card={card}
                imageSrc={placeholderImages[index % placeholderImages.length]}
            />
        </>
    );
};

export default DemoCard;
