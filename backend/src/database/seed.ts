/**
 * Database seed entry point.
 *
 * Connects to MongoDB, runs idempotent seed scripts, and exits.
 * Does not start the Express HTTP server.
 */
import { connectDatabase, disconnectDatabase } from './connection';
import { seedUsers } from './seeds/user.seed';
import { logger } from '../utils/logger.util';

const runSeed = async (): Promise<void> => {
  try {
    logger.info('Starting database seed...');
    await connectDatabase();
    await seedUsers();
    logger.info('Database seed completed successfully');
  } catch (error) {
    logger.error('Database seed failed', error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
    process.exit(process.exitCode ?? 0);
  }
};

void runSeed();
