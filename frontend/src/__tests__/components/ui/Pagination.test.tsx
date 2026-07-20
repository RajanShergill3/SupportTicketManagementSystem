import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Pagination } from '@/components/ui/Pagination';
import { render, screen } from '@/test/render';

describe('Pagination', () => {
  it('renders the current page summary', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        totalItems={20}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Showing 6-10 of 20 users')).toBeInTheDocument();
    expect(screen.getByText('Page 2 of 4')).toBeInTheDocument();
  });

  it('disables Previous on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={3}
        totalItems={15}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
  });

  it('disables Next on the last page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={3}
        totalItems={15}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('calls onPageChange when navigating', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        totalItems={20}
        pageSize={5}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole('button', { name: 'Previous' }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it('shows zero range when there are no items', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        totalItems={0}
        pageSize={5}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Showing 0-0 of 0 users')).toBeInTheDocument();
  });
});
