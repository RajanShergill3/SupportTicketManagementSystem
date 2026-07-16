/**
 * Comment domain-specific messages.
 */
export const CommentMessages = {
  NOT_FOUND: 'Comment not found',
  INVALID_TICKET: 'ticketId must be a valid ticket ID',
  INVALID_CREATOR: 'createdBy must be a valid user ID',
  TICKET_NOT_FOUND: 'Ticket does not exist',
  CREATOR_NOT_FOUND: 'Creator user does not exist',
  EMPTY_MESSAGE: 'message cannot be empty',
} as const;
