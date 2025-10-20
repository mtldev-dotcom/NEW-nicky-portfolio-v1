'use client';

import { useMemo, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import FeaturedProject from './FeaturedProject';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import dynamic from 'next/dynamic';

const ProjectModal = dynamic(() => import('./ProjectModal'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">Loading...</div>
}) as React.ComponentType<{
  project: any;
  isOpen: boolean;
  onClose: () => void;
}>;


const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const locale = useLocale();
  const t = useTranslations('portfolio');
  const tGlobal = useTranslations('global');

  // Helper function to safely get array translations using indexed notation
  const getArrayTranslation = useCallback((key: string): string[] => {
    const array: string[] = [];
    let index = 0;
    // Iterate up to 6 items (typical feature list length)
    // Note: next-intl will log missing key errors to console even when caught
    while (index < 6) {
      try {
        // @ts-ignore - Suppress type error for dynamic key
        const value = t(`${key}.${index}` as any);
        array.push(value);
        index++;
      } catch (error) {
        // Stop iteration when key doesn't exist
        break;
      }
    }
    return array;
  }, [t]);

  // Helper function to get process steps using indexed notation
  const getProcessSteps = useCallback((key: string): Array<{ title: string, description: string }> => {
    const array: Array<{ title: string, description: string }> = [];
    let index = 0;
    // Iterate up to 4 items (most projects have exactly 4 process steps)
    // Note: next-intl will log missing key errors to console even when caught
    while (index < 4) {
      try {
        // @ts-ignore - Suppress type error for dynamic key
        const title = t(`${key}.${index}.title` as any);
        // @ts-ignore - Suppress type error for dynamic key
        const description = t(`${key}.${index}.description` as any);
        array.push({ title, description });
        index++;
      } catch (error) {
        // Stop iteration when key doesn't exist
        break;
      }
    }
    return array;
  }, [t]);

  // Helper function to get testimonial object using dot notation
  const getTestimonial = useCallback((key: string): { quote: string, author: string, role: string } => {
    try {
      // @ts-ignore - Suppress type error for dynamic key
      const quote = t(`${key}.quote` as any);
      // @ts-ignore - Suppress type error for dynamic key
      const author = t(`${key}.author` as any);
      // @ts-ignore - Suppress type error for dynamic key
      const role = t(`${key}.role` as any);
      return { quote, author, role };
    } catch (error) {
      return { quote: '', author: '', role: '' };
    }
  }, [t]);

  // Project data from translations
  const projects = useMemo(() => ([
    {
      id: 1,
      title: t('projects.aiaa.title'),
      type: t('projects.aiaa.type'),
      description: t('projects.aiaa.description'),
      fullDescription: t('projects.aiaa.fullDescription'),
      image: t('projects.aiaa.image'),
      expertiseBadges: [
        t('projects.aiaa.expertiseBadges.badge1'),
        t('projects.aiaa.expertiseBadges.badge2')
      ].filter(Boolean),
      technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "AWS"],
      techIcons: {
        "React": "Code",
        "Node.js": "Server",
        "Python": "Bot",
        "TensorFlow": "Brain",
        "MongoDB": "Database",
        "AWS": "Cloud"
      },
      year: "2024",
      client: t('projects.aiaa.client'),
      industry: t('projects.aiaa.industry'),
      duration: t('projects.aiaa.duration'),
      featured: true,
      metrics: [
        { label: t('projects.aiaa.metrics.users.label'), value: t('projects.aiaa.metrics.users.value') },
        { label: t('projects.aiaa.metrics.automation.label'), value: t('projects.aiaa.metrics.automation.value') },
        { label: t('projects.aiaa.metrics.timeSaved.label'), value: t('projects.aiaa.metrics.timeSaved.value') }
      ],
      features: getArrayTranslation('projects.aiaa.features'),
      process: getProcessSteps('projects.aiaa.process'),
      testimonial: getTestimonial('projects.aiaa.testimonial'),
      liveUrl: "https://aiaa.dev",
      githubUrl: "https://github.com/nickybruno/aiaa"
    },
    {
      id: 2,
      title: t('projects.montrealTechHub.title'),
      type: t('projects.montrealTechHub.type'),
      description: t('projects.montrealTechHub.description'),
      fullDescription: t('projects.montrealTechHub.fullDescription'),
      image: t('projects.montrealTechHub.image'),
      expertiseBadges: [
        t('projects.montrealTechHub.expertiseBadges.badge1')
      ].filter(Boolean),
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
      techIcons: {
        "Next.js": "Code",
        "TypeScript": "FileText",
        "Prisma": "Database",
        "PostgreSQL": "Server",
        "Tailwind": "Palette"
      },
      year: "2024",
      client: t('projects.montrealTechHub.client'),
      industry: t('projects.montrealTechHub.industry'),
      duration: t('projects.montrealTechHub.duration'),
      featured: false,
      metrics: [
        { label: t('projects.montrealTechHub.metrics.members.label'), value: t('projects.montrealTechHub.metrics.members.value') },
        { label: t('projects.montrealTechHub.metrics.events.label'), value: t('projects.montrealTechHub.metrics.events.value') },
        { label: t('projects.montrealTechHub.metrics.engagement.label'), value: t('projects.montrealTechHub.metrics.engagement.value') }
      ],
      features: getArrayTranslation('projects.montrealTechHub.features'),
      process: getProcessSteps('projects.montrealTechHub.process'),
      testimonial: getTestimonial('projects.montrealTechHub.testimonial'),
      liveUrl: "https://montrealtechhub.com"
    },
    {
      id: 3,
      title: t('projects.ecoTrack.title'),
      type: t('projects.ecoTrack.type'),
      description: t('projects.ecoTrack.description'),
      fullDescription: t('projects.ecoTrack.fullDescription'),
      image: t('projects.ecoTrack.image'),
      expertiseBadges: [
        t('projects.ecoTrack.expertiseBadges.badge1')
      ].filter(Boolean),
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "InfluxDB"],
      techIcons: {
        "Vue.js": "Code",
        "D3.js": "BarChart",
        "Python": "Bot",
        "FastAPI": "Zap",
        "InfluxDB": "Database"
      },
      year: "2023",
      client: t('projects.ecoTrack.client'),
      industry: t('projects.ecoTrack.industry'),
      duration: t('projects.ecoTrack.duration'),
      featured: false,
      metrics: [
        { label: t('projects.ecoTrack.metrics.co2Reduced.label'), value: t('projects.ecoTrack.metrics.co2Reduced.value') },
        { label: t('projects.ecoTrack.metrics.companies.label'), value: t('projects.ecoTrack.metrics.companies.value') },
        { label: t('projects.ecoTrack.metrics.dataPoints.label'), value: t('projects.ecoTrack.metrics.dataPoints.value') }
      ],
      features: getArrayTranslation('projects.ecoTrack.features'),
      process: getProcessSteps('projects.ecoTrack.process'),
      testimonial: getTestimonial('projects.ecoTrack.testimonial')
    },
    {
      id: 4,
      title: t('projects.financeFlow.title'),
      type: t('projects.financeFlow.type'),
      description: t('projects.financeFlow.description'),
      fullDescription: t('projects.financeFlow.fullDescription'),
      image: t('projects.financeFlow.image'),
      expertiseBadges: [
        t('projects.financeFlow.expertiseBadges.badge1')
      ].filter(Boolean),
      technologies: ["React Native", "Redux", "Node.js", "PostgreSQL", "Stripe"],
      techIcons: {
        "React Native": "Smartphone",
        "Redux": "RefreshCw",
        "Node.js": "Server",
        "PostgreSQL": "Database",
        "Stripe": "CreditCard"
      },
      year: "2023",
      client: t('projects.financeFlow.client'),
      industry: t('projects.financeFlow.industry'),
      duration: t('projects.financeFlow.duration'),
      featured: false,
      metrics: [
        { label: t('projects.financeFlow.metrics.downloads.label'), value: t('projects.financeFlow.metrics.downloads.value') },
        { label: t('projects.financeFlow.metrics.savings.label'), value: t('projects.financeFlow.metrics.savings.value') },
        { label: t('projects.financeFlow.metrics.rating.label'), value: t('projects.financeFlow.metrics.rating.value') }
      ],
      features: getArrayTranslation('projects.financeFlow.features'),
      process: getProcessSteps('projects.financeFlow.process'),
      testimonial: getTestimonial('projects.financeFlow.testimonial')
    },
    {
      id: 5,
      title: t('projects.creativeStudio.title'),
      type: t('projects.creativeStudio.type'),
      description: t('projects.creativeStudio.description'),
      fullDescription: t('projects.creativeStudio.fullDescription'),
      image: t('projects.creativeStudio.image'),
      expertiseBadges: [
        t('projects.creativeStudio.expertiseBadges.badge1'),
        t('projects.creativeStudio.expertiseBadges.badge2')
      ].filter(Boolean),
      technologies: ["React", "WebGL", "Socket.io", "Redis", "AWS S3"],
      techIcons: {
        "React": "Code",
        "WebGL": "Monitor",
        "Socket.io": "Wifi",
        "Redis": "Zap",
        "AWS S3": "Cloud"
      },
      year: "2024",
      client: t('projects.creativeStudio.client'),
      industry: t('projects.creativeStudio.industry'),
      duration: t('projects.creativeStudio.duration'),
      featured: false,
      metrics: [
        { label: t('projects.creativeStudio.metrics.teams.label'), value: t('projects.creativeStudio.metrics.teams.value') },
        { label: t('projects.creativeStudio.metrics.projects.label'), value: t('projects.creativeStudio.metrics.projects.value') },
        { label: t('projects.creativeStudio.metrics.efficiency.label'), value: t('projects.creativeStudio.metrics.efficiency.value') }
      ],
      features: getArrayTranslation('projects.creativeStudio.features'),
      process: getProcessSteps('projects.creativeStudio.process'),
      testimonial: getTestimonial('projects.creativeStudio.testimonial')
    },
    {
      id: 6,
      title: t('projects.healthConnect.title'),
      type: t('projects.healthConnect.type'),
      description: t('projects.healthConnect.description'),
      fullDescription: t('projects.healthConnect.fullDescription'),
      image: t('projects.healthConnect.image'),
      expertiseBadges: [
        t('projects.healthConnect.expertiseBadges.badge1')
      ].filter(Boolean),
      technologies: ["Angular", "WebRTC", "Express.js", "MongoDB", "Stripe"],
      techIcons: {
        "Angular": "Code",
        "WebRTC": "Video",
        "Express.js": "Server",
        "MongoDB": "Database",
        "Stripe": "CreditCard"
      },
      year: "2023",
      client: t('projects.healthConnect.client'),
      industry: t('projects.healthConnect.industry'),
      duration: t('projects.healthConnect.duration'),
      featured: false,
      metrics: [
        { label: t('projects.healthConnect.metrics.consultations.label'), value: t('projects.healthConnect.metrics.consultations.value') },
        { label: t('projects.healthConnect.metrics.providers.label'), value: t('projects.healthConnect.metrics.providers.value') },
        { label: t('projects.healthConnect.metrics.satisfaction.label'), value: t('projects.healthConnect.metrics.satisfaction.value') }
      ],
      features: getArrayTranslation('projects.healthConnect.features'),
      process: getProcessSteps('projects.healthConnect.process'),
      testimonial: getTestimonial('projects.healthConnect.testimonial')
    }
  ]), [t, getArrayTranslation, getProcessSteps, getTestimonial]);

  // Filter configuration
  const filters = [
    { id: 'all', label: t('sections.filters.all'), count: projects?.length },
    { id: 'AI Platform', label: t('sections.filters.ai'), count: projects?.filter(p => p?.type === 'AI Platform')?.length },
    { id: 'Web Platform', label: t('sections.filters.web'), count: projects?.filter(p => p?.type === 'Web Platform')?.length },
    { id: 'Mobile App', label: t('sections.filters.mobile'), count: projects?.filter(p => p?.type === 'Mobile App')?.length },
    { id: 'Design Tool', label: t('sections.filters.design'), count: projects?.filter(p => p?.type === 'Design Tool')?.length },
    { id: 'Healthcare', label: t('sections.filters.healthcare'), count: projects?.filter(p => p?.type === 'Healthcare')?.length }
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects?.filter(project => project?.type === activeFilter);
  }, [activeFilter, projects]);

  // Featured project
  const featuredProject = projects?.find(p => p?.featured);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name="FolderOpen" size={24} className="text-primary" />
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/30">
                  {t('sections.hero.badge')}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground mb-6"
              >
                {t('sections.hero.title')}
                <span className="block text-primary">{t('sections.hero.titleHighlight')}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed mb-8"
              >
                {t('sections.hero.description')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={16} className="text-primary" />
                  <span>{t('sections.hero.stats.projects')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span>{t('sections.hero.stats.clients')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>{t('sections.hero.stats.recognition')}</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Icon name="Sparkles" size={24} className="text-primary" />
          </motion.div>

          <motion.div
            animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 right-10 w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Icon name="Zap" size={20} className="text-warning" />
          </motion.div>
        </section>

        {/* Featured Project */}
        {featuredProject && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <FeaturedProject
                project={featuredProject}
                onViewDetails={handleViewDetails}
              />
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                {t('sections.projects.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('sections.projects.description')}
              </p>
            </div>

            {/* Filter Buttons */}
            <ProjectFilter
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects?.filter(project => !project?.featured)?.map((project, index) => (
                <ProjectCard
                  key={project?.id}
                  project={project}
                  index={index}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects?.filter(p => !p?.featured)?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                  {t('sections.projects.emptyState.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('sections.projects.emptyState.description')}
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-muted/30 via-transparent to-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-6">
                {t('sections.cta.title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {t('sections.cta.description')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="glow-neon hover:glow-neon-active"
                  >
                    {t('sections.cta.buttons.startProject')}
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                  >
                    {t('sections.cta.buttons.downloadPortfolio')}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioSection;
