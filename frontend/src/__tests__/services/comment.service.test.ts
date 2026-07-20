import { beforeEach, describe, expect, it, vi } from 'vitest';

import apiClient from '@/api/client';
import { commentService } from '@/services/comment.service';
import { type CommentApiDto } from '@/types/comment-api.types';
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

const ticketId = '507f1f77bcf86cd799439011';

const commentDto: CommentApiDto = {
  id: '507f1f77bcf86cd799439031',
  ticketId,
  message: 'Investigating the issue now.',
  createdBy: '507f1f77bcf86cd799439013',
  createdAt: '2026-01-03T00:00:00.000Z',
};

describe('commentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getComments calls GET /tickets/:id/comments and returns mapped comments', async () => {
    mockedApiClient.get.mockResolvedValue(mockApiSuccess([commentDto]));

    const result = await commentService.getComments(ticketId);

    expect(mockedApiClient.get).toHaveBeenCalledWith(`/tickets/${ticketId}/comments`);
    expect(result).toEqual([
      {
        id: commentDto.id,
        ticketId: commentDto.ticketId,
        message: commentDto.message,
        createdBy: commentDto.createdBy,
        createdAt: commentDto.createdAt,
      },
    ]);
  });

  it('getComments propagates ApiError on failure', async () => {
    mockedApiClient.get.mockRejectedValue(createApiAxiosError(404, 'Ticket not found'));

    await expect(commentService.getComments(ticketId)).rejects.toEqual(
      expect.objectContaining({
        name: 'ApiError',
        message: 'Ticket not found',
        status: 404,
      }),
    );
  });

  it('createComment calls POST /tickets/:id/comments with the request payload', async () => {
    mockedApiClient.post.mockResolvedValue(mockApiSuccess(commentDto));

    const payload = {
      message: 'Investigating the issue now.',
      createdBy: commentDto.createdBy,
    };

    const result = await commentService.createComment(ticketId, payload);

    expect(mockedApiClient.post).toHaveBeenCalledWith(
      `/tickets/${ticketId}/comments`,
      payload,
    );
    expect(result).toEqual({
      id: commentDto.id,
      ticketId: commentDto.ticketId,
      message: commentDto.message,
      createdBy: commentDto.createdBy,
      createdAt: commentDto.createdAt,
    });
  });

  it('createComment propagates ApiError on failure', async () => {
    mockedApiClient.post.mockRejectedValue(createApiAxiosError(400, 'Validation failed'));

    await expect(
      commentService.createComment(ticketId, {
        message: 'Hello',
        createdBy: commentDto.createdBy,
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
