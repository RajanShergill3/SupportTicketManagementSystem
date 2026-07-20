import { API_TICKET_STATUSES, type TicketApiDto } from '@/types/ticket-api.types';
import { type Ticket, type TicketStatus } from '@/types/ticket.types';
import { formatTicketNumber } from '@/utils/ticket-display.util';

const isApiTicketStatus = (value: string): value is TicketStatus => {
  return API_TICKET_STATUSES.includes(value as TicketStatus);
};

/**
 * Maps unknown backend status values to a supported frontend status.
 */
function mapTicketStatus(value: string): TicketStatus {
  if (isApiTicketStatus(value)) {
    return value;
  }

  return 'Open';
}

/**
 * Maps backend ticket DTOs into frontend Ticket models.
 */
export function mapTicketFromApi(dto: TicketApiDto): Ticket {
  return {
    id: dto.id,
    ticketNumber: formatTicketNumber(dto.id, dto.ticketNumber),
    title: dto.title,
    description: dto.description,
    // Backend returns user ids; display values until populated user details are available.
    reporter: dto.createdBy,
    assignee: dto.assignedTo,
    priority: dto.priority,
    status: mapTicketStatus(dto.status),
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
  };
}
