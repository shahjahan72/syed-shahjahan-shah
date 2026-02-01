import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const ContactPage = () => {
    const [activeTab, setActiveTab] = useState('email');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const tabs = [
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'address', label: 'Address', icon: MapPin },
        { id: 'whatsapp', label: 'Whatsapp', icon: Phone },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = `Name: ${formData.name}%0AEmail: ${formData.email}%0ASubject: ${formData.subject}%0AMessage: ${formData.message}`;
        window.open(`https://wa.me/${siteConfig.whatsapp.number}?text=${message}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Banner */}
            <div className="relative h-64 bg-gray-900 overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1470&auto=format&fit=crop"
                    alt="Contact Us"
                    className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-black"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-white/80"
                    >
                        Home | Contact Us
                    </motion.p>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                {/* Intro Text */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-gray-600 mb-12 max-w-3xl mx-auto"
                >
                    We are dedicated to providing the best printing services and customer support possible. If you have any questions or comments, we would love to hear from you.
                </motion.p>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex rounded-lg overflow-hidden border border-gray-200">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-8 py-4 font-semibold transition-all ${activeTab === tab.id
                                        ? tab.id === 'email' ? 'bg-white text-gray-900 border-b-2 border-gray-900'
                                            : tab.id === 'address' ? 'bg-gradient-to-r from-[#00A19D] to-[#00C9A7] text-white'
                                                : 'bg-gradient-to-r from-[#00C9A7] to-[#00E5CC] text-white'
                                        : 'bg-white text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <tab.icon size={18} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Content */}
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-50 rounded-lg p-8 mb-12"
                >
                    {activeTab === 'email' && (
                        <div className="space-y-3">
                            <p className="text-gray-700">
                                <strong>General Inquiries:</strong> {siteConfig.contact.email}
                            </p>
                            <p className="text-gray-700">
                                <strong>Support:</strong> support@yourdomain.com
                            </p>
                        </div>
                    )}
                    {activeTab === 'address' && (
                        <div className="space-y-3">
                            <p className="text-gray-700">
                                <strong>Main Office:</strong> {siteConfig.contact.address}
                            </p>
                            <p className="text-gray-700">
                                <strong>Working Hours:</strong> Mon-Sat, 10:00 AM - 8:00 PM
                            </p>
                        </div>
                    )}
                    {activeTab === 'whatsapp' && (
                        <div className="space-y-3">
                            <p className="text-gray-700">
                                <strong>WhatsApp:</strong> {siteConfig.whatsapp.display}
                            </p>
                            <a
                                href={`https://wa.me/${siteConfig.whatsapp.number}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                            >
                                Chat Now on WhatsApp
                            </a>
                        </div>
                    )}
                </motion.div>

                {/* Contact Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                            <input
                                type="text"
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                placeholder="What is this about?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                            <textarea
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all resize-none"
                                placeholder="Your message..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[#00A19D] text-white font-bold rounded-lg hover:bg-[#008B87] transition-colors"
                        >
                            <Send size={18} />
                            Send Message
                        </button>
                    </motion.form>

                    {/* Map Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-200 rounded-lg overflow-hidden h-[400px] lg:h-auto"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462118.02491053584!2d66.98609955!3d25.19298565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%2C%20Karachi%20City%2C%20Sindh%2C%20Pakistan!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Location Map"
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
