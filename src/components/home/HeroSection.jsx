import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Printer } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="bg-white py-16 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="/assets/images/printing service.jpg"
                                alt="Printing Service"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-[#00A19D] text-white p-4 rounded-lg shadow-xl">
                            <div className="text-3xl font-black">15+</div>
                            <div className="text-sm">Years Experience</div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 bg-[#00A19D]/10 rounded-lg flex items-center justify-center mb-6">
                            <Printer className="text-[#00A19D]" size={32} />
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                            Printing <span className="text-[#00A19D]">Service</span>
                        </h1>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            At Printify Studio, we offer a full range of printing services to meet the needs of businesses and individuals alike. Whether you need a simple brochure or a large-scale trade show display, our team of experts will work with you to create a final product that meets your specific requirements.
                        </p>

                        <p className="text-gray-600 leading-relaxed mb-8">
                            Some of our most popular printing services include: <strong>Business Cards</strong> - High-quality, full-color business cards printed on premium paper stock. <strong>Brochures</strong> - Eye-catching brochures that showcase your products or services. <strong>Posters</strong> - Large-scale posters for indoor or outdoor use, perfect for trade shows or events. <strong>Banners</strong> - Durable, full-color banners that are perfect for promoting your brand.
                        </p>

                        <Link
                            to="/shop"
                            className="inline-flex items-center gap-2 text-gray-900 font-semibold uppercase tracking-wide hover:text-[#00A19D] transition-colors group"
                        >
                            <span className="w-8 h-[2px] bg-gray-900 group-hover:bg-[#00A19D] transition-colors"></span>
                            Get Instant Quote
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
