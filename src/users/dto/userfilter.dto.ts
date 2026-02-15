import { IsOptional, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../../shared/enum';
import { PaginationDto } from '../../shared/dto/pagination.dto';

export class UserFilterDto extends PaginationDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
