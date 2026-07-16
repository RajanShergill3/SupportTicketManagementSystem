/**
 * Ticket domain-specific messages.
 */
export const TicketMessages = {
  NOT_FOUND: 'Ticket not found',
  INVALID_PRIORITY: 'priority must be one of: Low, Medium, High, Critical',
  INVALID_STATUS: 'status must be one of: Open, In Progress, Resolved, Closed, Cancelled',
  INVALID_ASSIGNEE: 'assignedTo must be a valid user ID',
  INVALID_CREATOR: 'createdBy must be a valid user ID',
  ASSIGNEE_NOT_FOUND: 'Assigned user does not exist',
  CREATOR_NOT_FOUND: 'Creator user does not exist',
  INVALID_STATUS_TRANSITION: 'Invalid status transition',
} as const;
