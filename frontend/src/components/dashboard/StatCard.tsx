import { type ReactNode } from 'react';

import { Card } from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: ReactNode;
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
  accentClassName = 'bg-primary-50 text-primary-600',
}: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>
        <div
          className={['flex h-11 w-11 items-center justify-center rounded-lg', accentClassName].join(
            ' ',
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
