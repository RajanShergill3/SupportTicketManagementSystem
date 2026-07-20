import { type Comment } from '@/types/comment.types';
import { type Ticket } from '@/types/ticket.types';
import { type User } from '@/types/user.types';

export const mockTicket: Ticket = {
  id: '507f1f77bcf86cd799439011',
  ticketNumber: 'TKT-001',
  title: 'Login failure',
  description: 'Users cannot sign in',
  reporter: '507f1f77bcf86cd799439013',
  assignee: '507f1f77bcf86cd799439012',
  priority: 'High',
  status: 'Open',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
};

export const mockTicketTwo: Ticket = {
  ...mockTicket,
  id: '507f1f77bcf86cd799439014',
  ticketNumber: 'TKT-002',
  title: 'UI spacing issue',
  priority: 'Low',
  status: 'Resolved',
};

export const mockUser: User = {
  id: '507f1f77bcf86cd799439021',
  name: 'Alice Johnson',
  email: 'alice@example.com',
  role: 'Developer',
  status: 'Active',
  createdAt: '2026-01-01T00:00:00.000Z',
};

export const mockUserTwo: User = {
  id: '507f1f77bcf86cd799439022',
  name: 'Bob Smith',
  email: 'bob@example.com',
  role: 'QA',
  status: 'Active',
  createdAt: '2026-01-02T00:00:00.000Z',
};

export const mockComment: Comment = {
  id: '507f1f77bcf86cd799439031',
  ticketId: mockTicket.id,
  message: 'Investigating now',
  createdBy: mockTicket.reporter,
  createdAt: '2026-01-03T00:00:00.000Z',
};

export const validCreateTicketInput = {
  title: 'Login failure',
  description: 'Users cannot sign in',
  priority: 'High' as const,
  reporter: mockTicket.reporter,
  assignee: mockTicket.assignee,
};

export const validUpdateTicketInput = {
  title: 'Updated title',
  description: 'Updated description',
  priority: 'Critical' as const,
  assignee: mockTicket.assignee,
};
