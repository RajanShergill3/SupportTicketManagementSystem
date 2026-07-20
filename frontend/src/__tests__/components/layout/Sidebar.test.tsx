import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Sidebar } from '@/components/layout/Sidebar';
import { render, screen } from '@/test/render';

describe('Sidebar', () => {
  it('renders navigation links', () => {
    render(<Sidebar isOpen onClose={vi.fn()} />);

    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /tickets/i })).toBeInTheDocument();
  });

  it('shows the mobile backdrop when open and calls onClose', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(<Sidebar isOpen onClose={onClose} />);

    await user.click(screen.getByRole('button', { name: 'Close navigation menu' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('hides the mobile backdrop when closed', () => {
    render(<Sidebar isOpen={false} onClose={vi.fn()} />);

    expect(screen.queryByRole('button', { name: 'Close navigation menu' })).not.toBeInTheDocument();
  });
});
