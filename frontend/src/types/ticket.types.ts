export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export type TicketStatus = 'Open' | 'In Progress' | 'Blocked' | 'Resolved' | 'Closed';

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
