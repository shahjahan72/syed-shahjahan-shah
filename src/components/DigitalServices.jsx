import React from 'react';
import { motion } from 'framer-motion';
import { Code2, PenTool, Share2, ArrowRight } from 'lucide-react';

const services = [
    {
        icon: <Code2 size={32} />,
        title: "Website Development",
        description: "Custom, high-performance websites built with React, Next.js, and modern tech. From portfolios to e-commerce.",
        tags: ["React", "Landing Pages", "E-commerce"],
        color: "text-neon-purple",
        bg: "bg-neon-purple/10",
        border: "hover:border-neon-purple/50"
    },
    {
        icon: <Share2 size={32} />,
        title: "Social Media Management",
        description: "Grow your brand presence on Instagram, Facebook, and LinkedIn with strategic content and engagement.",
        tags: ["Content Strategy", "Ads", "Growth"],
        color: "text-electric-blue",
        bg: "bg-electric-blue/10",
        border: "hover:border-electric-blue/50"
    },
    {
        icon: <PenTool size={32} />,
        title: "Graphic Design",
        description: "Logo design, branding kits, and social media posts that make your business stand out visually.",
        tags: ["Branding", "Logos", "UI/UX"],
        color: "text-neon-green",
        bg: "bg-neon-green/10",
        border: "hover:border-neon-green/50"
    }
];

const DigitalServices = () => {

    const handleConsult = (serviceName) => {
        const message = `Hi, I'm interested in your *${serviceName}* service. I'd like to discuss a project.`;
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    };

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Digital Services</h2>
                <p className="text-white/60 max-w-2xl mx-auto">
                    Beyond printing, I help businesses build their digital identity.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className={`bg-white/5 border border-white/10 p-8 rounded-3xl transition-all duration-300 ${service.border} group`}
                    >
                        <div className={`w-16 h-16 rounded-2xl ${service.bg} ${service.color} flex items-center justify-center mb-6`}>
                            {service.icon}
                        </div>

                        <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                        <p className="text-white/60 mb-6 leading-relaxed">
                            {service.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {service.tags.map((tag, i) => (
                                <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/50 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <button
                            onClick={() => handleConsult(service.title)}
                            className="w-full py-4 rounded-xl border border-white/10 font-bold hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 group-hover:border-transparent"
                        >
                            Consult on WhatsApp <ArrowRight size={16} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default DigitalServices;
