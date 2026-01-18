import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

const Footer = () => {
    return (
        <footer className="bg-[#111111] text-white pt-24 pb-12 px-6 border-t border-white/5">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
                {/* 01. About */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Printify Studio PK</h3>
                    <p className="text-sm leading-8 text-white/60">
                        We are a premium digital atelier specializing in bespoke printing solutions.
                        From handcrafted wedding stationery to high-impact corporate branding,
                        we blend modern technology with artisanal attention to detail.
                    </p>
                </div>

                {/* 02. Quick Links */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Quick Links</h3>
                    <ul className="space-y-4 text-sm text-white/60">
                        <li><Link to="/" className="hover:text-white transition-colors">Collection</Link></li>
                        <li><Link to="/order-status" className="hover:text-white transition-colors">Track Application</Link></li>
                        <li><Link to="/checkout" className="hover:text-white transition-colors">Checkout</Link></li>
                    </ul>
                </div>

                {/* 03. Policies */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Policies</h3>
                    <ul className="space-y-4 text-sm text-white/60">
                        <li><span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span></li>
                        <li><span className="cursor-pointer hover:text-white transition-colors">Shipping & Returns</span></li>
                        <li><span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span></li>
                    </ul>
                </div>

                {/* 04. Social & Connect */}
                <div className="space-y-8">
                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase opacity-50">Connect</h3>
                    <div className="flex gap-4">
                        <a href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                            <Instagram size={18} strokeWidth={1.5} />
                        </a>
                        <a href={siteConfig.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all rounded-full">
                            <Linkedin size={18} strokeWidth={1.5} />
                        </a>
                    </div>
                    <div className="pt-8 border-t border-white/10">
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-40 mb-4">Supported Payments</p>
                        <div className="flex gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
                            {/* Replaced specific icons with text representations to ensure no broken images, valid approach for now */}
                            <div className="px-3 py-1 bg-white/10 text-[9px] font-bold rounded">VISA</div>
                            <div className="px-3 py-1 bg-white/10 text-[9px] font-bold rounded">MC</div>
                            <div className="px-3 py-1 bg-white/10 text-[9px] font-bold rounded">JC</div>
                            <div className="px-3 py-1 bg-white/10 text-[9px] font-bold rounded">EP</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                    &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
                </p>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
                    Karachi, Pakistan
                </div>
            </div>
        </footer>
    );
};

export default Footer;
