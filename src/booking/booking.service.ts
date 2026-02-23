import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { RoomEntity } from '../room/room.entity';
import { UsersEntity } from '../users/users.entity';
import { CreateBookingDto } from './dto/createbooking.dto';
import { UpdateBookingDto } from './dto/updatebooking.dto';
import { BookingFilterDto } from './dto/bookingfilter.dto';
import { BookingStatus } from '../shared/enum';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    @InjectRepository(RoomEntity)
    private readonly roomRepo: Repository<RoomEntity>,
    @InjectRepository(UsersEntity)
    private readonly userRepo: Repository<UsersEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
  ) {}

  /**
   * Создание бронирования для текущего пользователя
   */
  async createForUser(
    currentUserId: string,
    dto: CreateBookingDto,
  ): Promise<BookingEntity> {
    // finalUserId – либо тот, что в JWT, либо (если ты позже разрешишь) из dto.userId для админа
    const finalUserId = dto.userId ?? currentUserId;

    const user = await this.userRepo.findOne({ where: { id: finalUserId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const room = await this.roomRepo.findOne({ where: { id: dto.roomId } });
    if (!room) {
      throw new NotFoundException('Room not found');
    }

    const checkIn = new Date(dto.checkIn);
    const checkOut = new Date(dto.checkOut);

    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
      throw new BadRequestException('Invalid dates');
    }

    if (checkOut <= checkIn) {
      throw new BadRequestException('checkOut must be after checkIn');
    }

    // Пример: нельзя бронировать в прошлом
    const now = new Date();
    if (checkOut <= now) {
      throw new BadRequestException('Нельзя бронировать в прошлом');
    }

    // Проверяем, нет ли пересечения бронирований по этой комнате
    const hasOverlap = await this.hasRoomOverlap(room.id, checkIn, checkOut);
    if (hasOverlap) {
      throw new BadRequestException('Room is already booked for this period');
    }

    const booking = this.bookingRepo.create({
      user,
      room,
      checkIn,
      checkOut,
      totalPrice: dto.totalPrice ?? '0',
      meta: dto.meta ?? null,
      status: BookingStatus.CONFIRMED,
    });

    return this.bookingRepo.save(booking);
  }

  /**
   * Список бронирований с фильтрами (для админа/менеджера)
   */
  async findAll(filter: BookingFilterDto): Promise<[BookingEntity[], number]> {
    const {
      page = 1,
      limit = 10,
      userId,
      roomId,
      status,
      dateFrom,
      dateTo,
    } = filter;

    const qb = this.bookingRepo
      .createQueryBuilder('b')
      .leftJoinAndSelect('b.user', 'user')
      .leftJoinAndSelect('b.room', 'room')
      .orderBy('b.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (userId) qb.andWhere('user.id = :userId', { userId });
    if (roomId) qb.andWhere('room.id = :roomId', { roomId });
    if (status) qb.andWhere('b.status = :status', { status });

    if (dateFrom) {
      qb.andWhere('(b.checkIn >= :dateFrom OR b.checkOut >= :dateFrom)', {
        dateFrom,
      });
    }
    if (dateTo) {
      qb.andWhere('(b.checkIn <= :dateTo OR b.checkOut <= :dateTo)', {
        dateTo,
      });
    }

    return qb.getManyAndCount();
  }

  /**
   * Мои брони (просто findAll с подставленным userId)
   */
  async findForUser(
    userId: string,
    filter: BookingFilterDto,
  ): Promise<[BookingEntity[], number]> {
    return this.findAll({ ...filter, userId });
  }

  /**
   * Обновление брони текущим пользователем
   */
  async updateForUser(
    currentUserId: string,
    bookingId: string,
    dto: UpdateBookingDto,
  ): Promise<BookingEntity> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
      relations: ['user', 'room'],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.user.id !== currentUserId) {
      throw new ForbiddenException('You can update only your bookings');
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new BadRequestException('Only PENDING bookings can be updated');
    }

    // Обновляем поля
    if (dto.checkIn) {
      booking.checkIn = new Date(dto.checkIn);
    }
    if (dto.checkOut) {
      booking.checkOut = new Date(dto.checkOut);
    }
    if (dto.roomId) {
      const room = await this.roomRepo.findOne({ where: { id: dto.roomId } });
      if (!room) {
        throw new NotFoundException('Room not found');
      }
      booking.room = room;
    }
    if (dto.totalPrice !== undefined) {
      booking.totalPrice = dto.totalPrice;
    }
    if (dto.meta !== undefined) {
      booking.meta = dto.meta;
    }
    if (dto.status !== undefined) {
      booking.status = dto.status;
    }

    // Проверка дат, если их меняли
    if (dto.checkIn || dto.checkOut || dto.roomId) {
      if (booking.checkOut <= booking.checkIn) {
        throw new BadRequestException('checkOut must be after checkIn');
      }

      const hasOverlap = await this.hasRoomOverlap(
        booking.room.id,
        booking.checkIn,
        booking.checkOut,
        booking.id, // исключаем текущую бронь
      );
      if (hasOverlap) {
        throw new BadRequestException('Room is already booked for this period');
      }
    }

    return this.bookingRepo.save(booking);
  }

  /**
   * Смена статуса (обычно для админа/менеджера, роли можно добавить отдельно)
   */
  async updateStatus(
    bookingId: string,
    status: BookingStatus,
  ): Promise<BookingEntity> {
    const booking = await this.bookingRepo.findOne({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    booking.status = status;
    return this.bookingRepo.save(booking);
  }

  /**
   * Проверка пересечения бронирований по комнате и интервалу дат.
   * excludeBookingId – чтобы не считать пересечение с самой собой при обновлении.
   */
  private async hasRoomOverlap(
    roomId: string,
    checkIn: Date,
    checkOut: Date,
    excludeBookingId?: string,
  ): Promise<boolean> {
    const qb = this.bookingRepo
      .createQueryBuilder('b')
      .innerJoin('b.room', 'room')
      .where('room.id = :roomId', { roomId })
      .andWhere('b.status IN (:...statuses)', {
        statuses: [BookingStatus.PENDING, BookingStatus.CONFIRMED],
      })
      // условие пересечения интервалов:
      // (existing.checkIn < new.checkOut) AND (existing.checkOut > new.checkIn)
      .andWhere('b.checkIn < :newCheckOut AND b.checkOut > :newCheckIn', {
        newCheckIn: checkIn.toISOString(),
        newCheckOut: checkOut.toISOString(),
      });

    if (excludeBookingId) {
      qb.andWhere('b.id != :excludeId', { excludeId: excludeBookingId });
    }

    const count = await qb.getCount();
    return count > 0;
  }

  /**
   * Удалить бронь, принадлежащую конкретному пользователю.
   * @param userId - id пользователя из JWT (current user)
   * @param bookingId - id брони
   */
  async deleteForUser(
    userId: string,
    bookingId: string,
  ): Promise<{ success: true }> {
    const booking = await this.bookingRepository.findOne({
      where: { id: bookingId, userId },
    });

    if (!booking) {
      throw new NotFoundException('Бронь не найдена');
    }

    await this.bookingRepository.remove(booking);

    return { success: true };
  }
}
