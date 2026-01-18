import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { categories } from '../data/products';

const FooterPro = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div>
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#00A19D]">
                                <img 
                                    src="/assets/images/printify logo.jpg" 
                                    alt="Printify Studio Logo" 
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="text-xl font-black">
                                <span className="text-[#00A19D]">PRINTIFY</span>STUDIO
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Your trusted partner for all printing needs. We deliver high-quality printing services with fast turnaround and competitive prices across Pakistan.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00A19D] transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00A19D] transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00A19D] transition-colors">
                                <Linkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00A19D] transition-colors">
                                <Twitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-gray-400 hover:text-[#00A19D] transition-colors">Home</Link></li>
                            <li><Link to="/shop" className="text-gray-400 hover:text-[#00A19D] transition-colors">Print Shop</Link></li>
                            <li><Link to="/packages" className="text-gray-400 hover:text-[#00A19D] transition-colors">Branding Packages</Link></li>
                            <li><Link to="/faq" className="text-gray-400 hover:text-[#00A19D] transition-colors">FAQ</Link></li>
                            <li><Link to="/about" className="text-gray-400 hover:text-[#00A19D] transition-colors">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-[#00A19D] transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Categories</h4>
                        <ul className="space-y-3">
                            {categories.slice(0, 6).map(cat => (
                                <li key={cat.id}>
                                    <Link to={`/shop?category=${cat.id}`} className="text-gray-400 hover:text-[#00A19D] transition-colors">
                                        {cat.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-[#00A19D] flex-shrink-0 mt-1" />
                                <span className="text-gray-400">{siteConfig.contact.address}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-[#00A19D] flex-shrink-0" />
                                <a href={`tel:${siteConfig.whatsapp.display}`} className="text-gray-400 hover:text-[#00A19D] transition-colors">
                                    {siteConfig.whatsapp.display}
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-[#00A19D] flex-shrink-0" />
                                <a href={`mailto:${siteConfig.contact.email}`} className="text-gray-400 hover:text-[#00A19D] transition-colors">
                                    {siteConfig.contact.email}
                                </a>
                            </li>
                        </ul>

                        {/* WhatsApp CTA */}
                        <a
                            href={`https://wa.me/${siteConfig.whatsapp.number}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-colors"
                        >
                            <Phone size={18} />
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <Link to="/privacy" className="text-gray-400 hover:text-[#00A19D] transition-colors">Privacy Policy</Link>
                            <Link to="/terms" className="text-gray-400 hover:text-[#00A19D] transition-colors">Terms & Conditions</Link>
                            <Link to="/refund" className="text-gray-400 hover:text-[#00A19D] transition-colors">Cancellation Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterPro;
