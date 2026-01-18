import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const FloatingWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-10 left-10 z-50 flex flex-col items-start gap-4">
            {/* Expanded Menu */}
            {isOpen && (
                <div className="bg-white p-6 rounded-lg soft-shadow w-72 origin-bottom-left animate-in fade-in slide-in-from-bottom-4">
                    <div className="flex justify-between items-start mb-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A]">Support</h4>
                        <button onClick={() => setIsOpen(false)} className="text-[#1A1A1A]/40 hover:text-[#1A1A1A]">
                            <X size={16} />
                        </button>
                    </div>
                    <p className="text-xs text-[#1A1A1A]/60 mb-6 leading-relaxed">
                        Need help with a custom order or design? Our team is available Mon-Sat, 10am - 8pm.
                    </p>
                    <a
                        href={`https://wa.me/${siteConfig.whatsapp.number}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white py-3 px-4 rounded w-full transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        <MessageCircle size={16} />
                        Chat on WhatsApp
                    </a>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full flex items-center justify-center soft-shadow transition-all group hover:scale-110"
            >
                <div className="relative">
                    <MessageCircle size={24} fill="currentColor" strokeWidth={0} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-[#25D366]"></span>
                </div>
            </button>
        </div>
    );
};

export default FloatingWidget;
