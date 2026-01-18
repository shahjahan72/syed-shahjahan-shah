import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
    Target, 
    Eye, 
    Award, 
    Users, 
    Clock, 
    Shield, 
    Printer, 
    Palette,
    CheckCircle,
    ArrowRight,
    Phone
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const AboutPage = () => {
    const stats = [
        { number: '10+', label: 'Years Experience' },
        { number: '5000+', label: 'Happy Clients' },
        { number: '25000+', label: 'Orders Delivered' },
        { number: '100%', label: 'Quality Guaranteed' },
    ];

    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To provide premium quality printing solutions at competitive prices while ensuring customer satisfaction through exceptional service and timely delivery.'
        },
        {
            icon: Eye,
            title: 'Our Vision',
            description: 'To become Pakistan\'s most trusted printing partner, known for innovation, quality, and reliability in every print we deliver.'
        },
        {
            icon: Award,
            title: 'Our Promise',
            description: 'We guarantee the highest quality materials, professional craftsmanship, and dedicated support from concept to completion.'
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: 'Select & Configure',
            description: 'Choose your product, select materials, quantity, and customize as needed.'
        },
        {
            step: '02',
            title: 'Upload Design',
            description: 'Upload your artwork or use our personalization tools to create your design.'
        },
        {
            step: '03',
            title: 'Review & Approve',
            description: 'We create a proof for your approval before production begins.'
        },
        {
            step: '04',
            title: 'Production',
            description: 'Your order goes into production with our state-of-the-art printing equipment.'
        },
        {
            step: '05',
            title: 'Quality Check',
            description: 'Every item is inspected to ensure it meets our quality standards.'
        },
        {
            step: '06',
            title: 'Delivery',
            description: 'Your order is carefully packaged and delivered to your doorstep.'
        }
    ];

    const whyChooseUs = [
        { icon: Printer, title: 'Latest Technology', desc: 'State-of-the-art printing equipment' },
        { icon: Palette, title: 'Color Accuracy', desc: 'Pantone certified color matching' },
        { icon: Clock, title: 'Fast Turnaround', desc: '3-5 business days standard delivery' },
        { icon: Shield, title: 'Quality Guarantee', desc: '100% satisfaction or money back' },
        { icon: Users, title: 'Expert Support', desc: 'Dedicated design assistance' },
        { icon: Award, title: 'Premium Materials', desc: 'Only the finest paper and inks' },
    ];

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-[#00A19D] to-[#008B87] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>
                
                <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl"
                    >
                        <span className="text-white/80 text-sm font-bold uppercase tracking-widest mb-4 block">About Us</span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Your Trusted <br />
                            <span className="italic font-serif">Printing Partner</span>
                        </h1>
                        <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl">
                            At {siteConfig.name}, we bring your ideas to life with precision printing and exceptional quality. From business cards to billboards, we deliver excellence in every print.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link 
                                to="/shop" 
                                className="bg-white text-[#00A19D] px-8 py-4 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
                            >
                                Explore Products
                            </Link>
                            <Link 
                                to="/contact" 
                                className="border-2 border-white text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-white hover:text-[#00A19D] transition-colors"
                            >
                                Get Quote
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-[#00A19D] mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission/Vision/Promise */}
            <section id="why-us" className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What Drives Us</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Our commitment to excellence is reflected in everything we do</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.15 }}
                                className="bg-white border border-gray-100 p-8 rounded-xl hover:shadow-xl transition-shadow"
                            >
                                <div className="w-14 h-14 bg-[#00A19D]/10 rounded-xl flex items-center justify-center mb-6">
                                    <value.icon className="w-7 h-7 text-[#00A19D]" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section id="process" className="py-20 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-[#00A19D] text-sm font-bold uppercase tracking-widest mb-4 block">How It Works</span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">From concept to delivery, we ensure a seamless experience</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {processSteps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative p-6 border border-gray-800 rounded-xl hover:border-[#00A19D]/50 transition-colors group"
                            >
                                <div className="text-5xl font-bold text-[#00A19D]/20 group-hover:text-[#00A19D]/40 transition-colors mb-4">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-gray-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-[#00A19D] text-sm font-bold uppercase tracking-widest mb-4 block">Why Choose Us</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Excellence in Every Print</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                We combine cutting-edge technology with skilled craftsmanship to deliver printing solutions that exceed expectations. Our commitment to quality and customer satisfaction sets us apart.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-6">
                                {whyChooseUs.map((item, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start gap-3"
                                    >
                                        <div className="w-10 h-10 bg-[#00A19D]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <item.icon className="w-5 h-5 text-[#00A19D]" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <img 
                                src="https://images.unsplash.com/photo-1586075010633-2445c9ff0330?q=80&w=800&auto=format&fit=crop"
                                alt="Printing Process"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-[#00A19D] text-white p-6 rounded-xl shadow-xl">
                                <div className="text-3xl font-bold">10+</div>
                                <div className="text-sm opacity-80">Years of Excellence</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#00A19D]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
                    <p className="text-xl text-white/90 mb-8">
                        Get in touch with our team for a free consultation and quote
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            to="/shop" 
                            className="bg-white text-[#00A19D] px-8 py-4 font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                        >
                            Browse Products <ArrowRight size={18} />
                        </Link>
                        <a 
                            href={`https://wa.me/${siteConfig.whatsapp.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] text-white px-8 py-4 font-bold uppercase tracking-wide hover:bg-[#128C7E] transition-colors inline-flex items-center gap-2"
                        >
                            <Phone size={18} /> WhatsApp Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
