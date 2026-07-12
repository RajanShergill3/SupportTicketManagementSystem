/**
 * Global error handling middleware.
 *
 * Catches unhandled errors and returns a consistent API error response
 * as defined in the project acceptance criteria.
 */
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../types';

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    errors: [],
  });
};

export const errorMiddleware = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  const statusCode = err.statusCode ?? 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    console.error('[Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors ?? [],
  });
};
