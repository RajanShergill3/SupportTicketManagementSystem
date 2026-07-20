import { type Comment } from '@/types/comment.types';
import {
  type DashboardActivityItem,
  type DashboardRecentTicket,
  type DashboardStats,
  type DashboardSummary,
} from '@/types/dashboard.types';
import { type Ticket } from '@/types/ticket.types';
import { type User } from '@/types/user.types';

export const DASHBOARD_RECENT_TICKET_LIMIT = 5;
export const DASHBOARD_RECENT_ACTIVITY_LIMIT = 8;
export const DASHBOARD_COMMENT_TICKET_LIMIT = 5;

/** Treat updates within this window of creation as create-only noise. */
const MEANINGFUL_UPDATE_MS = 1000;

export function buildUsersById(users: User[]): Map<string, User> {
  return new Map(users.map((user) => [user.id, user]));
}

export function resolveUserDisplayName(
  userId: string | undefined | null,
  usersById: Map<string, User>,
): string {
  const trimmed = userId?.trim() ?? '';

  if (!trimmed) {
    return 'Unassigned';
  }

  return usersById.get(trimmed)?.name ?? 'Unknown user';
}

export function buildDashboardStats(tickets: Ticket[], users: User[]): DashboardStats {
  let openTickets = 0;
  let inProgressTickets = 0;
  let resolvedTickets = 0;
  let closedTickets = 0;

  for (const ticket of tickets) {
    switch (ticket.status) {
      case 'Open':
        openTickets += 1;
        break;
      case 'In Progress':
        inProgressTickets += 1;
        break;
      case 'Resolved':
        resolvedTickets += 1;
        break;
      case 'Closed':
        closedTickets += 1;
        break;
      default:
        break;
    }
  }

  return {
    totalUsers: users.length,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,
  };
}

export function sortTicketsByCreatedAtDesc(tickets: Ticket[]): Ticket[] {
  return [...tickets].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function buildRecentTickets(
  tickets: Ticket[],
  usersById: Map<string, User>,
  limit: number = DASHBOARD_RECENT_TICKET_LIMIT,
): DashboardRecentTicket[] {
  return sortTicketsByCreatedAtDesc(tickets)
    .slice(0, limit)
    .map((ticket) => ({
      id: ticket.id,
      ticketNumber: ticket.ticketNumber,
      title: ticket.title,
      status: ticket.status,
      priority: ticket.priority,
      assignedTo: resolveUserDisplayName(ticket.assignee, usersById),
      createdAt: ticket.createdAt,
    }));
}

function hasMeaningfulUpdate(ticket: Ticket): boolean {
  const createdAt = new Date(ticket.createdAt).getTime();
  const updatedAt = new Date(ticket.updatedAt).getTime();

  if (Number.isNaN(createdAt) || Number.isNaN(updatedAt)) {
    return false;
  }

  return updatedAt - createdAt > MEANINGFUL_UPDATE_MS;
}

export function buildRecentActivity(
  tickets: Ticket[],
  commentsByTicketId: Record<string, Comment[]>,
  limit: number = DASHBOARD_RECENT_ACTIVITY_LIMIT,
): DashboardActivityItem[] {
  const ticketsById = new Map(tickets.map((ticket) => [ticket.id, ticket]));
  const items: DashboardActivityItem[] = [];

  for (const ticket of tickets) {
    items.push({
      id: `created-${ticket.id}`,
      type: 'ticket_created',
      title: 'Ticket Created',
      description: `${ticket.ticketNumber} — ${ticket.title} was created.`,
      occurredAt: ticket.createdAt,
    });

    if (!hasMeaningfulUpdate(ticket)) {
      continue;
    }

    if (ticket.status === 'Open') {
      items.push({
        id: `updated-${ticket.id}`,
        type: 'ticket_updated',
        title: 'Ticket Updated',
        description: `${ticket.ticketNumber} details were updated.`,
        occurredAt: ticket.updatedAt,
      });
    } else {
      items.push({
        id: `status-${ticket.id}`,
        type: 'status_changed',
        title: 'Status Changed',
        description: `${ticket.ticketNumber} is now ${ticket.status}.`,
        occurredAt: ticket.updatedAt,
      });
    }
  }

  for (const [ticketId, comments] of Object.entries(commentsByTicketId)) {
    const ticket = ticketsById.get(ticketId);
    const ticketLabel = ticket?.ticketNumber ?? 'a ticket';

    for (const comment of comments) {
      items.push({
        id: `comment-${comment.id}`,
        type: 'comment_added',
        title: 'Comment Added',
        description: `A new comment was added to ${ticketLabel}.`,
        occurredAt: comment.createdAt,
      });
    }
  }

  return items
    .sort((left, right) => new Date(right.occurredAt).getTime() - new Date(left.occurredAt).getTime())
    .slice(0, limit);
}

export function buildDashboardSummary(
  tickets: Ticket[],
  users: User[],
  commentsByTicketId: Record<string, Comment[]> = {},
): DashboardSummary {
  const usersById = buildUsersById(users);

  return {
    stats: buildDashboardStats(tickets, users),
    recentTickets: buildRecentTickets(tickets, usersById),
    recentActivity: buildRecentActivity(tickets, commentsByTicketId),
  };
}
