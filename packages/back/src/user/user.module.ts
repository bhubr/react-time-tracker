import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { BitBucketProfile } from './bitbucket-profile.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([BitBucketProfile])
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
