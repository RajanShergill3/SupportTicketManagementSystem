/**
 * Development comment seed logic.
 */
import { commentRepository } from '../../repositories/comment.repository';
import { ITicket } from '../../types/ticket.types';
import { logger } from '../../utils/logger.util';
import { SEED_COMMENTS } from './comment.seed-data';
import { resolveUserIdByEmail } from './seed-user-resolver';

export const seedComments = async (
  ticketsByTitle: Map<string, ITicket>,
): Promise<{ commentsCreated: number }> => {
  logger.info(`Seeding ${SEED_COMMENTS.length} comments...`);

  let commentsCreated = 0;

  for (const seedComment of SEED_COMMENTS) {
    const ticket = ticketsByTitle.get(seedComment.ticketTitle);

    if (!ticket) {
      throw new Error(`Seed ticket not found for comment: ${seedComment.ticketTitle}`);
    }

    const createdBy = await resolveUserIdByEmail(seedComment.createdByEmail);

    await commentRepository.create({
      ticketId: ticket._id.toString(),
      message: seedComment.message,
      createdBy,
    });

    commentsCreated += 1;
    logger.info(`Created seed comment on ticket: ${seedComment.ticketTitle}`);
  }

  logger.info('Comment seeding finished');
  return { commentsCreated };
};
