import { IsString, Length } from 'class-validator';

export class UsersDto {
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(2, 30, { message: 'Nick должен быть длиной от 2 до 30 символов' })
  nick: string;
  @IsString()
  email: string;
  @IsString()
  password: string;
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  phone: string;
  @IsString()
  role: string;
  @IsString()
  is_active: boolean;
}
