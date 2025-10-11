'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import CapabilityStats from './CapabilityStats';
import ProcessTimeline from './ProcessTimeline';
import ServiceCard from './ServiceCard';
import TechStack from './TechStack';

const ServicesSection = () => {
  const [hoveredService, setHoveredService] = useState(null);
  const [activeTab, setActiveTab] = useState('services');

  // Mock services data
  const services = [
    {
      icon: "Palette",
      title: "Creative Design & Branding",
      description: "Crafting compelling visual identities that resonate with your audience and drive engagement through strategic design thinking.",
      level: "Expert",
      technologies: ["Figma", "Adobe Creative Suite", "Sketch", "Principle", "InVision", "Framer"],
      capabilities: [
        "Brand identity development and visual strategy",
        "UI/UX design for web and mobile applications",
        "Design system creation and maintenance",
        "User research and persona development",
        "Prototyping and interactive mockups",
        "Accessibility-first design principles"
      ],
      certifications: ["Adobe Certified Expert", "Google UX Design"],
      caseStudy: {
        title: "Montreal Tech Startup Rebrand",
        preview: "Complete visual identity overhaul resulting in 300% increase in user engagement and successful Series A funding."
      }
    },
    {
      icon: "Code",
      title: "Full-Stack Development",
      description: "Building robust, scalable web applications using modern technologies and best practices for optimal performance and user experience.",
      level: "Expert",
      technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
      capabilities: [
        "Frontend development with React and Next.js",
        "Backend API development and database design",
        "Cloud infrastructure setup and deployment",
        "Performance optimization and SEO",
        "Third-party integrations and APIs",
        "Testing and quality assurance"
      ],
      certifications: ["AWS Solutions Architect", "React Professional"],
      caseStudy: {
        title: "E-commerce Platform Rebuild",
        preview: "Complete platform migration resulting in 50% faster load times and 25% increase in conversion rates."
      }
    },
    {
      icon: "Brain",
      title: "AI Integration & Automation",
      description: "Implementing intelligent automation solutions that streamline workflows and enhance user experiences through cutting-edge AI technologies.",
      level: "Advanced",
      technologies: ["OpenAI GPT", "Langchain", "Python", "TensorFlow", "Zapier", "Make.com"],
      capabilities: [
        "Custom AI model integration and fine-tuning",
        "Workflow automation and process optimization",
        "Chatbot development and conversational AI",
        "Data analysis and predictive modeling",
        "Natural language processing solutions",
        "AI-powered content generation systems"
      ],
      certifications: ["OpenAI API Specialist", "Google AI Certification"],
      caseStudy: {
        title: "Customer Service AI Assistant",
        preview: "Deployed intelligent chatbot reducing support tickets by 60% while maintaining 95% customer satisfaction."
      }
    },
    {
      icon: "Zap",
      title: "Digital Strategy & Consulting",
      description: "Providing strategic guidance on digital transformation, technology adoption, and growth optimization for modern businesses.",
      level: "Expert",
      technologies: ["Analytics", "SEO Tools", "CRM Systems", "Marketing Automation", "A/B Testing", "Conversion Optimization"],
      capabilities: [
        "Digital transformation roadmap development",
        "Technology stack evaluation and recommendations",
        "Growth hacking and conversion optimization",
        "SEO strategy and content marketing",
        "Analytics setup and performance monitoring",
        "Team training and knowledge transfer"
      ],
      certifications: ["Google Analytics Certified", "HubSpot Strategy"],
      caseStudy: {
        title: "SaaS Growth Strategy Implementation",
        preview: "Strategic overhaul leading to 200% increase in organic traffic and 150% improvement in lead generation."
      }
    }
  ];

  const handleCaseStudyClick = (caseStudy) => {
    // Mock case study modal or navigation
    console.log('Opening case study:', caseStudy?.title);
  };

  const tabs = [
    { id: 'services', label: 'Core Services', icon: 'Briefcase' },
    { id: 'process', label: 'My Process', icon: 'GitBranch' },
    { id: 'tech', label: 'Tech Stack', icon: 'Code' },
    { id: 'stats', label: 'Experience', icon: 'TrendingUp' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 glow-neon">
              <Icon name="Sparkles" size={16} />
              <span>Capability Showcase</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground mb-6 leading-tight">
              The Four Pillars of
              <span className="block text-primary text-glow">Creative Technology</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              Where design, code, and AI meet creativity. I don't just build websites—I craft intelligent experiences that think, adapt, and evolve. The future of creative work is here, and it's beautifully human.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="glow-neon hover:glow-neon-active"
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
              >
                Watch Process Video
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                  ${activeTab === tab?.id
                    ? 'bg-primary text-black glow-neon' :'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                `}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Dynamic Content Based on Active Tab */}
      <section className="px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  Comprehensive Creative Technology Services
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From concept to deployment, I provide end-to-end solutions that bridge the gap between creative vision and technical execution.
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {services?.map((service, index) => (
                  <ServiceCard
                    key={index}
                    service={service}
                    index={index}
                    onHover={setHoveredService}
                    isHovered={hoveredService === index}
                    onCaseStudyClick={handleCaseStudyClick}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'process' && (
            <motion.div
              key="process"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  My Proven Development Process
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  A systematic approach that ensures every project delivers exceptional results through strategic planning, creative execution, and intelligent optimization.
                </p>
              </div>
              
              <ProcessTimeline />
            </motion.div>
          )}

          {activeTab === 'tech' && (
            <motion.div
              key="tech"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  Cutting-Edge Technology Stack
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Leveraging the latest tools and technologies to build scalable, performant, and future-ready solutions.
                </p>
              </div>
              
              <TechStack />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl font-space-grotesk font-bold text-foreground mb-4">
                  Two Decades of Creative Excellence
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Experience and expertise built through years of successful projects and satisfied clients across diverse industries.
                </p>
              </div>
              
              <CapabilityStats />
              
              {/* Additional Experience Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mt-16 bg-card/50 rounded-xl p-8 border border-border"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-space-grotesk font-bold text-foreground mb-4">
                    Industry Recognition & Expertise
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="Award" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Industry Awards</h4>
                    <p className="text-sm text-muted-foreground">
                      Recognized for excellence in web design and development by leading industry organizations.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="Users" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Community Leader</h4>
                    <p className="text-sm text-muted-foreground">
                      Active contributor to Montreal's tech community through mentoring and knowledge sharing.
                    </p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center glow-neon">
                      <Icon name="BookOpen" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-medium text-foreground mb-2">Continuous Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Constantly evolving skills to stay ahead of emerging technologies and industry trends.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
      {/* CTA Section */}
      <section className="px-6 lg:px-8 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-2xl p-8 lg:p-12 text-center border border-primary/20 glow-neon"
          >
            <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
              Ready to Transform Your Vision?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Whether you need design, development, or AI integration, I'm here to bring your ideas to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                iconName="MessageSquare"
                iconPosition="left"
                className="glow-neon hover:glow-neon-active"
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule Consultation
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-primary" />
                <span>Free 30-min consultation</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-primary" />
                <span>100% satisfaction guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServicesSection;
