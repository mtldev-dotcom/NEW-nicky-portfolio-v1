import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import TestimonialCard from './components/TestimonialCard';
import VideoTestimonial from './components/VideoTestimonial';
import IndustryBadges from './components/IndustryBadges';
import TestimonialCarousel from './components/TestimonialCarousel';
import ClientLogos from './components/ClientLogos';
import LinkedInRecommendations from './components/LinkedInRecommendations';

const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState('written');
  const [selectedTestimonial, setSelectedTestimonial] = useState(0);

  // Mock testimonials data
  const writtenTestimonials = [
    {
      id: 1,
      name: "Alexandra Thompson",
      role: "CEO",
      company: "InnovateTech Solutions",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      content: `Nicky transformed our entire digital presence with his unique blend of creative vision and technical expertise. His AI automation solutions didn't just improve our workflow—they revolutionized how we think about creative technology. The results speak for themselves: 300% increase in efficiency and client satisfaction through the roof.`,
      rating: 5,
      projectType: "AI Automation Platform",
      audience: "business-leader"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Creative Director",
      company: "Pixel Perfect Agency",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=100&h=100&fit=crop",
      content: `Working with Nicky was like having a creative partner who speaks fluent code. He took our wildest design concepts and made them reality with elegant, performant solutions. His understanding of both design principles and modern web technologies is unmatched in Montreal's creative scene.`,
      rating: 5,
      projectType: "Interactive Web Experience",
      audience: "creative-agency"
    },
    {
      id: 3,
      name: "Sarah Rodriguez",
      role: "CTO",
      company: "StartupLab Montreal",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=100&h=100&fit=crop",
      content: `Nicky's versatility and speed are exactly what our fast-moving startup needed. He delivered a complete design system and React application in record time without compromising on quality. His expertise with modern tech stacks and AI integration gave us a competitive edge we didn't know we needed.`,
      rating: 5,
      projectType: "Full-Stack Development",
      audience: "tech-startup"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      role: "Research Director",
      company: "Montreal AI Institute",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop",
      content: `Nicky's work on our AIAA.dev platform demonstrates his deep understanding of AI-human collaboration. He doesn't just implement features—he anticipates needs and creates intelligent solutions that evolve with user behavior. His contribution to Montreal's AI community is invaluable.`,
      rating: 5,
      projectType: "AI Platform Development",
      audience: "ai-enthusiast"
    }
  ];

  const videoTestimonials = [
    {
      id: 1,
      name: "Michael Foster",
      role: "Founder",
      company: "TechFlow Dynamics",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
      duration: "2:34",
      preview: "Nicky's AI automation solutions transformed our entire workflow, delivering results that exceeded our wildest expectations..."
    },
    {
      id: 2,
      name: "Lisa Park",
      role: "Design Lead",
      company: "Creative Collective",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=450&fit=crop",
      duration: "1:47",
      preview: "The collaboration with Nicky was seamless. His technical skills matched our creative ambitions perfectly..."
    },
    {
      id: 3,
      name: "David Kumar",
      role: "Product Manager",
      company: "Innovation Labs",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      thumbnail: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&h=450&fit=crop",
      duration: "3:12",
      preview: "Nicky\'s expertise in React and AI integration gave us the competitive edge we needed in the market..."
    }
  ];

  const tabs = [
    { id: 'written', label: 'Client Reviews', icon: 'MessageSquare', count: writtenTestimonials?.length },
    { id: 'video', label: 'Video Stories', icon: 'Play', count: videoTestimonials?.length },
    { id: 'recognition', label: 'Recognition', icon: 'Award', count: 6 },
    { id: 'linkedin', label: 'LinkedIn', icon: 'Linkedin', count: 3 }
  ];

  // Scroll animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center space-y-6 mb-16"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Icon name="Users" size={16} color="var(--color-primary)" />
                <span className="text-primary text-sm font-medium">Social Proof</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-foreground">
                Trusted by{' '}
                <span className="text-primary glow-neon">Innovators</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                From startups to enterprises, creative agencies to AI labs—discover why industry leaders choose Nicky Bruno for their most ambitious creative technology projects.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
                <Icon name="Star" size={16} color="var(--color-primary)" className="fill-current" />
                <span className="text-foreground font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
                <Icon name="Users" size={16} color="var(--color-primary)" />
                <span className="text-foreground font-medium">50+ Projects</span>
              </div>
              <div className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/50 border border-border">
                <Icon name="MapPin" size={16} color="var(--color-primary)" />
                <span className="text-foreground font-medium">Montreal & Global</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex flex-wrap justify-center gap-2 p-2 bg-muted/20 rounded-xl border border-border">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-smooth ${
                    activeTab === tab?.id
                      ? 'bg-primary text-black glow-neon' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeTab === tab?.id ? 'bg-black/20' : 'bg-muted/50'
                  }`}>
                    {tab?.count}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div variants={itemVariants}>
            {activeTab === 'written' && (
              <div className="space-y-12">
                {/* Featured Testimonial Carousel */}
                <div className="max-w-4xl mx-auto">
                  <TestimonialCarousel testimonials={writtenTestimonials} />
                </div>

                {/* All Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {writtenTestimonials?.map((testimonial, index) => (
                    <TestimonialCard
                      key={testimonial?.id}
                      testimonial={testimonial}
                      isActive={index === selectedTestimonial}
                      onClick={() => setSelectedTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {videoTestimonials?.map((testimonial) => (
                    <VideoTestimonial key={testimonial?.id} testimonial={testimonial} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'recognition' && <IndustryBadges />}

            {activeTab === 'linkedin' && <LinkedInRecommendations />}
          </motion.div>
        </div>
      </section>
      {/* Client Logos Section */}
      <section className="py-16 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto">
          <ClientLogos />
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 px-6 lg:px-8 bg-gradient-to-r from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground">
              Ready to Join These Success Stories?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's create something extraordinary together. Montreal-made innovation for global impact.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="default"
              size="lg"
              className="glow-neon hover:glow-neon-active"
              iconName="Zap"
              iconPosition="left"
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

          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>24h Response Time</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={16} />
              <span>NDA Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} />
              <span>Remote Friendly</span>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-8 px-6 lg:px-8 border-t border-border/50">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date()?.getFullYear()} Nicky Bruno. Creative Technologist based in Montreal, Canada.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TestimonialsSection;
