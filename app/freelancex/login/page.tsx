// app/freelancex/login/page.tsx

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, ShieldCheck,
  Fingerprint, Loader2, Mail, Zap,
  CheckCircle2, Globe, Cpu,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';

type AuthMode = 'email' | 'otp';

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
  exit: { opacity: 0, x: -40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

const panelVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

const featureChecks = [
  { icon: CheckCircle2, label: 'OTP-only, passwordless login', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  { icon: Globe,        label: 'Cross-border gig telemetry',  color: 'text-blue-500',    bg: 'bg-blue-500/10 border-blue-500/20'    },
  { icon: Cpu,          label: 'AI-filtered premium bounties', color: 'text-indigo-500',  bg: 'bg-indigo-500/10 border-indigo-500/20' },
];

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

export default function FreelancexLoginPage() {
  const router = useRouter();
  const [mode, setMode]       = useState<AuthMode>('email');
  const [email, setEmail]     = useState('');
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
        body: JSON.stringify({ email, type: 'login' }),
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
        body: JSON.stringify({ email, otp: otp.join('') }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Verification failed');

      if (data.role === 'CLIENT') router.push('/freelancex/dashboard/client');
      else router.push('/freelancex/dashboard/freelancer');
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

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
        className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 border-r border-white/5 bg-[radial-gradient(ellipse_at_top_left,rgba(67,56,202,0.2),transparent)]"
        variants={panelVariants} initial="hidden" animate="visible"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <motion.div
            className="absolute top-20 left-20 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full"
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        {/* Hero text */}
        <motion.div
          className="relative z-10 space-y-8 mt-20"
          variants={stagger} initial="hidden" animate="visible"
        >
          <motion.div
            variants={fadeUp} custom={0}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-mono uppercase tracking-[0.2em] w-fit"
          >
            <ActivityIcon /> Gig-Economy Infrastructure
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} className="text-5xl font-black tracking-tighter leading-[1.1]">
            Monetize Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Digital Craft</span>.
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-base max-w-md leading-relaxed">
            Connect your node to the global freelance ledger. Access premium bounties, secure escrow, and high-fidelity project matching.
          </motion.p>
        </motion.div>

        {/* Feature checklist */}
        <motion.div className="relative z-10 space-y-4" variants={stagger} initial="hidden" animate="visible">
          {featureChecks.map(({ icon: Icon, label, color, bg }, i) => (
            <motion.div key={label} variants={fadeUp} custom={i + 3} className="flex items-center gap-3 text-sm text-slate-300">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${bg}`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="font-bold tracking-tight">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="relative z-10 pt-10 border-t border-white/5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        >
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
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — AUTH INTERFACE
      ══════════════════════════════════════════ */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 relative">
        <div className="lg:hidden absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1),transparent)]" />

        <div className="w-full max-w-sm sm:max-w-md space-y-8">

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={mode + '-heading'}
              className="text-center lg:text-left"
              variants={fadeUp} initial="hidden" animate="visible" exit="exit"
            >
              <div className="mb-6 flex justify-center lg:justify-start scale-90 lg:scale-100 origin-left">
                <Logo />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {mode === 'email' ? 'Authenticate Node' : 'Check your inbox'}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                {mode === 'email'
                  ? "Enter your email — we'll send a one-time access code."
                  : `We sent a 6-digit code to ${email}`}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Card */}
          <motion.div
            className="bg-white/[0.03] border border-white/10 p-6 sm:p-8 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top accent bar */}
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

              {/* ── EMAIL STEP ── */}
              {mode === 'email' && (
                <motion.div
                  key="email"
                  variants={slideInLeft} initial="hidden" animate="visible" exit="exit"
                  className="space-y-5"
                >
                  <div className="space-y-1.5 group">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within:text-blue-400 transition-colors">
                      Network Identity (Email)
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                      <input
                        type="email"
                        placeholder="architect@nexus.io"
                        autoFocus
                        className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-4 py-3.5 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none transition-all placeholder:text-slate-700"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && email && sendOtp()}
                      />
                    </div>
                  </div>

                  <motion.button
                    onClick={sendOtp}
                    disabled={loading || !email}
                    whileHover={!loading && !!email ? { scale: 1.015 } : {}}
                    whileTap={!loading && !!email ? { scale: 0.985 } : {}}
                    className="w-full bg-white text-black hover:bg-indigo-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-2xl text-xs uppercase tracking-[0.2em] group"
                  >
                    {loading
                      ? <Loader2 className="w-5 h-5 animate-spin" />
                      : <><span>Get Access Code</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                    }
                  </motion.button>

                  <p className="text-center text-xs text-slate-500 pt-2">
                    Access denied?{' '}
                    <Link href="/freelancex/signup" className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors border-b border-indigo-500/30">
                      Create Profile
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
                      : <><span>Verify &amp; Sign In</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
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
                    >
                      Resend code
                    </button>
                    <span>·</span>
                    <button
                      onClick={() => { setMode('email'); setError(''); setOtp(['', '', '', '', '', '']); }}
                      className="text-slate-400 hover:text-white transition-colors"
                    >
                      Change email
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Security badge */}
          <motion.div
            className="flex items-center justify-center gap-4 opacity-40 pt-2"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.4, y: 0 }} transition={{ delay: 1 }}
          >
            {[
              { Icon: Fingerprint, label: 'OTP Only' },
              { Icon: ShieldCheck, label: 'Encrypted' },
              { Icon: Zap,         label: 'Instant'   },
            ].map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest">
                <Icon className="w-3 h-3" /> {label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function ActivityIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}