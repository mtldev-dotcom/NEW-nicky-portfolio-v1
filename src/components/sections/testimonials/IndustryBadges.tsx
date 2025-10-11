import React from 'react';
import Icon from 'components/AppIcon';

const IndustryBadges = () => {
  const recognitions = [
    {
      id: 1,
      title: "Top Developer",
      organization: "GitHub",
      year: "2024",
      icon: "Github",
      description: "Top 1% contributor in Montreal tech community"
    },
    {
      id: 2,
      title: "AI Innovation Award",
      organization: "Montreal AI Society",
      year: "2024",
      icon: "Zap",
      description: "Recognition for AIAA.dev automation platform"
    },
    {
      id: 3,
      title: "Speaker",
      organization: "React Montreal",
      year: "2024",
      icon: "Mic",
      description: "Regular speaker at local tech meetups"
    },
    {
      id: 4,
      title: "Featured Article",
      organization: "Dev.to",
      year: "2024",
      icon: "FileText",
      description: "Published insights on AI-human collaboration"
    },
    {
      id: 5,
      title: "Mentor",
      organization: "TechStars Montreal",
      year: "2024",
      icon: "Users",
      description: "Mentoring next-gen creative technologists"
    },
    {
      id: 6,
      title: "Open Source",
      organization: "NPM",
      year: "2024",
      icon: "Package",
      description: "Maintainer of popular React automation tools"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
          Industry Recognition
        </h3>
        <p className="text-muted-foreground">
          Acknowledged expertise in creative technology and AI innovation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recognitions?.map((recognition, index) => (
          <div
            key={recognition?.id}
            className="group p-6 rounded-lg border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-smooth magnetic-hover"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <div className="space-y-4">
              {/* Icon & Year */}
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-smooth">
                  <Icon 
                    name={recognition?.icon} 
                    size={20} 
                    color="var(--color-primary)" 
                  />
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {recognition?.year}
                </span>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <h4 className="font-space-grotesk font-semibold text-foreground">
                  {recognition?.title}
                </h4>
                <p className="text-primary text-sm font-medium">
                  {recognition?.organization}
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {recognition?.description}
                </p>
              </div>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryBadges;
