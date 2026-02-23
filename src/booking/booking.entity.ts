import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { RoomEntity } from '../room/room.entity';
import { BookingStatus } from '../shared/enum';

@Entity({ name: 'bookings' })
@Index('idx_bookings_room_dates', ['room', 'checkIn', 'checkOut'])
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'PK UUID бронирования' })
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UsersEntity, (user) => user.bookings, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UsersEntity;

  @ManyToOne(() => RoomEntity, (room) => room.bookings, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  room: RoomEntity;

  @Column({
    name: 'check_in',
    type: 'timestamptz',
    nullable: false,
    comment: 'Дата/время заезда',
  })
  checkIn: Date;

  @Column({
    name: 'check_out',
    type: 'timestamptz',
    nullable: false,
    comment: 'Дата/время выезда',
  })
  checkOut: Date;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.PENDING,
    comment: 'Статус брони',
  })
  status: BookingStatus;

  @Column({
    name: 'total_price',
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    comment: 'Итоговая сумма',
  })
  totalPrice: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Доп. метаданные брони (payment, promocode и т.д.)',
  })
  meta: Record<string, any> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
