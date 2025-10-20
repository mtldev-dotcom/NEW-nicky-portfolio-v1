'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

interface ToolPlaceholderProps {
    tool: {
        id: string;
        title: string;
        description: string;
        cta: string;
    };
    icon: string;
    status: 'coming-soon' | 'beta' | 'maintenance';
    index: number;
}

const ToolPlaceholder = ({ tool, icon, status, index }: ToolPlaceholderProps) => {
    const shouldReduceMotion = useReducedMotion();

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
        transition: { duration: 0.3, ease: 'easeOut' },
    };

    const getStatusConfig = () => {
        switch (status) {
            case 'coming-soon':
                return {
                    color: 'text-orange-500',
                    bgColor: 'bg-orange-500/10',
                    borderColor: 'border-orange-500/20',
                    label: 'Coming Soon',
                    icon: 'Clock',
                };
            case 'beta':
                return {
                    color: 'text-blue-500',
                    bgColor: 'bg-blue-500/10',
                    borderColor: 'border-blue-500/20',
                    label: 'Beta',
                    icon: 'Flask',
                };
            case 'maintenance':
                return {
                    color: 'text-yellow-500',
                    bgColor: 'bg-yellow-500/10',
                    borderColor: 'border-yellow-500/20',
                    label: 'Maintenance',
                    icon: 'Wrench',
                };
            default:
                return {
                    color: 'text-muted-foreground',
                    bgColor: 'bg-muted/10',
                    borderColor: 'border-border/20',
                    label: 'Unavailable',
                    icon: 'X',
                };
        }
    };

    const statusConfig = getStatusConfig();

    return (
        <motion.div
            className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
            variants={cardVariants}
            whileHover={hoverVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
        >
            {/* Header */}
            <div className="p-6 border-b border-border/50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-muted/20 border border-border/30 flex items-center justify-center">
                        <Icon name={icon as any} size={20} className="text-muted-foreground" />
                    </div>
                    <div>
                        <h3 className="text-lg font-space-grotesk font-semibold text-foreground">
                            {tool.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            {tool.description}
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    className="w-full opacity-50 cursor-not-allowed"
                    disabled
                >
                    {tool.cta}
                </Button>
            </div>

            {/* Status */}
            <div className="p-6">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.bgColor} ${statusConfig.borderColor} border`}>
                    <Icon name={statusConfig.icon as any} size={16} className={statusConfig.color} />
                    <span className={`text-sm font-medium ${statusConfig.color}`}>
                        {statusConfig.label}
                    </span>
                </div>

                <p className="text-sm text-muted-foreground mt-4">
                    This tool is currently in development. Check back soon for interactive demos and live examples.
                </p>

                {/* Progress Indicator */}
                <div className="mt-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>Development Progress</span>
                        <span>75%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-muted/20">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                </div>
            </div>

            {/* Subtle Animation */}
            <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,255,209,0.05) 0%, transparent 50%, rgba(0,255,209,0.02) 100%)',
                }}
            />
        </motion.div>
    );
};

export default ToolPlaceholder;
