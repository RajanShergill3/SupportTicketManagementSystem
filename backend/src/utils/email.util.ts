/**
 * Normalizes an email address for consistent storage and lookup.
 */
export const normalizeEmail = (email: string): string => email.trim().toLowerCase();
