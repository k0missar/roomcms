import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nick: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  phone: string;
  @Column()
  role: string;
  @Column()
  is_active: boolean;
  @CreateDateColumn()
  created_at: string;
  @UpdateDateColumn()
  updated_at: string;
}
