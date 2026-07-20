/**
 * Development ticket seed logic.
 */
import { TicketStatus } from '../../constants/ticket-status.constants';
import { ticketRepository } from '../../repositories/ticket.repository';
import { ITicket } from '../../types/ticket.types';
import { logger } from '../../utils/logger.util';
import { resolveUserIdByEmail } from './seed-user-resolver';
import { SEED_TICKETS } from './ticket.seed-data';

export const seedTickets = async (): Promise<{ ticketsCreated: number; ticketsByTitle: Map<string, ITicket> }> => {
  logger.info(`Seeding ${SEED_TICKETS.length} tickets...`);

  const ticketsByTitle = new Map<string, ITicket>();
  let ticketsCreated = 0;

  for (const seedTicket of SEED_TICKETS) {
    const [createdBy, assignedTo] = await Promise.all([
      resolveUserIdByEmail(seedTicket.createdByEmail),
      resolveUserIdByEmail(seedTicket.assignedToEmail),
    ]);

    const ticket = await ticketRepository.create({
      title: seedTicket.title,
      description: seedTicket.description,
      priority: seedTicket.priority,
      createdBy,
      assignedTo,
    });

    let persistedTicket = ticket;

    if (seedTicket.status !== TicketStatus.OPEN) {
      const updatedTicket = await ticketRepository.updateById(ticket._id.toString(), {
        status: seedTicket.status,
      });

      if (updatedTicket) {
        persistedTicket = updatedTicket;
      }
    }

    ticketsByTitle.set(seedTicket.title, persistedTicket);
    ticketsCreated += 1;
    logger.info(`Created seed ticket: ${seedTicket.title}`);
  }

  logger.info('Ticket seeding finished');
  return { ticketsCreated, ticketsByTitle };
};
