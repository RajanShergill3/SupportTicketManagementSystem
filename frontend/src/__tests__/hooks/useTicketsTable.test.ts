import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTicketsTable } from '@/hooks/useTicketsTable';
import { ticketService } from '@/services/ticket.service';

import { mockTicket, mockTicketTwo } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTickets: vi.fn(),
  },
}));

const getTickets = vi.mocked(ticketService.getTickets);

describe('useTicketsTable', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts loading and loads tickets successfully', async () => {
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    const { result } = renderHook(() => useTicketsTable());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTickets).toHaveBeenCalledTimes(1);
    expect(result.current.filteredTickets).toHaveLength(2);
    expect(result.current.paginatedTickets).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('handles an empty ticket list', async () => {
    getTickets.mockResolvedValue([]);

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.filteredTickets).toEqual([]);
    expect(result.current.paginatedTickets).toEqual([]);
  });

  it('stores an error when loading fails', async () => {
    getTickets.mockRejectedValue(new Error('Failed to load tickets'));

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to load tickets');
    expect(result.current.filteredTickets).toEqual([]);
  });

  it('filters tickets by search text', async () => {
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setSearch('spacing');
    });

    expect(result.current.filteredTickets).toHaveLength(1);
    expect(result.current.filteredTickets[0].title).toBe('UI spacing issue');
  });

  it('filters tickets by status', async () => {
    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setStatusFilter('Resolved');
    });

    expect(result.current.filteredTickets).toHaveLength(1);
    expect(result.current.filteredTickets[0].status).toBe('Resolved');
  });

  it('resets filters to defaults', async () => {
    getTickets.mockResolvedValue([mockTicket]);

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    act(() => {
      result.current.setSearch('login');
      result.current.setStatusFilter('Open');
      result.current.setPriorityFilter('High');
    });

    act(() => {
      result.current.resetFilters();
    });

    expect(result.current.search).toBe('');
    expect(result.current.statusFilter).toBe('all');
    expect(result.current.priorityFilter).toBe('all');
    expect(result.current.currentPage).toBe(1);
  });

  it('refetches tickets when refresh is called', async () => {
    getTickets.mockResolvedValue([mockTicket]);

    const { result } = renderHook(() => useTicketsTable());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    getTickets.mockResolvedValue([mockTicket, mockTicketTwo]);

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => expect(result.current.filteredTickets).toHaveLength(2));
  });
});
