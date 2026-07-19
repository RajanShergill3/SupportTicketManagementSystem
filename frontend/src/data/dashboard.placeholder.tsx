export const dashboardStats = [
  {
    title: 'Total Users',
    value: 12,
    description: 'Active team members in the system',
    accentClassName: 'bg-blue-50 text-blue-600',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-4-4h-1M9 20H4v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    title: 'Open Tickets',
    value: 24,
    description: 'Tickets awaiting action',
    accentClassName: 'bg-amber-50 text-amber-600',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: 'In Progress Tickets',
    value: 8,
    description: 'Currently being worked on',
    accentClassName: 'bg-primary-50 text-primary-600',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: 'Closed Tickets',
    value: 156,
    description: 'Resolved and closed tickets',
    accentClassName: 'bg-green-50 text-green-600',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
] as const;

export const recentTickets = [
  {
    id: 'TKT-1001',
    title: 'Login page not loading',
    status: 'Open',
    priority: 'High',
    assignedTo: 'Demo Developer',
  },
  {
    id: 'TKT-1002',
    title: 'Unable to assign ticket',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Demo QA',
  },
  {
    id: 'TKT-1003',
    title: 'Email notifications delayed',
    status: 'Resolved',
    priority: 'Low',
    assignedTo: 'System Admin',
  },
  {
    id: 'TKT-1004',
    title: 'Dashboard metrics mismatch',
    status: 'Open',
    priority: 'Critical',
    assignedTo: 'Demo Developer',
  },
  {
    id: 'TKT-1005',
    title: 'Comment submission error',
    status: 'Closed',
    priority: 'Medium',
    assignedTo: 'Demo QA',
  },
] as const;

export const recentActivity = [
  {
    id: '1',
    title: 'Ticket created',
    description: 'TKT-1004 was created by System Admin.',
    time: '10 minutes ago',
  },
  {
    id: '2',
    title: 'Ticket assigned',
    description: 'TKT-1002 was assigned to Demo QA.',
    time: '35 minutes ago',
  },
  {
    id: '3',
    title: 'Comment added',
    description: 'A new comment was added to TKT-1001.',
    time: '1 hour ago',
  },
  {
    id: '4',
    title: 'Ticket resolved',
    description: 'TKT-1003 was marked as resolved.',
    time: '2 hours ago',
  },
] as const;
