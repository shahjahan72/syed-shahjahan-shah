import { motion } from 'framer-motion';
import StatusPill from './StatusPill';
import Hero3D from './Hero3D';

const Hero = ({ onHireClick }) => {
    return (
        <section className="min-h-[90vh] flex flex-col justify-center items-start px-6 md:px-20 max-w-7xl mx-auto pt-20 relative">
            {/* 3D Background */}
            <Hero3D />

            <div className="relative z-10 pointer-events-none"> {/* Text wrapper handles z-index, but allows clicks on button via pointer-events-auto */}
                <div className="pointer-events-auto">
                    <StatusPill />
                </div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-bold mt-4 leading-[0.9] tracking-tighter"
                >
                    I craft digital <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue">experiences</span> that <br />
                    don't suck.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="mt-8 text-xl text-white/60 max-w-xl font-light"
                >
                    Frontend Developer & UI/UX Designer specialized in building high-end, responsive, and interactive web applications.
                </motion.p>

                <motion.button
                    onClick={onHireClick}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="pointer-events-auto mt-12 px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] cursor-pointer"
                >
                    Hire Me
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
