import { describe, expect, it } from 'vitest';

import { DashboardPage } from '@/pages/DashboardPage';
import { screen } from '@/test/render';

import { renderAtRoute } from './helpers';

describe('DashboardPage', () => {
  it('renders the dashboard heading and description', () => {
    renderAtRoute('/', <DashboardPage />, '/');

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(
      screen.getByText('Overview of support operations and recent ticket activity.'),
    ).toBeInTheDocument();
  });

  it('renders dashboard statistic cards', () => {
    renderAtRoute('/', <DashboardPage />, '/');

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Open Tickets')).toBeInTheDocument();
    expect(screen.getByText('In Progress Tickets')).toBeInTheDocument();
    expect(screen.getByText('Closed Tickets')).toBeInTheDocument();
  });

  it('renders recent tickets and recent activity sections', () => {
    renderAtRoute('/', <DashboardPage />, '/');

    expect(screen.getByRole('heading', { name: 'Recent Tickets' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Recent Activity' })).toBeInTheDocument();
  });
});
