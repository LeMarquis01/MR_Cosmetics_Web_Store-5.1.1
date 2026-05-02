import React from 'react';
import { motion } from 'motion/react';

export default function Privacy() {
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
            Privacy Policy
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto space-y-8 text-brand-forest/80 leading-relaxed font-light">
          <div className="space-y-4">
            <h2 className="text-2xl serif text-brand-forest italic">Privacy Policy</h2>
            <p>MR Cosmetics Ltd is committed to safeguarding your personal data in accordance with international data protection standards:</p>
            
            <ul className="list-disc pl-5 space-y-4">
              <li>We collect personal information (name, email, phone number, delivery address) solely for order processing and customer communication.</li>
              <li>Your data is handled with strict confidentiality and is never sold or shared with third parties.</li>
              <li>Secure, trusted payment gateways are used to protect all transactions.</li>
              <li>Customers may request access, correction, or deletion of their personal data at any time.</li>
            </ul>
          </div>

          <div className="pt-12 border-t border-brand-forest/10 space-y-6">
            <h2 className="text-2xl serif text-brand-forest italic">Contact Us</h2>
            <p className="text-sm">For any privacy-related inquiries or data requests, please contact us at:</p>
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
