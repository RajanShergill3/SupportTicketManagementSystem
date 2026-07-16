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
import ticketRoutes from './routes/ticket.routes';
import userRoutes from './routes/user.routes';

const createApp = (): Application => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(healthRoutes);
  app.use('/api/v1/users', userRoutes);
  app.use('/api/v1/tickets', ticketRoutes);

  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
};

export default createApp;
