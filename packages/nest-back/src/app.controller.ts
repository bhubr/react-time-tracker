import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  // @Get('*')
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {console.log(req.body)
    return req.user;
  }
}
