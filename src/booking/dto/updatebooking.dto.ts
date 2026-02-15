import {
  IsUUID,
  IsOptional,
  IsDateString,
  IsEnum,
  IsNumberString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { BookingStatus } from '../../shared/enum';

export class UpdateBookingDto {
  @IsUUID()
  @IsOptional()
  roomId?: string;

  @IsDateString()
  @IsOptional()
  checkIn?: string;

  @IsDateString()
  @IsOptional()
  checkOut?: string;

  @IsEnum(BookingStatus)
  @IsOptional()
  status?: BookingStatus;

  @IsOptional()
  @IsNumberString()
  @Transform(
    (params: TransformFnParams) => {
      const value: unknown = params.value;

      // Если значение undefined/null — возвращаем как есть (ValidationPipe/validators разберутся)
      if (value === undefined || value === null) return value;

      // Если число — приводим к строке
      if (typeof value === 'number') return String(value);

      // Если уже строка — возвращаем её
      if (typeof value === 'string') return value;

      // Во всех остальных случаях возвращаем undefined — это безопасно и убирает any
      return undefined;
    },
    { toClassOnly: true },
  )
  totalPrice?: string;

  @IsOptional()
  meta?: Record<string, any>;
}
