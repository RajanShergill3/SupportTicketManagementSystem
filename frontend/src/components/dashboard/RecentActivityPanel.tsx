import { ActivityTimeline, type ActivityTimelineItemView } from '@/components/dashboard/ActivityTimeline';
import { EmptyState } from '@/components/ui/EmptyState';

function ActivityEmptyIcon() {
  return (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

interface RecentActivityPanelProps {
  items: ActivityTimelineItemView[];
}

/**
 * Recent activity panel with semantic timeline.
 */
export function RecentActivityPanel({ items }: RecentActivityPanelProps) {
  return (
    <section className="dashboard-panel flex min-h-0 flex-col overflow-hidden">
      <div className="dashboard-panel-header">
        <h2 className="dashboard-section-title">Recent Activity</h2>
        <p className="dashboard-section-subtitle">Latest actions across the platform.</p>
      </div>

      <div className="dashboard-panel-body min-h-0 flex-1 overflow-auto">
        {items.length === 0 ? (
          <EmptyState
            icon={<ActivityEmptyIcon />}
            title="No recent activity"
            description="Ticket and comment activity will appear here as work progresses."
          />
        ) : (
          <ActivityTimeline items={items} />
        )}
      </div>
    </section>
  );
}
