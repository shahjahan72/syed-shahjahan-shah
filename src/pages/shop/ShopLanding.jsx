import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { products, packages, categories } from '../../data/products';
import { Plus, Eye, ShoppingBag, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import TrustBadges from '../../components/features/TrustBadges';
import Testimonials from '../../components/features/Testimonials';
import ServiceTrustGrid from '../../components/features/ServiceTrustGrid';
import FaqEngine from '../../components/features/FaqEngine';
import SEO from '../../components/SEO';

const ShopLanding = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeCategory = searchParams.get('category') || 'all'; // activeCategory is now derived from URL
    const [searchQuery, setSearchQuery] = useState('');
    const [priceRange, setPriceRange] = useState('all');
    const [quickViewProduct, setQuickViewProduct] = useState(null);
    const { cart, addToCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);

    const priceRanges = [
        { id: 'all', label: 'All Prices', min: 0, max: Infinity },
        { id: 'under1k', label: 'Under Rs. 1,000', min: 0, max: 1000 },
        { id: '1k-5k', label: 'Rs. 1,000 - 5,000', min: 1000, max: 5000 },
        { id: '5k-10k', label: 'Rs. 5,000 - 10,000', min: 5000, max: 10000 },
        { id: 'over10k', label: 'Over Rs. 10,000', min: 10000, max: Infinity },
    ];

    // Sync URL param with internal state (for initial scroll)
    useEffect(() => {
        if (activeCategory !== 'all') {
            // Scroll to collection if param exists
            const collectionSection = document.getElementById('collection');
            if (collectionSection) {
                collectionSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [activeCategory]);

    // Handle loading state
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        // Set loading state when filters are actively being changed
        if ((searchQuery || priceRange !== 'all' || activeCategory !== 'all')) {
            setIsFiltering(true);
            const timer = setTimeout(() => {
                setIsFiltering(false);
            }, 300);
            return () => clearTimeout(timer);
        }
        setIsFiltering(false);
    }, [searchQuery, priceRange, activeCategory]);

    const handleCategoryChange = (catId) => {
        setSearchParams(catId === 'all' ? {} : { category: catId });
    };

    const filteredProducts = useMemo(() => {
        const allItems = [...products, ...packages];
        let result = activeCategory === 'all'
            ? allItems
            : allItems.filter(p => p.categoryId === activeCategory);

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.title.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query)
            );
        }

        // Price range filtering
        if (priceRange !== 'all') {
            const range = priceRanges.find(r => r.id === priceRange);
            if (range) {
                result = result.filter(p => {
                    const basePrice = p.price || p.baseCost || 0;
                    return basePrice >= range.min && basePrice < range.max;
                });
            }
        }

        return result;
    }, [activeCategory, searchQuery, priceRange]);

    return (
        <div className="min-h-screen bg-brand-white selection:bg-brand-black selection:text-white">
            <SEO
                title="Print Shop | Custom Printing & Merchandise - Printify Studio PK"
                description="Browse our complete range of custom printing services. From business cards and flyers to t-shirts, mugs, and large format banners."
                url="/shop"
            />
            {/* Collection Section */}
            <main id="collection" className="max-w-[1800px] mx-auto px-6 md:px-12 py-12">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-2">Print Shop</h1>
                        <p className="text-brand-black/60 text-sm">Premium printing services for business & events</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        {/* Price Filter */}
                        <div className="relative w-full sm:w-40">
                            <label className="text-[9px] font-bold text-brand-black/40 uppercase tracking-wider mb-1 block">Price Range</label>
                            <select
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                className="w-full bg-transparent border-b border-border-primary py-2 text-[10px] font-bold tracking-[0.1em] outline-none focus:border-brand-accent transition-colors cursor-pointer appearance-none"
                            >
                                {priceRanges.map(range => (
                                    <option key={range.id} value={range.id}>{range.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative w-full sm:w-64">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-transparent border-b border-border-primary py-2 text-[10px] font-bold tracking-[0.15em] outline-none focus:border-brand-accent transition-colors text-brand-black"
                            />
                            <Search className="absolute right-0 top-1/2 -translate-y-1/2 text-text-muted" size={12} />
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col items-end">
                                <span className="text-[9px] font-bold text-brand-black/30 uppercase tracking-wider mb-1">Items</span>
                                <span className="text-lg font-serif">{filteredProducts.length}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Category Filter */}
                {/* Category Filter */}
                <div className="mb-12 border-b border-border-primary pb-4">
                    <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap px-1">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${activeCategory === 'all' ? 'text-brand-accent' : 'text-text-muted hover:text-brand-black'
                                }`}
                        >
                            All Products
                            {activeCategory === 'all' && (
                                <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent" />
                            )}
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(cat.id)}
                                className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${activeCategory === cat.id ? 'text-brand-accent' : 'text-text-muted hover:text-brand-black'
                                    }`}
                            >
                                {cat.name}
                                {activeCategory === cat.id && (
                                    <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-accent" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
                    {isFiltering && (
                        <div className="col-span-full flex justify-center py-20">
                            <div className="w-8 h-8 border-4 border-brand-black/20 border-t-brand-black rounded-full animate-spin"></div>
                        </div>
                    )}
                    {filteredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/product/${product.id}`}
                                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-brand-accent/30 transition-all duration-300"
                            >
                                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                                    {product.status && (
                                        <div className="absolute top-3 left-3 z-10">
                                            <div className={`px-2 py-1 text-[10px] font-bold uppercase text-white rounded ${product.status === 'popular' ? 'bg-orange-500' :
                                                product.status === 'hot' ? 'bg-red-500' :
                                                    'bg-green-500'
                                                }`}>
                                                {product.status === 'popular' ? 'POPULAR' :
                                                    product.status === 'hot' ? 'HOT' :
                                                        'NEW'}
                                            </div>
                                        </div>
                                    )}
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                                            {product.priceRange || 'Details'}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            {product.unit === 'sqft' ? '/sqft' : ''}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                    {!isLoading && filteredProducts.length === 0 && (
                        <div className="col-span-full text-center py-20">
                            <p className="text-brand-black/50 text-lg">No products found matching your criteria.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Trust & Services Section */}
            <div className="max-w-[1400px] mx-auto px-6 space-y-40 mt-40">
                <ServiceTrustGrid />
                <Testimonials />
                <TrustBadges />
                <FaqEngine />
            </div>

            {/* Quick View Modal */}
            <AnimatePresence>
                {quickViewProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-black/60 backdrop-blur-sm"
                        onClick={() => setQuickViewProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-brand-white max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden soft-shadow relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="aspect-[4/5] md:aspect-auto">
                                <img
                                    src={quickViewProduct.image}
                                    alt={quickViewProduct.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-12 flex flex-col justify-center">
                                <button
                                    onClick={() => setQuickViewProduct(null)}
                                    className="absolute top-6 right-6 text-brand-black/40 hover:text-brand-black transition-colors"
                                >
                                    Close
                                </button>
                                <span className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-bold mb-4 block">
                                    {categories.find(c => c.id === quickViewProduct.categoryId)?.name}
                                </span>
                                <h2 className="text-4xl font-serif mb-6">{quickViewProduct.title}</h2>
                                <p className="text-brand-black/60 mb-8 leading-relaxed">
                                    {quickViewProduct.description}
                                </p>
                                <div className="text-3xl font-medium mb-10">
                                    {quickViewProduct.priceRange || 'See Details'}
                                </div>
                                <div className="flex gap-4">
                                    <Link
                                        to={`/product/${quickViewProduct.id}`}
                                        className="flex-1 bg-brand-black text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-center hover:bg-brand-accent transition-colors"
                                    >
                                        Configure Now
                                    </Link>
                                    <Link
                                        to={`/product/${quickViewProduct.id}`}
                                        className="flex-1 border border-brand-black/10 py-5 text-[10px] font-bold tracking-[0.3em] uppercase text-center hover:bg-brand-black hover:text-white transition-all"
                                    >
                                        Full Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Cart Button */}
            <Link
                to="/checkout"
                className="fixed bottom-10 right-10 z-[80] w-16 h-16 bg-brand-black text-white rounded-full flex items-center justify-center soft-shadow hover:scale-110 transition-transform group"
            >
                <ShoppingBag size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-brand-white">
                    {cart.length}
                </span>
            </Link>
        </div>
    );
};

export default ShopLanding;
