export const categories = [
    {
        id: 'outdoor',
        name: 'Outdoor Signs',
        description: 'Barray hoardings aur dukanon ke boards ke liye outdoor solutions.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    },
    {
        id: 'packaging',
        name: 'Custom Packaging',
        description: 'Bottle labels, stickers aur packaging solutions.',
        image: 'https://images.unsplash.com/photo-1616941842751-cb9e4ae5c325?q=80&w=1470&auto=format&fit=crop',
    },
    {
        id: 'stationery',
        name: 'Corporate Stationery',
        description: 'Visiting cards, letterheads aur marketing materials.',
        image: 'https://images.unsplash.com/photo-1606166187734-a433e10e5762?q=80&w=1470&auto=format&fit=crop',
    },
    {
        id: 'wedding',
        name: 'Wedding Cards',
        description: 'Shadi cards designs: Luxury boxes, floral, and traditional invites.',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1470&auto=format&fit=crop',
    },
    {
        id: 'gifts',
        name: 'Personalized Gifts',
        description: 'Mugs, T-shirts aur promotional items.',
        image: 'https://images.unsplash.com/photo-1503341338985-c0477be52513?q=80&w=1470&auto=format&fit=crop',
    },
    {
        id: 'indoor',
        name: 'Indoor & Large Format',
        description: 'Standees, banners aur wallpapers.',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1470&auto=format&fit=crop',
    }
];

// --- DYNAMIC PRICING CONFIGURATION ---
// Aap yahan se rates aur margins control kar sakte hain. "Base Cost" aapki khareed hai.
export const pricingConfig = {
    margins: {
        small: 2.0,   // 100% Profit (Multiplier 2.0)
        medium: 1.6,  // 60% Profit (Multiplier 1.6)
        large: 1.4,   // 40% Profit (Multiplier 1.4)
        bulk: 0       // Special case for manual quote
    },
    thresholds: {
        small: 50,    // 0-50 sqft
        medium: 200,  // 51-200 sqft
        bulk: 1000    // Above 1000 sqft -> Custom Quote
    },
    setupFee: 200,    // Fixed charge for orders < 20 sqft
    setupFeeThreshold: 20
};


export const products = [
    // --- 1. Outdoor Advertising (SQFT Items) ---
    {
        id: 'panaflex',
        categoryId: 'outdoor',
        title: 'Panaflex Printing',
        description: 'Common flexible banners aur hoardings ke liye economical solution.',
        baseCost: 15, // Aapki cost per sq ft
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1552554695-1f87b8973b18?q=80&w=1471&auto=format&fit=crop',
        options: {
            material: [
                { name: 'China Flex (Standard)', multiplier: 1.0 },
                { name: 'Star Flex (Heavy)', multiplier: 1.3 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'backlit-board',
        categoryId: 'outdoor',
        title: 'Backlit Board (Light Wala)',
        description: 'Raat ko light se chamakne wale boards. Premium Star Flex.',
        baseCost: 30, // Aapki cost per sq ft
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1542204637-e67bc7d41e48?q=80&w=1935&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Star Flex (Premium)', multiplier: 1.0 },
                { name: 'UV Ultra (Long Life)', multiplier: 1.5 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'frontlit-board',
        categoryId: 'outdoor',
        title: 'Frontlit Board',
        description: 'Aam dukanon ke boards jo bahar se light hotay hain.',
        baseCost: 25,
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard Frontlit', multiplier: 1.0 },
                { name: 'Heavy Duty', multiplier: 1.2 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'vinyl-printing',
        categoryId: 'outdoor',
        title: 'Vinyl Printing',
        description: 'Windows, sheet metal ya boards par chipkane wali sheet.',
        baseCost: 40,
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Matte Vinyl', multiplier: 1.0 },
                { name: 'Gloss Vinyl', multiplier: 1.0 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'one-way-vision',
        categoryId: 'outdoor',
        title: 'One Way Vision',
        description: 'Sheeshay ke liye sticker - bahar se graphics, andar se clear view.',
        baseCost: 55,
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard Perforated', multiplier: 1.0 },
                { name: 'Premium High-Vis', multiplier: 1.2 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'wall-wraps',
        categoryId: 'indoor',
        title: 'Wall Wraps / Wallpapers',
        description: 'Complete wall branding for offices and homes.',
        baseCost: 60,
        unit: 'sqft',
        image: 'https://images.unsplash.com/photo-1507149833265-60c372daea22?q=80&w=1476&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Matte Vinyl', multiplier: 1.0 },
                { name: 'Textured Wallpaper', multiplier: 1.4 },
            ],
            sizeType: 'custom'
        }
    },


    // --- Fixed Price Items (Pricing Strategy: Hardcoded or Bulk Discount Logic can be applied similarly) ---
    // For fixed items, we use 'price' as the selling price directly for now, 
    // but we can apply discounts if quantity > X.

    {
        id: 'bottle-labels',
        categoryId: 'packaging',
        title: 'Bottle Labels',
        description: 'Waterproof stickers for Juice, Water, or Oil bottles.',
        price: 500, // Base selling price for min order
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1616941842751-cb9e4ae5c325?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Waterproof Vinyl', multiplier: 1.0 },
                { name: 'Transparent Clear', multiplier: 1.2 },
            ],
            quantity: [
                { label: '100 Labels', value: 100 },
                { label: '500 Labels', value: 500 },
                { label: '1000 Labels', value: 1000 },
            ]
        }
    },
    // ... Keeping other fixed items same for now, but enabling logic in ProductDetail
    {
        id: 'die-cut-stickers',
        categoryId: 'packaging',
        title: 'Die-Cut Stickers',
        description: 'Kisi bhi custom shape mein cut hone wale brand stickers.',
        price: 800,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1628135899222-3a56e9c2049f?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Glossy Vinyl', multiplier: 1.0 },
                { name: 'Holographic', multiplier: 1.5 },
            ],
            quantity: [
                { label: '50 Stickers', value: 50 },
                { label: '100 Stickers', value: 100 },
                { label: '500 Stickers', value: 500 },
            ]
        }
    },
    {
        id: 'shopping-bags',
        categoryId: 'packaging',
        title: 'Custom Shopping Bags',
        description: 'Brand logo ke sath paper ya cloth bags.',
        price: 2500,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Kraft Paper', multiplier: 1.0 },
                { name: 'Art Paper (Gloss)', multiplier: 1.3 },
                { name: 'Cloth Bag', multiplier: 2.0 },
            ],
            quantity: [
                { label: '50 Bags', value: 50 },
                { label: '100 Bags', value: 100 },
                { label: '300 Bags', value: 300 },
            ]
        }
    },
    {
        id: 'business-cards',
        categoryId: 'stationery',
        title: 'Visiting Cards',
        description: 'Standard, Matte, ya UV spot finish mein cards.',
        price: 1500,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1592318464654-e9a038597033?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard Gloss', multiplier: 1.0 },
                { name: 'Matte Lamination', multiplier: 1.1 },
                { name: 'Velvet Soft Touch', multiplier: 1.3 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '500 Cards', value: 500 },
                { label: '1000 Cards', value: 1000 },
            ]
        }
    },
    {
        id: 'flyers',
        categoryId: 'stationery',
        title: 'Brochures & Flyers',
        description: 'Marketing ke liye A4/A5 flyers. Z-fold or Tri-fold.',
        price: 2000,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1586075935967-8bad02fb781b?q=80&w=2670&auto=format&fit=crop',
        options: {
            material: [
                { name: '130gsm Paper', multiplier: 1.0 },
                { name: '170gsm Thick', multiplier: 1.2 },
            ],
            quantity: [
                { label: '100 Copies', value: 100 },
                { label: '500 Copies', value: 500 },
                { label: '1000 Copies', value: 1000 },
            ]
        }
    },
    {
        id: 'bill-books',
        categoryId: 'stationery',
        title: 'Bill & Receipt Books',
        description: 'Carbon copy invoice books apke logo ke sath.',
        price: 450,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard NCR', multiplier: 1.0 },
            ],
            quantity: [
                { label: '1 Book', value: 1 },
                { label: '5 Books', value: 5 },
                { label: '10 Books', value: 10 },
            ]
        }
    },

    // --- Wedding Cards ---
    {
        id: 'luxury-box-card',
        categoryId: 'wedding',
        title: 'Luxury Box Invitation',
        description: 'Premium heavy board box with gold foiling and velvet finish.',
        price: 350, // Per Card
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Velvet Finish', multiplier: 1.0 },
                { name: 'Suede Finish', multiplier: 1.2 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '250 Cards', value: 250 },
                { label: '500 Cards', value: 500 },
            ]
        }
    },
    {
        id: 'floral-invitation',
        categoryId: 'wedding',
        title: 'Floral Modern Invite',
        description: 'Elegant single card with envelope and floral aesthetic.',
        price: 80, // Per Card
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0d0f5?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: '300gsm Art Card', multiplier: 1.0 },
                { name: 'Textured Paper', multiplier: 1.5 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '300 Cards', value: 300 },
                { label: '500 Cards', value: 500 },
            ]
        }
    },
    {
        id: 'budget-card',
        categoryId: 'wedding',
        title: 'Traditional Red Card',
        description: 'Classic economical wedding card with golden motifs.',
        price: 45, // Per Card
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard Card', multiplier: 1.0 },
                { name: 'Gloss Finish', multiplier: 1.2 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '500 Cards', value: 500 },
                { label: '1000 Cards', value: 1000 },
            ]
        }
    },
    {
        id: 'custom-tshirt',
        categoryId: 'gifts',
        title: 'T-Shirt Printing',
        description: 'Heat press ya screen printing. Company logo ya custom art.',
        price: 850,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=1469&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Cotton Round Neck', multiplier: 1.0 },
                { name: 'Polo Shirt', multiplier: 1.4 },
            ],
            quantity: [
                { label: '1 Shirt', value: 1 },
                { label: '5 Shirts', value: 5 },
                { label: '10 Shirts', value: 10 },
            ]
        }
    },
    {
        id: 'mug-printing',
        categoryId: 'gifts',
        title: 'Mug Printing',
        description: 'Personalized ceramic mugs.',
        price: 450,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard White', multiplier: 1.0 },
                { name: 'Magic Mug', multiplier: 1.5 },
            ],
            quantity: [
                { label: '1 Mug', value: 1 },
                { label: '6 Mugs', value: 6 },
                { label: '12 Mugs', value: 12 },
            ]
        }
    },
    {
        id: 'keychain-pen',
        categoryId: 'gifts',
        title: 'Keychains & Pens',
        description: 'Company branding promotional items.',
        price: 2500,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1589330694186-e91b31273934?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Plastic Pen + Keychain', multiplier: 1.0 },
                { name: 'Metal Premium Set', multiplier: 1.8 },
            ],
            quantity: [
                { label: '10 Sets', value: 1 },
                { label: '50 Sets', value: 5 },
            ]
        }
    },
    {
        id: 'roll-up-standee',
        categoryId: 'indoor',
        title: 'Roll-up Standee',
        description: 'Portable advertising stand banners (2x5 ft standard).',
        price: 1800,
        unit: 'fixed',
        image: 'https://images.unsplash.com/photo-1531973576160-7125cdcd63e7?q=80&w=2574&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Standard Star Flex', multiplier: 1.0 },
                { name: 'Textured Media', multiplier: 1.3 },
            ],
            quantity: [
                { label: '1 Standee', value: 1 },
                { label: '2 Standees', value: 2 },
                { label: '4 Standees', value: 4 },
            ]
        }
    }
];
