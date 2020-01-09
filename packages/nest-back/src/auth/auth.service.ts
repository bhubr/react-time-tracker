import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { verify, hash } from 'argon2';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.userService.findOne(email);
    if (user && await verify(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async registerUser(userRegisterDto: UserRegisterDto) {
    const { password: clearPassword, ...rest } = userRegisterDto;
    const password = await hash(clearPassword);
    const userWithPassDto: UserRegisterDto = { ...rest, password };
    return this.userRepository.save(userWithPassDto);
  }
}