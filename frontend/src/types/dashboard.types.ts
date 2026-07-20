import { type TicketPriority, type TicketStatus } from '@/types/ticket.types';

export interface DashboardStats {
  totalUsers: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  closedTickets: number;
}

export interface DashboardRecentTicket {
  id: string;
  ticketNumber: string;
  title: string;
  status: TicketStatus;
  priority: TicketPriority;
  assignedTo: string;
  createdAt: string;
}

export type DashboardActivityType =
  | 'ticket_created'
  | 'ticket_updated'
  | 'status_changed'
  | 'comment_added';

export interface DashboardActivityItem {
  id: string;
  type: DashboardActivityType;
  title: string;
  description: string;
  occurredAt: string;
}

export interface DashboardSummary {
  stats: DashboardStats;
  recentTickets: DashboardRecentTicket[];
  recentActivity: DashboardActivityItem[];
}
