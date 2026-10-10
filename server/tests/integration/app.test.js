const request = require('supertest');
const prisma = require('../../src/config/db');
const app = require('../../src/app');

jest.mock('../../src/config/db', () => ({
  $queryRaw: jest.fn(),
}));

describe('Integration Test: App Entry Point', () => {
  it('should return 200 OK and correct message for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('E-Commerce API is running...');
  });
});

describe('Health endpoint', () => {
  it('returns a healthy status when the database is connected', async () => {
    prisma.$queryRaw.mockResolvedValue([{ '?column?': 1 }]);

    const response = await request(app).get('/api/health');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
      database: 'connected',
    });
  });

  it('returns a service unavailable status when the database is disconnected', async () => {
    prisma.$queryRaw.mockRejectedValue(new Error('Database unavailable'));

    const response = await request(app).get('/api/health');

    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({
      status: 'error',
      database: 'disconnected',
    });
  });
});
