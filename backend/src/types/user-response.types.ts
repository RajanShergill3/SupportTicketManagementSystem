import { UserRole } from '../constants/user-role.constants';
import { IUser } from './user.types';

/**
 * User representation returned by read-only User APIs.
 */
export interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export const toUserResponse = (user: IUser): UserResponse => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
