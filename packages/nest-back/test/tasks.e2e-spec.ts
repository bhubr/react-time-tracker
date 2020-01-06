import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import settings from '../src/settings';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection({ ...settings.database, name: 'testconn' });
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(async () => {
    await connection.query('TRUNCATE TABLE task');
  });

  it('GET /api/tasks SUCCESS', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/tasks')
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
    const res = await request(app.getHttpServer())
      .delete(`/api/tasks/${taskId}`)
      .expect(204);
    expect(res.body).toMatchSnapshot();
  });
});
