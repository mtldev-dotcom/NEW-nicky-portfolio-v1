/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from 'react';

const FALLBACK_IMAGE = "/assets/images/profil_portrait.jpg";

interface AppImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallbackSrc?: string;
}

const Image = forwardRef<HTMLImageElement, AppImageProps>(function AppImage(
  {
    src,
    alt = "Image Name",
    className = "",
    fallbackSrc = FALLBACK_IMAGE,
    onError,
    ...props
  },
  ref
) {
  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    const currentTarget = event.currentTarget;
    if (currentTarget.dataset?.fallbackApplied) {
      onError?.(event);
      return;
    }

    currentTarget.dataset.fallbackApplied = "true";
    currentTarget.src = fallbackSrc;
    onError?.(event);
  };

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
});

export default Image;
