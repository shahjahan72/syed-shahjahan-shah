import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../config/siteConfig';

const PrivacyPage = () => {
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
                        Privacy Policy
                    </h1>
                    <p className="text-white/80 max-w-2xl">
                        How we collect, use, and protect your personal information
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
                <div className="prose prose-lg max-w-none">
                    <section className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h2>
                        <p className="text-gray-600 font-medium mb-4"><strong>Last updated:</strong> January 2026</p>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">
                            {siteConfig.name} ("we", "our", "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website or services.
                        </p>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Information We Collect</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We may collect the following information:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Personal details such as name, phone number, email address, and delivery address</li>
                                    <li>Order details including product configurations, uploaded files, and pricing</li>
                                    <li>Payment-related references (we do <strong>not</strong> store full bank or card details)</li>
                                    <li>Communication data from WhatsApp, email, or contact forms</li>
                                    <li>Technical data such as IP address, browser type, and device information</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">2. How We Use Your Information</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Your information is used to:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Process and fulfill printing orders</li>
                                    <li>Communicate order status, proofs, and delivery updates</li>
                                    <li>Provide customer support and respond to inquiries</li>
                                    <li>Improve our services, pricing logic, and website functionality</li>
                                    <li>Comply with legal or regulatory requirements</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">3. File Uploads & Designs</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Uploaded designs and personalized content are used <strong>only</strong> for order fulfillment</li>
                                    <li>Files are stored securely and shared only with internal production teams</li>
                                    <li>We do not reuse, resell, or publicly display your designs without permission</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Data Protection</h3>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>We implement reasonable technical and organizational measures to protect your data</li>
                                    <li>Access to customer data is limited to authorized personnel only</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">5. Third-Party Services</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We may use third-party services for:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Payment processing (banks, wallets, COD partners)</li>
                                    <li>Delivery and logistics (courier companies)</li>
                                    <li>Website hosting and analytics</li>
                                </ul>
                                <p className="text-gray-600 mt-2">
                                    These third parties only receive information necessary to perform their services.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">6. Cookies</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Our website may use cookies to improve user experience, track sessions, and analyze traffic. You may disable cookies in your browser, but some features may not function properly.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">7. Your Rights</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    You may request:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2">
                                    <li>Access to your personal data</li>
                                    <li>Correction of incorrect information</li>
                                    <li>Deletion of data where legally permissible</li>
                                </ul>
                                <p className="text-gray-600 mt-2">
                                    Requests can be made via email or WhatsApp.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">8. Policy Updates</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    We may update this Privacy Policy from time to time. Changes will be posted on this page.
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

export default PrivacyPage;