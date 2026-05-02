import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, Send, LogIn, Loader2, AlertCircle, MessageSquare } from 'lucide-react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

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

export default function Reviews() {
  const { user, loginWithGoogle } = useAuth();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ReviewData[];
      setReviews(docs);
      setLoading(false);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'reviews');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!comment.trim()) {
      setError('Please share a few words about your experience.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: user.displayName || 'Anonymous User',
        userAvatar: user.photoURL || '',
        rating,
        text: comment,
        createdAt: serverTimestamp(),
      });
      setComment('');
      setRating(5);
    } catch (err) {
      setError('Failed to post review. Please try again.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 bg-brand-cream/30">
      <section className="py-24 px-4 text-center space-y-6">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-brand-gold uppercase text-xs font-bold tracking-[0.5em]"
        >
          Community Voices
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl serif text-brand-forest italic"
        >
          Customer Reviews
        </motion.h1>
      </section>

      <section className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Review Form Section */}
        <div className="lg:col-span-4 h-fit sticky top-32">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 bg-brand-forest rounded-[40px] shadow-xl text-white"
          >
            <h2 className="text-2xl serif italic mb-6">Share Your Experience</h2>
            
            {user ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-brand-gold mb-3 font-bold">Your Rating</p>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform active:scale-90"
                      >
                        <Star 
                          size={24} 
                          className={cn(
                            "transition-colors",
                            (hoverRating || rating) >= star ? "fill-brand-gold text-brand-gold" : "text-white/20"
                          )} 
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-brand-gold mb-3 font-bold">Your Review</label>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Tell us about the scent, feel, and results..."
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-brand-gold transition-colors placeholder:text-white/20 resize-none"
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-400 text-xs py-2 bg-red-400/10 rounded-xl px-4">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                  </div>
                )}

                <button 
                  disabled={submitting}
                  type="submit" 
                  className="w-full py-4 bg-brand-gold text-brand-forest rounded-full text-xs font-bold uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-white transition-all disabled:opacity-50"
                >
                  {submitting ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Release Review</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                  <LogIn className="text-brand-gold" size={24} />
                </div>
                <p className="text-sm text-white/60 font-light px-4">Join our community of botanical enthusiasts to share your journey and inspire others.</p>
                <button 
                  onClick={loginWithGoogle}
                  className="px-8 py-3 bg-brand-gold text-brand-forest rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all"
                >
                  Join the Circle
                </button>
              </div>
            )}
          </motion.div>
        </div>

        {/* Reviews List Section */}
        <div className="lg:col-span-8 space-y-8">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="animate-spin text-brand-gold" size={40} />
              <p className="text-brand-forest/40 uppercase text-[10px] font-bold tracking-widest">Gathering voices...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-20 space-y-6 bg-white rounded-[40px] border border-brand-forest/5">
              <MessageSquare className="mx-auto text-brand-gold/20" size={48} />
              <div className="space-y-2">
                <p className="text-xl serif italic text-brand-forest">Silence in the Forest</p>
                <p className="text-sm text-brand-forest/40">Be the first to share your experience with our collection.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatePresence mode="popLayout">
                {reviews.map((review, i) => (
                  <motion.div 
                    layout
                    key={review.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 bg-white rounded-[40px] shadow-sm border border-brand-forest/5 flex flex-col space-y-6 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, star) => (
                          <Star 
                            key={star} 
                            size={14} 
                            className={cn(
                              "transition-colors",
                              star < review.rating ? "fill-brand-gold text-brand-gold" : "text-gray-100"
                            )} 
                          />
                        ))}
                      </div>
                      <Quote className="text-brand-gold/10" size={32} />
                    </div>
                    
                    <p className="text-brand-forest/70 font-light leading-relaxed flex-1 italic text-sm">
                      "{review.text}"
                    </p>

                    <div className="pt-6 border-t border-brand-forest/5 flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-brand-forest/5 border border-brand-forest/10">
                        {review.userAvatar ? (
                          <img src={review.userAvatar} className="w-full h-full object-cover" alt={review.userName} />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-brand-forest font-bold text-xs">
                            {review.userName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-brand-forest uppercase">{review.userName}</p>
                        <p className="text-[10px] text-brand-gold uppercase font-bold tracking-widest">Verified Member</p>
                      </div>
                      <p className="text-[10px] text-brand-forest/30 font-medium">
                        {review.createdAt?.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) || 'Recent'}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
