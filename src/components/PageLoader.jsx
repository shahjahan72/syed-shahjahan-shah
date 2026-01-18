import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative">
                {/* Outer Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 rounded-full border-t-2 border-b-2 border-[#00A19D]"
                />

                {/* Inner Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-2 left-2 w-12 h-12 rounded-full border-r-2 border-l-2 border-gray-900"
                />

                {/* Center Dot */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute top-6 left-6 w-4 h-4 rounded-full bg-[#00A19D]"
                />
            </div>
            <h3 className="absolute mt-24 font-mono text-sm text-gray-400 animate-pulse">Loading...</h3>
        </div>
    );
};

export default PageLoader;
