/**
 * Ticket controller.
 *
 * Thin HTTP layer that delegates to the Ticket service and formats responses.
 * No database access or business rules belong here.
 */
import { Request, Response } from 'express';

import { HttpStatus } from '../constants';
import { ticketService } from '../services/ticket.service';
import { toTicketResponse } from '../types/ticket-response.types';
import { sendSuccess } from '../utils/api-response.util';

export const createTicket = async (req: Request, res: Response): Promise<void> => {
  const ticket = await ticketService.createTicket(req.body);
  sendSuccess(res, toTicketResponse(ticket), { statusCode: HttpStatus.CREATED });
};

export const getAllTickets = async (req: Request, res: Response): Promise<void> => {
  const tickets = await ticketService.getAllTickets({
    status: req.query.status,
    keyword: req.query.keyword,
  });
  sendSuccess(
    res,
    tickets.map(toTicketResponse),
  );
};

export const getTicketById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const ticket = await ticketService.getTicketById(req.params.id);
  sendSuccess(res, toTicketResponse(ticket));
};

export const updateTicket = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const ticket = await ticketService.updateTicket(req.params.id, req.body);
  sendSuccess(res, toTicketResponse(ticket));
};

export const deleteTicket = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  await ticketService.deleteTicket(req.params.id);
  res.status(HttpStatus.NO_CONTENT).send();
};

export const updateTicketStatus = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const ticket = await ticketService.updateTicketStatus(req.params.id, req.body);
  sendSuccess(res, toTicketResponse(ticket));
};
