import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ExperienceCounter = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [projectsCount, setProjectsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [awardsCount, setAwardsCount] = useState(0);

  const targetYears = 20;
  const targetProjects = 150;
  const targetClients = 85;
  const targetAwards = 12;

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setYearsCount(Math.floor(targetYears * progress));
      setProjectsCount(Math.floor(targetProjects * progress));
      setClientsCount(Math.floor(targetClients * progress));
      setAwardsCount(Math.floor(targetAwards * progress));

      if (currentStep >= steps) {
        setYearsCount(targetYears);
        setProjectsCount(targetProjects);
        setClientsCount(targetClients);
        setAwardsCount(targetAwards);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    {
      icon: 'Calendar',
      value: yearsCount,
      suffix: '+',
      label: 'Years Experience',
      description: 'Two decades of creative technology mastery',
      color: 'text-primary'
    },
    {
      icon: 'Briefcase',
      value: projectsCount,
      suffix: '+',
      label: 'Projects Delivered',
      description: 'Intelligent experiences crafted',
      color: 'text-blue-400'
    },
    {
      icon: 'Users',
      value: clientsCount,
      suffix: '+',
      label: 'Happy Clients',
      description: 'From startups to enterprises',
      color: 'text-green-400'
    },
    {
      icon: 'Award',
      value: awardsCount,
      suffix: '',
      label: 'Industry Awards',
      description: 'Recognition for excellence',
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-card/50 to-transparent backdrop-blur-sm rounded-2xl border border-border/50 p-8 lg:p-12">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-1 bg-primary rounded-full"></div>
          <span className="text-sm font-mono text-primary uppercase tracking-wider">By The Numbers</span>
          <div className="w-12 h-1 bg-primary rounded-full"></div>
        </div>
        
        <h3 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
          Proven Track Record
        </h3>
        
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Two decades of bridging creativity and technology, delivering intelligent experiences that drive real business impact across industries and continents.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center group">
            <div className="relative mb-6">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-smooth"></div>
              
              {/* Icon Container */}
              <div className="relative bg-card/80 backdrop-blur-sm rounded-full w-20 h-20 mx-auto flex items-center justify-center border border-border/50 group-hover:border-primary/30 transition-smooth glow-neon">
                <Icon name={stat?.icon} size={32} className={stat?.color} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground">
                {stat?.value}<span className={stat?.color}>{stat?.suffix}</span>
              </div>
              
              <h4 className="font-space-grotesk font-semibold text-foreground text-lg">
                {stat?.label}
              </h4>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Context */}
      <div className="mt-12 pt-8 border-t border-border/30">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="TrendingUp" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">Growth Focused</span>
            </div>
            <p className="text-sm text-muted-foreground">Consistently delivering 40%+ performance improvements</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Globe" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">Global Reach</span>
            </div>
            <p className="text-sm text-muted-foreground">Projects spanning 15+ countries and 5 continents</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Icon name="Zap" size={20} className="text-primary" />
              <span className="font-space-grotesk font-semibold text-foreground">AI Pioneer</span>
            </div>
            <p className="text-sm text-muted-foreground">Early adopter of AI automation since 2018</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceCounter;