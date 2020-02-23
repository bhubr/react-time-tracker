import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, DeleteResult, EntityManager } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private readonly users: User[];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findOne(email: string): Promise<User | undefined> {
    console.log(email);
    console.log(await this.userRepository.findOne({ where: { email } }));
    return this.userRepository.findOne({ where: { email } });
  }
}