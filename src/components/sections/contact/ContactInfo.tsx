import React from 'react';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import { useTranslations } from 'next-intl';

const ContactInfo = () => {
  const t = useTranslations('contact.sections.info');
  const tSocial = useTranslations('contact.sections.social');
  const tQuickActions = useTranslations('contact.sections.quickActions');

  const contactMethods = [
    {
      icon: 'Mail',
      label: t('items.email.label'),
      value: t('items.email.value'),
      description: t('items.email.description'),
      action: 'mailto:hello@nickybruno.ca'
    },
    {
      icon: 'Phone',
      label: t('items.phone.label'),
      value: t('items.phone.value'),
      description: t('items.phone.description'),
      action: 'tel:+15145550123'
    },
    {
      icon: 'MapPin',
      label: t('items.location.label'),
      value: t('items.location.value'),
      description: t('items.location.description'),
      action: null
    },
    {
      icon: 'Clock',
      label: t('items.response.label'),
      value: t('items.response.value'),
      description: t('items.response.description'),
      action: null
    }
  ];

  const socialLinks = [
    {
      icon: 'Linkedin',
      label: tSocial('items.linkedin.name'),
      url: 'https://linkedin.com/in/nickybruno',
      description: tSocial('items.linkedin.description')
    },
    {
      icon: 'Github',
      label: tSocial('items.github.name'),
      url: 'https://github.com/nickybruno',
      description: tSocial('items.github.description')
    },
    {
      icon: 'Twitter',
      label: tSocial('items.twitter.name'),
      url: 'https://twitter.com/nickybruno',
      description: tSocial('items.twitter.description')
    },
    {
      icon: 'Instagram',
      label: tSocial('items.instagram.name'),
      url: 'https://instagram.com/nickybruno.tech',
      description: tSocial('items.instagram.description')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Methods */}
      <div className="bg-card border border-border rounded-xl p-8">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-6">
          {t('title')}
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
          {tSocial('title')}
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
          {tQuickActions('title')}
        </h3>
        <div className="space-y-4">
          <Button
            variant="outline"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            className="justify-start"
          >
            {tQuickActions('items.0')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="Download"
            iconPosition="left"
            className="justify-start"
          >
            {tQuickActions('items.1')}
          </Button>
          <Button
            variant="outline"
            fullWidth
            iconName="FileText"
            iconPosition="left"
            className="justify-start"
          >
            {tQuickActions('items.2')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
