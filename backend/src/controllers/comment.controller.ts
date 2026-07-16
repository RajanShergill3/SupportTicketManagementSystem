/**
 * Comment controller.
 *
 * Thin HTTP layer that delegates to the Comment service and formats responses.
 * No database access or business rules belong here.
 */
import { Request, Response } from 'express';

import { HttpStatus } from '../constants';
import { commentService } from '../services/comment.service';
import { toCommentResponse } from '../types/comment-response.types';
import { sendSuccess } from '../utils/api-response.util';

export const createComment = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const comment = await commentService.createComment({
    ticketId: req.params.id,
    message: req.body.message,
    createdBy: req.body.createdBy,
  });
  sendSuccess(res, toCommentResponse(comment), { statusCode: HttpStatus.CREATED });
};

export const getCommentsByTicket = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const comments = await commentService.getCommentsByTicketId(req.params.id);
  sendSuccess(
    res,
    comments.map(toCommentResponse),
  );
};
