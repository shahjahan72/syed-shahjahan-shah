import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import ErrorBoundary from './components/ErrorBoundary';
import SkipNav from './components/SkipNav';
import StructuredData from './components/StructuredData';
import AnalyticsWrapper from './components/AnalyticsWrapper';

// Lazy Loaded Pages
const Portfolio = lazy(() => import('./pages/Portfolio'));
const ShopLanding = lazy(() => import('./pages/shop/ShopLanding'));
const ProductDetail = lazy(() => import('./pages/shop/ProductDetail'));
const Checkout = lazy(() => import('./pages/shop/Checkout'));
const OrderStatus = lazy(() => import('./pages/OrderStatus'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <CartProvider>
          <StructuredData />
          <SkipNav />
          <AnalyticsWrapper>
            <main id="main-content" className="relative min-h-screen w-full bg-deep-black text-white selection:bg-neon-purple/30" tabIndex="-1">
            <CustomCursor />

            {/* Noise Overlay Global */}
            <div className="noise-bg" />

            <Navigation />

            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/shop" element={<ShopLanding />} />
                <Route path="/shop/product/:id" element={<ProductDetail />} />
                <Route path="/shop/checkout" element={<Checkout />} />
                <Route path="/order-status" element={<OrderStatus />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

          </main>
        </AnalyticsWrapper>
        </CartProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
