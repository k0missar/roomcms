import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { GetUserDto } from './dto/getuser.dto';
// import { UpdateUserDto } from './dto/updateUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<GetUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.usersService.findOne(email);
  }

  @Get('id/:id')
  userById(@Param('id') id: string) {
    return this.usersService.userById(id);
  }

  @Post()
  create(@Body() dto: UserDto) {
    return this.usersService.create(dto);
  }
}
