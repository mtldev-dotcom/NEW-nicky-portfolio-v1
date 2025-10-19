'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

interface VideoBackgroundProps {
    className?: string;
}

const VideoBackground = ({ className = '' }: VideoBackgroundProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Handle video loading
        const handleLoadedData = () => {
            setIsVideoLoaded(true);
        };

        const handleError = () => {
            setHasError(true);
            console.warn('Background video failed to load');
        };

        const handleCanPlay = () => {
            // Ensure video plays when ready
            video.play().catch((error) => {
                console.warn('Video autoplay failed:', error);
                // This is expected in some browsers - video will play on user interaction
            });
        };

        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);
        video.addEventListener('canplay', handleCanPlay);

        return () => {
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('error', handleError);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, []);

    // Don't render video if user prefers reduced motion
    if (shouldReduceMotion) {
        return (
            <div className={`absolute inset-0 bg-gradient-to-br from-background via-gray-900/50 to-background ${className}`} />
        );
    }

    return (
        <div className={`absolute inset-0 overflow-hidden ${className}`}>
            {/* Video Background */}
            <video
                ref={videoRef}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
                poster=""
            >
                <source src="/assets/videos/bg_video_hero.mp4" type="video/mp4" />
                {/* Fallback for browsers that don't support video */}
                Your browser does not support the video tag.
            </video>

            {/* Fallback background for loading state or errors */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-background via-gray-900/50 to-background transition-opacity duration-1000 ${isVideoLoaded && !hasError ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* Dark overlay to ensure text readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Subtle gradient overlays for better content contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-background/60" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
    );
};

export default VideoBackground;
