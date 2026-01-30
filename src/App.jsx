import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import PageLoader from './components/PageLoader';
import ErrorBoundary from './components/ErrorBoundary';
import SkipNav from './components/SkipNav';
import StructuredData from './components/StructuredData';
import AnalyticsWrapper from './components/AnalyticsWrapper';

import SEO from './components/SEO';

// Components
import NavbarPro from './components/NavbarPro';
import FooterPro from './components/FooterPro';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import CartModalHandler from './components/CartModalHandler';

// Lazy Loaded Pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ShopLanding = lazy(() => import('./pages/shop/ShopLanding'));
const ProductDetail = lazy(() => import('./pages/shop/ProductDetail'));
const Checkout = lazy(() => import('./pages/shop/Checkout'));
const OrderStatus = lazy(() => import('./pages/OrderStatus'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const RefundPage = lazy(() => import('./pages/RefundPage'));
const PackagesPage = lazy(() => import('./pages/PackagesPage'));
const FaqPage = lazy(() => import('./pages/FaqPage'));

const App = () => {
  return (
    <Router>
      <ErrorBoundary>
        <CartProvider>
          <SEO />
          <StructuredData />
          <SkipNav />
          <AnalyticsWrapper>
            <div className="min-h-screen bg-brand-white text-brand-black transition-colors duration-300">
              <NavbarPro />
              <FloatingWhatsApp />
              <CartModalHandler />

              <main id="main-content" className="pt-20" tabIndex="-1">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<ShopLanding />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-status" element={<OrderStatus />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/account" element={<AuthPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/packages" element={<PackagesPage />} />
                    <Route path="/faq" element={<FaqPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/refund" element={<RefundPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>

              <FooterPro />
            </div>
          </AnalyticsWrapper>
        </CartProvider>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
