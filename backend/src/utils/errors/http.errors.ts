import { HttpStatus } from '../../constants';
import { ApiMessages } from '../../constants/messages.constants';
import { AppError } from './app.error';

export class BadRequestError extends AppError {
  constructor(message: string = ApiMessages.BAD_REQUEST, errors: string[] = []) {
    super(message, HttpStatus.BAD_REQUEST, errors);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = ApiMessages.NOT_FOUND, errors: string[] = []) {
    super(message, HttpStatus.NOT_FOUND, errors);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = ApiMessages.CONFLICT, errors: string[] = []) {
    super(message, HttpStatus.CONFLICT, errors);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = ApiMessages.INTERNAL_SERVER_ERROR, errors: string[] = []) {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR, errors);
  }
}
