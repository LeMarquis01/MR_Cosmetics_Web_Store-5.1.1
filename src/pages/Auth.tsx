import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function Auth() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-brand-cream">
       <div className="hidden lg:block relative overflow-hidden marble-bg p-20 flex flex-col justify-between text-brand-cream">
          <div className="space-y-4">
             <div className="w-16 h-16 bg-brand-gold rounded-full flex items-center justify-center text-brand-forest font-bold text-3xl serif animate-float">MR</div>
             <h2 className="text-6xl serif italic leading-tight">The Sanctuary <br /> Awaits You</h2>
             <p className="text-brand-cream/60 max-w-sm text-lg font-light leading-relaxed">Join our exclusive circle of botanical enthusiasts and unlock rewards with every ritual purchase.</p>
          </div>
          
          <div className="space-y-8 relative z-10">
             <div className="p-8 bg-brand-cream/5 rounded-[40px] border border-brand-cream/10 backdrop-blur-sm">
                <blockquote className="serif italic text-xl opacity-80 mb-4 font-light">"Purest ingredients I've ever experienced in Kampala. My skin has never looked more radiant."</blockquote>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">— Sarah J., Botanical Member</p>
             </div>
             <div className="flex space-x-6 text-[10px] uppercase font-bold tracking-widest opacity-40">
                <span>Natural Source</span>
                <span>Artisanal Batch</span>
                <span>Pure Radiance</span>
             </div>
          </div>

          {/* Artistic Elements */}
          <div className="absolute -bottom-20 -left-20 w-80 h-80 border border-brand-gold/10 rounded-full animate-orbit" />
          <div className="absolute -top-20 -right-20 w-60 h-60 border border-brand-gold/5 rounded-full animate-orbit" style={{ animationDelay: '-5s' }} />
       </div>

       <div className="flex items-center justify-center p-8 md:p-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md space-y-12"
          >
             <div className="text-center lg:text-left space-y-4">
                <div className="lg:hidden mx-auto w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-forest font-bold text-xl serif mb-4">MR</div>
                <h1 className="text-4xl serif italic text-brand-forest">Join The Collective</h1>
                <p className="text-brand-forest/60 text-sm">Access your artisanal wellness portal via Google secure authentication.</p>
             </div>

             <div className="space-y-6">
                <button 
                  onClick={handleLogin}
                  className="w-full h-16 bg-brand-forest marble-texture text-brand-cream rounded-full font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center space-x-3 hover:bg-brand-gold hover:text-brand-forest transition-all shadow-xl"
                >
                   <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
                   <span>Continue with Google</span>
                </button>
             </div>

             <div className="pt-8">
                <p className="text-center text-xs text-brand-forest/40 leading-relaxed font-light">
                   By continuing, you agree to our <br />
                   <Link to="/terms" className="text-brand-gold font-bold">Terms of Ritual</Link> & <Link to="/privacy" className="text-brand-gold font-bold">Nature Privacy</Link>
                </p>
             </div>
          </motion.div>
       </div>
    </div>
  );
}
