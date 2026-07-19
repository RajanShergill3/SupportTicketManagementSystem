import { type ComponentType } from 'react';

import { DashboardIcon, TicketsIcon, UsersIcon } from '@/components/icons/NavIcons';

export interface NavigationItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}

export const navigationItems: NavigationItem[] = [
  { label: 'Dashboard', to: '/', icon: DashboardIcon },
  { label: 'Users', to: '/users', icon: UsersIcon },
  { label: 'Tickets', to: '/tickets', icon: TicketsIcon },
];
