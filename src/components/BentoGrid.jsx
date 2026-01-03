import { ArrowUpRight, Github, Twitter, Linkedin, Star, Code } from 'lucide-react';

const Card = ({ children, className, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className={`glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-white/20 transition-colors ${className}`}
    >
        {children}
    </motion.div>
);

const BentoGrid = () => {
    return (
        <section className="px-6 md:px-20 max-w-7xl mx-auto py-20 relative z-10">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-4xl font-bold mb-12 tracking-tighter"
            >
                Selected Works & <span className="text-white/40">Playground</span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
                {/* Project 1 - Large */}
                <Card className="md:col-span-2 md:row-span-2 group relative overflow-hidden !p-0 border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                    <img
                        src="https://images.unsplash.com/photo-1481487532986-6e42bdec7d6d?q=80&w=2670&auto=format&fit=crop"
                        alt="Project"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="relative z-20 h-full flex flex-col justify-end p-8">
                        <h3 className="text-3xl font-bold mb-2 translate-y-4 group-hover:translate-y-0 transition-transform">E-Commerce Redesign</h3>
                        <p className="text-white/70 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all delay-75">A complete overhaul of a fashion retailer's online presence using Next.js and Shopify.</p>
                    </div>
                    <div className="absolute top-6 right-6 z-20 bg-white/10 p-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all hover:bg-white text-black translate-y-2 group-hover:translate-y-0">
                        <ArrowUpRight className="w-5 h-5 text-white group-hover:text-black" />
                    </div>
                </Card>

                {/* Socials */}
                <Card className="md:col-span-1 md:row-span-1" delay={0.1}>
                    <div className="flex flex-col h-full justify-between">
                        <h3 className="text-xl font-bold text-white/50">Connect</h3>
                        <div className="flex gap-4 items-center mt-4">
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white hover:text-black transition-colors"><Github className="w-6 h-6" /></a>
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-blue-400 hover:text-white transition-colors"><Twitter className="w-6 h-6" /></a>
                            <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="w-6 h-6" /></a>
                        </div>
                    </div>
                </Card>

                {/* Live Status - Replaces Now Playing */}
                <Card className="md:col-span-1 md:row-span-1 !p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20" delay={0.2}>
                    <div className="flex flex-col h-full justify-between">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            <h3 className="text-sm font-bold text-green-400 uppercase tracking-wider">Live Status</h3>
                        </div>
                        <div>
                            <p className="text-xl font-bold text-white mb-1">Accepting Orders</p>
                            <p className="text-xs text-white/50">Production Queue: <span className="text-green-400">Normal</span></p>
                        </div>
                    </div>
                </Card>

                {/* Skills / About */}
                <Card className="md:col-span-1 md:row-span-2 bg-gradient-to-br from-neon-purple/10 to-transparent" delay={0.3}>
                    <div className="flex flex-col h-full">
                        <div className="bg-neon-purple/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                            <Code className="text-neon-purple" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Stack</h3>
                        <ul className="space-y-3 text-white/70 flex-grow font-mono text-sm">
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-purple rounded-full" /> React & Next.js</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-purple rounded-full" /> TypeScript</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-purple rounded-full" /> Tailwind CSS</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-purple rounded-full" /> Node.js</li>
                            <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-neon-purple rounded-full" /> Three.js</li>
                        </ul>
                    </div>
                </Card>

                {/* Project 2 */}
                <Card className="md:col-span-2 md:row-span-1 group relative overflow-hidden bg-[#0A0A0A]" delay={0.2}>
                    <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/5 to-transparent" />
                    <div className="relative z-10 flex items-center justify-between h-full p-2">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-electric-blue/20 text-electric-blue text-xs font-bold px-2 py-1 rounded">2024</span>
                                <h3 className="text-2xl font-bold">AI Dashboard</h3>
                            </div>
                            <p className="text-white/60">Analytics platform with real-time data visualization.</p>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    );
};

export default BentoGrid;
