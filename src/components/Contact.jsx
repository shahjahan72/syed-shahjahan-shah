import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Github, Instagram, Linkedin, User, MessageCircle } from 'lucide-react'; // User/MessageCircle/etc as placeholders if TikTok not available, or just generic link

const Contact = () => {
    return (
        <section id="contact" style={{ padding: '8rem 2rem', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Get in Touch</h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Have a project in mind? Let's build something together.</p>
                </motion.div>

                <div className="responsive-grid" style={{ gap: '4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mobile-center"
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent-primary)', flexShrink: 0 }}>
                                    <Mail />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Email</h4>
                                    <p style={{ color: 'var(--text-secondary)', wordBreak: 'break-all' }}>syedshahjahanshah73@gmail.com</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent-primary)', flexShrink: 0 }}>
                                    <Phone />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Phone</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>+92 (348) 1342505</p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
                                <div style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--accent-primary)', flexShrink: 0 }}>
                                    <MapPin />
                                </div>
                                <div style={{ textAlign: 'left' }}>
                                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Location</h4>
                                    <p style={{ color: 'var(--text-secondary)' }}>karachi,pakistan</p>
                                </div>
                            </div>

                            <div className="mobile-flex-center" style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <a href="https://github.com/shahjahan72" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--text-primary)', transition: 'transform 0.2s', display: 'flex' }}>
                                    <Github />
                                </a>
                                <a href="https://www.instagram.com/printify_studio_pk/" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--text-primary)', transition: 'transform 0.2s', display: 'flex' }}>
                                    <Instagram />
                                </a>
                                <a href="https://www.linkedin.com/in/shahjahan-shah/" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--text-primary)', transition: 'transform 0.2s', display: 'flex' }}>
                                    <Linkedin />
                                </a>
                                <a href="https://wa.me/923481342505" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: '#25D366', borderRadius: '50%', color: 'white', transition: 'transform 0.2s', display: 'flex' }}>
                                    <MessageCircle />
                                </a>
                                <a href="https://www.tiktok.com/@hsproduction2024" target="_blank" rel="noopener noreferrer" style={{ padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: '50%', color: 'var(--text-primary)', transition: 'transform 0.2s', display: 'flex' }}>
                                    {/* Using User icon as placeholder for TikTok if specific icon not in current lucide version, or use SVG directly */}
                                    <span style={{ fontWeight: 'bold' }}>TT</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div className="responsive-two-col">
                            <input
                                type="text"
                                placeholder="Name"
                                style={{
                                    padding: '1rem',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                style={{
                                    padding: '1rem',
                                    background: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border-light)',
                                    borderRadius: '0.5rem',
                                    color: 'white',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <textarea
                            rows={5}
                            placeholder="Message"
                            style={{
                                padding: '1rem',
                                background: 'var(--bg-tertiary)',
                                border: '1px solid var(--border-light)',
                                borderRadius: '0.5rem',
                                color: 'white',
                                outline: 'none',
                                resize: 'none'
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                padding: '1rem',
                                background: 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))',
                                color: 'white',
                                borderRadius: '0.5rem',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
