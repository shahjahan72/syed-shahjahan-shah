import { motion } from 'framer-motion';
import { Palette, Printer, Code, Rocket } from 'lucide-react';

const services = [
    {
        icon: <Code size={40} />,
        title: 'Web Development',
        description: 'Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.',
        color: 'var(--accent-primary)'
    },
    {
        icon: <Palette size={40} />,
        title: 'Graphic Designing',
        description: 'Creative branding, logos, social media posts, and marketing materials that capture your brand essence.',
        color: 'var(--accent-secondary)'
    },
    {
        icon: <Printer size={40} />,
        title: 'Digital Printing',
        description: 'High-quality printing services including business cards, flyers, banners, and merchandise.',
        color: '#38bdf8' // Sky blue
    }
];

const Services = () => {
    return (
        <section id="services" style={{ padding: '8rem 2rem', background: 'var(--bg-primary)' }}>
            <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '5rem' }}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem 1rem',
                            borderRadius: '50px',
                            marginBottom: '1rem',
                            border: '1px solid var(--border-light)'
                        }}
                    >
                        <Rocket size={16} color="var(--accent-secondary)" />
                        <span style={{ fontSize: '0.9rem', fontWeight: 600, letterSpacing: '1px' }}>PRINTFY STUDIO PK</span>
                    </motion.div>

                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '1rem',
                        background: 'linear-gradient(to right, #fff, #94a3b8)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'block'
                    }}>
                        Digital Agency Services
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                        We provide comprehensive digital solutions under one roof. From pixel-perfect designs to high-performance code and tangible print products.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2.5rem'
                }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'var(--bg-secondary)',
                                padding: '3rem 2rem',
                                borderRadius: '1.5rem',
                                border: '1px solid var(--border-light)',
                                textAlign: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <div style={{
                                background: 'var(--bg-tertiary)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 2rem',
                                color: service.color,
                                boxShadow: `0 0 20px ${service.color}40`,
                                border: `1px solid ${service.color}20`
                            }}>
                                {service.icon}
                            </div>

                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                {service.title}
                            </h3>

                            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                                {service.description}
                            </p>

                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: `linear-gradient(135deg, ${service.color}05, transparent)`,
                                zIndex: 0,
                                pointerEvents: 'none'
                            }} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
