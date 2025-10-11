'use client';

import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const LinkedInRecommendations = () => {
  const [expandedRecommendation, setExpandedRecommendation] = useState(null);

  const recommendations = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechFlow Inc",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      relationship: "Worked directly with Nicky",
      date: "October 2024",
      content: `Nicky is a rare find in the tech world - someone who truly bridges the gap between creative vision and technical execution. His work on our AI-powered design platform was nothing short of exceptional.\n\nWhat impressed me most was his ability to translate complex AI concepts into intuitive user experiences. He didn't just build what we asked for; he anticipated needs we didn't even know we had.\n\nHis expertise in React, combined with his deep understanding of AI automation, made him the perfect partner for our ambitious project. I'd work with Nicky again in a heartbeat.`,
      skills: ["React Development", "AI Integration", "UX Design", "Project Leadership"]
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Creative Director",
      company: "Pixel Perfect Studio",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      relationship: "Collaborated with Nicky",
      date: "September 2024",
      content: `Working with Nicky was a masterclass in creative technology. He took our wildest design concepts and made them reality with code that was both elegant and performant.\n\nHis understanding of modern web technologies, particularly his expertise with React and animation libraries, allowed us to create experiences that our clients still talk about months later.\n\nNicky doesn't just code - he thinks like a designer and executes like an engineer. That's a combination you rarely find.`,
      skills: ["Frontend Development", "Animation", "Creative Coding", "Client Relations"]
    },
    {
      id: 3,
      name: "Dr. Emily Watson",
      role: "CTO",
      company: "Montreal AI Labs",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      relationship: "Managed Nicky directly",
      date: "August 2024",
      content: `Nicky's contribution to our AI automation platform was transformative. His ability to understand complex machine learning workflows and translate them into user-friendly interfaces is unmatched.\n\nHe led the development of our AIAA.dev platform, which has become a cornerstone of our automation strategy. His code quality, documentation, and mentorship of junior developers set the standard for our entire team.\n\nI've worked with many developers, but few combine technical excellence with such strong communication and leadership skills.`,
      skills: ["AI/ML Integration", "Team Leadership", "System Architecture", "Mentoring"]
    }
  ];

  const toggleExpanded = (id) => {
    setExpandedRecommendation(expandedRecommendation === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Icon name="Linkedin" size={24} color="var(--color-primary)" />
          <h3 className="text-2xl font-space-grotesk font-bold text-foreground">
            LinkedIn Recommendations
          </h3>
        </div>
        <p className="text-muted-foreground">
          Professional endorsements from colleagues and clients
        </p>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec, index) => (
          <div
            key={rec?.id}
            className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/20 transition-smooth"
            style={{
              animationDelay: `${index * 150}ms`
            }}
          >
            {/* Header */}
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative">
                <Image
                  src={rec?.avatar}
                  alt={rec?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="Linkedin" size={8} color="white" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-foreground">
                      {rec?.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {rec?.role} at {rec?.company}
                    </p>
                    <p className="text-primary text-xs">
                      {rec?.relationship} • {rec?.date}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => toggleExpanded(rec?.id)}
                    className="p-2 rounded-lg hover:bg-muted/20 transition-smooth"
                    aria-label={expandedRecommendation === rec?.id ? "Collapse" : "Expand"}
                  >
                    <Icon 
                      name={expandedRecommendation === rec?.id ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      color="var(--color-muted-foreground)" 
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <div className="text-foreground leading-relaxed">
                {expandedRecommendation === rec?.id ? (
                  <div className="space-y-3">
                    {rec?.content?.split('\n\n')?.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                ) : (
                  <p className="line-clamp-3">
                    {rec?.content?.split('\n\n')?.[0]}
                  </p>
                )}
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {rec?.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Read More/Less */}
              {rec?.content?.split('\n\n')?.length > 1 && (
                <button
                  onClick={() => toggleExpanded(rec?.id)}
                  className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
                >
                  {expandedRecommendation === rec?.id ? "Show less" : "Read full recommendation"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* LinkedIn CTA */}
      <div className="text-center pt-6 border-t border-border/50">
        <p className="text-muted-foreground text-sm mb-4">
          Want to see more professional endorsements?
        </p>
        <a
          href="https://linkedin.com/in/nickybruno"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-smooth magnetic-hover"
        >
          <Icon name="Linkedin" size={20} />
          <span>View LinkedIn Profile</span>
          <Icon name="ExternalLink" size={16} />
        </a>
      </div>
    </div>
  );
};

export default LinkedInRecommendations;
