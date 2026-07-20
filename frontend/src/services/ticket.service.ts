import apiClient from '@/api/client';
import { type ApiSuccessResponse } from '@/types/api.types';
import { type CreateTicketInput, type UpdateTicketInput } from '@/types/ticket-form.types';
import { type TicketApiDto } from '@/types/ticket-api.types';
import { type Ticket, type TicketStatus } from '@/types/ticket.types';
import { getApiErrorMessage, ApiError, getApiErrorStatus } from '@/utils/api-error.util';
import { mapTicketFromApi } from '@/utils/ticket.mapper';
import { validateTicketStatus } from '@/utils/ticket-status.validation';
import { normalizeUpdateTicketInput } from '@/utils/ticket.validation';

const TICKETS_PATH = '/tickets';

async function getTickets(): Promise<Ticket[]> {
  try {
    const response = await apiClient.get<ApiSuccessResponse<TicketApiDto[]>>(TICKETS_PATH);
    return response.data.data.map(mapTicketFromApi);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

async function getTicketById(id: string): Promise<Ticket> {
  try {
    const response = await apiClient.get<ApiSuccessResponse<TicketApiDto>>(`${TICKETS_PATH}/${id}`);
    return mapTicketFromApi(response.data.data);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

async function createTicket(input: CreateTicketInput): Promise<Ticket> {
  try {
    const response = await apiClient.post<ApiSuccessResponse<TicketApiDto>>(TICKETS_PATH, {
      title: input.title,
      description: input.description,
      priority: input.priority,
      createdBy: input.reporter,
      assignedTo: input.assignee,
    });
    return mapTicketFromApi(response.data.data);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

async function updateTicket(ticketId: string, input: UpdateTicketInput): Promise<Ticket> {
  const normalized = normalizeUpdateTicketInput(input);

  try {
    const response = await apiClient.put<ApiSuccessResponse<TicketApiDto>>(
      `${TICKETS_PATH}/${ticketId}`,
      {
        title: normalized.title,
        description: normalized.description,
        priority: normalized.priority,
        assignedTo: normalized.assignee,
      },
    );
    return mapTicketFromApi(response.data.data);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

async function deleteTicket(id: string): Promise<void> {
  const ticketId = id.trim();

  if (!ticketId) {
    throw new ApiError('Ticket id is required.', 400);
  }

  try {
    await apiClient.delete(`${TICKETS_PATH}/${ticketId}`);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

async function updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
  const ticketId = id.trim();

  if (!ticketId) {
    throw new ApiError('Ticket id is required.', 400);
  }

  const validatedStatus = validateTicketStatus(status);

  try {
    const response = await apiClient.patch<ApiSuccessResponse<TicketApiDto>>(
      `${TICKETS_PATH}/${ticketId}/status`,
      { status: validatedStatus },
    );
    return mapTicketFromApi(response.data.data);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

export const ticketService = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  updateTicketStatus,
};
