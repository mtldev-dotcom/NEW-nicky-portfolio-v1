'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';

interface ThemeCustomizerProps {
    tool: {
        id: string;
        title: string;
        description: string;
        cta: string;
    };
    index: number;
}

const ThemeCustomizer = ({ tool, index }: ThemeCustomizerProps) => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [accentColor, setAccentColor] = useState('mint');
    const [isOpen, setIsOpen] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    const accentColors = useMemo(() => [
        { name: 'mint', value: '#00FFD1', label: 'Mint' },
        { name: 'emerald', value: '#10B981', label: 'Emerald' },
        { name: 'cyan', value: '#06B6D4', label: 'Cyan' },
        { name: 'blue', value: '#3B82F6', label: 'Blue' },
        { name: 'purple', value: '#8B5CF6', label: 'Purple' },
        { name: 'pink', value: '#EC4899', label: 'Pink' },
    ], []);

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

    // Apply theme changes
    useEffect(() => {
        const root = document.documentElement;

        // Apply dark/light mode
        if (isDarkMode) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        // Apply accent color
        const selectedColor = accentColors.find(c => c.name === accentColor);
        root.style.setProperty('--primary', selectedColor?.value || '#00FFD1');
    }, [isDarkMode, accentColor, accentColors]);

    const resetToDefaults = () => {
        setIsDarkMode(true);
        setAccentColor('mint');
    };

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
                    <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <Icon name="Palette" size={20} className="text-primary" />
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
                    variant="default"
                    size="sm"
                    className="w-full glow-neon hover:glow-neon-active"
                    onClick={() => setIsOpen(true)}
                >
                    {tool.cta}
                </Button>
            </div>

            {/* Preview */}
            <div className="p-6 space-y-4">
                <div className="text-sm font-medium text-foreground">Live Preview</div>

                {/* Theme Preview */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Theme</span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsDarkMode(false)}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${!isDarkMode
                                    ? 'bg-primary text-black'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                            >
                                Light
                            </button>
                            <button
                                onClick={() => setIsDarkMode(true)}
                                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${isDarkMode
                                    ? 'bg-primary text-black'
                                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                                    }`}
                            >
                                Dark
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Accent</span>
                        <div className="flex gap-1">
                            {accentColors.slice(0, 4).map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setAccentColor(color.name)}
                                    className={`w-6 h-6 rounded-full border-2 transition-all ${accentColor === color.name
                                        ? 'border-foreground scale-110'
                                        : 'border-border hover:border-primary/50'
                                        }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.label}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sample Elements */}
                <div className="space-y-2">
                    <div className="h-2 rounded-full bg-primary/20">
                        <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                                width: '60%',
                                backgroundColor: accentColors.find(c => c.name === accentColor)?.value || '#00FFD1'
                            }}
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="px-3 py-1 rounded-md bg-primary/10 text-xs text-primary">
                            Sample Badge
                        </div>
                        <div className="px-3 py-1 rounded-md border border-border text-xs text-muted-foreground">
                            Sample Button
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.div
                        className="relative w-full max-w-md rounded-2xl border border-border/50 bg-card/95 backdrop-blur-md p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-space-grotesk font-bold text-foreground">
                                Theme Customizer
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <Icon name="X" size={20} />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Theme Mode */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-3">
                                    Theme Mode
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => setIsDarkMode(false)}
                                        className={`p-4 rounded-lg border transition-all ${!isDarkMode
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <Icon name="Sun" size={24} className="mx-auto mb-2" />
                                        <div className="text-sm font-medium">Light</div>
                                    </button>
                                    <button
                                        onClick={() => setIsDarkMode(true)}
                                        className={`p-4 rounded-lg border transition-all ${isDarkMode
                                            ? 'border-primary bg-primary/10 text-primary'
                                            : 'border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <Icon name="Moon" size={24} className="mx-auto mb-2" />
                                        <div className="text-sm font-medium">Dark</div>
                                    </button>
                                </div>
                            </div>

                            {/* Accent Colors */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-3">
                                    Accent Color
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    {accentColors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setAccentColor(color.name)}
                                            className={`p-3 rounded-lg border transition-all ${accentColor === color.name
                                                ? 'border-primary bg-primary/10'
                                                : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-white/20"
                                                style={{ backgroundColor: color.value }}
                                            />
                                            <div className="text-xs font-medium text-foreground">
                                                {color.label}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 pt-4">
                                <Button
                                    variant="outline"
                                    className="flex-1"
                                    onClick={resetToDefaults}
                                >
                                    Reset
                                </Button>
                                <Button
                                    variant="default"
                                    className="flex-1 glow-neon"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Apply
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </motion.div>
    );
};

export default ThemeCustomizer;
