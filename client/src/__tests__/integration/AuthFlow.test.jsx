import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import { AuthProvider } from '../../context/AuthContext';

// ─── MSW Mock Server ──────────────────────────────────────────────────────────
// These handlers intercept real fetch calls made inside AuthContext

const MOCK_USER = { id: 1, name: 'Alice', email: 'alice@test.com' };
const MOCK_TOKEN = 'mock.jwt.token';

const handlers = [
    // Signup – success
    http.post('http://localhost:5001/api/auth/signup', async ({ request }) => {
        const body = await request.json();
        if (body.email === 'taken@test.com') {
            return HttpResponse.json(
                { message: 'Email already registered.' },
                { status: 409 }
            );
        }
        return HttpResponse.json(
            { message: 'User created successfully.', token: MOCK_TOKEN, user: MOCK_USER },
            { status: 201 }
        );
    }),

    // Login – success / failure
    http.post('http://localhost:5001/api/auth/login', async ({ request }) => {
        const body = await request.json();
        if (body.email === 'alice@test.com' && body.password === 'password123') {
            return HttpResponse.json(
                { message: 'Login successful.', token: MOCK_TOKEN, user: MOCK_USER },
                { status: 200 }
            );
        }
        return HttpResponse.json({ message: 'Invalid credentials.' }, { status: 401 });
    }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ─── Helpers ─────────────────────────────────────────────────────────────────

// Stub localStorage
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (k) => store[k] ?? null,
        setItem: (k, v) => { store[k] = v; },
        removeItem: (k) => { delete store[k]; },
        clear: () => { store = {}; },
    };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const renderWith = (Component) =>
    render(
        <AuthProvider>
            <MemoryRouter>
                <Component />
            </MemoryRouter>
        </AuthProvider>
    );

// ─── Integration: LoginPage ───────────────────────────────────────────────────

describe('LoginPage – Integration (MSW)', () => {
    it('fires a POST /api/auth/login and receives a token on success', async () => {
        renderWith(LoginPage);

        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'alice@test.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        // Token is stored in localStorage after a successful response
        await waitFor(() => {
            expect(localStorageMock.getItem('shopsmart_token')).toBe(MOCK_TOKEN);
        });
    });

    it('shows error message on 401 response', async () => {
        renderWith(LoginPage);

        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'wrong@test.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'wrongpassword' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
        });
    });
});

// ─── Integration: SignupPage ──────────────────────────────────────────────────

describe('SignupPage – Integration (MSW)', () => {
    it('fires a POST /api/auth/signup and stores token on success', async () => {
        localStorageMock.clear();
        renderWith(SignupPage);

        fireEvent.change(screen.getByLabelText('Full name'), {
            target: { value: 'Alice' },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'newuser@test.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(localStorageMock.getItem('shopsmart_token')).toBe(MOCK_TOKEN);
        });
    });

    it('shows error message on 409 duplicate-email response', async () => {
        renderWith(SignupPage);

        fireEvent.change(screen.getByLabelText('Full name'), {
            target: { value: 'Alice' },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'taken@test.com' },
        });
        fireEvent.change(screen.getByLabelText('Password'), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/email already registered/i);
        });
    });
});
