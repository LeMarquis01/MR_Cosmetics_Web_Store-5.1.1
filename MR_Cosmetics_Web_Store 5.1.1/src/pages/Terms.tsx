import React from 'react';
import { motion } from 'motion/react';

export default function Terms() {
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
            Terms of Service
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8 text-brand-forest/80 leading-relaxed font-light">
          <div className="space-y-4">
            <h2 className="text-2xl serif text-brand-forest italic">Terms of Service</h2>
            <p>By accessing this website, you agree to be bound by the following terms:</p>
            
            <ul className="list-disc pl-5 space-y-4">
              <li>All products are intended for personal use only and may not be resold without prior written consent.</li>
              <li>We make every effort to ensure accuracy in product descriptions, pricing, and availability; however, we reserve the right to correct any errors or omissions without prior notice.</li>
              <li>We reserve the right to refuse or cancel any order in cases of suspected fraud or unauthorised transactions.</li>
              <li>As skincare products may affect individuals differently, customers are advised to perform a patch test prior to full use. MR Cosmetics Ltd shall not be held liable for adverse reactions.</li>
              <li>These terms may be updated periodically without prior notice.</li>
            </ul>
          </div>

          <div className="pt-12 border-t border-brand-forest/10 space-y-6">
            <h2 className="text-2xl serif text-brand-forest italic">Contact Us</h2>
            <p className="text-sm">If you have any questions about our Terms of Service, please contact us at:</p>
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
