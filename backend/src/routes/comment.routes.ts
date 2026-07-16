/**
 * Comment API routes.
 *
 * Nested under tickets. Maps HTTP paths to controller handlers.
 * No business logic or database access belongs in this module.
 */
import { Router } from 'express';

import { createComment, getCommentsByTicket } from '../controllers/comment.controller';

const router = Router({ mergeParams: true });

router.post('/', createComment);
router.get('/', getCommentsByTicket);

export default router;
