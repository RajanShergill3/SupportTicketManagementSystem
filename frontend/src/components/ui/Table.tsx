import { type ReactNode } from 'react';

export interface TableColumn {
  key: string;
  header: string;
  className?: string;
}

interface TableProps {
  columns: TableColumn[];
  children: ReactNode;
  /** Keep the header visible while scrolling the table body. */
  stickyHeader?: boolean;
  /** Compact row density for dense dashboards. */
  density?: 'default' | 'compact';
  className?: string;
}

/**
 * Reusable responsive table wrapper.
 */
export function Table({
  columns,
  children,
  stickyHeader = false,
  density = 'default',
  className = '',
}: TableProps) {
  const isCompact = density === 'compact';
  const headerPadding = isCompact ? 'px-3 py-2.5' : 'px-4 py-3';

  return (
    <div className={['overflow-x-auto', className].filter(Boolean).join(' ')}>
      <table className="min-w-full divide-y divide-slate-200">
        <thead
          className={[
            'bg-slate-50/95',
            stickyHeader ? 'sticky top-0 z-10 backdrop-blur-sm' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={[
                  headerPadding,
                  'text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500',
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
        <tbody
          className={[
            'bg-white',
            isCompact ? 'divide-y divide-slate-100' : 'divide-y divide-slate-100',
          ].join(' ')}
          data-density={density}
        >
          {children}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export function TableRow({ children, onClick, className = '' }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      onKeyDown={
        onClick
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'link' : undefined}
      className={[
        'transition-colors duration-150',
        onClick
          ? 'cursor-pointer hover:bg-slate-50/90 focus:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500'
          : 'hover:bg-slate-50/70',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  density?: 'default' | 'compact';
}

export function TableCell({ children, className = '', density = 'default' }: TableCellProps) {
  const padding = density === 'compact' ? 'px-3 py-2.5' : 'px-4 py-3.5';

  return (
    <td className={[padding, 'text-sm leading-5 text-slate-700', className].join(' ')}>
      {children}
    </td>
  );
}
