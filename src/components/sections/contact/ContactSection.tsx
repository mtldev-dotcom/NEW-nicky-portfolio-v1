'use client';

import { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import Button from 'components/ui/Button';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';
import FAQSection from './FAQSection';
import LocationMap from './LocationMap';
import ProjectBrief from './ProjectBrief';

const MotionDiv = (props: any) => <motion.div {...props} />;

const ContactSection = () => {

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        
        {/* Floating Elements */}
        <MotionDiv
          variants={floatingVariants}
          animate="animate"
          className="absolute top-32 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
        />
        <MotionDiv
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '2s' }}
          className="absolute top-48 right-16 w-32 h-32 bg-primary/5 rounded-full blur-2xl"
        />
        <MotionDiv
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '4s' }}
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-primary/8 rounded-full blur-xl"
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <MotionDiv
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Icon name="Zap" size={16} className="text-primary" />
              <span className="text-primary font-medium text-sm">
                Ready to Start Your Project?
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-space-grotesk font-bold text-foreground mb-6">
              Let's Create Something
              <span className="block text-primary glow-neon">
                Extraordinary
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Whether you're looking to build a cutting-edge web application, integrate AI into your workflow, 
              or create a digital experience that stands out—I'm here to help bring your vision to life.
            </p>
          </MotionDiv>

          {/* Quick Contact Stats */}
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-neon">
                <Icon name="Clock" size={24} className="text-primary" />
              </div>
              <h3 className="font-space-grotesk font-bold text-foreground mb-2">
                24 Hour Response
              </h3>
              <p className="text-muted-foreground text-sm">
                Quick turnaround on all inquiries
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-neon">
                <Icon name="Globe" size={24} className="text-primary" />
              </div>
              <h3 className="font-space-grotesk font-bold text-foreground mb-2">
                Global Reach
              </h3>
              <p className="text-muted-foreground text-sm">
                Working with clients worldwide
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 glow-neon">
                <Icon name="Shield" size={24} className="text-primary" />
              </div>
              <h3 className="font-space-grotesk font-bold text-foreground mb-2">
                Confidential
              </h3>
              <p className="text-muted-foreground text-sm">
                All inquiries are secure & private
              </p>
            </div>
          </MotionDiv>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <MotionDiv
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Contact Form & Info Grid */}
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <ContactForm />
              </div>
              <div className="lg:col-span-1">
                <ContactInfo />
              </div>
            </MotionDiv>

            {/* Project Brief Questionnaire */}
            <MotionDiv variants={itemVariants}>
              <ProjectBrief />
            </MotionDiv>

            {/* Location & FAQ Grid */}
            <MotionDiv variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <LocationMap />
              <FAQSection />
            </MotionDiv>

            {/* Call to Action */}
            <MotionDiv
              variants={itemVariants}
              className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12 text-center"
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-space-grotesk font-bold text-foreground mb-6">
                  Ready to Transform Your Digital Presence?
                </h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Join the growing list of businesses and creators who've elevated their digital presence 
                  with cutting-edge design, development, and AI integration.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="glow-neon hover:glow-neon-active"
                  >
                    Start a Conversation
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
                
                <div className="mt-8 pt-8 border-t border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    Based in Montreal • Serving clients globally • Available for remote & on-site projects
                  </p>
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </section>
    </div>
  );
};

export default ContactSection;
