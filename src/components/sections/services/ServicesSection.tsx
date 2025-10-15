'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import CapabilityStats from './CapabilityStats';
import ProcessTimeline from './ProcessTimeline';
import ServiceCard from './ServiceCard';
import TechStack from './TechStack';

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeTab, setActiveTab] = useState('services');
  const locale = useLocale();
  const t = useTranslations('services');
  const tGlobal = useTranslations('global');

  // Services data using translations
  const services = [
    {
      icon: "Palette",
      title: t('sections.services.items.webDevelopment.title'),
      description: t('sections.services.items.webDevelopment.description'),
      level: "Expert",
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      capabilities: [
        t('sections.services.items.webDevelopment.features.0'),
        t('sections.services.items.webDevelopment.features.1'),
        t('sections.services.items.webDevelopment.features.2'),
        t('sections.services.items.webDevelopment.features.3'),
        t('sections.services.items.webDevelopment.features.4')
      ],
      certifications: ["AWS Solutions Architect", "React Professional"],
      caseStudy: {
        title: "E-commerce Platform Rebuild",
        preview: "Complete platform migration resulting in 50% faster load times and 25% increase in conversion rates."
      }
    },
    {
      icon: "Brain",
      title: t('sections.services.items.automation.title'),
      description: t('sections.services.items.automation.description'),
      level: "Advanced",
      technologies: ["OpenAI", "LangChain", "n8n", "Zapier"],
      capabilities: [
        t('sections.services.items.automation.features.0'),
        t('sections.services.items.automation.features.1'),
        t('sections.services.items.automation.features.2'),
        t('sections.services.items.automation.features.3'),
        t('sections.services.items.automation.features.4')
      ],
      certifications: ["OpenAI API Specialist", "Google AI Certification"],
      caseStudy: {
        title: "Customer Service AI Assistant",
        preview: "Deployed intelligent chatbot reducing support tickets by 60% while maintaining 95% customer satisfaction."
      }
    },
    {
      icon: "Palette",
      title: t('sections.services.items.design.title'),
      description: t('sections.services.items.design.description'),
      level: "Expert",
      technologies: ["Figma", "Adobe Creative Suite", "Framer"],
      capabilities: [
        t('sections.services.items.design.features.0'),
        t('sections.services.items.design.features.1'),
        t('sections.services.items.design.features.2'),
        t('sections.services.items.design.features.3'),
        t('sections.services.items.design.features.4')
      ],
      certifications: ["Adobe Certified Expert", "Google UX Design"],
      caseStudy: {
        title: "Montreal Tech Startup Rebrand",
        preview: "Complete visual identity overhaul resulting in 300% increase in user engagement and successful Series A funding."
      }
    },
    {
      icon: "Zap",
      title: t('sections.services.items.consulting.title'),
      description: t('sections.services.items.consulting.description'),
      level: "Expert",
      technologies: ["Strategic Planning", "Process Analysis", "Training"],
      capabilities: [
        t('sections.services.items.consulting.features.0'),
        t('sections.services.items.consulting.features.1'),
        t('sections.services.items.consulting.features.2'),
        t('sections.services.items.consulting.features.3'),
        t('sections.services.items.consulting.features.4')
      ],
      certifications: ["Google Analytics Certified", "HubSpot Strategy"],
      caseStudy: {
        title: "SaaS Growth Strategy Implementation",
        preview: "Strategic overhaul leading to 200% increase in organic traffic and 150% improvement in lead generation."
      }
    }
  ];

  const handleCaseStudyClick = (caseStudy) => {
    // Mock case study modal or navigation
    console.log('Opening case study:', caseStudy?.title);
  };

  const tabs = [
    { id: 'services', label: t('sections.tabs.services'), icon: 'Briefcase' },
    { id: 'process', label: t('sections.tabs.process'), icon: 'GitBranch' },
    { id: 'tech', label: t('sections.tabs.tech'), icon: 'Code' },
    { id: 'stats', label: t('sections.tabs.stats'), icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
              <Icon name="Sparkles" size={16} />
              <span>{t('sections.hero.badge')}</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground mb-6 leading-tight">
              {t('sections.hero.title')}
              <span className="block text-primary text-glow">{t('sections.hero.titleHighlight')}</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              {t('sections.hero.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="glow-neon hover:glow-neon-active"
              >
                {t('sections.hero.buttons.startProject')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                {t('sections.hero.buttons.watchVideo')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeTab === tab?.id
                    ? 'bg-primary text-black glow-neon' : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Dynamic Content Based on Active Tab */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  {t('sections.services.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('sections.services.description')}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    index={index}
                    onHover={setHoveredService}
                    isHovered={hoveredService === index}
                    onCaseStudyClick={handleCaseStudyClick}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  {t('sections.process.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('sections.process.description')}
                </p>
              </div>

              <ProcessTimeline />
            </motion.div>
          )}

          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  {t('sections.tech.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('sections.tech.description')}
                </p>
              </div>

              <TechStack />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  {t('sections.stats.title')}
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {t('sections.stats.description')}
                </p>
              </div>

              <CapabilityStats />

              {/* Additional Experience Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16 bg-card/50 rounded-xl p-8 border border-border"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-4">
                    Industry Recognition & Expertise
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="Award" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Industry Awards</h4>
                    <p className="text-sm text-muted-foreground">
                      Recognized for excellence in web design and development by leading industry organizations.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="Users" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Community Leader</h4>
                    <p className="text-sm text-muted-foreground">
                      Active contributor to Montreal's tech community through mentoring and knowledge sharing.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="BookOpen" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Continuous Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Constantly evolving skills to stay ahead of emerging technologies and industry trends.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 lg:p-12 text-center border border-primary/20 glow-neon"
          >
            <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              {t('sections.cta.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {t('sections.cta.description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="glow-neon hover:glow-neon-active"
              >
                {t('sections.cta.buttons.startProject')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
              >
                {t('sections.cta.buttons.scheduleConsultation')}
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>{t('sections.cta.features.freeConsultation')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>{t('sections.cta.features.satisfactionGuarantee')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
