import { Button } from '@/components/ui/Button';
import { formatRelativeTime } from '@/utils/date.util';

interface DashboardHeaderProps {
  lastRefreshedAt: number | null;
  isRefreshing?: boolean;
  onRefresh: () => void;
}

function RefreshIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );
}

/**
 * Dashboard page header with refresh affordance.
 */
export function DashboardHeader({
  lastRefreshedAt,
  isRefreshing = false,
  onRefresh,
}: DashboardHeaderProps) {
  const refreshedLabel =
    lastRefreshedAt === null
      ? 'Not refreshed yet'
      : `Last refreshed ${formatRelativeTime(new Date(lastRefreshedAt).toISOString())}`;

  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-description">Monitor your support operations in real time.</p>
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-2.5 sm:gap-3">
        <p className="text-xs text-slate-500 sm:text-sm" aria-live="polite">
          {refreshedLabel}
        </p>
        <Button
          type="button"
          variant="secondary"
          className="w-auto gap-1.5 px-3 py-1.5 text-sm"
          onClick={onRefresh}
          disabled={isRefreshing}
          aria-label="Refresh dashboard"
        >
          <RefreshIcon />
          Refresh
        </Button>
      </div>
    </header>
  );
}
