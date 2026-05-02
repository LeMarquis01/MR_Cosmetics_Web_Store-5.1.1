import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import Reviews from './pages/Reviews';
import WhyMR from './pages/WhyMR';
import Login from './pages/Login';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ShippingReturns from './pages/ShippingReturns';
import Loyalty from './pages/Loyalty';
import { AnimatePresence } from 'motion/react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      <WishlistProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col font-sans selection:bg-brand-gold selection:text-brand-forest">
        <ScrollToTop />
        
        {/* Only show Navbar/Footer on public/user pages, not purely clean pages like Auth/Checkout if we want a focused experience */}
        {/* But for this multi-page complex app, I'll keep them consistent */}
        {!['/auth', '/checkout'].includes(location.pathname) && <Navbar />}
        
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/why-mr" element={<WhyMR />} />
              <Route path="/login" element={<Login />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/shipping-returns" element={<ShippingReturns />} />
              
              {/* Fallback for complex structure */}
              <Route path="/wellness" element={<Shop />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>

        {!['/auth', '/checkout'].includes(location.pathname) && <Footer />}
      </div>
        </AppProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
