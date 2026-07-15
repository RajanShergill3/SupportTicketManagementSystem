/**
 * Supported ticket priority levels.
 */
export const TicketPriority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
  CRITICAL: 'Critical',
} as const;

export type TicketPriority = (typeof TicketPriority)[keyof typeof TicketPriority];

export const TICKET_PRIORITIES: TicketPriority[] = Object.values(TicketPriority);

export const isTicketPriority = (value: unknown): value is TicketPriority => {
  return typeof value === 'string' && TICKET_PRIORITIES.includes(value as TicketPriority);
};
