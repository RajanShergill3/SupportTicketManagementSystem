/**
 * Ticket repository.
 *
 * Responsible for Ticket persistence only. No business rules or validation.
 */
import { FilterQuery } from 'mongoose';

import { TicketModel } from '../models/ticket.model';
import { CreateTicketInput, ITicket, TicketListFilters, UpdateTicketInput } from '../types/ticket.types';
import { TicketStatus } from '../constants/ticket-status.constants';

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const buildListQuery = (filters?: TicketListFilters): FilterQuery<ITicket> => {
  const query: FilterQuery<ITicket> = {};

  if (filters?.status) {
    query.status = filters.status;
  }

  if (filters?.keyword) {
    const keyword = escapeRegex(filters.keyword);
    query.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } },
    ];
  }

  return query;
};

export class TicketRepository {
  async findAll(filters?: TicketListFilters): Promise<ITicket[]> {
    return TicketModel.find(buildListQuery(filters))
      .sort({ createdAt: -1 })
      .lean<ITicket[]>()
      .exec();
  }

  async findById(id: string): Promise<ITicket | null> {
    return TicketModel.findById(id).lean<ITicket | null>().exec();
  }

  async create(input: CreateTicketInput): Promise<ITicket> {
    const ticket = await TicketModel.create({
      ...input,
      status: TicketStatus.OPEN,
    });
    return ticket.toObject();
  }

  async updateById(id: string, input: UpdateTicketInput): Promise<ITicket | null> {
    return TicketModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true },
    )
      .lean<ITicket | null>()
      .exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await TicketModel.findByIdAndDelete(id).exec();
    return result !== null;
  }
}

export const ticketRepository = new TicketRepository();
