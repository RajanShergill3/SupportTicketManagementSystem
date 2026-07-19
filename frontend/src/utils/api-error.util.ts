import axios from 'axios';

import { type ApiErrorResponse } from '@/types/api.types';

/**
 * Normalizes Axios and unknown errors into user-facing messages.
 */
export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Unable to reach the server. Check your connection and try again.';
    }

    const data = error.response.data as Partial<ApiErrorResponse> | undefined;

    if (data?.message) {
      return data.message;
    }

    if (error.response.status >= 500) {
      return 'A server error occurred. Please try again later.';
    }

    return 'An unexpected error occurred. Please try again.';
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'An unexpected error occurred. Please try again.';
}
