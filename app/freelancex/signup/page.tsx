// app/freelancex/signup/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  User, 
  Building2, 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  Loader2,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
  Fingerprint,
  Wallet,
  Briefcase
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'freelancer' | 'employer'>('freelancer');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration protocol initiated. Redirecting to verification console.");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-indigo-500/30">
      
      <div className="fixed top-8 left-8 z-50">
        <Link 
          href="/freelancex" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-medium text-sm group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all shadow-xl backdrop-blur-md">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Back To Homepage</span>
        </Link>
      </div>

      <section className="hidden lg:flex w-5/12 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_bottom_right,rgba(67,56,202,0.15),transparent)]">
        
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute bottom-40 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <div className="relative z-10 space-y-8 mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <Sparkles className="w-3.5 h-3.5" /> Identity Provisioning
          </div>
          <h1 className="text-4xl font-black tracking-tighter leading-[1.1]">
            Unlock Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Digital</span> <br />
            Equity.
          </h1>
          <p className="text-slate-400 text-[14px] max-w-md leading-relaxed">
            Join the ecosystem where technical craft meets financial independence. Provable skills, global liquidity.
          </p>
        </div>

        <div className="relative z-10 space-y-10">
            {[
                { title: "Initialize Identity", icon: Fingerprint, color: "text-blue-400" },
                { title: "Verify Network Grade", icon: Zap, color: "text-indigo-400" },
                { title: "Activate Revenue Stream", icon: Wallet, color: "text-emerald-400" }
            ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group">
                    <step.icon className={`w-6 h-6 ${step.color} group-hover:scale-110 transition-transform`} />
                    <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">{step.title}</span>
                </div>
            ))}
        </div>

        <div className="relative z-10 pt-10 border-t border-white/5 opacity-60">
            <p className="text-sm text-slate-400 italic">"The first platform that treats developers like equity partners. No bids, just pure technical execution."</p>
            <p className="text-xs font-bold text-indigo-400 mt-3">— Lead Architect @ Nexus.io</p>
        </div>
      </section>

      <section className="w-full lg:w-7/12 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto custom-scrollbar">
        
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1),transparent)]" />

        <div className="w-full max-w-lg space-y-8 py-10">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-6 scale-90 lg:scale-100 origin-left">
                <Logo />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Initialize Identity</h2>
            <p className="text-slate-400 text-sm">Join the next-gen decentralized talent ledger.</p>
          </div>

          {/* Path Toggle */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl max-w-xs mx-auto lg:mx-0">
            <button 
              onClick={() => setRole('freelancer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'freelancer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <User className="w-3.5 h-3.5" /> Talent
            </button>
            <button 
              onClick={() => setRole('employer')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${role === 'employer' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Briefcase className="w-3.5 h-3.5" /> Employer
            </button>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-3xl backdrop-blur-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            <form onSubmit={handleSignup} className="space-y-5">
              
              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Public Label (Name)</label>
                <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                    required 
                    type="text" 
                    placeholder="Alex Jensen"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                </div>
              </div>

              <AnimatePresence mode="wait">
                {role === 'employer' && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-2 group overflow-hidden"
                    >
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Organization Name</label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input 
                                required 
                                type="text" 
                                placeholder="Nexus Systems Inc."
                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                            />
                        </div>
                    </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Network Identity (Email)</label>
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                    required 
                    type="email" 
                    placeholder="architect@nexus.io"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-indigo-400">Security Key (Password)</label>
                <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                    <input 
                    required 
                    type="password" 
                    placeholder="••••••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700 tracking-widest"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                </div>
                {/* Strength Indicator */}
                <div className="flex gap-1 px-1 pt-1">
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 5 ? 'bg-indigo-500' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 8 ? 'bg-indigo-500' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 10 ? 'bg-indigo-500' : 'bg-white/10'}`} />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white disabled:opacity-50 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.99] mt-8 shadow-2xl text-xs uppercase tracking-[0.2em] group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Create Profile <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[9px] font-black uppercase tracking-[0.2em] mt-5 mb-5"><span className="bg-[#0b0f1f] px-4 text-slate-500">Fast Identity Check</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest group active:scale-95">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest group active:scale-95">
                <GoogleIcon /> Google
              </button>
            </div>

            <p className="text-center mt-10 text-xs text-slate-500 font-medium">
              Already verified? 
              <Link href="/freelancex/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors ml-2 border-b border-indigo-500/30">Authenticate Here</Link>
            </p>
          </div>

          <p className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed">
            By provisioning an identity, you agree to the Neural Compliance Framework and Secure Payment Escrow Protocols.
          </p>
        </div>
      </section>

      <div className="fixed bottom-6 right-8 hidden lg:flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full backdrop-blur-sm z-50">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span className="text-[9px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">Verified Secure Node</span>
      </div>

    </main>
  );
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}