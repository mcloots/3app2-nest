import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users/users.service';
import { AuthService } from './auth/auth.service';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '604800s'}
  })],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
