/**
 * Supported user roles in the Support Ticket Management System.
 *
 * String literal values match the functional specification exactly so
 * stored documents, TypeScript types, and future API responses stay aligned.
 */
export const UserRole = {
  ADMIN: 'Admin',
  DEVELOPER: 'Developer',
  QA: 'QA',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const USER_ROLES: UserRole[] = Object.values(UserRole);

export const isUserRole = (value: unknown): value is UserRole => {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole);
};
