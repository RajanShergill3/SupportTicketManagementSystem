/**
 * Database seed entry point.
 *
 * Connects to MongoDB, clears demo tickets/comments, seeds users,
 * tickets, and comments for local development. Does not start the HTTP server.
 */
import { connectDatabase, disconnectDatabase } from './connection';
import { seedComments } from './seeds/comment.seed';
import { clearDemoData } from './seeds/clear-demo-data';
import { seedTickets } from './seeds/ticket.seed';
import { seedUsers } from './seeds/user.seed';
import { logger } from '../utils/logger.util';

const runSeed = async (): Promise<void> => {
  try {
    logger.info('Starting database seed...');
    await connectDatabase();

    await clearDemoData();
    const { usersCreated } = await seedUsers();
    const { ticketsCreated, ticketsByTitle } = await seedTickets();
    const { commentsCreated } = await seedComments(ticketsByTitle);

    logger.info('Database seed completed successfully');
    logger.info(
      `Summary: ${usersCreated} users created, ${ticketsCreated} tickets created, ${commentsCreated} comments created`,
    );
  } catch (error) {
    logger.error('Database seed failed', error);
    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
    process.exit(process.exitCode ?? 0);
  }
};

void runSeed();
