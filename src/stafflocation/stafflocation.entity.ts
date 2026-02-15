import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { UsersEntity } from '../users/users.entity';

@Entity({ name: 'staff_locations' })
@Index('idx_staff_locations_staff_timestamp', ['staff', 'timestamp'])
export class StaffLocationEntity {
  @PrimaryGeneratedColumn('uuid', { comment: 'PK UUID локации сотрудника' })
  id: string;

  @ManyToOne(() => UsersEntity, (user) => user.staffLocations, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  staff: UsersEntity;

  // Можно сохранять как json { x: number, y: number } или как отдельные колонки
  @Column({
    type: 'jsonb',
    nullable: false,
    comment: 'Координаты на карте: {x, y} или {lat, lng}',
  })
  coords: { x: number; y: number } | Record<string, any>;

  @Column({ type: 'int', nullable: true, comment: 'Этаж/уровень' })
  floor: number | null;

  @Column({
    type: 'jsonb',
    nullable: true,
    comment: 'Доп. мета (скорость, направление и т.д.)',
  })
  meta: Record<string, any> | null;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'now()',
    comment: 'Время позиции',
  })
  timestamp: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
}
