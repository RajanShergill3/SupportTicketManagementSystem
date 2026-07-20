import { useCallback, useRef, useState } from 'react';

import { ticketService } from '@/services/ticket.service';
import { type Ticket, type TicketStatus } from '@/types/ticket.types';

export function useUpdateTicketStatus() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isUpdatingRef = useRef(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateStatus = useCallback(
    async (id: string, status: TicketStatus): Promise<Ticket | null> => {
      if (isUpdatingRef.current) {
        return null;
      }

      isUpdatingRef.current = true;
      setIsUpdating(true);
      setError(null);

      try {
        const updatedTicket = await ticketService.updateTicketStatus(id, status);
        return updatedTicket;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        );
        return null;
      } finally {
        isUpdatingRef.current = false;
        setIsUpdating(false);
      }
    },
    [],
  );

  return {
    updateStatus,
    isUpdating,
    error,
    clearError,
  };
}
