'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { Checkbox } from 'components/ui/Checkbox';
import Input from 'components/ui/Input';
import Select from 'components/ui/Select';

const ContactForm = () => {
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
    { value: 'web-development', label: 'Web Development' },
    { value: 'ai-integration', label: 'AI Integration' },
    { value: 'design-consultation', label: 'Design Consultation' },
    { value: 'automation', label: 'Process Automation' },
    { value: 'full-stack', label: 'Full-Stack Solution' },
    { value: 'other', label: 'Other' }
  ];

  const budgetOptions = [
    { value: '5k-15k', label: '$5K - $15K CAD' },
    { value: '15k-30k', label: '$15K - $30K CAD' },
    { value: '30k-50k', label: '$30K - $50K CAD' },
    { value: '50k+', label: '$50K+ CAD' },
    { value: 'discuss', label: 'Let\'s Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Rush Project)' },
    { value: '1-2-months', label: '1-2 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-months+', label: '6+ Months' },
    { value: 'flexible', label: 'Flexible Timeline' }
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

    // Mock form submission (replace with EmailJS integration)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
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
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-8 glow-neon hover:glow-neon-active transition-smooth">
      <div className="mb-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          Start Your Project
        </h3>
        <p className="text-muted-foreground">
          Tell me about your vision, and I'll help bring it to life with the perfect blend of creativity and technology.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="Your name"
            required
            value={formData?.name}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="your@email.com"
            required
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
          />
        </div>

        <Input
          label="Company/Organization"
          type="text"
          placeholder="Your company (optional)"
          value={formData?.company}
          onChange={(e) => handleInputChange('company', e?.target?.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Select
            label="Project Type"
            placeholder="Select type"
            required
            options={projectTypeOptions}
            value={formData?.projectType}
            onChange={(value) => handleInputChange('projectType', value)}
          />
          <Select
            label="Budget Range"
            placeholder="Select budget"
            options={budgetOptions}
            value={formData?.budget}
            onChange={(value) => handleInputChange('budget', value)}
          />
          <Select
            label="Timeline"
            placeholder="Select timeline"
            options={timelineOptions}
            value={formData?.timeline}
            onChange={(value) => handleInputChange('timeline', value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Project Details
          </label>
          <textarea
            className="w-full h-32 px-4 py-3 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-smooth"
            placeholder="Describe your project, goals, and any specific requirements..."
            required
            value={formData?.message}
            onChange={(e) => handleInputChange('message', e?.target?.value)}
          />
        </div>

        <div className="space-y-4">
          <Checkbox
            label="Subscribe to AI automation insights newsletter"
            description="Get monthly tips on creative automation and industry trends"
            checked={formData?.newsletter}
            onChange={(e) => handleInputChange('newsletter', e?.target?.checked)}
          />
          <Checkbox
            label="I agree to the terms and conditions"
            description="Required to process your project inquiry"
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
                <p className="text-success font-medium">Message sent successfully!</p>
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
                <p className="text-error font-medium">Failed to send message</p>
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
          {isSubmitting ? 'Sending Message...' : 'Send Project Inquiry'}
        </Button>
      </form>
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          Expected response time: Within 24 hours • All inquiries are confidential
        </p>
      </div>
    </div>
  );
};

export default ContactForm;
