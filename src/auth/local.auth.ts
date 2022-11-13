import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //this is the method which the Passport middleware will call to verify 
  //the user using an appropriate strategy-specific set of parameters
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({ email: email, password: password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}