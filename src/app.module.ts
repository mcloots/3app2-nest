import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './games/entities/game.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';
import { User } from './auth/entities/user.entity';
import { getEnvPath } from './common/helper/env.helper';
import { MySqlConfigService } from './typeorm/mysql-config.service';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: MySqlConfigService,
      inject: [MySqlConfigService]
    }),
    GamesModule,
    UserModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
