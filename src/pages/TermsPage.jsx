import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { printingRules } from '../data/printingRules';

const TermsPage = () => {
    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Banner */}
            <div className="relative h-64 bg-gradient-to-r from-[#00A19D] to-[#008B87] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <h1 className="text-4xl lg:text-5xl font-black mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-white/80 max-w-2xl">
                        Important policies and guidelines for using our printing services
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h2>
                        <p className="text-gray-600 font-medium mb-4"><strong>Last updated:</strong> January 2026</p>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">
                            By accessing or using {siteConfig.name}'s website or services, you agree to the following Terms of Service.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Services</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {siteConfig.name} provides custom printing, branding, and design-related services. All products are made to order based on customer-selected specifications.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Orders & Pricing</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Prices are displayed as ranges until all required options are selected</li>
                                    <li>Final prices are calculated based on materials, quantity, and configuration</li>
                                    <li>All prices are in PKR (Rs.) unless stated otherwise</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Artwork Responsibility</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Customers are responsible for ensuring that uploaded or approved designs are accurate</li>
                                    <li>Once a design is approved, {siteConfig.name} is not responsible for spelling, layout, or design errors</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Proof Approval</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Digital proofs may be provided for approval before production</li>
                                    <li>Production begins <strong>only after customer approval</strong></li>
                                    <li>Delays in approval may affect delivery timelines</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Turnaround & Delivery</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Standard production timelines are estimates, not guarantees</li>
                                    <li>Delivery times depend on courier services and location</li>
                                    <li>We are not responsible for delays caused by third-party logistics providers</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Payments</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Accepted payment methods include bank transfer, JazzCash, and Cash on Delivery (where applicable)</li>
                                    <li>Full or partial advance payment may be required for custom or bulk orders</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">7. Cancellations & Modifications</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Orders may be modified or canceled <strong>before proof approval</strong></li>
                                    <li>Once approved and sent to production, orders cannot be canceled or changed</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">8. Intellectual Property</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    All website content, branding, and designs created by {siteConfig.name} remain our intellectual property unless otherwise agreed
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">9. Limitation of Liability</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {siteConfig.name} shall not be liable for indirect, incidental, or consequential damages arising from the use of our services.
                                </p>
                            </div>
                        </div>
                    </section>

                    <div className="mt-8">
                        <Link 
                            to="/contact" 
                            className="inline-block px-6 py-3 bg-[#00A19D] text-white font-bold rounded-md hover:bg-[#008B87] transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsPage;