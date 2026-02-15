import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';
import { RoomEntity } from '../room/room.entity';
import { BookingEntity } from '../booking/booking.entity';
import { ReviewStatus } from '../shared/enum';

@Entity({ name: 'reviews' })
@Index('idx_reviews_room_status', ['room', 'status'])
export class ReviewsEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'PK UUID отзыва' })
  id: string;

  @ManyToOne(() => UsersEntity, (user) => user.reviews, {
    nullable: false,
    onDelete: 'SET NULL',
  })
  user: UsersEntity;

  @ManyToOne(() => RoomEntity, (room) => room.reviews, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  room: RoomEntity;

  @ManyToOne(() => BookingEntity, { nullable: true, onDelete: 'SET NULL' })
  booking?: BookingEntity | null;

  @Column({ type: 'smallint', nullable: false, comment: 'Оценка (1..5)' })
  rating: number;

  @Column({ type: 'text', nullable: true, comment: 'Текст отзыва' })
  text: string | null;

  @Column({
    type: 'enum',
    enum: ReviewStatus,
    default: ReviewStatus.PENDING,
    comment: 'Статус для модерации',
  })
  status: ReviewStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
