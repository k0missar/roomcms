import { IsString, IsNotEmpty, Length } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 128)
  newPassword: string;
}
