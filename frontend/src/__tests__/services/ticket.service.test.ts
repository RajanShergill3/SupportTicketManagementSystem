import { beforeEach, describe, expect, it, vi } from 'vitest';

import apiClient from '@/api/client';
import { ticketService } from '@/services/ticket.service';
import { type TicketApiDto } from '@/types/ticket-api.types';
import { ApiError } from '@/utils/api-error.util';

import {
  asMockedApiClient,
  createApiAxiosError,
  mockApiSuccess,
} from './helpers';

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockedApiClient = asMockedApiClient(apiClient);

const ticketDto: TicketApiDto = {
  id: '507f1f77bcf86cd799439011',
  ticketNumber: 'TKT-001',
  title: 'Login failure',
  description: 'Users cannot sign in',
  priority: 'High',
  status: 'Open',
  assignedTo: '507f1f77bcf86cd799439012',
  createdBy: '507f1f77bcf86cd799439013',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-02T00:00:00.000Z',
};

describe('ticketService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getTickets calls GET /tickets and returns mapped tickets', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess([ticketDto]));

    const result = await ticketService.getTickets();

    expect(mockedApiClient.get).toHaveBeenCalledTimes(1);
    expect(mockedApiClient.get).toHaveBeenCalledWith('/tickets');
    expect(result).toEqual([
      {
        id: ticketDto.id,
        ticketNumber: 'TKT-001',
        title: ticketDto.title,
        description: ticketDto.description,
        reporter: ticketDto.createdBy,
        assignee: ticketDto.assignedTo,
        priority: ticketDto.priority,
        status: ticketDto.status,
        createdAt: ticketDto.createdAt,
        updatedAt: ticketDto.updatedAt,
      },
    ]);
  });

  it('getTickets propagates API errors', async () => {
    mockedApiClient.get.mockRejectedValue(createApiAxiosError(500, 'Server unavailable'));

    await expect(ticketService.getTickets()).rejects.toThrow('Server unavailable');
    expect(mockedApiClient.get).toHaveBeenCalledWith('/tickets');
  });

  it('getTicketById calls GET /tickets/:id and returns a mapped ticket', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess(ticketDto));

    const result = await ticketService.getTicketById(ticketDto.id);

    expect(mockedApiClient.get).toHaveBeenCalledWith(`/tickets/${ticketDto.id}`);
    expect(result.id).toBe(ticketDto.id);
    expect(result.title).toBe(ticketDto.title);
    expect(result.reporter).toBe(ticketDto.createdBy);
  });

  it('getTicketById propagates ApiError with status', async () => {
    mockedApiClient.get.mockRejectedValue(createApiAxiosError(404, 'Ticket not found'));

    await expect(ticketService.getTicketById(ticketDto.id)).rejects.toEqual(
      expect.objectContaining({
        name: 'ApiError',
        message: 'Ticket not found',
        status: 404,
      }),
    );
  });

  it('createTicket calls POST /tickets with the API payload and returns a mapped ticket', async () => {
    mockedApiClient.post.mockResolvedValue(mockApiSuccess(ticketDto));

    const input = {
      title: 'Login failure',
      description: 'Users cannot sign in',
      priority: 'High' as const,
      reporter: ticketDto.createdBy,
      assignee: ticketDto.assignedTo,
    };

    const result = await ticketService.createTicket(input);

    expect(mockedApiClient.post).toHaveBeenCalledWith('/tickets', {
      title: input.title,
      description: input.description,
      priority: input.priority,
      createdBy: input.reporter,
      assignedTo: input.assignee,
    });
    expect(result.id).toBe(ticketDto.id);
    expect(result.status).toBe('Open');
  });

  it('createTicket propagates ApiError on failure', async () => {
    mockedApiClient.post.mockRejectedValue(createApiAxiosError(400, 'Validation failed'));

    await expect(
      ticketService.createTicket({
        title: 'Title',
        description: 'Description',
        priority: 'Low',
        reporter: ticketDto.createdBy,
        assignee: ticketDto.assignedTo,
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });

  it('updateTicket calls PUT /tickets/:id with normalized payload', async () => {
    mockedApiClient.put.mockResolvedValue(
      mockApiSuccess({
        ...ticketDto,
        title: 'Updated title',
        description: 'Updated description',
        priority: 'Critical',
      }),
    );

    const result = await ticketService.updateTicket(ticketDto.id, {
      title: '  Updated title  ',
      description: '  Updated description  ',
      priority: 'Critical',
      assignee: `  ${ticketDto.assignedTo}  `,
    });

    expect(mockedApiClient.put).toHaveBeenCalledWith(`/tickets/${ticketDto.id}`, {
      title: 'Updated title',
      description: 'Updated description',
      priority: 'Critical',
      assignedTo: ticketDto.assignedTo,
    });
    expect(result.title).toBe('Updated title');
    expect(result.priority).toBe('Critical');
  });

  it('updateTicket propagates ApiError on failure', async () => {
    mockedApiClient.put.mockRejectedValue(createApiAxiosError(404, 'Ticket not found'));

    await expect(
      ticketService.updateTicket(ticketDto.id, {
        title: 'Title',
        description: 'Description',
        priority: 'Medium',
        assignee: ticketDto.assignedTo,
      }),
    ).rejects.toMatchObject({
      message: 'Ticket not found',
      status: 404,
    });
  });

  it('deleteTicket calls DELETE /tickets/:id', async () => {
    mockedApiClient.delete.mockResolvedValue({ data: undefined });

    await ticketService.deleteTicket(`  ${ticketDto.id}  `);

    expect(mockedApiClient.delete).toHaveBeenCalledTimes(1);
    expect(mockedApiClient.delete).toHaveBeenCalledWith(`/tickets/${ticketDto.id}`);
  });

  it('deleteTicket rejects an empty ticket id before calling the API', async () => {
    await expect(ticketService.deleteTicket('   ')).rejects.toMatchObject({
      message: 'Ticket id is required.',
      status: 400,
    });

    expect(mockedApiClient.delete).not.toHaveBeenCalled();
  });

  it('deleteTicket propagates ApiError on failure', async () => {
    mockedApiClient.delete.mockRejectedValue(createApiAxiosError(404, 'Ticket not found'));

    await expect(ticketService.deleteTicket(ticketDto.id)).rejects.toMatchObject({
      message: 'Ticket not found',
      status: 404,
    });
  });

  it('updateTicketStatus calls PATCH /tickets/:id/status with status payload', async () => {
    mockedApiClient.patch.mockResolvedValue(
      mockApiSuccess({
        ...ticketDto,
        status: 'In Progress',
      }),
    );

    const result = await ticketService.updateTicketStatus(ticketDto.id, 'In Progress');

    expect(mockedApiClient.patch).toHaveBeenCalledWith(`/tickets/${ticketDto.id}/status`, {
      status: 'In Progress',
    });
    expect(result.status).toBe('In Progress');
  });

  it('updateTicketStatus rejects an empty ticket id before calling the API', async () => {
    await expect(ticketService.updateTicketStatus(' ', 'Open')).rejects.toMatchObject({
      message: 'Ticket id is required.',
      status: 400,
    });

    expect(mockedApiClient.patch).not.toHaveBeenCalled();
  });

  it('updateTicketStatus rejects an invalid status before calling the API', async () => {
    await expect(
      ticketService.updateTicketStatus(ticketDto.id, 'Blocked' as never),
    ).rejects.toMatchObject({
      message: 'Status must be one of: Open, In Progress, Resolved, Closed, Cancelled.',
      status: 400,
    });

    expect(mockedApiClient.patch).not.toHaveBeenCalled();
  });

  it('updateTicketStatus propagates ApiError on failure', async () => {
    mockedApiClient.patch.mockRejectedValue(
      createApiAxiosError(400, 'Invalid status transition'),
    );

    await expect(
      ticketService.updateTicketStatus(ticketDto.id, 'Closed'),
    ).rejects.toMatchObject({
      message: 'Invalid status transition',
      status: 400,
    });
  });
});
