import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, ShoppingCart, User, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { toggleTheme } from '../utils/theme';

const NavbarPro = () => {
    const location = useLocation();
    const { cart } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const dropdownRef = useRef(null);

    const cartCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
    }, []);

    // Toggle theme function
    const handleToggle = () => {
        const newTheme = toggleTheme();
        setTheme(newTheme);
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        {
            name: 'About Us',
            path: '/about',
            dropdown: [
                { name: 'Our Story', path: '/about' },
                { name: 'Our Process', path: '/about#process' },
                { name: 'Why Choose Us', path: '/about#why-us' },
            ]
        },
        {
            name: 'Contact Us',
            path: '/contact',
            dropdown: [
                { name: 'Get in Touch', path: '/contact' },
                { name: 'Request Quote', path: '/contact#quote' },
                { name: 'Support', path: '/contact#support' },
            ]
        },
        {
            name: 'Print Shop',
            path: '/shop',
            dropdown: [
                { name: 'All Products', path: '/shop' },
                { name: 'Branding Packages', path: '/packages' },
            ]
        },
        { name: 'My Account', path: '/account' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-white shadow-lg' : 'bg-brand-white/80 backdrop-blur-md'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00A19D]">
                            <img
                                src="/assets/images/printify logo.jpg"
                                alt="Printify Studio Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="text-2xl font-black text-brand-black tracking-tight">
                            <span className="text-brand-accent">PRINTIFY</span>STUDIO
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav ref={dropdownRef} className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link, idx) => (
                            <div key={idx} className="relative">
                                {link.dropdown ? (
                                    <button
                                        onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                                        className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${isActive(link.path) ? 'text-[#00A19D]' : 'text-gray-700 hover:text-[#00A19D]'}`}
                                    >
                                        {link.name}
                                        <ChevronDown size={14} className={`transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                                    </button>
                                ) : (
                                    <Link
                                        to={link.path}
                                        className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${isActive(link.path) ? 'text-[#00A19D]' : 'text-gray-700 hover:text-[#00A19D]'}`}
                                    >
                                        {link.name}
                                    </Link>
                                )}

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === idx && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 10 }}
                                            className="absolute top-full left-0 mt-2 w-48 bg-brand-white rounded-lg shadow-xl border border-border-primary overflow-hidden"
                                        >
                                            {link.dropdown.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={item.path}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="block px-4 py-3 text-sm text-text-secondary hover:bg-brand-accent hover:text-white transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-1 sm:gap-2">
                        {/* Theme Toggle */}
                        <button
                            onClick={handleToggle}
                            className="p-2 text-brand-black hover:text-brand-accent transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                        </button>

                        {/* Wishlist - Hidden on very small screens */}
                        <button className="hidden sm:block relative p-2 text-brand-black hover:text-brand-accent transition-colors">
                            <Heart size={20} />
                            <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">0</span>
                        </button>

                        {/* Cart */}
                        <Link to="/checkout" className="relative p-2 text-brand-black hover:text-brand-accent transition-colors">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-brand-black hover:bg-bg-secondary rounded-lg transition-colors"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="hidden lg:block border-t border-border-primary">
                    <div className="flex items-center gap-6 py-3 overflow-x-auto">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/shop?category=${cat.id}`}
                                className="text-sm text-text-secondary hover:text-brand-accent whitespace-nowrap transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Categories - Horizontal Scroll */}
                <div className="lg:hidden border-t border-border-primary">
                    <div className="flex items-center gap-4 py-3 overflow-x-auto scrollbar-hide px-6">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/shop?category=${cat.id}`}
                                className="text-xs text-text-secondary hover:text-brand-accent whitespace-nowrap transition-colors px-4 py-2 rounded-full bg-bg-secondary border border-border-primary"
                                onClick={() => setMobileOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-0 z-[60] lg:hidden bg-brand-white"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between p-6 border-b border-border-primary">
                                <span className="text-xl font-bold text-brand-black">Menu</span>
                                <button onClick={() => setMobileOpen(false)} className="p-2 text-brand-black">
                                    <X size={28} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
                                {navLinks.map((link, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileOpen(false)}
                                            className={`block text-2xl font-bold ${isActive(link.path) ? 'text-brand-accent' : 'text-brand-black'}`}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.dropdown && (
                                            <div className="pl-4 space-y-3 border-l-2 border-border-primary">
                                                {link.dropdown.map((item, i) => (
                                                    <Link
                                                        key={i}
                                                        to={item.path}
                                                        onClick={() => setMobileOpen(false)}
                                                        className="block text-lg text-text-secondary hover:text-brand-accent"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}

                                <div className="pt-8 border-t border-border-primary">
                                    <p className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Categories</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.id}
                                                to={`/shop?category=${cat.id}`}
                                                onClick={() => setMobileOpen(false)}
                                                className="px-4 py-3 bg-bg-secondary rounded-xl text-sm font-semibold text-text-secondary hover:bg-brand-accent hover:text-white transition-all text-center"
                                            >
                                                {cat.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default NavbarPro;
