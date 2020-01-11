import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import * as request from 'supertest';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './../src/app.module';
import { User } from '../src/user/user.entity';
import { BitBucketProfile } from '../src/user/bitbucket-profile.entity';
import settings from '../src/settings';
import  { genCookie, genUser } from './utils';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({ ...settings.database, name: 'testconn', entities: [User, BitBucketProfile] });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    await app.init();
  });

  beforeEach(async () => {
    await connection.query('SET FOREIGN_KEY_CHECKS=0;');
    await connection.query('TRUNCATE TABLE timebox');
    await connection.query('TRUNCATE TABLE task');
    await connection.query('TRUNCATE TABLE user');
    await connection.query('TRUNCATE TABLE bit_bucket_profile');
    await connection.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  it('GET /api/tasks FAIL (No auth)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/tasks')
      .expect(401);
    expect(res.body).toMatchSnapshot();
  });

  it('GET /api/tasks SUCCESS', async () => {
    const user = await genUser(connection);
    const jwt = await genCookie(user);
    const res = await request(app.getHttpServer())
      .get('/api/tasks')
      .set('Cookie', [`jwt=${jwt}`])
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('POST /api/tasks SUCCESS', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Task #1' })
      .expect(201);
    expect(res.body).toMatchSnapshot();
  });

  it('PUT /api/tasks/:id SUCCESS', async () => {
    const { insertId: taskId } = await connection.query('INSERT INTO task (title, done) VALUES("Task #2", false)');
    const res = await request(app.getHttpServer())
      .put(`/api/tasks/${taskId}`)
      .send({ title: 'Updated task #2', done: true })
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('GET /api/tasks/:id SUCCESS', async () => {
    const { insertId: taskId } = await connection.query('INSERT INTO task (title, done, critical) VALUES("Task #3", false, true)');
    const res = await request(app.getHttpServer())
      .get(`/api/tasks/${taskId}`)
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('GET /api/tasks/:id FAILURE (404)', async () => {
    const { insertId: taskId } = await connection.query('INSERT INTO task (title, done, critical) VALUES("Task #4", false, true)');
    const res = await request(app.getHttpServer())
      .get(`/api/tasks/${taskId + 1}`)
      .expect(404);
    expect(res.body).toMatchSnapshot();
  });

  it('DELETE /api/tasks/:id SUCCESS', async () => {
    const { insertId: taskId } = await connection.query('INSERT INTO task (title, done) VALUES("Task #2", false)');
    const resDelete = await request(app.getHttpServer())
      .delete(`/api/tasks/${taskId}`)
      .expect(204);

    expect(resDelete.body).toMatchSnapshot();

    const user = await genUser(connection);
    const jwt = await genCookie(user);

    const resGet = await request(app.getHttpServer())
      .get('/api/tasks')
      .set('Cookie', [`jwt=${jwt}`])
      .expect(200);
    expect(resGet.body).toMatchSnapshot();
  });
});
