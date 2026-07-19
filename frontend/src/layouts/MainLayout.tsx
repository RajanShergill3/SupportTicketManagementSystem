import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { usePageMeta } from '@/hooks/usePageMeta';

/**
 * Main authenticated application layout.
 */
export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { title, breadcrumbs } = usePageMeta();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col md:ml-0">
        <Header
          title={title}
          breadcrumbs={breadcrumbs}
          onMenuToggle={() => setIsSidebarOpen(true)}
        />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
