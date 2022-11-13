import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth/auth.service';
import { UserLoginDto } from './auth/dto/user-login.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.validateUser(userLoginDto);
  }

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);
  // }
  
}
