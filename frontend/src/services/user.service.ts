import apiClient from '@/api/client';
import { type ApiSuccessResponse } from '@/types/api.types';
import { type UserApiDto } from '@/types/user-api.types';
import { type User } from '@/types/user.types';
import { getApiErrorMessage } from '@/utils/api-error.util';
import { mapUserFromApi } from '@/utils/user.mapper';

const USERS_PATH = '/users';

async function getUsers(): Promise<User[]> {
  try {
    const response = await apiClient.get<ApiSuccessResponse<UserApiDto[]>>(USERS_PATH);
    return response.data.data.map(mapUserFromApi);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

async function getUserById(id: string): Promise<User> {
  try {
    const response = await apiClient.get<ApiSuccessResponse<UserApiDto>>(`${USERS_PATH}/${id}`);
    return mapUserFromApi(response.data.data);
  } catch (error) {
    throw new Error(getApiErrorMessage(error));
  }
}

export const userService = {
  getUsers,
  getUserById,
};
