import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from '../../pages/SignupPage';

// Mock the Auth context
const mockSignup = vi.fn();

vi.mock('../../context/AuthContext', () => ({
    useAuth: () => ({ signup: mockSignup }),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

const renderSignup = () =>
    render(
        <MemoryRouter>
            <SignupPage />
        </MemoryRouter>
    );

// Helper — get the password input by its exact label text 
const getPasswordInput = () => screen.getByLabelText('Password');

describe('SignupPage – Unit Tests', () => {
    beforeEach(() => vi.clearAllMocks());

    it('renders name, email and password fields', () => {
        renderSignup();
        expect(screen.getByLabelText('Full name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email address')).toBeInTheDocument();
        expect(getPasswordInput()).toBeInTheDocument();
    });

    it('renders Create Account button', () => {
        renderSignup();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    });

    it('shows error when name is empty', async () => {
        renderSignup();
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/name is required/i);
        });
    });

    it('shows error for invalid email format', async () => {
        renderSignup();
        fireEvent.change(screen.getByLabelText('Full name'), {
            target: { value: 'Alice' },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'notanemail' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/valid email/i);
        });
    });

    it('shows error if password is less than 6 characters', async () => {
        renderSignup();
        fireEvent.change(screen.getByLabelText('Full name'), {
            target: { value: 'Alice' },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'alice@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: '123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));
        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/6 characters/i);
        });
    });

    it('calls signup with correct data on valid submit', async () => {
        mockSignup.mockResolvedValue({});
        renderSignup();

        fireEvent.change(screen.getByLabelText('Full name'), {
            target: { value: 'Alice' },
        });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'alice@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalledWith({
                name: 'Alice',
                email: 'alice@example.com',
                password: 'password123',
            });
        });
    });

    it('navigates to home after successful signup', async () => {
        mockSignup.mockResolvedValue({});
        renderSignup();

        fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Alice' } });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'alice@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
    });

    it('shows API error message on failure', async () => {
        mockSignup.mockRejectedValue(new Error('Email already registered.'));
        renderSignup();

        fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Alice' } });
        fireEvent.change(screen.getByLabelText('Email address'), {
            target: { value: 'alice@example.com' },
        });
        fireEvent.change(getPasswordInput(), {
            target: { value: 'password123' },
        });
        fireEvent.click(screen.getByRole('button', { name: /create account/i }));

        await waitFor(() => {
            expect(screen.getByRole('alert')).toHaveTextContent(/email already registered/i);
        });
    });

    it('has a link to the login page', () => {
        renderSignup();
        expect(screen.getByRole('link', { name: /sign in/i })).toHaveAttribute('href', '/login');
    });
});
