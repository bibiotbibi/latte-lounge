'use client'

import Image from 'next/image';
import { useState } from 'react';
import { handleImageError, generatePlaceholder, optimizeUnsplashUrl } from '../utils/imageUtils';

/**
 * Optimized Image component with automatic fallback and error handling
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallbackText,
  className = '',
  sizes,
  priority = false,
  quality = 80,
  ...props
}) {
  const [imageSrc, setImageSrc] = useState(() => {
    // Optimize Unsplash URLs automatically
    return optimizeUnsplashUrl(src, width, height, 'crop', quality);
  });
  const [hasError, setHasError] = useState(false);

  const handleError = (event) => {
    if (!hasError) {
      setHasError(true);
      const fallback = generatePlaceholder(
        fallbackText || alt || 'Image',
        width || 800,
        height || 600
      );
      setImageSrc(fallback);
    }
  };

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality}
      onError={handleError}
      {...props}
    />
  );
}