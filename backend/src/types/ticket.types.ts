import { Types } from 'mongoose';

import { TicketPriority } from '../constants/ticket-priority.constants';
import { TicketStatus } from '../constants/ticket-status.constants';

export interface ITicket {
  _id: Types.ObjectId;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  assignedTo: Types.ObjectId;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTicketInput {
  title: string;
  description: string;
  priority: TicketPriority;
  assignedTo: string;
  createdBy: string;
}

export interface UpdateTicketInput {
  title?: string;
  description?: string;
  priority?: TicketPriority;
  assignedTo?: string;
  status?: TicketStatus;
}

export interface CreateTicketPayload {
  title: unknown;
  description: unknown;
  priority: unknown;
  assignedTo: unknown;
  createdBy: unknown;
}

export interface UpdateTicketPayload {
  title?: unknown;
  description?: unknown;
  priority?: unknown;
  assignedTo?: unknown;
}

export interface UpdateTicketStatusPayload {
  status: unknown;
}

export interface TicketListFilters {
  status?: TicketStatus;
  keyword?: string;
}
