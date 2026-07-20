import { TicketPriority } from '../../src/constants/ticket-priority.constants';
import { TicketStatus } from '../../src/constants/ticket-status.constants';
import { TicketModel } from '../../src/models/ticket.model';
import { ITicket } from '../../src/types/ticket.types';

import { createTestUser } from './user.factory';

export interface CreateTestTicketOptions {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  status?: TicketStatus;
  assignedTo?: string;
  createdBy?: string;
}

let ticketSequence = 0;

/**
 * Creates and persists a ticket document for tests.
 * Creates reporter/assignee users when ids are not provided.
 */
export async function createTestTicket(options: CreateTestTicketOptions = {}): Promise<ITicket> {
  ticketSequence += 1;

  const createdBy = options.createdBy ?? (await createTestUser({ name: `Reporter ${ticketSequence}` }))._id.toString();
  const assignedTo =
    options.assignedTo ?? (await createTestUser({ name: `Assignee ${ticketSequence}` }))._id.toString();

  const ticket = await TicketModel.create({
    title: options.title ?? `Test Ticket ${ticketSequence}`,
    description: options.description ?? `Description for test ticket ${ticketSequence}`,
    priority: options.priority ?? TicketPriority.MEDIUM,
    status: options.status ?? TicketStatus.OPEN,
    assignedTo,
    createdBy,
  });

  return ticket.toObject();
}
