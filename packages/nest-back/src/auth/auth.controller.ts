// import { Controller } from '@nestjs/common';

// @Controller('auth')
// export class AuthController {}

import { Controller, Get, Request, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  // @Get('*')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.registerUser(userRegisterDto);
  }
}
