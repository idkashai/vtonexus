import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(true);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neonBlue/20 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neonMagenta/10 rounded-full blur-[100px]" style={{ animationDuration: '4s' }}></div>
      </div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Access your digital wardrobe</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-neonBlue transition-colors"
              placeholder="stylist@vto-nexus.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-2 tracking-wider">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-neonBlue transition-colors"
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
             <div 
               className="flex items-center gap-2 cursor-pointer group"
               onClick={() => setPrivacyMode(!privacyMode)}
             >
                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${privacyMode ? 'bg-neonBlue' : 'bg-gray-700'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${privacyMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-white transition-colors flex items-center gap-1">
                  Face Blur Privacy {privacyMode && <ShieldCheck size={12} className="text-neonBlue" />}
                </span>
             </div>
             <a href="#" className="text-xs text-neonBlue hover:text-white transition-colors">Forgot Password?</a>
          </div>

          <button className="w-full py-4 bg-gradient-to-r from-neonBlue to-cyan-500 text-black font-bold rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all transform hover:-translate-y-1">
            Log In
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-gray-500">
          Don't have an avatar? <a href="#" className="text-white hover:underline">Create Account</a>
        </div>
      </motion.div>
    </motion.div>
  );
}