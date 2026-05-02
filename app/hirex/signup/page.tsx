//hirex/signup/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  Fingerprint, Loader2, Zap, User, Building2, Sparkles, Mail
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

type AuthMode = 'form' | 'otp';
type Role = 'CANDIDATE' | 'RECRUITER';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, x: -40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit:   { opacity: 0, x: 40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const panelVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

export default function HirexSignupPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('form');
  const [role, setRole] = useState<Role>('CANDIDATE');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /* ── OTP Handlers ── */
  const handleOtpChange = (el: HTMLInputElement, index: number) => {
    if (isNaN(Number(el.value))) return;
    const updated = [...otp];
    updated[index] = el.value;
    setOtp(updated);
    if (el.nextSibling && el.value) (el.nextSibling as HTMLInputElement).focus();
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(paste)) return;
    const digits = paste.slice(0, 6).split('');
    const newOtp = [...otp];
    digits.forEach((d, i) => { newOtp[i] = d; });
    setOtp(newOtp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const updated = [...otp];
      if (updated[index]) { updated[index] = ''; setOtp(updated); return; }
      if (index > 0) {
        updated[index - 1] = '';
        setOtp(updated);
        (e.currentTarget.previousSibling as HTMLInputElement)?.focus();
      }
    }
  };

  /* ── API ── */
  const sendOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/hirex/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: formData.email,
          fullName: formData.fullName,
          phone: formData.phone || undefined,
          companyName: role === 'RECRUITER' ? formData.companyName : undefined,
          role,
          type: 'register',
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      setMode('otp');
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/hirex/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, otp: otp.join('') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');
      if (data.role === 'RECRUITER') router.push('/hirex/dashboard/recruiter');
      else router.push('/hirex/dashboard/candidate');
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const isFormValid =
    formData.fullName.trim() &&
    formData.email.trim() &&
    (role === 'CANDIDATE' || formData.companyName.trim());

  const features = [
    { label: 'Passwordless OTP Login',        color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', Icon: Fingerprint },
    { label: 'Autonomous Skill Verification',  color: 'text-cyan-400',    bg: 'bg-cyan-500/10 border-cyan-500/20',       Icon: Zap         },
    { label: 'Enterprise Grade Pipelines',     color: 'text-blue-400',    bg: 'bg-blue-500/10 border-blue-500/20',       Icon: ShieldCheck  },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-emerald-500/30">

      {/* Back */}
      <motion.div
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Link href="/hirex" className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-medium text-xs sm:text-sm group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all shadow-xl backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">Back To Homepage</span>
        </Link>
      </motion.div>

      {/* ── LEFT PANEL ── */}
      <motion.section
        className="hidden lg:flex w-5/12 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(30,58,138,0.2),transparent)]"
        variants={panelVariants} initial="hidden" animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-emerald-600/20 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <motion.div className="relative z-10 space-y-8 mt-20" variants={stagger} initial="hidden" animate="visible">
          <motion.div variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit"
          >
            <Sparkles className="w-3.5 h-3.5" /> Start Your Journey
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-black tracking-tighter leading-[1.1]">
            The Future of
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400"> Meritocratic</span>{' '}
            <br />Hiring.
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-sm max-w-md leading-relaxed">
            Join as a candidate to showcase your skills, or as a recruiter to discover world-class engineering talent.
          </motion.p>
        </motion.div>

        <motion.div className="relative z-10 space-y-4" variants={stagger} initial="hidden" animate="visible">
          {features.map(({ label, color, bg, Icon }, i) => (
            <motion.div key={label} variants={fadeUp} custom={i + 3}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="relative z-10 pt-10 border-t border-white/5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <StarIcon key={s} />)}</div>
          <p className="text-sm text-slate-400 italic">&ldquo;The fairest evaluation process I&apos;ve ever experienced. Purely technical, purely merit.&rdquo;</p>
          <p className="text-xs font-bold text-emerald-400 mt-3">— Senior Engineer @ TechFlow</p>
        </motion.div>
      </motion.section>

      {/* ── RIGHT PANEL ── */}
      <section className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-y-auto">
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.08),transparent)]" />

        <div className="w-full max-w-sm sm:max-w-lg space-y-8 py-20 sm:py-12">

          <AnimatePresence mode="wait">
            <motion.div key={mode + '-heading'} className="text-center lg:text-left flex flex-col items-center lg:items-start"
              variants={fadeUp} initial="hidden" animate="visible" exit="exit"
            >
              {/* HireX wordmark */}
              <div className="mb-6">
                <HirexLogo />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {mode === 'form' ? 'Create your account' : 'Verify your email'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                {mode === 'form'
                  ? 'Join the next-gen engineering network.'
                  : `We sent a 6-digit code to ${formData.email}`}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Role Toggle */}
          <AnimatePresence>
            {mode === 'form' && (
              <motion.div variants={scaleIn} initial="hidden" animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex p-1 bg-white/5 border border-white/10 rounded-2xl"
              >
                {(['CANDIDATE', 'RECRUITER'] as Role[]).map((r) => (
                  <button key={r} onClick={() => setRole(r)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-colors z-10"
                  >
                    {role === r && (
                      <motion.div layoutId="role-pill"
                        className="absolute inset-0 bg-blue-500 rounded-xl shadow-lg shadow-emerald-600/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-1.5 transition-colors ${role === r ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                      {r === 'CANDIDATE' ? <User className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                      {r.charAt(0) + r.slice(1).toLowerCase()}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card */}
          <motion.div
            className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top gradient accent bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-cyan-500" />

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-red-500/20 border border-red-500/40 p-3 rounded-xl text-xs sm:text-sm text-red-300 overflow-hidden"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {mode === 'form' && (
                <motion.div key="form" variants={slideInLeft} initial="hidden" animate="visible" exit="exit" className="space-y-4">

                  {/* Full Name */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                      <input
                        type="text" placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Phone (optional) */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                      Phone <span className="text-slate-600">(optional)</span>
                    </label>
                    <input
                      type="tel" placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Company (recruiter only) */}
                  <AnimatePresence>
                    {role === 'RECRUITER' && (
                      <motion.div key="company"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1.5 group">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                            Company Name <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                            <input
                              type="text" placeholder="Acme Technologies Ltd."
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-emerald-400 transition-colors">
                      Work Email <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                      <input
                        type="email" placeholder="name@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <motion.button variants={fadeUp} custom={2}
                    onClick={sendOtp} disabled={loading || !isFormValid}
                    whileHover={!loading && !!isFormValid ? { scale: 1.015 } : {}}
                    whileTap={!loading && !!isFormValid ? { scale: 0.985 } : {}}
                    className="w-full bg-white text-black hover:bg-blue-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] mt-2 group"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </motion.button>

                  <p className="text-center text-xs text-slate-500 mt-2">
                    Already a member?{' '}
                    <Link href="/hirex/login" className="text-blue-400 font-bold hover:text-blue-300 transition-colors border-b border-emerald-500/30">Sign in</Link>
                  </p>
                </motion.div>
              )}

              {mode === 'otp' && (
                <motion.div key="otp" variants={slideInRight} initial="hidden" animate="visible" exit="exit" className="space-y-5">
                  <div className="flex gap-1.5 sm:gap-2">
                    {otp.map((d, i) => (
                      <motion.input key={i} maxLength={1} value={d}
                        onChange={(e) => handleOtpChange(e.target, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handleOtpPaste}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 + 0.1 }}
                        className="w-full h-12 sm:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 outline-none transition-all caret-transparent"
                      />
                    ))}
                  </div>

                  <motion.button onClick={verifyOtp} disabled={otp.join('').length !== 6 || loading}
                    whileHover={otp.join('').length === 6 && !loading ? { scale: 1.015 } : {}}
                    whileTap={otp.join('').length === 6 && !loading ? { scale: 0.985 } : {}}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="w-full bg-white text-black hover:bg-emerald-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] group"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><span>Verify &amp; Activate</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
                  </motion.button>

                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="text-center text-xs sm:text-sm text-slate-500 space-x-1"
                  >
                    <span>Didn&apos;t receive it?</span>{' '}
                    <button onClick={() => { setOtp(['','','','','','']); sendOtp(); }} disabled={loading}
                      className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors disabled:opacity-50"
                    >Resend</button>
                    <span>·</span>
                    <button onClick={() => { setMode('form'); setError(''); setOtp(['','','','','','']); }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >Go back</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.p className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          >
            By provisioning an account, you consent to our Neural Data Processing Agreement and Algorithmic Ethics Policy.
          </motion.p>
        </div>
      </section>

      {/* Security badge — fixed bottom right, matching FreelanceX style */}
      <motion.div
        className="fixed bottom-6 right-8 hidden lg:flex items-center gap-3 px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-full backdrop-blur-sm z-50"
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
      >
        <ShieldCheck size={14} className="text-emerald-500" />
        <span className="text-[9px] text-emerald-500/80 font-black uppercase tracking-[0.2em]">Verified Secure Node</span>
      </motion.div>
    </main>
  );
}

function HirexLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <Logo/>
    </div>
  );
}

function StarIcon() {
  return (
    <svg className="w-3.5 h-3.5 text-emerald-500 fill-current" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}