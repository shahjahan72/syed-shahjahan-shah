// Printing Rules & Order Flow Specification
export const printingRules = {
    // Product Type Definitions
    productTypes: {
        area: {
            id: 'area',
            name: 'Area-Based Pricing',
            description: 'Products priced per square foot (banners, vinyl, wall wraps)',
            requires: ['width', 'height'],
            unit: 'sqft',
            setupFeeThreshold: 20, // sqft
            setupFeeAmount: 200,
            pricingLogic: 'baseCost * area * materialMultiplier * marginTier'
        },
        quantity: {
            id: 'quantity',
            name: 'Quantity-Based Pricing',
            description: 'Products priced per unit (cards, stickers, bags)',
            requires: ['quantity', 'material'],
            unit: 'unit',
            setupFeeThreshold: null,
            setupFeeAmount: null,
            pricingLogic: 'basePrice * quantity * materialMultiplier * marginTier'
        },
        quote: {
            id: 'quote',
            name: 'Custom Quote',
            description: 'Products requiring manual quotation (complex wedding cards, custom designs)',
            requires: ['whatsapp_enquiry'],
            unit: 'quote',
            setupFeeThreshold: null,
            setupFeeAmount: null,
            pricingLogic: 'manual_quote_only',
            disableCart: true
        }
    },

    // Pricing Logic
    pricingLogic: {
        // Margin tiers based on order size
        margins: {
            small: { threshold: 50, multiplier: 2.0, profit: '100%' }, // 100% profit
            medium: { threshold: 200, multiplier: 1.6, profit: '60%' }, // 60% profit
            large: { threshold: 1000, multiplier: 1.4, profit: '40%' }, // 40% profit
            bulk: { threshold: 1000, multiplier: 1.3, profit: '30%' }  // 30% profit
        },
        
        // Setup fee logic
        setupFee: {
            amount: 200,
            threshold: 20, // sqft
            appliesTo: ['area'], // Only applies to area-based products
            condition: 'totalArea < threshold'
        }
    },

    // Order Flow States
    orderStates: {
        PENDING_PROOF: {
            id: 'pending_proof',
            name: 'Pending Proof',
            description: 'Awaiting customer proof approval',
            requires: ['customer_approval']
        },
        APPROVED: {
            id: 'approved', 
            name: 'Approved',
            description: 'Customer has approved proof, ready for production',
            requires: ['production_ready']
        },
        IN_PRODUCTION: {
            id: 'in_production',
            name: 'In Production',
            description: 'Order is being manufactured',
            requires: ['manufacturing']
        },
        READY_FOR_DELIVERY: {
            id: 'ready_for_delivery',
            name: 'Ready for Delivery',
            description: 'Order completed, awaiting shipment',
            requires: ['shipping_ready']
        },
        DELIVERED: {
            id: 'delivered',
            name: 'Delivered',
            description: 'Order delivered to customer',
            requires: ['delivery_confirmed']
        }
    },

    // Cancellation & Revision Policy
    policies: {
        revisions: {
            allowed_before: 'approved', // Can revise before approval
            allowed_after: 'in_production', // Cannot revise after production starts
            cost_implications: 'revisions_after_approval_may_incur_additional_charges'
        },
        cancellation: {
            allowed_before: 'approved', // Can cancel before approval
            allowed_after: 'in_production', // Cannot cancel after production starts
            refund_policy: 'full_refund_before_approval_partial_after'
        }
    },

    // File Responsibility Disclaimer
    fileResponsibility: {
        customer_responsibility: [
            'Spelling accuracy in uploaded files',
            'Proper bleed and crop marks',
            'Correct color profiles (CMYK preferred)',
            'High resolution (minimum 300 DPI)',
            'Final artwork approval before production'
        ],
        company_responsibility: [
            'Color matching within industry standards',
            'Production quality matching approved proof',
            'Timely delivery as promised',
            'Material quality as specified'
        ]
    },

    // Tax Information
    taxInfo: {
        gst_applicable: false, // Set to true if GST registration is active
        gst_rate: 0, // Percentage if applicable
        tax_included: false, // Whether taxes are included in displayed prices
        tax_explanation: 'Prices displayed exclude any applicable taxes. Tax will be calculated at checkout if applicable.'
    },

    // Support Hours Clarification
    supportHours: {
        actual_hours: 'Mon-Sat, 10:00 AM - 8:00 PM',
        description: 'Extended Support Hours',
        emergency_contact: 'WhatsApp only for urgent matters outside business hours',
        response_time: 'Within 2 hours during business hours'
    }
};

// Enhanced product validation schema
export const productValidationSchema = {
    validateProductConfiguration: (product, config) => {
        const errors = [];
        
        // Validate required fields based on product type
        if (product.pricingType === 'area') {
            if (!config.dimensions || !config.dimensions.width || !config.dimensions.height) {
                errors.push('Width and height are required for area-based products');
            }
            if (config.dimensions.width <= 0 || config.dimensions.height <= 0) {
                errors.push('Width and height must be greater than 0');
            }
        }
        
        if (product.pricingType === 'quantity') {
            if (!config.quantity) {
                errors.push('Quantity is required for quantity-based products');
            }
            if (config.quantity <= 0) {
                errors.push('Quantity must be greater than 0');
            }
        }
        
        if (product.pricingType === 'quote') {
            // For quote products, no validation needed as they go to WhatsApp
            return { valid: true, errors: [] };
        }
        
        // Validate material selection
        if (!config.material) {
            errors.push('Material selection is required');
        }
        
        return {
            valid: errors.length === 0,
            errors
        };
    },

    getProductType: (product) => {
        if (product.unit === 'sqft') return 'area';
        if (product.isCustom) return 'quote';
        return 'quantity';
    }
};