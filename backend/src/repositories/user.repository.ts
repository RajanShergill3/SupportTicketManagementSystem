/**
 * User repository.
 *
 * Responsible for User persistence only. No business rules or validation.
 */
import { UserModel } from '../models/user.model';
import { CreateUserInput, IUser } from '../types/user.types';
import { normalizeEmail } from '../utils/email.util';

export class UserRepository {
  async findAll(): Promise<IUser[]> {
    return UserModel.find().sort({ name: 1 }).lean<IUser[]>().exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).lean<IUser | null>().exec();
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email: normalizeEmail(email) })
      .lean<IUser | null>()
      .exec();
  }

  async create(input: CreateUserInput): Promise<IUser> {
    const user = await UserModel.create(input);
    return user.toObject();
  }
}

export const userRepository = new UserRepository();
