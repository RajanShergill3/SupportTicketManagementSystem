/**
 * Express application setup.
 *
 * Configures middleware, registers routes, and attaches error handlers.
 * This module exports a factory so the app can be tested independently
 * from the HTTP server lifecycle in `server.ts`.
 */
import express, { Application } from 'express';

import { errorMiddleware, notFoundMiddleware } from './middleware/error.middleware';
import healthRoutes from './routes/health.routes';

const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(healthRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

export default createApp;
