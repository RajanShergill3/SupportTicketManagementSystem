import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useComments } from '@/hooks/useComments';
import { commentService } from '@/services/comment.service';

import { mockComment, mockTicket } from './fixtures';

vi.mock('@/services/comment.service', () => ({
  commentService: {
    getComments: vi.fn(),
    createComment: vi.fn(),
  },
}));

const getComments = vi.mocked(commentService.getComments);
const createComment = vi.mocked(commentService.createComment);

describe('useComments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('starts loading and loads comments successfully', async () => {
    getComments.mockResolvedValue([mockComment]);

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getComments).toHaveBeenCalledWith(mockTicket.id);
    expect(result.current.comments).toEqual([mockComment]);
    expect(result.current.error).toBeNull();
  });

  it('handles a missing ticket id without calling the service', async () => {
    const { result } = renderHook(() => useComments(undefined, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(getComments).not.toHaveBeenCalled();
    expect(result.current.comments).toEqual([]);
  });

  it('handles an empty comment list', async () => {
    getComments.mockResolvedValue([]);

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.comments).toEqual([]);
  });

  it('stores an error when loading fails', async () => {
    getComments.mockRejectedValue(new Error('Failed to load comments'));

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to load comments');
    expect(result.current.comments).toEqual([]);
  });

  it('creates a comment successfully and refreshes the list', async () => {
    getComments.mockResolvedValueOnce([]).mockResolvedValueOnce([mockComment]);
    createComment.mockResolvedValue(mockComment);

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let success = false;

    await act(async () => {
      success = await result.current.addComment('  Investigating now  ');
    });

    expect(createComment).toHaveBeenCalledWith(mockTicket.id, {
      message: 'Investigating now',
      createdBy: mockTicket.reporter,
    });
    expect(success).toBe(true);
    expect(result.current.isSubmitting).toBe(false);
    expect(result.current.comments).toEqual([mockComment]);
  });

  it('rejects an empty comment without calling the service', async () => {
    getComments.mockResolvedValue([]);

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let success = true;

    await act(async () => {
      success = await result.current.addComment('   ');
    });

    expect(success).toBe(false);
    expect(createComment).not.toHaveBeenCalled();
    expect(result.current.submitError).toBe('Comment is required');
  });

  it('stores a submit error when create fails', async () => {
    getComments.mockResolvedValue([]);
    createComment.mockRejectedValue(new Error('Create comment failed'));

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    let success = true;

    await act(async () => {
      success = await result.current.addComment('Helpful note');
    });

    expect(success).toBe(false);
    expect(result.current.submitError).toBe('Create comment failed');
    expect(result.current.isSubmitting).toBe(false);
  });

  it('clears the submit error', async () => {
    getComments.mockResolvedValue([]);

    const { result } = renderHook(() => useComments(mockTicket.id, mockTicket.reporter));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    await act(async () => {
      await result.current.addComment('');
    });

    act(() => {
      result.current.clearSubmitError();
    });

    expect(result.current.submitError).toBeNull();
  });
});
