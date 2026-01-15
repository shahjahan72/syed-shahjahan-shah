import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';

const OrderStatus = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const checkStatus = (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        // Simulation of API call
        setTimeout(() => {
            setLoading(false);
            // Mock logic: varies based on length of input for fun
            if (orderId.length < 5) {
                setStatus('not_found');
            } else if (orderId.endsWith('9')) {
                setStatus('delivered');
            } else if (orderId.endsWith('5')) {
                setStatus('shipped');
            } else {
                setStatus('processing');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-6xl font-black mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/20">
                    Track Your Order
                </h1>
                <p className="text-white/60 max-w-lg mx-auto">
                    Enter the Transaction ID or Name you used during checkout to see the current status of your printing order.
                </p>
            </motion.div>

            <motion.form
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1 }}
                onSubmit={checkStatus}
                className="w-full max-w-md relative mb-12"
            >
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple to-electric-blue rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <input
                        type="text"
                        placeholder="Enter Order ID / TID"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="relative w-full bg-black border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/30 transition-all font-mono"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                </div>
                <button
                    type="submit"
                    className="mt-4 w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                    disabled={loading}
                >
                    {loading ? (
                        <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    ) : (
                        <>Track Order <Package size={18} /></>
                    )}
                </button>
            </motion.form>

            <AnimatePresence mode='wait'>
                {status && (
                    <motion.div
                        key={status}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="w-full max-w-2xl"
                    >
                        {status === 'not_found' && (
                            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl flex items-center gap-4 text-red-200">
                                <AlertCircle />
                                <div>
                                    <h3 className="font-bold">Order Not Found</h3>
                                    <p className="text-sm opacity-80">We couldn't locate an order with that ID. Please check and try again.</p>
                                </div>
                            </div>
                        )}

                        {status === 'processing' && (
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Clock size={100} />
                                </div>
                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-bold rounded-full mb-4">PROCESSING</span>
                                    <h3 className="text-2xl font-bold mb-2">Order Confirmed</h3>
                                    <p className="text-white/60 mb-6">We have received your payment proof and are verifying details. Your design files are being prepped.</p>

                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-500 w-1/3 animate-pulse" />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
                                        <span>Confirmed</span>
                                        <span>Printing</span>
                                        <span>Shipped</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === 'shipped' && (
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Truck size={100} />
                                </div>
                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 bg-electric-blue/20 text-electric-blue text-xs font-bold rounded-full mb-4">ON THE WAY</span>
                                    <h3 className="text-2xl font-bold mb-2">Order Shipped</h3>
                                    <p className="text-white/60 mb-6">Your order is on its way via Leopard Courier. Expect delivery within 24-48 hours.</p>

                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-electric-blue w-3/4" />
                                    </div>
                                    <div className="flex justify-between text-xs text-white/40 mt-2 font-mono">
                                        <span>Confirmed</span>
                                        <span>Printing</span>
                                        <span className="text-electric-blue">Shipped</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {status === 'delivered' && (
                            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CheckCircle size={100} />
                                </div>
                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 bg-neon-green/20 text-neon-green text-xs font-bold rounded-full mb-4">COMPLETED</span>
                                    <h3 className="text-2xl font-bold mb-2">Delivered</h3>
                                    <p className="text-white/60 mb-6">Your order has been delivered successfully. Thank you for choosing us!</p>

                                    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                        <div className="h-full bg-neon-green w-full" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrderStatus;
