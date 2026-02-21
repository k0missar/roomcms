import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
//import { AuthUserDto } from './dto/authuser.dto';
//import { UserDto } from '../users/dto/user.dto';
//import { UserRole } from '../shared/enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, email: email };

    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
