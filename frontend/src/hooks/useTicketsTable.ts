import { useCallback, useEffect, useMemo, useState } from 'react';

import { mockTickets } from '@/data/tickets.placeholder';
import { type Ticket } from '@/types/ticket.types';

const PAGE_SIZE = 5;
const ALL = 'all';
const LOAD_DELAY_MS = 600;

export function useTicketsTable(sourceTickets: Ticket[] = mockTickets) {
  const [tickets, setTickets] = useState<Ticket[]>(sourceTickets);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [priorityFilter, setPriorityFilter] = useState(ALL);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), LOAD_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, priorityFilter]);

  const filteredTickets = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      const matchesSearch =
        query.length === 0 ||
        ticket.ticketNumber.toLowerCase().includes(query) ||
        ticket.title.toLowerCase().includes(query) ||
        ticket.reporter.toLowerCase().includes(query) ||
        ticket.assignee.toLowerCase().includes(query);

      const matchesStatus = statusFilter === ALL || ticket.status === statusFilter;
      const matchesPriority = priorityFilter === ALL || ticket.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tickets, search, statusFilter, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTickets.length / PAGE_SIZE));

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTickets.slice(start, start + PAGE_SIZE);
  }, [filteredTickets, currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const refresh = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setTickets([...mockTickets]);

    window.setTimeout(() => {
      setIsLoading(false);
    }, LOAD_DELAY_MS);
  }, []);

  const resetFilters = useCallback(() => {
    setSearch('');
    setStatusFilter(ALL);
    setPriorityFilter(ALL);
    setCurrentPage(1);
  }, []);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    currentPage,
    setCurrentPage,
    isLoading,
    error,
    setError,
    refresh,
    resetFilters,
    filteredTickets,
    paginatedTickets,
    totalPages,
    pageSize: PAGE_SIZE,
  };
}
