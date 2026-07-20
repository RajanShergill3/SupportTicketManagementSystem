import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useDashboard } from '@/hooks/useDashboard';
import { dashboardService } from '@/services/dashboard.service';
import { type DashboardSummary } from '@/types/dashboard.types';

vi.mock('@/services/dashboard.service', () => ({
  dashboardService: {
    getDashboardSummary: vi.fn(),
  },
}));

const getDashboardSummary = vi.mocked(dashboardService.getDashboardSummary);

const summary: DashboardSummary = {
  stats: {
    totalUsers: 2,
    openTickets: 1,
    inProgressTickets: 0,
    resolvedTickets: 1,
    closedTickets: 0,
  },
  recentTickets: [
    {
      id: 't1',
      ticketNumber: 'TKT-001',
      title: 'Login failure',
      status: 'Open',
      priority: 'High',
      assignedTo: 'Alice Johnson',
      createdAt: '2026-01-05T00:00:00.000Z',
    },
  ],
  recentActivity: [
    {
      id: 'created-t1',
      type: 'ticket_created',
      title: 'Ticket Created',
      description: 'TKT-001 — Login failure was created.',
      occurredAt: '2026-01-05T00:00:00.000Z',
    },
  ],
};

describe('useDashboard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads dashboard summary successfully', async () => {
    getDashboardSummary.mockResolvedValue(summary);

    const { result } = renderHook(() => useDashboard());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.stats).toEqual(summary.stats);
    expect(result.current.recentTickets).toEqual(summary.recentTickets);
    expect(result.current.recentActivity).toEqual(summary.recentActivity);
    expect(result.current.error).toBeNull();
  });

  it('stores an error when loading fails', async () => {
    getDashboardSummary.mockRejectedValue(new Error('Failed to load dashboard'));

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBe('Failed to load dashboard');
    expect(result.current.recentTickets).toEqual([]);
  });

  it('retries via refresh', async () => {
    getDashboardSummary
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(summary);

    const { result } = renderHook(() => useDashboard());

    await waitFor(() => expect(result.current.error).toBe('Network error'));

    await act(async () => {
      result.current.refresh();
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.error).toBeNull();
    expect(result.current.stats.totalUsers).toBe(2);
    expect(getDashboardSummary).toHaveBeenCalledTimes(2);
  });
});
