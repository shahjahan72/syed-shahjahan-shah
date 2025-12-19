import { motion } from 'framer-motion';

const About = () => {
    return (
        <section id="about" style={{ padding: '8rem 2rem', background: 'var(--bg-primary)' }} className="container-padding">
            <div className="responsive-grid" style={{ maxWidth: 'var(--container-width)', margin: '0 auto', alignItems: 'center', gap: '4rem' }}>

                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mobile-center"
                >
                    <h2 style={{
                        fontSize: '2.5rem',
                        marginBottom: '2rem',
                        color: 'var(--text-primary)',
                    }}>
                        About Me
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                        As a dedicated and proactive professional, I have honed my skills through diverse experiences in IT.
                        I thrive in dynamic environments and consistently deliver results that exceed expectations.
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.7' }}>
                        My ability to adapt and my passion for continuous learning have been key drivers in my career success.
                        I have a strong background in Graphic Design and Customer Service, ensuring high-quality results in every project.
                    </p>

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Experience</h4>
                            <p style={{ color: 'var(--text-muted)' }}>4+ Years</p>
                        </div>
                        <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Education</h4>
                            <p style={{ color: 'var(--text-muted)' }}>Matriculation (Jamia Tul Madina)</p>
                        </div>
                    </div>

                    {/* Skills */}
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Skills & Top Services</h3>
                    <div className="mobile-flex-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {['Web Development', 'React.js', 'Digital Printing', 'Offset Printing', 'Graphic Design', 'Adobe Photoshop', 'Adobe Illustrator', 'Urdu InPage'].map(skill => (
                            <span key={skill} style={{
                                padding: '0.5rem 1rem',
                                background: 'var(--bg-tertiary)',
                                borderRadius: '20px',
                                color: 'var(--text-primary)',
                                fontSize: '0.9rem',
                                border: '1px solid var(--border-light)'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ position: 'relative', maxWidth: '400px', margin: '0 auto', width: '100%' }}
                    className="mobile-center"
                >
                    <div style={{
                        position: 'absolute',
                        top: '20px',
                        left: '20px',
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                        borderRadius: '2rem',
                        opacity: 0.1,
                        zIndex: 0
                    }} />
                    <div style={{
                        width: '100%',
                        aspectRatio: '3/4',
                        background: 'var(--bg-tertiary)',
                        borderRadius: '2rem',
                        border: '1px solid var(--border-light)',
                        position: 'relative',
                        zIndex: 1,
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <img src="/about_profile.png" alt="Shahjahan Shah" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
