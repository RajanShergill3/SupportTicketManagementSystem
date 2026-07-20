import { type ReactNode } from 'react';

import { type DashboardActivityType } from '@/types/dashboard.types';

interface ActivityVisual {
  icon: ReactNode;
  iconClassName: string;
  labelClassName: string;
}

function CreatedIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

function StatusIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
      />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H15.75m-7.5 3.75h7.5a2.25 2.25 0 002.25-2.25v-6A2.25 2.25 0 0015.75 4.5h-7.5A2.25 2.25 0 006 6.75v6a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function UpdatedIcon() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"
      />
    </svg>
  );
}

const activityVisuals: Record<DashboardActivityType, ActivityVisual> = {
  ticket_created: {
    icon: <CreatedIcon />,
    iconClassName: 'bg-emerald-50 text-emerald-600',
    labelClassName: 'text-emerald-700',
  },
  status_changed: {
    icon: <StatusIcon />,
    iconClassName: 'bg-sky-50 text-sky-600',
    labelClassName: 'text-sky-700',
  },
  comment_added: {
    icon: <CommentIcon />,
    iconClassName: 'bg-violet-50 text-violet-600',
    labelClassName: 'text-violet-700',
  },
  ticket_updated: {
    icon: <UpdatedIcon />,
    iconClassName: 'bg-orange-50 text-orange-600',
    labelClassName: 'text-orange-700',
  },
};

export interface ActivityTimelineItemView {
  id: string;
  type: DashboardActivityType;
  title: string;
  description: string;
  timeLabel: string;
  occurredAt: string;
}

interface ActivityTimelineProps {
  items: ActivityTimelineItemView[];
}

/**
 * Semantic timeline for derived dashboard activity events.
 */
export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <ol className="relative">
      {items.map((activity, index) => {
        const visual = activityVisuals[activity.type];
        const isLast = index === items.length - 1;

        return (
          <li key={activity.id} className="relative flex gap-3 pb-4 last:pb-0">
            {!isLast ? <span className="dashboard-activity-rail" aria-hidden="true" /> : null}
            <div
              className={[
                'relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                visual.iconClassName,
              ].join(' ')}
              aria-hidden="true"
            >
              {visual.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                <p className={['text-[13px] font-semibold leading-5', visual.labelClassName].join(' ')}>
                  {activity.title}
                </p>
                <time
                  className="shrink-0 text-[11px] leading-5 text-slate-400"
                  dateTime={activity.occurredAt}
                >
                  {activity.timeLabel}
                </time>
              </div>
              <p className="mt-0.5 text-[13px] leading-5 text-slate-600">{activity.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
