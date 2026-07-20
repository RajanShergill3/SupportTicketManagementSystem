/**
 * Skeleton placeholders for the dashboard loading state.
 */
export function DashboardSkeleton() {
  return (
    <div className="dashboard-stack" role="status" aria-live="polite" aria-label="Loading dashboard">
      <span className="sr-only">Loading dashboard...</span>

      <section className="grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={`stat-skeleton-${index}`} className="dashboard-stat-card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 space-y-2.5">
                <div className="dashboard-skeleton h-3.5 w-24" />
                <div className="dashboard-skeleton h-8 w-14" />
                <div className="dashboard-skeleton h-3 w-20" />
              </div>
              <div className="dashboard-skeleton h-9 w-9 rounded-lg sm:h-10 sm:w-10" />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-2.5 sm:grid-cols-3 sm:gap-3" aria-hidden="true">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={`action-skeleton-${index}`}
            className="dashboard-panel flex items-center gap-3 px-3.5 py-3"
          >
            <div className="dashboard-skeleton h-9 w-9 rounded-lg" />
            <div className="flex-1 space-y-1.5">
              <div className="dashboard-skeleton h-3.5 w-24" />
              <div className="dashboard-skeleton h-3 w-32" />
            </div>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] xl:gap-5" aria-hidden="true">
        <div className="dashboard-panel overflow-hidden">
          <div className="dashboard-panel-header">
            <div className="dashboard-skeleton h-5 w-36" />
            <div className="dashboard-skeleton mt-1.5 h-3.5 w-56" />
          </div>
          <div className="space-y-0 p-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`ticket-skeleton-${index}`}
                className="flex items-center gap-3 border-b border-slate-50 px-2 py-2.5 last:border-b-0"
              >
                <div className="dashboard-skeleton h-3.5 w-14" />
                <div className="dashboard-skeleton h-3.5 flex-1" />
                <div className="dashboard-skeleton h-5 w-14 rounded-full" />
                <div className="dashboard-skeleton hidden h-5 w-12 rounded-full sm:block" />
                <div className="dashboard-skeleton hidden h-3.5 w-20 lg:block" />
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-panel overflow-hidden">
          <div className="dashboard-panel-header">
            <div className="dashboard-skeleton h-5 w-32" />
            <div className="dashboard-skeleton mt-1.5 h-3.5 w-44" />
          </div>
          <div className="dashboard-panel-body space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`activity-skeleton-${index}`} className="flex gap-3">
                <div className="dashboard-skeleton h-7 w-7 shrink-0 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <div className="dashboard-skeleton h-3.5 w-24" />
                  <div className="dashboard-skeleton h-3 w-full" />
                  <div className="dashboard-skeleton h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
