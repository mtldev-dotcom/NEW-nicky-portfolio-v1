import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const techCategories = {
    frontend: {
      title: "Frontend & Design",
      icon: "Palette",
      description: "Creating beautiful, responsive user experiences",
      technologies: [
        { name: "React", level: 95, icon: "Code" },
        { name: "Next.js", level: 90, icon: "Zap" },
        { name: "TypeScript", level: 88, icon: "FileCode" },
        { name: "Tailwind CSS", level: 95, icon: "Paintbrush" },
        { name: "Framer Motion", level: 85, icon: "Play" },
        { name: "Three.js", level: 75, icon: "Box" }
      ]
    },
    backend: {
      title: "Backend & Infrastructure",
      icon: "Server",
      description: "Building scalable, secure server-side solutions",
      technologies: [
        { name: "Node.js", level: 90, icon: "Server" },
        { name: "Python", level: 85, icon: "Code2" },
        { name: "PostgreSQL", level: 80, icon: "Database" },
        { name: "MongoDB", level: 75, icon: "HardDrive" },
        { name: "AWS", level: 85, icon: "Cloud" },
        { name: "Docker", level: 80, icon: "Package" }
      ]
    },
    ai: {
      title: "AI & Automation",
      icon: "Brain",
      description: "Integrating intelligent automation and machine learning",
      technologies: [
        { name: "OpenAI GPT", level: 90, icon: "MessageSquare" },
        { name: "TensorFlow", level: 75, icon: "Cpu" },
        { name: "Langchain", level: 85, icon: "Link" },
        { name: "Pinecone", level: 80, icon: "Search" },
        { name: "Zapier", level: 95, icon: "Zap" },
        { name: "Make.com", level: 90, icon: "Settings" }
      ]
    },
    tools: {
      title: "Tools & Workflow",
      icon: "Wrench",
      description: "Professional tools for efficient development",
      technologies: [
        { name: "Figma", level: 95, icon: "Figma" },
        { name: "Git", level: 90, icon: "GitBranch" },
        { name: "VS Code", level: 95, icon: "Code" },
        { name: "Notion", level: 85, icon: "FileText" },
        { name: "Linear", level: 80, icon: "Target" },
        { name: "Vercel", level: 90, icon: "Globe" }
      ]
    }
  };

  const categories = Object.keys(techCategories);

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories?.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`
              flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300
              ${activeCategory === category
                ? 'bg-primary text-black glow-neon' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
              }
            `}
          >
            <Icon 
              name={techCategories?.[category]?.icon} 
              size={16} 
            />
            <span>{techCategories?.[category]?.title}</span>
          </button>
        ))}
      </div>
      {/* Active Category Content */}
      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="bg-card/50 rounded-xl p-8 border border-border"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
            <Icon 
              name={techCategories?.[activeCategory]?.icon} 
              size={32} 
              className="text-primary" 
            />
          </div>
          <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-2">
            {techCategories?.[activeCategory]?.title}
          </h3>
          <p className="text-muted-foreground">
            {techCategories?.[activeCategory]?.description}
          </p>
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories?.[activeCategory]?.technologies?.map((tech, index) => (
            <motion.div
              key={tech?.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="group bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-all duration-300 hover:shadow-card"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon 
                      name={tech?.icon} 
                      size={16} 
                      className="text-primary" 
                    />
                  </div>
                  <span className="font-medium text-foreground">{tech?.name}</span>
                </div>
                <span className="text-sm text-primary font-mono">{tech?.level}%</span>
              </div>
              
              {/* Skill Level Bar */}
              <div className="w-full bg-border rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${tech?.level}%` }}
                  transition={{ 
                    duration: 1, 
                    delay: index * 0.1 + 0.5,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full glow-neon"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TechStack;