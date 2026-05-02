import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="marble-bg text-brand-cream pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-forest font-bold text-2xl serif">MR</div>
              <div className="ml-3">
                <span className="text-xl font-bold tracking-tight uppercase">Cosmetics</span>
                <p className="text-[8px] text-brand-gold font-semibold uppercase tracking-[0.2em] -mt-1">Natural Beauty and Wellness</p>
              </div>
            </Link>
            <p className="text-brand-cream/60 text-sm leading-relaxed">
              MR Cosmetics Ltd operates as a premium botanical laboratory, crafting artisanal beauty and wellness solutions inspired by the lush forests and rich botanicals of East Africa.
            </p>

          </div>

          {/* Links */}
          <div>
            <h4 className="text-brand-gold uppercase text-xs font-bold tracking-widest mb-6">Explore</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link></li>
              <li><Link to="/shop?cat=Skincare" className="hover:text-brand-gold transition-colors">Skincare</Link></li>
              <li><Link to="/shop?cat=Haircare" className="hover:text-brand-gold transition-colors">Haircare</Link></li>
              <li><Link to="/shop?cat=Body" className="hover:text-brand-gold transition-colors">Body Rituals</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-brand-gold uppercase text-xs font-bold tracking-widest mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/terms" className="hover:text-brand-gold transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-gold transition-colors">Privacy Policy</Link></li>
              <li><Link to="/shipping-returns" className="hover:text-brand-gold transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/loyalty" className="hover:text-brand-gold transition-colors">Loyalty Rewards</Link></li>
            </ul>
          </div>

            <div className="space-y-6">
            <h4 className="text-brand-gold uppercase text-xs font-bold tracking-widest mb-6">Contact Information</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-brand-gold shrink-0" />
                <span className="text-brand-cream/80">MR Cosmetics Ltd<br />Kampala, Uganda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span className="text-brand-cream/80">Phone/WhatsApp: +972 532290242, +256 [ ]</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span className="text-brand-cream/80">Email: - [ ]</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-top border-brand-cream/10 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-brand-cream/40">
          <p>© 2026 MR COSMETICS LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
}
