import React, { type FC } from "react";
import Image from "components/AppImage";
import Icon, { type IconName } from "components/AppIcon";
import { useTranslations } from 'next-intl';

const PersonalIntro: FC = () => {
  const t = useTranslations('about.sections.intro');
  const tGlobal = useTranslations('global');

  const attributes: Array<{ icon: IconName; label: string; desc: string }> = [
    { icon: "Brain", label: t('attributes.visionary.label'), desc: t('attributes.visionary.desc') },
    { icon: "Code2", label: t('attributes.technical.label'), desc: t('attributes.technical.desc') },
    { icon: "Heart", label: t('attributes.human.label'), desc: t('attributes.human.desc') },
    { icon: "Users", label: t('attributes.collaborative.label'), desc: t('attributes.collaborative.desc') },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <div className="relative order-2 lg:order-1">
        <div className="relative max-w-md mx-auto lg:max-w-none">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-1">
            <div className="relative overflow-hidden rounded-xl bg-card">
              <Image
                src="/assets/images/nicky-profile-img.png"
                alt={t('imageAlt')}
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />

              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 glow-neon">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-mono text-primary">{t('status')}</span>
                </div>
              </div>

              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 glow-neon">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-xs font-mono text-foreground">{t('location')}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-4 -left-4 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce">
            <Icon name="Code" size={20} className="text-primary" />
          </div>

          <div
            className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <Icon name="Palette" size={20} className="text-primary" />
          </div>

          <div
            className="absolute top-1/2 -right-6 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
        </div>
      </div>

      <div className="order-1 lg:order-2 space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-primary rounded-full" />
              <span className="text-sm font-mono text-primary uppercase tracking-wider">{t('badge')}</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground leading-tight">
              {t('title')}
              <span className="block text-primary text-glow">{t('titleHighlight')}</span>
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              {t('paragraph1')}
            </p>

            <p>
              {t('paragraph2')}
            </p>

            <p>
              {t('paragraph3')}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {attributes.map((attr) => (
            <div
              key={attr.label}
              className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-smooth group"
            >
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={attr.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-space-grotesk font-semibold text-foreground text-sm">{attr.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{attr.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center space-x-4 pt-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>{t('location')}</span>
          </div>
          <div className="w-1 h-1 bg-border rounded-full" />
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} className="text-primary" />
            <span>{t('globalImpact')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalIntro;
