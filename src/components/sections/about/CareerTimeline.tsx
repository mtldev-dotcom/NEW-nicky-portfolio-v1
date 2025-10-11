'use client';

import React, { type FC, useState } from "react";
import Icon, { type IconName } from "components/AppIcon";

interface Milestone {
  year: string;
  title: string;
  company: string;
  location: string;
  description: string;
  icon: IconName;
  color: string;
  achievements: string[];
}

const milestones: Milestone[] = [
  {
    year: "2004",
    title: "Creative Foundation",
    company: "Freelance Designer",
    location: "Montreal, QC",
    description:
      "Started journey in graphic design and web development, establishing the creative foundation that would define my approach to technology.",
    icon: "Palette",
    color: "text-blue-400",
    achievements: ["First client portfolio", "Adobe Creative Suite mastery", "Web standards adoption"],
  },
  {
    year: "2008",
    title: "Digital Evolution",
    company: "Creative Agency Lead",
    location: "Montreal, QC",
    description:
      "Led digital transformation initiatives, bridging traditional design with emerging web technologies and user experience principles.",
    icon: "Monitor",
    color: "text-green-400",
    achievements: ["Team leadership", "UX methodology", "Client relationship management"],
  },
  {
    year: "2012",
    title: "Technical Mastery",
    company: "Senior Developer",
    location: "Montreal, QC",
    description:
      "Deepened technical expertise in modern web frameworks, database architecture, and performance optimization strategies.",
    icon: "Code",
    color: "text-purple-400",
    achievements: ["Full-stack development", "Database optimization", "Performance engineering"],
  },
  {
    year: "2016",
    title: "Innovation Leadership",
    company: "Tech Consultant",
    location: "North America",
    description:
      "Expanded consulting practice across North America, specializing in digital transformation and emerging technology integration.",
    icon: "Lightbulb",
    color: "text-yellow-400",
    achievements: ["Cross-border projects", "Digital strategy", "Technology consulting"],
  },
  {
    year: "2018",
    title: "AI Integration Pioneer",
    company: "AIAA.dev Founder",
    location: "Montreal, QC",
    description:
      "Founded AI automation agency, becoming an early adopter of machine learning and artificial intelligence in creative workflows.",
    icon: "Brain",
    color: "text-primary",
    achievements: ["AI automation", "Machine learning", "Workflow optimization"],
  },
  {
    year: "2024",
    title: "Creative Technologist",
    company: "Independent Practice",
    location: "Global",
    description:
      "Established as The Creative Technologist, mastering the intersection of design, development, and AI to create intelligent experiences.",
    icon: "Zap",
    color: "text-primary",
    achievements: ["Global recognition", "AI-human collaboration", "Intelligent experiences"],
  },
];

const CareerTimeline: FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-12">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <span className="text-sm font-mono text-primary uppercase tracking-wider">Career Journey</span>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <h3 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
          Two Decades of Evolution
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          From creative foundation to AI pioneer, each milestone represents a deliberate step toward mastering the
          intersection of human creativity and technological innovation.
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-8 lg:left-1/2 lg:-translate-x-0.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className={`relative flex flex-col lg:flex-row items-start lg:items-center ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
              onMouseEnter={() => setActiveIndex(index)}
            >
              <div className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 w-4 h-4 bg-background border-2 border-primary rounded-full z-10">
                <div
                  className={`absolute inset-1 rounded-full transition-smooth ${
                    activeIndex === index ? "bg-primary glow-neon" : "bg-primary/50"
                  }`}
                />
              </div>

              <div
                className={`ml-20 lg:ml-0 lg:w-5/12 ${
                  index % 2 === 0 ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
                }`}
              >
                <div
                  className={`bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 transition-smooth hover:border-primary/30 group ${
                    activeIndex === index ? "glow-neon border-primary/50" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-primary/10 rounded-lg p-2 group-hover:bg-primary/20 transition-smooth">
                        <Icon name={milestone.icon} size={20} className={milestone.color} />
                      </div>
                      <div>
                        <div className="text-2xl font-space-grotesk font-bold text-primary">
                          {milestone.year}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-xl font-space-grotesk font-bold text-foreground mb-1">
                      {milestone.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span className="font-medium">{milestone.company}</span>
                      <div className="w-1 h-1 bg-border rounded-full" />
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={12} />
                        <span>{milestone.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  <div className="space-y-2">
                    <h5 className="text-sm font-space-grotesk font-semibold text-foreground">Key Achievements:</h5>
                    <div className="flex flex-wrap gap-2">
                      {milestone.achievements.map((achievement) => (
                        <span
                          key={achievement}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                        >
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-2xl border border-primary/20 p-8 text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-mono text-primary uppercase tracking-wider">Current Status</span>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
        </div>

        <h4 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
          Ready for Your Next Challenge
        </h4>

        <p className="text-muted-foreground max-w-lg mx-auto">
          With 20+ years of evolution from creative foundation to AI pioneer, I&apos;m positioned to tackle the most
          ambitious projects at the intersection of design, technology, and artificial intelligence.
        </p>
      </div>
    </div>
  );
};

export default CareerTimeline;
