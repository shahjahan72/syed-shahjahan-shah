import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';
import { printingRules } from '../data/printingRules';

const RefundPage = () => {
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
                        Cancellation & Refund Policy
                    </h1>
                    <p className="text-white/80 max-w-2xl">
                        Our clear policy on cancellations and refunds for printing services
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Refund Policy</h2>
                        <p className="text-gray-600 font-medium mb-4"><strong>Last updated:</strong> January 2026</p>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">
                            Because our products are custom-made, refunds are subject to the conditions below.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Eligibility for Refunds</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Refunds may be issued if:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>The delivered product does not match the approved proof</li>
                                    <li>There is a verified manufacturing defect</li>
                                    <li>Incorrect quantity or material was delivered</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Non-Refundable Cases</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Refunds will <strong>not</strong> be issued if:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Errors exist in customer-approved artwork</li>
                                    <li>Color variations occur due to screen-to-print differences</li>
                                    <li>Orders are canceled after production has started</li>
                                    <li>Customer changes mind after approval</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Replacement Policy</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>In eligible cases, we may offer reprinting instead of a refund</li>
                                    <li>Replacement decisions are made after internal quality review</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Refund Process</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Refund requests must be submitted within <strong>48 hours</strong> of delivery</li>
                                    <li>Supporting images or evidence may be required</li>
                                    <li>Approved refunds are processed within <strong>7–10 working days</strong></li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Delivery & Courier Issues</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Damage caused during transit must be reported immediately</li>
                                    <li>Courier delays are not grounds for refunds unless agreed otherwise</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Contact for Refunds</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    For refund or dispute inquiries, contact us via:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Email: <a href="mailto:support@yourdomain.com" className="text-[#00A19D] hover:underline">support@yourdomain.com</a></li>
                                    <li>WhatsApp: {siteConfig.whatsapp.display}</li>
                                </ul>
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

export default RefundPage;