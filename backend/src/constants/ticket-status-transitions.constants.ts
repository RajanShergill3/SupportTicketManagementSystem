import { TicketStatus } from './ticket-status.constants';

/**
 * Allowed ticket status transitions per the project specification.
 */
export const TICKET_STATUS_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  [TicketStatus.OPEN]: [TicketStatus.IN_PROGRESS, TicketStatus.CANCELLED],
  [TicketStatus.IN_PROGRESS]: [TicketStatus.RESOLVED, TicketStatus.CANCELLED],
  [TicketStatus.RESOLVED]: [TicketStatus.CLOSED],
  [TicketStatus.CLOSED]: [],
  [TicketStatus.CANCELLED]: [],
};

export const isAllowedTicketStatusTransition = (
  currentStatus: TicketStatus,
  nextStatus: TicketStatus,
): boolean => TICKET_STATUS_TRANSITIONS[currentStatus].includes(nextStatus);
