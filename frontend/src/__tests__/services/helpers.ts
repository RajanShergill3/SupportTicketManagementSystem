import { AxiosError, type AxiosResponse } from 'axios';
import { vi } from 'vitest';

import type apiClient from '@/api/client';

export type MockedApiClient = {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  patch: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

export function createMockedApiClient(): MockedApiClient {
  return {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  };
}

export function asMockedApiClient(client: typeof apiClient): MockedApiClient {
  return client as unknown as MockedApiClient;
}

export function mockApiSuccess<T>(data: T) {
  return {
    data: {
      success: true as const,
      data,
      message: 'Operation successful',
    },
  };
}

export function createApiAxiosError(status: number, message: string): AxiosError {
  return new AxiosError(
    message,
    AxiosError.ERR_BAD_REQUEST,
    undefined,
    undefined,
    {
      status,
      statusText: 'Error',
      data: {
        success: false,
        message,
        errors: [],
      },
      headers: {},
      config: { headers: {} },
    } as AxiosResponse,
  );
}
