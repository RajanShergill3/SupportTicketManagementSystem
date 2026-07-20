import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Header } from '@/components/layout/Header';
import { render, screen } from '@/test/render';

describe('Header', () => {
  it('renders the page title and breadcrumbs', () => {
    render(
      <Header
        title="Tickets"
        breadcrumbs={[
          { label: 'Dashboard', to: '/' },
          { label: 'Tickets' },
        ]}
        onMenuToggle={vi.fn()}
      />,
    );

    expect(screen.getByRole('heading', { name: 'Tickets' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getByText('System Admin')).toBeInTheDocument();
  });

  it('invokes onMenuToggle from the mobile menu button', async () => {
    const user = userEvent.setup();
    const onMenuToggle = vi.fn();

    render(
      <Header title="Tickets" breadcrumbs={[{ label: 'Tickets' }]} onMenuToggle={onMenuToggle} />,
    );

    await user.click(screen.getByRole('button', { name: 'Open navigation menu' }));

    expect(onMenuToggle).toHaveBeenCalledTimes(1);
  });
});
