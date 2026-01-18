import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Heart, ShoppingCart, User, Menu, X, Search, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import { siteConfig } from '../config/siteConfig';

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

    const [theme, setTheme] = useState('light');

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-white'}`}>
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
                        <span className="text-2xl font-black text-gray-900 tracking-tight">
                            <span className="text-[#00A19D]">PRINTIFY</span>STUDIO
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
                                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden"
                                        >
                                            {link.dropdown.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={item.path}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#00A19D] hover:text-white transition-colors"
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
                    <div className="flex items-center gap-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 text-gray-700 hover:text-[#00A19D] transition-colors"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} />}
                        </button>

                        {/* Wishlist */}
                        <button className="relative p-2 text-gray-700 hover:text-[#00A19D] transition-colors">
                            <Heart size={22} />
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A19D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
                        </button>

                        {/* Cart */}
                        <Link to="/checkout" className="relative p-2 text-gray-700 hover:text-[#00A19D] transition-colors">
                            <ShoppingCart size={22} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00A19D] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden p-2 text-gray-700"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="hidden lg:block border-t border-gray-100">
                    <div className="flex items-center gap-6 py-3 overflow-x-auto">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/shop?category=${cat.id}`}
                                className="text-sm text-gray-600 hover:text-[#00A19D] whitespace-nowrap transition-colors"
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Categories - Horizontal Scroll */}
                <div className="lg:hidden border-t border-gray-100">
                    <div className="flex items-center gap-4 py-3 overflow-x-auto scrollbar-hide">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/shop?category=${cat.id}`}
                                className="text-xs text-gray-600 hover:text-[#00A19D] whitespace-nowrap transition-colors px-3 py-1 rounded-md hover:bg-gray-100"
                                onClick={() => setMobileOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-100"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navLinks.map((link, idx) => (
                                <div key={idx}>
                                    <Link
                                        to={link.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={`block py-2 text-lg font-semibold ${isActive(link.path) ? 'text-[#00A19D]' : 'text-gray-800'}`}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="pl-4 space-y-2 mt-2">
                                            {link.dropdown.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    to={item.path}
                                                    onClick={() => setMobileOpen(false)}
                                                    className="block py-1 text-gray-600 hover:text-[#00A19D]"
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-500 mb-2">Categories</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.id}
                                            to={`/shop?category=${cat.id}`}
                                            onClick={() => setMobileOpen(false)}
                                            className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700 hover:bg-[#00A19D] hover:text-white transition-colors"
                                        >
                                            {cat.name}
                                        </Link>
                                    ))}
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
