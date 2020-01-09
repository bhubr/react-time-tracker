import { Strategy } from 'passport-bitbucket-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class BitBucketStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.BITBUCKET_OAUTH_ID,
      clientSecret: process.env.BITBUCKET_OAUTH_SECRET,
      callbackURL: process.env.BITBUCKET_OAUTH_CB_URL
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any): Promise<any> {
    console.log('access', accessToken);
    console.log('refresh', refreshToken);
    console.log('profile', profile);
    // const user = await this.authService.validateUser(username, pass);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return profile;
  }
}