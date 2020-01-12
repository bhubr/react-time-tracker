import { INestApplication } from '@nestjs/common';
import { Connection } from 'typeorm';
import * as request from 'supertest';
import  { genCookie, genUser, setup, AppCo, truncateTables } from './utils';

describe('ProjectController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeAll(async () => {
    const { _app, _connection }: AppCo = await setup();
    app = _app;
    connection = _connection;
  });

  beforeEach(async () => truncateTables(connection));

  // it('GET /api/tasks FAIL (No auth)', async () => {
  //   const res = await request(app.getHttpServer())
  //     .get('/api/tasks')
  //     .expect(401);
  //   expect(res.body).toMatchSnapshot();
  // });

  // it('GET /api/tasks SUCCESS', async () => {
  //   const user = await genUser(connection);
  //   const jwt = await genCookie(user);
  //   const res = await request(app.getHttpServer())
  //     .get('/api/tasks')
  //     .set('Cookie', [`jwt=${jwt}`])
  //     .expect(200);
  //   expect(res.body).toMatchSnapshot();
  // });

  it('POST /api/projects FAIL (no auth)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/projects')
      .send({ title: 'Project #1' })
      .expect(401);
    expect(res.body).toMatchSnapshot();
  });

  it('POST /api/projects FAIL (no workspace)', async () => {
    const user = await genUser(connection);
    const jwt = await genCookie(user);
    const res = await request(app.getHttpServer())
      .post('/api/projects')
      .send({
        title: 'Project #1'
      })
      .set('Cookie', [`jwt=${jwt}`])
      .expect(422);
    expect(res.body).toMatchSnapshot();
  });

  it('POST /api/projects SUCCESS', async () => {
    const user = await genUser(connection);
    const jwt = await genCookie(user);
    const resWorkspace = await request(app.getHttpServer())
      .post('/api/workspaces')
      .send({
        title: 'Workspace #1'
      })
      .set('Cookie', [`jwt=${jwt}`])
      .expect(201);
    const res = await request(app.getHttpServer())
      .post('/api/projects')
      .send({
        title: 'Project #1',
        workspaceId: resWorkspace.body.id
      })
      .set('Cookie', [`jwt=${jwt}`])
      .expect(201);
    expect(res.body).toMatchSnapshot();
  });
});