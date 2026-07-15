/**
 * Mongoose Ticket model.
 *
 * Defines schema-level constraints only. Business rules belong in the
 * service layer; domain input validation belongs in the Ticket validator.
 */
import { Schema, model } from 'mongoose';

import { TICKET_PRIORITIES } from '../constants/ticket-priority.constants';
import { TICKET_STATUSES, TicketStatus } from '../constants/ticket-status.constants';
import { ITicket } from '../types/ticket.types';

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: [true, 'title is required'],
      trim: true,
      minlength: [1, 'title must be a non-empty string'],
    },
    description: {
      type: String,
      required: [true, 'description is required'],
      trim: true,
      minlength: [1, 'description must be a non-empty string'],
    },
    priority: {
      type: String,
      required: [true, 'priority is required'],
      enum: {
        values: TICKET_PRIORITIES,
        message: 'priority must be one of: Low, Medium, High, Critical',
      },
    },
    status: {
      type: String,
      required: [true, 'status is required'],
      enum: {
        values: TICKET_STATUSES,
        message: 'status must be one of: Open, In Progress, Resolved, Closed, Cancelled',
      },
      default: TicketStatus.OPEN,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'assignedTo is required'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'createdBy is required'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TicketModel = model<ITicket>('Ticket', ticketSchema);
