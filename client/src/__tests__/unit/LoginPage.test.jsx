import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../pages/LoginPage';

// Mock the Auth context
const mockLogin = vi.fn();

vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ login: mockLogin }),
}));

// Mock react-router navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderLogin = () =>
    render(
        <MemoryRouter>
            <LoginPage />
        </MemoryRouter>
    );

// Helper — get the password input specifically (not the toggle button)
const getPasswordInput = () => screen.getByLabelText('Password');

describe('LoginPage – Unit Tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders email and password fields', () => {
        renderLogin();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(getPasswordInput()).toBeInTheDocument();
    });

    it('renders Sign In button', () => {
        renderLogin();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('shows error when submitting with empty fields', async () => {
        renderLogin();
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/fill in all fields/i);
        });
    });

    it('does NOT call login when fields are empty', async () => {
        renderLogin();
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
        await waitFor(() => expect(mockLogin).not.toHaveBeenCalled());
    });

    it('calls login with entered credentials on submit', async () => {
        mockLogin.mockResolvedValue({});
        renderLogin();

        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'secret123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({
                email: 'test@example.com',
                password: 'secret123',
            });
        });
    });

    it('navigates to home on successful login', async () => {
        mockLogin.mockResolvedValue({});
        renderLogin();

        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'secret123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
    });

    it('shows error message on login failure', async () => {
        mockLogin.mockRejectedValue(new Error('Invalid credentials.'));
        renderLogin();

        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'wrong@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'wrongpassword' },
        });
        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/invalid credentials/i);
        });
    });

    it('toggles password visibility when eye button is clicked', () => {
        renderLogin();
        const passwordInput = getPasswordInput();
        expect(passwordInput.type).toBe('password');

        fireEvent.click(screen.getByLabelText('Toggle password visibility'));
        expect(passwordInput.type).toBe('text');

        fireEvent.click(screen.getByLabelText('Toggle password visibility'));
        expect(passwordInput.type).toBe('password');
    });

    it('has a link to the signup page', () => {
        renderLogin();
        expect(screen.getByRole('link', { name: /sign up/i })).toHaveAttribute('href', '/signup');
    });
});
