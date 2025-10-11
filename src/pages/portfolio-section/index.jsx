import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from 'components/ui/Header';
import Icon from 'components/AppIcon';
import ProjectCard from './components/ProjectCard';
import ProjectFilter from './components/ProjectFilter';
import ProjectModal from './components/ProjectModal';
import FeaturedProject from './components/FeaturedProject';
import Button from 'components/ui/Button';


const PortfolioSection = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock project data
  const projects = [
    {
      id: 1,
      title: "AIAA.dev - AI Automation Platform",
      type: "AI Platform",
      description: "Revolutionary AI automation platform that streamlines creative workflows and enhances productivity through intelligent task automation.",
      fullDescription: `AIAA.dev represents the future of creative automation, combining cutting-edge AI technology with intuitive design to create a platform that truly understands creative workflows. This project showcases the perfect fusion of artificial intelligence and human creativity, enabling professionals to automate repetitive tasks while maintaining creative control.\n\nThe platform features advanced machine learning algorithms that learn from user behavior, predictive analytics for workflow optimization, and seamless integration with popular creative tools. Built with scalability in mind, it serves thousands of creative professionals worldwide.`,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
      technologies: ["React", "Node.js", "Python", "TensorFlow", "MongoDB", "AWS"],
      techIcons: {
        "React": "Code",
        "Node.js": "Server",
        "Python": "Bot",
        "TensorFlow": "Brain",
        "MongoDB": "Database",
        "AWS": "Cloud"
      },
      year: "2024",
      client: "AIAA Labs",
      industry: "Technology",
      duration: "8 months",
      featured: true,
      metrics: [
        { label: "Users", value: "10K+" },
        { label: "Automation", value: "85%" },
        { label: "Time Saved", value: "40hrs/week" }
      ],
      features: [
        "Intelligent workflow automation",
        "Real-time collaboration tools",
        "Advanced analytics dashboard",
        "Custom AI model training",
        "API integrations",
        "Multi-platform support"
      ],
      process: [
        {
          title: "Research & Discovery",
          description: "Conducted extensive user research and competitive analysis to understand pain points in creative workflows."
        },
        {
          title: "AI Architecture Design",
          description: "Designed scalable AI architecture using TensorFlow and custom neural networks for task automation."
        },
        {
          title: "Frontend Development",
          description: "Built responsive React interface with real-time updates and intuitive user experience."
        },
        {
          title: "Backend Integration",
          description: "Developed robust Node.js backend with MongoDB for data management and AWS for scalability."
        },
        {
          title: "Testing & Optimization",
          description: "Implemented comprehensive testing suite and performance optimization for production deployment."
        }
      ],
      testimonial: {
        quote: "AIAA.dev has transformed our creative process. What used to take hours now happens automatically, allowing our team to focus on what matters most - creativity.",
        author: "Sarah Chen",
        role: "Creative Director, Design Studio"
      },
      liveUrl: "https://aiaa.dev",
      githubUrl: "https://github.com/nickybruno/aiaa"
    },
    {
      id: 2,
      title: "Montreal Tech Hub",
      type: "Web Platform",
      description: "Community platform connecting Montreal's tech ecosystem with events, networking, and collaboration tools.",
      fullDescription: `Montreal Tech Hub serves as the digital heart of Montreal's thriving technology community. This platform brings together developers, designers, entrepreneurs, and tech enthusiasts in a unified space for collaboration and growth.\n\nThe project features event management, professional networking, job board integration, and community forums. Built with modern web technologies, it provides a seamless experience across all devices while maintaining the bilingual nature essential to Montreal's culture.`,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
      technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind"],
      techIcons: {
        "Next.js": "Code",
        "TypeScript": "FileText",
        "Prisma": "Database",
        "PostgreSQL": "Server",
        "Tailwind": "Palette"
      },
      year: "2024",
      client: "Montreal Tech Community",
      industry: "Community",
      duration: "6 months",
      featured: false,
      metrics: [
        { label: "Members", value: "2.5K+" },
        { label: "Events", value: "150+" },
        { label: "Engagement", value: "78%" }
      ],
      features: [
        "Event management system",
        "Professional networking",
        "Job board integration",
        "Bilingual support",
        "Community forums",
        "Mobile-first design"
      ],
      process: [
        {
          title: "Community Research",
          description: "Analyzed Montreal\'s tech community needs through surveys and interviews with key stakeholders."
        },
        {
          title: "Platform Architecture",
          description: "Designed scalable architecture using Next.js and PostgreSQL for optimal performance."
        },
        {
          title: "UI/UX Design",
          description: "Created intuitive interface design that reflects Montreal\'s bilingual and multicultural identity."
        },
        {
          title: "Development & Testing",
          description: "Built responsive platform with comprehensive testing across different devices and browsers."
        }
      ],
      testimonial: {
        quote: "This platform has become essential for Montreal's tech community. It's where we connect, collaborate, and grow together.",
        author: "Marc Dubois",
        role: "Tech Entrepreneur"
      },
      liveUrl: "https://montrealtechhub.com"
    },
    {
      id: 3,
      title: "EcoTrack Analytics",
      type: "Data Platform",
      description: "Sustainability analytics platform helping businesses track and optimize their environmental impact.",
      fullDescription: `EcoTrack Analytics empowers businesses to make data-driven decisions about their environmental impact. The platform combines IoT sensors, machine learning, and beautiful visualizations to provide actionable insights for sustainability initiatives.\n\nFeaturing real-time monitoring, predictive analytics, and comprehensive reporting, EcoTrack helps organizations reduce their carbon footprint while maintaining operational efficiency. The platform integrates with existing business systems and provides customizable dashboards for different stakeholder needs.`,
      image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?w=800&h=600&fit=crop",
      technologies: ["Vue.js", "D3.js", "Python", "FastAPI", "InfluxDB"],
      techIcons: {
        "Vue.js": "Code",
        "D3.js": "BarChart",
        "Python": "Bot",
        "FastAPI": "Zap",
        "InfluxDB": "Database"
      },
      year: "2023",
      client: "GreenTech Solutions",
      industry: "Sustainability",
      duration: "10 months",
      featured: false,
      metrics: [
        { label: "CO2 Reduced", value: "25%" },
        { label: "Companies", value: "50+" },
        { label: "Data Points", value: "1M+" }
      ],
      features: [
        "Real-time monitoring",
        "Predictive analytics",
        "Custom dashboards",
        "IoT integration",
        "Automated reporting",
        "Carbon footprint tracking"
      ],
      process: [
        {
          title: "Sustainability Research",
          description: "Researched environmental impact metrics and sustainability best practices across industries."
        },
        {
          title: "Data Architecture",
          description: "Designed time-series database architecture using InfluxDB for handling large volumes of sensor data."
        },
        {
          title: "Visualization Development",
          description: "Created interactive data visualizations using D3.js for complex environmental data representation."
        },
        {
          title: "API Development",
          description: "Built high-performance FastAPI backend for real-time data processing and analytics."
        }
      ],
      testimonial: {
        quote: "EcoTrack has given us unprecedented visibility into our environmental impact. We\'ve reduced our carbon footprint by 25% in the first year.",
        author: "Jennifer Walsh",
        role: "Sustainability Director"
      }
    },
    {
      id: 4,
      title: "FinanceFlow Mobile",
      type: "Mobile App",
      description: "Personal finance management app with AI-powered insights and automated budgeting features.",
      fullDescription: `FinanceFlow Mobile revolutionizes personal finance management by combining intuitive design with powerful AI capabilities. The app learns from user spending patterns to provide personalized insights and automated budgeting recommendations.\n\nBuilt with React Native for cross-platform compatibility, the app features bank integration, expense categorization, goal tracking, and investment portfolio management. Advanced security measures ensure user financial data remains protected while providing seamless user experience.`,
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=800&h=600&fit=crop",
      technologies: ["React Native", "Redux", "Node.js", "PostgreSQL", "Stripe"],
      techIcons: {
        "React Native": "Smartphone",
        "Redux": "RefreshCw",
        "Node.js": "Server",
        "PostgreSQL": "Database",
        "Stripe": "CreditCard"
      },
      year: "2023",
      client: "FinTech Startup",
      industry: "Financial Services",
      duration: "12 months",
      featured: false,
      metrics: [
        { label: "Downloads", value: "50K+" },
        { label: "Savings", value: "$2M+" },
        { label: "Rating", value: "4.8★" }
      ],
      features: [
        "AI-powered insights",
        "Automated budgeting",
        "Bank integration",
        "Investment tracking",
        "Goal management",
        "Expense categorization"
      ],
      process: [
        {
          title: "User Experience Research",
          description: "Conducted extensive UX research to understand personal finance management pain points."
        },
        {
          title: "Security Architecture",
          description: "Implemented bank-level security measures including encryption and secure authentication."
        },
        {
          title: "AI Model Development",
          description: "Developed machine learning models for spending pattern analysis and budget recommendations."
        },
        {
          title: "Cross-Platform Development",
          description: "Built native-quality app using React Native for iOS and Android platforms."
        }
      ],
      testimonial: {
        quote: "FinanceFlow has completely changed how I manage my money. The AI insights are incredibly accurate and helpful.",
        author: "David Kim",
        role: "App User"
      }
    },
    {
      id: 5,
      title: "CreativeStudio Pro",
      type: "Design Tool",
      description: "Collaborative design platform with real-time editing, version control, and AI-assisted design features.",
      fullDescription: `CreativeStudio Pro is a next-generation design platform that combines the power of traditional design tools with modern collaboration features and AI assistance. Built for creative teams, it enables seamless collaboration while maintaining design quality and consistency.\n\nThe platform features real-time collaborative editing, intelligent design suggestions, automated asset management, and comprehensive version control. Advanced AI algorithms help designers with layout suggestions, color palette generation, and design system maintenance.`,
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop",
      technologies: ["React", "WebGL", "Socket.io", "Redis", "AWS S3"],
      techIcons: {
        "React": "Code",
        "WebGL": "Monitor",
        "Socket.io": "Wifi",
        "Redis": "Zap",
        "AWS S3": "Cloud"
      },
      year: "2024",
      client: "Design Agency",
      industry: "Creative Tools",
      duration: "14 months",
      featured: false,
      metrics: [
        { label: "Teams", value: "500+" },
        { label: "Projects", value: "10K+" },
        { label: "Efficiency", value: "+60%" }
      ],
      features: [
        "Real-time collaboration",
        "AI design assistance",
        "Version control",
        "Asset management",
        "Design systems",
        "Export automation"
      ],
      process: [
        {
          title: "Design Tool Analysis",
          description: "Analyzed existing design tools to identify gaps and opportunities for innovation."
        },
        {
          title: "Real-time Architecture",
          description: "Built real-time collaboration system using WebSocket technology and operational transforms."
        },
        {
          title: "AI Integration",
          description: "Integrated machine learning models for design assistance and automated suggestions."
        },
        {
          title: "Performance Optimization",
          description: "Optimized WebGL rendering pipeline for smooth performance with complex designs."
        }
      ],
      testimonial: {
        quote: "CreativeStudio Pro has transformed our design workflow. The real-time collaboration and AI features are game-changers.",
        author: "Lisa Rodriguez",
        role: "Design Team Lead"
      }
    },
    {
      id: 6,
      title: "HealthConnect Platform",
      type: "Healthcare",
      description: "Telemedicine platform connecting patients with healthcare providers through secure video consultations.",
      fullDescription: `HealthConnect Platform addresses the growing need for accessible healthcare by providing a secure, user-friendly telemedicine solution. The platform enables seamless connections between patients and healthcare providers while maintaining the highest standards of medical data security.\n\nFeaturing appointment scheduling, secure video consultations, electronic health records, prescription management, and payment processing, HealthConnect provides a comprehensive healthcare experience. The platform is HIPAA compliant and includes advanced features like AI-powered symptom assessment and health monitoring integration.`,
      image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?w=800&h=600&fit=crop",
      technologies: ["Angular", "WebRTC", "Express.js", "MongoDB", "Stripe"],
      techIcons: {
        "Angular": "Code",
        "WebRTC": "Video",
        "Express.js": "Server",
        "MongoDB": "Database",
        "Stripe": "CreditCard"
      },
      year: "2023",
      client: "Healthcare Network",
      industry: "Healthcare",
      duration: "16 months",
      featured: false,
      metrics: [
        { label: "Consultations", value: "25K+" },
        { label: "Providers", value: "200+" },
        { label: "Satisfaction", value: "96%" }
      ],
      features: [
        "Secure video calls",
        "Appointment scheduling",
        "Electronic health records",
        "Prescription management",
        "Payment processing",
        "HIPAA compliance"
      ],
      process: [
        {
          title: "Healthcare Compliance Research",
          description: "Researched HIPAA requirements and healthcare industry standards for secure platform development."
        },
        {
          title: "Security Implementation",
          description: "Implemented end-to-end encryption and secure authentication for patient data protection."
        },
        {
          title: "Video Infrastructure",
          description: "Built scalable video consultation system using WebRTC for high-quality, low-latency communication."
        },
        {
          title: "Integration Testing",
          description: "Conducted extensive testing with healthcare providers to ensure platform meets clinical needs."
        }
      ],
      testimonial: {
        quote: "HealthConnect has made healthcare more accessible for our patients. The platform is intuitive and secure.",
        author: "Dr. Michael Thompson",
        role: "Primary Care Physician"
      }
    }
  ];

  // Filter configuration
  const filters = [
    { id: 'all', label: 'All Projects', count: projects?.length },
    { id: 'AI Platform', label: 'AI & Automation', count: projects?.filter(p => p?.type === 'AI Platform')?.length },
    { id: 'Web Platform', label: 'Web Platforms', count: projects?.filter(p => p?.type === 'Web Platform')?.length },
    { id: 'Mobile App', label: 'Mobile Apps', count: projects?.filter(p => p?.type === 'Mobile App')?.length },
    { id: 'Design Tool', label: 'Design Tools', count: projects?.filter(p => p?.type === 'Design Tool')?.length },
    { id: 'Healthcare', label: 'Healthcare', count: projects?.filter(p => p?.type === 'Healthcare')?.length }
  ];

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects?.filter(project => project?.type === activeFilter);
  }, [activeFilter, projects]);

  // Featured project
  const featuredProject = projects?.find(p => p?.featured);

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          
          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center space-x-3 mb-6"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Icon name="FolderOpen" size={24} className="text-primary" />
                </div>
                <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full border border-primary/30">
                  Portfolio Showcase
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl lg:text-6xl font-space-grotesk font-bold text-foreground mb-6"
              >
                Work That Speaks
                <span className="block text-primary">For Itself</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed mb-8"
              >
                Explore a curated collection of projects that demonstrate the fusion of design, 
                development, and AI innovation. Each piece tells a story of creative problem-solving 
                and technical excellence.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground"
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Code" size={16} className="text-primary" />
                  <span>20+ Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-primary" />
                  <span>50+ Clients</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Industry Recognition</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Icon name="Sparkles" size={24} className="text-primary" />
          </motion.div>
          
          <motion.div
            animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 right-10 w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center backdrop-blur-sm"
          >
            <Icon name="Zap" size={20} className="text-warning" />
          </motion.div>
        </section>

        {/* Featured Project */}
        {featuredProject && (
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <FeaturedProject 
                project={featuredProject} 
                onViewDetails={handleViewDetails}
              />
            </div>
          </section>
        )}

        {/* Projects Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
                All Projects
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Filter by technology, industry, or project type to explore specific areas of expertise.
              </p>
            </div>

            {/* Filter Buttons */}
            <ProjectFilter 
              filters={filters}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />

            {/* Projects Grid */}
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects?.filter(project => !project?.featured)?.map((project, index) => (
                  <ProjectCard
                    key={project?.id}
                    project={project}
                    index={index}
                    onViewDetails={handleViewDetails}
                  />
                ))}
            </motion.div>

            {/* Empty State */}
            {filteredProjects?.filter(p => !p?.featured)?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Search" size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-xl font-space-grotesk font-bold text-foreground mb-2">
                  No projects found
                </h3>
                <p className="text-muted-foreground">
                  Try adjusting your filter to see more projects.
                </p>
              </motion.div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-muted/30 via-transparent to-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-6">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Let's collaborate on your next project. Whether it's AI automation, 
                web development, or creative technology, I'm here to bring your vision to life.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                    className="glow-neon hover:glow-neon-active"
                  >
                    Start a Project
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="lg"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Download Portfolio
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default PortfolioSection;
