/**
 * User domain validation.
 *
 * Validates create-user input and throws BadRequestError for invalid data.
 * Reuses generic validation utilities for common field checks.
 */
import { ApiMessages } from '../constants/messages.constants';
import { UserMessages } from '../constants/user-messages.constants';
import { isUserRole, UserRole } from '../constants/user-role.constants';
import { CreateUserInput, CreateUserPayload } from '../types/user.types';
import { normalizeEmail } from '../utils/email.util';
import { BadRequestError } from '../utils/errors';
import {
  createValidationResult,
  isNonEmptyString,
  mergeValidationResults,
  validateRequiredString,
  ValidationResult,
} from '../utils/validation.util';

const EMAIL_FORMAT_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateName = (name: unknown): ValidationResult => {
  const error = validateRequiredString(name, 'name');
  return createValidationResult(error ? [error] : []);
};

const validateEmail = (email: unknown): ValidationResult => {
  const requiredError = validateRequiredString(email, 'email');

  if (requiredError) {
    return createValidationResult([requiredError]);
  }

  if (!isNonEmptyString(email) || !EMAIL_FORMAT_REGEX.test(email.trim())) {
    return createValidationResult([UserMessages.INVALID_EMAIL]);
  }

  return createValidationResult();
};

const validateRole = (role: unknown): ValidationResult => {
  if (role === undefined || role === null || role === '') {
    return createValidationResult(['role is required']);
  }

  if (!isUserRole(role)) {
    return createValidationResult([UserMessages.INVALID_ROLE]);
  }

  return createValidationResult();
};

export const validateCreateUserInput = (payload: CreateUserPayload): CreateUserInput => {
  const result = mergeValidationResults(
    validateName(payload.name),
    validateEmail(payload.email),
    validateRole(payload.role),
  );

  if (!result.isValid) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, result.errors);
  }

  return {
    name: (payload.name as string).trim(),
    email: normalizeEmail(payload.email as string),
    role: payload.role as UserRole,
  };
};
