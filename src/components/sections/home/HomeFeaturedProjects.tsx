'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Icon from 'components/AppIcon';
import { useLocale } from 'next-intl';

type MiniProject = {
  title: string;
  slug: string;
  year: number;
  excerpt: string;
  theme: {
    background: string;
    foreground: string;
  };
};

const PROJECTS: MiniProject[] = [
  {
    title: 'Sofia AI Desk',
    slug: 'sofia-ai-desk',
    year: 2025,
    excerpt: 'Automated customer support with a clear dashboard — ~60% faster responses.',
    theme: {
      background: 'radial-gradient(circle at 25% 25%, rgba(102,255,0,0.8), rgba(12,12,12,0.95))',
      foreground: '#e9ffe5',
    },
  },
  {
    title: 'Next X Level',
    slug: 'next-x-level',
    year: 2024,
    excerpt: 'Bilingual e‑commerce with clean mobile UX and automated product updates.',
    theme: {
      background: 'linear-gradient(140deg, rgba(8,8,8,0.95), rgba(100,255,188,0.45))',
      foreground: '#f0fffa',
    },
  },
  {
    title: 'Lumicerra Labs',
    slug: 'lumicerra-labs',
    year: 2023,
    excerpt: 'Real‑time dashboard for smart LED lighting with clear energy insights.',
    theme: {
      background: 'linear-gradient(130deg, rgba(8,12,40,0.9), rgba(102,255,0,0.4))',
      foreground: '#e6f4ff',
    },
  },
];

const HomeFeaturedProjects = () => {
  const locale = useLocale();
  const portfolioHref = `/${locale}/portfolio`;

  return (
    <section className="relative py-20 px-6 lg:px-8 bg-background">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
            <Icon name="FolderOpen" size={16} />
            <span>Featured Projects</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
            Selected work that delivers results
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strategy, design, and engineering working together. Explore 3 outcomes below.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((p, idx) => (
            <motion.article
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative rounded-2xl overflow-hidden border border-border/60 bg-card/50 backdrop-blur-sm"
            >
              {/* Gradient motion layer */}
              <motion.div
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundImage: p.theme.background,
                  backgroundSize: '200% 200%',
                  filter: 'saturate(1.1)',
                }}
                initial={{ opacity: 0.25, backgroundPosition: '0% 0%' }}
                whileHover={{ opacity: 0.5, backgroundPosition: '100% 100%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Subtle mask to keep theme consistent */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />

              <div className="relative p-6 min-h-[260px] flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-black/40 border border-white/10 text-[--card-foreground]">
                      {p.year}
                    </span>
                    <span className="text-xs text-white/70">Case Study</span>
                  </div>
                  <h3
                    className="text-xl font-semibold"
                    style={{ color: p.theme.foreground }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-white/80">{p.excerpt}</p>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={portfolioHref}
                    className="inline-flex items-center gap-1 text-sm font-medium text-white/90 hover:text-white transition-smooth"
                  >
                    View project
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>

                  <div className="flex -space-x-2 opacity-80">
                    <div className="w-6 h-6 rounded-full bg-primary/80 border border-white/20" />
                    <div className="w-6 h-6 rounded-full bg-emerald-400/80 border border-white/20" />
                    <div className="w-6 h-6 rounded-full bg-cyan-400/80 border border-white/20" />
                  </div>
                </div>
              </div>

              {/* Hover ring effect */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-primary/40"
                whileHover={{ boxShadow: '0 0 0 2px rgba(0,255,209,0.35)' }}
              />
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={portfolioHref}
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Explore the full portfolio
            <Icon name="ArrowRight" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturedProjects;
