'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import TestimonialCarousel from 'components/sections/testimonials/TestimonialCarousel';

const testimonials = [
  {
    id: 101,
    name: 'Sofia Ops Team',
    role: 'Operations',
    company: 'Sofia AI Desk',
    avatar: '/assets/images/profil_portrait.jpg',
    companyLogo: '',
    content: 'Nicky simplified our whole workflow — we saved hours every week.',
    rating: 5,
    projectType: 'AI Automation',
  },
  {
    id: 102,
    name: 'Alexandra Thompson',
    role: 'CEO',
    company: 'InnovateTech Solutions',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    companyLogo: '',
    content:
      "Nicky's blend of creative vision and technical expertise revolutionized our process. Results speak for themselves.",
    rating: 5,
    projectType: 'Platform Design',
  },
  {
    id: 103,
    name: 'Marcus Chen',
    role: 'Creative Director',
    company: 'Pixel Perfect Agency',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    companyLogo: '',
    content:
      'A creative partner who speaks fluent code. Elegant, performant solutions that matched our ambition.',
    rating: 5,
    projectType: 'Interactive Web',
  },
];

const HomeTestimonials = () => {
  const t = useTranslations('home.hero.stats');

  const stats = [
    { key: 'experience', value: t('experience.value'), label: t('experience.label'), icon: 'Award' },
    { key: 'projects', value: t('projects.value'), label: t('projects.label'), icon: 'FolderOpen' },
    { key: 'hoursSaved', value: t('hoursSaved.value'), label: t('hoursSaved.label'), icon: 'Clock' },
  ];

  return (
    <section id="testimonials" className="relative py-20 px-6 lg:px-8 bg-background">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
            <Icon name="MessageSquare" size={16} />
            <span>Testimonials</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
            Proof in real outcomes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Clear communication, reliable delivery, and measurable results for teams that move fast.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <TestimonialCarousel testimonials={testimonials} autoPlay interval={7000} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
          {stats.map((s, idx) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="flex items-center gap-4 p-4 rounded-xl border border-border/60 bg-card/50"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center glow-neon">
                <Icon name={s.icon as any} size={22} className="text-primary" />
              </div>
              <div>
                <div className="text-xl font-space-grotesk font-bold text-foreground">{s.value}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTestimonials;
