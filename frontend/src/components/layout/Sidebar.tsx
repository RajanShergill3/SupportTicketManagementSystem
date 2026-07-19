import { NavLink } from 'react-router-dom';

import { navigationItems } from '@/config/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Responsive application sidebar with navigation links.
 */
export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 md:static md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
        aria-label="Sidebar"
      >
        <div className="border-b border-slate-200 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">
            Support Tickets
          </p>
          <h1 className="mt-1 text-lg font-semibold text-slate-900">Management System</h1>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4" aria-label="Main navigation">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                  ].join(' ')
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
