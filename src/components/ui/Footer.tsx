'use client';

import Icon from 'components/AppIcon';

const Footer = (): JSX.Element => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center glow-neon">
              <span className="text-black font-space-grotesk font-bold text-lg">NB</span>
            </div>
            <div>
              <h3 className="font-space-grotesk font-bold text-foreground">Nicky Bruno</h3>
              <p className="text-xs text-muted-foreground">Creative Technologist</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="mailto:hello@nickybruno.ca"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              <Icon name="Mail" size={20} />
            </a>
            <a
              href="https://linkedin.com/in/nickybruno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              <Icon name="Linkedin" size={20} />
            </a>
            <a
              href="https://github.com/nickybruno"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-smooth"
            >
              <Icon name="Github" size={20} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {year} Nicky Bruno. All rights reserved. • Montreal, QC, Canada
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;