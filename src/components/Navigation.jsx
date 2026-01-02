import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navigation = () => {
    const location = useLocation();

    const isShop = location.pathname.includes('/shop');

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none">
            <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-2 pointer-events-auto flex items-center gap-2">
                <Link to="/">
                    <div className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${!isShop ? 'bg-neon-purple text-white shadow-lg shadow-neon-purple/20' : 'text-white/60 hover:text-white'}`}>
                        Portfolio
                    </div>
                </Link>
                <Link to="/shop">
                    <div className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isShop ? 'bg-electric-blue text-white shadow-lg shadow-electric-blue/20' : 'text-white/60 hover:text-white'}`}>
                        Printing Shop
                    </div>
                </Link>
            </div>
        </nav>
    );
};

export default Navigation;
