import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsEnum, IsUrl, IsObject } from 'class-validator';
import { UserRole } from '../../shared/enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 20)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  // raw password — будет хэшироваться в сервисе
  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole = UserRole.CLIENT;

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
