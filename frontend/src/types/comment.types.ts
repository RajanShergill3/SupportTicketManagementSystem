export interface Comment {
  id: string;
  ticketId: string;
  message: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateCommentInput {
  message: string;
  createdBy: string;
}
