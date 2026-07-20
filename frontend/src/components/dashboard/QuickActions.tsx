import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { TicketsIcon, UsersIcon } from '@/components/icons/NavIcons';

interface QuickAction {
  to: string;
  label: string;
  description: string;
  icon: ReactNode;
  accentClassName: string;
}

function PlusIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

const quickActions: QuickAction[] = [
  {
    to: '/tickets/new',
    label: 'New Ticket',
    description: 'Create a support request',
    icon: <PlusIcon />,
    accentClassName: 'bg-primary-50 text-primary-600',
  },
  {
    to: '/users',
    label: 'Manage Users',
    description: 'View team members',
    icon: <UsersIcon className="h-4 w-4" />,
    accentClassName: 'bg-violet-50 text-violet-600',
  },
  {
    to: '/tickets',
    label: 'View All Tickets',
    description: 'Browse the full queue',
    icon: <TicketsIcon className="h-4 w-4" />,
    accentClassName: 'bg-sky-50 text-sky-600',
  },
];

/**
 * Dashboard shortcut links for common tasks.
 */
export function QuickActions() {
  return (
    <section aria-label="Quick actions">
      <h2 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-400">
        Quick Actions
      </h2>

      <div className="grid gap-2.5 sm:grid-cols-3 sm:gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="dashboard-panel dashboard-panel-interactive group flex items-center gap-3 px-3.5 py-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            <span
              className={[
                'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                action.accentClassName,
              ].join(' ')}
              aria-hidden="true"
            >
              {action.icon}
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-medium text-slate-900 transition-colors group-hover:text-primary-700">
                {action.label}
              </span>
              <span className="mt-0.5 block truncate text-xs text-slate-500">
                {action.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
