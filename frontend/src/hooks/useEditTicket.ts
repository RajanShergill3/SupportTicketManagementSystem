import { useCallback, useEffect, useState } from 'react';

import { ticketService } from '@/services/ticket.service';
import { type TicketFormValues, type UpdateTicketInput } from '@/types/ticket-form.types';
import { type Ticket } from '@/types/ticket.types';
import { ApiError } from '@/utils/api-error.util';
import {
  hasTicketFormErrors,
  normalizeUpdateTicketInput,
  ticketToFormValues,
  type TicketFormErrors,
  validateUpdateTicketInput,
} from '@/utils/ticket.validation';

export function useEditTicket(ticketId: string | undefined) {
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [initialValues, setInitialValues] = useState<TicketFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TicketFormErrors>({});

  const fetchTicket = useCallback(async () => {
    if (!ticketId) {
      setTicket(null);
      setInitialValues(null);
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
      setInitialValues(ticketToFormValues(data));
    } catch (err) {
      setTicket(null);
      setInitialValues(null);

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

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const submit = useCallback(
    async (input: UpdateTicketInput): Promise<Ticket | null> => {
      if (!ticketId) {
        setError('Unable to update ticket. Ticket context is missing.');
        return null;
      }

      const normalizedInput = normalizeUpdateTicketInput(input);
      const validationErrors = validateUpdateTicketInput(normalizedInput);

      if (hasTicketFormErrors(validationErrors)) {
        setFieldErrors(validationErrors);
        setError(null);
        return null;
      }

      setFieldErrors({});
      setIsSubmitting(true);
      setError(null);

      try {
        const updatedTicket = await ticketService.updateTicket(ticketId, normalizedInput);
        setTicket(updatedTicket);
        setInitialValues(ticketToFormValues(updatedTicket));
        return updatedTicket;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
        );
        return null;
      } finally {
        setIsSubmitting(false);
      }
    },
    [ticketId],
  );

  return {
    ticket,
    initialValues,
    isLoading,
    isSubmitting,
    error,
    isNotFound,
    fieldErrors,
    refresh: fetchTicket,
    submit,
    clearError,
  };
}
