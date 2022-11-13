import { Controller, Post, Body } from "@nestjs/common";
import { UserRegisterDto } from "src/auth/dto/user-register.dto";
import { UsersService } from "./users/users.service";
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(userRegisterDto.password, saltOrRounds);
    userRegisterDto.password = hashedPassword;
    return this.usersService.register(userRegisterDto);
  }
}