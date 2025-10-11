import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContactInfo = () => {
  const contactMethods = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'hello@nickybruno.ca',
      description: 'Primary contact for project inquiries',
      action: 'mailto:hello@nickybruno.ca'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+1 (514) 555-0123',
      description: 'Available Mon-Fri, 9AM-6PM EST',
      action: 'tel:+15145550123'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: 'Montreal, QC, Canada',
      description: 'Available for local & remote projects',
      action: null
    },
    {
      icon: 'Clock',
      label: 'Response Time',
      value: 'Within 24 hours',
      description: 'Typically same-day for urgent projects',
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: 'Linkedin',
      label: 'LinkedIn',
      url: 'https://linkedin.com/in/nickybruno',
      description: 'Professional network & updates'
    },
    {
      icon: 'Github',
      label: 'GitHub',
      url: 'https://github.com/nickybruno',
      description: 'Code repositories & contributions'
    },
    {
      icon: 'Twitter',
      label: 'Twitter',
      url: 'https://twitter.com/nickybruno',
      description: 'Industry insights & thoughts'
    },
    {
      icon: 'Instagram',
      label: 'Instagram',
      url: 'https://instagram.com/nickybruno.tech',
      description: 'Behind-the-scenes & process'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
          Get In Touch
        </h3>
        <div className="space-y-6">
          {contactMethods?.map((method, index) => (
            <div key={index} className="group">
              {method?.action ? (
                <a
                  href={method?.action}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                    <Icon name={method?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                      {method?.label}
                    </h4>
                    <p className="text-foreground font-mono text-sm mt-1">
                      {method?.value}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {method?.description}
                    </p>
                  </div>
                  <Icon name="ExternalLink" size={16} className="text-muted-foreground group-hover:text-primary transition-smooth" />
                </a>
              ) : (
                <div className="flex items-start space-x-4 p-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={method?.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">
                      {method?.label}
                    </h4>
                    <p className="text-foreground font-mono text-sm mt-1">
                      {method?.value}
                    </p>
                    <p className="text-muted-foreground text-sm mt-1">
                      {method?.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Social Links */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-6">
          Connect & Follow
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialLinks?.map((social, index) => (
            <a
              key={index}
              href={social?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 p-4 border border-border rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-smooth"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                <Icon name={social?.icon} size={18} className="text-muted-foreground group-hover:text-primary transition-smooth" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-smooth">
                  {social?.label}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {social?.description}
                </p>
              </div>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
          ))}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-6">
          Quick Actions
        </h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            className="justify-start"
          >
            Schedule a Consultation Call
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            className="justify-start"
          >
            Download Process Methodology
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            View Case Study Examples
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;