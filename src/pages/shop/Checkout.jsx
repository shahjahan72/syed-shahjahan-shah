import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({ name: '', phone: '', address: '', city: '' });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare WhatsApp Message
        const orderItems = cart.map((item, i) => {
            let details = `*${i + 1}. ${item.title} (${item.productID || 'N/A'})* %0A   Material: ${item.selectedMaterial.name}`;

            if (item.weddingDetails) {
                details += `%0A   Event: ${item.weddingDetails.bride} & ${item.weddingDetails.groom}`;
                if (item.weddingDetails.date) details += ` on ${item.weddingDetails.date}`;
                if (item.weddingDetails.venue) details += ` at ${item.weddingDetails.venue}`;
                if (item.weddingDetails.family) details += `%0A   Extra/Family: ${item.weddingDetails.family}`;
            }

            details += ` %0A   Qty: ${item.unit === 'sqft' ? item.selectedQuantity.value + ' Copies (' + item.dimensions.width + 'x' + item.dimensions.height + ' ft)' : item.selectedQuantity.label}`;
            details += ` %0A   Price: Rs. ${item.totalPrice.toLocaleString()}`;
            return details;
        }).join('%0A%0A');

        const message = `*NEW ORDER ALERT* %0A%0A*Customer:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Address:* ${formData.address}, ${formData.city}%0A%0A*Order Details:*%0A${orderItems}%0A%0A*Total Amount:* Rs. ${cartTotal.toLocaleString()} %0A%0A_Please verify payment screenshot sent separately._`;

        // Open WhatsApp
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');

        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white/5 border border-white/10 p-10 rounded-3xl max-w-md w-full"
                >
                    <div className="flex justify-center mb-6">
                        <CheckCircle size={64} className="text-neon-green" color="#00ff9d" />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Order Placed!</h2>
                    <p className="text-white/60 mb-8">
                        Thank you for your order, {formData.name}. <br />
                        We have opened WhatsApp for you to send the details and payment proof.
                    </p>
                    <Link to="/shop">
                        <button className="px-8 py-3 bg-white text-black rounded-full font-bold">Continue Shopping</button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-40 px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <Link to="/shop">
                    <button className="px-8 py-3 bg-white text-black rounded-full font-bold">Go to Shop</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Order Summary */}
                <div>
                    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-6">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="space-y-4">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-start border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <div className="font-bold">{item.title}</div>
                                        <div className="text-sm text-white/50">
                                            {item.selectedMaterial.name} <br />
                                            {item.unit === 'sqft'
                                                ? `${item.dimensions.width}x${item.dimensions.height} ft | ${item.selectedQuantity.value} Copies`
                                                : item.selectedQuantity.label
                                            }
                                        </div>
                                        {item.file && <div className="text-xs text-electric-blue mt-1">File: {item.file}</div>}
                                    </div>
                                    <div className="font-mono">Rs. {item.totalPrice.toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/20 flex justify-between text-xl font-bold">
                            <span>Total</span>
                            <span>Rs. {cartTotal.toLocaleString()}</span>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-electric-blue/10 border border-electric-blue/30 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4 text-electric-blue">
                            <AlertCircle size={24} />
                            <h3 className="font-bold text-lg">Manual Payment Instructions</h3>
                        </div>
                        <div className="space-y-4 text-sm text-white/80">
                            <p>Please transfer the total amount to one of the following accounts:</p>
                            <div className="bg-black/20 p-4 rounded-xl font-mono text-xs md:text-sm">
                                <div className="mb-4">
                                    <span className="text-electric-blue font-bold block mb-1">Meezan Bank</span>
                                    <div className="text-white/80">Title: <span className="text-white select-all font-bold">SHAHJAHAN SHAH</span></div>
                                    <div className="text-white/80">Account: <span className="text-white select-all">10320113121281</span></div>
                                    <div className="text-white/80">IBAN: <span className="text-white select-all">PK98MEZN0010320113121281</span></div>
                                    <div className="text-white/50 text-[10px] mt-1">KHY E TANZEEM BRANCH</div>
                                </div>
                                <div>
                                    <span className="text-electric-blue font-bold block mb-1">JazzCash</span>
                                    <div className="text-white/80">Number: <span className="text-white select-all font-bold">03253368345</span></div>
                                </div>
                            </div>
                            <p>After transfer, take a screenshot and keep it ready for verification.</p>
                        </div>
                    </div>
                </div>

                {/* Shipping Form */}
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-8 rounded-3xl h-fit">
                    <h3 className="text-xl font-bold mb-6">Shipping Details</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Full Name</label>
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-electric-blue focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">WhatsApp Number</label>
                            <input
                                required
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-electric-blue focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">Address</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-electric-blue focus:outline-none h-24 resize-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-white/60 mb-2">City</label>
                            <input
                                required
                                type="text"
                                value={formData.city}
                                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:border-electric-blue focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-white/60 mb-2">Payment Proof (Screenshot)</label>
                            <div className="relative border border-dashed border-white/20 rounded-xl p-4 text-center hover:border-electric-blue/50 transition-colors cursor-pointer bg-black/20">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                                <span className="text-sm text-white/50">Upload Receipt / Screenshot</span>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button type="submit" className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neon-purple hover:text-white transition-all">
                                Confirm & Order via WhatsApp
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
