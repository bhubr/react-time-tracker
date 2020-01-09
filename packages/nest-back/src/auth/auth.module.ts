import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { BitBucketStrategy } from './bitbucket.strategy';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { BitBucketProfile } from 'src/user/bitbucket-profile.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([BitBucketProfile]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      // signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, BitBucketStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
