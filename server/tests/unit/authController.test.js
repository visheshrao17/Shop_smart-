const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock the Prisma singleton BEFORE importing the controller
jest.mock('../../src/lib/prismaClient', () => ({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
    },
}));

const prisma = require('../../src/lib/prismaClient');
const { signup, login } = require('../../src/controllers/authController');

// Minimal req/res helpers
const makeRes = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

process.env.JWT_SECRET = 'test_secret';

// ─── SIGNUP ────────────────────────────────────────────────────────────────

describe('signup controller', () => {
    afterEach(() => jest.clearAllMocks());

    it('returns 400 if required fields are missing', async () => {
        const req = { body: { email: 'a@a.com' } }; // name & password missing
        const res = makeRes();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'All fields are required.' });
    });

    it('returns 400 if password is shorter than 6 chars', async () => {
        const req = { body: { name: 'Alice', email: 'a@a.com', password: '123' } };
        const res = makeRes();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Password must be at least 6 characters.',
        });
    });

    it('returns 409 if email already exists', async () => {
        prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'a@a.com' });
        const req = { body: { name: 'Alice', email: 'a@a.com', password: 'secret123' } };
        const res = makeRes();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: 'Email already registered.' });
    });

    it('returns 201 with token on success', async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        prisma.user.create.mockResolvedValue({
            id: 1,
            name: 'Alice',
            email: 'alice@test.com',
        });

        const req = {
            body: { name: 'Alice', email: 'alice@test.com', password: 'password123' },
        };
        const res = makeRes();
        await signup(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        const body = res.json.mock.calls[0][0];
        expect(body).toHaveProperty('token');
        expect(body.user).toMatchObject({ name: 'Alice', email: 'alice@test.com' });
    });

    it('returns 500 on unexpected error', async () => {
        prisma.user.findUnique.mockRejectedValue(new Error('DB down'));
        const req = {
            body: { name: 'Alice', email: 'alice@test.com', password: 'password123' },
        };
        const res = makeRes();
        await signup(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});

// ─── LOGIN ─────────────────────────────────────────────────────────────────

describe('login controller', () => {
    afterEach(() => jest.clearAllMocks());

    it('returns 400 if fields are missing', async () => {
        const req = { body: { email: 'a@a.com' } };
        const res = makeRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
    });

    it('returns 401 if user not found', async () => {
        prisma.user.findUnique.mockResolvedValue(null);
        const req = { body: { email: 'unknown@test.com', password: 'secret' } };
        const res = makeRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });

    it('returns 401 on wrong password', async () => {
        const hashed = await bcrypt.hash('correctpassword', 10);
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            name: 'Alice',
            email: 'alice@test.com',
            password: hashed,
        });
        const req = { body: { email: 'alice@test.com', password: 'wrongpassword' } };
        const res = makeRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(401);
    });

    it('returns 200 with token on success', async () => {
        const hashed = await bcrypt.hash('correctpassword', 10);
        prisma.user.findUnique.mockResolvedValue({
            id: 1,
            name: 'Alice',
            email: 'alice@test.com',
            password: hashed,
        });
        const req = { body: { email: 'alice@test.com', password: 'correctpassword' } };
        const res = makeRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        const body = res.json.mock.calls[0][0];
        expect(body).toHaveProperty('token');
        expect(body).toHaveProperty('message', 'Login successful.');
    });

    it('returns 500 on unexpected error', async () => {
        prisma.user.findUnique.mockRejectedValue(new Error('DB error'));
        const req = { body: { email: 'a@a.com', password: 'secret123' } };
        const res = makeRes();
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
    });
});
