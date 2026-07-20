import { type TicketPriority, type TicketStatus } from '@/types/ticket.types';

/**
 * Ticket shape returned by GET /tickets and GET /tickets/:id.
 */
export interface TicketApiDto {
  id: string;
  ticketNumber?: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: string;
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const API_TICKET_STATUSES: TicketStatus[] = [
  'Open',
  'In Progress',
  'Resolved',
  'Closed',
  'Cancelled',
];
