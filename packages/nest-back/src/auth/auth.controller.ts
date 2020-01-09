import { Controller, Get, Request, Body, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { OAuthCodeDto } from './dto/oauth-code.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @Post('code')
  async oauthCode(@Body() oauthCodeDto: OAuthCodeDto) {
    return oauthCodeDto;
  }

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.registerUser(userRegisterDto);
  }

  @Get('logout')
  async logout(@Request() req) {
    req.res.clearCookie('jwt');
    return { ok: true };
  }
}
