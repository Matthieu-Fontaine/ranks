import request from 'supertest';
import app from '../src/app';

describe('App Tests', () => {
  it('should respond with a pong message at /ping', async () => {
    const response = await request(app).get('/ping');
    expect(response.status).toBe(200);
    expect(response.text).toBe('pong');
  });
});
