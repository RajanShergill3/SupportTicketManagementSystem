import { IComment } from './comment.types';

/**
 * Comment representation returned by Comment APIs.
 */
export interface CommentResponse {
  id: string;
  ticketId: string;
  message: string;
  createdBy: string;
  createdAt: Date;
}

export const toCommentResponse = (comment: IComment): CommentResponse => ({
  id: comment._id.toString(),
  ticketId: comment.ticketId.toString(),
  message: comment.message,
  createdBy: comment.createdBy.toString(),
  createdAt: comment.createdAt,
});
