import { Injectable } from '@nestjs/common';
import { verify } from 'argon2';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    console.log(email, pass);
    const user = await this.userService.findOne(email);
    if (user && await verify(user.password, pass)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}