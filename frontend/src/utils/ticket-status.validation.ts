import { API_TICKET_STATUSES } from '@/types/ticket-api.types';
import { type TicketStatus } from '@/types/ticket.types';
import { ApiError } from '@/utils/api-error.util';

export function isTicketStatus(value: unknown): value is TicketStatus {
  return typeof value === 'string' && API_TICKET_STATUSES.includes(value as TicketStatus);
}

export function validateTicketStatus(status: unknown): TicketStatus {
  if (!isTicketStatus(status)) {
    throw new ApiError(
      'Status must be one of: Open, In Progress, Resolved, Closed, Cancelled.',
      400,
    );
  }

  return status;
}
