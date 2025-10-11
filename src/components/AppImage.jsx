import React from 'react';

const FALLBACK_IMAGE = "/assets/images/profil_portrait.jpg";

function Image({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) {
  return (
    <img
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
}

export default Image;
