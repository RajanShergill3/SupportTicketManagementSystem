import {
  type CreateTicketInput,
  type TicketFormValues,
  type UpdateTicketInput,
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

function validateTitleField(title: string): string | undefined {
  if (title.length === 0) {
    return 'Title is required';
  }

  if (title.length > TITLE_MAX_LENGTH) {
    return 'Title must be 150 characters or fewer';
  }

  return undefined;
}

function validateDescriptionField(description: string): string | undefined {
  if (description.length === 0) {
    return 'Description is required';
  }

  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return 'Description must be 5000 characters or fewer';
  }

  return undefined;
}

function validatePriorityField(priority: TicketPriority | ''): string | undefined {
  if (!priority) {
    return 'Priority is required';
  }

  if (!PRIORITIES.includes(priority)) {
    return 'Priority is required';
  }

  return undefined;
}

function validateAssigneeField(assignee: string): string | undefined {
  if (assignee.length === 0) {
    return 'Assignee is required';
  }

  return undefined;
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

export function normalizeUpdateTicketInput(input: UpdateTicketInput): UpdateTicketInput {
  return {
    title: input.title.trim(),
    description: input.description.trim(),
    priority: input.priority,
    assignee: input.assignee.trim(),
  };
}

export function validateCreateTicketInput(input: CreateTicketInput): TicketFormErrors {
  const normalized = normalizeCreateTicketInput(input);
  const errors: TicketFormErrors = {};

  const titleError = validateTitleField(normalized.title);
  if (titleError) {
    errors.title = titleError;
  }

  const descriptionError = validateDescriptionField(normalized.description);
  if (descriptionError) {
    errors.description = descriptionError;
  }

  const priorityError = validatePriorityField(normalized.priority);
  if (priorityError) {
    errors.priority = priorityError;
  }

  if (normalized.reporter.length === 0) {
    errors.reporter = 'Reporter is required';
  }

  const assigneeError = validateAssigneeField(normalized.assignee);
  if (assigneeError) {
    errors.assignee = assigneeError;
  }

  return errors;
}

export function validateUpdateTicketInput(input: UpdateTicketInput): TicketFormErrors {
  const normalized = normalizeUpdateTicketInput(input);
  const errors: TicketFormErrors = {};

  const titleError = validateTitleField(normalized.title);
  if (titleError) {
    errors.title = titleError;
  }

  const descriptionError = validateDescriptionField(normalized.description);
  if (descriptionError) {
    errors.description = descriptionError;
  }

  const priorityError = validatePriorityField(normalized.priority);
  if (priorityError) {
    errors.priority = priorityError;
  }

  const assigneeError = validateAssigneeField(normalized.assignee);
  if (assigneeError) {
    errors.assignee = assigneeError;
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

export function toUpdateTicketInput(values: TicketFormValues): UpdateTicketInput {
  return normalizeUpdateTicketInput({
    title: values.title,
    description: values.description,
    priority: values.priority as TicketPriority,
    assignee: values.assignee,
  });
}

export function ticketToFormValues(ticket: {
  title: string;
  description: string;
  priority: TicketPriority;
  reporter: string;
  assignee: string;
}): TicketFormValues {
  return {
    title: ticket.title,
    description: ticket.description,
    priority: ticket.priority,
    reporter: ticket.reporter,
    assignee: ticket.assignee,
  };
}

export function hasCreateTicketChanges(
  initialValues: TicketFormValues,
  currentValues: TicketFormValues,
): boolean {
  const initial = toCreateTicketInput(initialValues);
  const current = toCreateTicketInput(currentValues);

  return (
    initial.title !== current.title ||
    initial.description !== current.description ||
    initial.priority !== current.priority ||
    initial.reporter !== current.reporter ||
    initial.assignee !== current.assignee
  );
}

export function hasUpdateTicketChanges(
  initialValues: TicketFormValues,
  currentValues: TicketFormValues,
): boolean {
  const initial = toUpdateTicketInput(initialValues);
  const current = toUpdateTicketInput(currentValues);

  return (
    initial.title !== current.title ||
    initial.description !== current.description ||
    initial.priority !== current.priority ||
    initial.assignee !== current.assignee
  );
}
