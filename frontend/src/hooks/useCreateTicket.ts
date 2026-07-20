import { useCallback, useState } from 'react';

import { ticketService } from '@/services/ticket.service';
import { type CreateTicketInput } from '@/types/ticket-form.types';
import { type Ticket } from '@/types/ticket.types';
import {
  hasTicketFormErrors,
  normalizeCreateTicketInput,
  type TicketFormErrors,
  validateCreateTicketInput,
} from '@/utils/ticket.validation';

export function useCreateTicket() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<TicketFormErrors>({});

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const submit = useCallback(async (input: CreateTicketInput): Promise<Ticket | null> => {
    const normalizedInput = normalizeCreateTicketInput(input);
    const validationErrors = validateCreateTicketInput(normalizedInput);

    if (hasTicketFormErrors(validationErrors)) {
      setFieldErrors(validationErrors);
      setError(null);
      return null;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    setError(null);

    try {
      const ticket = await ticketService.createTicket(normalizedInput);
      return ticket;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.',
      );
      return null;
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  return {
    submit,
    isSubmitting,
    error,
    fieldErrors,
    clearError,
  };
}
