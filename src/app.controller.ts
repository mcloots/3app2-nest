import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { UserLoginDto } from './auth/dto/user-login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
