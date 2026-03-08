// app/freelancex/login/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Github, 
  Mail, 
  Lock, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Loader2,
  Globe,
  ArrowRight,
  Eye,
  EyeOff,
  Cpu} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* --- TOP LEFT NAVIGATION --- */}
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

      <section className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(67,56,202,0.2),transparent)]">
        
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
        </div>

        <div className="relative z-10 space-y-8 mt-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit">
            <ActivityIcon /> Gig-Economy Infrastructure
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-[1.1]">
            Monetize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Craft</span>.
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Connect your node to the global freelance ledger. Access premium bounties, secure escrow, and high-fidelity project matching.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <span className="font-bold tracking-tight">Escrow-backed secure payments</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-blue-500" />
                </div>
                <span className="font-bold tracking-tight">Cross-border project telemetry</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-indigo-500" />
                </div>
                <span className="font-bold tracking-tight">AI-filtered high-value bounties</span>
            </div>
        </div>

        {/* Bottom Stats Ticker */}
        <div className="relative z-10 pt-10 border-t border-white/5">
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-slate-500 mb-6">Network Health</p>
            <div className="flex gap-12 items-center">
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">$2.4M+</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Paid Out</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-2xl font-black text-white">42k+</span>
                    <span className="text-[9px] uppercase font-bold text-slate-500">Active Nodes</span>
                </div>
            </div>
        </div>
      </section>

      {/* --- RIGHT SIDE: AUTH INTERFACE --- */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Mobile Glow */}
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1),transparent)]" />

        <div className="w-full max-w-md space-y-10">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="mb-6 scale-90 lg:scale-100 origin-left">
                <Logo />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Authenticate Node</h2>
            <p className="text-slate-400 text-sm font-medium">Secure entry into the elite freelance ecosystem.</p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-3xl backdrop-blur-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            
            {/* Identity Providers */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest group">
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> GitHub
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3.5 rounded-2xl hover:bg-white/10 transition-all font-black text-[10px] uppercase tracking-widest group">
                    <GoogleIcon /> Google
                </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
                <div className="h-[1px] bg-white/5 flex-grow" />
                <span className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em]">Neural Sync</span>
                <div className="h-[1px] bg-white/5 flex-grow" />
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Network Identity</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                  <input 
                    required 
                    type="email" 
                    placeholder="architect@nexus.io"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Security Key</label>
                  <Link href="#" className="text-[9px] font-black text-indigo-400 hover:text-white transition-colors uppercase tracking-widest">Recovery?</Link>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    required 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••••••"
                    className="w-full bg-black/40 border border-white/10 rounded-2xl p-4 pl-12 pr-12 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700 tracking-widest"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white disabled:opacity-50 font-black py-4 rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.01] active:scale-[0.98] mt-8 shadow-2xl text-xs uppercase tracking-[0.2em] group"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Initialize Auth <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                )}
              </button>
            </form>

            <div className="mt-10 text-center">
                <p className="text-xs text-slate-500 font-medium">
                    Access denied? 
                    <Link href="/freelancex/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors ml-2 border-b border-indigo-500/30">Create Profile</Link>
                </p>
            </div>
          </div>

          {/* Footer Encryption Badge */}
          <div className="flex items-center justify-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full mx-auto w-fit backdrop-blur-sm">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span className="text-[9px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">End-to-End Encrypted Node</span>
          </div>
        </div>
      </section>

    </main>
  );
}

// --- HELPER ICONS ---
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

function ActivityIcon() {
    return (
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    )
}