// app/hirex/login/page.tsx

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
  Fingerprint, 
  Zap, 
  Loader2,
  Globe,
  ArrowRight
} from 'lucide-react';

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-blue-500/30">
      
      <div className="fixed top-8 left-8 z-50">
        <Link 
          href="/hirex" 
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-medium text-sm group"
        >
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Homepage
        </Link>
      </div>

      <section className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.2),transparent)]">
        
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-20 left-20 w-64 h-64 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 space-y-8 mt-20">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit">
            <ActivityIcon /> Live Talent Pipeline
          </div>
          <h1 className="text-6xl font-black tracking-tighter leading-[1.1]">
            Scale Your 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"> Engineering</span> <br />
            Intelligence.
          </h1>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Welcome back. Access the world's most advanced autonomous hiring dashboard and neural verification engine.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Zero-bias AI evaluation active</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Distributed TiDB data syncing</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>SOC2 Type II & GDPR compliant</span>
            </div>
        </div>

        {/* Bottom Partners Ticker */}
        <div className="relative z-10 pt-10 border-t border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-6">Trusted by core teams at</p>
            <div className="flex gap-8 items-center text-lg font-black tracking-tighter text-white/40">
                <span>TECHFLOW</span>
                <span>NEXUSNET</span>
                <span>SECURE.AI</span>
            </div>
        </div>
      </section>

      {/* --- RIGHT SIDE: LOGIN INTERFACE --- */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        
        {/* Mobile Background Glow */}
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),transparent)]" />

        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Sign in to console</h2>
            <p className="text-slate-400">Enter your credentials to manage your nodes.</p>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] shadow-2xl backdrop-blur-xl relative">
            
            {/* Identity Providers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-xs group">
                    <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> GitHub
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-xs group">
                    <GoogleIcon /> Google
                </button>
            </div>

            <div className="relative flex items-center gap-4 mb-8">
                <div className="h-px bg-white/5 flex-grow" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Or continue with</span>
                <div className="h-px bg-white/5 flex-grow" />
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-blue-400">Email Address</label>
                <input 
                  required 
                  type="email" 
                  placeholder="name@company.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2 group">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest transition-colors group-focus-within:text-blue-400">Password</label>
                  <Link href="#" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 transition-colors uppercase tracking-widest">Forgot password?</Link>
                </div>
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] mt-8 shadow-[0_0_20px_rgba(37,99,235,0.2)]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Sign in to Dashboard <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
                <p className="text-xs text-slate-500">
                    Don&apos;t have an enterprise account? <br className="sm:hidden" />
                    <Link href="#" className="text-blue-400 font-bold hover:text-blue-300 transition-colors ml-1">Contact Sales</Link>
                </p>
            </div>
          </div>

          {/* Footer Meta */}
          <div className="flex items-center justify-center gap-6 opacity-30 pt-4">
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
               <Fingerprint className="w-3 h-3" /> Bio-Verify
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
               <ShieldCheck className="w-3 h-3" /> Encrypted
             </div>
             <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
               <Lock className="w-3 h-3" /> ISO 27001
             </div>
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