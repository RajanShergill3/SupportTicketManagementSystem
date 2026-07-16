/**
 * Comment service.
 *
 * Contains Comment domain business rules. Coordinates validation,
 * ticket and user existence checks, and repository access.
 * No Express dependencies.
 */
import { isValidObjectId } from 'mongoose';

import { CommentMessages } from '../constants/comment-messages.constants';
import { TicketMessages } from '../constants/ticket-messages.constants';
import { commentRepository, CommentRepository } from '../repositories/comment.repository';
import { ticketRepository, TicketRepository } from '../repositories/ticket.repository';
import { userRepository, UserRepository } from '../repositories/user.repository';
import { CreateCommentPayload, IComment } from '../types/comment.types';
import { validateCreateCommentInput } from '../validators/comment.validator';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger.util';

export class CommentService {
  constructor(
    private readonly repository: CommentRepository,
    private readonly tickets: TicketRepository,
    private readonly users: UserRepository,
  ) {}

  async getCommentsByTicketId(ticketId: string): Promise<IComment[]> {
    if (!isValidObjectId(ticketId)) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    const ticket = await this.tickets.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    return this.repository.findByTicketId(ticketId);
  }

  async getCommentById(id: string): Promise<IComment> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(CommentMessages.NOT_FOUND);
    }

    const comment = await this.repository.findById(id);

    if (!comment) {
      throw new NotFoundError(CommentMessages.NOT_FOUND);
    }

    return comment;
  }

  async createComment(payload: CreateCommentPayload): Promise<IComment> {
    const input = validateCreateCommentInput(payload);

    await this.ensureTicketExists(input.ticketId);
    await this.ensureUserExists(input.createdBy, CommentMessages.CREATOR_NOT_FOUND);

    try {
      return await this.repository.create(input);
    } catch (error) {
      logger.error('Failed to create comment', error);
      throw error;
    }
  }

  private async ensureTicketExists(ticketId: string): Promise<void> {
    const ticket = await this.tickets.findById(ticketId);

    if (!ticket) {
      throw new BadRequestError(CommentMessages.TICKET_NOT_FOUND);
    }
  }

  private async ensureUserExists(userId: string, message: string): Promise<void> {
    const user = await this.users.findById(userId);

    if (!user) {
      throw new BadRequestError(message);
    }
  }
}

export const commentService = new CommentService(
  commentRepository,
  ticketRepository,
  userRepository,
);
