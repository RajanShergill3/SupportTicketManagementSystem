import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let memoryServer: MongoMemoryServer | undefined;

/**
 * Starts an in-memory MongoDB instance for the test suite.
 */
export async function startTestDatabase(): Promise<string> {
  if (memoryServer) {
    return memoryServer.getUri();
  }

  memoryServer = await MongoMemoryServer.create();
  return memoryServer.getUri();
}

/**
 * Stops the in-memory MongoDB instance if it is running.
 */
export async function stopTestDatabase(): Promise<void> {
  if (!memoryServer) {
    return;
  }

  await memoryServer.stop();
  memoryServer = undefined;
}

/**
 * Connects Mongoose to the provided URI when not already connected.
 */
export async function connectTestDatabase(uri: string): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(uri);
}

/**
 * Disconnects Mongoose from the current database.
 */
export async function disconnectTestDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 0) {
    return;
  }

  await mongoose.disconnect();
}

/**
 * Removes all documents from every collection in the active database.
 */
export async function clearDatabase(): Promise<void> {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  const collections = mongoose.connection.collections;

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({});
    }),
  );
}
