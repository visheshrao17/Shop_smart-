const request = require('supertest');

// Mock prisma BEFORE importing app
jest.mock('../../src/lib/prismaClient', () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));

const prisma = require('../../src/lib/prismaClient');
const app = require('../../src/app');
const bcrypt = require('bcryptjs');

process.env.JWT_SECRET = 'integration_test_secret';

// ─── POST /api/auth/signup ─────────────────────────────────────────────────

describe('POST /api/auth/signup', () => {
    afterEach(() => jest.clearAllMocks());

    it('201 – creates a user with valid data (mock)', async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({
            id: 1,
            name: 'Bob',
            email: 'bob@test.com',
        });

        const res = await request(app).post('/api/auth/signup').send({
            name: 'Bob',
            email: 'bob@test.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body.user).toMatchObject({ name: 'Bob', email: 'bob@test.com' });
    });

    it('400 – missing fields', async () => {
        const res = await request(app).post('/api/auth/signup').send({ email: 'x@x.com' });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('All fields are required.');
    });

    it('400 – password too short', async () => {
        const res = await request(app).post('/api/auth/signup').send({
            name: 'Bob',
            email: 'bob@test.com',
            password: '123',
        });
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toMatch(/6 characters/);
    });

    it('409 – duplicate email', async () => {
        prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'bob@test.com' });

        const res = await request(app).post('/api/auth/signup').send({
            name: 'Bob',
            email: 'bob@test.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(409);
        expect(res.body.message).toBe('Email already registered.');
    });
});

// ─── POST /api/auth/login ──────────────────────────────────────────────────

describe('POST /api/auth/login', () => {
    afterEach(() => jest.clearAllMocks());

    it('200 – valid credentials return token (mock)', async () => {
        const hashed = await bcrypt.hash('password123', 10);
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            name: 'Bob',
            email: 'bob@test.com',
            password: hashed,
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'bob@test.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
        expect(res.body.message).toBe('Login successful.');
    });

    it('401 – user not found', async () => {
        prisma.user.findUnique.mockResolvedValue(null);

        const res = await request(app).post('/api/auth/login').send({
            email: 'nobody@test.com',
            password: 'password123',
        });

        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Invalid credentials.');
    });

    it('401 – wrong password', async () => {
        const hashed = await bcrypt.hash('correctpassword', 10);
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            name: 'Bob',
            email: 'bob@test.com',
            password: hashed,
        });

        const res = await request(app).post('/api/auth/login').send({
            email: 'bob@test.com',
            password: 'wrongpassword',
        });

        expect(res.statusCode).toBe(401);
    });

    it('400 – missing credentials', async () => {
        const res = await request(app).post('/api/auth/login').send({ email: 'a@a.com' });
        expect(res.statusCode).toBe(400);
    });
});
