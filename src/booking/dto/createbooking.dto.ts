import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  roomId: string;

  // Если пользователь передаёт userId (например админ) — допускается, иначе брать из context
  @IsUUID()
  @IsOptional()
  userId?: string;

  // ISO8601 строка с датой/временем
  @IsDateString()
  @IsNotEmpty()
  checkIn: string;

  @IsDateString()
  @IsNotEmpty()
  checkOut: string;

  // Итоговая сумма. Храним в виде строки (Postgres numeric). Можно прислать "123.45" или число 123.45
  @IsOptional()
  @IsNumberString()
  @Transform(
    (params: TransformFnParams) => {
      const value: unknown = params.value;

      if (value === undefined || value === null) {
        return value;
      }

      if (typeof value === 'number') {
        return String(value);
      }

      if (typeof value === 'string') {
        return value;
      }

      // В остальных случаях возвращаем undefined — безопасный вариант для валидатора
      return undefined;
    },
    { toClassOnly: true },
  )
  totalPrice?: string;

  // Произвольные метаданные (payment, promocode и т.п.)
  @IsOptional()
  meta?: Record<string, any>;
}
