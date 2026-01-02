import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { products, categories } from '../../data/products';
import { ArrowRight, Filter } from 'lucide-react';

const ShopLanding = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProducts = activeCategory === 'all'
        ? products
        : products.filter(p => p.categoryId === activeCategory);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-neon-purple font-mono uppercase tracking-widest text-sm mb-2 block">
                    Printify Studio PK
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Print <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue">Anything.</span><br />
                    Anywhere.
                </h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    From large-scale billboards to custom stickers. <br />
                    Premium quality. Fast delivery. Best rates in Pakistan.
                </p>
            </motion.div>

            {/* Categories Filter */}
            <div className="mb-12 flex flex-wrap justify-center gap-4">
                <button
                    onClick={() => setActiveCategory('all')}
                    className={`px-6 py-2 rounded-full border transition-all ${activeCategory === 'all' ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white'}`}
                >
                    All Products
                </button>
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-6 py-2 rounded-full border transition-all ${activeCategory === cat.id ? 'bg-white text-black border-white' : 'bg-transparent text-white/60 border-white/20 hover:border-white'}`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-electric-blue/50 transition-all duration-300"
                    >
                        <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                            {/* Badge */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                                {product.unit === 'sqft' ? 'Per Sq.Ft' : 'Fixed Price'}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="text-xs text-electric-blue mb-2 font-mono uppercase">
                                {categories.find(c => c.id === product.categoryId)?.name}
                            </div>
                            <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-electric-blue transition-colors">
                                {product.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-6 line-clamp-2">
                                {product.description}
                            </p>

                            <div className="flex items-center justify-between border-t border-white/10 pt-4">
                                <span className="text-xl font-bold text-white">
                                    Rs. {product.price} <span className="text-sm font-normal text-white/40">/{product.unit === 'sqft' ? 'sqft' : 'unit'}</span>
                                </span>
                                <Link to={`/shop/product/${product.id}`}>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-neon-purple hover:text-white transition-all">
                                        Configure <ArrowRight size={16} />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ShopLanding;
