import supertest from 'supertest';
import app from "../src/app";

describe('Server Tests', () => {
  it('should respond with status code 200 when accessing the root URL', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });
});
