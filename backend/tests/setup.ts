/**
 * Jest setup for the backend test suite.
 *
 * Starts mongodb-memory-server, connects Mongoose, and clears collections
 * before each test. Application behavior is unchanged; tests use createApp().
 */
import {
  clearDatabase,
  connectTestDatabase,
  disconnectTestDatabase,
  startTestDatabase,
  stopTestDatabase,
} from './helpers/database.helper';

process.env.NODE_ENV = 'test';
process.env.PORT = process.env.PORT ?? '3001';
process.env.CORS_ORIGINS = process.env.CORS_ORIGINS ?? 'http://localhost:5173';
process.env.MONGODB_URI =
  process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/stms-test-placeholder';

beforeAll(async () => {
  const uri = await startTestDatabase();
  process.env.MONGODB_URI = uri;
  await connectTestDatabase(uri);
});

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
  await disconnectTestDatabase();
  await stopTestDatabase();
});
