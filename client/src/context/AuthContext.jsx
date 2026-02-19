import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const API_BASE = 'http://localhost:5001/api/auth';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('shopsmart_user');
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('shopsmart_token'));

    const signup = async ({ name, email, password }) => {
        const res = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Signup failed');
        _persist(data);
        return data;
    };

    const login = async ({ email, password }) => {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Login failed');
        _persist(data);
        return data;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('shopsmart_user');
        localStorage.removeItem('shopsmart_token');
    };

    const _persist = (data) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('shopsmart_user', JSON.stringify(data.user));
        localStorage.setItem('shopsmart_token', data.token);
    };

    return (
        <AuthContext.Provider value={{ user, token, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
