import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { BitBucketProfile } from './bitbucket-profile.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80, unique: true })
  email: string;

  @Column({ length: 95, nullable: true })
  password: string;

  @Column({ length: 120 })
  name: string;

  @OneToOne(type => BitBucketProfile, profile => profile.user, {
    eager: true
  })
  @JoinColumn()
  bitbucket: BitBucketProfile;
}