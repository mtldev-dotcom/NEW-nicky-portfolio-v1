/* eslint-disable @next/next/no-img-element */
import React, { forwardRef } from 'react';

const FALLBACK_IMAGE = "/assets/images/profil_portrait.jpg";

const Image = forwardRef(function AppImage(
  {
    src,
    alt = "Image Name",
    className = "",
    ...props
  },
  ref
) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (e?.currentTarget?.dataset?.fallbackApplied) return;
        e.currentTarget.dataset.fallbackApplied = "true";
        e.currentTarget.src = FALLBACK_IMAGE;
      }}
      {...props}
    />
  );
});

export default Image;
