import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserLoginDto } from './dto/user-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email: email, password: password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}