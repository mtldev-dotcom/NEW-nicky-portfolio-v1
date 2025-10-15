'use client';

import React, { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const ContactForm = () => {
  const t = useTranslations('contact.sections.form');
  const locale = useLocale(); // Get current language (en/fr)
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
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('https://n8n.nickyhome.casa/webhook/contact-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'contact', // Distinguish from project brief
          name: formData.name,
          email: formData.email,
          company: formData.company,
          projectType: formData.projectType,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message,
          newsletter: formData.newsletter,
          terms: formData.terms,
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
    <div className="bg-card border border-border rounded-xl p-8 glow-neon hover:glow-neon-active transition-smooth">
      <div className="mb-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          {t('title')}
        </h3>
        <p className="text-muted-foreground">
          {t('description')}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label={t('fields.name.label')}
            type="text"
            placeholder={t('fields.name.placeholder')}
            required
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
          />
          <Input
            label={t('fields.email.label')}
            type="email"
            placeholder={t('fields.email.placeholder')}
            required
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
          />
        </div>

        <Input
          label={t('fields.company.label')}
          type="text"
          placeholder={t('fields.company.placeholder')}
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label={t('fields.projectType.label')}
            placeholder={t('fields.projectType.placeholder')}
            required
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
          />
          <Select
            label={t('fields.budget.label')}
            placeholder={t('fields.budget.placeholder')}
            options={budgetOptions}
            value={formData?.budget}
            onChange={(value) => handleInputChange('budget', value)}
          />
          <Select
            label={t('fields.timeline.label')}
            placeholder={t('fields.timeline.placeholder')}
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {t('fields.message.label')}
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
            placeholder={t('fields.message.placeholder')}
            required
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
          />
        </div>

        <div className="space-y-4">
          <Checkbox
            label={t('newsletter.title')}
            description={t('newsletter.description')}
            checked={formData?.newsletter}
            onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
          />
          <Checkbox
            label={t('terms.label')}
            description={t('terms.description')}
            required
            checked={formData?.terms}
            onChange={(e) => handleInputChange('terms', e?.target?.checked)}
          />
        </div>

        {submitStatus === 'success' && (
          <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <div>
                <p className="text-success font-medium">{t('success')}</p>
                <p className="text-success/80 text-sm">I'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={20} className="text-error" />
              <div>
                <p className="text-error font-medium">{t('error')}</p>
                <p className="text-error/80 text-sm">Please try again or contact me directly.</p>
              </div>
            </div>
          </div>
        )}

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
      </form>
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {t('responseTime')}
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
