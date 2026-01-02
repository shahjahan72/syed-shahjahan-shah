import React, { useState } from 'react';
import Hero from '../components/Hero';
import BentoGrid from '../components/BentoGrid';
import TechMarquee from '../components/TechMarquee';
import About from '../components/About';
import ContactModal from '../components/ContactModal';
import DigitalServices from '../components/DigitalServices'; // New Component

const Portfolio = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Hero onHireClick={() => setIsModalOpen(true)} />
            <TechMarquee />
            <About />
            <DigitalServices /> {/* Inserted here before Projects/Bento */}
            <BentoGrid />

            <footer className="py-10 text-center text-white/30 text-sm relative z-10 font-mono">
                <p>© 2025 Syed Shahjahan Shah. Crafted with ❤️ and heavy bass.</p>
            </footer>
        </>
    );
};

export default Portfolio;
