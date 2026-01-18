import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const MiniCart = () => {
    const { cart, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    const variants = {
        open: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
        closed: { x: '100%', transition: { type: 'spring', damping: 25, stiffness: 200 } }
    };

    const overlayVariants = {
        open: { opacity: 1 },
        closed: { opacity: 0 }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={overlayVariants}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-brand-black/40 backdrop-blur-sm z-[100]"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={variants}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex items-center justify-between border-b border-brand-black/5">
                            <h2 className="text-xl font-serif">Shopping Bag ({cart.length})</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-brand-black/5 rounded-full transition-colors"
                            >
                                <X size={20} strokeWidth={1.5} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            {cart.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                                    <div className="w-16 h-16 bg-brand-black/5 rounded-full flex items-center justify-center">
                                        <ShoppingBag size={24} className="text-brand-black/20" strokeWidth={1.5} />
                                    </div>
                                    <p className="text-sm tracking-widest uppercase text-brand-black/40 font-bold">Your bag is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-[10px] font-bold tracking-[0.2em] uppercase underline underline-offset-8 decoration-brand-black/10 hover:decoration-brand-black transition-all"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cart.map((item, index) => (
                                    <div key={index} className="flex gap-6 group">
                                        <div className="w-24 h-32 bg-brand-white overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image || (item.designMetadata?.image)}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between py-1">
                                            <div>
                                                <div className="flex justify-between items-start mb-1">
                                                    <h3 className="text-sm font-bold tracking-tight">{item.title}</h3>
                                                    <button
                                                        onClick={() => removeFromCart(index)}
                                                        className="text-brand-black/20 hover:text-brand-black transition-colors"
                                                    >
                                                        <Trash2 size={14} strokeWidth={1.5} />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] tracking-widest uppercase text-brand-black/40 font-bold">
                                                    {item.selectedPackage ? `Package: ${item.selectedPackage.name}` : (item.selectedMaterial?.name || 'Standard')}
                                                </p>
                                                {item.selectedQuantity && (
                                                    <p className="text-[10px] tracking-widest uppercase text-brand-black/40 font-bold mt-1">
                                                        Qty: {item.selectedQuantity.label || item.selectedQuantity.value}
                                                    </p>
                                                )}
                                                {item.designMode === 'personalize' && item.personalization && (
                                                    <p className="text-[9px] font-bold text-brand-accent uppercase mt-2">
                                                        Personalized: "{item.personalization.text}"
                                                    </p>
                                                )}
                                                {item.designMode === 'upload' && item.file && (
                                                    <p className="text-[9px] font-bold text-brand-accent uppercase mt-2">
                                                        Artwork: {item.file}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="text-sm font-medium">
                                                Rs. {item.totalPrice?.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cart.length > 0 && (
                            <div className="p-8 border-t border-brand-black/5 space-y-6">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black/40">Subtotal</span>
                                    <span className="text-2xl font-serif">Rs. {cartTotal.toLocaleString()}</span>
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <Link
                                        to="/checkout"
                                        onClick={() => setIsCartOpen(false)}
                                        className="w-full bg-brand-black text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase flex items-center justify-center gap-2 hover:bg-brand-accent transition-colors"
                                    >
                                        Proceed to Checkout <ArrowRight size={14} />
                                    </Link>
                                </div>
                                <p className="text-[9px] text-center text-brand-black/30 tracking-wider">
                                    Shipping and taxes calculated at checkout
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MiniCart;
