import { beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';

import { DashboardPage } from '@/pages/DashboardPage';
import { dashboardService } from '@/services/dashboard.service';
import { type DashboardSummary } from '@/types/dashboard.types';
import { screen } from '@/test/render';

import { renderAtRoute } from './helpers';

vi.mock('@/services/dashboard.service', () => ({
  dashboardService: {
    getDashboardSummary: vi.fn(),
  },
}));

const getDashboardSummary = vi.mocked(dashboardService.getDashboardSummary);

const summary: DashboardSummary = {
  stats: {
    totalUsers: 3,
    openTickets: 2,
    inProgressTickets: 1,
    resolvedTickets: 4,
    closedTickets: 5,
  },
  recentTickets: [
    {
      id: '507f1f77bcf86cd799439011',
      ticketNumber: 'TKT-001',
      title: 'Login failure',
      status: 'Open',
      priority: 'High',
      assignedTo: 'Alice Johnson',
      createdAt: '2026-01-05T00:00:00.000Z',
    },
  ],
  recentActivity: [
    {
      id: 'created-1',
      type: 'ticket_created',
      title: 'Ticket Created',
      description: 'TKT-001 — Login failure was created.',
      occurredAt: '2026-01-05T00:00:00.000Z',
    },
  ],
};

describe('DashboardPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows a skeleton loading state while the dashboard is fetched', () => {
    getDashboardSummary.mockReturnValue(new Promise(() => undefined));

    renderAtRoute('/', <DashboardPage />, '/');

    expect(screen.getByLabelText('Loading dashboard')).toBeInTheDocument();
    expect(screen.getByText('Loading dashboard...')).toBeInTheDocument();
  });

  it('renders live statistics, recent tickets, and activity', async () => {
    getDashboardSummary.mockResolvedValue(summary);

    renderAtRoute('/', <DashboardPage />, '/');

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
    expect(
      screen.getByText('Monitor your support operations in real time.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Open Tickets')).toBeInTheDocument();
    expect(screen.getByText('In Progress Tickets')).toBeInTheDocument();
    expect(screen.getByText('Resolved Tickets')).toBeInTheDocument();
    expect(screen.getByText('Closed Tickets')).toBeInTheDocument();
    expect(screen.getByText('Needs attention')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('TKT-001')).toBeInTheDocument();
    expect(screen.getByText('Alice Johnson')).toBeInTheDocument();
    expect(screen.getByText('Ticket Created')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Refresh dashboard' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Quick Actions' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /New Ticket/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Manage Users/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View All Tickets/i })).toBeInTheDocument();
  });

  it('navigates to create ticket from Quick Actions', async () => {
    const user = userEvent.setup();
    getDashboardSummary.mockResolvedValue(summary);

    renderAtRoute('/', <DashboardPage />, '/', [
      { path: '/tickets/new', element: <div>Create Ticket Screen</div> },
    ]);

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());
    await user.click(screen.getByRole('link', { name: /New Ticket/i }));

    expect(screen.getByTestId('location-pathname')).toHaveTextContent('/tickets/new');
  });

  it('renders empty states when there is no ticket data', async () => {
    getDashboardSummary.mockResolvedValue({
      stats: {
        totalUsers: 0,
        openTickets: 0,
        inProgressTickets: 0,
        resolvedTickets: 0,
        closedTickets: 0,
      },
      recentTickets: [],
      recentActivity: [],
    });

    renderAtRoute('/', <DashboardPage />, '/');

    await waitFor(() => expect(screen.getByText('No tickets yet')).toBeInTheDocument());
    expect(screen.getByText('No recent activity')).toBeInTheDocument();
  });

  it('renders an error state and retries', async () => {
    const user = userEvent.setup();
    getDashboardSummary
      .mockRejectedValueOnce(new Error('Network error'))
      .mockResolvedValueOnce(summary);

    renderAtRoute('/', <DashboardPage />, '/');

    await waitFor(() => expect(screen.getByText('Failed to load dashboard')).toBeInTheDocument());

    await user.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() => expect(screen.getByText('Login failure')).toBeInTheDocument());
  });
});
