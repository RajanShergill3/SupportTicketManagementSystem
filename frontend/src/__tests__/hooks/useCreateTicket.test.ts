import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useCreateTicket } from '@/hooks/useCreateTicket';
import { ticketService } from '@/services/ticket.service';

import { mockTicket, validCreateTicketInput } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    createTicket: vi.fn(),
  },
}));

const createTicket = vi.mocked(ticketService.createTicket);

describe('useCreateTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts with idle mutation state', () => {
    const { result } = renderHook(() => useCreateTicket());

    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.fieldErrors).toEqual({});
  });

  it('returns field errors without calling the service for invalid input', async () => {
    const { result } = renderHook(() => useCreateTicket());

    let created = mockTicket;

    await act(async () => {
      created = (await result.current.submit({
        title: '',
        description: '',
        priority: 'High',
        reporter: '',
        assignee: '',
      })) as typeof mockTicket;
    });

    expect(created).toBeNull();
    expect(createTicket).not.toHaveBeenCalled();
    expect(result.current.fieldErrors.title).toBeDefined();
    expect(result.current.isSubmitting).toBe(false);
  });

  it('creates a ticket successfully and resets loading', async () => {
    createTicket.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useCreateTicket());

    let created: typeof mockTicket | null = null;

    await act(async () => {
      created = await result.current.submit(validCreateTicketInput);
    });

    expect(createTicket).toHaveBeenCalledWith(validCreateTicketInput);
    expect(created).toEqual(mockTicket);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.fieldErrors).toEqual({});
  });

  it('sets isSubmitting while the create request is in flight', async () => {
    let resolveCreate: (ticket: typeof mockTicket) => void = () => undefined;
    createTicket.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolveCreate = resolve;
        }),
    );

    const { result } = renderHook(() => useCreateTicket());

    let submitPromise: Promise<typeof mockTicket | null>;

    act(() => {
      submitPromise = result.current.submit(validCreateTicketInput);
    });

    await waitFor(() => expect(result.current.isSubmitting).toBe(true));

    await act(async () => {
      resolveCreate(mockTicket);
      await submitPromise!;
    });

    expect(result.current.isSubmitting).toBe(false);
  });

  it('stores an error when create fails', async () => {
    createTicket.mockRejectedValue(new Error('Create failed'));

    const { result } = renderHook(() => useCreateTicket());

    let created: typeof mockTicket | null = mockTicket;

    await act(async () => {
      created = await result.current.submit(validCreateTicketInput);
    });

    expect(created).toBeNull();
    expect(result.current.error).toBe('Create failed');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('clears the error state', async () => {
    createTicket.mockRejectedValue(new Error('Create failed'));

    const { result } = renderHook(() => useCreateTicket());

    await act(async () => {
      await result.current.submit(validCreateTicketInput);
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
