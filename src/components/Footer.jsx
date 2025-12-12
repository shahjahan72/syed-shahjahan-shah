const Footer = () => {
    return (
        <footer style={{
            padding: '2rem',
            background: 'var(--bg-primary)',
            borderTop: '1px solid var(--border-light)',
            textAlign: 'center',
            color: 'var(--text-secondary)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <p>&copy; {new Date().getFullYear()} Printfy Studio PK. All rights reserved.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>GitHub</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>Instagram</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>LinkedIn</a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>TikTok</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
