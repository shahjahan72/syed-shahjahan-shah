import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, ArrowLeft, ShoppingBag, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { siteConfig } from '../../config/siteConfig';

const Checkout = () => {
    const { cart, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', phone: '', address: '', province: '', transactionId: '' });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        const orderItems = cart.map((item, i) => {
            const designId = item.designMetadata ? item.designMetadata.id : item.productID;
            let details = `📦 *${item.title}*`;
            details += `%0A   🆔 ID: ${designId}`;
            if (item.unit === 'sqft' && item.dimensions) {
                details += `%0A   📏 Size: ${item.dimensions.width || 0}x${item.dimensions.height || 0} ft%0A   🔢 Copies: ${item.selectedQuantity?.value || item.quantity || 1}`;
            } else {
                details += `%0A   🔢 Quantity: ${item.selectedQuantity?.label || item.selectedQuantity?.value || item.quantity || 1}`;
            }
            if (item.weddingDetails) {
                details += `%0A   📝 *Wedding:*`;
                if (item.weddingDetails.groom) details += ` Dulha: ${item.weddingDetails.groom},`;
                if (item.weddingDetails.bride) details += ` Dulhan: ${item.weddingDetails.bride}`;
            }
            if (item.selectedPackage) {
                details += `%0A   📦 *Package:* ${item.selectedPackage.name}`;
            }
            if (item.designMode === 'personalize' && item.personalization) {
                details += `%0A   ✏️ *Personalize:* "${item.personalization.text}" (${item.personalization.logoPosition})`;
            }
            if (item.designMode === 'upload' && item.file) {
                details += `%0A   📎 *File:* Attached (${item.file})`;
            }
            details += `%0A   💰 Price: Rs. ${item.totalPrice.toLocaleString()}`;
            return details;
        }).join('%0A-----------------------------%0A');

        const message = `🔔 *New Order: ${siteConfig.name}* %0A%0A👤 *Customer:* ${formData.name}%0A📍 *Address:* ${formData.address}, ${formData.province}%0A📱 *Contact:* ${formData.phone}%0A%0A${orderItems}%0A%0A🚚 *Delivery Fee:* Rs. ${siteConfig.fees.delivery}%0A💰 *Grand Total: Rs. ${(cartTotal + siteConfig.fees.delivery).toLocaleString()}*%0A%0A💳 *Transaction ID:* ${formData.transactionId || 'Not provided'}%0A%0A_Please confirm this order._`;

        window.open(`https://wa.me/${siteConfig.whatsapp.number}?text=${message}`, '_blank');

        setTimeout(() => {
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-brand-white flex items-center justify-center p-6 text-center">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-16 soft-shadow max-w-lg w-full">
                    <div className="flex justify-center mb-10">
                        <div className="w-20 h-20 bg-brand-black text-white rounded-full flex items-center justify-center">
                            <CheckCircle size={40} strokeWidth={1} />
                        </div>
                    </div>
                    <h2 className="text-4xl font-serif mb-6 text-brand-black">Order Placed</h2>
                    <p className="text-brand-black/40 text-sm leading-relaxed mb-12">
                        Thank you for your order, {formData.name}. <br />
                        We have initiated the confirmation on WhatsApp. Our team will reach out shortly to finalize the design assets.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full bg-brand-black text-white py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-accent transition-colors"
                    >
                        Return to Collection
                    </button>
                </motion.div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-brand-white pt-48 px-6 text-center">
                <ShoppingBag size={48} strokeWidth={1} className="mx-auto mb-8 opacity-20" />
                <h2 className="text-3xl font-serif mb-10">Your bag is empty</h2>
                <Link to="/">
                    <button className="bg-brand-black text-white px-12 py-5 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-brand-accent transition-colors">Start Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-white pt-32 pb-40 px-6 max-w-[1400px] mx-auto">
            <div className="flex items-center justify-between mb-20 border-b border-brand-black/5 pb-10">
                <div>
                    <span className="text-[10px] tracking-[0.4em] uppercase text-brand-black/30 font-bold mb-4 block">Secure Checkout</span>
                    <h1 className="text-5xl font-serif tracking-tight">Order Details</h1>
                </div>
                <Link to="/" className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30 hover:text-brand-black transition-colors flex items-center gap-2">
                    <ArrowLeft size={16} /> Continue Selection
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                {/* Summary & Payment */}
                <div className="lg:col-span-5 space-y-16">
                    <section>
                        <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black/40 mb-10 border-b border-brand-black/5 pb-4">01. Bag Summary</h3>
                        <div className="space-y-10">
                            {cart.map((item, idx) => (
                                <div key={idx} className="flex gap-8 group">
                                    <div className="w-24 h-32 bg-white flex-shrink-0 overflow-hidden soft-shadow">
                                        <img src={item.previewImage || item.image || (item.designMetadata?.image)} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-2">
                                        <div>
                                            <h4 className="text-lg font-serif mb-1">{item.title}</h4>
                                            <p className="text-[9px] font-bold tracking-widest uppercase text-brand-black/30">
                                                {item.selectedPackage ? `Package: ${item.selectedPackage.name}` : (item.selectedMaterial?.name || 'Standard')} • {item.unit === 'sqft' && item.dimensions ? `${item.dimensions.width || 0}x${item.dimensions.height || 0} ft` : item.selectedQuantity?.label || item.selectedQuantity?.value || `${item.quantity || 1} Units`}
                                            </p>
                                            {item.designMode === 'personalize' && item.personalization && (
                                                <p className="text-[8px] font-bold tracking-wider text-brand-accent uppercase mt-2">
                                                    Personalize: "{item.personalization.text}"
                                                </p>
                                            )}
                                            {item.designMode === 'upload' && item.file && (
                                                <p className="text-[8px] font-bold tracking-wider text-brand-accent uppercase mt-2">
                                                    Artwork: {item.file}
                                                </p>
                                            )}
                                        </div>
                                        <span className="text-base font-medium">Rs. {(item.totalPrice || 0).toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-10 soft-shadow space-y-8">
                        <div className="flex justify-between items-center text-sm tracking-wide">
                            <span className="text-brand-black/40">Subtotal</span>
                            <span className="font-medium">Rs. {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm tracking-wide">
                            <span className="text-brand-black/40">Shipping</span>
                            <span className="font-medium">Rs. {siteConfig.fees.delivery}</span>
                        </div>
                        <div className="pt-8 border-t border-brand-black/5 flex justify-between items-end">
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black/60">Total</span>
                            <span className="text-4xl font-serif text-brand-black">Rs. {(cartTotal + siteConfig.fees.delivery).toLocaleString()}</span>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="flex items-center gap-3 text-brand-black">
                            <CreditCard size={18} strokeWidth={1.5} />
                            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase">02. Manual Payment</h3>
                        </div>
                        <div className="p-10 border border-brand-black/5 space-y-10">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40 block">{siteConfig.banking.meezan.bankName}</span>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium select-all text-brand-black">{siteConfig.banking.meezan.title}</p>
                                    <p className="text-xs text-brand-black/60 select-all">{siteConfig.banking.meezan.iban}</p>
                                </div>
                            </div>
                            <div className="space-y-4 pt-10 border-t border-brand-black/5">
                                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40 block">{siteConfig.banking.jazzcash.name}</span>
                                <p className="text-sm font-medium select-all text-brand-black">{siteConfig.banking.jazzcash.number}</p>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Form */}
                <div className="lg:col-span-7">
                    <form onSubmit={handleSubmit} className="space-y-16">
                        <section className="space-y-10">
                            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black/40 mb-10 border-b border-brand-black/5 pb-4">03. Recipient Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40">FullName</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-brand-black/10 py-4 focus:border-brand-black outline-none transition-colors text-sm font-medium text-brand-black placeholder:text-brand-black/20" />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40">WhatsApp Number</label>
                                    <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-transparent border-b border-brand-black/10 py-4 focus:border-brand-black outline-none transition-colors text-sm font-medium text-brand-black placeholder:text-brand-black/20" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40">Province/State</label>
                                    <select
                                        required
                                        value={formData.province}
                                        onChange={e => setFormData({ ...formData, province: e.target.value })}
                                        className="w-full bg-transparent border-b border-brand-black/10 py-4 focus:border-brand-black outline-none transition-colors text-sm font-medium text-brand-black cursor-pointer"
                                    >
                                        <option value="">Select Province</option>
                                        <option value="Punjab">Punjab</option>
                                        <option value="Sindh">Sindh</option>
                                        <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                                        <option value="Balochistan">Balochistan</option>
                                        <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                                        <option value="Azad Kashmir">Azad Kashmir</option>
                                        <option value="Islamabad Capital Territory">Islamabad Capital Territory</option>
                                    </select>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/40">Full Address</label>
                                    <input required type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-transparent border-b border-brand-black/10 py-4 focus:border-brand-black outline-none transition-colors text-sm font-medium text-brand-black placeholder:text-brand-black/20" />
                                </div>
                            </div>
                        </section>

                        <section className="space-y-10">
                            <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand-black/40 mb-10 border-b border-brand-black/5 pb-4">04. Payment Verification</h3>
                            <div className="space-y-4">
                                <label className="text-[10px] font-bold tracking-[0.2em] uppercase text-brand-black/30">Transaction ID (Optional)</label>
                                <input type="text" placeholder="REF-XXXXXX" value={formData.transactionId} onChange={e => setFormData({ ...formData, transactionId: e.target.value })} className="w-full bg-transparent border-b border-brand-black/10 py-4 focus:border-brand-black outline-none transition-colors text-sm font-medium placeholder:opacity-20" />
                            </div>
                            <div className="group relative border border-brand-black/5 p-16 text-center hover:border-brand-black transition-colors cursor-pointer bg-white">
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Truck size={24} strokeWidth={1} className="mx-auto mb-4 opacity-20 group-hover:opacity-100 transition-opacity" />
                                <span className="text-[10px] font-bold tracking-widest uppercase opacity-40 group-hover:opacity-100 transition-opacity">Upload Payment Receipt</span>
                            </div>
                        </section>

                        <div className="pt-20 space-y-10">
                            <div className="flex items-center gap-4 text-brand-black/30 uppercase tracking-[0.2em] text-[9px] font-bold">
                                <ShieldCheck size={14} /> Encrypted Transmission via WhatsApp Secure
                            </div>
                            <button type="submit" className="w-full bg-brand-black text-white py-8 text-[11px] font-bold tracking-[0.4em] uppercase hover:bg-brand-accent transition-colors">
                                Complete Commission
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
