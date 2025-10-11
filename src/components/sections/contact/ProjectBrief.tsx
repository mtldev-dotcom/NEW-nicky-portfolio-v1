'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const ProjectBrief = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [briefData, setBriefData] = useState({
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

  const generateBrief = () => {
    // Mock brief generation
    const brief = `Project Brief Generated!\n\nGoal: ${briefData?.projectGoal}\nAudience: ${briefData?.targetAudience}\nFeatures: ${briefData?.keyFeatures?.join(', ')}\nDesign: ${briefData?.designPreference}\nTech: ${briefData?.techRequirements?.join(', ')}\nTimeline: ${briefData?.timeline}\nBudget: ${briefData?.budget}`;
    alert(brief);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                Project Overview
              </h3>
              <p className="text-muted-foreground">
                Let's start with the basics of your project
              </p>
            </div>
            <Input
              label="What's your main project goal?"
              type="text"
              placeholder="e.g., Launch an e-commerce store, build a portfolio, create a SaaS platform..."
              value={briefData?.projectGoal}
              onChange={(e) => handleInputChange('projectGoal', e?.target?.value)}
            />
            <Input
              label="Who is your target audience?"
              type="text"
              placeholder="e.g., Young professionals, B2B clients, creative agencies..."
              value={briefData?.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e?.target?.value)}
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Any inspiration or reference sites?
              </label>
              <textarea
                className="w-full h-24 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
                placeholder="Share URLs or describe styles you like..."
                value={briefData?.inspiration}
                onChange={(e) => handleInputChange('inspiration', e?.target?.value)}
              />
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
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-space-grotesk font-bold text-foreground">
            Project Brief Questionnaire
          </h2>
          <div className="text-sm text-muted-foreground">
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
          disabled={currentStep === 1}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button
            variant="default"
            onClick={nextStep}
            iconName="ChevronRight"
            iconPosition="right"
            className="glow-neon hover:glow-neon-active"
          >
            Next Step
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={generateBrief}
            iconName="FileText"
            iconPosition="left"
            className="glow-neon hover:glow-neon-active"
          >
            Generate Brief
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProjectBrief;
