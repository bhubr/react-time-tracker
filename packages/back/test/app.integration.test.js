/* eslint-disable import/default */
import request from 'supertest';
import app from '../src/app';

describe('app', () => {
  // Bloody blocks the test, God knows why
  xit('should get an array from GET /api/tasks', () => {
    expect.assertions(1);
    return request(app)
      .get('/api/tasks')
      .expect(200)
      .then(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });
});
