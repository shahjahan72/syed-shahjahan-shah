import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Truck } from 'lucide-react';

const OurProcess = () => {
    const steps = [
        {
            number: '01',
            title: 'Consultation',
            description: 'Our team of experts will work with you to understand your needs and goals, and help you choose the right products and printing options to meet your requirements.',
            icon: MessageSquare
        },
        {
            number: '02',
            title: 'Design and Proofing',
            description: 'Our talented in-house design team will create a custom design for you, or you can provide your own. Once the design is complete, we\'ll send you a proof for review and approval.',
            icon: PenTool
        },
        {
            number: '03',
            title: 'Printing and Delivery',
            description: 'Once you have approved the proof, we\'ll begin the printing process. Our state-of-the-art equipment and streamlined production methods ensure fast and efficient results.',
            icon: Truck
        }
    ];

    return (
        <section className="bg-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
                    >
                        Our Process
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-gray-600 max-w-2xl mx-auto"
                    >
                        At Printify Studio, we make the printing process easy and stress-free. Our 3-step process is designed to ensure that you get the results you need, quickly and efficiently.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="relative">
                    {/* Connecting Lines (Desktop) */}
                    <div className="hidden lg:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gray-200 z-0">
                        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-gray-300 transform rotate-45 -right-2"></div>
                        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-gray-300 transform rotate-45 -right-2"></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 relative z-10">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="text-center"
                            >
                                {/* Number Badge */}
                                <div className="relative inline-block mb-6">
                                    <div className="w-24 h-24 rounded-full bg-[#00A19D] flex items-center justify-center shadow-lg">
                                        <span className="text-4xl font-black text-white">{step.number}</span>
                                    </div>
                                    {/* Decorative blob */}
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00A19D]/20 rounded-full"></div>
                                    <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-[#00A19D]/30 rounded-full"></div>
                                </div>

                                {/* Arrow for mobile */}
                                {idx < steps.length - 1 && (
                                    <div className="lg:hidden flex justify-center my-4">
                                        <svg width="24" height="40" viewBox="0 0 24 40" fill="none" className="text-gray-300">
                                            <path d="M12 0V36M12 36L2 26M12 36L22 26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                )}

                                <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide mb-4">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurProcess;
