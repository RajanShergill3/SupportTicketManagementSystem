import apiClient from '@/api/client';
import { type ApiSuccessResponse } from '@/types/api.types';
import { type CommentApiDto } from '@/types/comment-api.types';
import { type Comment, type CreateCommentInput } from '@/types/comment.types';
import { ApiError, getApiErrorMessage, getApiErrorStatus } from '@/utils/api-error.util';
import { mapCommentFromApi } from '@/utils/comment.mapper';

const commentsPath = (ticketId: string): string => `/tickets/${ticketId}/comments`;

async function getComments(ticketId: string): Promise<Comment[]> {
  try {
    const response = await apiClient.get<ApiSuccessResponse<CommentApiDto[]>>(commentsPath(ticketId));
    return response.data.data.map(mapCommentFromApi);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

async function createComment(ticketId: string, payload: CreateCommentInput): Promise<Comment> {
  try {
    const response = await apiClient.post<ApiSuccessResponse<CommentApiDto>>(
      commentsPath(ticketId),
      payload,
    );
    return mapCommentFromApi(response.data.data);
  } catch (error) {
    throw new ApiError(getApiErrorMessage(error), getApiErrorStatus(error));
  }
}

export const commentService = {
  getComments,
  createComment,
};
