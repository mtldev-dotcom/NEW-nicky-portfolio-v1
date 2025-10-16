'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';
import { useTranslations, useLocale } from 'next-intl';

const ProjectBrief = () => {
  const t = useTranslations('contact.sections.projectBrief');
  const locale = useLocale(); // Get current language (en/fr)
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
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
  };

  const handleArrayChange = (field, value, checked) => {
    setBriefData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateBrief = async () => {
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
                Contact Information & Project Overview
              </h3>
              <p className="text-muted-foreground">
                Let's start with your contact details and project basics
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-4">
              <h4 className="font-medium text-foreground flex items-center space-x-2 mb-4">
                <Icon name="User" size={18} className="text-primary" />
                <span>Your Contact Information</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name*"
                  type="text"
                  placeholder="Your name"
                  value={briefData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                />
                <Input
                  label="Email Address*"
                  type="email"
                  placeholder="your@email.com"
                  value={briefData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (514) 555-0123"
                  value={briefData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
                <Input
                  label="Company/Organization"
                  type="text"
                  placeholder="Your company (optional)"
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

              <Input
                label={t('fields.goal.label')}
                type="text"
                placeholder={t('fields.goal.placeholder')}
                value={briefData?.projectGoal}
                onChange={(e) => handleInputChange('projectGoal', e?.target?.value)}
              />
              <Input
                label={t('fields.audience.label')}
                type="text"
                placeholder={t('fields.audience.placeholder')}
                value={briefData?.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e?.target?.value)}
              />
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
    <div className="bg-card border border-border rounded-xl p-8">
      {/* Header with Description */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="FileText" size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
              {locale === 'fr' ? 'Brief de Projet Détaillé' : 'Detailed Project Brief'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {locale === 'fr' ? 'Besoin d\'un devis complet ? Remplissez ce brief détaillé pour les projets complexes' : 'Need a comprehensive quote? Fill out this detailed brief for complex projects'}
            </p>
          </div>
          <div className="text-sm text-muted-foreground text-right">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-smooth"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {renderStep()}

      <div className="flex justify-between mt-8 pt-6 border-t border-border">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1 || isSubmitting}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          {t('navigation.previous')}
        </Button>

        {currentStep < totalSteps ? (
          <Button
            variant="default"
            onClick={nextStep}
            iconName="ChevronRight"
            iconPosition="right"
            className="glow-neon hover:glow-neon-active"
          >
            {t('navigation.next')}
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={generateBrief}
            disabled={isSubmitting}
            iconName="FileText"
            iconPosition="left"
            className="glow-neon hover:glow-neon-active"
          >
            {isSubmitting ? 'Submitting...' : 'Generate Brief'}
          </Button>
        )}
      </div>

      {/* Success/Error Status */}
      {submitStatus === 'success' && (
        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start space-x-3">
          <Icon name="CheckCircle" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-green-500 mb-1">Project Brief Submitted!</h4>
            <p className="text-sm text-green-500/80">
              Thank you! I'll review your project brief and get back to you within 24-48 hours.
            </p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-red-500 mb-1">{locale === 'fr' ? 'Soumission Échouée' : 'Submission Failed'}</h4>
            <p className="text-sm text-red-500/80">
              {locale === 'fr' ? 'Quelque chose s\'est mal passé. Veuillez réessayer ou me contacter directement.' : 'Something went wrong. Please try again or contact me directly.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectBrief;
