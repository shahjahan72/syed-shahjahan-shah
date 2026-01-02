import { motion } from 'framer-motion';

const techs = ["React", "Vite", "TailwindCSS", "Framer Motion", "Next.js", "TypeScript", "Node.js", "Three.js", "Figma", "GSAP"];

const TechMarquee = () => {
    return (
        <div className="w-full overflow-hidden py-6 bg-white/5 border-y border-white/5 relative z-10">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-12"
                    animate={{ x: "-50%" }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                >
                    {/* Tripled to ensure smooth seamless loop */}
                    {[...techs, ...techs, ...techs].map((tech, i) => (
                        <span key={i} className="text-2xl font-bold text-white/20 uppercase tracking-widest hover:text-neon-purple transition-colors cursor-default">
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default TechMarquee;
