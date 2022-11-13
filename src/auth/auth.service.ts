import { HttpException, HttpStatus, Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users/users.service';
import { UserAuthenticatedDto } from './dto/user-authenticated.dto';
import { UserLoginDto } from './dto/user-login.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(userLoginDto: UserLoginDto): Promise<any> {
    const user = await this.usersService.findOne(userLoginDto);
    if (!user) return null;
    const passwordValid = await bcrypt.compare(userLoginDto.password, user.password)

    if (!user) {
      throw new NotAcceptableException('Could not find the user');
    }
    if (user && passwordValid) {
      return user;
    }
    return null;

    // if (user != null) {
    //   const payload = { email: user.email, sub: user.id };
    //   const access_token = this.jwtService.sign(payload);
    //   let auth_user : UserAuthenticatedDto = {
    //     id: user.id,
    //     email: user.email,
    //     access_token: access_token
    //   }
    //   return auth_user;
    // }
    // throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
        access_token: this.jwtService.sign(payload),
    };
}
}