import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createConnection, Connection } from 'typeorm';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import settings from '../src/settings';

describe('TimeboxController (e2e)', () => {
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
    await connection.query('SET FOREIGN_KEY_CHECKS=0;');
    await connection.query('TRUNCATE TABLE timebox');
    await connection.query('TRUNCATE TABLE task');
    await connection.query('SET FOREIGN_KEY_CHECKS=1;');
  });

  it('POST /api/timeboxes SUCCESS', async () => {
    const resTask = await request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Parent Task #1' })
      .expect(201);
    const task = resTask.body;

    const resTimebox = await request(app.getHttpServer())
      .post('/api/timeboxes')
      .send({ taskId: task.id, comment: 'Timebox #1.1', start: '2020-01-07 08:00', type: 'POMODORO' })
      .expect(201);
    expect(resTimebox.body).toMatchSnapshot();
  });

});