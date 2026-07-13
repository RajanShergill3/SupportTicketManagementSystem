/**
 * Helpers for sending consistent API success responses.
 */
import { Response } from 'express';

import { HttpStatus } from '../constants';
import { ApiMessages } from '../constants/messages.constants';
import { ApiSuccessResponse } from '../types';

export interface SendSuccessOptions {
  message?: string;
  statusCode?: number;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  options: SendSuccessOptions = {},
): void => {
  const { message = ApiMessages.OPERATION_SUCCESS, statusCode = HttpStatus.OK } = options;

  const body: ApiSuccessResponse<T> = {
    success: true,
    data,
    message,
  };

  res.status(statusCode).json(body);
};
