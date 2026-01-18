import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CircularProgress = ({ percentage, label, delay = 0 }) => {
    const [progress, setProgress] = useState(0);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    setProgress(prev => {
                        if (prev >= percentage) {
                            clearInterval(interval);
                            return percentage;
                        }
                        return prev + 1;
                    });
                }, 20);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [isVisible, percentage, delay]);

    const circumference = 2 * Math.PI * 70;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay / 1000 }}
            className="flex flex-col items-center"
        >
            <div className="relative w-40 h-40">
                <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#E5E7EB"
                        strokeWidth="8"
                        fill="none"
                    />
                    {/* Progress circle */}
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="#00A19D"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-100"
                    />
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-black text-gray-900">{progress}%</span>
                </div>
            </div>
            <h3 className="mt-4 text-center font-bold text-gray-900 uppercase tracking-wide">
                {label}
            </h3>
        </motion.div>
    );
};

const WhatWeCanDo = () => {
    const services = [
        { percentage: 99, label: 'Business Cards & Stationery', delay: 0 },
        { percentage: 95, label: 'Banners & Signage', delay: 200 },
        { percentage: 90, label: 'Custom Packaging', delay: 400 },
        { percentage: 85, label: 'Wedding Cards', delay: 600 },
    ];

    return (
        <section className="bg-gray-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                            What we can do?
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            We offer a wide range of printing services to help you achieve your goals. Here are some of the things we can do for you. No matter what your printing needs may be, Printify Studio is here to help. Our team of experts is always on hand to answer your questions and provide support, so you can relax and know that your project is in good hands.
                        </p>
                        <Link
                            to="/contact"
                            className="inline-block px-8 py-4 bg-[#00A19D] text-white font-bold rounded-md hover:bg-[#008B87] transition-colors"
                        >
                            Get Quote
                        </Link>
                    </motion.div>

                    {/* Right - Progress Circles */}
                    <div className="grid grid-cols-2 gap-8">
                        {services.map((service, idx) => (
                            <CircularProgress
                                key={idx}
                                percentage={service.percentage}
                                label={service.label}
                                delay={service.delay}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhatWeCanDo;
