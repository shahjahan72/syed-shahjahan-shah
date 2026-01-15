import React from 'react';
import { motion } from 'framer-motion';

const SkipNav = () => {
    const skipToMain = () => {
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.setAttribute('tabindex', '-1');
            mainContent.focus();
            mainContent.removeAttribute('tabindex');
        }
    };

    return (
        <>
            <a
                href="#main-content"
                onClick={(e) => {
                    e.preventDefault();
                    skipToMain();
                }}
                className="fixed top-4 left-4 z-50 px-4 py-2 bg-neon-purple text-white rounded-lg font-medium shadow-lg transform -translate-y-20 focus:translate-y-0 transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-neon-purple focus:ring-offset-2 focus:ring-offset-deep-black"
            >
                Skip to main content
            </a>
            
            {/* Hidden anchor for direct linking */}
            <div id="main-content" tabIndex="-1" />
        </>
    );
};

export default SkipNav;