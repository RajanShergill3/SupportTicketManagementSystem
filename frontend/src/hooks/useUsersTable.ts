import { useEffect, useMemo, useState } from 'react';

import { mockUsers } from '@/data/users.placeholder';
import { type User } from '@/types/user.types';

const PAGE_SIZE = 5;
const ALL = 'all';

export function useUsersTable(sourceUsers: User[] = mockUsers) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState(ALL);
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 600);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter, statusFilter]);

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sourceUsers.filter((user) => {
      const matchesSearch =
        query.length === 0 ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);

      const matchesRole = roleFilter === ALL || user.role === roleFilter;
      const matchesStatus = statusFilter === ALL || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [sourceUsers, search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE));

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredUsers.slice(start, start + PAGE_SIZE);
  }, [filteredUsers, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleRefresh = () => {
    setSearch('');
    setRoleFilter(ALL);
    setStatusFilter(ALL);
    setCurrentPage(1);
    setError(null);
    setIsLoading(true);

    window.setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  const clearError = () => setError(null);

  return {
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    setError,
    clearError,
    filteredUsers,
    paginatedUsers,
    totalPages,
    pageSize: PAGE_SIZE,
    handleRefresh,
  };
}
