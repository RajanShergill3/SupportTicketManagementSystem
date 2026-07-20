import { beforeEach, describe, expect, it, vi } from 'vitest';

import { commentService } from '@/services/comment.service';
import { dashboardService } from '@/services/dashboard.service';
import { ticketService } from '@/services/ticket.service';
import { userService } from '@/services/user.service';

import { mockComment, mockTicket, mockTicketTwo, mockUser, mockUserTwo } from '../hooks/fixtures';

vi.mock('@/services/ticket.service', () => ({
  ticketService: {
    getTickets: vi.fn(),
  },
}));

vi.mock('@/services/user.service', () => ({
  userService: {
    getUsers: vi.fn(),
  },
}));

vi.mock('@/services/comment.service', () => ({
  commentService: {
    getComments: vi.fn(),
  },
}));

const getTickets = vi.mocked(ticketService.getTickets);
const getUsers = vi.mocked(userService.getUsers);
const getComments = vi.mocked(commentService.getComments);

describe('dashboardService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('aggregates tickets, users, and comments into a dashboard summary', async () => {
    const ticketA = {
      ...mockTicket,
      assignee: mockUserTwo.id,
      reporter: mockUser.id,
      createdAt: '2026-01-05T00:00:00.000Z',
      updatedAt: '2026-01-05T00:00:00.000Z',
    };
    const ticketB = {
      ...mockTicketTwo,
      assignee: mockUser.id,
      reporter: mockUserTwo.id,
      createdAt: '2026-01-04T00:00:00.000Z',
      updatedAt: '2026-01-04T12:00:00.000Z',
    };

    getTickets.mockResolvedValue([ticketA, ticketB]);
    getUsers.mockResolvedValue([mockUser, mockUserTwo]);
    getComments.mockResolvedValueOnce([mockComment]).mockResolvedValueOnce([]);

    const summary = await dashboardService.getDashboardSummary();

    expect(getTickets).toHaveBeenCalledTimes(1);
    expect(getUsers).toHaveBeenCalledTimes(1);
    expect(getComments).toHaveBeenCalledTimes(2);
    expect(summary.stats.totalUsers).toBe(2);
    expect(summary.stats.openTickets).toBe(1);
    expect(summary.stats.resolvedTickets).toBe(1);
    expect(summary.recentTickets[0]?.ticketNumber).toBe(ticketA.ticketNumber);
    expect(summary.recentTickets[0]?.assignedTo).toBe(mockUserTwo.name);
    expect(summary.recentActivity.some((item) => item.type === 'comment_added')).toBe(true);
  });

  it('continues when comment enrichment fails', async () => {
    getTickets.mockResolvedValue([mockTicket]);
    getUsers.mockResolvedValue([mockUser]);
    getComments.mockRejectedValue(new Error('Comments unavailable'));

    const summary = await dashboardService.getDashboardSummary();

    expect(summary.stats.openTickets).toBe(1);
    expect(summary.recentTickets).toHaveLength(1);
  });

  it('propagates ticket load failures', async () => {
    getTickets.mockRejectedValue(new Error('Network error'));
    getUsers.mockResolvedValue([]);

    await expect(dashboardService.getDashboardSummary()).rejects.toThrow('Network error');
  });
});
