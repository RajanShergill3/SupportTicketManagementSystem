import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useUsersTable } from '@/hooks/useUsersTable';
import { userService } from '@/services/user.service';

import { mockUser, mockUserTwo } from './fixtures';

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

const getUsers = vi.mocked(userService.getUsers);

describe('useUsersTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts loading and loads users successfully', async () => {
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    const { result } = renderHook(() => useUsersTable());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(result.current.filteredUsers).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('handles an empty user list', async () => {
    getUsers.mockResolvedValue([]);

    const { result } = renderHook(() => useUsersTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.filteredUsers).toEqual([]);
    expect(result.current.paginatedUsers).toEqual([]);
  });

  it('stores an error when loading fails', async () => {
    getUsers.mockRejectedValue(new Error('Failed to load users'));

    const { result } = renderHook(() => useUsersTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to load users');
    expect(result.current.filteredUsers).toEqual([]);
  });

  it('filters users by search text and role', async () => {
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    const { result } = renderHook(() => useUsersTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setSearch('bob');
    });

    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].name).toBe('Bob Smith');

    act(() => {
      result.current.setSearch('');
      result.current.setRoleFilter('Developer');
    });

    expect(result.current.filteredUsers).toHaveLength(1);
    expect(result.current.filteredUsers[0].role).toBe('Developer');
  });

  it('refetches users when refresh is called', async () => {
    getUsers.mockResolvedValue([mockUser]);

    const { result } = renderHook(() => useUsersTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    getUsers.mockResolvedValue([mockUser, mockUserTwo]);

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => expect(result.current.filteredUsers).toHaveLength(2));
  });
});
