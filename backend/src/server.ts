/**
 * Application entry point.
 *
 * Bootstraps the application in order: validate config → connect MongoDB →
 * start the HTTP server. On shutdown, closes the HTTP server and disconnects
 * from MongoDB before exiting.
 */
import { Server } from 'http';

import createApp from './app';
import { config } from './config';
import { connectDatabase, disconnectDatabase } from './database/connection';

let server: Server | undefined;

const shutdown = async (signal: string, exitCode = 0): Promise<void> => {
  console.log(`${signal} received. Shutting down gracefully...`);

  if (server) {
    await new Promise<void>((resolve, reject) => {
      server!.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        console.log('HTTP server closed');
        resolve();
      });
    });
  }

  try {
    await disconnectDatabase();
  } catch (error) {
    console.error('Error during database disconnect:', error);
    process.exit(1);
  }

  process.exit(exitCode);
};

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();

    const app = createApp();

    server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
    });

    process.on('SIGTERM', () => void shutdown('SIGTERM'));
    process.on('SIGINT', () => void shutdown('SIGINT'));
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`Failed to start application: ${message}`);
    await shutdown('STARTUP_FAILURE', 1);
  }
};

void startServer();
