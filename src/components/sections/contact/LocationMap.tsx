import React from 'react';
import Icon from 'components/AppIcon';

const LocationMap = () => {
  // Montreal coordinates
  const lat = 45.5017;
  const lng = -73.5673;

  const locationDetails = [
    {
      icon: 'MapPin',
      label: 'Address',
      value: 'Montreal, Quebec, Canada'
    },
    {
      icon: 'Clock',
      label: 'Timezone',
      value: 'Eastern Time (UTC-5)'
    },
    {
      icon: 'Globe',
      label: 'Service Area',
      value: 'Global (Remote & Local)'
    },
    {
      icon: 'Plane',
      label: 'Travel',
      value: 'Available for on-site projects'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-8 pb-6">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-3">
          Based in Montreal
        </h3>
        <p className="text-muted-foreground mb-6">
          Working with clients locally and internationally. Available for remote collaboration and on-site projects.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {locationDetails?.map((detail, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={detail?.icon} size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {detail?.label}
                </p>
                <p className="text-sm text-muted-foreground">
                  {detail?.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-64 bg-muted relative overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Montreal, Quebec, Canada"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${lat},${lng}&z=12&output=embed`}
          className="border-0"
        />
        
        {/* Overlay with contact info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground text-sm">
                  Nicky Bruno Studio
                </h4>
                <p className="text-xs text-muted-foreground">
                  Creative Technology Hub
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={16} className="text-primary" />
                <span className="text-xs text-primary font-medium">
                  Montreal, QC
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
