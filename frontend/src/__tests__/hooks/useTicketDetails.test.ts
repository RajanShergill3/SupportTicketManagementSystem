import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useTicketDetails } from '@/hooks/useTicketDetails';
import { ticketService } from '@/services/ticket.service';
import { ApiError } from '@/utils/api-error.util';

import { mockTicket } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTicketById: vi.fn(),
  },
}));

const getTicketById = vi.mocked(ticketService.getTicketById);

describe('useTicketDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts in a loading state and loads ticket data successfully', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useTicketDetails(mockTicket.id));

    expect(result.current.isLoading).toBe(true);
    expect(result.current.ticket).toBeNull();

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTicketById).toHaveBeenCalledWith(mockTicket.id);
    expect(result.current.ticket).toEqual(mockTicket);
    expect(result.current.error).toBeNull();
    expect(result.current.isNotFound).toBe(false);
  });

  it('marks the ticket as not found when the id is missing', async () => {
    const { result } = renderHook(() => useTicketDetails(undefined));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTicketById).not.toHaveBeenCalled();
    expect(result.current.ticket).toBeNull();
    expect(result.current.isNotFound).toBe(true);
  });

  it('marks the ticket as not found on a 404 response', async () => {
    getTicketById.mockRejectedValue(new ApiError('Ticket not found', 404));

    const { result } = renderHook(() => useTicketDetails(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.ticket).toBeNull();
    expect(result.current.isNotFound).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('stores an error message when loading fails', async () => {
    getTicketById.mockRejectedValue(new Error('Server unavailable'));

    const { result } = renderHook(() => useTicketDetails(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Server unavailable');
    expect(result.current.ticket).toBeNull();
  });

  it('refetches ticket data when refresh is called', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useTicketDetails(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    getTicketById.mockResolvedValue({ ...mockTicket, title: 'Refreshed title' });

    await act(async () => {
      await result.current.refresh();
    });

    expect(result.current.ticket?.title).toBe('Refreshed title');
  });

  it('replaces the local ticket without calling the service', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useTicketDetails(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const updated = { ...mockTicket, status: 'In Progress' as const };

    act(() => {
      result.current.replaceTicket(updated);
    });

    expect(result.current.ticket).toEqual(updated);
    expect(getTicketById).toHaveBeenCalledTimes(1);
  });
});
