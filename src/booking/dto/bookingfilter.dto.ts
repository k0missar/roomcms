import { IsOptional, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { BookingStatus } from '../../shared/enum';
import { PaginationDto } from './pagination.dto';
//import { Type } from 'class-transformer';

export class BookingFilterDto extends PaginationDto {
  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsUUID()
  roomId?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsDateString()
  dateFrom?: string; // фильтр: check_in >= dateFrom или checkOut >= dateFrom

  @IsOptional()
  @IsDateString()
  dateTo?: string; // фильтр: checkIn <= dateTo или т.д.
}
