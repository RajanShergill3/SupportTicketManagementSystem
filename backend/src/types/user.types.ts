import { Types } from 'mongoose';

import { UserRole } from '../constants/user-role.constants';

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  name: string;
  email: string;
  role: UserRole;
}

/**
 * Payload shape accepted by the User validator before type narrowing.
 */
export interface CreateUserPayload {
  name: unknown;
  email: unknown;
  role: unknown;
}
