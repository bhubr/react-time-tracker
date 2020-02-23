import { Strategy } from 'passport-bitbucket-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { BitBucketProfileDto } from './dto/bitbucket-profile.dto';

@Injectable()
export class BitBucketStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.BITBUCKET_OAUTH_ID,
      clientSecret: process.env.BITBUCKET_OAUTH_SECRET,
      callbackURL: process.env.BITBUCKET_OAUTH_CB_URL
    });
  }

  async validate(accessToken: string, refreshToken: string, rawProfile: any): Promise<any> {
    console.log('access', accessToken);
    console.log('refresh', refreshToken);
    console.log('\n\n', rawProfile, typeof rawProfile);
    const {
      id: uuid,
      username,
      displayName,
      _json: {
        account_id: accountId,
        links: {
          avatar: { href: avatarUrl }
        }
      },
      emails
    } = rawProfile;
    const emailObj = emails.find(({ primary, verified }) => primary && verified);
    const email = emailObj && emailObj.value;
    const profileData: BitBucketProfileDto = { uuid, accountId, displayName, username, avatarUrl, email };
    const user = await this.authService.loginOrRegisterBitBucket(profileData);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    return { ...user, accessToken, refreshToken };
  }
}