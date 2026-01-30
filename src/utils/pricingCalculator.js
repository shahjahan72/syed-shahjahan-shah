export const PRICING_RULES = {
    // Margin Multipliers based on Quantity
    quantityMultipliers: [
        { max: 50, multiplier: 2.0 },
        { max: 200, multiplier: 1.6 },
        { max: 1000, multiplier: 1.4 },
        { max: Infinity, multiplier: 1.3 }
    ],
    // Setup Fee Rules
    setupFee: {
        cost: 200,
        quantityThreshold: 20, // Units
        areaThreshold: 20 // Sqft
    }
};

/**
 * Calculates the total price for a product configuration
 * @param {Object} product - The product definition
 * @param {Object} config - User selection { quantity, dimensions, material, printType, finishes }
 * @returns {Object} { total, unitPrice, breakdown, isEstimate }
 */
export const calculatePrice = (product, config) => {
    const { quantity, dimensions, material, printType, finishes = [] } = config;

    // Safety check
    if (!product || !quantity || quantity <= 0) {
        return { total: 0, unitPrice: 0, breakdown: {}, valid: false };
    }

    const isSqft = product.unit === 'sqft';
    let totalBaseCost = 0;
    let setupFee = 0;
    let margin = 1.0;
    let area = 0;
    let finalPrice;
    let skipAutoSetup = false; // used to prevent adding setup twice for special products

    // 1. Determine Quantity Multiplier (Margin)
    // For sqft items, usually margin logic implies quantity of *items* or *total area*? 
    // The prompt says "Quantity Range | Multiplier". Assuming 'Quantity' refers to units for fixed interactions.
    // For Flex/Large Format, usually it's per sqft. 
    // Let's assume margin is based on UNITS for item products, and AREA for sqft products?
    // Prompt says "1-50 -> 2.0x". 
    // For Flex: "Rs. 15 base". Selling price typically ~25-30. 15 * 2.0 = 30. Matches.
    // So for Sqft, we check total Area or just use standard logic?
    // Let's use 'quantity' input for logic matching.

    const qtyForMargin = isSqft ? (dimensions.width * dimensions.height * quantity) : quantity;
    const rule = PRICING_RULES.quantityMultipliers.find(r => qtyForMargin <= r.max);
    margin = rule ? rule.multiplier : 1.3;

    // 2. Base Material Cost
    if (material && material.cost) {
        if (isSqft) {
            area = (dimensions.width || 0) * (dimensions.height || 0) * quantity;
            totalBaseCost += material.cost * area;
        } else {
            totalBaseCost += material.cost * quantity;
        }
    }

    // 3. Printing Cost
    if (printType && printType.cost) {
        if (isSqft) {
            // "Print (Flex) Rs 35 / sqft" 
            // Usually print cost is per sqft for large format
            totalBaseCost += printType.cost * area;
        } else {
            // "Single Color Rs 3" per unit
            totalBaseCost += printType.cost * quantity;
        }
    }

    // 4. Finishing Cost (Array)
    if (finishes && finishes.length > 0) {
        finishes.forEach(finish => {
            if (finish.cost) {
                if (isSqft) {
                    // "Lamination Rs 12 / sqft"
                    totalBaseCost += finish.cost * area;
                } else {
                    // "Matte Lamination Rs 6" per unit
                    totalBaseCost += finish.cost * quantity;
                }
            }
        });
    }

    // Special Product Logic (Market standard rules for specific gift items)
    // Mugs: base material + print per unit, margin applied on per-unit subtotal
    if (product.id === 'mug-printing') {
        // expect material.cost and printType.cost
        const materialCost = (material && material.cost) || 0;
        const printCost = (printType && printType.cost) || 0;
        const perUnit = materialCost + printCost;
        const qty = quantity || 1;
        // apply margin per quantity bracket
        const mugRule = PRICING_RULES.quantityMultipliers.find(r => qty <= r.max);
        const mugMargin = mugRule ? mugRule.multiplier : 1.3;
        let subtotal = perUnit * qty * mugMargin;
        // no automatic setup fee for mugs
        finalPrice = subtotal;
        skipAutoSetup = true;
        skipAutoSetup = true;
    }

    // T-Shirts: base material + print cost, allow fixed price floor
    else if (product.id === 'custom-tshirt') {
        const materialCost = (material && material.cost) || 0;
        const printCost = (printType && printType.cost) || 0;
        const perUnit = materialCost + printCost;
        const qty = quantity || 1;
        const tshirtRule = PRICING_RULES.quantityMultipliers.find(r => qty <= r.max);
        const tshirtMargin = tshirtRule ? tshirtRule.multiplier : 1.3;
        let subtotal = perUnit * qty * tshirtMargin;
        // ensure minimum selling price approximates product.price if defined
        if (product.price && Math.round(subtotal / qty) < product.price) {
            subtotal = product.price * qty;
        }
        finalPrice = subtotal;
        skipAutoSetup = true;
    }

    // Business Cards: per-unit micro-cost + printing + finishes, setup fee applies for small runs
    else if (product.id === 'business-cards') {
        const perUnitMaterial = (material && material.cost) || 0;
        const perUnitPrint = (printType && printType.cost) || 0;
        const perUnitFinishes = (finishes && finishes.reduce((s, f) => s + (f.cost || 0), 0)) || 0;
        const qty = quantity || 1;
        const basePerUnit = perUnitMaterial + perUnitPrint + perUnitFinishes;
        const cardRule = PRICING_RULES.quantityMultipliers.find(r => qty <= r.max);
        const cardMargin = cardRule ? cardRule.multiplier : 1.3;
        let subtotal = basePerUnit * qty * cardMargin;
        // Setup fee if below threshold
        if (qty < PRICING_RULES.setupFee.quantityThreshold) {
            subtotal += PRICING_RULES.setupFee.cost;
            setupFee = PRICING_RULES.setupFee.cost;
            skipAutoSetup = true; // already applied
        }
        finalPrice = subtotal;
    }

    // Default: apply margin to accumulated base cost
    else {
        // 5. Apply Margin
        finalPrice = totalBaseCost * margin;
    }

    // If finalPrice is still undefined for any reason, fallback to base cost * margin
    if (typeof finalPrice === 'undefined') {
        finalPrice = totalBaseCost * margin;
    }

    // 6. Setup Fee
    let applySetup = false;
    if (isSqft) {
        if (area < PRICING_RULES.setupFee.areaThreshold) applySetup = true;
    } else {
        if (quantity < PRICING_RULES.setupFee.quantityThreshold) applySetup = true;
    }

    if (applySetup && !skipAutoSetup) {
        finalPrice += PRICING_RULES.setupFee.cost;
        setupFee = PRICING_RULES.setupFee.cost;
    }

    return {
        total: Math.round(finalPrice),
        unitPrice: quantity > 0 ? Math.round(finalPrice / quantity) : 0,
        breakdown: {
            baseCost: totalBaseCost,
            marginMultiplier: margin,
            setupFee: setupFee
        },
        valid: true
    };
};
