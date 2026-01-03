import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, pricingConfig } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Upload, ShoppingCart, MessageCircle, Check, ArrowLeft, Ruler, AlertCircle, PenTool, Hash, Maximize2, X } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === id);

    // Template Gallery State
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);

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
        if (product && product.moq) {
            setCustomQty(product.moq);
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
                // Auto Bulk Discount Logic
                let margin = pricingConfig.margins.small;

                if (totalArea > pricingConfig.thresholds.bulk) {
                    margin = pricingConfig.margins.bulk; // Auto 30% margin
                } else if (totalArea > pricingConfig.thresholds.medium) {
                    margin = pricingConfig.margins.large;
                } else if (totalArea > pricingConfig.thresholds.small) {
                    margin = pricingConfig.margins.medium;
                }

                const baseTotal = product.baseCost * totalArea;
                total = baseTotal * margin * material.multiplier;

                // Mark if bulk pricing used for UI badge
                if (totalArea > pricingConfig.thresholds.bulk) {
                    setShowBulkQuote(true); // Using this as 'isBulk' state now
                } else {
                    setShowBulkQuote(false);
                }

                if (totalArea < pricingConfig.setupFeeThreshold) {
                    setupFee = pricingConfig.setupFee;
                    total += setupFee;
                }
            }
        }
        // FIXED ITEMS (Wedding, Cards, etc.)
        else {
            if (product.categoryId === 'wedding') {
                // Wedding Logic
                // Ensure quantity comes from quantityOption OR customQty depending on UI availability
                const qty = quantityOption ? quantityOption.value : customQty;
                const cardPrice = product.price * material.multiplier;
                const printingCharge = product.printingCharge || 0;

                // If sub-template selected, price logic is same: Group Base Price * Qty + Printing
                total = (cardPrice * qty) + printingCharge;
            }
            else if (product.options.quantity && quantityOption) {
                const baseQty = product.options.quantity[0].value;
                const ratio = quantityOption.value / baseQty;
                total = product.price * ratio * material.multiplier;
            }
            else {
                total = product.price * customQty * material.multiplier;
            }
            setShowBulkQuote(false);
        }

        setPrice(Math.round(total));
        setIsSetupFeeApplied(setupFee > 0);

    }, [product, material, dimensions, customQty, quantityOption, weddingDetails]);

}, [product, material, dimensions, customQty, quantityOption, weddingDetails]);


if (!product) return <div className="text-white text-center pt-40">Product not found</div>;

const handleAddToCart = () => {
    const item = {
        ...product,
        productID: selectedTemplate ? `${product.id}-${selectedTemplate.id}` : product.id,
        selectedMaterial: material,
        selectedQuantity: product.unit === 'sqft' ? { label: `${customQty} Copies`, value: customQty } : (quantityOption || { label: `${customQty} Units`, value: customQty }),
        dimensions: product.unit === 'sqft' ? dimensions : null,
        totalPrice: price,
        file: file ? file.name : null,
        weddingDetails: product.categoryId === 'wedding' ? weddingDetails : null,
        designMetadata: selectedTemplate // Persist the picked design object
    };
    addToCart(item);
    navigate('/shop/checkout');
};

const handleWhatsAppQuote = () => {
    let message = '';
    if (product.isCustom) {
        message = `🔔 *Quote Request: Custom Design* %0A%0A📦 *Type:* ${product.title}%0A📝 *Requirement:* Based on uploaded reference.%0A%0A_I have shared the files on the site / will share here._`;
    } else {
        const designId = selectedTemplate ? selectedTemplate.id : product.id;
        let details = `📦 *Product:* ${product.title} (${designId})`;

        if (product.unit === 'sqft') {
            details += `%0A📏 Size: ${dimensions.width}x${dimensions.height} ft`;
            details += `%0A🔢 Copies: ${customQty}`;
            details += `%0A📐 Area: ${(dimensions.width * dimensions.height * customQty)} sqft`;
        } else {
            details += `%0A🔢 Quantity: ${quantityOption ? quantityOption.label : customQty}`;
        }

        message = `🔔 *Quote Request: Bulk / Details* %0A%0A${details}%0A%0A_Please provide the final rate and delivery time._`;
    }
    window.open(`https://wa.me/923481342505?text=${message}`, '_blank');
};

// If it is a TEMPLATE GROUP (Wedding) and NO template is selected, show the Gallery
if (product.isTemplateGroup && !selectedTemplate) {
    return (
        <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
            <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
                <ArrowLeft size={20} /> Back to Shop
            </button>

            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">{product.title} Gallery</h1>
                <p className="text-white/60 max-w-2xl mx-auto">{product.description}</p>
                <div className="mt-4 flex justify-center gap-4 text-sm font-mono text-neon-purple">
                    <span>Base Price: Rs. {product.price}</span>
                    <span>•</span>
                    <span>MOQ: {product.moq} Cards</span>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Simulated Template Generation */}
                {Array.from({ length: product.totalDesigns || 12 }).map((_, i) => {
                    const designId = `${product.templatePrefix}-${String(i + 1).padStart(3, '0')}`;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="group relative bg-[#111] border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-neon-purple/50 transition-all"
                            onClick={() => setSelectedTemplate({ id: designId, index: i })}
                        >
                            <div className="aspect-[3/4] overflow-hidden relative">
                                <img
                                    src={`${product.baseImageInfo}&sig=${i}`} // Randomized sig for variety
                                    alt={designId}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                                {/* Design ID Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
                                    <span className="font-mono text-xs font-bold text-white bg-black/50 px-2 py-1 rounded">{designId}</span>
                                    <button
                                        className="p-2 bg-white/10 hover:bg-white/30 rounded-full backdrop-blur-md transition-colors"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setLightboxImage(`${product.baseImageInfo}&sig=${i}`);
                                        }}
                                    >
                                        <Maximize2 size={14} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-3 text-center">
                                <button className="text-sm font-bold text-white/80 group-hover:text-neon-purple transition-colors">Select Design</button>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button className="absolute top-4 right-4 text-white/50 hover:text-white">
                            <X size={32} />
                        </button>
                        <img src={lightboxImage} className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl border border-white/10" alt="Zoom" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Default or Configuration View (Once Template is selected OR for normal products)
return (
    <div className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto">
        <button onClick={() => selectedTemplate ? setSelectedTemplate(null) : navigate('/shop')} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={20} /> {selectedTemplate ? 'Back to Gallery' : 'Back to Shop'}
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
                        <img
                            src={selectedTemplate ? `${product.baseImageInfo}&sig=${selectedTemplate.index}` : product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                    {!product.isCustom && (
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 flex items-center gap-2">
                            <Hash size={12} /> {selectedTemplate ? selectedTemplate.id : product.id}
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
                            <span className="text-neon-purple font-bold font-mono tracking-widest">{selectedTemplate ? selectedTemplate.id : product.id}</span>
                        </div>
                    )}

                    {/* Material Selector */}
                    {!product.isCustom && (
                        <div>
                            <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">1. Select Material/Quality</label>
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

                    {/* Dimensions for SQFT Items */}
                    {product.unit === 'sqft' && !product.isCustom && (
                        <div className="space-y-4">
                            <label className="text-sm text-white/50 uppercase tracking-wider font-bold block">2. Enter Size (Feet)</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-white/40 mb-2 block">Width (ft)</label>
                                    <div className="flex items-center bg-black border border-white/20 rounded-xl p-3 focus-within:border-neon-purple transition-colors">
                                        <input
                                            type="number"
                                            min="1"
                                            value={dimensions.width || ''}
                                            onChange={(e) => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })}
                                            className="bg-transparent w-full text-white outline-none font-mono text-lg"
                                            placeholder="0"
                                        />
                                        <Ruler size={16} className="text-white/30" />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-white/40 mb-2 block">Height (ft)</label>
                                    <div className="flex items-center bg-black border border-white/20 rounded-xl p-3 focus-within:border-neon-purple transition-colors">
                                        <input
                                            type="number"
                                            min="1"
                                            value={dimensions.height || ''}
                                            onChange={(e) => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })}
                                            className="bg-transparent w-full text-white outline-none font-mono text-lg"
                                            placeholder="0"
                                        />
                                        <Ruler size={16} className="text-white/30" />
                                    </div>
                                </div>
                            </div>
                            <div className="text-right text-xs text-white/40 font-mono">
                                Total Area: <span className="text-neon-purple">{(dimensions.width * dimensions.height).toFixed(2)} sq.ft</span>
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
                            <label className="text-sm text-white/50 uppercase tracking-wider font-bold mb-3 block">
                                Quantity {product.moq ? `(Min Order: ${product.moq})` : ''}
                            </label>

                            {product.options.quantity ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {product.options.quantity.map((q) => (
                                        <button
                                            key={q.value}
                                            onClick={() => setQuantityOption(q)}
                                            className={`p-4 rounded-xl border text-center transition-all ${quantityOption?.value === q.value ? 'border-neon-purple bg-neon-purple/10 text-white' : 'border-white/10 text-white/50 hover:bg-white/5'}`}
                                        >
                                            {q.label}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                // Manual Quantity for NON-SQFT items only if options missing
                                // For SQFT items, quantity (copies) is handled above in "copies" logic.
                                // BUT: Panaflex needs Copies + Size.
                                // Current UI logic: SQFT section has copies.
                                // Fixed items (wedding) logic: Quantity Option.
                                // If we are here, it's either fixed without options OR Panaflex fallback?
                                // Logic correction: Panaflex sets 'customQty' in the "Copies" input in size section?
                                // Let's ensure copies input is available if it's NOT sqft OR if options available
                                // Actually, let's keep it simple: If options exist, show buttons. If not, and not custom, show number input.
                                <div className="flex items-center bg-black border border-white/20 rounded-xl p-3 w-full md:w-1/3 focus-within:border-neon-purple transition-colors">
                                    <input
                                        type="number"
                                        min={product.moq || 1}
                                        value={customQty}
                                        onChange={(e) => setCustomQty(parseInt(e.target.value) || 1)}
                                        className="bg-transparent w-full text-white outline-none font-mono text-lg text-center"
                                    />
                                    <span className="text-white/30 text-sm ml-2">Units</span>
                                </div>
                            )}
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
                                        {isSetupFeeApplied && (
                                            <div className="text-xs text-yellow-500 mt-1 flex items-center gap-1">
                                                <AlertCircle size={12} /> Small Order Setup Fee Applied
                                            </div>
                                        )}
                                        {showBulkQuote && (
                                            <div className="text-xs text-neon-green mt-1 flex items-center gap-1 font-bold animate-pulse">
                                                <Check size={12} /> 🔥 Bulk Deal Applied (Wholesale Rate)
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

                                <button
                                    onClick={handleWhatsAppQuote}
                                    className="w-full mt-3 py-3 text-sm text-white/40 hover:text-white underline decoration-white/20 hover:decoration-white transition-all flex items-center justify-center gap-2"
                                >
                                    Order too big? Request custom wholesale rate on WhatsApp
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
