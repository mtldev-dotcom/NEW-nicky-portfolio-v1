/* eslint-disable @next/next/no-img-element */
import React, { forwardRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './AppIcon';

const FALLBACK_IMAGE = "/assets/images/profil_portrait.jpg";

export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export type ImageEffect = 'none' | 'zoom' | 'fade' | 'scale' | 'blur';

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
  size?: ImageSize;
  effect?: ImageEffect;
  loading?: 'lazy' | 'eager';
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  showLoadingState?: boolean;
  showErrorState?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const sizeClasses: Record<ImageSize, string> = {
  xs: 'w-8 h-8',
  sm: 'w-12 h-12',
  md: 'w-16 h-16',
  lg: 'w-24 h-24',
  xl: 'w-32 h-32',
  full: 'w-full h-full',
};

const effectVariants = {
  zoom: {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  scale: {
    hover: {
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  },
  blur: {
    hover: {
      filter: 'blur(2px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  },
};

const Image = forwardRef<HTMLImageElement, AppImageProps>(function AppImage(
  {
    src,
    alt = "Image",
    className = "",
    fallbackSrc = FALLBACK_IMAGE,
    size = 'full',
    effect = 'none',
    loading = 'lazy',
    placeholder = 'empty',
    blurDataURL,
    showLoadingState = true,
    showErrorState = true,
    onLoad,
    onError,
    onError: originalOnError,
    ...props
  },
  ref
) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleLoad = useCallback(() => {
    setImageState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    if (currentSrc === fallbackSrc) {
      setImageState('error');
      originalOnError?.();
      return;
    }

    setCurrentSrc(fallbackSrc);
    setImageState('loading');
    onError?.();
  }, [currentSrc, fallbackSrc, originalOnError, onError]);

  const sizeClass = sizeClasses[size];
  const baseClasses = `object-cover transition-all duration-300 ${sizeClass} ${className}`;

  const imageElement = (
    <img
      ref={ref}
      src={currentSrc}
      alt={alt}
      className={baseClasses}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );

  // Apply effects
  if (effect !== 'none') {
    return (
      <motion.div
        className="overflow-hidden"
        variants={effectVariants[effect]}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ duration: 0.5 }}
      >
        {imageElement}
      </motion.div>
    );
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {imageState === 'loading' && showLoadingState && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${sizeClass} bg-muted/20 flex items-center justify-center`}
          >
            <Icon
              name="Loader2"
              size="sm"
              animation="spin"
              className="text-muted-foreground"
              aria-label="Loading image"
            />
          </motion.div>
        )}

        {imageState === 'error' && showErrorState && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`${sizeClass} bg-muted/10 flex items-center justify-center`}
          >
            <Icon
              name="Image"
              size="sm"
              className="text-muted-foreground"
              aria-label="Image failed to load"
            />
          </motion.div>
        )}

        {imageState === 'loaded' && (
          <motion.div
            key="loaded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {imageElement}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default Image;
