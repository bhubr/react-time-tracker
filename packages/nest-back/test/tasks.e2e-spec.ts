import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createConnection } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import settings from '../src/settings';

describe('TasksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const connection = await createConnection({ ...settings.database, name: 'test' });
    await connection.query('TRUNCATE TABLE task');
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/tasks (GET)', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200);
    expect(res.body).toMatchSnapshot();
  });

  it('/tasks (POST)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Test task #1' })
      .expect(201);
    expect(res.body).toMatchSnapshot();
  });
});
