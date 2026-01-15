import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, ExternalLink } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-[#111] border border-white/10 w-full max-w-md rounded-3xl p-6 relative overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                    <p className="text-white/50 mb-8">Ready to start your project? Contact us via WhatsApp or Email.</p>

                    <div className="space-y-4">
                        {/* WhatsApp Block */}
                        <a
                            href={`https://wa.me/${siteConfig.whatsapp.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl hover:bg-green-500/20 transition-all group"
                        >
                            <div className="p-3 bg-green-500 rounded-full text-black">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-green-500">WhatsApp</h3>
                                <p className="text-sm text-white/60">{siteConfig.whatsapp.display}</p>
                            </div>
                            <ExternalLink size={18} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>

                        {/* Email Block */}
                        <a
                            href={`mailto:${siteConfig.contact.email}`}
                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group"
                        >
                            <div className="p-3 bg-white/10 rounded-full">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p className="text-sm text-white/60">{siteConfig.contact.email}</p>
                            </div>
                            <ExternalLink size={18} className="ml-auto opacity-50 group-hover:opacity-100" />
                        </a>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-xs text-white/30 uppercase tracking-widest font-mono">Based in {siteConfig.contact.address}</p>
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
