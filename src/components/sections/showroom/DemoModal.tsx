'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

interface DemoModalProps {
    isOpen: boolean;
    onClose: () => void;
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
    imageSrc: string;
}

const DemoModal = ({ isOpen, onClose, card, imageSrc }: DemoModalProps) => {
    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.3, ease: 'easeOut' },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2, ease: 'easeIn' },
        },
    };

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal Content */}
                    <motion.div
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-border/50 bg-card/95 backdrop-blur-md"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-border/50">
                            <div>
                                <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
                                    {card.title}
                                </h2>
                                <p className="text-primary font-medium">{card.tagline}</p>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={onClose}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Icon name="X" size={20} />
                            </Button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
                                {/* Image */}
                                <div className="space-y-4">
                                    <div className="relative h-64 rounded-xl overflow-hidden">
                                        <Image
                                            src={imageSrc}
                                            alt={card.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-xs font-medium text-primary backdrop-blur-sm">
                                                DEMO PROJECT
                                            </span>
                                        </div>
                                    </div>

                                    {/* About Section */}
                                    <div className="space-y-3">
                                        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
                                            About this Concept
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {card.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-6">
                                    {/* Highlights */}
                                    <div>
                                        <h3 className="text-lg font-space-grotesk font-semibold text-foreground mb-3">
                                            Key Features
                                        </h3>
                                        <div className="space-y-2">
                                            {card.highlights.map((highlight, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                    <span className="text-muted-foreground">{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tech Stack */}
                                    <div>
                                        <h3 className="text-lg font-space-grotesk font-semibold text-foreground mb-3">
                                            Tech Stack
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {card.stack.map((tech, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-sm text-primary"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3">
                                        <Button
                                            variant="default"
                                            className="w-full glow-neon hover:glow-neon-active"
                                            iconName="ExternalLink"
                                            iconPosition="right"
                                        >
                                            Try Live Demo
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            iconName="Eye"
                                            iconPosition="right"
                                        >
                                            View Screenshots
                                        </Button>
                                    </div>

                                    {/* Privacy Note */}
                                    <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                                        <div className="flex items-start gap-3">
                                            <Icon name="Shield" size={16} className="text-primary mt-0.5" />
                                            <div className="text-sm text-muted-foreground">
                                                <p className="font-medium text-foreground mb-1">Privacy Protected</p>
                                                <p>This demo uses fictional data and anonymized examples. Real client projects are developed under strict NDAs.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DemoModal;
