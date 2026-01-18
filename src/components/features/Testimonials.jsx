import React from 'react';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            text: "The quality of the wedding cards was absolutely stunning. The gold foil details were precise and the velvet box felt incredibly premium.",
            author: "Sarah Ahmed",
            role: "Wedding Client"
        },
        {
            text: "PRNT handled our entire corporate rebranding. From visiting cards to office branding, everything was delivered on time and looked professional.",
            author: "Omer F.",
            role: "CEO, TechFlow"
        },
        {
            text: "Finally a printing service in Pakistan that understands modern aesthetics. The panaflex print resolution was sharp and vibrant.",
            author: "Ali Raza",
            role: "Creative Director"
        }
    ];

    return (
        <section className="py-32 bg-brand-white relative overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 text-center">
                <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-brand-black/30 mb-8 block">Client Stories</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-24">Trusted by Visionaries</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {reviews.map((review, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <Quote size={24} className="opacity-10 mb-8 rotate-180" />
                            <p className="text-sm leading-8 text-brand-black/70 mb-8 font-medium">"{review.text}"</p>
                            <div>
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{review.author}</h4>
                                <span className="text-[9px] font-bold uppercase tracking-widest text-brand-black/30 block">{review.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
