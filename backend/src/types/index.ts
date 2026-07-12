/**
 * Shared TypeScript types used across the backend application.
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
}

export interface HealthCheckResponse {
  success: true;
  message: string;
}

export interface AppError extends Error {
  statusCode?: number;
  errors?: string[];
}
