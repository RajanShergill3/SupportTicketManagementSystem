export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

/**
 * Ticket statuses aligned with the backend API contract.
 * @see backend/src/constants/ticket-status.constants.ts
 */
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Cancelled';

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  reporter: string;
  assignee: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}
