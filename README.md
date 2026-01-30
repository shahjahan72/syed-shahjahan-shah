# Printify Studio PK 🖨️✨

**Professional Printing & Branding Solutions | E-commerce Platform**

Printify Studio PK is a premium, high-performance web application designed for a modern printing press and branding agency in Pakistan. It features a sophisticated "Print Factory" pricing engine, custom product builders, and a seamless WhatsApp-integrated checkout flow.

![Printify Studio Preview](/public/assets/og-preview.png)

## 🚀 Key Features

### 1. 🏗️ Advanced Pricing Engine
- **Real-time Cost Calculation**: Backend-grade logic runs in the browser to calculate exact costs based on base material, quantity tiers, printing sides, and premium finishes.
- **Complex Logic Handling**: Supports both **Unit-based** (Business Cards, Mugs) and **Area-based** (Flex, Vinyl per sqft) pricing.
- **Dynamic Margins**: Automatic bulk discounts (Qty x Multiplier ranges) and setup fee enforcement for small orders.

### 2. 🛍️ E-commerce & Product Builder
- **Deep Customization**: Users can configure detailed specifications:
  - **Material**: 80gsm to 350gsm, Star Flex vs China Flex.
  - **Print Type**: Single/Double color, UV Print, etc.
  - **Finishes**: Matte/Gloss Lamination, Spot UV, Die-Cutting, Embossing.
- **Custom Branding Packages**: specialized UI for building "Startup Kits" (Logo + Stationery + Digital Assets).
- **Product Range**: Covers Everything including Corporate Stationery, Large Format Outdoor Advertising, Packaging (Boxes/Labels), and Corporate Gifts.

### 3. ⚡ Modern User Experience
- **Premium Aesthetics**: Glassmorphism effects, sophisticated typography (Montserrat & Playfair Display), and smooth transitions.
- **Framer Motion Animations**: Interactive page loads and hover effects.
- **WhatsApp Checkout**: Direct-to-business logic where the cart compiles a detailed formatted message sent instantly to the agency's WhatsApp.

### 4. 🔍 SEO & Performance
- **Dynamic Metadata**: Page-level SEO using `react-helmet-async` for unique titles and descriptions.
- **Rich Social Previews**: Custom Open Graph implementation ensuring professional link previews on WhatsApp, Facebook, and LinkedIn.
- **Optimized Assets**: Lazy loading and font preloading for fast performance.

---

## 🛠️ Technology Stack

- **Core**: React 18, Vite
- **Styling**: Tailwind CSS, Custom CSS Variables
- **Routing**: React Router DOM v6
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **SEO**: React Helmet Async
- **Utilities**: Custom Pricing Calculators

---

## 📂 Project Structure

```bash
src/
├── components/          # Reusable UI components (SEO, Navbar, Footer, etc.)
├── context/             # React Context (CartContext)
├── data/                
│   ├── products.js      # Central database of products & configuration options
│   └── printingRules.js # Validation schemas
├── pages/               
│   ├── shop/            # E-commerce pages (ShopLanding, ProductDetail)
│   └── ...              # Static pages (Packages, Contact, etc.)
├── utils/               
│   └── pricingCalculator.js # Core pricing business logic
├── styles/              # Global CSS & Tailwind directives
└── App.jsx              # Main Layout & Routing
```

---

## 🚦 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 🏷️ Pricing Logic Configuration

The pricing rules are strictly defined in `src/utils/pricingCalculator.js` and `src/data/products.js`:
- **Material Cost**: Defined per unit or sqft.
- **Print Cost**: Added on top of base material.
- **Finishes**: Add-ons like Lamination (per unit/sqft).
- **Setup Fee**: Automatically applied for orders under 20 units or 20 sqft.

---

© 2026 Printify Studio PK. All Rights Reserved.
