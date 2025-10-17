'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { useTranslations, useLocale } from 'next-intl';

const ProjectBrief = () => {
  const t = useTranslations('contact.sections.projectBrief');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [briefData, setBriefData] = useState({
    // Contact Info
    name: '',
    email: '',
    phone: '',
    company: '',
    // Project Details
    projectGoal: '',
    targetAudience: '',
    keyFeatures: [],
    designPreference: '',
    techRequirements: [],
    timeline: '',
    budget: '',
    inspiration: '',
    challenges: ''
  });

  const totalSteps = 4;

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

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const designPreferenceOptions = [
    { value: 'modern-minimal', label: 'Modern & Minimal' },
    { value: 'bold-creative', label: 'Bold & Creative' },
    { value: 'corporate-professional', label: 'Corporate & Professional' },
    { value: 'artistic-experimental', label: 'Artistic & Experimental' },
    { value: 'not-sure', label: 'Not Sure Yet' }
  ];

  const featureOptions = [
    { value: 'responsive-design', label: 'Responsive Design' },
    { value: 'cms-integration', label: 'Content Management' },
    { value: 'e-commerce', label: 'E-commerce Functionality' },
    { value: 'user-authentication', label: 'User Authentication' },
    { value: 'api-integration', label: 'API Integration' },
    { value: 'analytics', label: 'Analytics & Tracking' },
    { value: 'seo-optimization', label: 'SEO Optimization' },
    { value: 'ai-features', label: 'AI-Powered Features' }
  ];

  const techOptions = [
    { value: 'react', label: 'React/Next.js' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'shopify', label: 'Shopify' },
    { value: 'custom-backend', label: 'Custom Backend' },
    { value: 'headless-cms', label: 'Headless CMS' },
    { value: 'ai-integration', label: 'AI Integration' },
    { value: 'no-preference', label: 'No Preference' }
  ];

  const handleInputChange = (field, value) => {
    setBriefData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleArrayChange = (field, value, checked) => {
    setBriefData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const validateCurrentStep = () => {
    const errors: Record<string, string> = {};

    switch (currentStep) {
      case 1:
        // Step 1: Contact info & project overview validation
        if (!briefData.name.trim()) {
          errors.name = t('validation.nameRequired');
        }
        if (!briefData.email.trim()) {
          errors.email = t('validation.emailRequired');
        } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(briefData.email)) {
          errors.email = t('validation.emailInvalid');
        }
        if (!briefData.projectGoal.trim()) {
          errors.projectGoal = t('validation.projectGoalRequired');
        }
        if (!briefData.targetAudience.trim()) {
          errors.targetAudience = t('validation.targetAudienceRequired');
        }
        break;

      case 2:
        // Step 2: Key features - optional, no validation needed
        break;

      case 3:
        // Step 3: Design & Tech - optional, no validation needed
        break;

      case 4:
        // Step 4: Timeline, budget & challenges - optional, no validation needed
        break;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Clear errors when moving to next step
      setValidationErrors({});
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Clear errors when going back
      setValidationErrors({});
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!briefData.name.trim()) {
      errors.name = t('validation.nameRequired');
    }

    // Email validation
    if (!briefData.email.trim()) {
      errors.email = t('validation.emailRequired');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(briefData.email)) {
      errors.email = t('validation.emailInvalid');
    }

    // Project goal validation
    if (!briefData.projectGoal.trim()) {
      errors.projectGoal = t('validation.projectGoalRequired');
    }

    // Target audience validation
    if (!briefData.targetAudience.trim()) {
      errors.targetAudience = t('validation.targetAudienceRequired');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateBrief = async () => {
    // Validate form before submitting
    if (!validateForm()) {
      // Scroll to first error (step 1 has contact info)
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://n8n.nickyhome.casa/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'projectBrief', // Distinguish from contact form
          // Contact Info
          name: briefData.name,
          email: briefData.email,
          phone: briefData.phone,
          company: briefData.company,
          // Project Details
          projectGoal: briefData.projectGoal,
          targetAudience: briefData.targetAudience,
          keyFeatures: briefData.keyFeatures,
          designPreference: briefData.designPreference,
          techRequirements: briefData.techRequirements,
          timeline: briefData.timeline,
          budget: briefData.budget,
          inspiration: briefData.inspiration,
          challenges: briefData.challenges,
          language: locale // User's selected language (en/fr)
        }),
      });

      // Check if response is OK and has JSON content
      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText);
        setSubmitStatus('error');
        return;
      }

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        setSubmitStatus('error');
        return;
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form to step 1 and clear data
        setCurrentStep(1);
        setValidationErrors({});
        setBriefData({
          name: '',
          email: '',
          phone: '',
          company: '',
          projectGoal: '',
          targetAudience: '',
          keyFeatures: [],
          designPreference: '',
          techRequirements: [],
          timeline: '',
          budget: '',
          inspiration: '',
          challenges: ''
        });
      } else {
        console.error('Submission failed:', result.message, result.errors);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                {t('stepTitle.1')}
              </h3>
              <p className="text-muted-foreground">
                {t('stepDescription.1')}
              </p>
              <div className="mt-3 inline-flex items-center space-x-2 text-sm text-primary/80">
                <Icon name="Info" size={16} />
                <span>{locale === 'fr' ? 'Les champs marqués * sont requis pour continuer' : 'Fields marked with * are required to continue'}</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2 mb-4">
                <Icon name="User" size={18} className="text-primary" />
                <span>{t('contactInfo.title')}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    label={t('contactInfo.fields.name.label')}
                    type="text"
                    placeholder={t('contactInfo.fields.name.placeholder')}
                    value={briefData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                  />
                  {validationErrors.name && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{validationErrors.name}</span>
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    label={t('contactInfo.fields.email.label')}
                    type="email"
                    placeholder={t('contactInfo.fields.email.placeholder')}
                    value={briefData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                  />
                  {validationErrors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                      <Icon name="AlertCircle" size={14} />
                      <span>{validationErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label={t('contactInfo.fields.phone.label')}
                  type="tel"
                  placeholder={t('contactInfo.fields.phone.placeholder')}
                  value={briefData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
                <Input
                  label={t('contactInfo.fields.company.label')}
                  type="text"
                  placeholder={t('contactInfo.fields.company.placeholder')}
                  value={briefData?.company}
                  onChange={(e) => handleInputChange('company', e?.target?.value)}
                />
              </div>
            </div>

            {/* Project Overview */}
            <div className="space-y-4 pt-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2">
                <Icon name="Target" size={18} className="text-primary" />
                <span>Project Overview</span>
              </h4>

              <div>
                <Input
                  label={t('fields.goal.label')}
                  type="text"
                  placeholder={t('fields.goal.placeholder')}
                  value={briefData?.projectGoal}
                  onChange={(e) => handleInputChange('projectGoal', e?.target?.value)}
                />
                {validationErrors.projectGoal && (
                  <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{validationErrors.projectGoal}</span>
                  </p>
                )}
              </div>
              <div>
                <Input
                  label={t('fields.audience.label')}
                  type="text"
                  placeholder={t('fields.audience.placeholder')}
                  value={briefData?.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e?.target?.value)}
                />
                {validationErrors.targetAudience && (
                  <p className="mt-1 text-sm text-red-500 flex items-center space-x-1">
                    <Icon name="AlertCircle" size={14} />
                    <span>{validationErrors.targetAudience}</span>
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t('fields.inspiration.label')}
                </label>
                <textarea
                  className="w-full h-24 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
                  placeholder={t('fields.inspiration.placeholder')}
                  value={briefData?.inspiration}
                  onChange={(e) => handleInputChange('inspiration', e?.target?.value)}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                Features & Functionality
              </h3>
              <p className="text-muted-foreground">
                What features do you need for your project?
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Key Features (select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featureOptions?.map((feature) => (
                  <Checkbox
                    key={feature?.value}
                    label={feature?.label}
                    checked={briefData?.keyFeatures?.includes(feature?.value)}
                    onChange={(e) => handleArrayChange('keyFeatures', feature?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
            <Select
              label="Design Preference"
              placeholder="Choose a style"
              options={designPreferenceOptions}
              value={briefData?.designPreference}
              onChange={(value) => handleInputChange('designPreference', value)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                Technical Requirements
              </h3>
              <p className="text-muted-foreground">
                Any specific technical preferences or requirements?
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-4">
                Technology Preferences (select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {techOptions?.map((tech) => (
                  <Checkbox
                    key={tech?.value}
                    label={tech?.label}
                    checked={briefData?.techRequirements?.includes(tech?.value)}
                    onChange={(e) => handleArrayChange('techRequirements', tech?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Specific challenges or concerns?
              </label>
              <textarea
                className="w-full h-24 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
                placeholder="Any technical challenges, integrations, or specific requirements..."
                value={briefData?.challenges}
                onChange={(e) => handleInputChange('challenges', e?.target?.value)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                Timeline & Budget
              </h3>
              <p className="text-muted-foreground">
                When do you need this completed and what's your budget range?
              </p>
            </div>
            <Input
              label="Desired Timeline"
              type="text"
              placeholder="e.g., 2 months, by end of year, flexible..."
              value={briefData?.timeline}
              onChange={(e) => handleInputChange('timeline', e?.target?.value)}
            />
            <Input
              label="Budget Range"
              type="text"
              placeholder="e.g., $10K-20K CAD, flexible, let's discuss..."
              value={briefData?.budget}
              onChange={(e) => handleInputChange('budget', e?.target?.value)}
            />
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-primary mt-1" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">
                    What happens next?
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• I'll review your brief and prepare a custom proposal</li>
                    <li>• We'll schedule a consultation call to discuss details</li>
                    <li>• You'll receive a detailed project timeline and quote</li>
                    <li>• We can start as soon as you're ready!</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={ref}
      className="glass-panel rounded-xl p-8 card-lift"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Header with Description */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon name="FileText" size={24} className="text-primary" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
              {t('title')}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {t('subtitle')}
            </p>
          </div>
          <motion.div
            className="text-sm text-muted-foreground text-right"
            whileHover={{ scale: 1.05 }}
          >
            {t('step')} {currentStep} {t('of')} {totalSteps}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full transition-smooth"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={stepVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="flex justify-between mt-8 pt-6 border-t border-border"
        variants={itemVariants}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1 || isSubmitting}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            {t('navigation.previous')}
          </Button>
        </motion.div>

        {currentStep < totalSteps ? (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="default"
              onClick={nextStep}
              iconName="ChevronRight"
              iconPosition="right"
              className="glow-neon hover:glow-neon-active"
            >
              {t('navigation.next')}
            </Button>
          </motion.div>
        ) : (
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="default"
              onClick={generateBrief}
              disabled={isSubmitting}
              iconName="FileText"
              iconPosition="left"
              className="glow-neon hover:glow-neon-active"
            >
              {isSubmitting ? t('status.submitting') : t('navigation.submit')}
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Success/Error Status */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start space-x-3"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Icon name="CheckCircle" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
            </motion.div>
            <div>
              <h4 className="font-medium text-green-500 mb-1">{t('status.success.title')}</h4>
              <p className="text-sm text-green-500/80">
                {t('status.success.message')}
              </p>
            </div>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-3"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
            </motion.div>
            <div>
              <h4 className="font-medium text-red-500 mb-1">{t('status.error.title')}</h4>
              <p className="text-sm text-red-500/80">
                {t('status.error.message')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProjectBrief;
