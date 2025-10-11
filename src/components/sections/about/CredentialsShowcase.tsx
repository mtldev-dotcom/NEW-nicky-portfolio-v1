import React, { type FC } from "react";
import Icon, { type IconName } from "components/AppIcon";

interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: IconName;
  color: string;
}

interface SpeakingEngagement {
  event: string;
  topic: string;
  location: string;
  attendees: string;
  icon: IconName;
}

interface Publication {
  title: string;
  publication: string;
  date: string;
  reads: string;
  icon: IconName;
}

interface OpenSourceProject {
  project: string;
  description: string;
  stars: string;
  language: string;
  icon: IconName;
}

const certifications: Certification[] = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2023", icon: "Cloud", color: "text-orange-400" },
  { title: "Google AI/ML Certification", issuer: "Google Cloud", year: "2022", icon: "Brain", color: "text-blue-400" },
  { title: "React Advanced Patterns", issuer: "Meta", year: "2023", icon: "Code", color: "text-cyan-400" },
  { title: "UX Design Professional", issuer: "Adobe", year: "2021", icon: "Palette", color: "text-purple-400" },
];

const speaking: SpeakingEngagement[] = [
  { event: "AI & Design Summit 2024", topic: "The Future of Creative AI", location: "Toronto, ON", attendees: "500+", icon: "Mic" },
  { event: "Montreal Tech Conference", topic: "Bridging Design & Development", location: "Montreal, QC", attendees: "300+", icon: "Users" },
  { event: "React Montreal Meetup", topic: "Performance Optimization", location: "Montreal, QC", attendees: "150+", icon: "Zap" },
];

const publications: Publication[] = [
  { title: "AI-Driven Design Systems", publication: "Smashing Magazine", date: "March 2024", reads: "15K+", icon: "BookOpen" },
  { title: "The Creative Technologist Manifesto", publication: "Medium", date: "January 2024", reads: "8K+", icon: "FileText" },
  { title: "Montreal's Tech Renaissance", publication: "TechCrunch", date: "November 2023", reads: "12K+", icon: "Newspaper" },
];

const openSource: OpenSourceProject[] = [
  { project: "react-ai-components", description: "AI-powered React component library", stars: "2.3K", language: "TypeScript", icon: "Github" },
  { project: "design-system-ai", description: "Automated design system generator", stars: "1.8K", language: "JavaScript", icon: "Palette" },
  { project: "montreal-tech-map", description: "Interactive Montreal tech ecosystem", stars: "950", language: "React", icon: "Map" },
];

const CredentialsShowcase: FC = () => {
  return (
    <div className="space-y-16">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-12 h-1 bg-primary rounded-full" />
          <span className="text-sm font-mono text-primary uppercase tracking-wider">Credentials & Recognition</span>
          <div className="w-12 h-1 bg-primary rounded-full" />
        </div>

        <h3 className="text-3xl lg:text-4xl font-space-grotesk font-bold text-foreground mb-4">
          Industry Recognition
        </h3>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          Continuous learning and community contribution through certifications, speaking engagements, publications, and open source projects.
        </p>
      </div>

      <div className="space-y-8">
        <h4 className="text-2xl font-space-grotesk font-bold text-foreground text-center">
          Professional Certifications
        </h4>

        <div className="grid lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={cert.icon} size={20} className={cert.color} />
                </div>

                <div className="flex-1 space-y-2">
                  <h5 className="font-space-grotesk font-semibold text-foreground text-sm">
                    {cert.title}
                  </h5>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                  <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                    {cert.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-2xl font-space-grotesk font-bold text-foreground text-center">
          Speaking Engagements
        </h4>

        <div className="grid lg:grid-cols-3 gap-6">
          {speaking.map((event) => (
            <div
              key={event.event}
              className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={event.icon} size={20} className="text-primary" />
                </div>

                <div className="flex-1 space-y-2">
                  <h5 className="font-space-grotesk font-semibold text-foreground">
                    {event.event}
                  </h5>
                  <p className="text-sm text-muted-foreground">{event.topic}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="MapPin" size={12} />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={12} />
                      <span>{event.attendees}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-2xl font-space-grotesk font-bold text-foreground text-center">
          Industry Publications
        </h4>

        <div className="grid lg:grid-cols-3 gap-6">
          {publications.map((pub) => (
            <div
              key={pub.title}
              className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                  <Icon name={pub.icon} size={20} className="text-primary" />
                </div>

                <div className="flex-1 space-y-2">
                  <h5 className="font-space-grotesk font-semibold text-foreground text-sm">
                    {pub.title}
                  </h5>
                  <p className="text-sm text-muted-foreground">{pub.publication}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{pub.date}</span>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={12} />
                      <span>{pub.reads} reads</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <h4 className="text-2xl font-space-grotesk font-bold text-foreground text-center">
          Open Source Contributions
        </h4>

        <div className="grid lg:grid-cols-3 gap-6">
          {openSource.map((project) => (
            <div
              key={project.project}
              className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-6 hover:border-primary/30 transition-smooth group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="bg-primary/10 rounded-lg p-3 group-hover:bg-primary/20 transition-smooth">
                    <Icon name={project.icon} size={20} className="text-primary" />
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Star" size={12} />
                    <span>{project.stars}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-space-grotesk font-semibold text-foreground mb-2">
                    {project.project}
                  </h5>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <span className="text-xs text-primary font-mono bg-primary/10 px-2 py-1 rounded">
                    {project.language}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 to-transparent backdrop-blur-sm rounded-2xl border border-primary/20 p-8 text-center">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Award" size={24} className="text-primary" />
            <h4 className="text-2xl font-space-grotesk font-bold text-foreground">
              Community Impact
            </h4>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="text-3xl font-space-grotesk font-bold text-primary">50K+</div>
              <p className="text-sm text-muted-foreground">Article Readers</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-space-grotesk font-bold text-primary">5K+</div>
              <p className="text-sm text-muted-foreground">GitHub Stars</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-space-grotesk font-bold text-primary">1K+</div>
              <p className="text-sm text-muted-foreground">Conference Attendees</p>
            </div>
          </div>

          <p className="text-muted-foreground max-w-lg mx-auto">
            Committed to sharing knowledge and advancing the creative technology community through education, open source, and thought leadership.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CredentialsShowcase;
