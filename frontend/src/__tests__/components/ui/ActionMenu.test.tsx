import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { ActionMenu } from '@/components/ui/ActionMenu';
import { render, screen } from '@/test/render';

describe('ActionMenu', () => {
  it('keeps the menu closed by default', () => {
    render(<ActionMenu onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Actions' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu and invokes view/edit/delete callbacks', async () => {
    const user = userEvent.setup();
    const onView = vi.fn();
    const onEdit = vi.fn();
    const onDelete = vi.fn();

    render(<ActionMenu onView={onView} onEdit={onEdit} onDelete={onDelete} />);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();

    await user.click(screen.getByRole('menuitem', { name: 'View' }));
    expect(onView).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(onEdit).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(screen.getByRole('menuitem', { name: 'Delete' }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('disables the actions trigger when disabled', () => {
    render(<ActionMenu onView={vi.fn()} onEdit={vi.fn()} onDelete={vi.fn()} disabled />);

    expect(screen.getByRole('button', { name: 'Actions' })).toBeDisabled();
  });
});
