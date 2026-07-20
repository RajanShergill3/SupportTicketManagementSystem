/**
 * Jest global teardown.
 *
 * Ensures the in-memory MongoDB process and Mongoose connection are closed
 * after the test run. Primary cleanup also runs in setup.ts afterAll; this
 * file is a safety net for abrupt suite exits.
 */
import mongoose from 'mongoose';

export default async function globalTeardown(): Promise<void> {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
