import { describe, expect, it } from 'vitest';

import { ErrorMessage } from '@/components/ErrorMessage';
import { render, screen } from '@/test/render';

describe('ErrorMessage', () => {
  it('renders the default title and message', () => {
    render(<ErrorMessage message="Unable to load data." />);

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Unable to load data.')).toBeInTheDocument();
  });

  it('renders a custom title', () => {
    render(<ErrorMessage title="Failed to load tickets" message="Server unavailable" />);

    expect(screen.getByText('Failed to load tickets')).toBeInTheDocument();
    expect(screen.getByText('Server unavailable')).toBeInTheDocument();
  });
});
