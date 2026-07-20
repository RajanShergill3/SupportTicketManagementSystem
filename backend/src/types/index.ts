/**
 * Shared TypeScript types used across the backend application.
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
}

export interface HealthCheckResponse {
  success: true;
  status: 'ok';
  message: string;
}
