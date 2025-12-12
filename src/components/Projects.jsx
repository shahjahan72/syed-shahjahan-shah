import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ZoomIn, X } from 'lucide-react';
import { useState } from 'react';

const projects = [
    // Web Development
    {
        category: 'Web Development',
        title: 'Portfolio Website',
        description: 'A personal portfolio website design using React and Framer Motion.',
        tags: ['React.js', 'Frontend'],
        image: '/projects/ecommerce.png', // Keeping image but changing context
        link: '#',
        github: '#'
    },
    {
        category: 'Web Development',
        title: 'Restaurant Landing Page',
        description: 'Responsive landing page for a local restaurant with menu display.',
        tags: ['HTML/CSS', 'JavaScript'],
        image: '/projects/analytics.png', // Keeping image but changing context
        link: '#',
        github: '#'
    },

    // Graphic Design
    {
        category: 'Graphic Design',
        title: 'Publication & Brand Identity',
        description: 'Designed concepts for publications and marketing materials at Baghdadi Publisher.',
        tags: ['Print Design', 'Branding', 'Publication'],
        image: '/projects/branding.png',
        link: '#'
    },
    {
        category: 'Graphic Design',
        title: 'Social Media & Marketing',
        description: 'High-engagement managed visual content for diverse clients as a freelancer.',
        tags: ['Social Media', 'Freelance'],
        image: '/projects/social.png',
        link: '#'
    },

    // Digital Printing
    {
        category: 'Digital Printing',
        title: 'Premium Stationery',
        description: 'Designed and managed print production for business cards and corporate stationery.',
        tags: ['Print Design', 'Stationery'],
        image: '/projects/cards.png',
        link: '#'
    },
    {
        category: 'Digital Printing',
        title: 'Large Format Banners',
        description: 'End-to-end design and print handling for event banners and promotional flyers.',
        tags: ['Large Format', 'Marketing'],
        image: '/projects/banner.png',
        link: '#'
    }
];

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);
    const categories = ['All', 'Web Development', 'Graphic Design', 'Digital Printing'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.category === filter);

    return (
        <section id="projects" style={{ padding: '8rem 2rem', background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: 'var(--container-width)', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    style={{
                        fontSize: '2.5rem',
                        marginBottom: '2rem',
                        color: 'var(--text-primary)',
                        display: 'inline-block'
                    }}
                >
                    Our Portfolio
                </motion.h2>

                {/* Filter Controls */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                borderRadius: '50px',
                                background: filter === cat ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                                color: filter === cat ? 'white' : 'var(--text-secondary)',
                                border: '1px solid var(--border-light)',
                                transition: 'all 0.3s ease',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="responsive-grid"
                    style={{
                        gap: '2rem'
                    }}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            key={project.title}
                            onClick={() => setSelectedProject(project)}
                            style={{
                                background: 'var(--bg-tertiary)',
                                borderRadius: '1.5rem',
                                overflow: 'hidden',
                                border: '1px solid var(--border-light)',
                                position: 'relative',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease'
                            }}
                            whileHover={{ y: -5 }}
                        >
                            <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                                <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    src={project.image}
                                    alt={project.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                <div style={{
                                    position: 'absolute',
                                    top: '1rem',
                                    right: '1rem',
                                    background: 'rgba(0,0,0,0.7)',
                                    padding: '0.25rem 0.75rem',
                                    borderRadius: '20px',
                                    fontSize: '0.8rem',
                                    color: 'white',
                                    backdropFilter: 'blur(4px)'
                                }}>
                                    {project.category}
                                </div>
                            </div>

                            <div style={{ padding: '2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{project.title}</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>{project.description}</p>

                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                    {project.tags.map(tag => (
                                        <span key={tag} style={{
                                            padding: '0.25rem 0.75rem',
                                            background: 'var(--glass-bg)',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            color: 'var(--accent-primary)',
                                            border: '1px solid var(--glass-border)'
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button style={{
                                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                                        color: 'var(--text-primary)', fontWeight: '500',
                                        background: 'transparent', border: 'none', cursor: 'pointer'
                                    }}>
                                        View Details <ZoomIn size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Project Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                background: 'rgba(0,0,0,0.9)',
                                zIndex: 1000,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem'
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    background: 'var(--bg-secondary)',
                                    maxWidth: '900px',
                                    width: '100%',
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    border: '1px solid var(--border-light)'
                                }}
                            >
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    style={{
                                        position: 'absolute',
                                        top: '1rem',
                                        right: '1rem',
                                        background: 'rgba(0,0,0,0.5)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        padding: '0.5rem',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                >
                                    <X size={24} />
                                </button>

                                <div style={{ height: '400px', overflow: 'hidden' }}>
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{selectedProject.title}</h3>
                                    <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                                        {selectedProject.tags.map(tag => (
                                            <span key={tag} style={{
                                                padding: '0.25rem 0.75rem',
                                                background: 'var(--accent-primary)',
                                                borderRadius: '20px',
                                                fontSize: '0.8rem',
                                                color: 'white',
                                            }}>
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem', marginBottom: '2rem' }}>
                                        {selectedProject.description}
                                    </p>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        {selectedProject.category === 'Web Development' && (
                                            <a
                                                href="#"
                                                style={{
                                                    padding: '0.75rem 1.5rem',
                                                    background: 'white',
                                                    color: 'black',
                                                    borderRadius: '50px',
                                                    fontWeight: 600,
                                                    textDecoration: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem'
                                                }}
                                            >
                                                View Live <ExternalLink size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
