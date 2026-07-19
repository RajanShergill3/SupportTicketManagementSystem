import { type UserRole } from '@/types/user.types';

/**
 * User shape returned by GET /users and GET /users/:id.
 */
export interface UserApiDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
