import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/entities/game.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 33060, //3306 is default
      username: 'homestead',
      password: 'secret',
      database: 'NestJS',
      entities: [Game],
      synchronize: false,
    }),
    GamesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
