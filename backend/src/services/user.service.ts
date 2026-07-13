/**
 * User service.
 *
 * Contains User domain business rules. Coordinates validation,
 * duplicate checks, and repository access. No Express dependencies.
 */
import { MongoServerError } from 'mongodb';
import { isValidObjectId } from 'mongoose';

import { UserMessages } from '../constants/user-messages.constants';
import { userRepository, UserRepository } from '../repositories/user.repository';
import { CreateUserPayload, IUser } from '../types/user.types';
import { validateCreateUserInput } from '../validators/user.validator';
import { ConflictError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger.util';

const isDuplicateKeyError = (error: unknown): boolean => {
  return error instanceof MongoServerError && error.code === 11000;
};

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getAllUsers(): Promise<IUser[]> {
    return this.repository.findAll();
  }

  async getUserById(id: string): Promise<IUser> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(UserMessages.NOT_FOUND);
    }

    const user = await this.repository.findById(id);

    if (!user) {
      throw new NotFoundError(UserMessages.NOT_FOUND);
    }

    return user;
  }

  async createUser(payload: CreateUserPayload): Promise<IUser> {
    const input = validateCreateUserInput(payload);

    const existingUser = await this.repository.findByEmail(input.email);

    if (existingUser) {
      throw new ConflictError(UserMessages.DUPLICATE_EMAIL);
    }

    try {
      return await this.repository.create(input);
    } catch (error) {
      if (isDuplicateKeyError(error)) {
        throw new ConflictError(UserMessages.DUPLICATE_EMAIL);
      }

      logger.error('Failed to create user', error);
      throw error;
    }
  }
}

export const userService = new UserService(userRepository);
