import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/createbooking.dto';
import { UpdateBookingDto } from './dto/updatebooking.dto';
import { BookingFilterDto } from './dto/bookingfilter.dto';
import { UpdateBookingStatusDto } from './dto/updatebookingstatus.dto';
import { AuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BookingDto } from './dto/booking.dto';
import { plainToInstance } from 'class-transformer';
import type { JwtPayload } from '../auth/auth.types';

@Controller('bookings')
@UseGuards(AuthGuard) // токен только из cookie, как в твоём guard
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  //Создать новую бронь от имени текущего авторизованного пользователя.
  // {
  //   "roomId": "uuid-комнаты",           // обязательно
  //   "userId": "uuid-пользователя",      // опционально, обычно НЕ передаётся, берётся из JWT
  //   "checkIn": "2026-03-10T14:00:00Z",  // обязательно, ISO строка
  //   "checkOut": "2026-03-12T12:00:00Z", // обязательно, ISO строка
  //   "totalPrice": "123.45",             // опционально, строка или число
  //   "meta": {                           // опционально
  //     "comment": "Хочу номер с видом"
  //   }
  // }
  @Post()
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateBookingDto,
  ): Promise<BookingDto> {
    const booking = await this.bookingService.createForUser(user.userId, dto);
    return plainToInstance(BookingDto, booking, {
      excludeExtraneousValues: true,
    });
  }

  @Get('my')
  async getMyBookings(
    @CurrentUser() user: JwtPayload,
    @Query() filter: BookingFilterDto,
  ): Promise<{ data: BookingDto[]; total: number }> {
    const [items, total] = await this.bookingService.findForUser(
      user.userId,
      filter,
    );
    return {
      data: plainToInstance(BookingDto, items, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }

  // :id в URL — uuid брони.
  // {
  //   "roomId": "uuid-комнаты",           // опционально
  //   "checkIn": "2026-03-11T14:00:00Z",  // опционально
  //   "checkOut": "2026-03-13T12:00:00Z", // опционально
  //   "status": "PENDING",                // опционально (но для обычного пользователя можно и не использовать)
  //   "totalPrice": "150.00",             // опционально
  //   "meta": {                           // опционально
  //     "comment": "Перенёс даты"
  //   }
  // }
  @Patch(':id')
  async updateMyBooking(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateBookingDto,
  ): Promise<BookingDto> {
    const booking = await this.bookingService.updateForUser(
      user.userId,
      id,
      dto,
    );
    return plainToInstance(BookingDto, booking, {
      excludeExtraneousValues: true,
    });
  }

  // :id в URL — uuid брони.
  // {
  //   "bookingId": "тот же uuid, что в :id",
  //   "status": "CONFIRMED" // или другой статус из BookingStatus
  // }
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateBookingStatusDto,
  ): Promise<BookingDto> {
    const booking = await this.bookingService.updateStatus(id, dto.status);
    return plainToInstance(BookingDto, booking, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  async getAll(
    @Query() filter: BookingFilterDto,
  ): Promise<{ data: BookingDto[]; total: number }> {
    const [items, total] = await this.bookingService.findAll(filter);
    return {
      data: plainToInstance(BookingDto, items, {
        excludeExtraneousValues: true,
      }),
      total,
    };
  }
}
