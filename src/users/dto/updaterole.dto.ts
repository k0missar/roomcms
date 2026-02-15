import { IsEnum, IsUUID } from 'class-validator';
import { UserRole } from '../../shared/enum';

export class UpdateRoleDto {
  @IsUUID()
  userId: string;

  @IsEnum(UserRole)
  role: UserRole;
}
