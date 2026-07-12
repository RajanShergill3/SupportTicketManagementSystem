/**
 * MongoDB connection utility.
 *
 * Manages the Mongoose connection lifecycle: connect, disconnect, and
 * connection event logging. Database access for domain models will be
 * added in later tasks via the Repository layer.
 */
import mongoose from 'mongoose';

import { config } from '../config';

const CONNECTION_TIMEOUT_MS = 5000;

let eventHandlersRegistered = false;

/**
 * Masks credentials in a MongoDB URI before writing it to logs.
 */
const maskMongoUri = (uri: string): string => {
  try {
    const url = new URL(uri);

    if (url.username) {
      url.username = '****';
    }

    if (url.password) {
      url.password = '****';
    }

    return url.toString();
  } catch {
    return '[invalid-uri]';
  }
};

const registerConnectionEventHandlers = (): void => {
  if (eventHandlersRegistered) {
    return;
  }

  eventHandlersRegistered = true;

  mongoose.connection.on('connected', () => {
    console.log(`[MongoDB] Connected to ${maskMongoUri(config.mongodbUri)}`);
  });

  mongoose.connection.on('error', (error: Error) => {
    console.error('[MongoDB] Connection error:', error.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] Disconnected');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('[MongoDB] Reconnected');
  });
};

export const connectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 1) {
    console.log('[MongoDB] Already connected');
    return;
  }

  registerConnectionEventHandlers();

  console.log(`[MongoDB] Connecting to ${maskMongoUri(config.mongodbUri)}...`);

  await mongoose.connect(config.mongodbUri, {
    serverSelectionTimeoutMS: CONNECTION_TIMEOUT_MS,
  });
};

export const disconnectDatabase = async (): Promise<void> => {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  console.log('[MongoDB] Closing connection...');
  await mongoose.disconnect();
  console.log('[MongoDB] Connection closed');
};

export const getDatabaseConnectionState = (): number => mongoose.connection.readyState;
