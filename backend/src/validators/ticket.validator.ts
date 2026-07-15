/**
 * Ticket domain validation.
 *
 * Validates ticket input and throws BadRequestError for invalid data.
 * Reuses generic validation utilities for common field checks.
 */
import { isValidObjectId } from 'mongoose';

import { ApiMessages } from '../constants/messages.constants';
import { isTicketPriority, TicketPriority } from '../constants/ticket-priority.constants';
import { isTicketStatus, TicketStatus } from '../constants/ticket-status.constants';
import { TicketMessages } from '../constants/ticket-messages.constants';
import {
  CreateTicketInput,
  CreateTicketPayload,
  UpdateTicketInput,
  UpdateTicketPayload,
} from '../types/ticket.types';
import { BadRequestError } from '../utils/errors';
import {
  createValidationResult,
  mergeValidationResults,
  validateRequiredString,
  ValidationResult,
} from '../utils/validation.util';

const validateTitle = (title: unknown): ValidationResult => {
  const error = validateRequiredString(title, 'title');
  return createValidationResult(error ? [error] : []);
};

const validateDescription = (description: unknown): ValidationResult => {
  const error = validateRequiredString(description, 'description');
  return createValidationResult(error ? [error] : []);
};

const validatePriority = (priority: unknown, required = true): ValidationResult => {
  if (priority === undefined || priority === null || priority === '') {
    return required
      ? createValidationResult(['priority is required'])
      : createValidationResult();
  }

  if (!isTicketPriority(priority)) {
    return createValidationResult([TicketMessages.INVALID_PRIORITY]);
  }

  return createValidationResult();
};

const validateObjectIdField = (
  value: unknown,
  fieldName: string,
  invalidMessage: string,
  required = true,
): ValidationResult => {
  if (value === undefined || value === null || value === '') {
    return required
      ? createValidationResult([`${fieldName} is required`])
      : createValidationResult();
  }

  if (typeof value !== 'string' || !isValidObjectId(value)) {
    return createValidationResult([invalidMessage]);
  }

  return createValidationResult();
};

export const validateTicketListFilters = (filters: {
  status?: unknown;
  keyword?: unknown;
}): { status?: TicketStatus; keyword?: string } => {
  const errors: string[] = [];

  let status: TicketStatus | undefined;

  if (filters.status !== undefined && filters.status !== null && filters.status !== '') {
    if (!isTicketStatus(filters.status)) {
      errors.push(TicketMessages.INVALID_STATUS);
    } else {
      status = filters.status;
    }
  }

  let keyword: string | undefined;

  if (filters.keyword !== undefined && filters.keyword !== null) {
    if (typeof filters.keyword !== 'string') {
      errors.push('keyword must be a string');
    } else {
      const trimmedKeyword = filters.keyword.trim();
      if (trimmedKeyword.length > 0) {
        keyword = trimmedKeyword;
      }
    }
  }

  if (errors.length > 0) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, errors);
  }

  return { status, keyword };
};

export const validateCreateTicketInput = (payload: CreateTicketPayload): CreateTicketInput => {
  const result = mergeValidationResults(
    validateTitle(payload.title),
    validateDescription(payload.description),
    validatePriority(payload.priority),
    validateObjectIdField(
      payload.assignedTo,
      'assignedTo',
      TicketMessages.INVALID_ASSIGNEE,
    ),
    validateObjectIdField(payload.createdBy, 'createdBy', TicketMessages.INVALID_CREATOR),
  );

  if (!result.isValid) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, result.errors);
  }

  return {
    title: (payload.title as string).trim(),
    description: (payload.description as string).trim(),
    priority: payload.priority as TicketPriority,
    assignedTo: payload.assignedTo as string,
    createdBy: payload.createdBy as string,
  };
};

export const validateUpdateTicketInput = (payload: UpdateTicketPayload): UpdateTicketInput => {
  const hasUpdatableField =
    payload.title !== undefined ||
    payload.description !== undefined ||
    payload.priority !== undefined ||
    payload.assignedTo !== undefined;

  if (!hasUpdatableField) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, [
      'At least one field must be provided for update',
    ]);
  }

  const result = mergeValidationResults(
    payload.title !== undefined ? validateTitle(payload.title) : createValidationResult(),
    payload.description !== undefined
      ? validateDescription(payload.description)
      : createValidationResult(),
    payload.priority !== undefined
      ? validatePriority(payload.priority, false)
      : createValidationResult(),
    payload.assignedTo !== undefined
      ? validateObjectIdField(
          payload.assignedTo,
          'assignedTo',
          TicketMessages.INVALID_ASSIGNEE,
          false,
        )
      : createValidationResult(),
  );

  if (!result.isValid) {
    throw new BadRequestError(ApiMessages.VALIDATION_FAILED, result.errors);
  }

  const input: UpdateTicketInput = {};

  if (payload.title !== undefined) {
    input.title = (payload.title as string).trim();
  }

  if (payload.description !== undefined) {
    input.description = (payload.description as string).trim();
  }

  if (payload.priority !== undefined) {
    input.priority = payload.priority as TicketPriority;
  }

  if (payload.assignedTo !== undefined) {
    input.assignedTo = payload.assignedTo as string;
  }

  return input;
};
