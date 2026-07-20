import { useCallback, useEffect, useMemo, useState } from 'react';

import { userService } from '@/services/user.service';
import { type User } from '@/types/user.types';

export interface UserOption {
  label: string;
  value: string;
}

export function useUsersOptions() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setUsers([]);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const options = useMemo<UserOption[]>(
    () => users.map((user) => ({ label: user.name, value: user.id })),
    [users],
  );

  return {
    users,
    options,
    isLoading,
    error,
    refresh: fetchUsers,
  };
}
