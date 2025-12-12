import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import '../styles/global.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Initialize theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDark(false);
            document.documentElement.classList.add('light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDark;
        setIsDark(newTheme);
        if (newTheme) {
            document.documentElement.classList.remove('light');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.add('light');
            localStorage.setItem('theme', 'light');
        }
    };

    const navLinks = [
        { name: 'About', href: '#about' },
        { name: 'Services', href: '#services' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                padding: '1.5rem 2rem',
                transition: 'all 0.3s ease',
                background: scrolled ? 'var(--bg-primary)' : 'transparent',
                backdropFilter: scrolled ? 'blur(10px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
            }}
        >
            <div style={{
                maxWidth: 'var(--container-width)',
                margin: '0 auto',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <a href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
                    <span style={{ color: 'var(--accent-primary)' }}>&lt;</span>
                    Shahjahan
                    <span style={{ color: 'var(--accent-secondary)' }}>/&gt;</span>
                </a>

                {/* Desktop Nav */}
                <div className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            style={{
                                color: 'var(--text-secondary)',
                                fontWeight: '500',
                                transition: 'color 0.2s',
                            }}
                            onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
                            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                        >
                            {link.name}
                        </a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        style={{
                            padding: '0.5rem',
                            borderRadius: '50%',
                            background: 'var(--bg-tertiary)',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                            color: 'white',
                            fontWeight: '600',
                        }}
                    >
                        Resume
                    </motion.button>
                </div>

                {/* Mobile Toggle */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {/* Theme Toggle Mobile */}
                    <button
                        className="mobile-toggle"
                        onClick={toggleTheme}
                        style={{
                            display: 'none',
                            padding: '0.5rem',
                            background: 'var(--bg-tertiary)',
                            borderRadius: '50%',
                            color: 'var(--text-primary)'
                        }}
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <button
                        className="mobile-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        style={{ display: 'none', color: 'var(--text-primary)' }}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            overflow: 'hidden',
                            background: 'var(--bg-secondary)',
                            marginTop: '1rem',
                            borderRadius: '1rem',
                            border: '1px solid var(--glass-border)',
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem' }}>
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    style={{ fontSize: '1.1rem', padding: '0.5rem', color: 'var(--text-primary)' }}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive Styles Injection */}
            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
        </motion.nav>
    );
};

export default Navbar;
