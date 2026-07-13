/**
 * User domain-specific API messages.
 */
export const UserMessages = {
  NOT_FOUND: 'User not found',
  DUPLICATE_EMAIL: 'A user with this email already exists',
  INVALID_EMAIL: 'email must be a valid email address',
  INVALID_ROLE: 'role must be one of: Admin, Developer, QA',
} as const;
