import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useUsersOptions } from '@/hooks/useUsersOptions';
import { userService } from '@/services/user.service';

import { mockUser, mockUserTwo } from './fixtures';

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

const getUsers = vi.mocked(userService.getUsers);

describe('useUsersOptions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts loading and maps users into select options', async () => {
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    const { result } = renderHook(() => useUsersOptions());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.users).toHaveLength(2);
    expect(result.current.options).toEqual([
      { label: mockUser.name, value: mockUser.id },
      { label: mockUserTwo.name, value: mockUserTwo.id },
    ]);
    expect(result.current.error).toBeNull();
  });

  it('handles an empty response', async () => {
    getUsers.mockResolvedValue([]);

    const { result } = renderHook(() => useUsersOptions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.users).toEqual([]);
    expect(result.current.options).toEqual([]);
  });

  it('stores an error when loading fails', async () => {
    getUsers.mockRejectedValue(new Error('Failed to load users'));

    const { result } = renderHook(() => useUsersOptions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to load users');
    expect(result.current.options).toEqual([]);
  });

  it('refetches users when refresh is called', async () => {
    getUsers.mockResolvedValue([mockUser]);

    const { result } = renderHook(() => useUsersOptions());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.options).toHaveLength(2);
  });
});
