import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products } from '../data/products';

const BestSellers = () => {
    // Select specific high-margin/popular items manually
    const featuredIds = ['pvc-cards', 'panaflex', 'bottle-labels', 'custom-tshirt'];
    const bestSellers = products.filter(p => featuredIds.includes(p.id));

    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-neon-purple font-mono text-sm tracking-wider uppercase">Hot Picks</span>
                        <h2 className="text-3xl md:text-5xl font-black mt-2">Best Selling <br /> <span className="text-white/40">Products</span></h2>
                    </div>
                    <Link to="/shop" className="hidden md:flex items-center gap-2 text-white/60 hover:text-white transition-colors group">
                        View All <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bestSellers.map((product, i) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-neon-purple/50 transition-all"
                        >
                            {/* Image */}
                            <div className="aspect-[4/3] overflow-hidden bg-black relative">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                />
                                <div className="absolute top-3 right-3 bg-neon-purple/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur-md">
                                    DHAAMAKA
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-5">
                                <div className="flex gap-1 text-yellow-500 mb-2">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                                <h3 className="font-bold text-lg mb-1 group-hover:text-neon-purple transition-colors">{product.title}</h3>
                                <p className="text-white/50 text-xs line-clamp-2 mb-4">{product.description}</p>

                                <div className="flex justify-between items-center">
                                    <div className="font-mono text-electric-blue">
                                        <span className="text-[10px] text-white/40 block">Starting from</span>
                                        Rs. {product.price || product.baseCost} {product.unit === 'sqft' ? '/sqft' : ''}
                                    </div>
                                    <Link to={`/shop/product/${product.id}`}>
                                        <button className="bg-white/10 hover:bg-white text-white hover:text-black p-2 rounded-full transition-all">
                                            <ArrowRight size={16} />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Link to="/shop" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        View Full Catalog <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BestSellers;
