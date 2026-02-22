import { Expose } from 'class-transformer';
import { UserRole } from '../../shared/enum';

/**
 * DTO для ответов API — публичное представление пользователя.
 */
export class UserDataDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  contact?: Record<string, any> | null;

  @Expose()
  avatarUrl?: string | null;

  @Expose()
  meta?: Record<string, any> | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
