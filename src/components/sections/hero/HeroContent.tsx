'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Button from 'components/ui/Button';

const statsOrder = ['experience', 'projects', 'hoursSaved'] as const;

const HeroContent = () => {
  const t = useTranslations('home.hero');

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

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={0}
      >
        <motion.h1
          className="mb-4 text-4xl font-space-grotesk font-bold text-foreground md:text-6xl lg:text-7xl"
          variants={glowVariants}
          animate="animate"
        >
          {t('title')}
        </motion.h1>
        <motion.div
          className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-primary/50"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.5, duration: 1 }}
        />
      </motion.div>

      <motion.h2
        className="mb-6 text-xl font-space-grotesk font-medium text-primary md:text-2xl lg:text-3xl"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={1}
      >
        {t('subtitle')}
      </motion.h2>

      <motion.p
        className="mx-auto mb-12 max-w-2xl text-base font-inter leading-relaxed text-muted-foreground md:text-lg"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={2}
      >
        {t('description')}
      </motion.p>

      <motion.div
        className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={3}
      >
        <Button
          variant="default"
          size="lg"
          className="glow-neon hover:glow-neon-active transition-smooth magnetic-hover"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={20}
        >
          {t('ctaPrimary')}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="border-primary/30 text-primary hover:bg-primary/10 transition-smooth magnetic-hover"
          iconName="Calendar"
          iconPosition="left"
          iconSize={18}
        >
          {t('ctaSecondary')}
        </Button>
      </motion.div>

      <motion.div
        className="absolute bottom-20 left-0 right-0 hidden justify-center space-x-12 lg:flex"
        initial="hidden"
        animate="visible"
        variants={textVariants}
        custom={4}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.key}
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="mb-1 text-2xl font-space-grotesk font-bold text-primary">
              {stat.value}
            </div>
            <div className="text-xs font-inter uppercase tracking-wider text-muted-foreground">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default HeroContent;
