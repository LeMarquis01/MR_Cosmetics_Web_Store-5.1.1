import React from 'react';
import { motion } from 'motion/react';

export default function ShippingReturns() {
  return (
    <div className="min-h-screen pt-20 bg-brand-cream">
      <section className="py-24 px-4 marble-bg text-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 marble-texture" />
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-brand-gold uppercase text-[10px] font-bold tracking-[0.5em]"
          >
            Customer Care
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl serif italic"
          >
            Shipping & Returns
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-12 text-brand-forest/80 leading-relaxed font-light">
          {/* Shipping */}
          <div className="space-y-6">
            <h2 className="text-2xl serif text-brand-forest italic">Shipping</h2>
            <p className="text-sm">MR Cosmetics Ltd operates with global standards, ensuring our botanical creations reach you wherever you are.</p>
            <ul className="list-disc pl-5 space-y-4">
              <li>Worldwide shipping options available from Uganda, Kampala.</li>
              <li>Domestic Delivery: Same-day delivery for eligible locations within Kampala.</li>
              <li>International Shipping: Timelines vary depending on destination and customs protocols.</li>
            </ul>
          </div>

          {/* Returns */}
          <div className="space-y-6">
            <h2 className="text-2xl serif text-brand-forest italic">Returns</h2>
            <ul className="list-disc pl-5 space-y-4">
              <li>Returns are accepted within 5 days of delivery, provided items remain unopened, unused, and in original packaging.</li>
              <li>Due to hygiene standards, opened skincare products cannot be returned.</li>
              <li>Any damaged or incorrect items must be reported within 24 hours of receipt.</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="pt-12 border-t border-brand-forest/10 space-y-6">
            <h2 className="text-2xl serif text-brand-forest italic">Need Assistance?</h2>
            <p className="text-sm">For any questions regarding your shipment or ritual returns, please reach out to our team:</p>
            <div className="space-y-2 text-sm font-medium">
              <p>MR Cosmetics Ltd</p>
              <p>Kampala, Uganda</p>
              <p>Phone/WhatsApp: +972 532290242, +256 [ ]</p>
              <p>Email: - [ ]</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
