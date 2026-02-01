import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, ChevronRight, ChevronDown } from 'lucide-react';

const ProductCard = ({ image, title, category, price, description, delay = 0 }) => {
    const [showMore, setShowMore] = useState(false);
    const [isWishlisted, setIsWishlisted] = useState(false);

    // Default description if none provided
    const displayDescription = description || "Experience unparalleled quality and timeless design with this exclusive piece from our latest collection.";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay }}
            className="group relative flex flex-col p-4 rounded-[2rem] bg-[#222]/80 backdrop-blur-xl border border-white/5 hover:border-gold/30 transition-all duration-500 shadow-2xl"
        >
            {/* Product Image Area */}
            <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#111] mb-6">
                {/* Wishlist Icon */}
                <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="absolute top-4 right-4 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 transition-all"
                >
                    <Heart size={18} className={isWishlisted ? "fill-red-500 text-red-500" : "text-white"} />
                </button>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full flex items-center justify-center text-8xl grayscale group-hover:grayscale-0 transition-all duration-700"
                >
                    {image}
                </motion.div>
            </div>

            {/* Product Header: Title & Price */}
            <div className="px-2 mb-4">
                <p className="text-gray-400 text-[11px] uppercase tracking-[0.2em] mb-1 font-medium">
                    {category}
                </p>
                <div className="flex justify-between items-start gap-4">
                    <h3 className="text-xl font-serif text-white italic leading-tight flex-1">
                        {title}
                    </h3>
                    <span className="text-2xl font-sans font-bold text-white whitespace-nowrap">
                        {price}
                    </span>
                </div>
            </div>

            {/* Description & Show More */}
            <div className="px-2 mb-8 flex-1">
                <div className={`text-gray-400 text-sm leading-relaxed overflow-hidden transition-all duration-500 ${showMore ? "max-h-40" : "max-h-12"}`}>
                    {displayDescription}
                </div>
                <button
                    onClick={() => setShowMore(!showMore)}
                    className="mt-3 flex items-center gap-1 text-white text-[11px] uppercase tracking-widest font-bold hover:text-gold transition-colors"
                >
                    <span>{showMore ? "Show less" : "Show more"}</span>
                    {showMore ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
            </div>

            {/* Action Footer */}
            <div className="px-2 flex gap-3 h-14">
                {/* Cart Button */}
                <button className="h-full px-5 flex items-center justify-center rounded-[1rem] bg-white/5 border border-white/10 text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300">
                    <ShoppingCart size={20} />
                </button>

                {/* Buy Now Button */}
                <button className="flex-1 h-full flex items-center justify-center gap-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gold hover:scale-[1.02] transition-all duration-300 shadow-xl shadow-white/5">
                    <span>Buy Now</span>
                    <ChevronRight size={18} />
                </button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
