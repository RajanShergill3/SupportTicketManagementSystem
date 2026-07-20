import { useCallback, useEffect, useState } from 'react';

import { dashboardService } from '@/services/dashboard.service';
import {
  type DashboardActivityItem,
  type DashboardRecentTicket,
  type DashboardStats,
} from '@/types/dashboard.types';

const EMPTY_STATS: DashboardStats = {
  totalUsers: 0,
  openTickets: 0,
  inProgressTickets: 0,
  resolvedTickets: 0,
  closedTickets: 0,
};

export function useDashboard() {
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [recentTickets, setRecentTickets] = useState<DashboardRecentTicket[]>([]);
  const [recentActivity, setRecentActivity] = useState<DashboardActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const summary = await dashboardService.getDashboardSummary();
      setStats(summary.stats);
      setRecentTickets(summary.recentTickets);
      setRecentActivity(summary.recentActivity);
    } catch (err) {
      setStats(EMPTY_STATS);
      setRecentTickets([]);
      setRecentActivity([]);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  const refresh = useCallback(() => {
    void fetchDashboard();
  }, [fetchDashboard]);

  return {
    stats,
    recentTickets,
    recentActivity,
    isLoading,
    error,
    refresh,
  };
}
