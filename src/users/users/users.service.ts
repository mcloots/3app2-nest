import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLoginDto } from 'src/auth/dto/user-login.dto';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository:
    Repository<User>) {
  }

  async findOne(userLoginDto: UserLoginDto): Promise<User> {
    return this.userRepository.findOneBy({
      email: userLoginDto.email,
      password:userLoginDto.password
    });
  }
}