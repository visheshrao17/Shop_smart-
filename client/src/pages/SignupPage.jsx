import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

export default function SignupPage() {
    const { signup } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const validate = () => {
        if (!form.name.trim()) return 'Name is required.';
        if (!form.email.trim()) return 'Email is required.';
        if (!/\S+@\S+\.\S+/.test(form.email)) return 'Enter a valid email address.';
        if (form.password.length < 6) return 'Password must be at least 6 characters.';
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const validationError = validate();
        if (validationError) return setError(validationError);

        setLoading(true);
        try {
            await signup({ name: form.name, email: form.email, password: form.password });
            navigate('/');
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-serif font-bold text-white tracking-wide">
                        Shop<span className="text-[#c9a84c]">Smart</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm tracking-wider uppercase">
                        Create your account
                    </p>
                </div>

                {/* Card */}
                <div className="bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur">
                    <h2 className="text-2xl font-semibold text-white mb-6">Sign Up</h2>

                    {error && (
                        <div
                            role="alert"
                            className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-3"
                        >
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm text-gray-400 mb-1.5">
                                Full name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Alice Smith"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-400 mb-1.5">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm text-gray-400 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPwd ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Min. 6 characters"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-11 text-white placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#c9a84c]/50 transition"
                                />
                                <button
                                    type="button"
                                    aria-label="Toggle password visibility"
                                    onClick={() => setShowPwd((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#c9a84c] transition"
                                >
                                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            id="signup-submit-btn"
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] hover:bg-[#b8973b] disabled:opacity-60 text-black font-semibold rounded-xl py-3 text-sm transition-all duration-200 shadow-lg shadow-[#c9a84c]/20 mt-2"
                        >
                            {loading ? (
                                <svg
                                    className="animate-spin h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                            ) : (
                                <UserPlus size={16} />
                            )}
                            {loading ? 'Creating account…' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#c9a84c] hover:underline font-medium">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
