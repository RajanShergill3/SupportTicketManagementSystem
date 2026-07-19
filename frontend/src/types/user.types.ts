export type UserRole = 'Admin' | 'Developer' | 'QA';

export type UserStatus = 'Active' | 'Inactive';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}
