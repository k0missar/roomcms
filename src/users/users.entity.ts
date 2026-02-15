import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { BookingEntity } from '../booking/booking.entity';
import { ReviewsEntity } from '../reviews/reviews.entity';
import { StaffLocationEntity } from '../stafflocation/stafflocation.entity';
import { UserRole } from '../shared/enum';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
    comment: 'PK UUID пользователя',
  })
  id: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    comment: 'Имя фамилия пльзователя',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 180,
    nullable: false,
    unique: true,
    comment: 'Email (уникальный)',
  })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CLIENT,
    comment: 'Роль пльзователя',
  })
  role: UserRole;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: 'Хэш пароля bcrypt',
  })
  password: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Контактная информация',
  })
  contact: Record<string, any> | null;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: 'URL аватара',
  })
  avatarUrl: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Произвольные пользовательские данные',
  })
  meta: Record<string, any> | null;

  @OneToMany(() => BookingEntity, (booking) => booking.user)
  bookings: BookingEntity[];

  @OneToMany(() => ReviewsEntity, (review) => review.user)
  reviews: ReviewsEntity[];

  @OneToMany(() => StaffLocationEntity, (loc) => loc.staff)
  staffLocations: StaffLocationEntity[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    comment: 'Дата создания',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    comment: 'Дата обновления',
  })
  updatedAt: Date;
}
