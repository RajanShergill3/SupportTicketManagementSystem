/**
 * Axios API client configured for the Support Ticket Management System backend.
 */
import axios from 'axios';

import { env } from '@/config/env';

const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Placeholder for centralized API error handling in future tasks.
    return Promise.reject(error);
  },
);

export default apiClient;
