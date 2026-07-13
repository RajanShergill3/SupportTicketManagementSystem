/**
 * Reusable validation utilities for domain-independent checks.
 *
 * Domain validators (Ticket, User, Comment) should compose these
 * helpers rather than reimplementing common validation behaviour.
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const createValidationResult = (errors: string[] = []): ValidationResult => ({
  isValid: errors.length === 0,
  errors,
});

export const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateRequiredString = (value: unknown, fieldName: string): string | null => {
  if (!isNonEmptyString(value)) {
    return `${fieldName} is required`;
  }

  return null;
};

export const validateRequiredFields = (
  fields: Record<string, unknown>,
  requiredFieldNames: string[],
): ValidationResult => {
  const errors = requiredFieldNames
    .map((fieldName) => validateRequiredString(fields[fieldName], fieldName))
    .filter((error): error is string => error !== null);

  return createValidationResult(errors);
};

export const mergeValidationResults = (...results: ValidationResult[]): ValidationResult => {
  const errors = results.flatMap((result) => result.errors);
  return createValidationResult(errors);
};
