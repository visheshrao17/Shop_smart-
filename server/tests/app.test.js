const request = require('supertest');

// Mock Prisma so loading app.js doesn't trigger DB initialization
jest.mock('../src/lib/prismaClient', () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));

const app = require('../src/app');

describe('GET /api/health', () => {
    it('should return 200 and status ok', async () => {
        const res = await request(app).get('/api/health');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('status', 'ok');
    });
});
