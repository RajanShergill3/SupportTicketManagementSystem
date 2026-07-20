import {
  type CreateTicketInput,
  type TicketFormValues,
} from '@/types/ticket-form.types';
import { type TicketPriority } from '@/types/ticket.types';

export interface TicketFormErrors {
  title?: string;
  description?: string;
  priority?: string;
  reporter?: string;
  assignee?: string;
}

const TITLE_MAX_LENGTH = 150;
const DESCRIPTION_MAX_LENGTH = 5000;

const PRIORITIES: TicketPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export function hasTicketFormErrors(errors: TicketFormErrors): boolean {
  return Object.keys(errors).length > 0;
}

export function normalizeCreateTicketInput(input: CreateTicketInput): CreateTicketInput {
  return {
    title: input.title.trim(),
    description: input.description.trim(),
    priority: input.priority,
    reporter: input.reporter.trim(),
    assignee: input.assignee.trim(),
  };
}

export function validateCreateTicketInput(input: CreateTicketInput): TicketFormErrors {
  const normalized = normalizeCreateTicketInput(input);
  const errors: TicketFormErrors = {};

  if (normalized.title.length === 0) {
    errors.title = 'Title is required';
  } else if (normalized.title.length > TITLE_MAX_LENGTH) {
    errors.title = 'Title must be 150 characters or fewer';
  }

  if (normalized.description.length === 0) {
    errors.description = 'Description is required';
  } else if (normalized.description.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = 'Description must be 5000 characters or fewer';
  }

  if (!normalized.priority) {
    errors.priority = 'Priority is required';
  } else if (!PRIORITIES.includes(normalized.priority)) {
    errors.priority = 'Priority is required';
  }

  if (normalized.reporter.length === 0) {
    errors.reporter = 'Reporter is required';
  }

  if (normalized.assignee.length === 0) {
    errors.assignee = 'Assignee is required';
  }

  return errors;
}

export function toCreateTicketInput(values: TicketFormValues): CreateTicketInput {
  return normalizeCreateTicketInput({
    title: values.title,
    description: values.description,
    priority: values.priority as TicketPriority,
    reporter: values.reporter,
    assignee: values.assignee,
  });
}
