import request, { type Test } from 'supertest';

import { getTestApp } from './app.helper';

/**
 * Creates a Supertest agent bound to a fresh app instance.
 */
export function createTestRequest() {
  return request(getTestApp());
}

/**
 * Convenience helpers for common HTTP verbs against the test app.
 */
export const testApi = {
  get: (url: string): Test => createTestRequest().get(url),
  post: (url: string): Test => createTestRequest().post(url),
  put: (url: string): Test => createTestRequest().put(url),
  patch: (url: string): Test => createTestRequest().patch(url),
  delete: (url: string): Test => createTestRequest().delete(url),
};
