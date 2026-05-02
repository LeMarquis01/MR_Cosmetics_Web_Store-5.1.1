import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingBag, User, Search, Settings, Menu, X, LogOut } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const { cart, user: appUser } = useAppContext();
  const { user: authUser, logout } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const isAdmin = authUser?.email === 'member@mrcosmetics.co.ug' || authUser?.email === 'micahndungu01@gmail.com';

  return (
    <nav className="sticky top-0 z-50 bg-brand-cream border-b border-brand-forest/10">
      <div className="marble-bg h-1 w-full" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative">
              <div className="w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-forest font-bold text-xl serif animate-float shadow-lg">
                MR
              </div>
              <div className="absolute -inset-1 border border-brand-gold/30 rounded-full animate-orbit opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="ml-3 hidden sm:block">
              <span className="text-xl font-bold tracking-tight text-brand-forest uppercase">Cosmetics</span>
              <p className="text-[8px] text-brand-gold font-semibold uppercase tracking-[0.2em] -mt-1">Natural Beauty and Wellness</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink to="/shop" className={({ isActive }) => cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-gold", isActive ? "text-brand-gold" : "text-brand-forest")}>Shop</NavLink>
            <NavLink to="/reviews" className={({ isActive }) => cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-gold", isActive ? "text-brand-gold" : "text-brand-forest")}>Reviews</NavLink>
            <NavLink to="/why-mr" className={({ isActive }) => cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-gold", isActive ? "text-brand-gold" : "text-brand-forest")}>Why MR?</NavLink>
            {!authUser && <NavLink to="/login" className={({ isActive }) => cn("text-sm font-medium tracking-wide uppercase transition-colors hover:text-brand-gold", isActive ? "text-brand-gold" : "text-brand-forest")}>Login</NavLink>}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 text-brand-forest hover:text-brand-gold transition-colors">
              <Search size={20} />
            </button>
            <Link to="/cart" className="relative p-2 text-brand-forest hover:text-brand-gold transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-brand-gold text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/dashboard" className="p-2 text-brand-forest hover:text-brand-gold transition-colors">
              {authUser?.photoURL ? (
                <img src={authUser.photoURL} alt="User" className="w-6 h-6 rounded-full" />
              ) : (
                <User size={20} />
              )}
            </Link>
            {isAdmin && (
              <Link to="/admin" className="p-2 text-brand-forest hover:text-brand-gold transition-colors">
                <Settings size={20} />
              </Link>
            )}
            {authUser && (
              <button 
                onClick={logout}
                className="p-2 text-brand-forest/40 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            )}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full bg-brand-cream border-b border-brand-forest/10 p-4 shadow-xl"
          >
            <div className="max-w-3xl mx-auto flex items-center bg-white border border-brand-forest/20 rounded-full px-4 py-2">
              <Search className="text-brand-forest/40 mr-2" size={18} />
              <input 
                autoFocus
                placeholder="Search products, ingredients, collections..." 
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
              />
              <button className="text-xs uppercase font-bold text-brand-gold">Search</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 md:hidden bg-brand-cream flex flex-col pt-24 px-8"
          >
            <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-8 right-8 p-2"><X size={24} /></button>
            <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">Home</NavLink>
            <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">Shop</NavLink>
            <NavLink to="/reviews" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">Reviews</NavLink>
            <NavLink to="/why-mr" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">Why MR?</NavLink>
            <NavLink to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">Login</NavLink>
            <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl serif font-light py-4 border-b border-brand-forest/10">My Account</NavLink>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
