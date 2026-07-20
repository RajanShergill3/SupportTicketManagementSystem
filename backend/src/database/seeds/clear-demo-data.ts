/**
 * Clears development demo tickets and comments before reseeding.
 *
 * Users are preserved so idempotent user seeding can reuse existing accounts.
 */
import { CommentModel } from '../../models/comment.model';
import { TicketModel } from '../../models/ticket.model';
import { logger } from '../../utils/logger.util';

export const clearDemoData = async (): Promise<{ ticketsDeleted: number; commentsDeleted: number }> => {
  const [commentResult, ticketResult] = await Promise.all([
    CommentModel.deleteMany({}),
    TicketModel.deleteMany({}),
  ]);

  logger.info(
    `Cleared demo data: ${ticketResult.deletedCount ?? 0} tickets, ${commentResult.deletedCount ?? 0} comments`,
  );

  return {
    ticketsDeleted: ticketResult.deletedCount ?? 0,
    commentsDeleted: commentResult.deletedCount ?? 0,
  };
};
