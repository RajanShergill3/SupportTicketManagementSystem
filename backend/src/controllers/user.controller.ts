/**
 * User controller.
 *
 * Thin HTTP layer that delegates to the User service and formats responses.
 * No database access or business rules belong here.
 */
import { Request, Response } from 'express';

import { userService } from '../services/user.service';
import { toUserResponse } from '../types/user-response.types';
import { sendSuccess } from '../utils/api-response.util';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  const users = await userService.getAllUsers();
  sendSuccess(
    res,
    users.map(toUserResponse),
  );
};

export const getUserById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const user = await userService.getUserById(req.params.id);
  sendSuccess(res, toUserResponse(user));
};
