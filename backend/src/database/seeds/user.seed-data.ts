import { UserRole } from '../../constants/user-role.constants';

/**
 * Deterministic seed user definitions for development and testing.
 */
export interface SeedUserDefinition {
  name: string;
  email: string;
  role: (typeof UserRole)[keyof typeof UserRole];
}

export const SEED_USERS: SeedUserDefinition[] = [
  {
    name: 'System Admin',
    email: 'admin@supportticket.local',
    role: UserRole.ADMIN,
  },
  {
    name: 'Demo Developer',
    email: 'developer@supportticket.local',
    role: UserRole.DEVELOPER,
  },
  {
    name: 'Demo QA',
    email: 'qa@supportticket.local',
    role: UserRole.QA,
  },
];
