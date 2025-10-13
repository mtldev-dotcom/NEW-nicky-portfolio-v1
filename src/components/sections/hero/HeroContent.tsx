'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Button from 'components/ui/Button';

const statsOrder = ['experience', 'projects', 'hoursSaved'] as const;

const HeroContent = () => {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: 'easeOut',
      },
    }),
  };

  const glowVariants = {
    animate: {
      textShadow: [
        '0 0 10px rgba(0, 255, 209, 0.5)',
        '0 0 20px rgba(0, 255, 209, 0.8)',
        '0 0 10px rgba(0, 255, 209, 0.5)',
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
          className="mb-4 font-space-grotesk text-4xl font-bold leading-tight text-foreground md:text-6xl lg:text-7xl"
          variants={glowVariants}
          animate="animate"
        >
          {t('title')}
        </motion.h1>
        <motion.div
          className="h-1 w-24 rounded-full bg-gradient-to-r from-primary to-primary/50"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>

      <motion.h2
        className="mb-4 font-space-grotesk text-lg font-medium text-primary md:mb-6 md:text-2xl lg:text-3xl"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={1}
      >
        {t('subtitle')}
      </motion.h2>

      <motion.p
        className="mb-8 max-w-2xl font-inter text-base leading-relaxed text-muted-foreground md:mb-10 md:max-w-3xl md:text-lg lg:max-w-4xl"
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
          className="glow-neon transition-smooth hover:glow-neon-active magnetic-hover"
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
          className="border-primary/30 text-primary transition-smooth hover:bg-primary/10 magnetic-hover"
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
        className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={4}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.key}
            className="text-left"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="mb-1 font-space-grotesk text-2xl font-bold text-primary">
              {stat.value}
            </div>
            <div className="font-inter text-xs uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroContent;
