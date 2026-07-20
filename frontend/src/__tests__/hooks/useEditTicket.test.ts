import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useEditTicket } from '@/hooks/useEditTicket';
import { ticketService } from '@/services/ticket.service';
import { ApiError } from '@/utils/api-error.util';

import { mockTicket, validUpdateTicketInput } from './fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTicketById: vi.fn(),
    updateTicket: vi.fn(),
  },
}));

const getTicketById = vi.mocked(ticketService.getTicketById);
const updateTicket = vi.mocked(ticketService.updateTicket);

describe('useEditTicket', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads ticket details into initial form values', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTicketById).toHaveBeenCalledWith(mockTicket.id);
    expect(result.current.ticket).toEqual(mockTicket);
    expect(result.current.initialValues).toMatchObject({
      title: mockTicket.title,
      description: mockTicket.description,
      priority: mockTicket.priority,
      reporter: mockTicket.reporter,
      assignee: mockTicket.assignee,
    });
  });

  it('marks the ticket as not found when the id is missing', async () => {
    const { result } = renderHook(() => useEditTicket(undefined));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getTicketById).not.toHaveBeenCalled();
    expect(result.current.isNotFound).toBe(true);
  });

  it('marks the ticket as not found on a 404 response', async () => {
    getTicketById.mockRejectedValue(new ApiError('Ticket not found', 404));

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isNotFound).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('updates a ticket successfully and resets submitting state', async () => {
    getTicketById.mockResolvedValue(mockTicket);
    const updatedTicket = { ...mockTicket, title: validUpdateTicketInput.title };
    updateTicket.mockResolvedValue(updatedTicket);

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let saved: typeof mockTicket | null = null;

    await act(async () => {
      saved = await result.current.submit(validUpdateTicketInput);
    });

    expect(updateTicket).toHaveBeenCalledWith(mockTicket.id, validUpdateTicketInput);
    expect(saved).toEqual(updatedTicket);
    expect(result.current.ticket).toEqual(updatedTicket);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('returns field errors without calling update for invalid input', async () => {
    getTicketById.mockResolvedValue(mockTicket);

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let saved: typeof mockTicket | null = mockTicket;

    await act(async () => {
      saved = await result.current.submit({
        title: '',
        description: '',
        priority: 'High',
        assignee: '',
      });
    });

    expect(saved).toBeNull();
    expect(updateTicket).not.toHaveBeenCalled();
    expect(result.current.fieldErrors.title).toBeDefined();
  });

  it('stores an error when update fails', async () => {
    getTicketById.mockResolvedValue(mockTicket);
    updateTicket.mockRejectedValue(new Error('Update failed'));

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let saved: typeof mockTicket | null = mockTicket;

    await act(async () => {
      saved = await result.current.submit(validUpdateTicketInput);
    });

    expect(saved).toBeNull();
    expect(result.current.error).toBe('Update failed');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('clears the error state', async () => {
    getTicketById.mockResolvedValue(mockTicket);
    updateTicket.mockRejectedValue(new Error('Update failed'));

    const { result } = renderHook(() => useEditTicket(mockTicket.id));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.submit(validUpdateTicketInput);
    });

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});
