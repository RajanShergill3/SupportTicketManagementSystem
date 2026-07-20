/**
 * Resolves seed user emails to MongoDB user ids.
 */
import { userRepository } from '../../repositories/user.repository';
import { normalizeEmail } from '../../utils/email.util';
import { NotFoundError } from '../../utils/errors';

export const resolveUserIdByEmail = async (email: string): Promise<string> => {
  const user = await userRepository.findByEmail(normalizeEmail(email));

  if (!user) {
    throw new NotFoundError(`Seed user not found for email: ${email}`);
  }

  return user._id.toString();
};
