import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream/30 px-4 py-32">
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <div className="marble-texture w-full h-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[60px] p-12 shadow-2xl relative z-10 border border-brand-forest/5"
      >
        <div className="text-center space-y-4 mb-12">
          <div className="w-16 h-16 bg-brand-forest rounded-full flex items-center justify-center text-brand-gold mx-auto shadow-lg mb-6">
            <Shield size={32} />
          </div>
          <h1 className="text-4xl serif text-brand-forest italic">Welcome Back</h1>
          <p className="text-brand-forest/50 text-sm font-light">Access your artisanal wellness portal</p>
        </div>

        <div className="space-y-6">
          <button 
            onClick={handleLogin}
            className="w-full py-5 bg-brand-forest text-white rounded-full font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 hover:bg-brand-forest/90 transition-all shadow-xl"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="Google" />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-brand-forest/50 font-light">
            New to the forest? <Link to="/auth" className="text-brand-gold font-bold hover:underline">Join the collective</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
