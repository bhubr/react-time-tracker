import { Connection } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { User } from '../src/user/user.entity';
import '../src/env';
// import settings from '../src/settings';

export function genUser(connection: Connection): Promise<User> {
  const user = new User();
  user.email = 'johndoe@foobar.com';
  user.name = 'John Doe';
  return connection.manager.save(user);
}

export async function genCookie(userWithPass: User): Promise<string> {
  const { password, ...user } = userWithPass;
  const jwt = await sign(user, process.env.JWT_SECRET, {
    expiresIn: '1m',
  });
  return jwt;
}