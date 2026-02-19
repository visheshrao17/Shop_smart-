const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prismaClient');

// Helper — generate a signed JWT
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

/**
 * POST /api/auth/signup
 * Body: { name, email, password }
 */
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: 'Password must be at least 6 characters.' });
        }

        // Check duplicate email
        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(409).json({ message: 'Email already registered.' });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: { name, email, password: hashed },
        });

        const token = generateToken(user.id);

        return res.status(201).json({
            message: 'User created successfully.',
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('[signup]', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const token = generateToken(user.id);

        return res.status(200).json({
            message: 'Login successful.',
            token,
            user: { id: user.id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.error('[login]', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};

module.exports = { signup, login };
