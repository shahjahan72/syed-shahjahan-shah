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

    // Special Product Logic (T-Shirts, Mugs, etc if they have fixed base + print)
    // The prompt defines base costs for them. We can model them as 'material' cost.
    // e.g., T-Shirt Material (Cotton) = 550.

    // 5. Apply Margin
    let finalPrice = totalBaseCost * margin;

    // 6. Setup Fee
    let applySetup = false;
    if (isSqft) {
        if (area < PRICING_RULES.setupFee.areaThreshold) applySetup = true;
    } else {
        if (quantity < PRICING_RULES.setupFee.quantityThreshold) applySetup = true;
    }

    if (applySetup) {
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
