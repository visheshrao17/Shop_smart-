import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, ShoppingBag } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for tailwind class merging
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Collections', path: '/products' },
        { name: 'Heritage', path: '#' },
        { name: 'Bespoke', path: '#' },
        { name: 'World of Smart', path: '#' },
    ];

    return (
        <nav className="fixed top-0 z-50 w-full border-b border-gold bg-black/80 backdrop-blur-lg">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
                {/* Logo and Brand */}
                <Link to="/" className="flex items-center gap-3 group">
                    <span className="text-2xl font-serif tracking-widest text-white uppercase italic">
                        Shop<span className="text-gold">Smart</span>
                    </span>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex lg:items-center lg:gap-12">
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "text-[11px] uppercase tracking-[0.2em] transition-all hover:text-gold",
                                    isActive && item.path !== '#' ? "text-gold" : "text-gray-400"
                                )
                            }
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-8">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <Search size={20} strokeWidth={1.5} />
                    </button>

                    <Link to="#" className="text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <User size={20} strokeWidth={1.5} />
                    </Link>

                    <button className="relative group text-gray-400 hover:text-white transition-colors">
                        <ShoppingCart size={20} strokeWidth={1.5} />
                        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-black">
                            0
                        </span>
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-gray-400"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X size={24} strokeWidth={1.5} />
                        ) : (
                            <Menu size={24} strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={cn(
                    "absolute left-0 top-full w-full bg-black/95 backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden",
                    isMenuOpen ? "max-h-screen border-b border-white/10 py-6" : "max-h-0 overflow-hidden"
                )}
            >
                <div className="flex flex-col space-y-4 px-6">
                    {/* Mobile Search */}
                    <div className="relative w-full md:hidden">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-xl border-none bg-white/5 py-3 pl-10 pr-3 text-sm text-white placeholder-gray-400 ring-1 ring-white/10 outline-none"
                            placeholder="Search products..."
                        />
                    </div>

                    {/* Mobile Links */}
                    {navLinks.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    "text-lg font-medium transition-colors hover:text-white",
                                    isActive && item.path !== '#' ? "text-indigo-400" : "text-gray-300"
                                )
                            }
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.name}
                        </NavLink>
                    ))}

                    <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
                        <button className="flex items-center gap-3 text-gray-300 hover:text-white">
                            <User size={20} />
                            <span>Your Account</span>
                        </button>
                        <button className="flex items-center gap-3 text-gray-300 hover:text-white">
                            <ShoppingCart size={20} />
                            <span>Cart (0)</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
