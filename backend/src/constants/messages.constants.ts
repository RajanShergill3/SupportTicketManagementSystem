/**
 * Generic API messages shared across the application.
 * Domain-specific messages belong in their respective modules.
 */
export const ApiMessages = {
  OPERATION_SUCCESS: 'Operation completed successfully.',
  VALIDATION_FAILED: 'Validation failed',
  INTERNAL_SERVER_ERROR: 'Internal Server Error',
  ROUTE_NOT_FOUND: 'Route not found',
  BAD_REQUEST: 'Bad Request',
  NOT_FOUND: 'Resource not found',
  CONFLICT: 'Conflict',
} as const;
