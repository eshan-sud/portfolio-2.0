// src/lib/constants.js
// Centralized URL prefixes for images and icons

/**
 * Cloudinary Configuration
 * Base URL for all project images and profile pictures
 */
export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;

/**
 * CDN Configuration
 * Base URL for technology stack icons (Simple Icons)
 */
export const CDN_ICONS_BASE_URL =
  "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/";

/**
 * Helper: Construct full Cloudinary image URL from database suffix
 * @param {string} publicId - Cloudinary public ID (e.g., "talk2pdfs_xhtkj9")
 * @returns {string} Full Cloudinary URL
 */
export function getCloudinaryUrl(publicId) {
  if (!publicId) return null;
  // If already a full URL, return as-is (backwards compatibility)
  if (publicId.startsWith("http")) return publicId;
  return `${CLOUDINARY_BASE_URL}${publicId}`;
}

/**
 * Helper: Construct full CDN icon URL from database suffix
 * @param {string} iconPath - Icon path suffix (e.g., "react/react-original.svg")
 * @returns {string} Full CDN URL
 */
export function getCdnIconUrl(iconPath) {
  if (!iconPath) return null;
  // If already a full URL, return as-is (backwards compatibility)
  if (iconPath.startsWith("http")) return iconPath;
  return `${CDN_ICONS_BASE_URL}${iconPath}`;
}

/**
 * Fallback URLs
 */
export const FALLBACK_IMAGE =
  "https://placehold.co/600x400/16224c/ffffff?text=Image";
export const FALLBACK_PROFILE =
  "https://placehold.co/400x400/1a2b4c/ffffff?text=ES";
export const FALLBACK_ICON =
  "https://placehold.co/64x64/1a2b4c/ffffff?text=Tech";
