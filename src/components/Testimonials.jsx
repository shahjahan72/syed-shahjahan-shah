import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Bilal Ahmed",
            role: "Marketing Manager",
            text: "Printify Studio saved our event! We needed 500 PVC cards urgently and they delivered in 2 days. The quality is just like bank cards. Highly recommended!",
            rating: 5,
            location: "Karachi"
        },
        {
            name: "Sana Mir",
            role: "Wedding Planner",
            text: "Absolutely in love with the 'Luxury Box Series' wedding cards. My clients were amazed by the finishing. The prices are also very competitive compared to Saddar market.",
            rating: 5,
            location: "Lahore"
        },
        {
            name: "TechStart Hub",
            role: "Software House",
            text: "Got our office branding done (Wall wraps + Glass frosting). The team was professional, clean, and the UV print quality on the wall wraps is stunning.",
            rating: 5,
            location: "Islamabad"
        }
    ];

    return (
        <section className="py-20 relative bg-black/40">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black mb-4">What Customers Say</h2>
                    <p className="text-white/50 max-w-xl mx-auto">
                        Real feedback from businesses and individuals across Pakistan who trust us with their printing needs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-8 rounded-3xl relative"
                        >
                            <Quote className="absolute top-8 right-8 text-white/10" size={40} />

                            <div className="flex gap-1 text-yellow-500 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i}>★</span>
                                ))}
                            </div>

                            <p className="text-white/80 mb-8 leading-relaxed">"{review.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-neon-purple to-electric-blue flex items-center justify-center font-bold text-lg">
                                    {review.name[0]}
                                </div>
                                <div>
                                    <div className="font-bold">{review.name}</div>
                                    <div className="text-xs text-white/40">{review.role} • {review.location}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
