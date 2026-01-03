export const weddingGroups = [
    {
        id: 'WC-ECONOMY',
        categoryId: 'wedding',
        title: 'Economy Series',
        description: 'Budget-friendly yet elegant designs. Perfect for large gatherings.',
        price: 35, // Base Price per card
        unit: 'fixed',
        moq: 100,
        printingCharge: 1000,
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1470&auto=format&fit=crop',
        isTemplateGroup: true,
        templatePrefix: 'ECO',
        totalDesigns: 20, // We will simulate 20 designs
        baseImageInfo: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=60', // Placeholder for all designs
        options: {
            material: [
                { name: 'Standard Card', multiplier: 1.0 },
                { name: 'Gloss Finish', multiplier: 1.1 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '250 Cards', value: 250 },
                { label: '500 Cards', value: 500 },
                { label: '1000 Cards', value: 1000 },
            ]
        }
    },
    {
        id: 'WC-PREMIUM',
        categoryId: 'wedding',
        title: 'Premium Floral & Laser',
        description: 'Intricate laser cuts and premium floral prints.',
        price: 85,
        unit: 'fixed',
        moq: 100,
        printingCharge: 1500,
        image: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0d0f5?q=80&w=1470&auto=format&fit=crop',
        isTemplateGroup: true,
        templatePrefix: 'PRM',
        totalDesigns: 15,
        baseImageInfo: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0d0f5?auto=format&fit=crop&w=400&q=60',
        options: {
            material: [
                { name: '300gsm Art Card', multiplier: 1.0 },
                { name: 'Textured Paper', multiplier: 1.25 },
            ],
            quantity: [
                { label: '100 Cards', value: 100 },
                { label: '200 Cards', value: 200 },
                { label: '500 Cards', value: 500 },
            ]
        }
    },
    {
        id: 'WC-LUXURY',
        categoryId: 'wedding',
        title: 'Luxury Box Series',
        description: 'Heavy board boxes with velvet styling and gold foiling.',
        price: 350,
        unit: 'fixed',
        moq: 50,
        printingCharge: 2000,
        image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1470&auto=format&fit=crop',
        isTemplateGroup: true,
        templatePrefix: 'LUX',
        totalDesigns: 10,
        baseImageInfo: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=400&q=60',
        options: {
            material: [
                { name: 'Velvet Finish', multiplier: 1.0 },
                { name: 'Suede + Gold Foil', multiplier: 1.3 },
            ],
            quantity: [
                { label: '50 Boxes', value: 50 },
                { label: '100 Boxes', value: 100 },
                { label: '200 Boxes', value: 200 },
            ]
        }
    }
];
