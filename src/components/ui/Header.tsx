'use client';

import { type FC, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';
import Icon, { type IconName } from '../AppIcon';

type NavigationItem = {
  labelKey: string;
  path: string;
  icon: IconName;
};

const navigationItems: NavigationItem[] = [
  { labelKey: 'home', path: '/', icon: 'Home' },
  { labelKey: 'about', path: '/about', icon: 'User' },
  { labelKey: 'services', path: '/services', icon: 'Briefcase' },
  { labelKey: 'showroom', path: '/showroom', icon: 'Eye' },
  { labelKey: 'contact', path: '/contact', icon: 'Mail' },
];

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolledOnce, setHasScrolledOnce] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations('global.navigation');

  const normalizedPathname = useMemo(() => {
    if (!pathname) return '/';
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) {
      return '/';
    }
    if (segments[0] === locale) {
      const rest = segments.slice(1);
      return rest.length > 0 ? `/${rest.join('/')}` : '/';
    }
    return pathname;
  }, [locale, pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      if (scrolled && !hasScrolledOnce) {
        setHasScrolledOnce(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledOnce]);

  const isActivePath = (path: string): boolean => {
    if (!normalizedPathname) return false;
    if (path === '/') {
      return normalizedPathname === '/' || normalizedPathname === '/hero-experience';
    }
    return normalizedPathname === path;
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    closeMobileMenu();
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: hasScrolledOnce ? 0 : -100, opacity: hasScrolledOnce ? 1 : 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
          : 'bg-transparent'
          }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <Link
              href={`/${locale}`}
              className="flex items-center space-x-3 group transition-smooth hover:scale-105"
              onClick={closeMobileMenu}
            >
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center glow-neon group-hover:glow-neon-active transition-smooth">
                  <span className="text-black font-space-grotesk font-bold text-lg">NB</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-space-grotesk font-bold text-foreground">
                  Nicky Bruno
                </h1>
                <p className="text-xs text-muted-foreground font-inter">Creative Technologist</p>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const active = isActivePath(item.path);
                return (
                  <Link
                    key={item.path}
                    href={item.path === '/' ? `/${locale}` : `/${locale}${item.path}`}
                    className={`relative px-4 py-2 rounded-lg font-inter font-medium text-sm transition-smooth group ${active
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                    onClick={closeMobileMenu}
                  >
                    <span className="relative z-10">{tNav(item.labelKey)}</span>
                    {active && (
                      <div className="absolute inset-0 bg-primary/5 rounded-lg glow-neon"></div>
                    )}
                    <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-smooth"></div>

                    {/* Active link underline animation */}
                    <motion.div
                      className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-primary to-primary/40"
                      initial={{ width: 0, x: '-50%' }}
                      animate={active ? { width: '80%', x: '-50%' } : { width: 0, x: '-50%' }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              {/* Language Switcher - Desktop */}
              <LanguageSwitcher
                variant="desktop"
                className="hidden lg:block"
              />

              <Button
                asChild
                variant="default"
                size="sm"
                className="hidden md:flex glow-neon hover:glow-neon-active transition-smooth magnetic-hover"
                iconName="Zap"
                iconPosition="left"
                iconSize={16}
              >
                <Link href={`/${locale}/contact`}>{tNav('cta')}</Link>
              </Button>

              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
                aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 overflow-hidden"
              id="mobile-menu"
              role="navigation"
              aria-label="Mobile navigation menu"
            >
              <nav className="px-6 py-4 space-y-2">
                {navigationItems.map((item, index) => {
                  const active = isActivePath(item.path);
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.path === '/' ? `/${locale}` : `/${locale}${item.path}`}
                        onClick={closeMobileMenu}
                        className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-smooth ${active
                          ? 'text-primary bg-primary/10 glow-neon'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                      >
                        <Icon name={item.icon} size={20} />
                        <span>{tNav(item.labelKey)}</span>
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="pt-4 border-t border-border/50 space-y-3">
                  {/* Language Switcher - Mobile */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navigationItems.length * 0.1 }}
                  >
                    <LanguageSwitcher
                      variant="mobile"
                      className="lg:hidden"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (navigationItems.length + 1) * 0.1 }}
                  >
                    <Button
                      asChild
                      variant="default"
                      fullWidth
                      className="glow-neon hover:glow-neon-active transition-smooth magnetic-hover"
                      iconName="Zap"
                      iconPosition="left"
                      iconSize={16}
                      onClick={closeMobileMenu}
                    >
                      <Link href={`/${locale}/contact`}>{tNav('cta')}</Link>
                    </Button>
                  </motion.div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeMobileMenu}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
