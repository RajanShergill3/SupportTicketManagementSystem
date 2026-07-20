/**
 * Health check route.
 *
 * Used by load balancers and monitoring tools to verify the API is running.
 */
import { Request, Response, Router } from 'express';

import { HealthCheckResponse } from '../types';

const router = Router();

router.get('/health', (_req: Request, res: Response<HealthCheckResponse>) => {
  res.status(200).json({
    success: true,
    status: 'ok',
    message: 'Support Ticket Management System API is running.',
  });
});

export default router;
