'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const ContactForm = () => {
  const t = useTranslations('contact.sections.form');
  const locale = useLocale();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
    newsletter: false,
    terms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

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

  const projectTypeOptions = [
    { value: 'web-development', label: t('fields.projectType.options.web') },
    { value: 'ai-integration', label: t('fields.projectType.options.ai') },
    { value: 'design-consultation', label: t('fields.projectType.options.design') },
    { value: 'automation', label: t('fields.projectType.options.automation') },
    { value: 'full-stack', label: t('fields.projectType.options.fullstack') },
    { value: 'other', label: t('fields.projectType.options.other') }
  ];

  const budgetOptions = [
    { value: '5k-15k', label: t('fields.budget.options.5k-15k') },
    { value: '15k-30k', label: t('fields.budget.options.15k-30k') },
    { value: '30k-50k', label: t('fields.budget.options.30k-50k') },
    { value: '50k+', label: t('fields.budget.options.50k+') },
    { value: 'discuss', label: t('fields.budget.options.discuss') }
  ];

  const timelineOptions = [
    { value: 'asap', label: t('fields.timeline.options.asap') },
    { value: '1-2-months', label: t('fields.timeline.options.1-2months') },
    { value: '3-6-months', label: t('fields.timeline.options.3-6months') },
    { value: '6-months+', label: t('fields.timeline.options.6months+') },
    { value: 'flexible', label: t('fields.timeline.options.flexible') }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = t('validation.nameRequired');
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = t('validation.emailRequired');
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      errors.email = t('validation.emailInvalid');
    }

    // Project type validation
    if (!formData.projectType) {
      errors.projectType = t('validation.projectTypeRequired');
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = t('validation.messageRequired');
    }

    // Terms validation
    if (!formData.terms) {
      errors.terms = t('validation.termsRequired');
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    // Validate form before submitting
    if (!validateForm()) {
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
          formType: 'contact',
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          newsletter: formData.newsletter,
          terms: formData.terms,
          language: locale
        }),
      });

      if (!response.ok) {
        console.error('Server error:', response.status, response.statusText);
        setSubmitStatus('error');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Invalid response type:', contentType);
        setSubmitStatus('error');
        return;
      }

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Clear form on success
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          timeline: '',
          message: '',
          newsletter: false,
          terms: false
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

  return (
    <motion.div
      ref={ref}
      className="glass-panel rounded-xl p-8 glow-neon hover:glow-neon-active transition-smooth card-lift"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="flex items-center space-x-3 mb-4">
          <motion.div
            className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Icon name="MessageCircle" size={24} className="text-primary" />
          </motion.div>
          <div>
            <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
              {t('title')}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {t('description')}
            </p>
          </div>
        </div>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Input
              label={t('fields.name.label')}
              type="text"
              placeholder={t('fields.name.placeholder')}
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
            />
            {validationErrors.name && (
              <motion.p
                className="mt-1 text-sm text-red-500 flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="AlertCircle" size={14} />
                <span>{validationErrors.name}</span>
              </motion.p>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Input
              label={t('fields.email.label')}
              type="email"
              placeholder={t('fields.email.placeholder')}
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
            />
            {validationErrors.email && (
              <motion.p
                className="mt-1 text-sm text-red-500 flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="AlertCircle" size={14} />
                <span>{validationErrors.email}</span>
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Input
            label={t('fields.company.label')}
            type="text"
            placeholder={t('fields.company.placeholder')}
            value={formData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Select
              label={t('fields.projectType.label')}
              placeholder={t('fields.projectType.placeholder')}
              options={projectTypeOptions}
              value={formData?.projectType}
              onChange={(value) => handleInputChange('projectType', value)}
            />
            {validationErrors.projectType && (
              <motion.p
                className="mt-1 text-sm text-red-500 flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="AlertCircle" size={14} />
                <span>{validationErrors.projectType}</span>
              </motion.p>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <Select
              label={t('fields.budget.label')}
              placeholder={t('fields.budget.placeholder')}
              options={budgetOptions}
              value={formData?.budget}
              onChange={(value) => handleInputChange('budget', value)}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Select
              label={t('fields.timeline.label')}
              placeholder={t('fields.timeline.placeholder')}
              options={timelineOptions}
              value={formData?.timeline}
              onChange={(value) => handleInputChange('timeline', value)}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('fields.message.label')}
          </label>
          <motion.textarea
            className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
            placeholder={t('fields.message.placeholder')}
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
            whileFocus={{ scale: 1.01 }}
          />
          {validationErrors.message && (
            <motion.p
              className="mt-1 text-sm text-red-500 flex items-center space-x-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Icon name="AlertCircle" size={14} />
              <span>{validationErrors.message}</span>
            </motion.p>
          )}
        </motion.div>

        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <Checkbox
              label={t('newsletter.title')}
              description={t('newsletter.description')}
              checked={formData?.newsletter}
              onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Checkbox
              label={t('terms.label')}
              description={t('terms.description')}
              checked={formData?.terms}
              onChange={(e) => handleInputChange('terms', e?.target?.checked)}
            />
            {validationErrors.terms && (
              <motion.p
                className="mt-1 text-sm text-red-500 flex items-center space-x-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Icon name="AlertCircle" size={14} />
                <span>{validationErrors.terms}</span>
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Success/Error Status */}
        <AnimatePresence>
          {submitStatus === 'success' && (
            <motion.div
              className="p-4 bg-success/10 border border-success/20 rounded-lg"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Icon name="CheckCircle" size={20} className="text-success" />
                </motion.div>
                <div>
                  <p className="text-success font-medium">{t('success')}</p>
                  <p className="text-success/80 text-sm">I'll get back to you within 24 hours.</p>
                </div>
              </div>
            </motion.div>
          )}

          {submitStatus === 'error' && (
            <motion.div
              className="p-4 bg-error/10 border border-error/20 rounded-lg"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <Icon name="AlertCircle" size={20} className="text-error" />
                </motion.div>
                <div>
                  <p className="text-error font-medium">{t('error')}</p>
                  <p className="text-error/80 text-sm">Please try again or contact me directly.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              type="submit"
              variant="default"
              size="lg"
              fullWidth
              loading={isSubmitting}
              iconName="Send"
              iconPosition="right"
              className="glow-neon hover:glow-neon-active"
            >
              {isSubmitting ? 'Sending Message...' : t('submit')}
            </Button>
          </motion.div>
        </motion.div>
      </form>

      <motion.div
        className="mt-6 pt-6 border-t border-border"
        variants={itemVariants}
      >
        <p className="text-xs text-muted-foreground text-center">
          {t('responseTime')}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ContactForm;
