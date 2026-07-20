import { useCallback, useRef, useState } from 'react';

import { ticketService } from '@/services/ticket.service';

export function useDeleteTicket() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isDeletingRef = useRef(false);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const deleteTicket = useCallback(async (id: string): Promise<boolean> => {
    if (isDeletingRef.current) {
      return false;
    }

    isDeletingRef.current = true;
    setIsDeleting(true);
    setError(null);

    try {
      await ticketService.deleteTicket(id);
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
      return false;
    } finally {
      isDeletingRef.current = false;
      setIsDeleting(false);
    }
  }, []);

  return {
    deleteTicket,
    isDeleting,
    error,
    clearError,
  };
}
