import { commentService } from '@/services/comment.service';
import { ticketService } from '@/services/ticket.service';
import { userService } from '@/services/user.service';
import { type Comment } from '@/types/comment.types';
import { type DashboardSummary } from '@/types/dashboard.types';
import {
  buildDashboardSummary,
  DASHBOARD_COMMENT_TICKET_LIMIT,
  sortTicketsByCreatedAtDesc,
} from '@/utils/dashboard.util';

async function loadCommentsForTickets(
  ticketIds: string[],
): Promise<Record<string, Comment[]>> {
  const results = await Promise.all(
    ticketIds.map(async (ticketId) => {
      try {
        const comments = await commentService.getComments(ticketId);
        return [ticketId, comments] as const;
      } catch {
        // Comment enrichment is best-effort; dashboard stats still load.
        return [ticketId, [] as Comment[]] as const;
      }
    }),
  );

  return Object.fromEntries(results);
}

/**
 * Aggregates dashboard metrics from existing ticket, user, and comment APIs.
 * Does not introduce a dedicated backend dashboard endpoint.
 */
async function getDashboardSummary(): Promise<DashboardSummary> {
  const [tickets, users] = await Promise.all([
    ticketService.getTickets(),
    userService.getUsers(),
  ]);

  const commentTicketIds = sortTicketsByCreatedAtDesc(tickets)
    .slice(0, DASHBOARD_COMMENT_TICKET_LIMIT)
    .map((ticket) => ticket.id);

  const commentsByTicketId =
    commentTicketIds.length > 0 ? await loadCommentsForTickets(commentTicketIds) : {};

  return buildDashboardSummary(tickets, users, commentsByTicketId);
}

export const dashboardService = {
  getDashboardSummary,
};
