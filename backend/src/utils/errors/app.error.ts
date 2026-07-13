/**
 * Base application error class.
 *
 * Operational errors thrown by services and controllers are caught
 * by the global error middleware and converted to API error responses.
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, errors: string[] = []) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = true;
  }
}
