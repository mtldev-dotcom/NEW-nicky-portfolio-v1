'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import Button from 'components/ui/Button';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const t = useTranslations('portfolio');
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
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-2xl border border-border/50 z-50 overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border/30">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Icon name="Folder" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
                      {project?.title}
                    </h2>
                    <p className="text-muted-foreground">{project?.type} • {project?.year}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-muted/50"
                >
                  <Icon name="X" size={24} />
                </Button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6 space-y-8">
                  {/* Project Image */}
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <Image
                      src={project?.image}
                      alt={project?.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <div>
                        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                          {t('projectOverview')}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {project?.fullDescription}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-3">
                          {t('howItWasMade')}
                        </h3>
                        <div className="space-y-4">
                          {project?.process?.map((step, index) => (
                            <div key={index} className="flex space-x-4">
                              <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                <span className="text-primary text-sm font-bold">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium text-foreground mb-1">{step?.title}</h4>
                                <p className="text-muted-foreground text-sm">{step?.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Testimonial */}
                      {project?.testimonial && (
                        <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
                          <div className="flex items-start space-x-4">
                            <Icon name="Quote" size={24} className="text-primary flex-shrink-0 mt-1" />
                            <div>
                              <p className="text-foreground italic mb-3">
                                "{project?.testimonial?.quote}"
                              </p>
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                  <span className="text-primary text-sm font-bold">
                                    {project?.testimonial?.author?.charAt(0)}
                                  </span>
                                </div>
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
                        </div>
                      )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Project Details */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
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
                      </div>

                      {/* Technologies */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
                        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-4">
                          {t('technologiesUsed')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project?.technologies?.map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-muted/30 rounded-xl p-6 border border-border/30">
                        <h3 className="text-lg font-space-grotesk font-bold text-foreground mb-4">
                          {t('resultsImpact')}
                        </h3>
                        <div className="space-y-3">
                          {project?.metrics?.map((metric, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-muted-foreground text-sm">{metric?.label}</span>
                              <span className="text-primary font-bold">{metric?.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3">
                        {project?.liveUrl && (
                          <Button
                            variant="default"
                            fullWidth
                            iconName="ExternalLink"
                            iconPosition="right"
                            className="glow-neon"
                          >
                            {t('viewLiveSite')}
                          </Button>
                        )}
                        {project?.githubUrl && (
                          <Button
                            variant="outline"
                            fullWidth
                            iconName="Github"
                            iconPosition="left"
                          >
                            {t('viewCode')}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
