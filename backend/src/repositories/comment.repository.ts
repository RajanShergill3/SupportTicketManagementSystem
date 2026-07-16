/**
 * Comment repository.
 *
 * Responsible for Comment persistence only. No business rules or validation.
 */
import { CommentModel } from '../models/comment.model';
import { CreateCommentInput, IComment } from '../types/comment.types';

export class CommentRepository {
  async findByTicketId(ticketId: string): Promise<IComment[]> {
    return CommentModel.find({ ticketId })
      .sort({ createdAt: 1 })
      .lean<IComment[]>()
      .exec();
  }

  async findById(id: string): Promise<IComment | null> {
    return CommentModel.findById(id).lean<IComment | null>().exec();
  }

  async create(input: CreateCommentInput): Promise<IComment> {
    const comment = await CommentModel.create(input);
    return comment.toObject();
  }
}

export const commentRepository = new CommentRepository();
