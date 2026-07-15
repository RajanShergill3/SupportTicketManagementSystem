/**
 * Supported ticket status values.
 *
 * Status transition rules are enforced in a later task.
 * This module defines the allowed status values only.
 */
export const TicketStatus = {
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  CLOSED: 'Closed',
  CANCELLED: 'Cancelled',
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

export const TICKET_STATUSES: TicketStatus[] = Object.values(TicketStatus);

export const isTicketStatus = (value: unknown): value is TicketStatus => {
  return typeof value === 'string' && TICKET_STATUSES.includes(value as TicketStatus);
};
