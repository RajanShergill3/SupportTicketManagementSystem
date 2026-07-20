import { TicketPriority } from '../../constants/ticket-priority.constants';
import { TicketStatus } from '../../constants/ticket-status.constants';

/**
 * Deterministic ticket definitions for development and manual testing.
 */
export interface SeedTicketDefinition {
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdByEmail: string;
  assignedToEmail: string;
}

export const SEED_TICKETS: SeedTicketDefinition[] = [
  {
    title: 'Login page throws 500 after password reset',
    description:
      'Users who complete the password reset flow are redirected to the login page, which returns HTTP 500 instead of rendering the sign-in form.',
    priority: TicketPriority.CRITICAL,
    status: TicketStatus.OPEN,
    createdByEmail: 'qa@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
  {
    title: 'Dashboard widgets fail to load',
    description:
      'Stat cards and the recent tickets widget remain in a loading state indefinitely after the dashboard mounts.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
    createdByEmail: 'admin@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
  {
    title: 'Video playback freezes on Safari',
    description:
      'Embedded training videos pause after a few seconds when viewed in Safari 17 on macOS. Chrome and Firefox work as expected.',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.OPEN,
    createdByEmail: 'qa@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
  {
    title: 'User cannot upload profile image',
    description:
      'Selecting a PNG under 2 MB shows a success toast, but the avatar does not update and no file appears in storage logs.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.IN_PROGRESS,
    createdByEmail: 'developer@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
  {
    title: 'Email notifications delayed',
    description:
      'Ticket assignment emails are arriving 30–45 minutes late. SMTP relay shows successful handoff with no retries.',
    priority: TicketPriority.MEDIUM,
    status: TicketStatus.RESOLVED,
    createdByEmail: 'admin@supportticket.local',
    assignedToEmail: 'admin@supportticket.local',
  },
  {
    title: 'Search returns incorrect results',
    description:
      'Keyword search on the tickets page includes closed tickets even when the status filter is set to Open only.',
    priority: TicketPriority.LOW,
    status: TicketStatus.OPEN,
    createdByEmail: 'qa@supportticket.local',
    assignedToEmail: 'qa@supportticket.local',
  },
  {
    title: 'API timeout on ticket listing',
    description:
      'GET /api/v1/tickets intermittently exceeds the 30 second gateway timeout when the database has more than 50 records.',
    priority: TicketPriority.CRITICAL,
    status: TicketStatus.IN_PROGRESS,
    createdByEmail: 'admin@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
  {
    title: 'Unable to change password',
    description:
      'Submitting the change-password form with valid current and new passwords returns a generic validation error.',
    priority: TicketPriority.HIGH,
    status: TicketStatus.CANCELLED,
    createdByEmail: 'qa@supportticket.local',
    assignedToEmail: 'developer@supportticket.local',
  },
];
