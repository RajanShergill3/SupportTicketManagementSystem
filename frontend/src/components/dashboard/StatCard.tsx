import { type ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
  /** Short status / attention label under the value. */
  statusLabel?: string;
  accentClassName?: string;
}

/**
 * Dashboard summary metric card.
 */
export function StatCard({
  title,
  value,
  description,
  icon,
  statusLabel,
  accentClassName = 'bg-primary-50 text-primary-600',
}: StatCardProps) {
  return (
    <article className="dashboard-stat-card group">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="dashboard-stat-title truncate">{title}</p>
          <p className="dashboard-stat-value mt-2.5 tabular-nums">{value}</p>
          {statusLabel ? <p className="dashboard-stat-status">{statusLabel}</p> : null}
          <p className="dashboard-stat-description">{description}</p>
        </div>
        <div
          className={['dashboard-icon-well', accentClassName].join(' ')}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}
