// app/freelancex/ai-test/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Sparkles, Loader2, ArrowRight,
  ShieldCheck, Target, Terminal, Fingerprint,
  MessageSquare, ChevronRight, Globe, Database, Lock,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, React.ElementType> = {
  Brain, Cpu, Target, Terminal, Fingerprint, ShieldCheck, Globe, Database, Lock,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Cpu;
}

function ScaleIcon({ size, className }: { size?: number; className?: string }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" /><path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

const EXTENDED_ICON_MAP: Record<string, React.ElementType> = {
  ...ICON_MAP,
  Scale: ScaleIcon,
};

// ── Default fallbacks ─────────────────────────────────────────────────────────

const DEFAULT_FEATURES = [
  { icon: 'Target',      title: 'Precision Vetting', desc: 'AI maps your depth across 50+ frameworks.' },
  { icon: 'Terminal',    title: 'Code Synthesis',    desc: 'Live analysis of algorithmic efficiency.'  },
  { icon: 'Fingerprint', title: 'Integrity Audit',   desc: '100% original response verification.'      },
];

const DEFAULT_DEPTH_METRICS = [
  { label: 'Algorithmic Efficiency', value: 92, color: 'bg-blue-500'   },
  { label: 'System Design',          value: 85, color: 'bg-indigo-500' },
  { label: 'Security Protocols',     value: 88, color: 'bg-purple-500' },
];

const DEFAULT_QUESTIONS = [
  { id: 1, q: 'How do you optimize a Next.js application for Core Web Vitals?',   tech: 'Frontend'     },
  { id: 2, q: 'Explain the difference between SQL and NoSQL scaling strategies.', tech: 'Backend'      },
  { id: 3, q: 'How would you handle race conditions in a distributed system?',    tech: 'Architecture' },
];

const DEFAULT_CERT_BADGES = [
  { label: 'SOC2 Compliance',      icon: 'Lock'     },
  { label: 'Encrypted Ledger',     icon: 'Database' },
  { label: 'Bias-Free Evaluation', icon: 'Scale'    },
  { label: 'Global Payout System', icon: 'Globe'    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AITestPage() {
  const { get } = usePageContent('freelancex-ai-test');

  const [step, setStep]               = useState(1);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [formData, setFormData]       = useState({ name: '', email: '', phone: '' });
  const [answers, setAnswers]         = useState<Record<number, string>>({});
  const [result, setResult]           = useState<{ score: number; summary: string } | null>(null);

  // ── CMS values ──────────────────────────────────────────────────────────
  const accentFrom         = get('hero', 'accent_from',           '#6366f1');
  const accentTo           = get('hero', 'accent_to',             '#3b82f6');
  const badgeText          = get('hero', 'badge_text',            'Autonomous Vetting Protocol');
  const headlineMain       = get('hero', 'headline_main',         'AI Technical');
  const headlineAccent     = get('hero', 'headline_accent',       'Validator.');
  const heroBodyText       = get('hero', 'body_text',             'Verify your technical rank on the global ledger.');

  const featureCards = safeParse(get('features', 'items_json', ''), DEFAULT_FEATURES);

  const dmHeadline       = get('depth_metrics', 'headline',       'Map Your');
  const dmHeadlineAccent = get('depth_metrics', 'headline_accent', 'Technical Depth');
  const dmBodyText       = get('depth_metrics', 'body_text',      'Our AI builds a multidimensional skill-depth profile.');
  const depthMetrics     = safeParse(get('depth_metrics', 'metrics_json', ''), DEFAULT_DEPTH_METRICS);

  const signupHeadline       = get('signup', 'headline',        'Initialize');
  const signupHeadlineAccent = get('signup', 'headline_accent', 'Vetting.');
  const signupBodyText       = get('signup', 'body_text',       'Complete your network link to begin the 0x99 Vetting Protocol.');
  const signupBtnLabel       = get('signup', 'btn_label',       'Initialize Link');
  const phName               = get('signup', 'placeholder_name',  'Full Identity');
  const phEmail              = get('signup', 'placeholder_email', 'Secure Email');
  const phPhone              = get('signup', 'placeholder_phone', 'WhatsApp / Phone');

  const questions    = safeParse(get('test_questions', 'questions_json', ''), DEFAULT_QUESTIONS);
  const submitLabel  = get('test_questions', 'submit_label',  'Transmit to Core');
  const loadingLabel = get('test_questions', 'loading_label', 'Vetting Logic Matrix...');
  const waNumber     = get('test_questions', 'whatsapp_number', '918700236923');

  const scoreLabel        = get('result', 'score_label',       'Neural Grade');
  const resultHeadline    = get('result', 'headline',          'Vetting');
  const resultAccent      = get('result', 'headline_accent',   'Certified.');
  const consoleBtnLabel   = get('result', 'console_btn_label', 'Open Console');
  const consoleHref       = get('result', 'console_href',      '/freelancex/login');
  const identityBadge     = get('result', 'identity_badge',    'Global Identity Active');

  const certBadges = safeParse(get('cert_badges', 'badges_json', ''), DEFAULT_CERT_BADGES);

  // ── Handlers ────────────────────────────────────────────────────────────

  const startTest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitTest = async () => {
    setIsEvaluating(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const mockData = {
      score: 94,
      summary: 'Candidate exhibits exceptional mastery of distributed systems and high-fidelity frontend optimization. Logic is consistent with S-Tier architectural standards.',
    };
    setResult(mockData);
    const waMsg = `*🚀 New AI Assessment Completed*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Score:* ${mockData.score}/100%0A*Summary:* ${mockData.summary.substring(0, 100)}...`;
    window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
    setStep(3);
    setIsEvaluating(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-24 relative">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] blur-[150px] rounded-full pointer-events-none -z-0"
          style={{ background: `${accentFrom}1a` }}
        />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: LANDING ─────────────────────────────────────────── */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-24">

                {/* Hero */}
                <div className="text-center space-y-8 max-w-4xl mx-auto pt-10 px-4">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                    <Brain size={14} style={{ color: accentFrom }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>
                      {badgeText}
                    </span>
                  </motion.div>
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
                    {headlineMain} <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text font-extrabold"
                      style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                      {headlineAccent}
                    </span>
                  </h1>
                  <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">{heroBodyText}</p>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                  {featureCards.map((f: typeof DEFAULT_FEATURES[0], i: number) => {
                    const Icon = resolveIcon(f.icon);
                    return (
                      <motion.div key={i} whileHover={{ y: -5 }}
                        className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl transition-all group shadow-2xl"
                        onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                        onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                      >
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                          style={{ background: `${accentFrom}1a` }}>
                          <Icon style={{ color: accentFrom }} size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-3 uppercase tracking-tight text-white">{f.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Depth Visualizer */}
                <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden relative group">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">
                        {dmHeadline} <br />
                        <span style={{ color: accentFrom }}>{dmHeadlineAccent}</span>
                      </h2>
                      <p className="text-slate-400 text-base leading-relaxed">{dmBodyText}</p>
                      <div className="space-y-6 pt-4">
                        {depthMetrics.map((m: typeof DEFAULT_DEPTH_METRICS[0], i: number) => (
                          <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                              <span>{m.label}</span><span>{m.value}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className={`${m.color} h-full`}
                                style={{ boxShadow: `0 0 15px ${accentFrom}80` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
                      <div className="absolute inset-0 blur-[100px] rounded-full animate-pulse" style={{ background: `${accentFrom}0d` }} />
                      <Cpu size={200} className="text-white/5 absolute -rotate-12" />
                      <Brain size={120} className="animate-bounce" style={{ color: accentFrom, animationDuration: '3s' }} />
                    </div>
                  </div>
                </div>

                {/* Signup Box */}
                <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl shadow-3xl overflow-hidden relative px-4 mx-4">
                  <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}0d, transparent, ${accentTo}0d)` }} />
                  <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="space-y-6 text-center lg:text-left">
                      <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">
                        {signupHeadline} <span className="italic" style={{ color: accentFrom }}>{signupHeadlineAccent}</span>
                      </h2>
                      <p className="text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">{signupBodyText}</p>
                      <form onSubmit={startTest} className="space-y-4 pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input required type="text" placeholder={phName}
                            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-slate-700 text-sm"
                            onFocus={e => (e.target.style.borderColor = accentFrom)}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                            onChange={e => setFormData({ ...formData, name: e.target.value })} />
                          <input required type="email" placeholder={phEmail}
                            className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-slate-700 text-sm"
                            onFocus={e => (e.target.style.borderColor = accentFrom)}
                            onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                            onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                        <input required type="tel" placeholder={phPhone}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none transition-all placeholder:text-slate-700 text-sm"
                          onFocus={e => (e.target.style.borderColor = accentFrom)}
                          onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                        <button type="submit"
                          className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-3 mt-4 text-[10px] sm:text-xs shadow-xl active:scale-95">
                          {signupBtnLabel} <ArrowRight size={18} />
                        </button>
                      </form>
                    </div>

                    <div className="hidden lg:block relative h-full">
                      <div className="absolute -inset-1 rounded-3xl blur opacity-20"
                        style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />
                      <div className="relative h-full bg-[#020617] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8">
                        <div className="flex gap-2 mb-6">
                          <div className="w-3 h-3 rounded-full bg-red-500/50" />
                          <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                          <div className="w-3 h-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="font-mono text-xs space-y-3 text-slate-500">
                          <p style={{ color: accentFrom }}>NETWORK_INIT: OK</p>
                          <p className="text-white">&gt; SECURE_TUNNEL_ESTABLISHED</p>
                          <p>&gt; IP_ORIGIN: 24.11.231.84</p>
                          <p>&gt; LATENCY: 14MS</p>
                          <p className="text-emerald-400 animate-pulse">&gt; WAITING_FOR_USER_INPUT...</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cert Badges */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
                  {certBadges.map((item: typeof DEFAULT_CERT_BADGES[0], i: number) => {
                    const Icon = EXTENDED_ICON_MAP[item.icon] ?? Cpu;
                    return (
                      <div key={i}
                        className="flex flex-col items-center gap-4 p-6 bg-white/[0.01] border border-white/5 rounded-3xl grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                        <Icon size={28} style={{ color: accentFrom }} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">{item.label}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: TEST ─────────────────────────────────────────────── */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto space-y-12 py-10 px-4">

                {/* Terminal */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-[10px] sm:text-xs text-slate-500 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 text-[10px] font-black" style={{ background: `${accentFrom}1a`, color: accentFrom }}>LOG: VERIFYING</div>
                  <div className="flex flex-col gap-1">
                    <p className="text-emerald-400">SYNCING_RESPONSES_WITH_NEURAL_ENGINE...</p>
                    <p style={{ color: accentFrom }}>DETECTING_LOGICAL_HALLUCINATIONS: 0</p>
                    <p className="text-white opacity-40">ENCRYPTION_LAYER: ACTIVE [AES-256]</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8 text-center sm:text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-2xl" style={{ background: `${accentFrom}33` }}>
                      <Cpu style={{ color: accentFrom }} className="animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Neural Audit Phase</h2>
                      <p className="text-[10px] font-mono text-slate-500">SUBJECT_ID: {formData.name.toUpperCase().substring(0, 10)}...</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl border font-mono text-[9px] sm:text-[10px] uppercase tracking-widest animate-pulse"
                    style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
                    Biometric Pulse: Nominal
                  </div>
                </div>

                <div className="space-y-12">
                  {questions.map((q: typeof DEFAULT_QUESTIONS[0], i: number) => (
                    <motion.div key={q.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="space-y-6">
                      <div className="flex items-start gap-4">
                        <span className="font-black text-2xl" style={{ color: accentFrom }}>0{i + 1}</span>
                        <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">{q.q}</h3>
                      </div>
                      <textarea
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 min-h-[220px] outline-none transition-all text-slate-300 text-base md:text-lg leading-relaxed shadow-3xl resize-none"
                        placeholder="Synthesize your architectural explanation..."
                        onFocus={e => (e.target.style.borderColor = accentFrom)}
                        onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
                        onChange={e => setAnswers({ ...answers, [q.id]: e.target.value })}
                      />
                    </motion.div>
                  ))}

                  <button
                    disabled={isEvaluating}
                    onClick={submitTest}
                    className="w-full py-8 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] flex items-center justify-center gap-4 transition-all shadow-3xl disabled:opacity-50 text-xs sm:text-sm active:scale-[0.98]"
                    style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
                  >
                    {isEvaluating ? <><Loader2 className="animate-spin" /> {loadingLabel}</> : <>{submitLabel} <Sparkles size={20} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: RESULT ───────────────────────────────────────────── */}
            {step === 3 && result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-12 max-w-4xl mx-auto py-10 px-4">

                <div className="relative inline-block">
                  <div className="absolute inset-0 blur-[120px] rounded-full" style={{ background: `${accentFrom}33` }} />
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-8 flex items-center justify-center backdrop-blur-xl"
                    style={{ borderColor: `${accentFrom}1a`, background: `${accentFrom}0d` }}>
                    <div className="flex flex-col">
                      <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{result.score}</div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">{scoreLabel}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">
                    {resultHeadline} <br className="sm:hidden" />
                    <span className="text-emerald-400">{resultAccent}</span>
                  </h2>
                  <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-left relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><ShieldCheck size={200} /></div>
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare style={{ color: accentFrom }} size={24} />
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Validation Summary</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg md:text-2xl font-medium italic">"{result.summary}"</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <button onClick={() => window.location.href = consoleHref}
                      className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all group">
                      {consoleBtnLabel} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                      <ShieldCheck size={18} /> {identityBadge}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}