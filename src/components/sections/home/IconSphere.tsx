'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Tech stack icons data
const ICONS = [
    { id: 'nextjs', label: 'Next.js', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/nextjs.png', href: 'https://nextjs.org' },
    { id: 'react', label: 'React', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/react.png', href: 'https://react.dev' },
    { id: 'typescript', label: 'TypeScript', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/typescript.png', href: 'https://typescriptlang.org' },
    { id: 'tailwind', label: 'Tailwind CSS', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/tailwindcss.png', href: 'https://tailwindcss.com' },
    { id: 'supabase', label: 'Supabase', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/supabase.png', href: 'https://supabase.com' },
    { id: 'postgresql', label: 'PostgreSQL', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/postgresql.png', href: 'https://postgresql.org' },
    { id: 'prisma', label: 'Prisma', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/prisma.png', href: 'https://prisma.io' },
    { id: 'nodejs', label: 'Node.js', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/nodejs.png', href: 'https://nodejs.org' },
    { id: 'n8n', label: 'n8n', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/n8n.png', href: 'https://n8n.io' },
    { id: 'openai', label: 'OpenAI', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/openai.png', href: 'https://openai.com' },
    { id: 'zapier', label: 'Zapier', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/zapier.png', href: 'https://zapier.com' },
    { id: 'docker', label: 'Docker', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/docker.png', href: 'https://docker.com' },
    { id: 'netlify', label: 'Netlify', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/netlify.png', href: 'https://netlify.com' },
    { id: 'cloudflare', label: 'Cloudflare', src: '/assets/icons/Tech-Stack-Icons-Design-Stack-Icons-dark-mode/cloudflare.png', href: 'https://cloudflare.com' },
];

interface IconSphereProps {
    radius?: number;
    radiusMobile?: number;
    speed?: 'slow' | 'normal' | 'fast';
    className?: string;
}

// Generate circular positions (simpler approach)
const generateCirclePositions = (count: number, radius: number) => {
    const positions = [];

    for (let i = 0; i < count; i++) {
        const angle = (2 * Math.PI * i) / count;
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        positions.push({ x, y, z: 0, angle });
    }

    return positions;
};

const IconSphere = ({
    radius = 140,
    radiusMobile = 90,
    speed = 'normal',
    className = ''
}: IconSphereProps) => {
    const [isMobile, setIsMobile] = useState(false);
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
    const t = useTranslations('home.techStack');

    // Speed configuration
    const speedConfig = {
        slow: 20,
        normal: 15,
        fast: 10
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const currentRadius = isMobile ? radiusMobile : radius;
    const circlePositions = generateCirclePositions(ICONS.length, currentRadius);

    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Center logo/avatar */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-primary/60 backdrop-blur-sm border border-white/10 flex items-center justify-center glow-neon">
                <span className="text-lg md:text-2xl font-bold text-primary-foreground">NB</span>
            </div>

            {/* Icon Circle Container */}
            <div className="relative w-full h-full min-h-[280px] md:min-h-[320px] flex items-center justify-center">
                {/* Rotating circle container */}
                <motion.div
                    className="relative w-full h-full flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{
                        duration: speedConfig[speed],
                        repeat: Infinity,
                        ease: 'linear'
                    }}
                >
                    {/* Icons positioned in circle */}
                    {ICONS.map((icon, index) => {
                        const position = circlePositions[index];
                        const toolName = t(`tools.${icon.id}.name`);
                        const toolDescription = t(`tools.${icon.id}.description`);
                        const toolUrl = t(`tools.${icon.id}.url`);

                        return (
                            <motion.div
                                key={icon.id}
                                className="absolute cursor-pointer group"
                                style={{
                                    left: `calc(50% + ${position.x}px)`,
                                    top: `calc(50% + ${position.y}px)`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.8,
                                    delay: index * 0.1,
                                    type: 'spring',
                                    stiffness: 200
                                }}
                                whileHover={{ scale: 1.2 }}
                                onMouseEnter={() => setHoveredIcon(icon.id)}
                                onMouseLeave={() => setHoveredIcon(null)}
                                onClick={() => window.open(toolUrl, '_blank', 'noopener,noreferrer')}
                            >
                                {/* Icon container */}
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-white/90 backdrop-blur-sm border border-border/60 flex items-center justify-center glow-neon group-hover:glow-neon-active transition-all duration-300">
                                    <Image
                                        src={icon.src}
                                        alt={toolName}
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 md:w-8 md:h-8 object-contain"
                                    />
                                </div>

                                {/* Tooltip */}
                                {hoveredIcon === icon.id && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute -top-16 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/60 rounded-lg px-3 py-2 text-xs whitespace-nowrap glow-neon z-20"
                                    >
                                        <div className="font-medium text-foreground">{toolName}</div>
                                        <div className="text-muted-foreground text-xs">{toolDescription}</div>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border/60" />
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default IconSphere;
