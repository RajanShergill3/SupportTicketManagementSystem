import { describe, expect, it } from 'vitest';

import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { render, screen } from '@/test/render';

describe('Breadcrumb', () => {
  it('renders the current page as plain text', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Tickets' },
        ]}
      />,
    );

    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/');
    expect(screen.getByText('Tickets')).toBeInTheDocument();
  });

  it('does not link the last item even when a to value is present', () => {
    render(
      <Breadcrumb
        items={[
          { label: 'Dashboard', to: '/' },
          { label: 'Tickets', to: '/tickets' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: 'Dashboard' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Tickets' })).not.toBeInTheDocument();
  });
});
