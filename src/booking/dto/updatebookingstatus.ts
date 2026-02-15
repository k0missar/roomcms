import { IsUUID, IsNotEmpty, IsEnum } from 'class-validator';
import { BookingStatus } from '../../shared/enum';

export class UpdateBookingStatusDto {
  @IsUUID()
  @IsNotEmpty()
  bookingId: string;

  @IsEnum(BookingStatus)
  @IsNotEmpty()
  status: BookingStatus;
}
