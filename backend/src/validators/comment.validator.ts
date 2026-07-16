/**
 * Comment domain validation.
 *
 * Validates comment input and throws BadRequestError for invalid data.
 * Reuses generic validation utilities for common field checks.
 */
import { isValidObjectId } from 'mongoose';

import { ApiMessages } from '../constants/messages.constants';
import { CommentMessages } from '../constants/comment-messages.constants';
import { CreateCommentInput, CreateCommentPayload } from '../types/comment.types';
import { BadRequestError } from '../utils/errors';
import {
  createValidationResult,
  mergeValidationResults,
  validateRequiredString,
  ValidationResult,
} from '../utils/validation.util';

const validateObjectIdField = (
  value: unknown,
  fieldName: string,
  invalidMessage: string,
): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return createValidationResult([`${fieldName} is required`]);
  }

  if (typeof value !== 'string' || !isValidObjectId(value)) {
    return createValidationResult([invalidMessage]);
  }

  return createValidationResult();
};

const validateMessage = (message: unknown): ValidationResult => {
  const error = validateRequiredString(message, 'message');

  if (error) {
    return createValidationResult([error]);
  }

  return createValidationResult();
};

export const validateCreateCommentInput = (payload: CreateCommentPayload): CreateCommentInput => {
  const result = mergeValidationResults(
    validateObjectIdField(payload.ticketId, 'ticketId', CommentMessages.INVALID_TICKET),
    validateMessage(payload.message),
    validateObjectIdField(payload.createdBy, 'createdBy', CommentMessages.INVALID_CREATOR),
  );

  if (!result.isValid) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, result.errors);
  }

  return {
    ticketId: payload.ticketId as string,
    message: (payload.message as string).trim(),
    createdBy: payload.createdBy as string,
  };
};
