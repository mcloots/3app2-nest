import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/users/user.module';
import { UsersService } from 'src/users/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.auth';

@Module({
  imports: [UserModule, PassportModule,
  JwtModule.registerAsync({
    useFactory: (config: ConfigService) => {
      return {
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRATION_TIME')
        }
      }
    },
    inject: [ConfigService]
  }), TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
