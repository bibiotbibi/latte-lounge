/**
 * Image utilities for handling external images and fallbacks
 */

/**
 * Generate a fallback placeholder image URL
 * @param {string} text - Text to display in placeholder
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @param {string} bgColor - Background color (hex without #)
 * @param {string} textColor - Text color (hex without #)
 * @returns {string} Placeholder image URL
 */
export const generatePlaceholder = (
  text = 'Image',
  width = 800,
  height = 600,
  bgColor = 'f59e0b',
  textColor = 'ffffff'
) => {
  const encodedText = encodeURIComponent(text.substring(0, 20));
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodedText}`;
};

/**
 * Optimize Unsplash image URL with proper parameters
 * @param {string} url - Original Unsplash URL
 * @param {number} width - Desired width
 * @param {number} height - Desired height
 * @param {string} fit - Fit mode (crop, fill, etc.)
 * @param {number} quality - Image quality (1-100)
 * @returns {string} Optimized image URL
 */
export const optimizeUnsplashUrl = (
  url,
  width = 800,
  height = 600,
  fit = 'crop',
  quality = 80
) => {
  if (!url || !url.includes('unsplash.com')) {
    return url;
  }

  // Remove existing parameters
  const baseUrl = url.split('?')[0];
  
  // Add optimization parameters
  const params = new URLSearchParams({
    w: width.toString(),
    h: height.toString(),
    fit: fit,
    q: quality.toString(),
    auto: 'format',
    fm: 'webp'
  });

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Handle image error with fallback
 * @param {Event} event - Error event
 * @param {string} fallbackText - Text for fallback image
 * @param {number} width - Image width
 * @param {number} height - Image height
 */
export const handleImageError = (event, fallbackText = 'Image', width = 800, height = 600) => {
  const target = event.target;
  if (target && !target.dataset.fallbackApplied) {
    target.dataset.fallbackApplied = 'true';
    target.src = generatePlaceholder(fallbackText, width, height);
  }
};

/**
 * Preload critical images
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  if (typeof window === 'undefined') return;

  imageUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Check if image URL is valid and accessible
 * @param {string} url - Image URL to check
 * @returns {Promise<boolean>} Promise that resolves to true if image is accessible
 */
export const isImageAccessible = async (url) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};