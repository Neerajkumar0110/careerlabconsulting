// app/freelancex/signup/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  Fingerprint, Loader2, Zap, User, Building2,
  Sparkles, Mail, Wallet,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';

type AuthMode = 'form' | 'otp';
type Role = 'FREELANCER' | 'CLIENT';

/* ── Animation variants ─────────────────────── */
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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

const sideSteps = [
  { title: 'Initialize Identity',      Icon: Fingerprint, color: 'text-blue-400'    },
  { title: 'Verify Network Grade',      Icon: Zap,         color: 'text-indigo-400'  },
  { title: 'Activate Revenue Stream',   Icon: Wallet,      color: 'text-emerald-400' },
];

export default function FreelancexSignupPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AuthMode>('form');
  const [role, setRole] = useState<Role>('FREELANCER');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
  });
  const [otp, setOtp]         = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  /* ── OTP box handlers ─────────────────────── */
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
    const newOtp = [...otp];
    paste.slice(0, 6).split('').forEach((d, i) => { newOtp[i] = d; });
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

  /* ── API calls ────────────────────────────── */
  const sendOtp = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email:       formData.email,
          fullName:    role === 'FREELANCER' ? formData.fullName : undefined,
          phone:       formData.phone || undefined,
          companyName: role === 'CLIENT' ? formData.companyName || undefined : undefined,
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
      const res = await fetch(`${API_BASE}/api/freelancex/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email: formData.email, otp: otp.join('') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');

      if (data.role === 'CLIENT') router.push('/freelancex/dashboard/client');
      else router.push('/freelancex/dashboard/freelancer');
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  const isFormValid =
    formData.email.trim() &&
    (role === 'CLIENT' || formData.fullName.trim());

  return (
    <main className="min-h-screen bg-[#020617] text-white flex overflow-hidden font-sans selection:bg-indigo-500/30">

      {/* ── Back button ── */}
      <motion.div
        className="fixed top-4 left-4 sm:top-8 sm:left-8 z-50"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <Link
          href="/freelancex"
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-all font-medium text-xs sm:text-sm group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all shadow-xl backdrop-blur-md">
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-0.5 transition-transform" />
          </div>
          <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest">Back To Homepage</span>
        </Link>
      </motion.div>

      {/* ══════════════════════════════════════════
          LEFT PANEL
      ══════════════════════════════════════════ */}
      <motion.section
        className="hidden lg:flex w-5/12 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_bottom_right,rgba(67,56,202,0.15),transparent)]"
        variants={panelVariants} initial="hidden" animate="visible"
      >
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <motion.div
            className="absolute bottom-40 left-10 w-72 h-72 bg-blue-600/20 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <motion.div className="relative z-10 space-y-8 mt-20" variants={stagger} initial="hidden" animate="visible">
          <motion.div
            variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit"
          >
            <Sparkles className="w-3.5 h-3.5" /> Identity Provisioning
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-4xl font-black tracking-tighter leading-[1.1]">
            Unlock Your
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"> Digital</span> <br />
            Equity.
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-sm max-w-md leading-relaxed">
            Join the ecosystem where technical craft meets financial independence. Provable skills, global liquidity.
          </motion.p>
        </motion.div>

        <motion.div className="relative z-10 space-y-4" variants={stagger} initial="hidden" animate="visible">
          {sideSteps.map(({ title, Icon, color }, i) => (
            <motion.div
              key={title}
              variants={fadeUp} custom={i + 3}
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all group"
            >
              <Icon className={`w-6 h-6 ${color} group-hover:scale-110 transition-transform`} />
              <span className="font-bold text-sm text-slate-300 group-hover:text-white transition-colors">{title}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="relative z-10 pt-10 border-t border-white/5 opacity-60"
          initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: 0.9 }}
        >
          <p className="text-sm text-slate-400 italic">&ldquo;The first platform that treats developers like equity partners. No bids, just pure technical execution.&rdquo;</p>
          <p className="text-xs font-bold text-indigo-400 mt-3">— Lead Architect @ Nexus.io</p>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════
          RIGHT PANEL
      ══════════════════════════════════════════ */}
      <section className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-y-auto">
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1),transparent)]" />

        <div className="w-full max-w-sm sm:max-w-lg space-y-8 py-20 sm:py-12">

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + '-heading'}
              className="text-center lg:text-left flex flex-col items-center lg:items-start"
              variants={fadeUp} initial="hidden" animate="visible" exit="exit"
            >
              <div className="mb-6 scale-90 lg:scale-100 origin-left">
                <Logo />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {mode === 'form' ? 'Initialize Identity' : 'Verify your email'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                {mode === 'form'
                  ? 'Join the next-gen decentralized talent ledger.'
                  : `We sent a 6-digit code to ${formData.email}`}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Role toggle — only on form step */}
          <AnimatePresence>
            {mode === 'form' && (
              <motion.div
                variants={scaleIn} initial="hidden" animate="visible"
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                className="flex p-1 bg-white/5 border border-white/10 rounded-2xl"
              >
                {(['FREELANCER', 'CLIENT'] as Role[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r)}
                    className="relative flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold transition-colors z-10"
                  >
                    {role === r && (
                      <motion.div
                        layoutId="role-pill"
                        className="absolute inset-0 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-600/20"
                        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                      />
                    )}
                    <span className={`relative z-10 flex items-center gap-1.5 transition-colors ${role === r ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                      {r === 'FREELANCER' ? <User className="w-3.5 h-3.5" /> : <Building2 className="w-3.5 h-3.5" />}
                      {r === 'FREELANCER' ? 'Freelancer' : 'Client'}
                    </span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Card */}
          <motion.div
            className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

            {/* Error */}
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

              {/* ── FORM STEP ── */}
              {mode === 'form' && (
                <motion.div
                  key="form"
                  variants={slideInLeft} initial="hidden" animate="visible" exit="exit"
                  className="space-y-4"
                >
                  {/* Full Name — freelancers only */}
                  <AnimatePresence>
                    {role === 'FREELANCER' && (
                      <motion.div
                        key="fullname"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1.5 group">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
                            Full Name <span className="text-red-400">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                              type="text"
                              placeholder="Alex Jensen"
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                              value={formData.fullName}
                              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Company Name — clients only */}
                  <AnimatePresence>
                    {role === 'CLIENT' && (
                      <motion.div
                        key="company"
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="space-y-1.5 group">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
                            Organization Name <span className="text-slate-600">(optional)</span>
                          </label>
                          <div className="relative">
                            <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                            <input
                              type="text"
                              placeholder="Nexus Systems Inc."
                              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Phone */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
                      Phone <span className="text-slate-600">(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-indigo-400 transition-colors">
                      Network Identity (Email) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                      <input
                        type="email"
                        placeholder="architect@nexus.io"
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={sendOtp}
                    disabled={loading || !isFormValid}
                    whileHover={!loading && !!isFormValid ? { scale: 1.015 } : {}}
                    whileTap={!loading && !!isFormValid ? { scale: 0.985 } : {}}
                    className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] mt-2 group"
                  >
                    {loading
                      ? <Loader2 className="w-5 h-5 animate-spin" />
                      : <><span>Create Profile</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    }
                  </motion.button>

                  <p className="text-center text-xs text-slate-500 mt-2">
                    Already verified?{' '}
                    <Link href="/freelancex/login" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors border-b border-indigo-500/30">
                      Authenticate Here
                    </Link>
                  </p>
                </motion.div>
              )}

              {/* ── OTP STEP ── */}
              {mode === 'otp' && (
                <motion.div
                  key="otp"
                  variants={slideInRight} initial="hidden" animate="visible" exit="exit"
                  className="space-y-5"
                >
                  <div className="flex gap-1.5 sm:gap-2">
                    {otp.map((d, i) => (
                      <motion.input
                        key={i}
                        maxLength={1}
                        value={d}
                        onChange={(e) => handleOtpChange(e.target, i)}
                        onKeyDown={(e) => handleKeyDown(e, i)}
                        onPaste={handleOtpPaste}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.06 + 0.1 }}
                        className="w-full h-12 sm:h-14 bg-white/5 border border-white/10 rounded-xl text-center text-xl font-black focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all caret-transparent"
                      />
                    ))}
                  </div>

                  <motion.button
                    onClick={verifyOtp}
                    disabled={otp.join('').length !== 6 || loading}
                    whileHover={otp.join('').length === 6 && !loading ? { scale: 1.015 } : {}}
                    whileTap={otp.join('').length === 6 && !loading ? { scale: 0.985 } : {}}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] group"
                  >
                    {loading
                      ? <Loader2 className="w-5 h-5 animate-spin" />
                      : <><span>Verify &amp; Activate</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    }
                  </motion.button>

                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                    className="text-center text-xs sm:text-sm text-slate-500 space-x-1"
                  >
                    <span>Didn&apos;t receive it?</span>
                    <button
                      onClick={() => { setOtp(['', '', '', '', '', '']); sendOtp(); }}
                      disabled={loading}
                      className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors disabled:opacity-50"
                    >Resend</button>
                    <span>·</span>
                    <button
                      onClick={() => { setMode('form'); setError(''); setOtp(['', '', '', '', '', '']); }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >Go back</button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Footer note */}
          <motion.p
            className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed px-2"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          >
            By provisioning an identity, you agree to the Neural Compliance Framework and Secure Payment Escrow Protocols.
          </motion.p>
        </div>
      </section>

      {/* Security badge */}
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