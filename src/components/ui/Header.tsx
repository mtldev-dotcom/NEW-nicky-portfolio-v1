'use client';

import { type FC, useEffect, useMemo, useState } from 'react';
import Link from 'next-intl/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import Button from './Button';
import Icon, { type IconName } from '../AppIcon';

type NavigationItem = {
  labelKey: string;
  path: string;
  icon: IconName;
};

const navigationItems: NavigationItem[] = [
  { labelKey: 'home', path: '/', icon: 'Home' },
  { labelKey: 'about', path: '/about-section', icon: 'User' },
  { labelKey: 'services', path: '/services-section', icon: 'Briefcase' },
  { labelKey: 'portfolio', path: '/portfolio-section', icon: 'FolderOpen' },
  { labelKey: 'testimonials', path: '/testimonials-section', icon: 'MessageSquare' },
  { labelKey: 'contact', path: '/contact-section', icon: 'Mail' },
];

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations('navigation');

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
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          isScrolled
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-6 lg:px-8">
            <Link
              href="/hero-experience"
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
                    href={item.path}
                    className={`relative px-4 py-2 rounded-lg font-inter font-medium text-sm transition-smooth group ${
                      active
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
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center space-x-4">
              <Button
                variant="default"
                size="sm"
                className="hidden md:flex glow-neon hover:glow-neon-active transition-smooth"
                iconName="Zap"
                iconPosition="left"
                iconSize={16}
              >
                {tNav('cta')}
              </Button>

              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/50 transition-smooth ${
            isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
          }`}
        >
          <nav className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => {
              const active = isActivePath(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-inter font-medium transition-smooth ${
                    active
                      ? 'text-primary bg-primary/10 glow-neon'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={item.icon} size={20} />
                  <span>{tNav(item.labelKey)}</span>
                </Link>
              );
            })}

            <div className="pt-4 border-t border-border/50">
              <Button
                variant="default"
                fullWidth
                className="glow-neon hover:glow-neon-active transition-smooth"
                iconName="Zap"
                iconPosition="left"
                iconSize={16}
                onClick={closeMobileMenu}
              >
                {tNav('cta')}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={closeMobileMenu} />
      )}
    </>
  );
};

export default Header;
