import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            padding: '2rem',
            overflow: 'hidden'
        }}>
            {/* Background Elements */}
            <div style={{
                position: 'absolute',
                top: '20%',
                left: '10%',
                width: '300px',
                height: '300px',
                background: 'var(--accent-primary)',
                filter: 'blur(150px)',
                opacity: 0.2,
                borderRadius: '50%'
            }} />
            <div style={{
                position: 'absolute',
                bottom: '20%',
                right: '10%',
                width: '300px',
                height: '300px',
                background: 'var(--accent-secondary)',
                filter: 'blur(150px)',
                opacity: 0.2,
                borderRadius: '50%'
            }} />

            <div style={{
                maxWidth: 'var(--container-width)',
                width: '100%',
                zIndex: 2,
                textAlign: 'center'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            color: 'var(--accent-primary)',
                            textTransform: 'uppercase',
                            letterSpacing: '3px',
                            fontSize: '1rem',
                            marginBottom: '1rem',
                            fontWeight: 600
                        }}
                    >
                        Shahjahan Shah
                    </motion.h2>

                    <h1 style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        fontWeight: 800,
                        lineHeight: 1.1,
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                    }}>
                        IT Professional &<br />Creative Designer
                    </h1>

                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--text-secondary)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                    }}>
                        Enhancing businesses with premium <b>Graphic Design</b>, <b>Digital Printing</b>, and <b>Web Solutions</b>.
                        We turn your vision into a powerful brand identity.
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: '1.5rem',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'white',
                                color: 'black',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                            }}
                        >
                            View Projects <ArrowRight size={20} />
                        </motion.a>

                        <motion.a
                            href="/resume.pdf"
                            whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                background: 'transparent',
                                border: '1px solid var(--border-light)',
                                color: 'var(--text-primary)',
                                padding: '1rem 2rem',
                                borderRadius: '50px',
                                fontWeight: 600,
                                fontSize: '1.1rem'
                            }}
                        >
                            Download CV <Download size={20} />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
