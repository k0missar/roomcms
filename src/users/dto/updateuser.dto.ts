import {
  IsOptional,
  IsString,
  Length,
  IsEmail,
  IsUrl,
  IsObject,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../shared/enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(1, 20)
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  // Не используйте это для смены пароля — есть отдельный DTO/change password flow
  @IsOptional()
  @IsString()
  @Length(6, 128)
  password?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsObject()
  contact?: Record<string, any> | null;

  @IsOptional()
  @IsUrl()
  avatarUrl?: string | null;

  @IsOptional()
  @IsObject()
  meta?: Record<string, any> | null;
}
