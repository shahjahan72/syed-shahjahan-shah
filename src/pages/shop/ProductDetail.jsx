import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, pricingConfig } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Upload, ShoppingCart, MessageCircle, Check, ArrowLeft, Ruler, AlertCircle, PenTool } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === id);

    // Form States
    const [material, setMaterial] = useState(null);
    const [quantityOption, setQuantityOption] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [customQty, setCustomQty] = useState(1);
    const [file, setFile] = useState(null);

    // Wedding Specific States
    const [weddingDetails, setWeddingDetails] = useState({ bride: '', groom: '', date: '', venue: '' });
    const [customWeddingDesignFile, setCustomWeddingDesignFile] = useState(null);

    // Pricing States
    const [price, setPrice] = useState(0);
    const [isSetupFeeApplied, setIsSetupFeeApplied] = useState(false);
    const [showBulkQuote, setShowBulkQuote] = useState(false);

    // Initialization
    useEffect(() => {
        if (product && product.options.material) {
            setMaterial(product.options.material[0]);
        }
        if (product && product.unit === 'fixed' && product.options.quantity) {
            setQuantityOption(product.options.quantity[0]);
        }
    }, [product]);

    // DYNAMIC PRICING ENGINE
    useEffect(() => {
        if (!product || !material) return;

        let total = 0;
        let setupFee = 0;
        let isQuote = false;

        // --- LOGIC 1: SQFT ITEMS ---
        if (product.unit === 'sqft') {
            const width = dimensions.width || 0;
            const height = dimensions.height || 0;
            const qty = customQty || 1;
            const areaPerItem = width * height;
            const totalArea = areaPerItem * qty;

            if (totalArea > 0) {
                if (totalArea > pricingConfig.thresholds.bulk) {
                    isQuote = true;
                } else {
                    let margin = pricingConfig.margins.small;
                    if (totalArea > pricingConfig.thresholds.medium) margin = pricingConfig.margins.large;
                    else if (totalArea > pricingConfig.thresholds.small) margin = pricingConfig.margins.medium;

                    const baseTotal = product.baseCost * totalArea;
                    total = baseTotal * margin * material.multiplier;

                    if (totalArea < pricingConfig.setupFeeThreshold) {
                        setupFee = pricingConfig.setupFee;
                        total += setupFee;
                    }
                }
            }
        }
        // --- LOGIC 2: FIXED ITEMS (Cards, Mugs, etc.) ---
        else {
            if (quantityOption && product.categoryId === 'wedding') {
                // Wedding Logic: (Price * Qty) + PrintingCharge
                // Assume Price in Data is Per Card Base Price
                // Multiplier applies to Card Quality
                const cardPrice = product.price * material.multiplier;
                const quantity = quantityOption.value;
                const printingCharge = 2000; // Fixed printing setup charge for plates

                total = (cardPrice * quantity) + printingCharge;
            }
            else if (quantityOption) {
                // Standard Logic for other Fixed Items
                const baseQty = product.options.quantity[0].value;
                const ratio = quantityOption.value / baseQty;
                total = product.price * ratio * material.multiplier;
            }
        }

        setPrice(Math.round(total));
        setIsSetupFeeApplied(setupFee > 0);
        setShowBulkQuote(isQuote);

    }, [product, material, dimensions, customQty, quantityOption, weddingDetails]);

    if (!product) return <div className="text-white text-center pt-40">Product not found</div>;

    const handleAddToCart = () => {
        const item = {
            ...product,
            selectedMaterial: material,
            selectedQuantity: product.unit === 'sqft' ? { label: `${customQty} Copies`, value: customQty } : quantityOption,
            dimensions: product.unit === 'sqft' ? dimensions : null,
            totalPrice: price,
            file: file ? file.name : null,
            weddingDetails: product.categoryId === 'wedding' ? weddingDetails : null
        };
        addToCart(item);
        navigate('/shop/checkout');
    };

    const handleBulkQuote = () => {
        const message = `Hi, I need a bulk quote for *${product.title}*. %0A dimensions: ${dimensions.width}x${dimensions.height} ft %0A Qty: ${customQty} %0A Approx Area: ${(dimensions.width * dimensions.height * customQty)} sqft.`;
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    };

    const handleCustomDesignRequest = () => {
        const message = `Hi, I have a specific custom design for a Wedding Card. %0A I will attach the reference image/video in this chat.`;
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    }

    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} /> Back to Shop
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Visual Side */}
                <div className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="rounded-3xl overflow-hidden border border-white/10 aspect-square relative"
                    >
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <h1 className="text-4xl font-bold">{product.title}</h1>
                            <p className="text-white/70 mt-2">{product.description}</p>
                            {product.unit === 'sqft' && <div className="mt-4 inline-block bg-electric-blue/20 text-electric-blue px-3 py-1 rounded-full text-xs font-bold border border-electric-blue/30">
                                Dynamic Pricing Active: More Area = Less Price/Sqft
                            </div>}
                        </div>
                    </motion.div>

                    {/* Custom Design Request Block for Wedding */}
                    {product.categoryId === 'wedding' && (
                        <div className="bg-gradient-to-r from-neon-purple/10 to-electric-blue/10 border border-white/10 p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                                <PenTool size={20} className="text-neon-purple" />
                                Have a specific design?
                            </h3>
                            <p className="text-white/60 text-sm mb-4">
                                Don't like our catalog? Send us your own design inspiration (Image/Video) and we'll print it.
                            </p>

                            <div className="mb-4 bg-black/20 border border-dashed border-white/20 rounded-xl p-4 text-center">
                                <input
                                    type="file"
                                    onChange={(e) => setCustomWeddingDesignFile(e.target.files[0])}
                                    className="hidden"
                                    id="custom-design-upload"
                                />
                                <label htmlFor="custom-design-upload" className="cursor-pointer block">
                                    {customWeddingDesignFile ? (
                                        <span className="text-electric-blue font-bold">{customWeddingDesignFile.name}</span>
                                    ) : (
                                        <span className="text-white/50 text-sm">Upload Reference Image</span>
                                    )}
                                </label>
                            </div>

                            <button
                                onClick={handleCustomDesignRequest}
                                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-neon-purple hover:text-white transition-all"
                            >
                                Request Price Quote on WhatsApp
                            </button>
                        </div>
                    )}
                </div>

                {/* Configuration Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-[#111] border border-white/10 p-8 rounded-3xl space-y-8">

                        {/* Material Selector */}
                        <div>
                            <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">1. Select Material</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {product.options.material.map((m) => (
                                    <button
                                        key={m.name}
                                        onClick={() => setMaterial(m)}
                                        className={`p-4 rounded-xl border text-left transition-all flex justify-between items-center ${material?.name === m.name ? 'border-electric-blue bg-electric-blue/10 text-white' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                    >
                                        <span className="font-medium">{m.name}</span>
                                        {m.multiplier !== 1 && <span className="text-xs bg-white/10 px-2 py-1 rounded">x{m.multiplier} Cost</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size / Quantity Selector */}
                        <div>
                            <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">2. Dimensions & Quantity</label>

                            {/* Wedding Specific Inputs */}
                            {product.categoryId === 'wedding' && (
                                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                                    <div>
                                        <label className="text-sm text-white/70 mb-2 block">Bride & Groom Names</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Ali & Fatima"
                                            value={weddingDetails.bride + (weddingDetails.groom ? ' & ' + weddingDetails.groom : '')}
                                            // Simplistic handling, let's separate inputs for better UX
                                            className="hidden"
                                        />
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                placeholder="Groom Name"
                                                value={weddingDetails.groom}
                                                onChange={(e) => setWeddingDetails({ ...weddingDetails, groom: e.target.value })}
                                                className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-electric-blue outline-none"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Bride Name"
                                                value={weddingDetails.bride}
                                                onChange={(e) => setWeddingDetails({ ...weddingDetails, bride: e.target.value })}
                                                className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-electric-blue outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/70 mb-2 block">Event Date</label>
                                        <input
                                            type="date"
                                            value={weddingDetails.date}
                                            onChange={(e) => setWeddingDetails({ ...weddingDetails, date: e.target.value })}
                                            className="w-full bg-black border border-white/20 rounded-xl p-3 text-white focus:border-electric-blue outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/70 mb-2 block">Venue</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. PC Hotel, Karachi"
                                            value={weddingDetails.venue}
                                            onChange={(e) => setWeddingDetails({ ...weddingDetails, venue: e.target.value })}
                                            className="w-full bg-black border border-white/20 rounded-xl p-3 text-white focus:border-electric-blue outline-none"
                                        />
                                    </div>
                                </div>
                            )}

                            {product.unit === 'sqft' ? (
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 text-sm text-white/70">
                                                <Ruler size={16} /> Width (ft)
                                            </div>
                                            <input
                                                type="number"
                                                min="1"
                                                value={dimensions.width || ''}
                                                onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) })}
                                                className="w-full bg-black border border-white/20 rounded-xl p-4 text-white focus:border-electric-blue outline-none"
                                                placeholder="e.g. 5"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2 text-sm text-white/70">
                                                <Ruler size={16} /> Height (ft)
                                            </div>
                                            <input
                                                type="number"
                                                min="1"
                                                value={dimensions.height || ''}
                                                onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) })}
                                                className="w-full bg-black border border-white/20 rounded-xl p-4 text-white focus:border-electric-blue outline-none"
                                                placeholder="e.g. 3"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm text-white/70 mb-2 block">Number of Copies</label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={customQty}
                                            onChange={(e) => setCustomQty(parseInt(e.target.value))}
                                            className="w-full bg-black border border-white/20 rounded-xl p-4 text-white focus:border-electric-blue outline-none"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {product.options.quantity && product.options.quantity.map((q) => (
                                        <button
                                            key={q.value}
                                            onClick={() => setQuantityOption(q)}
                                            className={`p-4 rounded-xl border text-center transition-all ${quantityOption?.value === q.value ? 'border-electric-blue bg-electric-blue/10 text-white' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* File Upload (Standard) - Only show if not Custom Flow? Actually always show for logo etc if needed */}
                        {product.categoryId !== 'wedding' && (
                            <div>
                                <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">3. Upload Design</label>
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-electric-blue/50 hover:bg-electric-blue/5 transition-all relative">
                                    <input
                                        type="file"
                                        onChange={(e) => setFile(e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    {file ? (
                                        <div className="text-electric-blue flex flex-col items-center">
                                            <Check size={32} className="mb-2" />
                                            <span className="font-bold">{file.name}</span>
                                        </div>
                                    ) : (
                                        <div className="text-white/40 flex flex-col items-center">
                                            <Upload size={32} className="mb-4" />
                                            <span className="font-medium">Drag & Drop or Click to Upload</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Summary Footer */}
                        <div className="pt-6 border-t border-white/10">
                            {showBulkQuote ? (
                                <div className="text-center">
                                    <div className="bg-electric-blue/10 border border-electric-blue/30 p-4 rounded-xl mb-4">
                                        <p className="text-electric-blue font-bold">Volume Order Detected!</p>
                                        <p className="text-sm text-white/70">For orders above {pricingConfig.thresholds.bulk} sq.ft, we offer special rates.</p>
                                    </div>
                                    <button
                                        onClick={handleBulkQuote}
                                        className="w-full py-5 rounded-xl font-bold text-lg bg-[#25D366] text-white hover:bg-[#1fae53] flex items-center justify-center gap-2 transition-all"
                                    >
                                        <MessageCircle size={20} />
                                        Get Bulk Quote on WhatsApp
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-end justify-between mb-4">
                                        <div>
                                            <span className="text-sm text-white/50">Total Estimation</span>
                                            <div className="text-4xl font-bold text-white tracking-tight">
                                                Rs. {price.toLocaleString()}
                                            </div>
                                            {product.categoryId === 'wedding' && (
                                                <div className="text-xs text-white/50 mt-1">
                                                    Includes Printing Setup Charges
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {isSetupFeeApplied && (
                                        <div className="flex items-center gap-2 text-orange-400 text-xs mb-4 bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                                            <AlertCircle size={14} />
                                            <span>Rs. {pricingConfig.setupFee} Setup Fee Applied (Small Order)</span>
                                        </div>
                                    )}

                                    <button
                                        onClick={handleAddToCart}
                                        disabled={price === 0}
                                        className={`w-full py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${price > 0 ? 'bg-white text-black hover:bg-neon-purple hover:text-white hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                                    >
                                        <ShoppingCart size={20} />
                                        Add to Cart & Checkout
                                    </button>
                                </>
                            )}
                        </div>

                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetail;
