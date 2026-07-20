import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useUpdateTicketStatus } from '@/hooks/useUpdateTicketStatus';
import { ticketService } from '@/services/ticket.service';

import { mockTicket } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    updateTicketStatus: vi.fn(),
  },
}));

const updateTicketStatus = vi.mocked(ticketService.updateTicketStatus);

describe('useUpdateTicketStatus', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with idle update state', () => {
    const { result } = renderHook(() => useUpdateTicketStatus());

    expect(result.current.isUpdating).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('updates ticket status successfully and resets loading', async () => {
    const updatedTicket = { ...mockTicket, status: 'In Progress' as const };
    updateTicketStatus.mockResolvedValue(updatedTicket);

    const { result } = renderHook(() => useUpdateTicketStatus());

    let saved: typeof mockTicket | null = null;

    await act(async () => {
      saved = await result.current.updateStatus(mockTicket.id, 'In Progress');
    });

    expect(updateTicketStatus).toHaveBeenCalledWith(mockTicket.id, 'In Progress');
    expect(saved).toEqual(updatedTicket);
    expect(result.current.isUpdating).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets isUpdating while the status request is in flight', async () => {
    let resolveUpdate: (ticket: typeof mockTicket) => void = () => undefined;
    updateTicketStatus.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    const { result } = renderHook(() => useUpdateTicketStatus());

    let updatePromise: Promise<typeof mockTicket | null>;

    act(() => {
      updatePromise = result.current.updateStatus(mockTicket.id, 'In Progress');
    });

    await waitFor(() => expect(result.current.isUpdating).toBe(true));

    await act(async () => {
      resolveUpdate({ ...mockTicket, status: 'In Progress' });
      await updatePromise!;
    });

    expect(result.current.isUpdating).toBe(false);
  });

  it('stores an error when status update fails', async () => {
    updateTicketStatus.mockRejectedValue(new Error('Invalid status transition'));

    const { result } = renderHook(() => useUpdateTicketStatus());

    let saved: typeof mockTicket | null = mockTicket;

    await act(async () => {
      saved = await result.current.updateStatus(mockTicket.id, 'Closed');
    });

    expect(saved).toBeNull();
    expect(result.current.error).toBe('Invalid status transition');
    expect(result.current.isUpdating).toBe(false);
  });

  it('prevents duplicate in-flight status updates', async () => {
    let resolveUpdate: (ticket: typeof mockTicket) => void = () => undefined;
    updateTicketStatus.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveUpdate = resolve;
        }),
    );

    const { result } = renderHook(() => useUpdateTicketStatus());

    let firstPromise: Promise<typeof mockTicket | null>;
    let secondResult: typeof mockTicket | null = mockTicket;

    act(() => {
      firstPromise = result.current.updateStatus(mockTicket.id, 'In Progress');
    });

    await waitFor(() => expect(result.current.isUpdating).toBe(true));

    await act(async () => {
      secondResult = await result.current.updateStatus(mockTicket.id, 'Cancelled');
    });

    expect(secondResult).toBeNull();
    expect(updateTicketStatus).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveUpdate({ ...mockTicket, status: 'In Progress' });
      await firstPromise!;
    });
  });

  it('clears the error state', async () => {
    updateTicketStatus.mockRejectedValue(new Error('Invalid status transition'));

    const { result } = renderHook(() => useUpdateTicketStatus());

    await act(async () => {
      await result.current.updateStatus(mockTicket.id, 'Closed');
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
