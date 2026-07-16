import { Types } from 'mongoose';

export interface IComment {
  _id: Types.ObjectId;
  ticketId: Types.ObjectId;
  message: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
}

export interface CreateCommentInput {
  ticketId: string;
  message: string;
  createdBy: string;
}

export interface CreateCommentPayload {
  ticketId: unknown;
  message: unknown;
  createdBy: unknown;
}
