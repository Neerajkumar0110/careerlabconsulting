'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, Lock, ArrowRight, Github, 
  ShieldCheck, Loader2, ChevronLeft, 
  Eye, EyeOff, Terminal, User, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/freelancex/logo/logo';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'freelancer' | 'employer'>('freelancer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration protocol initiated. Backend integration required.");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-x-hidden selection:bg-blue-500/30">
      
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-8 left-4 sm:left-8 z-20"
      >
        <Link 
          href="/freelancex" 
          className="flex items-center gap-2 text-slate-500 hover:text-white transition-all text-[10px] font-black uppercase tracking-[0.2em] group bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Access Protocol
        </Link>
      </motion.div>

      <div className="w-full max-w-[520px] relative z-10 py-12">
        
        <div className="flex flex-col items-center mb-10 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-6 p-4 bg-white/5 rounded-[2rem] border border-white/10 backdrop-blur-xl shadow-2xl relative"
          >
            <Logo />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-black tracking-tight mb-3"
          >
            Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Identity</span>
          </motion.h1>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] opacity-70">
            Register your profile on the decentralized network
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative w-[50%] lg:w-[100%] mx-auto"
        >
          <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500/30 via-white/5 to-indigo-500/30 rounded-[2.5rem] opacity-50" />
          
          <div className="relative bg-[#050b1d]/80 border border-white/10 rounded-[2.5rem] p-8 sm:p-10 backdrop-blur-2xl shadow-3xl">
            
            <form onSubmit={handleSignup} className="space-y-6">
              
              <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-8">
                <button
                  type="button"
                  onClick={() => setRole('freelancer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'freelancer' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <User size={14} /> Talent
                </button>
                <button
                  type="button"
                  onClick={() => setRole('employer')}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'employer' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                >
                  <Briefcase size={14} /> Employer
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 ml-1 flex items-center gap-2">
                  <User size={12} className="text-blue-500" /> Full Name
                </label>
                <div className="relative group">
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Alex Jensen"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-6 pr-5 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all outline-none"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 ml-1 flex items-center gap-2">
                  <Terminal size={12} className="text-blue-500" /> Network Identity (Email)
                </label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                  <input 
                    required
                    type="email" 
                    placeholder="architect@nexus.io"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-5 text-sm focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.08] transition-all outline-none"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 ml-1 flex items-center gap-2">
                   <Lock size={12} className="text-indigo-500" /> Security Key
                </label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
                  <input 
                    required
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-14 text-sm focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all outline-none tracking-widest"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button 
                disabled={isLoading}
                type="submit" 
                className="w-full bg-white text-black py-4 mt-4 mb-8 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50 hover:bg-blue-600 hover:text-white group"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <>
                    Initialize Profile 
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="relative my-10 text-center">
              <div className="absolute inset-0 flex items-center px-2"><div className="w-full border-t border-white/5"></div></div>
              <span className="relative bg-[#0b101f] px-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Sync</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <button className="flex items-center justify-center gap-3 py-4 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95">
                <Github size={16} /> GitHub
              </button>
              <button className="flex items-center justify-center gap-3 py-4 bg-white/[0.02] border border-white/10 rounded-2xl hover:bg-white/5 transition-all text-[10px] font-black uppercase tracking-widest active:scale-95">
                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.908 3.152-1.928 4.176-1.288 1.288-3.312 2.32-7.336 2.32-6.624 0-11.936-5.376-11.936-12s5.312-12 11.936-12c3.576 0 6.264 1.416 8.16 3.224l2.32-2.32C19.12 2.552 16.24 0 12.48 0 5.68 0 0 5.68 0 12.48s5.68 12.48 12.48 12.48c3.672 0 6.44-1.208 8.64-3.512 2.296-2.296 3.032-5.536 3.032-8.128 0-.792-.064-1.544-.184-2.256h-11.472z"/>
                </svg> Google
              </button>
            </div>
          </div>
        </motion.div>

        <div className="text-center mt-10 space-y-8">
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-wider">
            Already verified? <Link href="/freelancex/login" className="text-white hover:text-blue-400 transition-colors border-b border-blue-500/50 pb-0.5 ml-1">Authenticate Here</Link>
          </p>

          <div className="flex items-center justify-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full mx-auto w-fit backdrop-blur-sm">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[9px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">Verified Secure Protocol</span>
          </div>
        </div>

      </div>
    </div>
  );
}