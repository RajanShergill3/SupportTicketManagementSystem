import { type ReactNode, useEffect, useMemo, useState } from 'react';

import { type ActivityTimelineItemView } from '@/components/dashboard/ActivityTimeline';
import { DashboardErrorPanel } from '@/components/dashboard/DashboardErrorPanel';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentActivityPanel } from '@/components/dashboard/RecentActivityPanel';
import { RecentTicketsPanel } from '@/components/dashboard/RecentTicketsPanel';
import { StatCard } from '@/components/dashboard/StatCard';
import { PageContainer } from '@/components/layout/PageContainer';
import { useDashboard } from '@/hooks/useDashboard';
import { type DashboardStats } from '@/types/dashboard.types';
import { formatRelativeTime } from '@/utils/date.util';

interface StatCardConfig {
  key: keyof DashboardStats;
  title: string;
  description: string;
  statusLabel: string;
  accentClassName: string;
  icon: ReactNode;
}

const statCardConfigs: StatCardConfig[] = [
  {
    key: 'totalUsers',
    title: 'Total Users',
    description: 'Team members in the system',
    statusLabel: 'Active roster',
    accentClassName: 'bg-sky-50 text-sky-600',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
  },
  {
    key: 'openTickets',
    title: 'Open Tickets',
    description: 'Tickets awaiting action',
    statusLabel: 'Needs attention',
    accentClassName: 'bg-amber-50 text-amber-600',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: 'inProgressTickets',
    title: 'In Progress Tickets',
    description: 'Currently being worked on',
    statusLabel: 'In flight',
    accentClassName: 'bg-blue-50 text-blue-600',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    key: 'resolvedTickets',
    title: 'Resolved Tickets',
    description: 'Resolved and awaiting closure',
    statusLabel: 'Ready to close',
    accentClassName: 'bg-emerald-50 text-emerald-600',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    key: 'closedTickets',
    title: 'Closed Tickets',
    description: 'Fully closed tickets',
    statusLabel: 'Completed',
    accentClassName: 'bg-slate-100 text-slate-600',
    icon: (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 13l4 4L19 7" />
      </svg>
    ),
  },
];

export function DashboardPage() {
  const { stats, recentTickets, recentActivity, isLoading, error, refresh } = useDashboard();
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isLoading && !error) {
      setLastRefreshedAt(Date.now());
      setHasLoadedOnce(true);
    }
  }, [isLoading, error, stats, recentTickets, recentActivity]);

  const activityItems = useMemo<ActivityTimelineItemView[]>(
    () =>
      recentActivity.map((activity) => ({
        id: activity.id,
        type: activity.type,
        title: activity.title,
        description: activity.description,
        timeLabel: formatRelativeTime(activity.occurredAt),
        occurredAt: activity.occurredAt,
      })),
    [recentActivity],
  );

  const showInitialSkeleton = isLoading && !hasLoadedOnce;

  return (
    <PageContainer>
      <div className="dashboard-stack">
        <DashboardHeader
          lastRefreshedAt={lastRefreshedAt}
          isRefreshing={isLoading && hasLoadedOnce}
          onRefresh={refresh}
        />

        {showInitialSkeleton ? <DashboardSkeleton /> : null}

        {!showInitialSkeleton && error ? (
          <DashboardErrorPanel message={error} onRetry={refresh} />
        ) : null}

        {!showInitialSkeleton && !error ? (
          <>
            <section
              className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5"
              aria-label="Dashboard statistics"
            >
              {statCardConfigs.map((config) => (
                <StatCard
                  key={config.key}
                  title={config.title}
                  value={stats[config.key]}
                  description={config.description}
                  statusLabel={config.statusLabel}
                  accentClassName={config.accentClassName}
                  icon={config.icon}
                />
              ))}
            </section>

            <QuickActions />

            <section
              className="grid gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] xl:gap-5"
              aria-label="Recent tickets and activity"
            >
              <RecentTicketsPanel tickets={recentTickets} />
              <RecentActivityPanel items={activityItems} />
            </section>
          </>
        ) : null}
      </div>
    </PageContainer>
  );
}
