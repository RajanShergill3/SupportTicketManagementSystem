import { Link } from 'react-router-dom';

import { type BreadcrumbItem } from '@/hooks/usePageMeta';

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb navigation for the current page hierarchy.
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-primary-600">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'font-medium text-slate-700' : undefined}>{item.label}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
