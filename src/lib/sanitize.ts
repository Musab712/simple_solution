/**
 * Sanitization utilities for form inputs
 * Removes HTML tags, normalizes whitespace, and prevents XSS attacks
 */

/**
 * Removes HTML tags from a string
 */
const stripHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

/**
 * Normalizes whitespace (multiple spaces/tabs/newlines to single space)
 * Preserves line breaks for messages
 */
const normalizeWhitespace = (input: string, preserveLineBreaks = false): string => {
  if (preserveLineBreaks) {
    // Replace multiple spaces/tabs with single space, but keep newlines
    return input.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  }
  // Replace all whitespace with single space
  return input.replace(/\s+/g, ' ');
};

/**
 * Sanitizes name input
 * - Removes HTML tags
 * - Normalizes multiple spaces to single space
 * - Preserves single spaces (doesn't trim during typing)
 */
export const sanitizeName = (input: string): string => {
  // Only strip HTML tags and normalize multiple spaces, but preserve single spaces
  const stripped = stripHtmlTags(input);
  // Replace multiple consecutive spaces with single space, but keep single spaces
  return stripped.replace(/[ \t]{2,}/g, ' ');
};

/**
 * Sanitizes email input
 * - Trims whitespace
 * - Removes HTML tags
 * - Converts to lowercase
 */
export const sanitizeEmail = (input: string): string => {
  return stripHtmlTags(input.trim().toLowerCase());
};

/**
 * Sanitizes phone input
 * - Removes HTML tags
 * - Keeps only digits, +, spaces, dashes, parentheses
 * - Preserves spaces (doesn't trim during typing)
 */
export const sanitizePhone = (input: string): string => {
  const cleaned = stripHtmlTags(input);
  // Keep only valid phone characters: digits, +, spaces, dashes, parentheses
  return cleaned.replace(/[^\d\+\s\-\(\)]/g, '');
};

/**
 * Sanitizes message input
 * - Removes HTML tags (prevents XSS)
 * - Normalizes whitespace but preserves line breaks and single spaces
 * - Less aggressive to preserve user intent
 */
export const sanitizeMessage = (input: string): string => {
  const stripped = stripHtmlTags(input);
  // Preserve line breaks, normalize multiple spaces/tabs to single space
  return stripped.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n');
};

