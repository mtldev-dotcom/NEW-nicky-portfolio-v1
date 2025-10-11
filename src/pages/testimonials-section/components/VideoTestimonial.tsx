import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const VideoTestimonial = ({ testimonial }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayClick = () => {
    setIsPlaying(true);
  };

  return (
    <div className="relative group">
      <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/20">
        {!isPlaying ? (
          <>
            {/* Video Thumbnail */}
            <Image
              src={testimonial?.thumbnail}
              alt={`Video testimonial from ${testimonial?.name}`}
              className="w-full h-full object-cover"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-smooth">
              <button
                onClick={handlePlayClick}
                className="w-16 h-16 bg-primary rounded-full flex items-center justify-center glow-neon hover:glow-neon-active transition-smooth magnetic-hover"
                aria-label="Play video testimonial"
              >
                <Icon name="Play" size={24} color="black" className="ml-1" />
              </button>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/80 rounded text-white text-xs font-mono">
              {testimonial?.duration}
            </div>
          </>
        ) : (
          /* Video Player Placeholder */
          (<div className="w-full h-full bg-muted/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Icon name="Play" size={48} color="var(--color-primary)" />
              <p className="text-muted-foreground">Video player would load here</p>
              <button
                onClick={() => setIsPlaying(false)}
                className="text-primary hover:text-primary/80 text-sm underline"
              >
                Close Video
              </button>
            </div>
          </div>)
        )}
      </div>
      {/* Video Info */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center space-x-3">
          <Image
            src={testimonial?.avatar}
            alt={testimonial?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <h4 className="font-space-grotesk font-medium text-foreground text-sm">
              {testimonial?.name}
            </h4>
            <p className="text-muted-foreground text-xs">
              {testimonial?.role} at {testimonial?.company}
            </p>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2">
          {testimonial?.preview}
        </p>
      </div>
    </div>
  );
};

export default VideoTestimonial;