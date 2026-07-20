import { describe, expect, it } from 'vitest';

import { CommentCard } from '@/components/comments/CommentCard';
import { render, screen } from '@/test/render';

const comment = {
  id: 'c1',
  ticketId: 't1',
  message: 'Investigating the issue',
  createdBy: 'user-1',
  createdAt: '2026-01-03T10:00:00.000Z',
};

describe('CommentCard', () => {
  it('renders the author, message, and timestamp', () => {
    render(<CommentCard comment={comment} />);

    expect(screen.getByText('user-1')).toBeInTheDocument();
    expect(screen.getByText('Investigating the issue')).toBeInTheDocument();
    expect(screen.getByRole('article')).toBeInTheDocument();
    expect(document.querySelector('time')).toHaveAttribute('dateTime', comment.createdAt);
  });
});
