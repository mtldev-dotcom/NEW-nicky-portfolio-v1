import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const PersonalIntro = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* Personal Photo & Visual Elements */}
      <div className="relative order-2 lg:order-1">
        <div className="relative max-w-md mx-auto lg:max-w-none">
          {/* Main Photo Container */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-transparent p-1">
            <div className="relative overflow-hidden rounded-xl bg-card">
              <Image
                src="/assets/images/profil_portrait.jpg"
                alt="Nicky Bruno - Creative Technologist"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              
              {/* Floating UI Elements */}
              <div className="absolute top-6 right-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 glow-neon">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-xs font-mono text-primary">ONLINE</span>
                </div>
              </div>
              
              <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-lg p-3 glow-neon">
                <div className="flex items-center space-x-2">
                  <Icon name="MapPin" size={16} className="text-primary" />
                  <span className="text-xs font-mono text-foreground">Montreal, QC</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Tech Icons */}
          <div className="absolute -top-4 -left-4 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce">
            <Icon name="Code" size={20} className="text-primary" />
          </div>
          
          <div className="absolute -bottom-4 -right-4 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Icon name="Palette" size={20} className="text-primary" />
          </div>
          
          <div className="absolute top-1/2 -right-6 bg-primary/10 backdrop-blur-sm rounded-full p-3 glow-neon animate-bounce" style={{ animationDelay: '1s' }}>
            <Icon name="Zap" size={20} className="text-primary" />
          </div>
        </div>
      </div>
      {/* Personal Story & Introduction */}
      <div className="order-1 lg:order-2 space-y-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-1 bg-primary rounded-full"></div>
              <span className="text-sm font-mono text-primary uppercase tracking-wider">Identity Revelation</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-space-grotesk font-bold text-foreground leading-tight">
              The Creative
              <span className="block text-primary text-glow">Technologist</span>
            </h2>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-lg">
              I'm Nicky Bruno, and I represent the evolution of creative professionals—where traditional design meets cutting-edge AI automation. I don't just choose between creativity or technology; I master both.
            </p>
            
            <p>
              For over two decades, I've been crafting intelligent experiences that think, adapt, and evolve. I'm not just building websites—I'm architecting digital experiences that bridge human intuition with machine precision.
            </p>
            
            <p>
              Based in Montreal's vibrant tech scene, I bring a unique blend of bilingual culture and North American innovation to every project. My approach is visionary yet grounded, technically masterful yet creatively inspired.
            </p>
          </div>
        </div>

        {/* Key Attributes */}
        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: 'Brain', label: 'Visionary', desc: 'Future-focused thinking' },
            { icon: 'Code2', label: 'Technical', desc: 'Masterful execution' },
            { icon: 'Heart', label: 'Human', desc: 'Warmly approachable' },
            { icon: 'Users', label: 'Collaborative', desc: 'Partnership-driven' }
          ]?.map((attr, index) => (
            <div key={index} className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-smooth group">
              <div className="flex items-start space-x-3">
                <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={attr?.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-space-grotesk font-semibold text-foreground text-sm">{attr?.label}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{attr?.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center space-x-4 pt-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span>Montreal, Quebec</span>
          </div>
          <div className="w-1 h-1 bg-border rounded-full"></div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Globe" size={16} className="text-primary" />
            <span>Global Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalIntro;
