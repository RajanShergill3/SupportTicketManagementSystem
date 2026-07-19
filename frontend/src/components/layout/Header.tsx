import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { AvatarWithName } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { type BreadcrumbItem } from '@/hooks/usePageMeta';

interface HeaderProps {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  onMenuToggle: () => void;
}

/**
 * Top application header with breadcrumbs and user placeholder.
 */
export function Header({ title, breadcrumbs, onMenuToggle }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white px-4 py-4 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-3 flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 md:hidden"
              aria-label="Open navigation menu"
              onClick={onMenuToggle}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold text-slate-900">{title}</h2>
              <Breadcrumb items={breadcrumbs} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <AvatarWithName name="System Admin" subtitle="Admin" />
          <Button
            variant="secondary"
            className="hidden w-auto px-3 py-2 sm:inline-flex"
            onClick={() => undefined}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
