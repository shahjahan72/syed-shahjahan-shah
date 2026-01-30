import React, { useState } from 'react';

// Simple image wrapper that falls back to a grayscale inline SVG if the image fails to load
const defaultSvg = encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'>
  <rect width='100%' height='100%' fill='#ffffff' />
  <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#1f2937' font-family='Arial, Helvetica, sans-serif' font-size='40'>PRINTIFY</text>
</svg>
`);
const defaultSrc = `data:image/svg+xml;utf8,${defaultSvg}`;

const ImageWithFallback = ({ src, alt = '', className = '', onError: userOnError, ...rest }) => {
  const [currentSrc, setCurrentSrc] = useState(src || defaultSrc);

  const handleError = (e) => {
    setCurrentSrc(defaultSrc);
    // apply grayscale filter via inline style when fallback used
    if (userOnError) userOnError(e);
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...rest}
      style={{ filter: currentSrc === defaultSrc ? 'grayscale(100%)' : undefined }}
    />
  );
};

export default ImageWithFallback;
