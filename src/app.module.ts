import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/entities/game.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './auth/entities/user.entity';
import { AuthService } from './auth/auth/auth.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33060, //3306 is default
      username: 'homestead',
      password: 'secret',
      database: 'NestJS',
      entities: [Game, User],
      synchronize: false,
    }),
    GamesModule,
    AuthModule,
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
