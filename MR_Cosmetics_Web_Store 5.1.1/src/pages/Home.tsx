import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const categories = [
    { name: 'Skincare', img: 'https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?auto=format&fit=crop&q=80&w=800', icon: <Leaf size={20} />, alt: 'Woman applying botanical face cream' },
    { name: 'Haircare', img: 'https://images.unsplash.com/photo-1556228720-da3e3020668b?auto=format&fit=crop&q=80&w=800', icon: <Sparkles size={20} />, alt: 'Lustrous hair ritual' },
    { name: 'Body', img: 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800', icon: <ShieldCheck size={20} />, alt: 'Natural wellness supplements' },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden marble-bg min-h-[90vh] flex items-center pt-20 pb-32 px-4 shadow-[inset_0_-20px_40px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 border border-brand-gold/30 rounded-full bg-brand-gold/10 text-brand-gold text-[10px] uppercase tracking-[0.2em] font-bold">
              <Sparkles size={12} />
              <span>Est. Kampala 2026</span>
            </div>

            <h1 className="text-6xl md:text-8xl xl:text-9xl serif text-brand-cream font-light leading-tight">
              Natural Beauty <br />
              <span className="italic font-normal text-brand-gold underline decoration-brand-gold/30 underline-offset-8">Wellness</span> <br />
              Found Here
            </h1>

            <p className="text-brand-cream/70 text-lg max-w-md leading-relaxed font-light">
              Experience the convergence of ancient botanical wisdom and modern luxury. MR Cosmetics brings the forest's purity to your vanity.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/shop" className="px-10 py-5 bg-brand-gold text-brand-forest rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform flex items-center group">
                Shop Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
              </Link>
              <Link to="/loyalty" className="px-10 py-5 border border-brand-cream/30 text-brand-cream rounded-full font-bold uppercase text-xs tracking-widest hover:bg-brand-cream hover:text-brand-forest transition-all">
                The Circle
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-2xl aspect-[4/5] lg:aspect-auto lg:h-[650px] overflow-hidden rounded-[60px] border border-brand-gold/30 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800" 
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                alt="Wellness and Radiance"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/40 to-transparent" />
            </div>
          </motion.div>
        </div>
        
        {/* Slogan Band */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-gold py-3 overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee-slow space-x-12 px-6">
            {[...Array(10)].map((_, i) => (
              <span key={i} className="text-[10px] text-brand-forest font-bold uppercase tracking-[0.3em] flex items-center">
                <Leaf size={14} className="mr-2" /> NATURAL BEAUTY AND WELLNESS • ARTISANAL • RADIANCE FOUND
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Bento */}
      <section className="py-24 max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-16 space-y-4">
          <p className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.3em]">Curation</p>
          <h2 className="text-4xl md:text-5xl serif text-brand-forest italic">Our Natural Realms</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {categories.map((cat, idx) => (
            <Link 
              to={`/shop?cat=${cat.name}`} 
              key={idx}
              className="relative group block overflow-hidden rounded-[48px] aspect-[4/6] transition-all duration-700"
            >
              <img 
                src={cat.img} 
                className="w-full h-full object-cover transition-all duration-[1.5s] group-hover:scale-110 group-hover:rotate-1" 
                alt={cat.alt}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  if (cat.name === 'Skincare') target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800';
                  if (cat.name === 'Haircare') target.src = 'https://images.unsplash.com/photo-1556228720-da3e3020668b?auto=format&fit=crop&q=80&w=800';
                  if (cat.name === 'Body') target.src = 'https://images.unsplash.com/photo-1552693673-1bf958298935?auto=format&fit=crop&q=80&w=800';
                }}
                referrerPolicy="no-referrer"
              />
              {/* Refined Overlays */}
              <div className="absolute inset-0 bg-brand-forest/30 group-hover:bg-brand-forest/10 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/90 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <motion.div 
                  initial={false}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-[1px] bg-brand-gold" />
                    <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[0.4em]">{cat.name}</span>
                  </div>
                  
                  <h3 className="text-4xl serif text-white italic leading-tight group-hover:translate-x-2 transition-transform duration-500">
                    {idx === 0 ? "Ancestral Glow" : idx === 1 ? "Forest Threads" : "Vital Essence"}
                  </h3>

                  <div className="pt-4 overflow-hidden">
                    <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-xl border border-white/20 p-1 rounded-full pr-6 group-hover:bg-brand-gold group-hover:border-brand-gold transition-all duration-500">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-forest group-hover:rotate-45 transition-transform duration-500">
                        <ArrowRight size={18} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white group-hover:text-brand-forest">Explore Range</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
