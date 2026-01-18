import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Flame, Star, Sparkles } from 'lucide-react';
import { products } from '../../data/products';

const StatusBadge = ({ status }) => {
    const badges = {
        hot: { label: 'HOT', icon: Flame, color: 'bg-red-500' },
        new: { label: 'NEW', icon: Sparkles, color: 'bg-green-500' },
        popular: { label: 'POPULAR', icon: Star, color: 'bg-orange-500' }
    };

    const badge = badges[status];
    if (!badge) return null;

    return (
        <div className={`absolute top-3 left-3 ${badge.color} text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 z-10`}>
            <badge.icon size={12} />
            {badge.label}
        </div>
    );
};

const FeaturedProducts = () => {
    // Get featured products (those with status or first 8)
    const featuredProducts = products
        .filter(p => !p.isCustom && p.id !== 'WC-CUSTOM')
        .slice(0, 8);

    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-3xl lg:text-4xl font-black text-gray-900"
                        >
                            Featured <span className="text-[#00A19D]">Products</span>
                        </motion.h2>
                        <p className="text-gray-600 mt-2">Our most popular printing services</p>
                    </div>
                    <Link
                        to="/shop"
                        className="hidden md:flex items-center gap-2 text-[#00A19D] font-semibold hover:gap-3 transition-all"
                    >
                        View All <ArrowRight size={18} />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {featuredProducts.map((product, idx) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <Link
                                to={`/product/${product.id}`}
                                className="group block bg-bg-secondary border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                    <StatusBadge status={product.status} />
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1606166187734-a433e10e5762?q=80&w=1470&auto=format&fit=crop';
                                        }}
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-gray-900 group-hover:text-[#00A19D] transition-colors line-clamp-1">
                                        {product.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2 min-h-[40px]">
                                        {product.description}
                                    </p>
                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[#00A19D] font-bold">
                                            {product.priceRange || `Rs. ${product.price || product.baseCost}`}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {product.unit === 'sqft' ? '/sqft' : ''}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="mt-8 text-center md:hidden">
                    <Link
                        to="/shop"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#00A19D] text-white font-bold rounded-lg hover:bg-[#008B87] transition-colors"
                    >
                        View All Products <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;
