/**
 * Deterministic comment definitions linked to seeded tickets by title.
 */
export interface SeedCommentDefinition {
  ticketTitle: string;
  message: string;
  createdByEmail: string;
}

export const SEED_COMMENTS: SeedCommentDefinition[] = [
  {
    ticketTitle: 'Login page throws 500 after password reset',
    message: 'Issue reproduced in staging with a freshly reset account.',
    createdByEmail: 'qa@supportticket.local',
  },
  {
    ticketTitle: 'Login page throws 500 after password reset',
    message: 'Assigned to frontend team for investigation.',
    createdByEmail: 'admin@supportticket.local',
  },
  {
    ticketTitle: 'Dashboard widgets fail to load',
    message: 'Root cause identified in the stats API response shape.',
    createdByEmail: 'developer@supportticket.local',
  },
  {
    ticketTitle: 'Dashboard widgets fail to load',
    message: 'Fix merged into development.',
    createdByEmail: 'developer@supportticket.local',
  },
  {
    ticketTitle: 'Dashboard widgets fail to load',
    message: 'Waiting for QA verification.',
    createdByEmail: 'qa@supportticket.local',
  },
  {
    ticketTitle: 'API timeout on ticket listing',
    message: 'Assigned to backend team. Profiling shows missing index on status.',
    createdByEmail: 'admin@supportticket.local',
  },
  {
    ticketTitle: 'API timeout on ticket listing',
    message: 'Ready for regression testing.',
    createdByEmail: 'qa@supportticket.local',
  },
  {
    ticketTitle: 'Email notifications delayed',
    message: 'Queue backlog cleared after increasing worker concurrency.',
    createdByEmail: 'admin@supportticket.local',
  },
  {
    ticketTitle: 'User cannot upload profile image',
    message: 'Issue reproduced on Safari and Chrome.',
    createdByEmail: 'qa@supportticket.local',
  },
];
