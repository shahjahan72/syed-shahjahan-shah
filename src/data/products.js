import { weddingGroups } from './weddingGroups';

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

export const pricingConfig = {
    margins: {
        small: 2.0,   // 100% Profit 
        medium: 1.6,  // 60% Profit
        large: 1.4,   // 40% Profit
        bulk: 1.3     // 30% Profit (Auto Discount)
    },
    thresholds: {
        small: 50,
        medium: 200,
        bulk: 1000
    },
    setupFee: 200,
    setupFeeThreshold: 20
};

export const products = [
    // ... (keep all outdoor/indoor items unchanged)
    // ... (keep 1. Outdoor Advertising items)
    {
        id: 'panaflex',
        categoryId: 'outdoor',
        title: 'Panaflex Printing',
        description: 'Common flexible banners aur hoardings ke liye economical solution.',
        baseCost: 27,
        unit: 'sqft',
        image: '/assets/products/01_penaflex_banner.jpg',
        options: {
            material: [
                { name: 'China Flex (Normal)', multiplier: 1.0 },
                { name: 'UV / Star UV Print', multiplier: 1.37 }, // Approx 37/27
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'backlit-board',
        categoryId: 'outdoor',
        title: 'Backlit Board (Light Wala)',
        description: 'Raat ko light se chamakne wale boards. Premium Star Flex.',
        baseCost: 160, // Skin Change base
        unit: 'sqft',
        image: '/assets/products/02_backlit_board.jpg',
        options: {
            material: [
                { name: 'Skin Change (Flex Only)', multiplier: 1.0 },
                { name: 'New Board (Complete Box)', multiplier: 4.375 }, // 700/160
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
        image: '/assets/products/03_frontlit_board.jpg',
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
        baseCost: 80,
        unit: 'sqft',
        image: '/assets/products/04_vinyl_print.jpg',
        options: {
            material: [
                { name: 'Gloss Vinyl (No Lamination)', multiplier: 1.0 },
                { name: 'Gloss Vinyl + Lamination', multiplier: 1.5 }, // 120/80
                { name: 'Matte Vinyl (No Lamination)', multiplier: 1.0 },
                { name: 'Matte Vinyl + Lamination', multiplier: 1.5 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'one-way-vision',
        categoryId: 'outdoor',
        title: 'One Way Vision',
        description: 'Sheeshay ke liye sticker - bahar se graphics, andar se clear view.',
        baseCost: 80,
        unit: 'sqft',
        image: '/assets/products/05_oneway_vision.jpg',
        options: {
            material: [
                { name: 'Standard (No Lamination)', multiplier: 1.0 },
                { name: 'With Lamination', multiplier: 1.5 },
            ],
            sizeType: 'custom'
        }
    },
    {
        id: 'wall-wraps',
        categoryId: 'indoor',
        title: 'Wall Wraps / Wallpapers',
        description: 'Complete wall branding for offices and homes.',
        baseCost: 57, // 37 print + 20 labor
        unit: 'sqft',
        image: '/assets/products/06_custom_wallpaper.jpg',
        options: {
            material: [
                { name: 'UV Flex Texture (Smell-free)', multiplier: 1.0 },
            ],
            sizeType: 'custom'
        }
    },


    // --- Fixed Price Items (Packaging etc) ---
    {
        id: 'bottle-labels',
        categoryId: 'packaging',
        title: 'Bottle Labels',
        description: 'Waterproof stickers for Juice, Water, or Oil bottles.',
        price: 499, // Base selling price for min order
        unit: 'fixed',
        image: '/assets/products/11_bottle_labels.jpg',
        options: {
            material: [
                { name: 'Paper Sticker + Lamination', multiplier: 1.0 },
                { name: 'Vinyl Waterproof', multiplier: 1.5 },
                { name: 'Die-Cut Vinyl', multiplier: 1.8 },
            ],
            quantity: [
                { label: '100 Labels', value: 100 },
                { label: '500 Labels', value: 500 },
                { label: '1000 Labels', value: 1000 },
            ]
        }
    },
    {
        id: 'die-cut-stickers',
        categoryId: 'packaging',
        title: 'Die-Cut Stickers',
        description: 'Kisi bhi custom shape mein cut hone wale brand stickers.',
        price: 799,
        unit: 'fixed',
        image: '/assets/products/12_diecut_stickers.jpg',
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
        image: '/assets/products/13_shopping_bags.jpg',
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
        price: 2000,
        unit: 'fixed',
        image: '/assets/products/14_visiting_cards.jpg',
        options: {
            material: [
                { name: 'Matte/Gloss Single Side', multiplier: 1.0 },
                { name: 'Matte/Gloss Double Side', multiplier: 1.75 }, // 3499 / 1999
                { name: 'Embossed / Spot UV (Double)', multiplier: 2.5 }, // 4999 / 1999
            ],
            quantity: [
                { label: '1000 Cards', value: 1000 },
                { label: '2000 Cards', value: 2000 },
                { label: '5000 Cards', value: 5000 },
            ]
        }
    },
    {
        id: 'pvc-cards',
        categoryId: 'stationery',
        title: 'Premium PVC Cards',
        description: 'Atm card jesa sakht plastic card. Long life & waterproof.',
        price: 2499, // 50rs * 50 cards min -> 2500 -> 2499
        unit: 'fixed',
        image: '/assets/products/14_visiting_cards.jpg',
        options: {
            material: [
                { name: 'PVC Plastic Card', multiplier: 1.0 },
            ],
            quantity: [
                { label: '50 Cards', value: 50 },
                { label: '100 Cards', value: 100 },
                { label: '500 Cards', value: 500 },
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
        image: '/assets/products/15_brochure_flyer.jpg',
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
        image: '/assets/products/16_bill_receipt_book.jpg',
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

    // --- Wedding Cards (Groups + Custom) ---
    {
        id: 'WC-CUSTOM',
        categoryId: 'wedding',
        title: 'Custom / Instagram Design',
        description: 'Have a specific design from Instagram or a video? Upload your reference and get a custom quote on WhatsApp.',
        price: 0,
        unit: 'fixed',
        isCustom: true,
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1470&auto=format&fit=crop',
        options: {
            material: [
                { name: 'Custom Request', multiplier: 1.0 },
            ],
            quantity: [
                { label: 'Discuss on WhatsApp', value: 0 },
            ]
        }
    },
    ...weddingGroups,

    // --- Gifts & Others ---
    {
        id: 'custom-tshirt',
        categoryId: 'gifts',
        title: 'T-Shirt Printing',
        description: 'Heat press ya screen printing. Company logo ya custom art.',
        price: 849,
        unit: 'fixed',
        image: '/assets/products/08_tshirt_printing.jpg',
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
        image: '/assets/products/07_mug_printing.jpg',
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
        image: '/assets/products/09_corporate_gifts.jpg',
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
        price: 1499,
        unit: 'fixed',
        image: '/assets/products/10_rollup_standee.jpg',
        options: {
            material: [
                { name: 'X-Standee (Economy)', multiplier: 1.0 },     // 1500
                { name: 'Roll-up Standee (Aluminum)', multiplier: 2.66 }, // 4000
            ],
            quantity: [
                { label: '1 Standee', value: 1 },
                { label: '2 Standees', value: 2 },
                { label: '4 Standees', value: 4 },
            ]
        }
    }
];
