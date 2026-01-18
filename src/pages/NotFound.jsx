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
                <h2 className="text-3xl font-serif mb-6">Page Not Found</h2>
                <p className="text-brand-black/40 mb-12 max-w-sm mx-auto text-sm leading-relaxed">
                    The collection piece you are looking for has been moved or is currently unavailable in our archives.
                </p>
                <Link to="/">
                    <button className="px-10 py-5 bg-brand-black text-white text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-accent transition-all mx-auto">
                        Return to Collection
                    </button>
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
