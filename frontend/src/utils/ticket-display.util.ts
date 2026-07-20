const TICKET_NUMBER_PREFIX = 'TKT-';
const FALLBACK_ID_LENGTH = 8;

/**
 * Formats a ticket identifier for display.
 *
 * Uses the backend ticket number when available. Otherwise derives a readable
 * label from the MongoDB id while navigation continues to use the full `id`.
 */
export function formatTicketNumber(id: string, ticketNumber?: string): string {
  if (ticketNumber) {
    return ticketNumber;
  }

  const suffix = id.slice(-FALLBACK_ID_LENGTH).toUpperCase();
  return `${TICKET_NUMBER_PREFIX}${suffix}`;
}
