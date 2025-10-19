'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import dynamic from 'next/dynamic';

const TestimonialCarousel = dynamic(() => import('components/sections/testimonials/TestimonialCarousel'), {
  ssr: false,
  loading: () => <div className="h-64 flex items-center justify-center">Loading...</div>
}) as React.ComponentType<{
  testimonials: Array<{
    id: number;
    name: string;
    role: string;
    company: string;
    avatar: string;
    companyLogo: string;
    content: string;
    rating: number;
    projectType: string;
  }>;
  autoPlay?: boolean;
  interval?: number;
}>;

const HomeTestimonials = () => {
  const t = useTranslations('home.testimonials');
  const tStats = useTranslations('home.hero.stats');

  const stats = [
    { key: 'experience', value: tStats('experience.value'), label: tStats('experience.label'), icon: 'Award' },
    { key: 'projects', value: tStats('projects.value'), label: tStats('projects.label'), icon: 'FolderOpen' },
    { key: 'hoursSaved', value: tStats('hoursSaved.value'), label: tStats('hoursSaved.label'), icon: 'Clock' },
  ];

  const testimonials = [
    {
      id: 101,
      name: t('items.0.name'),
      role: t('items.0.role'),
      company: t('items.0.company'),
      avatar: '/assets/images/profil-pic.webp',
      companyLogo: t('items.0.companyLogo'),
      content: t('items.0.content'),
      rating: 5,
      projectType: t('items.0.projectType'),
    },
    {
      id: 102,
      name: t('items.1.name'),
      role: t('items.1.role'),
      company: t('items.1.company'),
      avatar: '/assets/images/profil-pic.webp',
      companyLogo: t('items.1.companyLogo'),
      content: t('items.1.content'),
      rating: 5,
      projectType: t('items.1.projectType'),
    },
    {
      id: 103,
      name: t('items.2.name'),
      role: t('items.2.role'),
      company: t('items.2.company'),
      avatar: '/assets/images/profil-pic.webp',
      companyLogo: t('items.2.companyLogo'),
      content: t('items.2.content'),
      rating: 5,
      projectType: t('items.2.projectType'),
    },
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
            <span>{t('badge')}</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subheading')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <TestimonialCarousel testimonials={testimonials} autoPlay interval={7000} />
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonials;
