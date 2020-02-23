import { Controller, Get, Request, Response, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { SetCookies, CookieOptions } from '@nestjsplus/cookies';
import { AuthService } from './auth/auth.service';
import { CookieOptions } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  // @SetCookies({ httpOnly: true })
  @Post('auth/login')
  async login(@Request() req) {
    const jwt: string = await this.authService.generateJwt(req.user);
    const cookieOptions: CookieOptions = this.authService.getJwtCookieOptions();
    req.res.cookie('jwt', jwt, cookieOptions);
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('bitbucket'))
  @Post('oauth/code/bitbucket')
  async bitbucketOAuth(@Request() req) {
    const jwt: string = await this.authService.generateJwt(req.user);
    const cookieOptions: CookieOptions = this.authService.getJwtCookieOptions();
    req.res.cookie('jwt', jwt, cookieOptions);
    return req.user;
  }
}
