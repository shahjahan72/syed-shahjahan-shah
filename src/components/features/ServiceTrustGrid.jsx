import React from 'react';
import { Truck, ShieldCheck, Headphones, Zap } from 'lucide-react';

const ServiceTrustGrid = () => {
    const services = [
        {
            icon: <Truck size={24} strokeWidth={1} />,
            title: "Nationwide Delivery",
            desc: "Secure shipping across Pakistan via premium couriers."
        },
        {
            icon: <ShieldCheck size={24} strokeWidth={1} />,
            title: "Quality Guarantee",
            desc: "If the print quality isn't perfect, we'll redo it for free."
        },
        {
            icon: <Zap size={24} strokeWidth={1} />,
            title: "Rapid Lead Times",
            desc: "Most custom orders produced and shipped in 3-5 days."
        },
        {
            icon: <Headphones size={24} strokeWidth={1} />,
            title: "Expert Support",
            desc: "Direct access to design specialists on WhatsApp."
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-20 border-y border-black/5">
            {services.map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 bg-black/[0.02] rounded-full text-brand-black/60 mb-2">
                        {s.icon}
                    </div>
                    <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black">{s.title}</h4>
                    <p className="text-[9px] text-brand-black/40 uppercase tracking-widest leading-relaxed max-w-[180px]">
                        {s.desc}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ServiceTrustGrid;
