'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal = memo(({ project, isOpen, onClose }: ProjectModalProps) => {
  const t = useTranslations('portfolio');
  const [activeTab, setActiveTab] = useState('overview');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }
    },
  };

  const tabVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(26, 26, 26, 0.5)" },
    active: {
      scale: 1.02,
      backgroundColor: "rgba(0, 255, 209, 0.1)",
      borderColor: "rgba(0, 255, 209, 0.3)",
      transition: { duration: 0.3 }
    },
  };

  const tabs = [
    { key: 'overview', label: t('tabs.overview'), icon: 'FileText' },
    { key: 'process', label: t('tabs.process'), icon: 'Workflow' },
    { key: 'results', label: t('tabs.results'), icon: 'BarChart' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                {t('projectOverview')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {project?.fullDescription}
              </p>
            </motion.div>

            {project?.challenges && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                  {t('challenges')}
                </h3>
                <ul className="space-y-2">
                  {project?.challenges?.map((challenge, index) => (
                    <motion.li
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon name="AlertTriangle" size={16} className="text-warning mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{challenge}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project?.testimonial && (
              <motion.div
                className="bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-xl p-6 border border-primary/20 glass-panel"
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start space-x-4">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                  >
                    <Icon name="Quote" size={24} className="text-primary flex-shrink-0 mt-1" />
                  </motion.div>
                  <div>
                    <p className="text-foreground italic mb-3 text-lg">
                      "{project?.testimonial?.quote}"
                    </p>
                    <div className="flex items-center space-x-3">
                      <motion.div
                        className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <span className="text-primary text-sm font-bold">
                          {project?.testimonial?.author?.charAt(0)}
                        </span>
                      </motion.div>
                      <div>
                        <div className="font-medium text-foreground">
                          {project?.testimonial?.author}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {project?.testimonial?.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 'process':
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                {t('howItWasMade')}
              </h3>
              <div className="space-y-4">
                {project?.process?.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex space-x-4 group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <motion.div
                      className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:bg-primary/30 transition-smooth"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-primary text-sm font-bold">{index + 1}</span>
                    </motion.div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                        {step?.title}
                      </h4>
                      <p className="text-muted-foreground text-sm">{step?.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {project?.technologies && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                  {t('technologiesUsed')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech, index) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30 glow-neon"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 'results':
        return (
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                {t('resultsImpact')}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {project?.metrics?.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-muted/30 rounded-lg p-4 text-center group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="text-2xl font-bold text-primary mb-1"
                      whileHover={{ scale: 1.1 }}
                    >
                      {metric?.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">{metric?.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {project?.impact && (
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                  {t('businessImpact')}
                </h3>
                <div className="space-y-3">
                  {project?.impact?.map((impact, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Icon name="CheckCircle" size={16} className="text-primary mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground text-sm">{impact}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-2xl border border-border/50 z-50 overflow-hidden glass-panel"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between p-6 border-b border-border/30"
                variants={itemVariants}
              >
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Icon name="Folder" size={24} className="text-primary" />
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
                      {project?.title}
                    </h2>
                    <p className="text-muted-foreground">{project?.type} • {project?.year}</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="hover:bg-muted/50"
                  >
                    <Icon name="X" size={24} />
                  </Button>
                </motion.div>
              </motion.div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Project Image */}
                  <motion.div
                    className="relative h-80 rounded-xl overflow-hidden"
                    variants={itemVariants}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isImageLoaded ? 1 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Image
                        src={project?.image}
                        alt={project?.title}
                        className="w-full h-full object-cover"
                        onLoad={() => setIsImageLoaded(true)}
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                    {/* Loading placeholder */}
                    {!isImageLoaded && (
                      <div className="absolute inset-0 bg-muted/20 animate-pulse flex items-center justify-center">
                        <Icon name="Image" size={48} className="text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Tab Navigation */}
                      <motion.div
                        className="flex space-x-2"
                        variants={itemVariants}
                      >
                        {tabs.map((tab) => (
                          <motion.button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-smooth ${activeTab === tab.key
                              ? 'bg-primary/10 border-primary/30 text-primary'
                              : 'bg-card/50 border-border/50 text-muted-foreground hover:border-primary/20 hover:text-foreground'
                              }`}
                            variants={tabVariants}
                            animate={activeTab === tab.key ? "active" : "inactive"}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Icon name={tab.icon} size={16} />
                            <span className="text-sm font-medium">{tab.label}</span>
                          </motion.button>
                        ))}
                      </motion.div>

                      {/* Tab Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          {renderTabContent()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Sidebar */}
                    <motion.div
                      className="space-y-6"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Project Details */}
                      <motion.div
                        className="bg-muted/30 rounded-xl p-6 border border-border/30 glass-panel"
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                      >
                        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-4">
                          {t('projectDetails')}
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">{t('client')}</div>
                            <div className="text-foreground font-medium">{project?.client}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">{t('duration')}</div>
                            <div className="text-foreground font-medium">{project?.duration}</div>
                          </div>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">{t('industry')}</div>
                            <div className="text-foreground font-medium">{project?.industry}</div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Actions */}
                      <motion.div
                        className="space-y-3"
                        variants={itemVariants}
                      >
                        {project?.liveUrl && (
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Button
                              variant="default"
                              fullWidth
                              iconName="ExternalLink"
                              iconPosition="right"
                              className="glow-neon"
                            >
                              {t('viewLiveSite')}
                            </Button>
                          </motion.div>
                        )}
                        {project?.githubUrl && (
                          <motion.div whileHover={{ scale: 1.02 }}>
                            <Button
                              variant="outline"
                              fullWidth
                              iconName="Github"
                              iconPosition="left"
                            >
                              {t('viewCode')}
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
});

ProjectModal.displayName = 'ProjectModal';

export default ProjectModal;
