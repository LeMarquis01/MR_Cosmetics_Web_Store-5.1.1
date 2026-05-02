import React from 'react';
import { motion } from 'motion/react';
import { Award, Gift, Star, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Loyalty() {
  return (
    <div className="pt-24 min-h-screen bg-brand-cream overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-gold/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-brand-gold/20 rounded-full bg-brand-gold/5 text-brand-gold text-xs uppercase tracking-widest font-bold"
          >
            <Award size={14} />
            <span>The Botanical Circle</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl serif text-brand-forest leading-tight"
          >
            Loyalty <span className="italic">Rewards</span> Programme
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-brand-forest/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Our valued clients are rewarded for their continued trust and commitment to botanical excellence. Join our sanctuary and let your radiance be recognized.
          </motion.p>
        </div>
      </section>

      {/* Rewards Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="text-brand-gold" size={32} />,
                title: "Purchase Points",
                desc: "Earn points with every purchase. Every ritual you embrace brings you closer to exclusive benefits."
              },
              {
                icon: <Gift className="text-brand-gold" size={32} />,
                title: "Exclusive Rewards",
                desc: "Points may be redeemed for exclusive discounts, artisanal batch releases, and limited offers."
              },
              {
                icon: <Award className="text-brand-gold" size={32} />,
                title: "Welcome Gift",
                desc: "Enjoy welcome rewards upon registration as you step into our botanical sanctuary."
              },
              {
                icon: <Users className="text-brand-gold" size={32} />,
                title: "Circle Incentives",
                desc: "Benefit from referral incentives and seasonal promotions designed for our inner circle."
              }
            ].map((reward, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[40px] border border-brand-forest/5 bg-brand-cream/20 space-y-6 hover:shadow-xl transition-all group"
              >
                <div className="p-4 bg-white rounded-2xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                  {reward.icon}
                </div>
                <h3 className="text-xl serif text-brand-forest font-medium">{reward.title}</h3>
                <p className="text-sm text-brand-forest/60 leading-relaxed font-light">
                  {reward.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-4xl mx-auto text-center bg-brand-forest rounded-[60px] p-12 md:p-20 text-brand-cream overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <h2 className="text-4xl md:text-5xl serif mb-6">Begin Your Journey</h2>
          <p className="text-brand-cream/70 mb-10 max-w-xl mx-auto font-light">Join the Botanical Circle today and start earning rewards for your wellness rituals.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/auth" 
              className="px-10 py-5 bg-brand-gold text-brand-forest rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-cream transition-colors"
            >
              Register Now
            </Link>
            <Link 
              to="/shop" 
              className="px-10 py-5 border border-brand-cream/20 text-brand-cream rounded-full font-bold uppercase tracking-widest text-xs hover:bg-brand-cream/10 transition-colors flex items-center space-x-2"
            >
              <span>Explore Shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
