'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import Button from 'components/ui/Button';
import Icon from 'components/AppIcon';

const statsOrder = ['experience', 'projects', 'hoursSaved'] as const;

const HeroContent = () => {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const textVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: shouldReduceMotion ? 0.1 : 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const glowVariants = {
    animate: shouldReduceMotion ? {} : {
      textShadow: [
        '0 0 7px rgba(0, 255, 209, 0.35)',
        '0 0 14px rgba(0, 255, 209, 0.56)',
        '0 0 7px rgba(0, 255, 209, 0.35)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const stats = statsOrder.map((key) => ({
    key,
    value: t(`stats.${key}.value`),
    label: t(`stats.${key}.label`),
    icon: key === 'experience' ? 'Calendar' : key === 'projects' ? 'Briefcase' : 'Clock',
  }));

  const primaryHref = `/${locale}/portfolio`;
  const secondaryHref = `/${locale}/contact`;

  return (
    <div className="relative z-10">
      <motion.div
        className="mb-6 md:mb-8"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={0}
      >
        <motion.h1
          className="mb-4 font-space-grotesk text-3xl font-bold text-foreground sm:text-4xl md:text-6xl lg:text-7xl"
          style={{ lineHeight: 0.9 }}
          variants={glowVariants}
          animate="animate"
        >
          <span className="block">{t('titleDesign')}</span>
          <span className="block text-primary relative">
            {t('titleAutomate')}
            <span className="absolute bottom-0 left-0 h-1 w-full rounded-full bg-gradient-to-r from-primary via-primary/80 to-primary/50"></span>
          </span>
          <span className="block">
            {t('titleElevate')}
          </span>
        </motion.h1>
      </motion.div>

      <motion.h2
        className="mb-4 font-space-grotesk text-base font-medium text-primary sm:text-lg md:mb-6 md:text-2xl lg:text-3xl"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={1}
      >
        {t('subtitle')}
      </motion.h2>

      <motion.p
        className="mb-6 max-w-2xl font-inter text-sm leading-relaxed text-muted-foreground sm:text-base md:mb-10 md:max-w-3xl md:text-lg lg:max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={2}
      >
        {t('description')}
      </motion.p>

      <motion.div
        className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={3}
      >
        <Button
          asChild
          variant="default"
          size="lg"
          className="btn-primary-hover glow-neon transition-smooth magnetic-hover"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={20}
          aria-label={t('ctaPrimary')}
        >
          <Link href={primaryHref}>{t('ctaPrimary')}</Link>
        </Button>

        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-primary/30 text-primary transition-smooth hover:bg-primary/10 magnetic-hover focus:ring-2 focus:ring-primary focus:ring-offset-2"
          iconName="Calendar"
          iconPosition="left"
          iconSize={18}
          aria-label={t('ctaSecondary')}
        >
          <Link href={secondaryHref}>{t('ctaSecondary')}</Link>
        </Button>
      </motion.div>


      {/* Stats moved below CTAs to improve layout and responsiveness */}
      <motion.div
        className="mt-8 flex items-center justify-center gap-6 sm:gap-8"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={5}
      >
        {stats.map((stat, index) => (
          <div key={stat.key} className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-2"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Icon
                name={stat.icon as any}
                size={16}
                className="text-primary"
                aria-hidden={true}
              />
              <div className="flex flex-col">
                <div className="font-space-grotesk text-lg font-bold text-primary sm:text-xl">
                  {stat.value}
                </div>
                <div className="font-inter text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </motion.div>
            {index < stats.length - 1 && (
              <div className="h-4 w-px bg-white/6" aria-hidden="true"></div>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroContent;
