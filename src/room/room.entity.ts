import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { RoomTypeEntity } from '../roomtype/roomtype.entity';
import { BookingEntity } from '../booking/booking.entity';
import { ReviewsEntity } from '../reviews/reviews.entity';
import { RoomStatus } from '../shared/enum';

@Entity({ name: 'rooms' })
@Index('idx_rooms_number', ['number'], { unique: true })
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'PK UUID комнаты' })
  id: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    comment: 'Номер/идентификатор комнаты',
  })
  number: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
    comment: 'Короткий заголовок комнаты',
  })
  title: string | null;

  @Column({ type: 'text', nullable: true, comment: 'Полное описание комнаты' })
  description: string | null;

  @ManyToOne(() => RoomTypeEntity, (type) => type.rooms, {
    nullable: false,
    onDelete: 'RESTRICT',
  })
  type: RoomTypeEntity;

  @Column({ type: 'int', nullable: true, comment: 'Этаж' })
  floor: number | null;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
    comment: 'Базовая цена за ночь',
  })
  price: string;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    comment: 'Список удобств/amenities (text[])',
  })
  amenities: string[] | null;

  @Column({
    type: 'text',
    array: true,
    nullable: true,
    comment: 'Список URL/путей к изображениям (text[])',
  })
  images: string[] | null;

  @Column({
    type: 'enum',
    enum: RoomStatus,
    default: RoomStatus.AVAILABLE,
    comment: 'Статус комнаты',
  })
  status: RoomStatus;

  @OneToMany(() => BookingEntity, (booking) => booking.room)
  bookings: BookingEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.room)
  reviews: ReviewsEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
