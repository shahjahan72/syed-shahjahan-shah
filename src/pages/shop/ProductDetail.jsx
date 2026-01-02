import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products, pricingConfig } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Upload, ShoppingCart, MessageCircle, Check, ArrowLeft, Ruler, AlertCircle, PenTool, Hash, ImageIcon } from 'lucide-react';

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
    const [weddingDetails, setWeddingDetails] = useState({ bride: '', groom: '', date: '', venue: '', family: '' });
    const [customWeddingFiles, setCustomWeddingFiles] = useState([]);

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

        // Custom flow (Quote based)
        if (product.isCustom) {
            setPrice(0);
            return;
        }

        // SQFT ITEMS
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
        // FIXED ITEMS (Wedding, Cards, etc.)
        else {
            if (quantityOption && product.categoryId === 'wedding') {
                // Wedding Logic
                const cardPrice = product.price * material.multiplier;
                const quantity = quantityOption.value;
                const printingCharge = product.printingCharge || 0;
                total = (cardPrice * quantity) + printingCharge;
            }
            else if (quantityOption) {
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
            productID: product.id,
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

    const handleWhatsAppQuote = () => {
        let message = '';
        if (product.isCustom) {
            message = `Hi, I have a specific custom design for a Wedding Card (Inspired by Instagram/Video). %0A I have uploaded the reference images on the site. Please provide a quote.`;
        } else {
            message = `Hi, I need a bulk quote for *${product.title} (${product.id})*. %0A dimensions: ${dimensions.width}x${dimensions.height} ft %0A Qty: ${customQty} %0A Approx Area: ${(dimensions.width * dimensions.height * customQty)} sqft.`;
        }
        window.open(`https://wa.me/923001234567?text=${message}`, '_blank');
    };

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
                        {product.isCustom ? (
                            <div className="w-full h-full bg-gradient-to-br from-neon-purple/20 to-black flex flex-col items-center justify-center p-12 text-center">
                                <PenTool size={80} className="text-neon-purple mb-6" />
                                <h2 className="text-3xl font-bold mb-2">Custom Design Request</h2>
                                <p className="text-white/60">Share your inspiration pictures or videos, and we'll bring them to life with premium printing.</p>
                            </div>
                        ) : (
                            <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        )}
                        {!product.isCustom && (
                            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                                <Hash size={12} /> {product.id}
                            </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                            <h1 className="text-4xl font-bold">{product.title}</h1>
                            <p className="text-white/70 mt-2">{product.description}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Configuration Side */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-[#111] border border-white/10 p-8 rounded-3xl space-y-8">

                        {!product.isCustom && (
                            <div className="flex items-center justify-between border-b border-white/10 pb-4">
                                <span className="text-white/50 font-mono">Selected Design ID</span>
                                <span className="text-neon-purple font-bold font-mono tracking-widest">{product.id}</span>
                            </div>
                        )}

                        {/* Material Selector */}
                        {!product.isCustom && (
                            <div>
                                <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">1. Select Card Quality</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {product.options.material.map((m) => (
                                        <button
                                            key={m.name}
                                            onClick={() => setMaterial(m)}
                                            className={`p-4 rounded-xl border text-left transition-all flex justify-between items-center ${material?.name === m.name ? 'border-neon-purple bg-neon-purple/10 text-white' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                        >
                                            <span className="font-medium">{m.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wedding Fields */}
                        {product.categoryId === 'wedding' && (
                            <div className="space-y-4">
                                <label className="text-sm text-white/50 uppercase tracking-wider font-bold block">Printing Details</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Groom Name (Dulha)"
                                        value={weddingDetails.groom}
                                        onChange={(e) => setWeddingDetails({ ...weddingDetails, groom: e.target.value })}
                                        className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-neon-purple outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Bride Name (Dulhan)"
                                        value={weddingDetails.bride}
                                        onChange={(e) => setWeddingDetails({ ...weddingDetails, bride: e.target.value })}
                                        className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-neon-purple outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="date"
                                        value={weddingDetails.date}
                                        onChange={(e) => setWeddingDetails({ ...weddingDetails, date: e.target.value })}
                                        className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-neon-purple outline-none"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Venue / City"
                                        value={weddingDetails.venue}
                                        onChange={(e) => setWeddingDetails({ ...weddingDetails, venue: e.target.value })}
                                        className="bg-black border border-white/20 rounded-xl p-3 text-white focus:border-neon-purple outline-none"
                                    />
                                </div>
                                <textarea
                                    placeholder="Family Names (Parents/Grandparents) or extra details..."
                                    value={weddingDetails.family}
                                    onChange={(e) => setWeddingDetails({ ...weddingDetails, family: e.target.value })}
                                    className="w-full bg-black border border-white/20 rounded-xl p-3 text-white focus:border-neon-purple outline-none h-24 resize-none"
                                />
                            </div>
                        )}

                        {/* Quantity Selector */}
                        {!product.isCustom && (
                            <div>
                                <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">Quantity (Min {product.moq || 1})</label>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {product.options.quantity && product.options.quantity.map((q) => (
                                        <button
                                            key={q.value}
                                            onClick={() => setQuantityOption(q)}
                                            className={`p-4 rounded-xl border text-center transition-all ${quantityOption?.value === q.value ? 'border-neon-purple bg-neon-purple/10 text-white' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* File Upload for Custom Request */}
                        {(product.isCustom || product.categoryId !== 'wedding') && (
                            <div>
                                <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">
                                    {product.isCustom ? 'Upload Reference (Images/Videos)' : 'Upload Design'}
                                </label>
                                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-neon-purple/50 hover:bg-none transition-all relative">
                                    <input
                                        type="file"
                                        onChange={(e) => {
                                            if (product.isCustom) {
                                                setCustomWeddingFiles(Array.from(e.target.files));
                                            } else {
                                                setFile(e.target.files[0]);
                                            }
                                        }}
                                        multiple={product.isCustom}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="text-white/40 flex flex-col items-center">
                                        <Upload size={32} className="mb-4" />
                                        <span className="font-medium">
                                            {product.isCustom
                                                ? (customWeddingFiles.length > 0 ? `${customWeddingFiles.length} files selected` : 'Drop images/videos here')
                                                : (file ? file.name : 'Click to Upload Design')
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Summary Footer */}
                        <div className="pt-6 border-t border-white/10">
                            {product.isCustom ? (
                                <button
                                    onClick={handleWhatsAppQuote}
                                    className="w-full py-5 rounded-xl font-bold text-lg bg-[#25D366] text-white hover:bg-[#1fae53] flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)]"
                                >
                                    <MessageCircle size={20} />
                                    Request Quote on WhatsApp
                                </button>
                            ) : (
                                <>
                                    <div className="flex items-end justify-between mb-6">
                                        <div>
                                            <span className="text-sm text-white/50">Total Estimation</span>
                                            <div className="text-4xl font-bold text-white tracking-tight">
                                                Rs. {price.toLocaleString()}
                                            </div>
                                            {product.categoryId === 'wedding' && (
                                                <div className="text-xs text-neon-purple mt-1 flex items-center gap-1">
                                                    <Check size={12} /> Includes Rs.{product.printingCharge} Printing Charge
                                                </div>
                                            )}
                                        </div>
                                    </div>

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
