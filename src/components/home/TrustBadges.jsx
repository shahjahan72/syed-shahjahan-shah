import React from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, HeadphonesIcon, CreditCard } from 'lucide-react';

const TrustBadges = () => {
    const badges = [
        {
            icon: Truck,
            title: 'Free Shipping',
            description: 'On orders above Rs. 5,000'
        },
        {
            icon: ShieldCheck,
            title: 'Quality Guarantee',
            description: '100% satisfaction or money back'
        },
        {
            icon: HeadphonesIcon,
            title: 'Extended Support',
            description: 'Fast WhatsApp support during business hours'
        },
        {
            icon: CreditCard,
            title: 'Secure Payment',
            description: 'Bank transfer & Cash on Delivery'
        }
    ];

    return (
        <section className="bg-gray-50 py-8 border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {badges.map((badge, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-center gap-4"
                        >
                            <div className="w-12 h-12 bg-[#00A19D]/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <badge.icon className="text-[#00A19D]" size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{badge.title}</h4>
                                <p className="text-xs text-gray-500">{badge.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
