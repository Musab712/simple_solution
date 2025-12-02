import { Request, Response, NextFunction } from 'express';

/**
 * Removes HTML tags from a string
 */
const stripHtmlTags = (input: string): string => {
  return input.replace(/<[^>]*>/g, '');
};

/**
 * Removes script tags and event handlers (more aggressive XSS protection)
 */
const removeScripts = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '') // Remove event handlers like onclick="..."
    .replace(/on\w+\s*=\s*[^\s>]*/gi, ''); // Remove event handlers without quotes
};

/**
 * Normalizes whitespace
 */
const normalizeWhitespace = (input: string): string => {
  return input.replace(/\s+/g, ' ').trim();
};

/**
 * Sanitizes a string value
 */
const sanitizeString = (value: string, preserveLineBreaks = false): string => {
  if (typeof value !== 'string') return value;
  
  let sanitized = removeScripts(stripHtmlTags(value));
  
  if (preserveLineBreaks) {
    // For messages, preserve line breaks but normalize other whitespace
    sanitized = sanitized.replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n');
  } else {
    sanitized = normalizeWhitespace(sanitized);
  }
  
  return sanitized.trim();
};

/**
 * Sanitization middleware
 * Strips HTML tags, removes scripts, and normalizes whitespace from all string fields
 */
export const sanitizeInput = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  if (req.body && typeof req.body === 'object') {
    // Sanitize name
    if (req.body.name && typeof req.body.name === 'string') {
      req.body.name = sanitizeString(req.body.name);
    }

    // Sanitize email (less aggressive, just remove HTML)
    if (req.body.email && typeof req.body.email === 'string') {
      req.body.email = stripHtmlTags(req.body.email.trim().toLowerCase());
    }

    // Sanitize phone (keep only valid characters)
    if (req.body.phone && typeof req.body.phone === 'string') {
      req.body.phone = stripHtmlTags(req.body.phone.trim()).replace(/[^\d\+\s\-\(\)]/g, '');
    }

    // Sanitize message (preserve line breaks)
    if (req.body.message && typeof req.body.message === 'string') {
      req.body.message = sanitizeString(req.body.message, true);
    }
  }

  next();
};

