import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, CreditCard, Wallet, Smartphone, ArrowLeft, CheckCircle2, Loader2, Sparkles, X } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Checkout() {
  const { cart, products, placeOrder, user } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'paypal'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const cartItems = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean) as any[];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal * 1.16 + (subtotal > 150 ? 0 : 15);

  const handlePlaceOrder = () => {
    if (paymentMethod === 'mpesa') {
      setShowMpesaModal(true);
      return;
    }
    // Simulation
    setIsProcessing(true);
    setTimeout(() => {
       placeOrder({
          items: cartItems.map(i => ({ productId: i.id, quantity: i.quantity, name: i.name, price: i.price })),
          total
       });
       setIsProcessing(false);
       setIsSuccess(true);
    }, 3000);
  };

  const confirmMpesa = () => {
    setIsProcessing(true);
    setShowMpesaModal(false);
    setTimeout(() => {
       placeOrder({
          items: cartItems.map(i => ({ productId: i.id, quantity: i.quantity, name: i.name, price: i.price })),
          total
       });
       setIsProcessing(false);
       setIsSuccess(true);
    }, 4000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="bg-white rounded-[60px] p-12 max-w-xl w-full text-center space-y-8 shadow-2xl border border-brand-forest/5"
         >
            <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
               <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
               <h2 className="serif text-5xl italic text-brand-forest">Ritual Confirmed</h2>
               <p className="text-brand-forest/60">Your order has been received and is being prepared with artisanal care in our studio. You earned <span className="text-brand-gold font-bold">{Math.floor(total)} Loyalty Points</span>.</p>
            </div>
            <div className="p-6 bg-brand-cream rounded-3xl text-sm font-medium border border-brand-forest/5 flex justify-between items-center">
               <span className="opacity-40 uppercase tracking-widest text-[10px]">Order Number</span>
               <span className="serif italic text-lg text-brand-forest">#ORD-{Math.floor(Math.random()*100000)}</span>
            </div>
            <div className="flex gap-4">
               <button onClick={() => navigate('/dashboard')} className="flex-1 px-8 py-4 bg-brand-forest text-brand-cream rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-forest transition-colors">Track Order</button>
               <button onClick={() => navigate('/')} className="flex-1 px-8 py-4 border border-brand-forest/10 text-brand-forest rounded-full text-xs font-bold uppercase tracking-widest hover:border-brand-forest transition-colors">Home</button>
            </div>
         </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-cream pb-32 pt-16">
       <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          <div className="lg:col-span-8 space-y-12">
             <header className="flex justify-between items-end">
                <div className="space-y-4">
                   <button onClick={() => navigate(-1)} className="flex items-center text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-4"><ArrowLeft size={14} className="mr-2" /> Back to Cart</button>
                   <h1 className="text-5xl serif italic text-brand-forest">Step-by-Step Radiance</h1>
                </div>
                <div className="flex items-center space-x-12 mb-2 hidden md:flex">
                   <div className={cn("text-center pb-2 border-b-2 transition-colors", step >= 1 ? "border-brand-gold text-brand-forest" : "border-transparent text-brand-forest/20")}>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">01 Address</span>
                   </div>
                   <div className={cn("text-center pb-2 border-b-2 transition-colors", step >= 2 ? "border-brand-gold text-brand-forest" : "border-transparent text-brand-forest/20")}>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">02 Payment</span>
                   </div>
                </div>
             </header>

             <div className="bg-white rounded-[60px] p-8 md:p-12 border border-brand-forest/5 shadow-lg space-y-12">
                {step === 1 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                     <h3 className="serif text-3xl italic text-brand-forest">Shipping Sanctuary</h3>
                     <div className="grid grid-cols-2 gap-6">
                        <div className="col-span-2 md:col-span-1 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Full Name</label>
                           <input type="text" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm" defaultValue={user?.name} />
                        </div>
                        <div className="col-span-2 md:col-span-1 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Email Address</label>
                           <input type="email" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm" defaultValue={user?.email} />
                        </div>
                        <div className="col-span-2 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Street Address</label>
                           <input type="text" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm" placeholder="Street name and plot number..." />
                        </div>
                        <div className="md:col-span-1 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">City</label>
                           <input type="text" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm" defaultValue="Kampala" />
                        </div>
                        <div className="md:col-span-1 space-y-2">
                           <label className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Phone Number</label>
                           <input type="tel" className="w-full bg-brand-cream border border-brand-forest/10 rounded-2xl p-4 text-sm" placeholder="+256..." />
                        </div>
                     </div>
                     <button onClick={() => setStep(2)} className="w-full py-5 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs shadow-xl">Continue to Payment</button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                     <h3 className="serif text-3xl italic text-brand-forest">Payment Ritual</h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                           { id: 'mpesa', name: 'M-PESA', icon: <Smartphone />, color: 'bg-green-600', logos: ['M-PESA'] },
                           { id: 'card', name: 'Card', icon: <CreditCard />, color: 'bg-brand-forest', logos: ['VISA', 'MC'] },
                           { id: 'paypal', name: 'PayPal', icon: <Wallet />, color: 'bg-blue-600', logos: ['PP'] }
                        ].map((m) => (
                           <button 
                             key={m.id}
                             onClick={() => setPaymentMethod(m.id as any)}
                             className={cn(
                               "p-6 rounded-[32px] border-2 flex flex-col items-center gap-4 transition-all relative",
                               paymentMethod === m.id ? "border-brand-gold bg-brand-gold/5" : "border-brand-forest/5 hover:border-brand-gold/20"
                             )}
                           >
                              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white", m.color)}>
                                 {m.icon}
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-widest">{m.name}</span>
                              <div className="flex gap-1 opacity-40">
                                 {m.logos.map(l => <span key={l} className="text-[6px] font-black italic">{l}</span>)}
                              </div>
                              {paymentMethod === m.id && <CheckCircle2 size={16} className="text-brand-gold absolute top-4 right-4" />}
                           </button>
                        ))}
                     </div>

                     <div className="p-8 bg-brand-cream rounded-[40px] border border-brand-forest/5">
                        {paymentMethod === 'mpesa' && (
                          <div className="space-y-4">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">M-Pesa STK Push</h4>
                             <p className="text-[10px] text-brand-forest/60 leading-relaxed uppercase tracking-wider">A payment prompt will be sent directly to your phone. Please ensure your SIM toolkit PIN is ready.</p>
                             <div className="flex items-center space-x-4 bg-white p-4 rounded-2xl border border-brand-forest/10">
                                <span className="text-sm font-bold text-brand-forest">+256</span>
                                <input type="tel" className="flex-1 bg-transparent border-none focus:ring-0 text-sm" placeholder="700 000 000" />
                             </div>
                          </div>
                        )}
                        {paymentMethod === 'card' && (
                          <div className="space-y-4">
                             <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Encrypted Card Entry</h4>
                             <input type="text" className="w-full bg-white border border-brand-forest/10 rounded-2xl p-4 text-sm" placeholder="CARD NUMBER" />
                             <div className="grid grid-cols-2 gap-4">
                                <input type="text" className="bg-white border border-brand-forest/10 rounded-2xl p-4 text-sm" placeholder="MM / YY" />
                                <input type="text" className="bg-white border border-brand-forest/10 rounded-2xl p-4 text-sm" placeholder="CVV" />
                             </div>
                          </div>
                        )}
                        {paymentMethod === 'paypal' && (
                          <div className="text-center py-4 space-y-4">
                             <p className="text-xs text-brand-forest/60 italic">You will be redirected to PayPal's secure portal to authorize this ritual payment.</p>
                             <div className="w-24 h-12 bg-blue-600 rounded-lg mx-auto opacity-10 flex items-center justify-center text-white font-bold italic">Paypal</div>
                          </div>
                        )}
                     </div>

                     <div className="text-center space-y-4">
                        <p className="text-[9px] uppercase font-bold tracking-[0.2em] text-brand-forest/40">
                           By finalising this order, you embrace our <Link to="/shipping-returns" className="text-brand-gold underline underline-offset-4">Shipping & Returns Rituals</Link>
                        </p>
                        <button 
                           onClick={handlePlaceOrder}
                           disabled={isProcessing}
                           className="w-full h-16 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center space-x-3 disabled:opacity-50 hover:bg-brand-gold hover:text-brand-forest transition-colors"
                        >
                           {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <div className="w-2 h-2 bg-brand-gold rounded-full animate-ping" />}
                           <span>{isProcessing ? 'Verifying Ritual Payment...' : 'Finalize & Confirm Order'}</span>
                        </button>
                     </div>
                  </motion.div>
                )}
             </div>
          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit space-y-12">
             <div className="bg-white rounded-[60px] p-8 border border-brand-forest/5 shadow-sm space-y-8">
                <h3 className="serif text-2xl italic text-brand-forest">The Ritual Box</h3>
                <div className="space-y-6 max-h-[300px] overflow-y-auto pr-4 no-scrollbar">
                   {cartItems.map(item => (
                     <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border border-brand-forest/5">
                           <img 
                             src={item.images[0]} 
                             className="w-full h-full object-cover" 
                             referrerPolicy="no-referrer"
                           />
                        </div>
                        <div className="flex-1 flex justify-between items-start">
                           <div>
                              <h4 className="text-[10px] font-bold uppercase tracking-widest text-brand-forest leading-tight line-clamp-2">{item.name}</h4>
                              <p className="text-[10px] text-brand-gold font-bold">Qty: {item.quantity}</p>
                           </div>
                           <span className="text-[10px] font-bold text-brand-forest">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                     </div>
                   ))}
                </div>
                <div className="pt-6 border-t border-brand-forest/5 space-y-3">
                   <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-brand-forest/40">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-brand-forest/40">
                      <span>VAT & Duty</span>
                      <span>${(subtotal * 0.16).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between items-end pt-4">
                      <span className="text-brand-gold font-bold uppercase tracking-widest text-[10px]">Grand Total</span>
                      <span className="serif text-3xl italic text-brand-forest">${total.toFixed(2)}</span>
                   </div>
                </div>

                <div className="p-4 bg-brand-gold/10 rounded-2xl border border-brand-gold/10 flex items-center space-x-3 mb-6">
                   <div className="w-8 h-8 rounded-full bg-brand-gold text-brand-forest flex items-center justify-center shrink-0">
                      <Sparkles size={14} />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">Loyalty Reward</p>
                      <p className="text-[9px] text-brand-gold font-bold">EARN {Math.floor(total)} POINTS</p>
                   </div>
                </div>

                {/* Security Trust Badges */}
                <div className="pt-8 border-t border-brand-forest/5 space-y-6">
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-brand-forest/10 flex items-center justify-center text-brand-gold">
                         <ShieldCheck size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">Internet Security</p>
                         <p className="text-[8px] text-brand-forest/40 uppercase tracking-widest">256-bit SSL Encrypted</p>
                      </div>
                   </div>
                   <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full border border-brand-forest/10 flex items-center justify-center text-brand-gold">
                         <Truck size={20} />
                      </div>
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-brand-forest">Secure Ritual Shipping</p>
                         <p className="text-[8px] text-brand-forest/40 uppercase tracking-widest">Tracked & Insured Delivery</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>

       {/* M-Pesa Simulation Modal */}
       <AnimatePresence>
          {showMpesaModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 bg-brand-forest/80 backdrop-blur-md"
                 onClick={() => setShowMpesaModal(false)}
               />
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 exit={{ scale: 0.9, opacity: 0 }}
                 className="relative bg-white rounded-[60px] p-12 max-w-lg w-full shadow-2xl space-y-8 text-center"
               >
                  <div className="w-20 h-20 bg-green-600 rounded-[28px] mx-auto flex items-center justify-center text-white animate-pulse">
                     <Smartphone size={40} />
                  </div>
                  <div className="space-y-4">
                     <h2 className="serif text-4xl italic text-brand-forest">M-PESA Authorize</h2>
                     <p className="text-brand-forest/60 text-sm leading-relaxed">Please check your phone for the STK Push prompt. Enter your M-Pesa PIN to complete the ritual payment of <span className="font-bold text-brand-forest">${total.toFixed(2)}</span>.</p>
                  </div>
                  <div className="flex flex-col gap-4">
                     <button onClick={confirmMpesa} className="w-full py-5 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-2">
                        <span>I have entered my PIN</span>
                        <ArrowLeft className="rotate-180" size={16} />
                     </button>
                     <button onClick={() => setShowMpesaModal(false)} className="text-[10px] uppercase font-bold tracking-widest text-brand-forest/40 hover:text-red-500 transition-colors">Cancel Request</button>
                  </div>
               </motion.div>
            </div>
          )}
       </AnimatePresence>
    </div>
  );
}
