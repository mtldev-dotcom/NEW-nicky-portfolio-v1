'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Icon from '../AppIcon';
import { cn } from '@/utils/cn';

interface LanguageSwitcherProps {
    className?: string;
    variant?: 'desktop' | 'mobile';
}

const LanguageSwitcher = ({ className, variant = 'desktop' }: LanguageSwitcherProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('global.languageSwitcher');

    const languages = [
        { code: 'en', name: t('english'), flag: '🇺🇸' },
        { code: 'fr', name: t('french'), flag: '🇫🇷' }
    ];

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Close dropdown on escape key
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);

    const handleLanguageChange = (newLocale: string) => {
        if (newLocale === locale) {
            setIsOpen(false);
            return;
        }

        setIsAnimating(true);

        // Update the URL to the new locale
        const segments = pathname.split('/').filter(Boolean);
        if (segments[0] === locale) {
            // Replace current locale with new one
            segments[0] = newLocale;
        } else {
            // Add new locale at the beginning
            segments.unshift(newLocale);
        }

        const newPath = '/' + segments.join('/');

        // Use router.push for client-side navigation
        router.push(newPath);

        // Close dropdown after a short delay
        setTimeout(() => {
            setIsOpen(false);
            setIsAnimating(false);
        }, 150);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const isMobile = variant === 'mobile';

    return (
        <div className={cn('relative', className)}>
            {/* Language Switcher Button */}
            <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className={cn(
                    'flex items-center space-x-2 px-3 py-2 rounded-lg font-inter font-medium text-sm transition-smooth group',
                    'text-muted-foreground hover:text-foreground hover:bg-muted/50',
                    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 focus:ring-offset-background',
                    isMobile && 'w-full justify-between',
                    isOpen && 'text-foreground bg-muted/50'
                )}
                aria-label={t('ariaLabel')}
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="flex items-center space-x-2">
                    <span className="text-base" role="img" aria-label={`${currentLanguage.name} flag`}>
                        {currentLanguage.flag}
                    </span>
                    <span className="hidden sm:inline">
                        {currentLanguage.name}
                    </span>
                    <span className="sm:hidden uppercase text-xs font-mono">
                        {currentLanguage.code}
                    </span>
                </div>

                <Icon
                    name="ChevronDown"
                    size={14}
                    className={cn(
                        'transition-smooth',
                        isOpen && 'rotate-180'
                    )}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    ref={dropdownRef}
                    className={cn(
                        'absolute right-0 mt-2 w-48 bg-background border border-border/50 rounded-lg shadow-lg z-50',
                        'backdrop-blur-md bg-background/95',
                        'animate-in slide-in-from-top-2 duration-200'
                    )}
                    role="menu"
                    aria-orientation="vertical"
                >
                    <div className="py-2">
                        {languages.map((language) => {
                            const isActive = language.code === locale;
                            const isDisabled = isAnimating;

                            return (
                                <button
                                    key={language.code}
                                    onClick={() => handleLanguageChange(language.code)}
                                    disabled={isDisabled}
                                    className={cn(
                                        'w-full flex items-center space-x-3 px-4 py-3 text-left font-inter text-sm transition-smooth',
                                        'hover:bg-muted/50 focus:outline-none focus:bg-muted/50',
                                        isActive
                                            ? 'text-primary bg-primary/10'
                                            : 'text-foreground',
                                        isDisabled && 'opacity-50 cursor-not-allowed'
                                    )}
                                    role="menuitem"
                                    aria-current={isActive ? 'true' : 'false'}
                                >
                                    <span className="text-base" role="img" aria-label={`${language.name} flag`}>
                                        {language.flag}
                                    </span>
                                    <div className="flex-1">
                                        <div className="font-medium">{language.name}</div>
                                        <div className="text-xs text-muted-foreground uppercase font-mono">
                                            {language.code}
                                        </div>
                                    </div>
                                    {isActive && (
                                        <Icon
                                            name="Check"
                                            size={16}
                                            className="text-primary"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Footer with current language info */}
                    <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
                        <div className="text-xs text-muted-foreground">
                            {t('current')}: <span className="font-medium text-foreground">{currentLanguage.name}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
