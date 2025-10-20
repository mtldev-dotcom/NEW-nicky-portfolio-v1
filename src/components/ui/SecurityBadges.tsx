'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Shield, Lock, CheckCircle, Server } from 'lucide-react';

interface SecurityBadgeProps {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
    delay: number;
}

function SecurityBadge({ icon: Icon, text, delay }: SecurityBadgeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            className="flex items-center space-x-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-2 text-xs font-medium text-primary"
        >
            <Icon className="h-3 w-3" />
            <span>{text}</span>
        </motion.div>
    );
}

export default function SecurityBadges() {
    const t = useTranslations('global.footer.securityBadges');

    const badges = [
        {
            icon: CheckCircle,
            text: t('gdpr'),
            delay: 0
        },
        {
            icon: Lock,
            text: t('encrypted'),
            delay: 0.1
        },
        {
            icon: Shield,
            text: t('nda'),
            delay: 0.2
        },
        {
            icon: Server,
            text: t('local'),
            delay: 0.3
        }
    ];

    return (
        <div className="flex flex-wrap justify-center gap-3">
            {badges.map((badge, index) => (
                <SecurityBadge
                    key={index}
                    icon={badge.icon}
                    text={badge.text}
                    delay={badge.delay}
                />
            ))}
        </div>
    );
}
