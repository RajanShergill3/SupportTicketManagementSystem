import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDeleteTicket } from '@/hooks/useDeleteTicket';
import { ticketService } from '@/services/ticket.service';

import { mockTicket } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    deleteTicket: vi.fn(),
  },
}));

const deleteTicket = vi.mocked(ticketService.deleteTicket);

describe('useDeleteTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with idle delete state', () => {
    const { result } = renderHook(() => useDeleteTicket());

    expect(result.current.isDeleting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('deletes a ticket successfully and resets loading', async () => {
    deleteTicket.mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteTicket());

    let success = false;

    await act(async () => {
      success = await result.current.deleteTicket(mockTicket.id);
    });

    expect(deleteTicket).toHaveBeenCalledWith(mockTicket.id);
    expect(success).toBe(true);
    expect(result.current.isDeleting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets isDeleting while the delete request is in flight', async () => {
    let resolveDelete: () => void = () => undefined;
    deleteTicket.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelete = () => resolve();
        }),
    );

    const { result } = renderHook(() => useDeleteTicket());

    let deletePromise: Promise<boolean>;

    act(() => {
      deletePromise = result.current.deleteTicket(mockTicket.id);
    });

    await waitFor(() => expect(result.current.isDeleting).toBe(true));

    await act(async () => {
      resolveDelete();
      await deletePromise!;
    });

    expect(result.current.isDeleting).toBe(false);
  });

  it('stores an error when delete fails', async () => {
    deleteTicket.mockRejectedValue(new Error('Delete failed'));

    const { result } = renderHook(() => useDeleteTicket());

    let success = true;

    await act(async () => {
      success = await result.current.deleteTicket(mockTicket.id);
    });

    expect(success).toBe(false);
    expect(result.current.error).toBe('Delete failed');
    expect(result.current.isDeleting).toBe(false);
  });

  it('prevents duplicate in-flight delete requests', async () => {
    let resolveDelete: () => void = () => undefined;
    deleteTicket.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveDelete = () => resolve();
        }),
    );

    const { result } = renderHook(() => useDeleteTicket());

    let firstPromise: Promise<boolean>;
    let secondResult = true;

    act(() => {
      firstPromise = result.current.deleteTicket(mockTicket.id);
    });

    await waitFor(() => expect(result.current.isDeleting).toBe(true));

    await act(async () => {
      secondResult = await result.current.deleteTicket(mockTicket.id);
    });

    expect(secondResult).toBe(false);
    expect(deleteTicket).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveDelete();
      await firstPromise!;
    });
  });

  it('clears the error state', async () => {
    deleteTicket.mockRejectedValue(new Error('Delete failed'));

    const { result } = renderHook(() => useDeleteTicket());

    await act(async () => {
      await result.current.deleteTicket(mockTicket.id);
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
