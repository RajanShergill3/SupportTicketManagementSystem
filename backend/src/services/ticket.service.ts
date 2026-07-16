/**
 * Ticket service.
 *
 * Contains Ticket domain business rules. Coordinates validation,
 * user existence checks, and repository access. No Express dependencies.
 */
import { isValidObjectId } from 'mongoose';

import { TicketMessages } from '../constants/ticket-messages.constants';
import { isAllowedTicketStatusTransition } from '../constants/ticket-status-transitions.constants';
import { ticketRepository, TicketRepository } from '../repositories/ticket.repository';
import { userRepository, UserRepository } from '../repositories/user.repository';
import {
  CreateTicketPayload,
  ITicket,
  TicketListFilters,
  UpdateTicketPayload,
  UpdateTicketStatusPayload,
} from '../types/ticket.types';
import {
  validateCreateTicketInput,
  validateTicketListFilters,
  validateUpdateTicketInput,
  validateUpdateTicketStatusInput,
} from '../validators/ticket.validator';
import { BadRequestError, NotFoundError } from '../utils/errors';
import { logger } from '../utils/logger.util';

export class TicketService {
  constructor(
    private readonly repository: TicketRepository,
    private readonly users: UserRepository,
  ) {}

  async getAllTickets(filters: { status?: unknown; keyword?: unknown } = {}): Promise<ITicket[]> {
    const validatedFilters: TicketListFilters = validateTicketListFilters(filters);
    return this.repository.findAll(validatedFilters);
  }

  async getTicketById(id: string): Promise<ITicket> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    const ticket = await this.repository.findById(id);

    if (!ticket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    return ticket;
  }

  async createTicket(payload: CreateTicketPayload): Promise<ITicket> {
    const input = validateCreateTicketInput(payload);

    await this.ensureUserExists(input.createdBy, TicketMessages.CREATOR_NOT_FOUND);
    await this.ensureUserExists(input.assignedTo, TicketMessages.ASSIGNEE_NOT_FOUND);

    try {
      return await this.repository.create(input);
    } catch (error) {
      logger.error('Failed to create ticket', error);
      throw error;
    }
  }

  async updateTicket(id: string, payload: UpdateTicketPayload): Promise<ITicket> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    const input = validateUpdateTicketInput(payload);
    const existingTicket = await this.repository.findById(id);

    if (!existingTicket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    if (input.assignedTo) {
      await this.ensureUserExists(input.assignedTo, TicketMessages.ASSIGNEE_NOT_FOUND);
    }

    const updatedTicket = await this.repository.updateById(id, input);

    if (!updatedTicket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    return updatedTicket;
  }

  async updateTicketStatus(id: string, payload: UpdateTicketStatusPayload): Promise<ITicket> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    const newStatus = validateUpdateTicketStatusInput(payload);
    const existingTicket = await this.repository.findById(id);

    if (!existingTicket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    if (!isAllowedTicketStatusTransition(existingTicket.status, newStatus)) {
      throw new BadRequestError(TicketMessages.INVALID_STATUS_TRANSITION);
    }

    const updatedTicket = await this.repository.updateById(id, { status: newStatus });

    if (!updatedTicket) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    return updatedTicket;
  }

  async deleteTicket(id: string): Promise<void> {
    if (!isValidObjectId(id)) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }

    const deleted = await this.repository.deleteById(id);

    if (!deleted) {
      throw new NotFoundError(TicketMessages.NOT_FOUND);
    }
  }

  private async ensureUserExists(userId: string, message: string): Promise<void> {
    const user = await this.users.findById(userId);

    if (!user) {
      throw new BadRequestError(message);
    }
  }
}

export const ticketService = new TicketService(ticketRepository, userRepository);
