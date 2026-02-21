import { IsString, IsEmail, IsEnum } from 'class-validator';
import { UserRole } from '../../shared/enum';

export class AuthUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsEnum({
    enum: UserRole,
  })
  role: string;
}
