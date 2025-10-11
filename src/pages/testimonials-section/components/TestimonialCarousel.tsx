import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import TestimonialCard from './TestimonialCard';

const TestimonialCarousel = ({ testimonials, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer);
  }, [isAutoPlaying, testimonials?.length, interval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? testimonials?.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    const newIndex = currentIndex === testimonials?.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!testimonials || testimonials?.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials?.map((testimonial, index) => (
            <div key={testimonial?.id} className="w-full flex-shrink-0">
              <TestimonialCard 
                testimonial={testimonial}
                isActive={index === currentIndex}
                onClick={() => {}}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mt-6">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full bg-muted/20 hover:bg-primary/20 border border-border hover:border-primary/30 flex items-center justify-center transition-smooth group"
          aria-label="Previous testimonial"
        >
          <Icon 
            name="ChevronLeft" 
            size={20} 
            color="var(--color-muted-foreground)"
            className="group-hover:text-primary transition-smooth"
          />
        </button>

        {/* Dots Indicator */}
        <div className="flex items-center space-x-2">
          {testimonials?.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-smooth ${
                index === currentIndex
                  ? 'bg-primary w-8' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="w-10 h-10 rounded-full bg-muted/20 hover:bg-primary/20 border border-border hover:border-primary/30 flex items-center justify-center transition-smooth group"
          aria-label="Next testimonial"
        >
          <Icon 
            name="ChevronRight" 
            size={20} 
            color="var(--color-muted-foreground)"
            className="group-hover:text-primary transition-smooth"
          />
        </button>
      </div>
      {/* Auto-play Indicator */}
      {isAutoPlaying && (
        <div className="absolute top-4 right-4">
          <div className="flex items-center space-x-2 px-3 py-1 bg-black/50 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-xs text-white font-mono">AUTO</span>
          </div>
        </div>
      )}
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/20">
        <div 
          className="h-full bg-primary transition-all duration-100 ease-linear"
          style={{ 
            width: isAutoPlaying ? '100%' : '0%',
            animation: isAutoPlaying ? `progress ${interval}ms linear infinite` : 'none'
          }}
        />
      </div>
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default TestimonialCarousel;