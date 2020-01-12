import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import { sign } from 'jsonwebtoken';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import '../src/env';
import { AppModule } from './../src/app.module';
import { User } from '../src/user/user.entity';
import { BitBucketProfile } from '../src/user/bitbucket-profile.entity';
import { Project } from '../src/project/project.entity';
import { Task } from '../src/task/task.entity';
import { Timebox } from '../src/timebox/timebox.entity';
import { Workspace } from '../src/project/workspace.entity';
import settings from '../src/settings';
import supertest = require('supertest');

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

export interface AppCo {
  _app: INestApplication;
  _connection: Connection;
}

export async function setup(): Promise<AppCo> {
  {
    const connection: Connection = await createConnection({
      ...settings.database,
      name: 'testconn',
      entities: [User, BitBucketProfile, Workspace, Project, Task, Timebox]
    });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    const app: INestApplication = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();

    return { _connection: connection, _app: app };
  }
}

export async function truncateTables(connection: Connection) {
  await connection.query('SET FOREIGN_KEY_CHECKS=0;');
  await connection.query('TRUNCATE TABLE timebox');
  await connection.query('TRUNCATE TABLE task');
  await connection.query('TRUNCATE TABLE user');
  await connection.query('TRUNCATE TABLE bit_bucket_profile');
  await connection.query('TRUNCATE TABLE workspace');
  await connection.query('TRUNCATE TABLE project');
  await connection.query('SET FOREIGN_KEY_CHECKS=1;');
}

// export async function authRequest(app: INestApplication, conn: Connection, method: string, url: string, data?: any): supertest.S {
//   const user = await genUser(conn);
//   const jwt = await genCookie(user);
//   const res = request(app.getHttpServer())[method](url)
//   .set('Cookie', [`jwt=${jwt}`]);
//   if (data) {
//     res.send(data);
//   }
//   return res;
// }