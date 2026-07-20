import { describe, expect, it } from 'vitest';

import { type Comment } from '@/types/comment.types';
import { type Ticket } from '@/types/ticket.types';
import { type User } from '@/types/user.types';
import {
  buildDashboardStats,
  buildDashboardSummary,
  buildRecentActivity,
  buildRecentTickets,
  buildUsersById,
  resolveUserDisplayName,
} from '@/utils/dashboard.util';

const users: User[] = [
  {
    id: 'user-1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'Developer',
    status: 'Active',
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  {
    id: 'user-2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    role: 'QA',
    status: 'Active',
    createdAt: '2026-01-02T00:00:00.000Z',
  },
];

const tickets: Ticket[] = [
  {
    id: 't1',
    ticketNumber: 'TKT-001',
    title: 'Login failure',
    description: 'Cannot sign in',
    reporter: 'user-1',
    assignee: 'user-2',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-01-05T00:00:00.000Z',
    updatedAt: '2026-01-06T00:00:00.000Z',
  },
  {
    id: 't2',
    ticketNumber: 'TKT-002',
    title: 'UI spacing',
    description: 'Spacing issue',
    reporter: 'user-2',
    assignee: 'user-1',
    priority: 'Low',
    status: 'In Progress',
    createdAt: '2026-01-04T00:00:00.000Z',
    updatedAt: '2026-01-04T12:00:00.000Z',
  },
  {
    id: 't3',
    ticketNumber: 'TKT-003',
    title: 'Email delay',
    description: 'Notifications late',
    reporter: 'user-1',
    assignee: '',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-01-03T00:00:00.000Z',
    updatedAt: '2026-01-03T00:00:00.000Z',
  },
  {
    id: 't4',
    ticketNumber: 'TKT-004',
    title: 'Closed item',
    description: 'Done',
    reporter: 'user-2',
    assignee: 'user-2',
    priority: 'Critical',
    status: 'Closed',
    createdAt: '2026-01-02T00:00:00.000Z',
    updatedAt: '2026-01-02T10:00:00.000Z',
  },
];

describe('dashboard.util', () => {
  it('resolves user display names', () => {
    const usersById = buildUsersById(users);

    expect(resolveUserDisplayName('user-1', usersById)).toBe('Alice Johnson');
    expect(resolveUserDisplayName('', usersById)).toBe('Unassigned');
    expect(resolveUserDisplayName('missing', usersById)).toBe('Unknown user');
  });

  it('builds dashboard stats by status', () => {
    expect(buildDashboardStats(tickets, users)).toEqual({
      totalUsers: 2,
      openTickets: 1,
      inProgressTickets: 1,
      resolvedTickets: 1,
      closedTickets: 1,
    });
  });

  it('builds recent tickets sorted by createdAt descending', () => {
    const recent = buildRecentTickets(tickets, buildUsersById(users), 3);

    expect(recent).toHaveLength(3);
    expect(recent.map((ticket) => ticket.ticketNumber)).toEqual(['TKT-001', 'TKT-002', 'TKT-003']);
    expect(recent[0]?.assignedTo).toBe('Bob Smith');
    expect(recent[2]?.assignedTo).toBe('Unassigned');
  });

  it('builds recent activity from tickets and comments', () => {
    const commentsByTicketId: Record<string, Comment[]> = {
      t1: [
        {
          id: 'c1',
          ticketId: 't1',
          message: 'Looking into it',
          createdBy: 'user-1',
          createdAt: '2026-01-07T00:00:00.000Z',
        },
      ],
    };

    const activity = buildRecentActivity(tickets, commentsByTicketId, 10);

    expect(activity[0]?.type).toBe('comment_added');
    expect(activity.some((item) => item.type === 'ticket_created')).toBe(true);
    expect(activity.some((item) => item.type === 'ticket_updated')).toBe(true);
    expect(activity.some((item) => item.type === 'status_changed')).toBe(true);
  });

  it('builds a complete dashboard summary', () => {
    const summary = buildDashboardSummary(tickets, users, {});

    expect(summary.stats.openTickets).toBe(1);
    expect(summary.recentTickets).toHaveLength(4);
    expect(summary.recentActivity.length).toBeGreaterThan(0);
  });
});
