import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ShoppingCart, Heart, ArrowLeft, Star, Send, LogIn, Loader2, AlertCircle, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface ReviewData {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  text: string;
  createdAt: any;
  productId?: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart } = useAppContext();
  const { user, loginWithGoogle } = useAuth();
  
  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState(0);

  // Review State
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewHoverRating, setReviewHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (!id) return;
    const q = query(
      collection(db, 'reviews'), 
      where('productId', '==', id),
      orderBy('createdAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ReviewData[];
      setReviews(docs);
      setLoadingReviews(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'reviews');
    });

    return () => unsubscribe();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-cream">
         <div className="text-center space-y-6">
            <h2 className="serif text-5xl italic text-brand-forest">Lost in the forest</h2>
            <p className="text-brand-forest/60 max-w-xs mx-auto">This botanical treasure seems to have vanished or never existed.</p>
            <Link to="/shop" className="inline-block px-12 py-4 bg-brand-forest text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs">Return to Studio</Link>
         </div>
      </div>
    );
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id) return;
    if (!reviewText.trim()) {
      setReviewError('Please share your thoughts with us.');
      return;
    }

    setSubmittingReview(true);
    setReviewError('');

    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: user.displayName || 'Anonymous User',
        userAvatar: user.photoURL || '',
        rating: reviewRating,
        text: reviewText,
        productId: id,
        createdAt: serverTimestamp(),
      });
      setReviewText('');
      setReviewRating(5);
    } catch (err) {
      setReviewError('Silence fell... review failed to post.');
    } finally {
      setSubmittingReview(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-brand-cream pb-32">
       {/* Breadcrumbs */}
       <div className="max-w-7xl mx-auto px-4 py-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-forest transition-colors mb-8">
             <ArrowLeft size={14} className="mr-2" /> Back
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Gallery */}
            <div className="space-y-4">
               <div className="relative aspect-[4/5] rounded-[60px] overflow-hidden border border-brand-forest/5 shadow-2xl bg-white">
                  <motion.img 
                    key={activeImg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={product.images[activeImg]} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-sm rounded-full text-brand-forest hover:bg-white transition-colors">
                    <Heart size={20} />
                  </button>
               </div>
               <div className="flex space-x-4">
                  {product.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImg(idx)}
                      className={cn(
                        "w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all",
                        activeImg === idx ? "border-brand-gold scale-105" : "border-brand-forest/5 opacity-60 hover:opacity-100"
                      )}
                    >
                      <img 
                        src={img} 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                        alt={`${product.name} thumbnail ${idx}`}
                      />
                    </button>
                  ))}
               </div>
            </div>

            {/* Content */}
            <div className="flex flex-col">
               <div className="space-y-4 pb-8 border-b border-brand-forest/10">
                  <p className="text-xs uppercase tracking-[0.4em] font-bold text-brand-gold">{product.category}</p>
                  <h1 className="text-5xl md:text-6xl serif italic text-brand-forest">{product.name}</h1>
                  <div className="flex items-center space-x-4">
                     <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={14} 
                            fill={i < Math.round(averageRating || 5) ? "var(--color-brand-gold)" : "none"} 
                            className="text-brand-gold" 
                          />
                        ))}
                     </div>
                     <span className="text-xs font-bold tracking-widest text-brand-forest/40 uppercase">
                       {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'} • Verified Formula
                     </span>
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                     <span className="text-4xl serif text-brand-forest">${product.price}</span>
                  </div>
               </div>

               <div className="py-8 space-y-8">
                  <p className="text-brand-forest/70 text-sm leading-relaxed">{product.description}</p>
                  
                  {/* Purchase Actions */}
                  <div className="flex flex-wrap gap-4 items-center">
                     <div className="flex items-center bg-white border border-brand-forest/10 rounded-full px-4 py-3 space-x-6">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-brand-forest hover:text-brand-gold transition-colors">
                          <span className="text-lg font-bold">−</span>
                        </button>
                        <span className="font-bold text-sm w-4 text-center">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="text-brand-forest hover:text-brand-gold transition-colors">
                          <span className="text-lg font-bold">+</span>
                        </button>
                     </div>
                     <button 
                       onClick={() => addToCart(product.id, quantity)}
                       className="flex-1 min-w-[200px] h-14 bg-brand-forest text-brand-cream rounded-full uppercase text-xs font-bold tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-brand-gold hover:text-brand-forest transition-colors shadow-xl"
                     >
                        <ShoppingCart size={18} />
                        <span>Add to Collection</span>
                     </button>
                  </div>
               </div>
            </div>
          </div>

          {/* New Reviews Section */}
          <section className="mt-32 pt-20 border-t border-brand-forest/5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">Testimonials</p>
                  <h2 className="text-4xl serif italic text-brand-forest">Ephermal Whispers</h2>
                </div>

                <div className="p-8 bg-brand-forest rounded-[40px] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full -translate-y-16 translate-x-16" />
                   <h3 className="text-xl serif italic mb-6 relative z-10">Add Your Voice</h3>
                   
                   {user ? (
                     <form onSubmit={handleReviewSubmit} className="space-y-6 relative z-10">
                       <div>
                         <p className="text-[10px] uppercase font-bold text-brand-gold tracking-widest mb-3">Rating</p>
                         <div className="flex space-x-2">
                           {[1, 2, 3, 4, 5].map((star) => (
                             <button
                               key={star}
                               type="button"
                               onMouseEnter={() => setReviewHoverRating(star)}
                               onMouseLeave={() => setReviewHoverRating(0)}
                               onClick={() => setReviewRating(star)}
                               className="transition-transform active:scale-90"
                             >
                               <Star size={20} className={cn(
                                 "transition-colors",
                                 (reviewHoverRating || reviewRating) >= star ? "fill-brand-gold text-brand-gold" : "text-white/20"
                               )} />
                             </button>
                           ))}
                         </div>
                       </div>
                       <div>
                         <textarea 
                           value={reviewText}
                           onChange={(e) => setReviewText(e.target.value)}
                           className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-xs focus:ring-1 focus:ring-brand-gold outline-none transition-all placeholder:text-white/20 resize-none"
                           placeholder="Describe your ritual and the botanical effect..."
                         />
                       </div>
                       {reviewError && <p className="text-red-400 text-[10px] uppercase tracking-widest font-bold">{reviewError}</p>}
                       <button 
                         disabled={submittingReview}
                         className="w-full py-4 bg-brand-gold text-brand-forest rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                       >
                         {submittingReview ? <Loader2 className="animate-spin" size={14} /> : <><Send size={12} /><span>Post Review</span></>}
                       </button>
                     </form>
                   ) : (
                     <div className="text-center py-6 space-y-6 relative z-10">
                       <p className="text-xs text-white/50 leading-relaxed italic">Join our community to share your thoughts and help others find their ritual.</p>
                       <button 
                         onClick={loginWithGoogle}
                         className="px-8 py-3 bg-brand-gold text-brand-forest rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-lg"
                       >
                         Sign In to Contribute
                       </button>
                     </div>
                   )}
                </div>
              </div>

              <div className="lg:col-span-8">
                 {loadingReviews ? (
                   <div className="flex justify-center items-center py-20">
                     <Loader2 className="animate-spin text-brand-gold" />
                   </div>
                 ) : reviews.length === 0 ? (
                   <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-20 bg-white rounded-[60px] border border-dashed border-brand-forest/10">
                      <Quote className="text-brand-gold/10" size={48} />
                      <p className="serif text-xl italic text-brand-forest/60">Be the first to speak of this treasure.</p>
                   </div>
                 ) : (
                   <div className="space-y-6">
                      <AnimatePresence mode="popLayout">
                        {reviews.map((rev) => (
                          <motion.div 
                            layout
                            key={rev.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 rounded-[40px] border border-brand-forest/5 shadow-sm space-y-4"
                          >
                             <div className="flex justify-between items-center">
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={12} 
                                      className={cn(i < rev.rating ? "fill-brand-gold text-brand-gold" : "text-gray-100")} 
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] text-brand-forest/30 font-bold uppercase tracking-widest">
                                  {rev.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Recent'}
                                </span>
                             </div>
                             <p className="text-brand-forest/70 italic text-sm leading-relaxed">"{rev.text}"</p>
                             <div className="flex items-center space-x-3 pt-4">
                               <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-forest/5">
                                 {rev.userAvatar ? <img src={rev.userAvatar} className="w-full h-full object-cover" alt={rev.userName} /> : <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-brand-forest">{rev.userName.charAt(0)}</div>}
                               </div>
                               <div>
                                 <p className="text-[10px] font-bold uppercase text-brand-forest">{rev.userName}</p>
                                 <p className="text-[8px] uppercase tracking-widest text-brand-gold font-bold">Verified Soul</p>
                               </div>
                             </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                   </div>
                 )}
              </div>
            </div>
          </section>
       </div>
    </div>
  );
}
