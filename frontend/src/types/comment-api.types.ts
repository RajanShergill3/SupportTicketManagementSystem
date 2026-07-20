/**
 * Comment shape returned by GET/POST /tickets/:id/comments.
 */
export interface CommentApiDto {
  id: string;
  ticketId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}
