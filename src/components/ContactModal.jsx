import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-lg glass-card p-8 rounded-3xl relative overflow-hidden"
                >
                    {/* Decorative gradients */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-neon-purple/20 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-electric-blue/20 rounded-full blur-3xl pointer-events-none" />

                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-white/70 hover:text-white" />
                    </button>

                    <h3 className="text-3xl font-bold mb-2">Let's Talk</h3>
                    <p className="text-white/50 mb-8">Have a project in mind? I'm currently available for freelance work.</p>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider font-bold text-white/40 ml-2">Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Ahmed Raza"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-purple/50 transition-colors text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider font-bold text-white/40 ml-2">Email</label>
                            <input
                                type="email"
                                placeholder="e.g. ahmed.raza@example.com"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-purple/50 transition-colors text-white placeholder:text-white/20"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs uppercase tracking-wider font-bold text-white/40 ml-2">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Tell me about your project..."
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-neon-purple/50 transition-colors text-white placeholder:text-white/20 resize-none"
                            />
                        </div>

                        <button className="w-full bg-white text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neon-purple hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] mt-4">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
