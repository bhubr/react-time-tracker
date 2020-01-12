import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import  { genCookie, genUser, setup, AppCo, truncateTables } from './utils';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const { _app, _connection }: AppCo = await setup();
    app = _app;
    connection = _connection;
  });

  beforeEach(async () => truncateTables(connection));

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
