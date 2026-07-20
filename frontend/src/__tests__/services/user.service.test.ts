import { beforeEach, describe, expect, it, vi } from 'vitest';

import apiClient from '@/api/client';
import { userService } from '@/services/user.service';
import { type UserApiDto } from '@/types/user-api.types';

import {
  asMockedApiClient,
  createApiAxiosError,
  mockApiSuccess,
} from './helpers';

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedApiClient = asMockedApiClient(apiClient);

const userDto: UserApiDto = {
  id: '507f1f77bcf86cd799439021',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'Developer',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
};

describe('userService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getUsers calls GET /users and returns mapped users', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess([userDto]));

    const result = await userService.getUsers();

    expect(mockedApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockedApiClient.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual([
      {
        id: userDto.id,
        name: userDto.name,
        email: userDto.email,
        role: userDto.role,
        status: 'Active',
        createdAt: userDto.createdAt,
      },
    ]);
  });

  it('getUsers returns an empty array when the API returns no users', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess([]));

    const result = await userService.getUsers();

    expect(mockedApiClient.get).toHaveBeenCalledWith('/users');
    expect(result).toEqual([]);
  });

  it('getUsers propagates API errors', async () => {
    mockedApiClient.get.mockRejectedValue(createApiAxiosError(500, 'Server unavailable'));

    await expect(userService.getUsers()).rejects.toThrow('Server unavailable');
  });

  it('getUserById calls GET /users/:id and returns a mapped user', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess(userDto));

    const result = await userService.getUserById(userDto.id);

    expect(mockedApiClient.get).toHaveBeenCalledWith(`/users/${userDto.id}`);
    expect(result).toEqual({
      id: userDto.id,
      name: userDto.name,
      email: userDto.email,
      role: userDto.role,
      status: 'Active',
      createdAt: userDto.createdAt,
    });
  });

  it('getUserById propagates API errors for missing users', async () => {
    mockedApiClient.get.mockRejectedValue(createApiAxiosError(404, 'User not found'));

    await expect(userService.getUserById(userDto.id)).rejects.toThrow('User not found');
    expect(mockedApiClient.get).toHaveBeenCalledWith(`/users/${userDto.id}`);
  });

  it('getUserById propagates API errors for invalid responses', async () => {
    mockedApiClient.get.mockRejectedValue(
      createApiAxiosError(400, 'An unexpected error occurred. Please try again.'),
    );

    await expect(userService.getUserById('not-a-valid-id')).rejects.toThrow(
      'An unexpected error occurred. Please try again.',
    );
  });
});
