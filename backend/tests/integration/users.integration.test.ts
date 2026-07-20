import { UserMessages } from '../../src/constants/user-messages.constants';
import { createObjectIdString, createTestUser, testApi } from '../helpers';

describe('GET /api/v1/users', () => {
  it('returns 200 with an array of users', async () => {
    await createTestUser({ name: 'Alice', email: 'alice@example.com' });
    await createTestUser({ name: 'Bob', email: 'bob@example.com' });

    const response = await testApi.get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data).toHaveLength(2);
  });

  it('returns 200 with an empty array when no users exist', async () => {
    const response = await testApi.get('/api/v1/users');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual([]);
  });
});

describe('GET /api/v1/users/:id', () => {
  it('returns 200 for an existing user', async () => {
    const user = await createTestUser({ name: 'Charlie', email: 'charlie@example.com' });

    const response = await testApi.get(`/api/v1/users/${user._id.toString()}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toMatchObject({
      id: user._id.toString(),
      name: 'Charlie',
      email: 'charlie@example.com',
    });
  });

  it('returns 404 for an invalid ObjectId', async () => {
    const response = await testApi.get('/api/v1/users/not-a-valid-id');

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(UserMessages.NOT_FOUND);
  });

  it('returns 404 for a non-existing ObjectId', async () => {
    const response = await testApi.get(`/api/v1/users/${createObjectIdString()}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(UserMessages.NOT_FOUND);
  });
});
