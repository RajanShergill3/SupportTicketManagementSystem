/**
 * Global error handling middleware.
 *
 * Catches unhandled errors and returns a consistent API error response
 * as defined in the project acceptance criteria.
 */
import { NextFunction, Request, Response } from 'express';

import { ApiMessages, HttpStatus } from '../constants';
import { AppError } from '../utils/errors';
import { logger } from '../utils/logger.util';

export const notFoundMiddleware = (req: Request, res: Response): void => {
  res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: `${ApiMessages.ROUTE_NOT_FOUND}: ${req.method} ${req.originalUrl}`,
    errors: [],
  });
};

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof AppError) {
    if (err.statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      logger.error(err.message, err);
    }

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  logger.error('Unhandled error', err);

  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: ApiMessages.INTERNAL_SERVER_ERROR,
    errors: [],
  });
};
