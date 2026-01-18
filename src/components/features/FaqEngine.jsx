import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FaqEngine = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "How long does production take?",
            answer: "Standard production for custom prints (Panaflex, Vinyl, Stationery) takes 2-3 working days. For Branding Packages and Wedding Cards, it typically takes 5-7 working days after design approval."
        },
        {
            question: "Do you offer custom sizes?",
            answer: "Yes, we specialize in custom sizes for all large format items. You can enter your specific dimensions (Width x Height) in Feet on the product page, and our pricing engine will calculate the cost instantly."
        },
        {
            question: "What file formats do you accept?",
            answer: "We prefer high-resolution vector files (AI, EPS, PDF) for the best results. However, we also accept high-resolution JPG and PNG files for certain products. Our 'Proofing Mode' ensures we review every file before printing."
        },
        {
            question: "How do I receive my order?",
            answer: "We offer nationwide delivery across Pakistan via Leopard, TCS, or Trax. Local orders in Karachi can also be picked up from our studio or delivered via Indriver/Bykea for faster access."
        },
        {
            question: "Can I see a sample before bulk printing?",
            answer: "For large corporate orders or wedding cards, we provide digital proofs for approval. Physical samples can be arranged for a fee which is adjusted if the full order is placed."
        }
    ];

    return (
        <section className="py-0">
            <div className="flex flex-col md:flex-row gap-20">
                <div className="md:w-1/3">
                    <span className="text-brand-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block">Support Desk</span>
                    <h2 className="text-5xl font-serif text-brand-black mb-8 leading-tight">Common Concierge Inquiries</h2>
                    <p className="text-black/40 text-sm leading-relaxed max-w-sm">Every bespoke project is unique. Our studio team is also available live on WhatsApp for complex specifications.</p>
                </div>
                <div className="md:w-2/3 space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-black/5 last:border-0 overflow-hidden">
                            <button
                                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                                className="w-full flex items-center justify-between py-8 text-left group"
                            >
                                <span className={`text-lg font-serif transition-colors ${activeIndex === i ? 'text-brand-accent' : 'text-brand-black group-hover:text-brand-accent'}`}>
                                    {faq.question}
                                </span>
                                <div className={`transition-transform duration-500 ${activeIndex === i ? 'rotate-180' : ''}`}>
                                    {activeIndex === i ? <Minus size={20} strokeWidth={1} /> : <Plus size={20} strokeWidth={1} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                                    >
                                        <div className="pb-10 pt-2 text-black/50 text-sm leading-relaxed max-w-2xl">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqEngine;
