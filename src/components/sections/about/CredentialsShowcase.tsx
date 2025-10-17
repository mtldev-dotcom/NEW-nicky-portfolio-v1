'use client';

import React, { type FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Icon, { type IconName } from "components/AppIcon";

interface CertConfig {
  key: string;
  icon: IconName;
  color: string;
}

interface SpeakingConfig {
  key: string;
  icon: IconName;
}

interface PublicationConfig {
  key: string;
  icon: IconName;
}

interface OpenSourceConfig {
  key: string;
  icon: IconName;
}

const certConfigs: CertConfig[] = [
  { key: "aws", icon: "Cloud", color: "text-orange-400" },
  { key: "google", icon: "Brain", color: "text-blue-400" },
  { key: "react", icon: "Code", color: "text-cyan-400" },
  { key: "ux", icon: "Palette", color: "text-purple-400" },
];

const speakingConfigs: SpeakingConfig[] = [
  { key: "aiSummit", icon: "Mic" },
  { key: "montrealTech", icon: "Users" },
  { key: "reactMeetup", icon: "Zap" },
];

const publicationConfigs: PublicationConfig[] = [
  { key: "designSystems", icon: "BookOpen" },
  { key: "manifesto", icon: "FileText" },
  { key: "renaissance", icon: "Newspaper" },
];

const openSourceConfigs: OpenSourceConfig[] = [
  { key: "reactAi", icon: "Github" },
  { key: "designSystemAi", icon: "Palette" },
  { key: "montrealMap", icon: "Map" },
];

const CredentialsShowcase: FC = () => {
  const t = useTranslations("about.sections.credentials");
  const [activeTab, setActiveTab] = useState<'certifications' | 'speaking' | 'publications' | 'openSource'>('certifications');

  const tabs = [
    { key: 'certifications', label: t('sections.certifications.title'), icon: 'Award' as IconName },
    { key: 'speaking', label: t('sections.speaking.title'), icon: 'Mic' as IconName },
    { key: 'publications', label: t('sections.publications.title'), icon: 'BookOpen' as IconName },
    { key: 'openSource', label: t('sections.openSource.title'), icon: 'Github' as IconName },
  ];

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

  const tabVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(26, 26, 26, 0.5)" },
    active: {
      scale: 1.02,
      backgroundColor: "rgba(0, 255, 209, 0.1)",
      borderColor: "rgba(0, 255, 209, 0.3)",
      transition: { duration: 0.3 }
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'certifications':
        return (
          <motion.div
            className="grid lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {certConfigs.map((config, index) => (
              <motion.div
                key={config.key}
                className="glass-panel rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group card-lift"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                    <Icon name={config.icon} size={20} className={config.color} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h5 className="font-space-grotesk font-semibold text-foreground text-sm">
                      {t(`sections.certifications.items.${config.key}.title`)}
                    </h5>
                    <p className="text-xs text-muted-foreground">{t(`sections.certifications.items.${config.key}.issuer`)}</p>
                    <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                      {t(`sections.certifications.items.${config.key}.year`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'speaking':
        return (
          <motion.div
            className="grid lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {speakingConfigs.map((config, index) => (
              <motion.div
                key={config.key}
                className="glass-panel rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group card-lift"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                    <Icon name={config.icon} size={20} className="text-primary" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h5 className="font-space-grotesk font-semibold text-foreground">
                      {t(`sections.speaking.items.${config.key}.event`)}
                    </h5>
                    <p className="text-sm text-muted-foreground">{t(`sections.speaking.items.${config.key}.topic`)}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{t(`sections.speaking.items.${config.key}.location`)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={12} />
                        <span>{t(`sections.speaking.items.${config.key}.attendees`)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'publications':
        return (
          <motion.div
            className="grid lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {publicationConfigs.map((config, index) => (
              <motion.div
                key={config.key}
                className="glass-panel rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group card-lift"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                    <Icon name={config.icon} size={20} className="text-primary" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <h5 className="font-space-grotesk font-semibold text-foreground text-sm">
                      {t(`sections.publications.items.${config.key}.title`)}
                    </h5>
                    <p className="text-sm text-muted-foreground">{t(`sections.publications.items.${config.key}.publication`)}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t(`sections.publications.items.${config.key}.date`)}</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={12} />
                        <span>{t(`sections.publications.items.${config.key}.reads`)} {t('sections.publications.reads')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      case 'openSource':
        return (
          <motion.div
            className="grid lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {openSourceConfigs.map((config, index) => (
              <motion.div
                key={config.key}
                className="glass-panel rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group card-lift"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                      <Icon name={config.icon} size={20} className="text-primary" />
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Star" size={12} />
                      <span>{t(`sections.openSource.items.${config.key}.stars`)}</span>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-space-grotesk font-semibold text-foreground mb-2">
                      {t(`sections.openSource.items.${config.key}.project`)}
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">{t(`sections.openSource.items.${config.key}.description`)}</p>
                    <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                      {t(`sections.openSource.items.${config.key}.language`)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="text-center" variants={itemVariants}>
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <span className="text-sm font-mono text-primary uppercase tracking-wider">{t('badge')}</span>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <h3 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
          {t('title')}
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </motion.div>

      <motion.div className="space-y-8" variants={itemVariants}>
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
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
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-2xl border border-primary/20 p-8 text-center glass-panel"
        variants={itemVariants}
        whileHover={{ scale: 1.01 }}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Award" size={24} className="text-primary" />
            <h4 className="text-2xl font-space-grotesk font-bold text-foreground">
              {t('sections.communityImpact.title')}
            </h4>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-space-grotesk font-bold text-primary">{t('sections.communityImpact.stats.readers.value')}</div>
              <p className="text-sm text-muted-foreground">{t('sections.communityImpact.stats.readers.label')}</p>
            </motion.div>
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-space-grotesk font-bold text-primary">{t('sections.communityImpact.stats.stars.value')}</div>
              <p className="text-sm text-muted-foreground">{t('sections.communityImpact.stats.stars.label')}</p>
            </motion.div>
            <motion.div
              className="space-y-2"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-3xl font-space-grotesk font-bold text-primary">{t('sections.communityImpact.stats.attendees.value')}</div>
              <p className="text-sm text-muted-foreground">{t('sections.communityImpact.stats.attendees.label')}</p>
            </motion.div>
          </div>

          <p className="text-muted-foreground max-w-lg mx-auto">
            {t('sections.communityImpact.description')}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CredentialsShowcase;
