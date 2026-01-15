import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-deep-black text-white">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[150px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-neon-purple to-electric-blue opacity-50 select-none"
            >
                404
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
                <p className="text-white/50 mb-8 max-w-md mx-auto">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/">
                    <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-white/90 transition-all flex items-center gap-2 mx-auto">
                        <ArrowLeft size={18} /> Back to Home
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
