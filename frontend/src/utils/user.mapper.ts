import { type UserApiDto } from '@/types/user-api.types';
import { type User } from '@/types/user.types';

/**
 * Maps backend user DTOs into frontend User models.
 */
export function mapUserFromApi(dto: UserApiDto): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    role: dto.role,
    // Backend does not expose account status; default to Active for UI compatibility.
    status: 'Active',
    createdAt: dto.createdAt,
  };
}
