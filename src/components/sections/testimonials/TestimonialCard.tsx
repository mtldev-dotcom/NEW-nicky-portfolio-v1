import React from 'react';
import Image from 'next/image';
import Icon from 'components/AppIcon';

const TestimonialCard = ({ testimonial, isActive, onClick }) => {
  return (
    <div
      className={`relative p-8 rounded-xl border transition-smooth cursor-pointer magnetic-hover min-h-[300px] ${isActive
        ? 'bg-card border-primary/30 glow-neon' : 'bg-card/50 border-border hover:border-primary/20 hover:bg-card/80'
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
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-background"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-space-grotesk font-semibold text-foreground truncate">
              {testimonial?.name}
            </h4>
            <p className="text-muted-foreground text-sm truncate">
              {testimonial?.role} at {testimonial?.company}
            </p>
          </div>
        </div>

        {/* Project Tag */}
        {testimonial?.projectType && (
          <div className="absolute bottom-8 left-8 inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20 z-10">
            <span className="text-primary text-xs font-medium">
              {testimonial?.projectType}
            </span>
          </div>
        )}
      </div>

      {/* Company Logo - Bottom Right */}
      {testimonial?.companyLogo && (
        <div className="absolute bottom-8 right-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden shadow-lg p-4">
          <Image
            src={testimonial?.companyLogo}
            alt={`${testimonial?.company} logo`}
            width={300}
            height={300}
            className="object-contain opacity-90 max-w-full max-h-full"
          />
        </div>
      )}
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"></div>
    </div>
  );
};

export default TestimonialCard;
