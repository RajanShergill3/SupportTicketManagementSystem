import { useCallback, useEffect, useState } from 'react';

import { ticketService } from '@/services/ticket.service';
import { type Ticket } from '@/types/ticket.types';
import { ApiError } from '@/utils/api-error.util';

export function useTicketDetails(ticketId: string | undefined) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);

  const fetchTicket = useCallback(async () => {
    if (!ticketId) {
      setTicket(null);
      setError(null);
      setIsNotFound(true);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const data = await ticketService.getTicketById(ticketId);
      setTicket(data);
    } catch (err) {
      setTicket(null);

      if (err instanceof ApiError && err.status === 404) {
        setIsNotFound(true);
        return;
      }

      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    void fetchTicket();
  }, [fetchTicket]);

  return {
    ticket,
    isLoading,
    error,
    isNotFound,
    refresh: fetchTicket,
  };
}
