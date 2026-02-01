import React from 'react';
import { ShoppingBag, Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-luxury-black text-gray-500 border-t border-gold pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
                    {/* Brand Column */}
                    <div className="space-y-10 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-serif italic tracking-[0.2em] text-white">
                                Shop<span className="text-gold">Smart</span>
                            </span>
                        </div>
                        <p className="text-[11px] uppercase tracking-[0.2em] leading-loose text-gray-500">
                            The ultimate destination <br /> for those who appreciate <br /> the finer things in life.
                        </p>
                        <div className="flex space-x-8">
                            {[Twitter, Instagram, Github].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="text-gray-600 hover:text-gold transition-colors duration-500"
                                >
                                    <Icon size={16} strokeWidth={1.2} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Editorial Links */}
                    <div className="lg:col-span-1">
                        <h3 className="text-white text-[10px] uppercase tracking-[0.4em] mb-10 font-bold">The Houses</h3>
                        <ul className="space-y-6 text-[10px] uppercase tracking-[0.3em] font-medium">
                            {['Horology', 'Fine Leather', 'Rare Jewels', 'Fragrances'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-gold transition-colors duration-500">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="lg:col-span-1">
                        <h3 className="text-white text-[10px] uppercase tracking-[0.4em] mb-10 font-bold">Services</h3>
                        <ul className="space-y-6 text-[10px] uppercase tracking-[0.3em] font-medium">
                            {['Bespoke Request', 'Private Salon', 'Track Order', 'World Care'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="hover:text-gold transition-colors duration-500">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Minimal Newsletter */}
                    <div className="lg:col-span-1">
                        <h3 className="text-white text-[10px] uppercase tracking-[0.4em] mb-10 font-bold">Privilege Club</h3>
                        <p className="text-[10px] uppercase tracking-[0.2em] mb-8 leading-loose">Register to receive exclusive invitations and rare collection alerts.</p>
                        <form className="relative">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-gray-800 py-3 text-[11px] uppercase tracking-[0.2em] text-white focus:outline-none focus:border-gold transition-colors"
                            />
                            <button className="absolute right-0 bottom-3 text-gold text-[10px] uppercase tracking-[0.3em] font-bold hover:scale-105 transition-transform">
                                Join
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] uppercase tracking-[0.3em]">
                    <p className="text-gray-600">© {new Date().getFullYear()} ShopSmart Elite. Est. 1924.</p>
                    <div className="flex gap-12">
                        <a href="#" className="hover:text-gold transition-colors">Legal</a>
                        <a href="#" className="hover:text-gold transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gold transition-colors">Provenance</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
