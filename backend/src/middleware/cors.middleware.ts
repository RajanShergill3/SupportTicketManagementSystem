/**
 * CORS middleware for browser clients (e.g. Vite dev server).
 */
import cors from 'cors';

import { config } from '../config';

export const corsMiddleware = cors({
  origin: config.cors.origins,
  credentials: config.cors.credentials,
});
