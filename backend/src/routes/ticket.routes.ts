/**
 * Ticket API routes.
 *
 * Maps HTTP paths to controller handlers. No business logic or
 * database access belongs in this module.
 */
import { Router } from 'express';

import {
  createTicket,
  deleteTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  updateTicketStatus,
} from '../controllers/ticket.controller';
import commentRoutes from './comment.routes';

const router = Router();

router.post('/', createTicket);
router.get('/', getAllTickets);
router.patch('/:id/status', updateTicketStatus);
router.use('/:id/comments', commentRoutes);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

export default router;
