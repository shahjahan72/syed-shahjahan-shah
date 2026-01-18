import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, Star } from 'lucide-react';
import { packages } from '../data/products';

const PackagesPage = () => {
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);

    return (
        <div className="min-h-screen bg-brand-white selection:bg-brand-black selection:text-white">
            {/* Header */}
            <header className="border-b border-border-primary">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <Link
                        to="/shop"
                        className="flex items-center gap-2 text-brand-black/60 hover:text-brand-black transition-colors mb-6"
                    >
                        <ArrowLeft size={16} />
                        <span className="text-sm">Back to Shop</span>
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-serif text-brand-black mb-4">Branding Packages</h1>
                    <p className="text-brand-black/60 max-w-2xl">
                        Complete visual identity solutions designed specifically for startups and growing businesses.
                    </p>
                </div>
            </header>

            {/* Packages Grid */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.id}
                            className="border border-border-primary rounded-lg p-8 hover:shadow-lg transition-shadow bg-bg-secondary"
                        >
                            {pkg.status && (
                                <div className="mb-4">
                                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-widest text-white ${pkg.status === 'hot' ? 'bg-orange-500' :
                                            pkg.status === 'popular' ? 'bg-blue-500' :
                                                'bg-brand-accent'
                                        }`}>
                                        {pkg.status === 'hot' ? 'Best Value' :
                                            pkg.status === 'popular' ? 'Most Popular' :
                                                'New'}
                                    </span>
                                </div>
                            )}

                            <h2 className="text-2xl font-serif text-brand-black mb-2">{pkg.title}</h2>
                            <p className="text-brand-black/60 mb-6 text-sm leading-relaxed">
                                {pkg.description}
                            </p>

                            <div className="mb-6">
                                <span className="text-2xl font-bold text-brand-black">
                                    {pkg.priceRange}
                                </span>
                            </div>

                            {/* Package Plans */}
                            <div className="space-y-4 mb-8">
                                {pkg.packages.map((plan) => (
                                    <div
                                        key={plan.name}
                                        className={`border rounded-lg p-4 transition-all ${selectedPlan?.name === plan.name
                                                ? 'border-brand-accent bg-brand-accent/5'
                                                : 'border-brand-black/10'
                                            }`}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-bold text-brand-black">{plan.name}</h3>
                                            <span className="font-bold text-brand-black">Rs. {plan.price.toLocaleString()}</span>
                                        </div>
                                        <ul className="text-sm text-brand-black/70 space-y-2">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2">
                                                    <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* CTA */}
                            <Link
                                to={`/product/${pkg.id}`}
                                className="w-full bg-brand-black text-white py-3 text-center font-bold hover:bg-brand-accent transition-colors block"
                            >
                                Get a Quote
                            </Link>

                            {/* Delivery Info */}
                            <div className="mt-4 text-center">
                                <p className="text-xs text-brand-black/50">
                                    {pkg.options.material[0].name.replace('(', ' - ').replace(')', '')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Important Notes */}
                <div className="bg-bg-secondary rounded-lg p-6 mb-16 border border-border-primary">
                    <h3 className="font-bold text-brand-black mb-4">Important Information</h3>
                    <ul className="text-sm text-brand-black/70 space-y-2">
                        <li className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Standard 350gsm Card:</strong> Used for all business cards unless specified otherwise.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span><strong>Price Variation:</strong> Prices may vary based on specific paper choices and design complexity.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                            <span>All packages include high-resolution source files and professional design consultation.</span>
                        </li>
                    </ul>
                </div>

                {/* Comparison Table */}
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-brand-black text-white">
                                <th className="p-4 text-left font-bold">Feature</th>
                                <th className="p-4 text-center font-bold">Core Identity</th>
                                <th className="p-4 text-center font-bold">Growth Plan</th>
                                <th className="p-4 text-center font-bold">Enterprise Suite</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-brand-black/10">
                                <td className="p-4 font-medium">Business Cards</td>
                                <td className="p-4 text-center text-sm">1,000 (Standard)</td>
                                <td className="p-4 text-center text-sm">1,000 (Premium)</td>
                                <td className="p-4 text-center text-sm">1,000 (Specialty)</td>
                            </tr>
                            <tr className="border-b border-brand-black/10">
                                <td className="p-4 font-medium">Logo Design</td>
                                <td className="p-4 text-center text-sm">Basic (2 Concepts)</td>
                                <td className="p-4 text-center text-sm">Standard (With Guide)</td>
                                <td className="p-4 text-center text-sm">Premium (Full Identity)</td>
                            </tr>
                            <tr className="border-b border-brand-black/10">
                                <td className="p-4 font-medium">Stationery</td>
                                <td className="p-4 text-center text-sm">Letterhead (50)</td>
                                <td className="p-4 text-center text-sm">Envelopes + LH</td>
                                <td className="p-4 text-center text-sm">Full Corporate Kit</td>
                            </tr>
                            <tr className="border-b border-brand-black/10">
                                <td className="p-4 font-medium">Marketing</td>
                                <td className="p-4 text-center text-sm">Stickers</td>
                                <td className="p-4 text-center text-sm">Flyers / Standee</td>
                                <td className="p-4 text-center text-sm">Packaging + Signage</td>
                            </tr>
                            <tr>
                                <td className="p-4 font-medium">Delivery Time</td>
                                <td className="p-4 text-center text-sm">3 - 4 Working Days</td>
                                <td className="p-4 text-center text-sm">5 - 7 Working Days</td>
                                <td className="p-4 text-center text-sm">10 - 12 Working Days</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Features Section */}
                <div className="mt-24">
                    <h2 className="text-3xl font-serif text-brand-black mb-12 text-center">Why Choose Our Branding Packages?</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Star className="text-brand-accent" size={24} />
                            </div>
                            <h3 className="font-bold text-brand-black mb-2">Professional Quality</h3>
                            <p className="text-brand-black/60 text-sm">
                                All branding assets created by professional designers using industry-standard software.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-brand-accent" size={24} />
                            </div>
                            <h3 className="font-bold text-brand-black mb-2">Fast Delivery</h3>
                            <p className="text-brand-black/60 text-sm">
                                Receive your complete brand kit within 3-5 business days with express options available.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-brand-accent" size={24} />
                            </div>
                            <h3 className="font-bold text-brand-black mb-2">Complete Solution</h3>
                            <p className="text-brand-black/60 text-sm">
                                Everything you need to establish your brand presence across all digital and print media.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PackagesPage;