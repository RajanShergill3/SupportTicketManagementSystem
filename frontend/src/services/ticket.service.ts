import apiClient from '@/api/client';
import { type ApiSuccessResponse } from '@/types/api.types';
import { type TicketApiDto } from '@/types/ticket-api.types';
import { type Ticket } from '@/types/ticket.types';
import { getApiErrorMessage, ApiError, getApiErrorStatus } from '@/utils/api-error.util';
import { mapTicketFromApi } from '@/utils/ticket.mapper';

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

export const ticketService = {
  getTickets,
  getTicketById,
};
