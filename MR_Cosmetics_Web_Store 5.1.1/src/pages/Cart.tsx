import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag, Receipt, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

export default function Cart() {
  const { cart, products, updateQuantity, removeFromCart } = useAppContext();

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean) as (any)[];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const vat = subtotal * 0.16;
  const shipping = subtotal > 150 ? 0 : 15;
  const total = subtotal + vat + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center py-32 px-4">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="text-center space-y-8"
         >
            <div className="w-24 h-24 bg-brand-forest/5 rounded-full flex items-center justify-center text-brand-gold mx-auto border border-dashed border-brand-gold/20">
               <ShoppingBag size={40} />
            </div>
            <div className="space-y-4">
               <h2 className="serif text-5xl italic text-brand-forest">Your collection awaits</h2>
               <p className="text-brand-forest/60 max-w-sm mx-auto">It seems your vanity is currently empty. Explore our forest-sourced treasures to begin your ritual.</p>
            </div>
            <Link to="/shop" className="inline-block px-12 py-4 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-brand-gold hover:text-brand-forest transition-colors shadow-xl">
               Begin Ritual
            </Link>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
       <div className="marble-bg text-brand-cream pt-20 pb-20 px-4 mb-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="text-center md:text-left space-y-2">
                <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">Review</p>
                <h1 className="text-4xl md:text-6xl serif italic">Your Vanity Collection</h1>
             </div>
             <div className="flex space-x-12">
                <div className="text-center">
                   <p className="text-brand-gold text-lg font-bold serif italic">{cartItems.length}</p>
                   <p className="text-[10px] uppercase font-bold tracking-widest text-brand-cream/60">Treasures</p>
                </div>
                <div className="text-center">
                   <p className="text-brand-gold text-lg font-bold serif italic">${total.toFixed(2)}</p>
                   <p className="text-[10px] uppercase font-bold tracking-widest text-brand-cream/60">Est. Total</p>
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* List */}
          <div className="lg:col-span-2 space-y-6">
             <AnimatePresence mode="popLayout">
                {cartItems.map((item) => (
                   <motion.div 
                     layout
                     key={item.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     className="bg-white rounded-[40px] p-6 border border-brand-forest/5 flex flex-col sm:flex-row items-center gap-8 group shadow-sm hover:shadow-lg transition-shadow"
                   >
                      <Link to={`/product/${item.id}`} className="w-40 h-40 rounded-3xl overflow-hidden shrink-0 border border-brand-forest/5">
                         <img 
                           src={item.images[0]} 
                           className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                           referrerPolicy="no-referrer"
                         />
                      </Link>
                      <div className="flex-1 space-y-4 text-center sm:text-left">
                         <div>
                            <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">{item.category}</p>
                            <h3 className="serif text-2xl text-brand-forest italic">{item.name}</h3>
                         </div>
                         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center justify-center sm:justify-start bg-brand-cream rounded-full px-4 py-2 space-x-6 border border-brand-forest/5">
                               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-brand-forest hover:text-brand-gold"><Minus size={14} /></button>
                               <span className="font-bold text-xs w-4 text-center">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-brand-forest hover:text-brand-gold"><Plus size={14} /></button>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start space-x-8">
                               <span className="serif text-xl text-brand-forest font-light">${(item.price * item.quantity).toFixed(2)}</span>
                               <button 
                                 onClick={() => removeFromCart(item.id)}
                                 className="p-3 text-brand-forest/30 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                               >
                                  <Trash2 size={18} />
                               </button>
                            </div>
                         </div>
                      </div>
                   </motion.div>
                ))}
             </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="space-y-8">
             <div className="bg-brand-forest text-brand-cream rounded-[40px] p-8 space-y-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                   <Receipt size={120} />
                </div>
                
                <h2 className="serif text-3xl italic relative z-10">Ritual Summary</h2>
                
                <div className="space-y-4 text-sm font-light relative z-10">
                   <div className="flex justify-between">
                      <span className="opacity-60">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="opacity-60">VAT (16%)</span>
                      <span>${vat.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                      <span className="opacity-60">Shipping</span>
                      <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                   </div>
                   <div className="pt-4 border-t border-brand-cream/10 flex justify-between items-end">
                      <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Total</span>
                      <span className="serif text-3xl italic">${total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="space-y-4 relative z-10 pt-4">
                   <p className="text-[8px] uppercase tracking-widest text-brand-cream/40 text-center mb-2">Review our <Link to="/shipping-returns" className="text-brand-gold underline underline-offset-4">Shipping & Returns Rituals</Link></p>
                   <div className="bg-brand-cream/5 rounded-2xl p-4 border border-brand-cream/10">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Promo Code</span>
                         <span className="text-[10px] opacity-40 italic">Try MRC10</span>
                      </div>
                      <div className="flex gap-2">
                         <input type="text" className="bg-transparent border border-brand-cream/20 rounded-lg py-2 px-3 text-sm flex-1 outline-none focus:border-brand-gold transition-colors" placeholder="ENTER CODE" />
                         <button className="bg-brand-gold text-brand-forest px-4 rounded-lg font-bold text-[10px] uppercase">Apply</button>
                      </div>
                   </div>

                   <Link to="/checkout" className="w-full h-16 bg-brand-gold text-brand-forest rounded-full flex items-center justify-center font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-transform shadow-xl">
                      Proceed to Checkout
                      <ArrowRight className="ml-2" size={16} />
                   </Link>
                </div>
             </div>

             <div className="bg-white rounded-[40px] p-8 border border-brand-forest/5 flex items-center gap-6">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shrink-0">
                   <ShieldCheck size={24} />
                </div>
                <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-brand-forest">Secure Payment</p>
                   <p className="text-[10px] text-brand-forest/50 leading-relaxed">Your transaction is encrypted and secured by world-class standards.</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
