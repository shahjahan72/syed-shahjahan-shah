import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';

// Pages
import Portfolio from './pages/Portfolio';
import ShopLanding from './pages/shop/ShopLanding';
import ProductDetail from './pages/shop/ProductDetail';
import Checkout from './pages/shop/Checkout';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <main className="relative min-h-screen w-full bg-deep-black text-white selection:bg-neon-purple/30">
          <CustomCursor />

          {/* Noise Overlay Global */}
          <div className="noise-bg" />

          <Navigation />

          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/shop" element={<ShopLanding />} />
            <Route path="/shop/product/:id" element={<ProductDetail />} />
            <Route path="/shop/checkout" element={<Checkout />} />
          </Routes>

        </main>
      </CartProvider>
    </Router>
  );
};

export default App;
