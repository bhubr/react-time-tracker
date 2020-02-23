import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { verify, hash } from 'argon2';
import { sign } from 'jsonwebtoken';
import { UserService } from '../user/user.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from '../user/user.entity';
import { BitBucketProfile } from '../user/bitbucket-profile.entity';
import { BitBucketProfileDto } from './dto/bitbucket-profile.dto';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(BitBucketProfile)
    private readonly bitbucketProfileRepository: Repository<BitBucketProfile>,
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

  async loginOrRegisterBitBucket(profileDto: BitBucketProfileDto) {
    const { uuid } = profileDto;
    let bitBucketProfile = await this.bitbucketProfileRepository.findOne({ where: { uuid } });

    console.log('### loginOrRegBB', bitBucketProfile, profileDto);
    let user;
    // If profile not found... create it. If no user id is provided: create user
    if (!bitBucketProfile) {
      bitBucketProfile = await this.bitbucketProfileRepository.save(profileDto);
      user = new User();
      user.name = profileDto.displayName;
      user.email = profileDto.email;
      user.bitbucket = bitBucketProfile;
      await this.connection.manager.save(user);
    } else {
      user = await this.userRepository.findOne({ where: { bitbucket: bitBucketProfile } });
    }
    const { password, ...userNoPass } = user;
    return userNoPass;
  }

  async registerUser(userRegisterDto: UserRegisterDto) {
    const { password: clearPassword, ...rest } = userRegisterDto;
    const password = await hash(clearPassword);
    const userWithPassDto: UserRegisterDto = { ...rest, password };
    return this.userRepository.save(userWithPassDto);
  }

  async generateJwt(user: User): Promise<string> {
    const expiresInJwt = process.env.DB_ENV === 'test' ? '1m' : '2d';
    const secretKey = process.env.JWT_SECRET || 'VerySecret$$2020@@';
    return await sign(user, secretKey, {
      expiresIn: expiresInJwt,
    });
  }

  getJwtCookieOptions(): CookieOptions {
    const expiresInCookie = process.env.DB_ENV === 'test' ? 60000 : 172800000;
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      expires: new Date(Date.now() + expiresInCookie),
    }
  }
}