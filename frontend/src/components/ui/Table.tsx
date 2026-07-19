import { type ReactNode } from 'react';

export interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
}

/**
 * Reusable responsive table wrapper.
 */
export function Table({ columns, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
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

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr className="hover:bg-slate-50">{children}</tr>;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={['px-4 py-3 text-sm text-slate-700', className].join(' ')}>{children}</td>;
}
