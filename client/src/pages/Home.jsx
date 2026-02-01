import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, Star, CheckCircle2, Play, Globe, Sparkles,
    Crown, Gem, Clock, ShieldCheck, MapPin, Mail, Phone
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

import ProductCard from '../components/ProductCard';

const Home = () => {
    return (
        <div className="bg-luxury-black min-h-screen">

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* Cinematic Background Image Placeholder */}
                <div className="absolute inset-0 z-0">
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale animate-slow-zoom" />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/60" />
                </div>

                <div className="relative z-10 text-center px-4 max-w-5xl">
                    <motion.p
                        initial={{ opacity: 0, letterSpacing: "0.2em" }}
                        animate={{ opacity: 1, letterSpacing: "0.5em" }}
                        transition={{ duration: 1.2 }}
                        className="text-gold text-xs uppercase mb-8 font-light"
                    >
                        Since 1924 • Defining Excellence
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-6xl md:text-8xl font-serif text-white italic mb-10 leading-[1.1]"
                    >
                        Crafted for Those Who <br />
                        <span className="text-gold">Own Excellence</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, delay: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-12"
                    >
                        <motion.button
                            whileHover={{ letterSpacing: "0.4em" }}
                            className="group relative text-white text-[11px] uppercase tracking-[0.3em] py-4 px-8"
                        >
                            <span className="relative z-10">Explore Collection</span>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gold group-hover:w-full transition-all duration-500" />
                        </motion.button>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
                </motion.div>
            </section>

            {/* --- FEATURED COLLECTION --- */}
            <SectionWrapper className="py-32 container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20">
                    <div className="max-w-xl">
                        <p className="text-gold text-[10px] uppercase tracking-[0.3em] mb-4">The Selection</p>
                        <h2 className="text-5xl font-serif text-white italic font-light">The Winter Edit</h2>
                    </div>
                    <button className="text-[11px] uppercase tracking-[0.3em] text-gray-400 hover:text-gold transition-colors border-b border-gray-800 pb-2">
                        View All Pieces
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <ProductCard
                        image="⌚"
                        category="Horology"
                        title="Skeleton Tourbillon 42"
                        price="$84,500"
                        description="Exposed movement hand-crafted by master watchmakers for unparalleled precision."
                        delay={0.1}
                    />
                    <ProductCard
                        image="👜"
                        category="Leather Goods"
                        title="Heritage Travel Duffel"
                        price="$3,200"
                        description="Full-grain calfskin leather, hand-stitched for a lifetime of elegance."
                        delay={0.2}
                    />
                    <ProductCard
                        image="✨"
                        category="Fine Jewelry"
                        title="Aurelia Gold Band"
                        price="$12,800"
                        description="18k solid gold encrusted with ethically sourced rare white diamonds."
                        delay={0.3}
                    />
                </div>
            </SectionWrapper>

            {/* --- CRAFTSMANSHIP / STORY SECTION --- */}
            <section className="bg-luxury-black py-40 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            className="relative"
                        >
                            <div className="aspect-[4/5] bg-luxury-charcoal overflow-hidden glass-luxury p-1">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1549439602-43ebca2327af?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale contrast-125" />
                            </div>
                            <div className="absolute -bottom-12 -right-12 w-64 h-80 hidden md:block border border-gold/30 p-1 glass-luxury shadow-2xl">
                                <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1511499767390-a8e425946607?auto=format&fit=crop&q=80')] bg-cover bg-center" />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: 0.2 }}
                            className="space-y-10"
                        >
                            <p className="text-gold text-[10px] uppercase tracking-[0.3em]">Artistry & Passion</p>
                            <h2 className="text-6xl font-serif text-white leading-tight italic">
                                A Legacy Written in <br />
                                <span className="text-gold italic">Hand-Stitched Silk</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed font-light">
                                Every ShopSmart creation is a testament to the pursuit of perfection.
                                Our master artisans combine centuries-old techniques with modern innovation
                                to create objects that aren't just bought, but inherited.
                            </p>
                            <div className="grid grid-cols-2 gap-10 pt-10">
                                <div>
                                    <h4 className="text-white font-serif text-xl mb-4 italic">The Materials</h4>
                                    <p className="text-gray-500 text-sm italic font-light">Ethically sourced, rare, and enduring quality.</p>
                                </div>
                                <div>
                                    <h4 className="text-white font-serif text-xl mb-4 italic">The Process</h4>
                                    <p className="text-gray-500 text-sm italic font-light">Over 400 hours of craftsmanship in every piece.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- BEST SELLERS SLIDER --- */}
            <SectionWrapper className="py-32 container mx-auto px-6 border-y border-gold">
                <div className="text-center mb-24">
                    <h2 className="text-[10px] uppercase tracking-[0.5em] text-gold mb-6">Object of Desire</h2>
                    <h3 className="text-4xl font-serif text-white italic">Curated Icons</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {[
                        { img: "⌚", name: "Grand Master v2", price: "24,000" },
                        { img: "🏺", name: "Venice Glass Vase", price: "1,800" },
                        { img: "💍", name: "Diamond Solitaire", price: "45,000" },
                        { img: "👞", name: "Calfskin Oxfords", price: "1,200" }
                    ].map((item, i) => (
                        <motion.div key={i} whileHover={{ y: -5 }} className="group">
                            <div className="aspect-square bg-white/2 glass-luxury flex items-center justify-center text-5xl mb-6 transition-all duration-700 group-hover:bg-gold/5">
                                {item.img}
                            </div>
                            <div className="text-center">
                                <h4 className="text-sm font-medium tracking-widest uppercase text-white mb-2">{item.name}</h4>
                                <p className="text-gray-500 text-[10px] tracking-widest uppercase">${item.price}</p>
                                <div className="w-0 h-[1px] bg-gold mx-auto mt-4 group-hover:w-8 transition-all duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionWrapper>

            {/* --- LUXURY EXPERIENCE HIGHLIGHTS --- */}
            <section className="py-32 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {[
                        { icon: ShieldCheck, title: "Authenticated", desc: "Digital identity proof" },
                        { icon: Crown, title: "Limited Release", desc: "Rare editions only" },
                        { icon: MapPin, title: "Global Conceirge", desc: "Bespoke delivery" },
                        { icon: Gem, title: "Investment Grade", desc: "Appreciating value" }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            className="text-center"
                        >
                            <feature.icon size={24} strokeWidth={1} className="text-gold mx-auto mb-6" />
                            <h4 className="text-white text-[11px] uppercase tracking-[0.3em] font-medium mb-3">{feature.title}</h4>
                            <p className="text-gray-500 text-[10px] uppercase tracking-widest">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-40 border-t border-gold">
                <div className="container mx-auto px-6 text-center">
                    <motion.h2
                        whileInView={{ opacity: [0, 1], y: [20, 0] }}
                        className="text-6xl md:text-8xl font-serif text-white italic mb-16 leading-tight"
                    >
                        Own the <span className="text-gold">Extraordinary</span>
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.05, letterSpacing: "0.5em" }}
                        className="px-16 py-6 border border-gold text-gold text-xs uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all duration-500 font-bold"
                    >
                        Acquire Now
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default Home;
