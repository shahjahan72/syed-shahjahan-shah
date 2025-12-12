import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp = () => {
    return (
        <motion.a
            href="https://wa.me/923481342505"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
                position: 'fixed',
                bottom: '2rem',
                right: '2rem',
                background: '#25D366',
                color: 'white',
                padding: '1rem',
                borderRadius: '50%',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                zIndex: 100,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
            }}
        >
            <MessageCircle size={32} />
        </motion.a>
    );
};

export default FloatingWhatsApp;
