/**
 * Mongoose Comment model.
 *
 * Defines schema-level constraints only. Business rules belong in the
 * service layer; domain input validation belongs in the Comment validator.
 */
import { Schema, model } from 'mongoose';

import { IComment } from '../types/comment.types';

const commentSchema = new Schema<IComment>(
  {
    ticketId: {
      type: Schema.Types.ObjectId,
      ref: 'Ticket',
      required: [true, 'ticketId is required'],
    },
    message: {
      type: String,
      required: [true, 'message is required'],
      trim: true,
      minlength: [1, 'message cannot be empty'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'createdBy is required'],
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    versionKey: false,
  },
);

export const CommentModel = model<IComment>('Comment', commentSchema);
