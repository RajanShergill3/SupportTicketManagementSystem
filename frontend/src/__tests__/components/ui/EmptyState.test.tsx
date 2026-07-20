import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { EmptyState } from '@/components/ui/EmptyState';
import { render, screen } from '@/test/render';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(<EmptyState title="No tickets found" description="Try adjusting your filters." />);

    expect(screen.getByText('No tickets found')).toBeInTheDocument();
    expect(screen.getByText('Try adjusting your filters.')).toBeInTheDocument();
  });

  it('hides the action button when action props are missing', () => {
    render(<EmptyState title="No tickets found" description="Try adjusting your filters." />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('invokes onAction when the action button is clicked', async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <EmptyState
        title="No tickets found"
        description="Try adjusting your filters."
        actionLabel="Reset filters"
        onAction={onAction}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Reset filters' }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});
