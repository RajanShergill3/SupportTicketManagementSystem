import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { CommentsSection } from '@/components/comments/CommentsSection';
import { render, screen } from '@/test/render';

const refresh = vi.fn();
const addComment = vi.fn();
const clearSubmitError = vi.fn();

vi.mock('@/hooks/useComments', () => ({
  useComments: vi.fn(),
}));

import { useComments } from '@/hooks/useComments';

const mockedUseComments = vi.mocked(useComments);

describe('CommentsSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders a loading state', () => {
    mockedUseComments.mockReturnValue({
      comments: [],
      isLoading: true,
      error: null,
      isSubmitting: false,
      submitError: null,
      refresh,
      addComment,
      clearSubmitError,
    });

    render(<CommentsSection ticketId="t1" currentUserId="u1" />);

    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });

  it('renders an error state with retry', async () => {
    const user = userEvent.setup();
    mockedUseComments.mockReturnValue({
      comments: [],
      isLoading: false,
      error: 'Failed to fetch',
      isSubmitting: false,
      submitError: null,
      refresh,
      addComment,
      clearSubmitError,
    });

    render(<CommentsSection ticketId="t1" currentUserId="u1" />);

    expect(screen.getByText('Failed to load comments')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refresh).toHaveBeenCalledTimes(1);
  });

  it('renders an empty comments message', () => {
    mockedUseComments.mockReturnValue({
      comments: [],
      isLoading: false,
      error: null,
      isSubmitting: false,
      submitError: null,
      refresh,
      addComment,
      clearSubmitError,
    });

    render(<CommentsSection ticketId="t1" currentUserId="u1" />);

    expect(screen.getByText('No comments yet.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Comment' })).toBeInTheDocument();
  });

  it('renders loaded comments', () => {
    mockedUseComments.mockReturnValue({
      comments: [
        {
          id: 'c1',
          ticketId: 't1',
          message: 'First comment',
          createdBy: 'u1',
          createdAt: '2026-01-03T10:00:00.000Z',
        },
      ],
      isLoading: false,
      error: null,
      isSubmitting: false,
      submitError: null,
      refresh,
      addComment,
      clearSubmitError,
    });

    render(<CommentsSection ticketId="t1" currentUserId="u1" />);

    expect(screen.getByText('First comment')).toBeInTheDocument();
  });
});
