import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { db, OperationType, handleFirestoreError } from '../lib/firebase';
import { doc, setDoc, deleteDoc, collection } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart4, 
  Package, 
  Users, 
  Image as ImageIcon, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  MoreHorizontal, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  X,
  Tag,
  DollarSign
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Product } from '../types';

export default function Admin() {
  const { products, orders } = useAppContext();
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<'stats' | 'inventory' | 'orders' | 'customers'>('stats');

  const isAdminEmail = authUser?.email === 'member@mrcosmetics.co.ug' || authUser?.email === 'micahndungu01@gmail.com';

  useEffect(() => {
    if (!authUser || !isAdminEmail) {
      navigate('/');
    }
  }, [authUser, isAdminEmail, navigate]);

  if (!authUser || !isAdminEmail) return null;

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const stats = [
    { label: 'Revenue', value: `$${orders.reduce((acc, o) => acc + o.total, 0).toFixed(0)}`, change: '+12%', icon: <DollarSign size={20} />, status: 'up' },
    { label: 'Orders', value: orders.length.toString(), change: '+5%', icon: <Package size={20} />, status: 'up' },
    { label: 'Customers', value: '1,240', change: '-2%', icon: <Users size={20} />, status: 'down' },
    { label: 'Avg Ritual', value: '$84', change: '+1%', icon: <BarChart4 size={20} />, status: 'up' },
  ];

  const handleEdit = (p: Product) => {
    setEditingProduct({ ...p });
    setIsModalOpen(true);
  };

  const handleNew = () => {
    setEditingProduct({
       id: 'p' + Date.now(),
       name: '',
       category: 'Skincare',
       price: 0,
       description: '',
       images: ['https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?auto=format&fit=crop&q=80&w=800'],
       specs: {},
       stock: 0
    });
    setIsModalOpen(true);
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    const productsPath = `products/${editingProduct.id}`;
    const { id, ...data } = editingProduct;
    
    try {
      await setDoc(doc(db, 'products', id), data);
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, productsPath);
    }
  };

  const deleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to retire this treasure from the studio?')) {
      const productsPath = `products/${id}`;
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, productsPath);
      }
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
       <div className="marble-bg text-brand-cream pt-20 pb-32 px-4 border-b border-brand-gold/10">
          <div className="max-w-7xl mx-auto space-y-4">
             <div className="flex justify-between items-end">
                <div className="space-y-2">
                   <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">Control Studio</p>
                   <h1 className="text-5xl serif italic text-brand-cream">Sanctuary Admin</h1>
                </div>
                <div className="flex bg-brand-cream/10 rounded-2xl p-1 border border-brand-cream/10">
                   {[
                     { id: 'stats', icon: <BarChart4 size={18} /> },
                     { id: 'inventory', icon: <Package size={18} /> },
                     { id: 'orders', icon: <TrendingUp size={18} /> },
                     { id: 'customers', icon: <Users size={18} /> }
                   ].map(v => (
                     <button 
                       key={v.id}
                       onClick={() => setActiveView(v.id as any)}
                       className={cn(
                        "p-3 rounded-xl transition-all",
                        activeView === v.id ? "bg-brand-gold text-brand-forest shadow-lg" : "hover:bg-brand-cream/10 text-brand-cream/60"
                       )}
                     >
                        {v.icon}
                     </button>
                   ))}
                </div>
             </div>
          </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
          {activeView === 'stats' && (
            <div className="space-y-12">
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((s, i) => (
                    <div key={i} className="bg-white rounded-[40px] p-8 border border-brand-forest/5 shadow-xl space-y-4">
                        <div className="flex justify-between items-start">
                           <div className="p-3 bg-brand-cream rounded-2xl text-brand-forest">{s.icon}</div>
                           <div className={cn("flex items-center text-[10px] font-bold space-x-1", s.status === 'up' ? "text-green-500" : "text-red-500")}>
                              {s.status === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                              <span>{s.change}</span>
                           </div>
                        </div>
                        <div>
                           <p className="text-[10px] uppercase font-bold tracking-widest text-brand-forest/40">{s.label}</p>
                           <h4 className="serif text-3xl italic text-brand-forest">{s.value}</h4>
                        </div>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-white rounded-[60px] p-8 md:p-12 border border-brand-forest/5 shadow-sm space-y-8">
                     <div className="flex justify-between items-center">
                        <h3 className="serif text-3xl italic text-brand-forest">Recent Rituals</h3>
                        <button className="text-[10px] font-bold uppercase tracking-widest text-brand-gold underline underline-offset-4">View All</button>
                     </div>
                     <div className="space-y-4">
                        {orders.map(order => (
                          <div key={order.id} className="flex flex-wrap items-center justify-between gap-4 p-6 bg-brand-cream/50 rounded-3xl border border-brand-forest/5">
                             <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-forest shadow-sm italic serif font-bold">#</div>
                                <div>
                                   <p className="text-[10px] font-bold text-brand-forest uppercase tracking-widest">Order {order.id}</p>
                                   <p className="text-[9px] text-brand-forest/40">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                             </div>
                             <div className="flex items-center gap-8">
                                <div className="text-right">
                                   <p className="text-[10px] font-bold text-brand-forest">${order.total.toFixed(2)}</p>
                                   <p className="text-[9px] text-brand-forest/40 uppercase tracking-widest">{order.items.length} Items</p>
                                </div>
                                <span className="px-3 py-1 bg-brand-forest text-brand-cream rounded-full text-[9px] font-bold uppercase tracking-widest">{order.status}</span>
                             </div>
                          </div>
                        ))}
                        {orders.length === 0 && <p className="text-center py-12 text-brand-forest/40 text-sm italic">No recent activity detected.</p>}
                     </div>
                  </div>
                  
                  <div className="bg-brand-forest marble-texture text-brand-cream rounded-[60px] p-10 space-y-8 shadow-2xl relative overflow-hidden">
                     <h3 className="serif text-3xl italic">Ritual Insights</h3>
                     <div className="space-y-6 relative z-10">
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span>Inventory Health</span>
                              <span className="text-brand-gold">85%</span>
                           </div>
                           <div className="h-1 bg-brand-cream/10 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-gold w-[85%]" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                              <span>Customer Loyalty</span>
                              <span className="text-brand-gold">92%</span>
                           </div>
                           <div className="h-1 bg-brand-cream/10 rounded-full overflow-hidden">
                              <div className="h-full bg-brand-gold w-[92%]" />
                           </div>
                        </div>
                     </div>
                     <div className="pt-8">
                        <div className="p-6 bg-brand-cream/5 rounded-[32px] border border-brand-cream/10 flex items-center space-x-4">
                           <TrendingUp className="text-brand-gold" />
                           <p className="text-xs italic opacity-60">"Forest Radiance Serum" demand is up by 40% this week. Restock recommended.</p>
                        </div>
                     </div>
                     <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl" />
                  </div>
               </div>
            </div>
          )}

          {activeView === 'inventory' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-[60px] p-8 md:p-12 border border-brand-forest/5 shadow-xl space-y-8"
            >
               <div className="flex flex-wrap justify-between items-center gap-6">
                  <div className="space-y-2">
                     <h2 className="serif text-4xl italic text-brand-forest">Treasury Inventory</h2>
                     <p className="text-brand-forest/40 text-[10px] uppercase font-bold tracking-widest">Manage your botanical assets</p>
                  </div>
                  <div className="flex gap-4">
                     <div className="flex items-center bg-brand-cream rounded-full px-4 border border-brand-forest/10">
                        <Search size={16} className="text-brand-forest/40" />
                        <input type="text" placeholder="Search treasure..." className="bg-transparent border-none text-xs focus:ring-0 px-2" />
                     </div>
                     <button onClick={handleNew} className="p-4 bg-brand-gold text-brand-forest rounded-full hover:scale-105 transition-transform"><Plus size={20} /></button>
                  </div>
               </div>

               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full">
                     <thead>
                        <tr className="border-b border-brand-forest/5">
                           <th className="pb-6 text-left text-[10px] font-bold uppercase tracking-widest text-brand-gold">Product</th>
                           <th className="pb-6 text-left text-[10px] font-bold uppercase tracking-widest text-brand-gold">Category</th>
                           <th className="pb-6 text-left text-[10px] font-bold uppercase tracking-widest text-brand-gold">Price</th>
                           <th className="pb-6 text-left text-[10px] font-bold uppercase tracking-widest text-brand-gold">Stock</th>
                           <th className="pb-6 text-right text-[10px] font-bold uppercase tracking-widest text-brand-gold">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-brand-forest/[0.03]">
                        {products.map(p => (
                          <tr key={p.id} className="group hover:bg-brand-cream/50 transition-colors">
                             <td className="py-6">
                                <div className="flex items-center space-x-4">
                                   <img 
                                      src={p.images[0]} 
                                      className="w-12 h-12 rounded-xl object-cover shrink-0" 
                                      referrerPolicy="no-referrer"
                                    />
                                   <span className="text-sm font-bold text-brand-forest line-clamp-1">{p.name}</span>
                                </div>
                             </td>
                             <td className="py-6 py-6 text-xs text-brand-forest/60">
                                <span className={cn(
                                   "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                                   p.category === 'Skincare' ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-forest/5 text-brand-forest/60"
                                )}>{p.category}</span>
                             </td>
                             <td className="py-6 text-sm font-bold text-brand-forest">${p.price}</td>
                             <td className="py-6">
                                <div className="flex items-center space-x-2">
                                   <div className={cn("w-2 h-2 rounded-full", p.stock < 10 ? "bg-red-500 animate-pulse" : "bg-green-500")} />
                                   <span className="text-xs font-bold text-brand-forest">{p.stock}</span>
                                </div>
                             </td>
                             <td className="py-6 text-right">
                                <div className="flex justify-end items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button onClick={() => handleEdit(p)} className="p-2 text-brand-forest hover:text-brand-gold transition-colors"><Edit3 size={16} /></button>
                                   <button onClick={() => deleteProduct(p.id)} className="p-2 text-brand-forest hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                   <button className="p-2 text-brand-forest/20 hover:text-brand-forest"><MoreHorizontal size={16} /></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          )}
       </div>

       {/* Edit/New Modal */}
       <AnimatePresence>
          {isModalOpen && editingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-brand-forest/40 backdrop-blur-sm"
                 onClick={() => setIsModalOpen(false)}
               />
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 exit={{ scale: 0.9, opacity: 0, y: 20 }}
                 className="relative bg-white rounded-[60px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-12 shadow-2xl border border-brand-forest/5 ring-1 ring-brand-gold/10 no-scrollbar"
               >
                  <button onClick={() => setIsModalOpen(false)} className="absolute top-10 right-10 p-2 text-brand-forest/40 hover:text-brand-forest transition-colors"><X size={24} /></button>
                  
                  <div className="space-y-12">
                     <div className="space-y-2">
                        <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">Modification</p>
                        <h2 className="serif text-4xl italic text-brand-forest">Botanical Record</h2>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="col-span-2 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Product Name</label>
                           <input 
                             type="text" 
                             className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none" 
                             value={editingProduct.name}
                             onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Category</label>
                           <select 
                             className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none"
                             value={editingProduct.category}
                             onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value as any})}
                           >
                              {['Skincare', 'Haircare', 'Body'].map(c => <option key={c} value={c}>{c}</option>)}
                           </select>
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Ritual Price ($)</label>
                           <input 
                             type="number" 
                             className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none"
                             value={editingProduct.price}
                             onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value) || 0})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Stock Sanctuary</label>
                           <input 
                             type="number" 
                             className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none"
                             value={editingProduct.stock}
                             onChange={(e) => setEditingProduct({...editingProduct, stock: parseInt(e.target.value) || 0})}
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Main Image URL</label>
                           <input 
                              type="text"
                              className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm focus:border-brand-gold outline-none"
                              value={editingProduct.images[0]}
                              onChange={(e) => setEditingProduct({...editingProduct, images: [e.target.value, ...editingProduct.images.slice(1)]})}
                           />
                        </div>
                        <div className="col-span-2 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Essence Description</label>
                           <textarea 
                             rows={4}
                             className="w-full bg-brand-cream border border-brand-forest/10 rounded-3xl p-6 text-sm focus:border-brand-gold outline-none resize-none"
                             value={editingProduct.description}
                             onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                           />
                        </div>
                     </div>

                     <div className="flex gap-4 pt-4">
                        <button onClick={saveProduct} className="flex-1 py-5 bg-brand-forest marble-texture text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs shadow-xl flex items-center justify-center space-x-2">
                           <CheckCircle2 size={18} />
                           <span>Update Treasury</span>
                        </button>
                        <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 border border-brand-forest/10 text-brand-forest rounded-full font-bold uppercase tracking-widest text-xs">Cancel</button>
                     </div>
                  </div>
               </motion.div>
            </div>
          )}
       </AnimatePresence>
    </div>
  );
}
