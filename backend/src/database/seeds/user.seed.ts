/**
 * Idempotent User seed logic.
 *
 * Creates default users for development and testing. Uses email as the
 * deterministic identity and skips users that already exist.
 */
import { userRepository } from '../../repositories/user.repository';
import { normalizeEmail } from '../../utils/email.util';
import { logger } from '../../utils/logger.util';
import { SEED_USERS } from './user.seed-data';

export const seedUsers = async (): Promise<{ usersCreated: number }> => {
  logger.info(`Seeding ${SEED_USERS.length} users...`);

  let usersCreated = 0;

  for (const seedUser of SEED_USERS) {
    const email = normalizeEmail(seedUser.email);
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      logger.info(`Seed user already exists, skipping: ${email}`);
      continue;
    }

    await userRepository.create({
      name: seedUser.name.trim(),
      email,
      role: seedUser.role,
    });

    usersCreated += 1;
    logger.info(`Created seed user: ${email} (${seedUser.role})`);
  }

  logger.info('User seeding finished');
  return { usersCreated };
};
