import { describe, expect, it } from 'vitest';

import { LoadingState } from '@/components/ui/LoadingState';
import { render, screen } from '@/test/render';

describe('LoadingState', () => {
  it('renders the default message', () => {
    render(<LoadingState />);

    expect(screen.getByText('Loading users...')).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    render(<LoadingState message="Loading comments..." />);

    expect(screen.getByText('Loading comments...')).toBeInTheDocument();
  });
});
