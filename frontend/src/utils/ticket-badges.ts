import { type BadgeVariant } from '@/components/ui/Badge';
import { type TicketPriority, type TicketStatus } from '@/types/ticket.types';

export function getTicketPriorityVariant(priority: TicketPriority): BadgeVariant {
  switch (priority) {
    case 'Critical':
      return 'danger';
    case 'High':
      return 'accent';
    case 'Medium':
      return 'warning';
    case 'Low':
      return 'info';
    default:
      return 'default';
  }
}

export function getTicketStatusVariant(status: TicketStatus): BadgeVariant {
  switch (status) {
    case 'Open':
      return 'warning';
    case 'In Progress':
      return 'info';
    case 'Resolved':
      return 'success';
    case 'Closed':
      return 'default';
    case 'Cancelled':
      return 'default';
    default:
      return 'default';
  }
}
