import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class BitBucketProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 38, unique: true })
  uuid: string;

  @Column({ length: 43, unique: true })
  accountId: string;

  @Column({ length: 120 })
  displayName: string;

  @Column({ length: 120 })
  username: string;

  @Column({ length: 120 })
  email: string;

  @Column({ length: 300 })
  avatarUrl: string;

  @OneToOne(type => User, user => user.bitbucket)
  user: BitBucketProfile;
}