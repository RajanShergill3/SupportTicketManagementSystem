import { type ReactNode } from 'react';

import { type TableColumn } from '@/components/ui/Table';

interface DataTableProps {
  columns: TableColumn[];
  children: ReactNode;
}

/**
 * Responsive data table with sticky header support.
 */
export function DataTable({ columns, children }: DataTableProps) {
  return (
    <div className="max-h-[32rem] overflow-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="sticky top-0 z-10 bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500',
                  column.className,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">{children}</tbody>
      </table>
    </div>
  );
}
