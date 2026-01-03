import { motion } from 'framer-motion';

const About = () => {
    return (
        <section className="px-6 md:px-20 max-w-7xl mx-auto py-20 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tighter">
                    More than just <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-electric-blue">code.</span>
                </h2>
                <div className="space-y-6 text-white/70 text-lg font-light leading-relaxed">
                    <p>
                        I'm a self-taught developer and designer based in Karachi with a passion for building digital products that look as good as they feel.
                    </p>
                    <p>
                        My journey started with simple HTML pages and evolved into complex, interactive web applications. I obsess over micro-interactions, clean architectural patterns, and pushing the browser to its limits.
                    </p>
                    <p>
                        When I'm not coding, you can find me exploring new coffee spots, gaming, or experimenting with 3D art in Blender.
                    </p>
                </div>

                <div className="mt-8 flex gap-8">
                    <div>
                        <h4 className="text-3xl font-bold text-white">3+</h4>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">Years Exp.</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-white">20+</h4>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">Projects</p>
                    </div>
                    <div>
                        <h4 className="text-3xl font-bold text-white">100%</h4>
                        <p className="text-xs uppercase tracking-widest text-white/40 mt-1">Commitment</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
            >
                <div className="aspect-square rounded-full bg-gradient-to-tr from-neon-purple/20 to-electric-blue/20 blur-3xl absolute inset-0 -z-10 animate-pulse" />
                <div className="glass-card aspect-square rounded-[2rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 ease-out border-white/10">
                    <img
                        src="/assets/profile.jpg"
                        alt="Workspace"
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity hover:scale-105 duration-700"
                    />
                </div>
            </motion.div>
        </section>
    );
};

export default About;
