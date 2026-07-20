import { Types } from 'mongoose';

import { UserRole } from '../../src/constants/user-role.constants';
import { UserModel } from '../../src/models/user.model';
import { IUser } from '../../src/types/user.types';

export interface CreateTestUserOptions {
  name?: string;
  email?: string;
  role?: UserRole;
}

let userSequence = 0;

/**
 * Creates and persists a user document for tests.
 */
export async function createTestUser(options: CreateTestUserOptions = {}): Promise<IUser> {
  userSequence += 1;

  const user = await UserModel.create({
    name: options.name ?? `Test User ${userSequence}`,
    email: options.email ?? `test.user.${userSequence}@example.com`,
    role: options.role ?? UserRole.DEVELOPER,
  });

  return user.toObject();
}

/**
 * Returns a random ObjectId string for negative-path tests.
 */
export function createObjectIdString(): string {
  return new Types.ObjectId().toString();
}
