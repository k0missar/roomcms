import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';
import { UserDto } from './dto/user.dto';
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
}
