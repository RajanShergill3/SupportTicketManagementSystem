import { type ReactNode } from 'react';
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { usePageMeta } from '@/hooks/usePageMeta';

function createWrapper(initialEntry: string) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>;
  };
}

describe('usePageMeta', () => {
  it('returns dashboard meta for the home route', () => {
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper('/'),
    });

    expect(result.current.title).toBe('Dashboard');
    expect(result.current.breadcrumbs).toEqual([{ label: 'Dashboard' }]);
  });

  it('returns users page meta', () => {
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper('/users'),
    });

    expect(result.current.title).toBe('Users');
    expect(result.current.breadcrumbs).toEqual([
      { label: 'Dashboard', to: '/' },
      { label: 'Users' },
    ]);
  });

  it('returns tickets page meta', () => {
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper('/tickets'),
    });

    expect(result.current.title).toBe('Tickets');
  });

  it('returns create ticket page meta', () => {
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper('/tickets/new'),
    });

    expect(result.current.title).toBe('Create Ticket');
    expect(result.current.breadcrumbs.at(-1)).toEqual({ label: 'Create Ticket' });
  });

  it('returns ticket details page meta', () => {
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper('/tickets/507f1f77bcf86cd799439011'),
    });

    expect(result.current.title).toBe('Ticket Details');
    expect(result.current.breadcrumbs).toEqual([
      { label: 'Dashboard', to: '/' },
      { label: 'Tickets', to: '/tickets' },
      { label: 'Ticket Details' },
    ]);
  });

  it('returns edit ticket page meta', () => {
    const ticketId = '507f1f77bcf86cd799439011';
    const { result } = renderHook(() => usePageMeta(), {
      wrapper: createWrapper(`/tickets/${ticketId}/edit`),
    });

    expect(result.current.title).toBe('Edit Ticket');
    expect(result.current.breadcrumbs).toEqual([
      { label: 'Dashboard', to: '/' },
      { label: 'Tickets', to: '/tickets' },
      { label: 'Ticket Details', to: `/tickets/${ticketId}` },
      { label: 'Edit Ticket' },
    ]);
  });
});
