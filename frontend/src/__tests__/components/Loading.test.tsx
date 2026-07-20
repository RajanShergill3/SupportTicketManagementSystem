import { describe, expect, it } from 'vitest';

import { Loading } from '@/components/Loading';
import { render, screen } from '@/test/render';

describe('Loading', () => {
  it('renders the default loading message with status role', () => {
    render(<Loading />);

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders a custom message', () => {
    render(<Loading message="Loading tickets..." />);

    expect(screen.getByText('Loading tickets...')).toBeInTheDocument();
  });
});
