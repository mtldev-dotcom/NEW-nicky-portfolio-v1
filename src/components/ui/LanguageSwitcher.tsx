'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { cn } from '@/utils/cn';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'desktop' | 'mobile';
}

const LanguageSwitcher = ({ className, variant = 'desktop' }: LanguageSwitcherProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('global.languageSwitcher');

    const languages = [
        {
            code: 'en',
            name: t('english'),
            flag: '/assets/icons/us.svg',
            fallback: 'US'
        },
        {
            code: 'fr',
            name: t('french'),
            flag: '/assets/icons/fr.svg',
            fallback: 'FR'
        }
    ];

    // Get the opposite language (the one we'll switch to)
    const oppositeLanguage = languages.find(lang => lang.code !== locale) || languages[0];

    const handleLanguageChange = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Update the URL to the new locale
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === locale) {
            // Replace current locale with new one
            segments[0] = oppositeLanguage.code;
        } else {
            // Add new locale at the beginning
            segments.unshift(oppositeLanguage.code);
        }

        const newPath = '/' + segments.join('/');

        // Use router.push for client-side navigation
        router.push(newPath);

        // Reset animation state after navigation
        setTimeout(() => {
            setIsAnimating(false);
        }, 300);
    };

    const isMobile = variant === 'mobile';

    return (
        <button
            onClick={handleLanguageChange}
            disabled={isAnimating}
            className={cn(
                'flex items-center space-x-2 px-3 py-2 rounded-lg font-inter font-medium text-sm transition-smooth group',
                'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                isMobile && 'w-full justify-center',
                isAnimating && 'opacity-75'
            )}
            aria-label={`${t('ariaLabel')} - ${oppositeLanguage.name}`}
        >
            <span className="text-sm font-medium">
                {t('switchTo')}
            </span>
            <span className="text-xs opacity-75">→</span>
            <div className="flex items-center space-x-1">
                <Image
                    src={oppositeLanguage.flag}
                    alt={`${oppositeLanguage.name} flag`}
                    width={20}
                    height={15}
                    className="transition-transform group-hover:scale-110"
                />
            </div>
        </button>
    );
};

export default LanguageSwitcher;
