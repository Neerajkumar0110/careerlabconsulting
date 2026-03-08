// app/hirex/signup/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Github, 
  User, 
  Building2, 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Loader2,
  ArrowRight,
  Mail,
  Lock,
  Sparkles,
  Fingerprint
} from 'lucide-react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'candidate' | 'enterprise'>('candidate');
  const [formData, setFormData] = useState({ name: '', email: '', password: '', company: '' });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-emerald-500/30">
      
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

      <section className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_bottom_right,rgba(16,185,129,0.15),transparent)]">
        
        <div className="absolute inset-0 z-0 opacity-30">
            <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-600/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative z-10 space-y-8 mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <Sparkles className="w-3.5 h-3.5" /> Start Your Journey
          </div>
          <h1 className="text-5xl font-black tracking-tighter leading-[1.1]">
            The Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"> Meritocratic</span> <br />
            Hiring.
          </h1>
          <p className="text-slate-400 text-[14px] max-w-md leading-relaxed">
            Technology should elevate potential, not automate inequality. Join the ecosystem of high-fidelity engineering talent.
          </p>
        </div>

        <div className="relative z-10 space-y-6 max-w-sm">
            {[
                { title: "Universal Neural Identity", icon: Fingerprint, color: "text-emerald-400" },
                { title: "Autonomous Skill Verification", icon: Zap, color: "text-cyan-400" },
                { title: "Enterprise Grade Pipelines", icon: ShieldCheck, color: "text-blue-400" }
            ].map((step, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all">
                    <step.icon className={`w-6 h-6 ${step.color}`} />
                    <span className="font-bold text-sm text-slate-300">{step.title}</span>
                </div>
            ))}
        </div>

        <div className="relative z-10 pt-10 border-t border-white/5">
            <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <StarIcon key={s} />)}
            </div>
            <p className="text-sm text-slate-400 italic">"The fairest evaluation process I&apos;ve ever experienced. Purely technical, purely merit."</p>
            <p className="text-xs font-bold text-emerald-400 mt-3">— Senior Engineer @ TechFlow</p>
        </div>
      </section>

      <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1),transparent)]" />

        <div className="w-full max-w-md space-y-8 py-10">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">Create your account</h2>
            <p className="text-slate-400">Join the next-gen engineering network.</p>
          </div>

          {/* Role Selection Toggle */}
          <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl">
            <button 
              onClick={() => setUserType('candidate')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${userType === 'candidate' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <User className="w-3.5 h-3.5" /> Candidate
            </button>
            <button 
              onClick={() => setUserType('enterprise')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-all ${userType === 'enterprise' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Building2 className="w-3.5 h-3.5" /> Enterprise
            </button>
          </div>

          <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-xl relative">
            <form onSubmit={handleSignup} className="space-y-5">
              
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-400">Full Name</label>
                <input 
                  required 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {userType === 'enterprise' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 group">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-400">Company Name</label>
                    <input 
                        required 
                        type="text" 
                        placeholder="Organization Ltd."
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                    />
                </div>
              )}

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-400">Work Email</label>
                <input 
                  required 
                  type="email" 
                  placeholder="name@domain.com"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-emerald-400">Secure Password</label>
                <input 
                  required 
                  type="password" 
                  placeholder="••••••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                {/* Visual Strength Indicator */}
                <div className="flex gap-1 px-1 pt-1">
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 5 ? 'bg-emerald-500' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 8 ? 'bg-emerald-500' : 'bg-white/10'}`} />
                    <div className={`h-1 flex-1 rounded-full ${formData.password.length > 10 ? 'bg-emerald-500' : 'bg-white/10'}`} />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-[#020617] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] mt-8 shadow-[0_10px_30px_rgba(16,185,129,0.2)]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>Create Secure Account <ArrowRight className="w-4 h-4" /></>
                )}
              </button>
            </form>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest mt-5 mb-5"><span className="bg-[#0b0f1f] px-4 text-slate-500">Fast Identity Check</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-xs group">
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform" /> GitHub
              </button>
              <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-xs group">
                <GoogleIcon /> Google
              </button>
            </div>

            <p className="text-center mt-8 text-xs text-slate-500">
              Already a member? <Link href="/hirex/login" className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors ml-1">Sign in</Link>
            </p>
          </div>

          <p className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed">
            By provisioning an account, you consent to our Neural Data Processing Agreement and Algorithmic Ethics Policy.
          </p>
        </div>
      </section>

    </main>
  );
}

// --- HELPER ICONS ---
function StarIcon() {
    return <svg className="w-3.5 h-3.5 text-emerald-500 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
}

function GoogleIcon() {
    return (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
      </svg>
    );
}