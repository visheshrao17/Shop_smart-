import React from 'react';
import ProductCard from '../components/ProductCard';
import SectionWrapper from '../components/SectionWrapper';

const Products = () => {
    const products = [
        { name: 'Skeleton Tourbillon 42', category: 'Horology', price: '$84,500', image: '⌚', description: "A masterpiece of precision, featuring an exposed movement hand-crafted by master watchmakers." },
        { name: 'Heritage Travel Duffel', category: 'Leather Goods', price: '$3,200', image: '👜', description: "Full-grain calfskin leather, hand-stitched for durability and an timeless aesthetic." },
        { name: 'Aurelia Gold Band', category: 'Fine Jewelry', price: '$12,800', image: '✨', description: "18k solid gold band encrusted with ethically sourced rare white diamonds." },
        { name: 'Midnight Oud', category: 'Fragrances', price: '$450', image: '🧪', description: "A deep, mysterious scent with notes of precious agarwood and smoked vetiver." },
        { name: 'Calfskin Oxfords', category: 'Footwear', price: '$1,200', image: '👞', description: "Italian hand-finished oxfords with a sleek profile and unparalleled comfort." },
        { name: 'Silk Pocket Square', category: 'Accessories', price: '$180', image: '🧣', description: "100% pure Mulberry silk with hand-rolled edges and a unique geometric print." },
    ];

    return (
        <div className="bg-luxury-black min-h-screen pt-32 pb-24">
            <SectionWrapper className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <p className="text-gold text-[10px] uppercase tracking-[0.4em] mb-4">Curated</p>
                        <h1 className="text-5xl font-serif text-white italic font-light">Permanent Collection</h1>
                    </div>
                    <div className="flex gap-8 mt-8 md:mt-0">
                        <button className="text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-gold transition-colors border-b border-gray-800 pb-2">
                            Refine
                        </button>
                        <button className="text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-gold transition-colors border-b border-gray-800 pb-2">
                            Sort By
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
                    {products.map((product, i) => (
                        <ProductCard
                            key={i}
                            image={product.image}
                            title={product.name}
                            category={product.category}
                            price={product.price}
                            description={product.description}
                            delay={i * 0.1}
                        />
                    ))}
                </div>
            </SectionWrapper>
        </div>
    );
};

export default Products;
