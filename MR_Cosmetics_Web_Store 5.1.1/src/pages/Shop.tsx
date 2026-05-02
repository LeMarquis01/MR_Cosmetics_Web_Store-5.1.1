import React, { useState, useMemo } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import { Search, Filter, ChevronDown, SlidersHorizontal, Grid2X2, List } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Shop() {
  const { products } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeCategory = searchParams.get('cat') || 'All';
  const activeSort = searchParams.get('sort') || 'featured';

  const categories = ['All', 'Skincare', 'Haircare', 'Body'];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => activeCategory === 'All' || p.category === activeCategory)
      .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (activeSort === 'price-asc') return a.price - b.price;
        if (activeSort === 'price-desc') return b.price - a.price;
        if (activeSort === 'newest') return b.id.localeCompare(a.id);
        return 0;
      });
  }, [products, activeCategory, searchQuery, activeSort]);

  return (
    <div className="min-h-screen bg-brand-cream pb-24">
      {/* Header */}
      <div className="marble-bg text-brand-cream pt-20 pb-20 px-4 text-center">
        <div className="max-w-7xl mx-auto space-y-4">
          <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.4em]">The Studio</p>
          <h1 className="text-4xl md:text-6xl serif italic">The Full Collection</h1>
          <p className="text-brand-cream/60 max-w-lg mx-auto text-sm leading-relaxed">
            Pure ingredients, artisanal craftsmanship, and the timeless elegance of nature's finest botanicals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        {/* Toolbar */}
        <div className="bg-white rounded-3xl p-4 shadow-xl border border-brand-forest/5 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 bg-brand-cream rounded-full px-4 py-2 border border-brand-forest/10 flex-1 min-w-[250px]">
            <Search size={16} className="text-brand-forest/40" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="bg-transparent border-none focus:ring-0 text-sm flex-1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <select 
                className="appearance-none bg-brand-cream border border-brand-forest/10 rounded-full pl-4 pr-10 py-2 text-xs font-bold uppercase tracking-widest text-brand-forest focus:ring-brand-gold focus:border-brand-gold"
                value={activeSort}
                onChange={(e) => {
                   searchParams.set('sort', e.target.value);
                   setSearchParams(searchParams);
                }}
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-brand-forest/40" size={14} />
            </div>

            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={cn(
                "flex items-center space-x-2 px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all",
                isFilterOpen ? "bg-brand-forest marble-texture text-brand-cream border-brand-forest" : "bg-white text-brand-forest border-brand-forest/10 hover:border-brand-forest"
              )}
            >
              <SlidersHorizontal size={14} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Category Rails */}
        <div className="mt-8 flex overflow-x-auto space-x-2 pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
               key={cat}
               onClick={() => {
                 searchParams.set('cat', cat);
                 setSearchParams(searchParams);
               }}
               className={cn(
                 "px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                 activeCategory === cat ? "bg-brand-gold text-brand-forest border-brand-gold" : "bg-transparent text-brand-forest border-brand-forest/10 hover:border-brand-gold"
               )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-b border-brand-forest/10"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 px-4">
                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Price Range</h4>
                   <div className="flex items-center space-x-4">
                      <input type="text" placeholder="$ Min" className="w-full bg-brand-cream border border-brand-forest/10 rounded-lg p-2 text-xs" />
                      <input type="text" placeholder="$ Max" className="w-full bg-brand-cream border border-brand-forest/10 rounded-lg p-2 text-xs" />
                   </div>
                </div>
                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Skin Concern</h4>
                   {['Dryness', 'Aging', 'Acne', 'Sensitive'].map(item => (
                     <label key={item} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-brand-forest/10 text-brand-gold focus:ring-brand-gold" />
                        <span className="text-xs text-brand-forest">{item}</span>
                     </label>
                   ))}
                </div>
                <div className="space-y-4">
                   <h4 className="text-[10px] uppercase font-bold tracking-widest text-brand-gold">Ritual Type</h4>
                   {['Morning', 'Evening', 'Weekend Spa'].map(item => (
                     <label key={item} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" className="rounded border-brand-forest/10 text-brand-gold focus:ring-brand-gold" />
                        <span className="text-xs text-brand-forest">{item}</span>
                     </label>
                   ))}
                </div>
                <div className="flex items-end">
                   <button className="w-full py-4 border border-brand-forest text-brand-forest rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-forest hover:text-brand-cream transition-colors">Apply Filters</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="mt-12 flex justify-between items-center mb-8">
           <p className="text-xs font-medium text-brand-forest/40 uppercase tracking-widest">Showing {filteredProducts.length} Results</p>
           <div className="flex space-x-4">
              <button className="p-2 text-brand-forest bg-brand-cream rounded-lg"><Grid2X2 size={16} /></button>
              <button className="p-2 text-brand-forest/40 hover:text-brand-forest transition-colors"><List size={16} /></button>
           </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center text-brand-forest/20 mx-auto mb-6 border border-dashed border-brand-forest/10">
              <Search size={32} />
            </div>
            <h3 className="serif text-2xl italic text-brand-forest mb-2">No treasures found</h3>
            <p className="text-brand-forest/60 text-sm max-w-xs mx-auto">Try adjusting your filters or search query to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSearchParams({});
              }}
              className="mt-6 px-8 py-3 bg-brand-forest text-brand-cream rounded-full text-xs font-bold uppercase tracking-widest outline-none"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
