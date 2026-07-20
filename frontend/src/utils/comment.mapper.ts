import { type CommentApiDto } from '@/types/comment-api.types';
import { type Comment } from '@/types/comment.types';

/**
 * Maps backend comment DTOs into frontend Comment models.
 */
export function mapCommentFromApi(dto: CommentApiDto): Comment {
  return {
    id: dto.id,
    ticketId: dto.ticketId,
    message: dto.message,
    createdBy: dto.createdBy,
    createdAt: dto.createdAt,
  };
}
