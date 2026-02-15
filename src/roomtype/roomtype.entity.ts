import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RoomEntity } from '../room/room.entity';

@Entity({ name: 'room_types' })
export class RoomTypeEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'PK UUID типа номера' })
  id: string;

  @Column({
    type: 'varchar',
    length: 120,
    nullable: false,
    comment: 'Название типа номера (Single, Double)',
  })
  name: string;

  @Column({
    type: 'int',
    nullable: false,
    default: 1,
    comment: 'Вместимость (количество гостей)',
  })
  capacity: number;

  @Column({ type: 'text', nullable: true, comment: 'Описание типа номера' })
  description: string | null;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Доп. метаданные (например политики, defaultPrice)',
  })
  meta: Record<string, any> | null;

  @OneToMany(() => RoomEntity, (room) => room.type)
  rooms: RoomEntity[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}
