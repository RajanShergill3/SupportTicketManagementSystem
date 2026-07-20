import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageMeta {
  title: string;
  breadcrumbs: BreadcrumbItem[];
}

const pageMetaByPath: Record<string, PageMeta> = {
  '/': {
    title: 'Dashboard',
    breadcrumbs: [{ label: 'Dashboard' }],
  },
  '/users': {
    title: 'Users',
    breadcrumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Users' }],
  },
  '/tickets': {
    title: 'Tickets',
    breadcrumbs: [{ label: 'Dashboard', to: '/' }, { label: 'Tickets' }],
  },
  '/tickets/new': {
    title: 'Create Ticket',
    breadcrumbs: [
      { label: 'Dashboard', to: '/' },
      { label: 'Tickets', to: '/tickets' },
      { label: 'Create Ticket' },
    ],
  },
};

/**
 * Resolves page title and breadcrumbs from the current route.
 */
export function usePageMeta(): PageMeta {
  const location = useLocation();

  return useMemo(() => {
    if (location.pathname === '/tickets/new') {
      return pageMetaByPath['/tickets/new'];
    }

    const editTicketMatch = matchPath('/tickets/:id/edit', location.pathname);

    if (editTicketMatch?.params.id) {
      return {
        title: 'Edit Ticket',
        breadcrumbs: [
          { label: 'Dashboard', to: '/' },
          { label: 'Tickets', to: '/tickets' },
          { label: 'Ticket Details', to: `/tickets/${editTicketMatch.params.id}` },
          { label: 'Edit Ticket' },
        ],
      };
    }

    const ticketDetailsMatch = matchPath('/tickets/:id', location.pathname);

    if (ticketDetailsMatch?.params.id) {
      return {
        title: 'Ticket Details',
        breadcrumbs: [
          { label: 'Dashboard', to: '/' },
          { label: 'Tickets', to: '/tickets' },
          { label: 'Ticket Details' },
        ],
      };
    }

    return pageMetaByPath[location.pathname] ?? {
      title: 'Dashboard',
      breadcrumbs: [{ label: 'Dashboard', to: '/' }],
    };
  }, [location.pathname]);
}
