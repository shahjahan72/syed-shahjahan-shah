import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { products, pricingConfig } from '../../data/products';
import { productValidationSchema, printingRules } from '../../data/printingRules';
import { useCart } from '../../context/CartContext';
import {
    Upload,
    ShoppingCart,
    MessageCircle,
    Check,
    ArrowLeft,
    Ruler,
    Maximize2,
    X,
    Info,
    InfoIcon,
    ChevronRight,
    Lock
} from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const product = products.find(p => p.id === id);

    // --- State Management ---
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [material, setMaterial] = useState(null);
    const [quantityOption, setQuantityOption] = useState(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [customQty, setCustomQty] = useState(1);
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);
    const [designMode, setDesignMode] = useState('none'); // 'none', 'upload', 'personalize'
    const [personalization, setPersonalization] = useState({ text: '', logoPosition: 'center' });
    const [weddingDetails, setWeddingDetails] = useState({ bride: '', groom: '', date: '', venue: '', family: '' });
    const [validationErrors, setValidationErrors] = useState([]);

    // --- Pricing & Calculation Stats ---
    const [price, setPrice] = useState(0);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [isBulk, setIsBulk] = useState(false);
    const [setupFeeApplied, setSetupFeeApplied] = useState(false);

    // --- Product Type Determination ---
    const productType = useMemo(() => {
        if (product?.unit === 'sqft') return 'area';
        if (product?.isCustom) return 'quote';
        return 'quantity';
    }, [product]);

    // --- Initialize Controls ---
    // REMOVED DEFAULTS: User must select options manually per strict business logic
    useEffect(() => {
        // Reset state on ID change
        setMaterial(null);
        setQuantityOption(null);
        setDimensions({ width: 0, height: 0 });
        setCustomQty(products.find(p => p.id === id)?.moq || 1);
        setPrice(0);
        setSelectedPackage(null);
        setWeddingDetails({ bride: '', groom: '', date: '', venue: '', family: '' });
        setValidationErrors([]);
    }, [id]);

    // --- Dynamic Pricing Engine ---
    useEffect(() => {
        if (!product) return;

        // Validate product configuration
        const validation = productValidationSchema.validateProductConfiguration(product, {
            material,
            quantity: quantityOption || { value: customQty },
            dimensions
        });
        
        setValidationErrors(validation.errors);

        // Validation: If strict requirements aren't met, price is 0 (Show Range)
        if (!validation.valid && !product.isCustom && !product.isPackage) {
            setPrice(0);
            return;
        }

        if (product.isPackage) {
            if (!selectedPackage) {
                setPrice(0);
                return;
            }
            const basePrice = selectedPackage.price;
            const multiplier = material?.multiplier || 1.0;
            setPrice(Math.round(basePrice * multiplier));
            return;
        }

        let total = 0;
        let setupFee = 0;
        let marginTier = pricingConfig.margins.small;

        if (product.isCustom) {
            setPrice(0);
            return;
        }

        if (product.unit === 'sqft') {
            const areaPerItem = (dimensions.width || 0) * (dimensions.height || 0);
            const totalArea = areaPerItem * customQty;

            // Strict Validation for Sqft
            if (totalArea <= 0) {
                setPrice(0);
                return;
            }

            // Determine Margin Tier based on total square footage
            if (totalArea >= pricingConfig.thresholds.bulk) {
                marginTier = pricingConfig.margins.bulk;
                setIsBulk(true);
            } else if (totalArea >= pricingConfig.thresholds.medium) {
                marginTier = pricingConfig.margins.large;
                setIsBulk(false);
            } else if (totalArea >= pricingConfig.thresholds.small) {
                marginTier = pricingConfig.margins.medium;
                setIsBulk(false);
            } else {
                marginTier = pricingConfig.margins.small;
                setIsBulk(false);
            }

            const baseCost = product.baseCost * totalArea;
            total = baseCost * material.multiplier * marginTier;

            // Enforce Setup Fee if area is too small
            if (totalArea < pricingConfig.setupFeeThreshold) {
                setupFee = pricingConfig.setupFee;
                total += setupFee;
                setSetupFeeApplied(true);
            } else {
                setSetupFeeApplied(false);
            }
        } else {
            // Processing for 'fixed' unit products (Cards, Stationery, Packaging)
            const qtyValue = quantityOption ? quantityOption.value : customQty;

            // Strict Validation for Fixed
            if (product.options?.quantity && !quantityOption) {
                setPrice(0);
                return;
            }

            if (product.categoryId === 'wedding') {
                const cardPrice = (product.price || 0) * material.multiplier;
                const printingCharge = product.printingCharge || 0;
                total = (cardPrice * qtyValue) + printingCharge;
            } else if (product.options?.quantity && quantityOption) {
                // Ratio-based pricing for quantity packs
                const baseQty = product.options.quantity[0].value;
                const ratio = qtyValue / baseQty;
                total = (product.price || 0) * ratio * material.multiplier;
            } else {
                total = (product.price || 0) * qtyValue * material.multiplier;
            }
            setIsBulk(false);
            setSetupFeeApplied(false);
        }

        // Clean price rounding
        let finalPrice = Math.round(total);
        if (finalPrice > 100) {
            finalPrice = Math.ceil(finalPrice / 10) * 10;
        }
        setPrice(finalPrice);

    }, [product, material, dimensions, customQty, quantityOption, weddingDetails, selectedPackage]);

    if (!product) return null;

    const handleAction = () => {
        if (product.isCustom) {
            const message = `Bespoke Selection Enquiry:%0A Product: ${product.title}%0A Please assist me with a custom quote.`;
            window.open(`https://wa.me/923481342505?text=${message}`, '_blank');
            return;
        }

        const cartItem = {
            ...product,
            productID: selectedTemplate ? `${product.id}-${selectedTemplate.id}` : product.id,
            selectedMaterial: material,
            selectedQuantity: product.unit === 'sqft' ? { label: `${customQty} Units`, value: customQty } : (quantityOption || { label: `${customQty} Units`, value: customQty }),
            selectedPackage: selectedPackage,
            dimensions: product.unit === 'sqft' ? dimensions : null,
            totalPrice: price,
            designMode,
            personalization: designMode === 'personalize' ? personalization : null,
            file: designMode === 'upload' && file ? file.name : null,
            weddingDetails: product.categoryId === 'wedding' ? weddingDetails : null,
            previewImage: selectedTemplate ? selectedTemplate.image : product.image
        };

        addToCart(cartItem);
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFilePreview(URL.createObjectURL(selectedFile));
        }
    };

    // --- Specialized Template Selection View ---
    if (product.isTemplateGroup && !selectedTemplate) {
        return (
            <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-20 px-8">
                <header className="mb-20 max-w-[1400px] mx-auto">
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-black/30 hover:text-black mb-12 uppercase text-[10px] font-bold tracking-[0.3em] transition-all">
                        <ArrowLeft size={14} /> Back to Collection
                    </button>
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
                        <div>
                            <span className="text-brand-accent text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">Archive Series</span>
                            <h1 className="text-6xl font-serif text-brand-black mb-4">{product.title}</h1>
                            <p className="max-w-xl text-black/50 text-sm leading-relaxed">{product.description}</p>
                        </div>
                        <div className="flex gap-12 text-[10px] font-bold tracking-[0.2em] uppercase border-l border-black/5 pl-12">
                            <div><span className="opacity-30 block mb-2">Base Cost</span><span className="text-lg">Rs. {product.price}</span></div>
                            <div><span className="opacity-30 block mb-2">Minimum</span><span className="text-lg">{product.moq} Units</span></div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 max-w-[1400px] mx-auto">
                    {Array.from({ length: product.totalDesigns || 12 }).map((_, i) => {
                        const templateId = `${product.templatePrefix}-${String(i + 1).padStart(3, '0')}`;
                        const imgSrc = `${product.baseImageInfo}&sig=${i}`;
                        return (
                            <motion.div
                                key={templateId}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="group cursor-pointer"
                                onClick={() => setSelectedTemplate({ id: templateId, image: imgSrc })}
                            >
                                <div className="aspect-[3/4] overflow-hidden bg-white soft-shadow mb-6 relative">
                                    <img src={imgSrc} alt={templateId} className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/5 transition-colors" />
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                        <button className="w-full bg-brand-black text-white py-4 text-[9px] font-bold uppercase tracking-[0.2em]">Select Portfolio Piece</button>
                                    </div>
                                    <button
                                        className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100"
                                        onClick={(e) => { e.stopPropagation(); setLightboxImage(imgSrc); }}
                                    >
                                        <Maximize2 size={14} />
                                    </button>
                                </div>
                                <div className="flex justify-between items-center px-2">
                                    <span className="text-[10px] font-bold tracking-widest text-black/30 font-mono">{templateId}</span>
                                    <div className="h-px w-8 bg-black/10" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <AnimatePresence>
                    {lightboxImage && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-brand-black/95 flex items-center justify-center p-10" onClick={() => setLightboxImage(null)}>
                            <button className="absolute top-10 right-10 text-white hover:opacity-50"><X size={32} strokeWidth={1} /></button>
                            <img src={lightboxImage} className="max-h-full max-w-full object-contain" alt="Gallery View" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    // --- Ultra-Professional Configuration View ---
    return (
        <div className="min-h-screen bg-[#F5F5F5] pt-32 pb-40 px-8">
            <div className="max-w-[1400px] mx-auto">
                <button onClick={() => selectedTemplate ? setSelectedTemplate(null) : navigate('/')} className="flex items-center gap-2 text-black/20 hover:text-black mb-16 uppercase text-[10px] font-bold tracking-[0.3em] transition-all">
                    <ArrowLeft size={14} /> {selectedTemplate ? 'Return to Gallery' : 'Return to Collections'}
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
                    {/* Media Column (Sticky) */}
                    <div className="lg:col-span-7 lg:sticky lg:top-36">
                        <div className="bg-white soft-shadow overflow-hidden group">
                            {product.isCustom ? (
                                <div className="aspect-square bg-brand-black flex flex-col items-center justify-center p-20 text-center text-white">
                                    <span className="text-[10px] tracking-[0.5em] uppercase text-brand-accent mb-8 font-bold">Commission Service</span>
                                    <h2 className="text-5xl font-serif mb-6 leading-tight">Shared Vision, <br />Handcrafted Reality</h2>
                                    <p className="text-white/40 text-sm max-w-md leading-relaxed mb-12">Submit your references or concepts. Our design atelier will contact you to finalize the specifications.</p>
                                    <div className="p-10 border border-white/5 bg-white/5 rounded-full"><Upload className="opacity-30" strokeWidth={1} size={32} /></div>
                                </div>
                            ) : (
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={selectedTemplate ? selectedTemplate.image : product.image}
                                        alt={product.title}
                                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                                    />
                                    {selectedTemplate && (
                                        <div className="absolute top-10 left-10 py-2 px-4 bg-brand-black/90 backdrop-blur text-white text-[9px] font-bold tracking-[0.2em] uppercase">
                                            Selected: {selectedTemplate.id}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Configuration Column */}
                    <div className="lg:col-span-5 space-y-20">
                        <header>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-[10px] tracking-[0.4em] uppercase text-black/30 font-bold">{product.categoryId}</span>
                                <div className="h-px w-8 bg-black/10" />
                                <span className="text-[10px] tracking-[0.4em] uppercase text-black/30 font-bold">Ref. {product.id}</span>
                            </div>
                            <h1 className="text-6xl font-serif text-brand-black mb-8 leading-[1.1]">{product.title}</h1>
                            <p className="text-black/50 text-sm leading-relaxed max-w-md">{product.description}</p>
                        </header>

                        <div className="space-y-16">
                            {/* Package Selection */}
                            {product.isPackage && (
                                <section>
                                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-8">01. Service Tier</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        {product.packages.map((pkg) => (
                                            <button
                                                key={pkg.name}
                                                onClick={() => setSelectedPackage(pkg)}
                                                className={`group relative p-8 text-left transition-all border ${selectedPackage?.name === pkg.name ? 'border-brand-black bg-brand-black text-white' : 'border-black/5 bg-white hover:border-black/20'}`}
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div>
                                                        <h4 className="text-xl font-serif mb-1">{pkg.name}</h4>
                                                        <p className={`text-[10px] font-bold tracking-widest uppercase ${selectedPackage?.name === pkg.name ? 'text-brand-accent' : 'text-black/30'}`}>
                                                            Design Tier
                                                        </p>
                                                    </div>
                                                    <span className="text-2xl font-serif">Rs. {pkg.price.toLocaleString()}</span>
                                                </div>
                                                <ul className="space-y-3">
                                                    {pkg.features.map((feat, i) => (
                                                        <li key={i} className={`flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider ${selectedPackage?.name === pkg.name ? 'text-white/60' : 'text-black/40'}`}>
                                                            <Check size={12} className={selectedPackage?.name === pkg.name ? 'text-brand-accent' : 'text-brand-black'} /> {feat}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Materials Selection */}
                            {!product.isCustom && (
                                <section>
                                    <div className="flex justify-between items-end mb-8">
                                        <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">01. Material Quality</h3>
                                        <span className="text-[9px] font-bold text-brand-accent uppercase tracking-wider">{material?.name} Selection applied</span>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {product.options?.material.map((m) => (
                                            <button
                                                key={m.name}
                                                onClick={() => setMaterial(m)}
                                                className={`group flex items-center justify-between p-6 transition-all border ${material?.name === m.name ? 'border-brand-black bg-brand-black text-white' : 'border-black/5 bg-white hover:border-black/20 text-black/40'}`}
                                            >
                                                <div className="flex flex-col items-start gap-1">
                                                    <span className="text-[10px] font-bold tracking-widest uppercase">{m.name}</span>
                                                    {m.multiplier > 1 && <span className={`text-[8px] uppercase tracking-wider font-bold ${material?.name === m.name ? 'text-brand-accent' : 'text-black/20'}`}>Premium Upgrade</span>}
                                                </div>
                                                <div className={`w-2 h-2 rounded-full transition-all ${material?.name === m.name ? 'bg-brand-accent scale-150' : 'bg-black/5'}`} />
                                            </button>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Dimensions Selection (sqft) */}
                            {product.unit === 'sqft' && (
                                <section>
                                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-8">02. Measurement Details (ft)</h3>
                                    <div className="grid grid-cols-2 gap-8 p-10 bg-white soft-shadow">
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Width</label>
                                            <div className="flex items-center gap-4 border-b border-black/10 focus-within:border-brand-black transition-colors">
                                                <input
                                                    type="number"
                                                    placeholder="00"
                                                    value={dimensions.width || ''}
                                                    onChange={e => setDimensions({ ...dimensions, width: parseFloat(e.target.value) || 0 })}
                                                    className="w-full bg-transparent py-4 outline-none text-lg font-serif"
                                                />
                                                <span className="text-[10px] opacity-20 font-bold uppercase">ft</span>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Height</label>
                                            <div className="flex items-center gap-4 border-b border-black/10 focus-within:border-brand-black transition-colors">
                                                <input
                                                    type="number"
                                                    placeholder="00"
                                                    value={dimensions.height || ''}
                                                    onChange={e => setDimensions({ ...dimensions, height: parseFloat(e.target.value) || 0 })}
                                                    className="w-full bg-transparent py-4 outline-none text-lg font-serif"
                                                />
                                                <span className="text-[10px] opacity-20 font-bold uppercase">ft</span>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Quantity Selection */}
                            {!product.isCustom && (
                                <section>
                                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-8">
                                        03. Bespoke Quantity {product.moq ? `(Min. ${product.moq})` : ''}
                                    </h3>
                                    {product.options?.quantity ? (
                                        <div className="grid grid-cols-3 gap-3">
                                            {product.options.quantity.map((q) => (
                                                <button
                                                    key={q.value}
                                                    onClick={() => setQuantityOption(q)}
                                                    className={`py-6 flex flex-col items-center justify-center transition-all border ${quantityOption?.value === q.value ? 'border-brand-black bg-brand-black text-white' : 'border-black/5 bg-white hover:border-black/20 text-black/20'}`}
                                                >
                                                    <span className="text-[10px] font-bold tracking-widest uppercase">{q.label.split(' ')[0]}</span>
                                                    <span className="text-[8px] opacity-50 uppercase mt-1">Units</span>
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-8 p-10 bg-white soft-shadow">
                                            <div className="flex-1 space-y-4">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Units Required</label>
                                                <input
                                                    type="number"
                                                    min={product.moq || 1}
                                                    value={customQty}
                                                    onChange={e => setCustomQty(parseInt(e.target.value) || 1)}
                                                    className="w-full bg-transparent border-b border-black/10 focus:border-brand-black py-4 outline-none text-lg font-serif transition-colors"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-2 items-center opacity-20">
                                                <Lock size={12} />
                                                <span className="text-[8px] font-bold uppercase tracking-[0.2em]">Verified</span>
                                            </div>
                                        </div>
                                    )}
                                </section>
                            )}

                            {/* Personalization Section for Wedding & Generic */}
                            <section className="space-y-12">
                                <div className="flex justify-between items-end border-b border-black/5 pb-6">
                                    <h3 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40">04. Design & Personalization</h3>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setDesignMode('upload')}
                                            className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${designMode === 'upload' ? 'text-brand-accent' : 'text-black/20 hover:text-black/40'}`}
                                        >
                                            Upload Art
                                        </button>
                                        <button
                                            onClick={() => setDesignMode('personalize')}
                                            className={`text-[9px] font-bold uppercase tracking-wider transition-colors ${designMode === 'personalize' ? 'text-brand-accent' : 'text-black/20 hover:text-black/40'}`}
                                        >
                                            Personalize
                                        </button>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {designMode === 'upload' && (
                                        <motion.div
                                            key="upload"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-6"
                                        >
                                            <div className="border-2 border-dashed border-black/5 p-12 text-center rounded-lg hover:border-brand-accent/30 transition-colors cursor-pointer relative group">
                                                <input
                                                    type="file"
                                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                                    onChange={handleFileChange}
                                                    accept="image/*,.pdf,.ai,.eps"
                                                />
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="p-4 bg-black/5 rounded-full group-hover:scale-110 transition-transform">
                                                        <Upload size={20} className="text-black/40" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/60 mb-2">
                                                            {file ? file.name : 'Drop artwork or click here'}
                                                        </p>
                                                        <p className="text-[9px] text-black/30 font-bold uppercase tracking-wider">
                                                            PDF, AI, EPS or High-Res JPG (Max 50MB)
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            {filePreview && (
                                                <div className="flex items-center gap-4 p-4 bg-white soft-shadow rounded-lg">
                                                    <div className="w-16 h-16 rounded overflow-hidden bg-black/5">
                                                        <img src={filePreview} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold uppercase tracking-widest text-black/80">Proofing Mode Active</p>
                                                        <p className="text-[9px] text-black/30 uppercase font-bold tracking-wider">File attached for manual studio review</p>
                                                    </div>
                                                    <button onClick={() => { setFile(null); setFilePreview(null); }} className="text-black/20 hover:text-red-500 transition-colors">
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}

                                    {designMode === 'personalize' && (
                                        <motion.div
                                            key="personalize"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="space-y-8"
                                        >
                                            <div className="space-y-4">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Custom Text / Branding Statement</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter text to be printed..."
                                                    value={personalization.text}
                                                    onChange={e => setPersonalization({ ...personalization, text: e.target.value })}
                                                    className="w-full bg-transparent border-b border-black/10 focus:border-brand-black py-4 outline-none text-sm font-medium transition-all"
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Alignment Priority</label>
                                                <div className="grid grid-cols-3 gap-4">
                                                    {['Left', 'Center', 'Right'].map(pos => (
                                                        <button
                                                            key={pos}
                                                            onClick={() => setPersonalization({ ...personalization, logoPosition: pos.toLowerCase() })}
                                                            className={`py-3 text-[9px] font-bold uppercase tracking-widest border transition-all ${personalization.logoPosition === pos.toLowerCase() ? 'border-brand-black bg-brand-black text-white' : 'border-black/5 text-black/30 hover:border-black/20'}`}
                                                        >
                                                            {pos}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {designMode === 'none' && (
                                        <motion.div
                                            key="none"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-10 bg-black/[0.02] border border-black/[0.05] rounded-lg text-center"
                                        >
                                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/30">Select a design method to begin</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {product.categoryId === 'wedding' && (
                                    <div className="pt-8 border-t border-black/5 space-y-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-4">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Groom Name</label>
                                                <input type="text" placeholder="Full Name" value={weddingDetails.groom} onChange={e => setWeddingDetails({ ...weddingDetails, groom: e.target.value })} className="w-full bg-transparent border-b border-black/10 focus:border-brand-black py-4 outline-none text-sm font-medium transition-all" />
                                            </div>
                                            <div className="space-y-4">
                                                <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Bride Name</label>
                                                <input type="text" placeholder="Full Name" value={weddingDetails.bride} onChange={e => setWeddingDetails({ ...weddingDetails, bride: e.target.value })} className="w-full bg-transparent border-b border-black/10 focus:border-brand-black py-4 outline-none text-sm font-medium transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-black/20">Event Venue & Address</label>
                                            <input type="text" placeholder="Grand Ballroom, Karachi" value={weddingDetails.venue} onChange={e => setWeddingDetails({ ...weddingDetails, venue: e.target.value })} className="w-full bg-transparent border-b border-black/10 focus:border-brand-black py-4 outline-none text-sm font-medium transition-all" />
                                        </div>
                                    </div>
                                )}
                            </section>

                            {/* Summary & Intent */}
                            <div className="pt-20 border-t border-black/5 space-y-12">
                                <div className="flex justify-between items-end">
                                    <div>
                                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 mb-4 block">Estimate Value</span>
                                        <div className="flex items-baseline gap-4">
                                            {price > 0 ? (
                                                <span className="text-6xl font-serif text-brand-black leading-none">Rs. {price.toLocaleString()}</span>
                                            ) : (
                                                <span className="text-4xl md:text-5xl font-serif text-brand-black/40 leading-none">{product.priceRange || 'calculating...'}</span>
                                            )}
                                            {isBulk && <span className="bg-brand-accent/10 px-3 py-1 text-[8px] font-bold text-brand-accent uppercase tracking-widest rounded-full">Wholesale Applied</span>}
                                        </div>
                                    </div>
                                    <div className="text-right hidden sm:block">
                                        {setupFeeApplied && <p className="text-[9px] text-black/30 uppercase tracking-widest font-bold mb-1">+ Basic Setup Fee (Area &lt; 20ft)</p>}
                                        <p className="text-[9px] text-black/30 uppercase tracking-widest font-bold">Standard Lead Time: 3-5 Working Days</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {product.isCustom ? (
                                        <button
                                            onClick={handleAction}
                                            className="col-span-2 bg-[#25D366] text-white py-8 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-[#128C7E] transition-all flex items-center justify-center gap-4"
                                        >
                                            <MessageCircle size={20} /> Chat on WhatsApp
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleAction}
                                                disabled={price === 0 || validationErrors.length > 0}
                                                className={`py-8 text-[11px] font-bold uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all ${price > 0 && validationErrors.length === 0 ? 'bg-brand-black text-white hover:bg-brand-accent' : 'bg-black/5 text-black/40 cursor-not-allowed'}`}
                                                title={validationErrors.length > 0 ? validationErrors.join('\n') : ''}
                                            >
                                                {price > 0 && validationErrors.length === 0 ? <><ShoppingCart size={18} /> Add to Bag</> : 'Select Options to Configure'}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    const message = `Corporate Quote Request:%0A Product: ${product.title}%0A My approximate requirements are ${quantityOption ? quantityOption.label : customQty} units.`;
                                                    window.open(`https://wa.me/923481342505?text=${message}`, '_blank');
                                                }}
                                                className="py-8 bg-white border border-black/10 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-brand-black hover:text-white transition-all"
                                            >
                                                Wholesale Inquiry
                                            </button>
                                        </>
                                    )}
                                </div>
                                
                                {/* Validation Errors */}
                                {validationErrors.length > 0 && (
                                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="text-red-700 text-[10px] font-bold uppercase tracking-wider mb-2">Configuration Issues:</div>
                                        <ul className="space-y-1">
                                            {validationErrors.map((error, idx) => (
                                                <li key={idx} className="text-red-600 text-[9px]">• {error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="flex items-center justify-center gap-6 opacity-20">
                                    <span className="h-px flex-1 bg-black" />
                                    <InfoIcon size={14} />
                                    <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Bespoke Order Verified</span>
                                    <span className="h-px flex-1 bg-black" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
