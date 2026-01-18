import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingBag, ChevronRight } from 'lucide-react';
import { products, categories } from '../data/products';

const Navigation = () => {
    const location = useLocation();
    const { cart, setIsCartOpen } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Collection', path: '/' },
        { name: 'Checkout', path: '/checkout' },
        { name: 'Track Order', path: '/order-status' },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 bg-[#1A1A1A]/80 backdrop-blur-xl shadow-lg' : 'py-8 bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        {/* Category Sidebar Toggle (Desktop/Mobile) */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                        >
                            <Menu size={20} className="hidden md:block" />
                            <span className="text-[10px] font-bold tracking-[0.2em] uppercase hidden md:block">Shop</span>
                        </button>
                    </div>

                    {/* Brand Logo */}
                    <Link to="/" className="relative group absolute left-1/2 -translate-x-1/2">
                        <img
                            src="/logo.jpg"
                            alt="Printify Studio PK"
                            className="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity"
                        />
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-8">
                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors relative group"
                                >
                                    {link.name}
                                    {location.pathname === link.path && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-2 left-0 w-full h-px bg-white"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>

                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="relative group flex items-center gap-2 text-white"
                        >
                            <ShoppingBag size={20} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                            {cart.length > 0 && (
                                <span className="absolute -top-1 -right-2 bg-white text-black text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 bg-[#1A1A1A] border-t border-white/5 py-8 md:hidden shadow-2xl"
                        >
                            <div className="flex flex-col items-center gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-sm font-bold tracking-[0.2em] uppercase text-white"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Sidebar Mega Menu */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]"
                        />
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-full md:w-[480px] bg-[#111111] z-[100] border-r border-white/5 p-12 overflow-y-auto"
                        >
                            <div className="flex justify-between items-center mb-16">
                                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30">Select Category</span>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-white/50 hover:text-white"><X size={24} /></button>
                            </div>

                            <div className="space-y-12">
                                {categories.map((cat, i) => (
                                    <Link
                                        key={cat.id}
                                        to={`/?category=${cat.id}`}
                                        onClick={() => {
                                            setIsSidebarOpen(false);
                                        }}
                                        className="group block"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-3xl font-serif text-white group-hover:text-brand-accent transition-colors">{cat.name}</h3>
                                            <span className="text-[10px] font-bold text-white/20 group-hover:text-brand-accent transition-colors">0{i + 1}</span>
                                        </div>
                                        <p className="text-xs text-white/40 group-hover:text-white/60">{cat.description}</p>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-20 pt-10 border-t border-white/10">
                                <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-6">Quick Actions</h4>
                                <div className="space-y-4">
                                    <Link to="/order-status" onClick={() => setIsSidebarOpen(false)} className="block text-sm text-white/60 hover:text-white">Track Order</Link>
                                    <Link to="/checkout" onClick={() => setIsSidebarOpen(false)} className="block text-sm text-white/60 hover:text-white">View Cart</Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;
