import { type Ticket } from '@/types/ticket.types';

type TicketPlaceholder = Omit<Ticket, 'updatedAt'>;

const rawTickets: TicketPlaceholder[] = [
  {
    id: 'tkt-001',
    ticketNumber: 'TKT-1001',
    title: 'Login page not loading',
    description:
      'Users report a blank screen after submitting credentials on the login page. The issue appears intermittently in Chrome and Safari.',
    reporter: 'Sarah Chen',
    assignee: 'Demo Developer',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-03-01T08:15:00.000Z',
  },
  {
    id: 'tkt-002',
    ticketNumber: 'TKT-1002',
    title: 'Unable to assign ticket',
    description:
      'Assignee dropdown does not populate when editing a ticket from the list view. Works correctly from the detail page.',
    reporter: 'Michael Patel',
    assignee: 'Demo QA',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-03-02T10:30:00.000Z',
  },
  {
    id: 'tkt-003',
    ticketNumber: 'TKT-1003',
    title: 'Email notifications delayed',
    description:
      'Ticket status change emails are arriving 30–45 minutes late. SMTP logs show no immediate failures.',
    reporter: 'Emily Johnson',
    assignee: 'System Admin',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-03T14:00:00.000Z',
  },
  {
    id: 'tkt-004',
    ticketNumber: 'TKT-1004',
    title: 'Dashboard metrics mismatch',
    description:
      'Open ticket count on the dashboard does not match the filtered list total. Suspected caching issue.',
    reporter: 'James Wilson',
    assignee: 'Demo Developer',
    priority: 'Critical',
    status: 'Open',
    createdAt: '2026-03-04T09:45:00.000Z',
  },
  {
    id: 'tkt-005',
    ticketNumber: 'TKT-1005',
    title: 'Comment submission error',
    description:
      'Submitting a comment returns a generic error toast. Network tab shows HTTP 500 from the comments endpoint.',
    reporter: 'Priya Sharma',
    assignee: 'Demo Developer',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-03-05T11:20:00.000Z',
  },
  {
    id: 'tkt-006',
    ticketNumber: 'TKT-1006',
    title: 'Export tickets to CSV',
    description:
      'Request to export the current ticket list as CSV for monthly reporting. Include ticket ID, status, and assignee.',
    reporter: 'David Kim',
    assignee: 'Demo QA',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-03-06T16:10:00.000Z',
  },
  {
    id: 'tkt-007',
    ticketNumber: 'TKT-1007',
    title: 'Mobile layout broken on tickets page',
    description:
      'Table overflows horizontally on mobile without scroll indicators. Filters stack incorrectly below 640px.',
    reporter: 'Laura Martinez',
    assignee: 'Demo Developer',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '2026-03-07T08:00:00.000Z',
  },
  {
    id: 'tkt-008',
    ticketNumber: 'TKT-1008',
    title: 'Password reset link expired immediately',
    description:
      'Reset links sent via email are marked expired on first click, even when used within one minute.',
    reporter: 'System Admin',
    assignee: 'Demo QA',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: '2026-03-08T13:25:00.000Z',
  },
  {
    id: 'tkt-009',
    ticketNumber: 'TKT-1009',
    title: 'Search returns duplicate results',
    description:
      'Searching by ticket number sometimes returns the same ticket twice when filters are active.',
    reporter: 'Sarah Chen',
    assignee: 'Demo Developer',
    priority: 'Medium',
    status: 'Open',
    createdAt: '2026-03-09T15:40:00.000Z',
  },
  {
    id: 'tkt-010',
    ticketNumber: 'TKT-1010',
    title: 'SLA breach alert not firing',
    description:
      'Tickets past their SLA threshold are not triggering alert emails. Cron job last ran successfully.',
    reporter: 'Michael Patel',
    assignee: 'System Admin',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-03-10T07:55:00.000Z',
  },
  {
    id: 'tkt-011',
    ticketNumber: 'TKT-1011',
    title: 'User role change not reflected in UI',
    description:
      'After updating a user role to Admin, the users table still shows the previous role until a hard refresh.',
    reporter: 'Emily Johnson',
    assignee: 'Demo Developer',
    priority: 'Low',
    status: 'Resolved',
    createdAt: '2026-03-11T12:00:00.000Z',
  },
  {
    id: 'tkt-012',
    ticketNumber: 'TKT-1012',
    title: 'Ticket priority cannot be lowered',
    description:
      'Changing priority from Critical to Medium is blocked with no validation message shown to the user.',
    reporter: 'James Wilson',
    assignee: 'Demo QA',
    priority: 'Medium',
    status: 'Closed',
    createdAt: '2026-03-12T09:30:00.000Z',
  },
  {
    id: 'tkt-013',
    ticketNumber: 'TKT-1013',
    title: 'Attachment upload fails for large files',
    description:
      'Files over 5 MB fail silently. Expected behaviour is a clear size limit error before upload starts.',
    reporter: 'Priya Sharma',
    assignee: 'Demo Developer',
    priority: 'High',
    status: 'Open',
    createdAt: '2026-03-13T17:15:00.000Z',
  },
  {
    id: 'tkt-014',
    ticketNumber: 'TKT-1014',
    title: 'Audit log missing status transitions',
    description:
      'Status changes from In Progress to Resolved are not recorded in the activity timeline.',
    reporter: 'David Kim',
    assignee: 'System Admin',
    priority: 'Medium',
    status: 'Resolved',
    createdAt: '2026-03-14T10:05:00.000Z',
  },
  {
    id: 'tkt-015',
    ticketNumber: 'TKT-1015',
    title: 'Bulk ticket close action',
    description:
      'Feature request to close multiple resolved tickets at once from the list view with a confirmation step.',
    reporter: 'Laura Martinez',
    assignee: 'Demo QA',
    priority: 'Low',
    status: 'Closed',
    createdAt: '2026-03-15T11:50:00.000Z',
  },
];

export const mockTickets: Ticket[] = rawTickets.map((ticket) => ({
  ...ticket,
  updatedAt: ticket.createdAt,
}));
