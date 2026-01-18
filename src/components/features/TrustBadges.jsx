import React from 'react';
import { Truck, RefreshCw, Headphones, FlaskConical } from 'lucide-react';

const TrustBadges = () => {
    const features = [
        {
            icon: Truck,
            title: "Nationwide Delivery",
            desc: "Fast & secure shipping across all major cities in Pakistan."
        },
        {
            icon: RefreshCw,
            title: "Resolution Promise",
            desc: "100% reprint guarantee if any error is found on our end."
        },
        {
            icon: Headphones,
            title: "Expert Consultation",
            desc: "Direct access to our design team via WhatsApp for queries."
        },
        {
            icon: FlaskConical,
            title: "Premium Materials",
            desc: "Sourced globally, printed locally with state-of-the-art tech."
        }
    ];

    return (
        <section className="py-24 bg-[#F5F5F5] border-t border-brand-black/5">
            <div className="max-w-[1400px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex gap-6 group cursor-default">
                            <div className="w-12 h-12 flex-shrink-0 border border-brand-black/10 rounded-full flex items-center justify-center text-brand-black group-hover:bg-brand-black group-hover:text-white transition-all duration-500">
                                <feature.icon size={20} strokeWidth={1} />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold uppercase tracking-widest mb-2">{feature.title}</h4>
                                <p className="text-xs text-brand-black/50 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
