import React from 'react';
import Image from '../../../components/AppImage';

const ClientLogos = () => {
  const clients = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
      category: "Enterprise"
    },
    {
      id: 2,
      name: "Creative Studio",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop",
      category: "Agency"
    },
    {
      id: 3,
      name: "StartupLab",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop",
      category: "Startup"
    },
    {
      id: 4,
      name: "Montreal AI Hub",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop",
      category: "AI/Tech"
    },
    {
      id: 5,
      name: "Design Collective",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=100&fit=crop",
      category: "Creative"
    },
    {
      id: 6,
      name: "Innovation Labs",
      logo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=200&h=100&fit=crop",
      category: "R&D"
    },
    {
      id: 7,
      name: "Digital Agency",
      logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=200&h=100&fit=crop",
      category: "Digital"
    },
    {
      id: 8,
      name: "Future Systems",
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=100&fit=crop",
      category: "Technology"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-space-grotesk font-semibold text-foreground">
          Trusted by Industry Leaders
        </h3>
        <p className="text-muted-foreground">
          From startups to enterprises, across Montreal and beyond
        </p>
      </div>
      {/* Scrolling Logo Animation */}
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll space-x-8">
          {/* First set of logos */}
          {clients?.map((client) => (
            <div
              key={`first-${client?.id}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-16 bg-muted/10 rounded-lg border border-border/50 flex items-center justify-center overflow-hidden hover:border-primary/30 hover:bg-muted/20 transition-smooth">
                <Image
                  src={client?.logo}
                  alt={`${client?.name} logo`}
                  className="w-24 h-10 object-contain opacity-60 group-hover:opacity-100 transition-smooth grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-smooth">
                {client?.category}
              </p>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {clients?.map((client) => (
            <div
              key={`second-${client?.id}`}
              className="flex-shrink-0 group"
            >
              <div className="w-32 h-16 bg-muted/10 rounded-lg border border-border/50 flex items-center justify-center overflow-hidden hover:border-primary/30 hover:bg-muted/20 transition-smooth">
                <Image
                  src={client?.logo}
                  alt={`${client?.name} logo`}
                  className="w-24 h-10 object-contain opacity-60 group-hover:opacity-100 transition-smooth grayscale group-hover:grayscale-0"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-smooth">
                {client?.category}
              </p>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-border/50">
        <div className="text-center space-y-1">
          <div className="text-2xl font-space-grotesk font-bold text-primary">50+</div>
          <div className="text-sm text-muted-foreground">Projects Delivered</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-space-grotesk font-bold text-primary">98%</div>
          <div className="text-sm text-muted-foreground">Client Satisfaction</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-space-grotesk font-bold text-primary">20+</div>
          <div className="text-sm text-muted-foreground">Years Experience</div>
        </div>
        <div className="text-center space-y-1">
          <div className="text-2xl font-space-grotesk font-bold text-primary">24/7</div>
          <div className="text-sm text-muted-foreground">Support Available</div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ClientLogos;