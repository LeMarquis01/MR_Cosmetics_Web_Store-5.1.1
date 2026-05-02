import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useAppContext } from '../context/AppContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useAppContext();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user, loginWithGoogle } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = isInWishlist(product.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      loginWithGoogle();
      return;
    }
    toggleWishlist(product.id);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.01 }}
      viewport={{ once: true }}
      className="group relative h-full flex flex-col transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="block overflow-hidden relative rounded-[40px] aspect-[4/5] bg-brand-forest/5 border border-brand-forest/10 shadow-sm group"
      >
        <Link to={`/product/${product.id}`} className="absolute inset-0 z-0">
          <motion.img 
            initial={false}
            animate={{ 
              opacity: isHovered && product.images[1] ? 0 : 1,
              scale: isHovered ? 1.05 : 1
            }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            src={product.images[0]} 
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {product.images[1] && (
            <motion.img 
              initial={false}
              animate={{ 
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 1.1
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              src={product.images[1]} 
              alt={`${product.name} alternate`}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          )}
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 z-10 bg-brand-forest/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 space-y-3 pointer-events-none">
           <motion.button 
             animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
             transition={{ delay: 0.1, duration: 0.4 }}
             onClick={(e) => {
               e.preventDefault();
               e.stopPropagation();
               addToCart(product.id, 1);
             }}
             className="pointer-events-auto w-full py-4 bg-white text-brand-forest rounded-full text-[10px] uppercase font-bold tracking-[0.2em] flex items-center justify-center space-x-2 hover:bg-brand-gold hover:text-brand-forest transition-all shadow-2xl"
           >
             <ShoppingCart size={14} />
             <span>Add to Collection</span>
           </motion.button>
           <motion.div 
             animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
             transition={{ delay: 0.2, duration: 0.4 }}
             className="flex space-x-2 pointer-events-auto"
           >
             <button 
              onClick={handleWishlistClick}
              className={cn(
                "flex-1 py-3 backdrop-blur-md rounded-full flex items-center justify-center border transition-all",
                isWishlisted 
                  ? "bg-brand-gold text-brand-forest border-brand-gold" 
                  : "bg-white/20 text-white border-white/20 hover:bg-brand-gold hover:text-brand-forest"
              )}
             >
               <Heart size={14} className={isWishlisted ? "fill-brand-forest" : ""} />
             </button>
             <Link 
              to={`/product/${product.id}`}
              className="flex-1 py-3 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center border border-white/20 hover:bg-brand-gold hover:text-brand-forest transition-colors"
             >
               <Eye size={14} />
             </Link>
           </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2 pointer-events-none">
           {product.originalPrice && (
             <span className="px-3 py-1 bg-brand-gold text-brand-forest text-[8px] font-bold uppercase tracking-widest rounded-full">Sale</span>
           )}
           {product.stock < 10 && (
             <span className="px-3 py-1 bg-white/90 text-brand-forest text-[8px] font-bold uppercase tracking-widest rounded-full">Low Stock</span>
           )}
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-gold mb-1">{product.category}</p>
        <h3 className="serif text-xl text-brand-forest group-hover:text-brand-gold transition-colors italic">{product.name}</h3>
        <div className="flex items-center justify-center space-x-2 mt-2">
          {product.originalPrice ? (
            <>
              <span className="text-brand-forest/40 line-through text-xs">${product.originalPrice}</span>
              <span className="text-brand-forest font-semibold text-sm">${product.price}</span>
            </>
          ) : (
            <span className="text-brand-forest font-semibold text-sm">${product.price}</span>
          )}
        </div>
        <div className="flex items-center justify-center mt-2 space-x-1">
           {[...Array(5)].map((_, i) => <Star key={i} size={10} fill={i < 4 ? "var(--color-brand-gold)" : "none"} className={i < 4 ? "text-brand-gold" : "text-brand-gold/30"} />)}
           <span className="text-[10px] text-brand-forest/40 ml-1">(12)</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
