'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Icon from 'components/AppIcon';
import Button from './Button';
import Input from './Input';

const Footer = (): JSX.Element => {
  const t = useTranslations('global.footer');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="text-center">
            <h3 className="font-space-grotesk text-xl font-bold text-foreground mb-2">
              {t('newsletter.title')}
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              {t('newsletter.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1"
              />
              <Button variant="default" className="glow-neon hover:glow-neon-active">
                {t('newsletter.button')}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Services */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-foreground mb-4">
              {t('sections.services.title')}
            </h4>
            <ul className="space-y-2">
              {t.raw('sections.services.items').map((item: string, index: number) => (
                <li key={index}>
                  <Link
                    href={`/${locale}/services`}
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-foreground mb-4">
              {t('sections.company.title')}
            </h4>
            <ul className="space-y-2">
              {t.raw('sections.company.items').map((item: string, index: number) => {
                const paths = ['about', 'showroom', 'testimonials', 'contact'];
                return (
                  <li key={index}>
                    <Link
                      href={`/${locale}/${paths[index]}`}
                      className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-foreground mb-4">
              {t('sections.resources.title')}
            </h4>
            <ul className="space-y-2">
              {t.raw('sections.resources.items').map((item: string, index: number) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-space-grotesk font-semibold text-foreground mb-4">
              {t('contact.title')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={16} className="text-primary" />
                <a
                  href={`mailto:${t('contact.email')}`}
                  className="text-muted-foreground hover:text-primary transition-smooth text-sm"
                >
                  {t('contact.email')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-muted-foreground text-sm">
                  {t('contact.location')}
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                {t('contact.description')}
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <h5 className="font-space-grotesk font-medium text-foreground mb-3">
                {t('social.title')}
              </h5>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/nickybruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={t('social.linkedin')}
                >
                  <Icon name="Linkedin" size={20} />
                </a>
                <a
                  href="https://twitter.com/nickybruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={t('social.twitter')}
                >
                  <Icon name="Twitter" size={20} />
                </a>
                <a
                  href="https://github.com/nickybruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={t('social.github')}
                >
                  <Icon name="Github" size={20} />
                </a>
                <a
                  href="https://dribbble.com/nickybruno"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                  aria-label={t('social.dribbble')}
                >
                  <Icon name="Dribbble" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center glow-neon">
                <span className="text-black font-space-grotesk font-bold text-sm">NB</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {t('copyright')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t('madeWith')}
                </p>
              </div>
            </div>

            {/* Back to Top Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-muted-foreground hover:text-primary transition-smooth"
              iconName="ArrowUp"
              iconPosition="left"
              iconSize={16}
            >
              {t('backToTop')}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;