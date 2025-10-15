'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const HomeCapabilities = () => {
  const t = useTranslations('home.capabilities');

  const capabilities = [
    {
      icon: 'Globe',
      title: t('items.webDesign.title'),
      description: t('items.webDesign.description'),
    },
    {
      icon: 'Workflow',
      title: t('items.automation.title'),
      description: t('items.automation.description'),
    },
    {
      icon: 'Palette',
      title: t('items.brandStrategy.title'),
      description: t('items.brandStrategy.description'),
    },
  ];

  const loopTransition = {
    duration: 6,
    ease: 'easeInOut' as const,
    repeat: Infinity,
    repeatType: 'loop' as const,
  };

  return (
    <section className="relative py-20 px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
            <Icon name="Sparkles" size={16} />
            <span>{t('title')}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
            {t('subtitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm overflow-hidden"
            >
              {/* Animated gradient wash on hover */}
              <motion.div
                className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
                animate={{}}
              >
                <motion.div
                  className="absolute -inset-20 bg-[conic-gradient(var(--color-primary)_0deg,transparent_120deg)] opacity-30"
                  animate={{ rotate: [0, 360] }}
                  transition={{ ...loopTransition, duration: 12 }}
                />
              </motion.div>

              <div className="relative p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-neon">
                    <motion.div
                      animate={{ rotate: [0, 10, 0, -10, 0] }}
                      transition={{ ...loopTransition, duration: 8 }}
                    >
                      <Icon name={item.icon} size={24} className="text-primary" />
                    </motion.div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground">{item.description}</p>

                <div className="mt-2 flex items-center text-sm text-primary/80">
                  <span className="font-medium">{t('cta')}</span>
                  <Icon name="ArrowRight" size={16} className="ml-1 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCapabilities;
