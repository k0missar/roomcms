import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
// import { UsersDto } from './dto/users.dto';
// import { UpdateUserDto } from './dto/updateUsers.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }
  // @Get(':id')
  // userById(@Param('id') id: string) {
  //   return this.usersService.userById(Number(id));
  // }
  // @Post()
  // create(@Body() dto: UsersDto) {
  //   return this.usersService.create(dto);
  // }
  //
  // @Put(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
  //   return this.usersService.update(Number(id), dto);
  // }
}
