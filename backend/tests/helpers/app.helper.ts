import { Application } from 'express';

import createApp from '../../src/app';

/**
 * Returns a fresh Express application instance for integration tests.
 * Uses the existing createApp() factory so tests stay independent of server.ts.
 */
export function getTestApp(): Application {
  return createApp();
}
