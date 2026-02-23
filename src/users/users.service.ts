import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UserDto } from './dto/user.dto';
import { GetUserDto } from './dto/getuser.dto';
import { UserDataDto } from './dto/userdata.dto';
// import { UpdateUserDto } from './dto/updateUsers.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepo: Repository<UsersEntity>,
  ) {}

  async findOne(email: string): Promise<UserDto | null> {
    return this.usersRepo.findOne({ where: { email } });
  }

  async getUserData(email: string): Promise<UserDataDto | null> {
    return this.findOne(email);
  }

  async create(userDto: UserDto): Promise<UsersEntity> {
    return this.usersRepo.save(userDto);
  }

  async findAll(): Promise<GetUserDto[]> {
    const users = await this.usersRepo.find();
    return users.map(({ password, ...rest }) => rest);
  }

  async userById(id: string): Promise<GetUserDto> {
    const users = await this.usersRepo.findOne({
      where: { id },
    });

    if (!users) {
      throw new NotFoundException('Пользователь не найден');
    }

    const { password, ...user } = users;
    return user;
  }
}
