import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  return (
    <div 
      className={`relative p-8 rounded-xl border transition-smooth cursor-pointer magnetic-hover ${
        isActive 
          ? 'bg-card border-primary/30 glow-neon' :'bg-card/50 border-border hover:border-primary/20 hover:bg-card/80'
      }`}
      onClick={onClick}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 left-8">
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Quote" size={16} color="black" />
        </div>
      </div>
      {/* Content */}
      <div className="space-y-6">
        {/* Testimonial Text */}
        <blockquote className="text-foreground font-inter leading-relaxed text-lg">
          "{testimonial?.content}"
        </blockquote>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon 
              key={i}
              name="Star" 
              size={16} 
              color={i < testimonial?.rating ? "var(--color-primary)" : "var(--color-muted-foreground)"}
              className={i < testimonial?.rating ? "fill-current" : ""}
            />
          ))}
        </div>

        {/* Client Info */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={testimonial?.avatar}
              alt={testimonial?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-space-grotesk font-semibold text-foreground">
              {testimonial?.name}
            </h4>
            <p className="text-muted-foreground text-sm">
              {testimonial?.role} at {testimonial?.company}
            </p>
          </div>

          {/* Company Logo */}
          {testimonial?.companyLogo && (
            <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center overflow-hidden">
              <Image
                src={testimonial?.companyLogo}
                alt={`${testimonial?.company} logo`}
                className="w-8 h-8 object-contain opacity-80"
              />
            </div>
          )}
        </div>

        {/* Project Tag */}
        {testimonial?.projectType && (
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-primary text-xs font-medium">
              {testimonial?.projectType}
            </span>
          </div>
        )}
      </div>
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"></div>
    </div>
  );
};

export default TestimonialCard;