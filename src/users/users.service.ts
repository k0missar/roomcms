import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
// import { UsersDto } from './dto/users.dto';
// import { UpdateUserDto } from './dto/updateUsers.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  // async findAll(): Promise<UsersEntity[]> {
  //   return await this.usersRepo.find();
  // }
  //
  // async create(dto: UsersDto): Promise<UsersEntity> {
  //   const user = this.usersRepo.create(dto);
  //   return await this.usersRepo.save(user);
  // }
  //
  // async userById(id: number): Promise<UsersEntity> {
  //   const user = await this.usersRepo.findOne({
  //     where: { id: id },
  //   });
  //
  //   if (!user) throw new NotFoundException('Пользователь не найден');
  //   return user;
  // }
  //
  // async update(id: number, dto: UpdateUserDto): Promise<boolean> {
  //   const user = await this.userById(id);
  //   Object.assign(user, dto);
  //   await this.usersRepo.save(user);
  //   return true;
  // }
}
