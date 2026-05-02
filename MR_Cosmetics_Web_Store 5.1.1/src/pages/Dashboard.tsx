import React, { useState, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { motion, AnimatePresence } from 'motion/react';
import { User, Package, Heart, MapPin, Settings as SettingsIcon, LogOut, Sparkles, ShoppingBag, ArrowRight, CreditCard } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

type Tab = 'overview' | 'orders' | 'wishlist' | 'profile' | 'addresses';

export default function Dashboard() {
  const appContext = useAppContext();
  const authContext = useAuth();
  const wishlistContext = useWishlist();

  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const user = appContext?.user;
  const orders = appContext?.orders || [];
  const products = appContext?.products || [];
  const logout = authContext?.logout;
  const wishlistItems = wishlistContext?.wishlistItems || [];
  const loadingWishlist = wishlistContext?.loading ?? false;

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
         <div className="text-center space-y-8">
            <h1 className="serif text-4xl italic text-brand-forest">Botanical Portal</h1>
            <Link to="/auth" className="px-12 py-4 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs">Sign In</Link>
         </div>
      </div>
    );
  }

  const wishlistedProducts = products.filter(p => (wishlistItems || []).some(item => item.productId === p.id));

  const tabs: { id: Tab, label: string, icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <User size={18} /> },
    { id: 'orders', label: 'My Orders', icon: <Package size={18} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={18} /> },
    { id: 'profile', label: 'Profile', icon: <SettingsIcon size={18} /> },
    { id: 'addresses', label: 'Addresses', icon: <MapPin size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
       <div className="marble-bg text-brand-cream pt-20 pb-32 px-4 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.2)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
             <div className="relative group">
                <div className="w-40 h-40 rounded-[60px] overflow-hidden border-4 border-brand-gold/30 shadow-2xl relative z-10">
                   <img 
                     src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                     className="w-full h-full object-cover" 
                     referrerPolicy="no-referrer"
                   />
                </div>
                <div className="absolute -inset-2 border border-brand-gold/20 rounded-[64px] animate-orbit opacity-50" />
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-brand-gold rounded-full flex items-center justify-center text-brand-forest shadow-xl z-20 hover:scale-110 transition-transform">
                   <Sparkles size={16} />
                </button>
             </div>
             <div className="space-y-4 text-center md:text-left">
                <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">Botanical Member</p>
                <h1 className="text-5xl md:text-7xl serif italic text-brand-cream">{user.name}</h1>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                   <div className="px-4 py-2 bg-brand-cream/10 border border-brand-cream/10 rounded-full flex items-center space-x-2">
                      <Sparkles className="text-brand-gold" size={14} />
                      <span className="text-xs font-bold text-brand-gold uppercase tracking-widest">{user.loyaltyPoints} Points</span>
                   </div>
                   <div className="px-4 py-2 bg-brand-cream/10 border border-brand-cream/10 rounded-full flex items-center space-x-2">
                      <Package className="opacity-50" size={14} />
                      <span className="text-xs font-bold opacity-60 uppercase tracking-widest">{orders.length} Orders</span>
                   </div>
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-30">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
             {/* Sidebar Nav */}
             <div className="lg:col-span-1">
                <div className="bg-white rounded-[40px] p-4 border border-brand-forest/5 shadow-xl space-y-1">
                   {tabs.map(tab => (
                     <button
                       key={tab.id}
                       onClick={() => setActiveTab(tab.id)}
                       className={cn(
                         "w-full p-4 rounded-3xl flex items-center space-x-4 transition-all group",
                         activeTab === tab.id ? "bg-brand-forest text-brand-cream" : "hover:bg-brand-cream text-brand-forest/60"
                       )}
                     >
                        <div className={cn("p-2 rounded-xl transition-colors", activeTab === tab.id ? "bg-brand-gold text-brand-forest" : "bg-brand-forest/5 group-hover:bg-brand-forest/10")}>
                           {tab.icon}
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">{tab.label}</span>
                     </button>
                   ))}
                   <div className="pt-4 mt-4 border-t border-brand-forest/5">
                      <button 
                        onClick={logout}
                        className="w-full p-4 rounded-3xl flex items-center space-x-4 text-red-500 hover:bg-red-50 transition-all"
                      >
                         <div className="p-2 rounded-xl bg-red-100 text-red-500">
                            <LogOut size={18} />
                         </div>
                         <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
                      </button>
                   </div>
                </div>
             </div>

             {/* Content Area */}
             <div className="lg:col-span-3">
                <div className="bg-white rounded-[60px] p-8 md:p-12 border border-brand-forest/5 shadow-sm min-h-[600px]">
                   <AnimatePresence mode="wait">
                      {activeTab === 'overview' && (
                        <motion.div 
                          key="overview"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="space-y-12"
                        >
                           <div className="flex justify-between items-end">
                              <h2 className="serif text-4xl italic text-brand-gold">Radiant Overview</h2>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Member since 2024</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <div className="bg-brand-forest marble-texture text-brand-cream rounded-[40px] p-8 space-y-6 relative overflow-hidden group">
                                 <div className="relative z-10 space-y-2">
                                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-brand-gold">Loyalty Ecosystem</p>
                                    <h3 className="serif text-4xl italic">{user.loyaltyPoints} Points</h3>
                                    <p className="text-xs opacity-60 leading-relaxed max-w-[200px]">Next reward at 500 points. You are close to a complimentary serum!</p>
                                 </div>
                                 <div className="relative z-10 pt-4">
                                    <div className="w-full h-1 bg-brand-cream/10 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ width: 0 }}
                                         animate={{ width: `${(user.loyaltyPoints / 500) * 100}%` }}
                                         className="h-full bg-brand-gold" 
                                       />
                                    </div>
                                    <p className="text-[9px] uppercase font-bold tracking-widest mt-2 opacity-40">90% to next tier</p>
                                 </div>
                                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-700">
                                    <Sparkles size={120} />
                                 </div>
                              </div>

                              <div className="bg-brand-cream rounded-[40px] p-8 border border-brand-forest/5 flex flex-col justify-between">
                                 <div className="space-y-4">
                                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Recent Activity</h4>
                                    <div className="space-y-4">
                                       {orders.slice(0, 2).map((order) => (
                                         <div key={order.id} className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-forest shadow-sm"><Package size={18} /></div>
                                            <div className="flex-1">
                                               <p className="text-[10px] font-bold text-brand-forest uppercase tracking-widest">Order {order.id}</p>
                                               <p className="text-[9px] text-brand-forest/40">{new Date(order.date).toLocaleDateString()}</p>
                                            </div>
                                            <span className="text-[10px] font-bold text-brand-gold uppercase">${order.total.toFixed(0)}</span>
                                         </div>
                                       ))}
                                       {orders.length === 0 && <p className="text-xs text-brand-forest/40 italic">No recent purchases found.</p>}
                                    </div>
                                 </div>
                                 <button onClick={() => setActiveTab('orders')} className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-forest hover:text-brand-gold group">
                                    View All Orders <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
                                 </button>
                              </div>
                           </div>

                           <div className="space-y-6">
                              <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Recommended Rituals</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                 <div className="p-6 bg-white border border-brand-forest/5 rounded-[32px] flex items-center space-x-4 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-cream shrink-0 flex items-center justify-center text-brand-gold"><CreditCard size={24} /></div>
                                    <div>
                                       <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">Save Payment</h5>
                                       <p className="text-[9px] text-brand-forest/40 leading-tight">Link your M-Pesa or Card for faster ritual access.</p>
                                    </div>
                                 </div>
                                 <div className="p-6 bg-white border border-brand-forest/5 rounded-[32px] flex items-center space-x-4 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-cream shrink-0 flex items-center justify-center text-brand-gold"><MapPin size={24} /></div>
                                    <div>
                                       <h5 className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">Set Location</h5>
                                       <p className="text-[9px] text-brand-forest/40 leading-tight">Pin your delivery sanctuary to ensure fresh arrival.</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                      )}

                      {activeTab === 'orders' && (
                        <motion.div key="orders" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                           <h2 className="serif text-4xl italic text-brand-gold">Past Revelations</h2>
                           <div className="space-y-4">
                              {orders.map(order => (
                                <div key={order.id} className="bg-brand-cream/50 p-8 rounded-[40px] border border-brand-forest/10 flex flex-col md:flex-row justify-between gap-8 h-fit">
                                   <div className="space-y-4 flex-1">
                                      <div className="flex justify-between items-start">
                                         <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Reference {order.id}</p>
                                            <p className="text-xl serif italic text-brand-forest">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                         </div>
                                         <span className="px-3 py-1 bg-green-50 text-green-600 border border-green-100 rounded-full text-[9px] font-bold uppercase tracking-widest">{order.status}</span>
                                      </div>
                                      <div className="flex gap-2 py-4 border-y border-brand-forest/5 overflow-x-auto no-scrollbar">
                                         {order.items.map((it, idx) => (
                                           <div key={idx} className="bg-white px-4 py-2 rounded-full border border-brand-forest/5 text-[10px] font-bold text-brand-forest whitespace-nowrap">
                                              {it.name} <span className="opacity-40 ml-1">x{it.quantity}</span>
                                           </div>
                                         ))}
                                      </div>
                                   </div>
                                   <div className="md:border-l border-brand-forest/5 md:pl-8 flex flex-col justify-between text-right">
                                      <div>
                                         <p className="text-[8px] uppercase tracking-widest font-bold text-brand-forest/40 mb-1">Ritual Value</p>
                                         <p className="text-3xl serif italic text-brand-forest">${order.total.toFixed(2)}</p>
                                      </div>
                                      <button className="text-[10px] uppercase font-bold tracking-widest text-brand-gold mt-4 hover:text-brand-forest transition-colors">Download Receipt</button>
                                   </div>
                                </div>
                              ))}
                              {orders.length === 0 && (
                                <div className="py-24 text-center space-y-6">
                                   <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-forest/20"><ShoppingBag size={32} /></div>
                                   <p className="text-brand-forest/60 text-sm">You haven't added any treasures to your history yet.</p>
                                   <Link to="/shop" className="inline-block px-8 py-3 bg-brand-forest text-brand-cream rounded-full text-[10px] font-bold uppercase tracking-widest">Start Shopping</Link>
                                </div>
                              )}
                           </div>
                        </motion.div>
                      )}

                      {activeTab === 'wishlist' && (
                        <motion.div key="wishlist" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                           <div className="flex justify-between items-end">
                              <h2 className="serif text-4xl italic text-brand-gold">Your Wishlist</h2>
                              <p className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">{wishlistedProducts.length} Saved Items</p>
                           </div>
                           
                           {loadingWishlist ? (
                             <div className="py-24 text-center">
                                <p className="text-sm text-brand-forest/40 uppercase tracking-widest font-bold animate-pulse">Gathering your treasures...</p>
                             </div>
                           ) : wishlistedProducts.length === 0 ? (
                             <div className="py-24 text-center space-y-6">
                                <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto text-brand-forest/20"><Heart size={32} /></div>
                                <p className="text-brand-forest/60 text-sm">Your sanctuary is quiet. Explore the forest to find your rituals.</p>
                                <Link to="/shop" className="inline-block px-8 py-3 bg-brand-forest text-brand-cream rounded-full text-[10px] font-bold uppercase tracking-widest">Explore Collection</Link>
                             </div>
                           ) : (
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {wishlistedProducts.map(product => (
                                  <ProductCard key={product.id} product={product} />
                                ))}
                             </div>
                           )}
                        </motion.div>
                      )}

                      {activeTab === 'profile' && (
                        <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                           <h2 className="serif text-4xl italic text-brand-gold">Sanctuary Profile</h2>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">DisplayName</label>
                                <input type="text" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none" defaultValue={user.name} />
                             </div>
                             <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Email Connection</label>
                                <input type="email" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none" defaultValue={user.email} />
                             </div>
                             <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">New Password</label>
                                <input type="password" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none" placeholder="Leave empty to keep current" />
                             </div>
                           </div>
                           <button className="px-12 py-5 bg-brand-forest marble-texture text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs shadow-xl hover:bg-brand-gold transition-colors">Save Revelations</button>
                        </motion.div>
                      )}
                   </AnimatePresence>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
