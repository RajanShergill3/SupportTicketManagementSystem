import { TicketPriority } from '../constants/ticket-priority.constants';
import { TicketStatus } from '../constants/ticket-status.constants';
import { ITicket } from './ticket.types';

/**
 * Ticket representation returned by Ticket APIs.
 */
export interface TicketResponse {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export const toTicketResponse = (ticket: ITicket): TicketResponse => ({
  id: ticket._id.toString(),
  title: ticket.title,
  description: ticket.description,
  priority: ticket.priority,
  status: ticket.status,
  assignedTo: ticket.assignedTo.toString(),
  createdBy: ticket.createdBy.toString(),
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
});
