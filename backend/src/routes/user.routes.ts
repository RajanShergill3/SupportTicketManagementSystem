/**
 * User read-only API routes.
 *
 * Maps HTTP paths to controller handlers. No business logic or
 * database access belongs in this module.
 */
import { Router } from 'express';

import { getAllUsers, getUserById } from '../controllers/user.controller';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);

export default router;
