// app/freelancex/manee-ai/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Sparkles, Terminal, Zap, ArrowRight,
  Loader2, CheckCircle2, ShieldCheck, Mail,
  User, Phone, ChevronRight, Layers, FileCode2,
  Clock, Database, Lock, Server, ShieldAlert,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const CAPABILITY_ICON_MAP: Record<string, React.ElementType> = {
  Server, Database, ShieldAlert, BarChart3,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface CapabilityItem { icon: string; title: string; desc: string; color: string }
interface PipelineStep   { num: string; title: string; desc: string }
interface CaseStudy      { industry: string; prompt: string; stack: string; time: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CAPABILITIES = JSON.stringify([
  { icon: 'Server',      title: 'Tech Stack Optimization',  desc: 'Manee analyzes your feature requirements and selects the most efficient, scalable tech stack, avoiding architectural debt.',                                   color: 'text-blue-400'   },
  { icon: 'Database',    title: 'Database Structuring',      desc: 'Automatic recommendation between SQL, NoSQL, or Graph databases based on your expected data volume and query complexity.',                                  color: 'text-emerald-400' },
  { icon: 'ShieldAlert', title: 'Vulnerability Prediction',  desc: 'Pre-emptive identification of security flaws in the proposed architecture before a single line of code is written.',                                         color: 'text-rose-400'    },
  { icon: 'BarChart3',   title: 'Cloud Cost Forecasting',    desc: 'Accurate monthly AWS/GCP cost estimations based on anticipated user load and architectural choices.',                                                         color: 'text-indigo-400'  },
]);
const DEFAULT_PIPELINE = JSON.stringify([
  { num: '01', title: 'Prompt Ingestion', desc: 'Submit your raw idea in plain English. Manee parses the intent, constraints, and business goals.' },
  { num: '02', title: 'Neural Synthesis', desc: 'The engine cross-references millions of successful enterprise architectures to build your custom blueprint.' },
  { num: '03', title: 'Pod Deployment',   desc: 'Manee instantly matches your new architecture with available top 1% developers ready to execute.' },
]);
const DEFAULT_CASE_STUDIES = JSON.stringify([
  { industry: 'FinTech Platform', prompt: 'Need a secure, high-frequency trading platform with real-time sockets and ledger immutable logs.', stack: 'Go (Backend) + Next.js (Frontend) + PostgreSQL + Redis',    time: 'Saved 3 Weeks of Planning'   },
  { industry: 'AI SaaS Startup',  prompt: 'Building a heavy LLM wrapper. Needs fast streaming responses, vector DB, and secure auth.',          stack: 'Python/FastAPI + React + Pinecone + AWS ECS', time: 'Saved 2.5 Weeks of Planning' },
]);
const DEFAULT_CHECKLIST = JSON.stringify(['Instant Architecture Analysis', 'AI Stack Recommendation', 'Direct to Top 1% Dev Pods']);

export default function ManeeAIPage() {
  const [step, setStep]             = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData]     = useState({ name: '', email: '', phone: '', projectScope: '' });
  const [blueprint, setBlueprint]   = useState<any>(null);

  const { get } = usePageContent('freelancex-manee-ai');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom        = get('hero', 'accent_from',       '#6366f1');
  const accentTo          = get('hero', 'accent_to',         '#06b6d4');
  const heroPl            = get('hero', 'headline_plain',    'Meet');
  const heroAcc           = get('hero', 'headline_accent',   'Manee.');
  const heroBody          = get('hero', 'body_text',         'Your Autonomous AI Principal Architect. Describe your software idea, and Manee will instantly engineer the optimal tech stack, timeline, and deployment blueprint.');
  const consoleBadge      = get('hero', 'console_badge',     'Core Online');
  const consoleTitle      = get('hero', 'console_title',     'Initialize Node');
  const btnLabel          = get('hero', 'btn_label',         'Generate Architecture Blueprint');
  const processingLabel   = get('hero', 'processing_label',  'Manee is Synthesizing...');
  const checklist         = safeParse<string[]>(get('hero', 'checklist_json', DEFAULT_CHECKLIST), []);
  const waNumber          = get('hero', 'whatsapp_number',   '918700236923');

  // ── Blueprint Result ──────────────────────────────────────────────────────
  const resultPl          = get('blueprint_result', 'headline_plain',  'Blueprint');
  const resultAcc         = get('blueprint_result', 'headline_accent', 'Generated.');
  const resultBody        = get('blueprint_result', 'body_text',       'Manee has completed the analysis. A copy has been sent to your email.');
  const deployBtnLabel    = get('blueprint_result', 'deploy_btn_label','Deploy Node Team');

  // ── Capabilities ──────────────────────────────────────────────────────────
  const capPl             = get('capabilities', 'headline_plain',  'Cognitive');
  const capAcc            = get('capabilities', 'headline_accent', 'Capabilities.');
  const capSubhead        = get('capabilities', 'subheading',      'What happens when you bypass human bias and let an autonomous neural engine design your infrastructure.');
  const capabilities      = safeParse<CapabilityItem[]>(get('capabilities', 'items_json', DEFAULT_CAPABILITIES), []);

  // ── Pipeline ──────────────────────────────────────────────────────────────
  const pipelinePl        = get('pipeline', 'headline_plain',  'The Neural');
  const pipelineAcc       = get('pipeline', 'headline_accent', 'Pipeline.');
  const pipelineSteps     = safeParse<PipelineStep[]>(get('pipeline', 'steps_json', DEFAULT_PIPELINE), []);

  // ── Case Studies ──────────────────────────────────────────────────────────
  const csPl              = get('case_studies', 'headline_plain',  'Proven');
  const csAcc             = get('case_studies', 'headline_accent', 'Blueprints.');
  const csSubhead         = get('case_studies', 'subheading',      'Examples of architectures Manee has recently successfully synthesized.');
  const caseStudies       = safeParse<CaseStudy[]>(get('case_studies', 'items_json', DEFAULT_CASE_STUDIES), []);

  // ── Security ──────────────────────────────────────────────────────────────
  const secPl             = get('security', 'headline_plain',  'Zero-Retention');
  const secAcc            = get('security', 'headline_accent', 'Data Policy.');
  const secBody           = get('security', 'body_text',       'Your ideas are your intellectual property. Manee operates on a strict zero-retention policy. Prompts are analyzed in a volatile memory state and instantly purged post-synthesis.');
  const secBadge1         = get('security', 'badge_1',         'SOC2 Type II Compliant Engine');
  const secBadge2         = get('security', 'badge_2',         'E2E Encrypted TLS Tunnels');
  const secFooterNote     = get('security', 'footer_note',     'Powered by Manee Core & Autonomous AI');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch('/api/manee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setBlueprint(data);
      const waMsg = `*🤖 Manee AI Lead*%0A%0A*Name:* ${formData.name}%0A*Scope:* ${formData.projectScope.substring(0, 100)}...%0A*Recommended Stack:* ${data.techStack}`;
      window.open(`https://wa.me/${waNumber}?text=${waMsg}`, '_blank');
      setStep(2);
    } catch {
      alert('Neural connection failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] blur-[150px] rounded-full pointer-events-none -z-0" style={{ background: `${accentFrom}26` }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-32">

          {/* ── HERO & CONSOLE ─────────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-3xl mb-2 mx-auto lg:mx-0"
                    style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}4d`, boxShadow: `0 0 50px ${accentFrom}33` }}>
                    <Bot size={40} style={{ color: accentFrom }} />
                  </motion.div>
                  <div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-4">
                      {heroPl} <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>{heroAcc}</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">{heroBody}</p>
                  </div>
                  <div className="hidden lg:flex flex-col gap-4">
                    {checklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                        <CheckCircle2 className="text-emerald-500" size={16} /> {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-2xl shadow-3xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <Terminal size={20} style={{ color: accentFrom }} />
                        <h3 className="text-lg font-black uppercase tracking-widest">{consoleTitle}</h3>
                      </div>
                      <div className="px-3 py-1 text-emerald-400 text-[10px] font-black uppercase rounded-full border flex items-center gap-2" style={{ background: '#10b9811a', borderColor: '#10b98133' }}>
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> {consoleBadge}
                      </div>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                          <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                          <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                        </div>
                      </div>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                        <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                      </div>
                      <div className="relative group">
                        <textarea required rows={4} placeholder="Describe your project, app idea, or bottleneck..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 resize-none" onChange={e => setFormData({ ...formData, projectScope: e.target.value })} />
                      </div>
                      <button disabled={isProcessing} type="submit"
                        className="w-full py-4 md:py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs active:scale-95 disabled:opacity-50"
                        style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, boxShadow: `0 0 30px ${accentFrom}4d` }}>
                        {isProcessing ? <><Loader2 className="animate-spin" size={18} /> {processingLabel}</> : <>{btnLabel} <Sparkles size={16} /></>}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && blueprint && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl mx-auto space-y-10 pt-10">
                <div className="text-center space-y-4 mb-12">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto border shadow-[0_0_50px_rgba(16,185,129,0.2)]" style={{ background: '#10b9811a', borderColor: '#10b98133' }}>
                    <CheckCircle2 size={40} className="text-emerald-400" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black">
                    {resultPl} <span className="text-emerald-400 italic">{resultAcc}</span>
                  </h2>
                  <p className="text-slate-400 text-lg">{resultBody}</p>
                </div>
                <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-3xl space-y-8">
                  <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4" style={{ color: accentFrom }}><Layers size={24} /><h4 className="font-bold text-sm uppercase tracking-widest text-white">Recommended Stack</h4></div>
                      <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.techStack}</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4" style={{ color: accentTo }}><Clock size={24} /><h4 className="font-bold text-sm uppercase tracking-widest text-white">Estimated Timeline</h4></div>
                      <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.timeline}</p>
                    </div>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4 text-purple-400"><FileCode2 size={24} /><h4 className="font-bold text-sm uppercase tracking-widest text-white">Executive Analysis</h4></div>
                    <p className="text-slate-300 leading-relaxed text-base md:text-lg italic">"{blueprint.analysis}"</p>
                  </div>
                  <div className="pt-6 flex justify-center">
                    <Link href="/freelancex/talent"
                      className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      {deployBtnLabel} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── CAPABILITIES ───────────────────────────────────────────────── */}
          <section className="pt-10">
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                {capPl} <span className="italic" style={{ color: accentFrom }}>{capAcc}</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg font-medium max-w-2xl mx-auto">{capSubhead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, i) => {
                const Icon = CAPABILITY_ICON_MAP[cap.icon] ?? Server;
                return (
                  <div key={i} className="p-8 bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] transition-all group"
                    style={{ ['--hover-border' as string]: `${accentFrom}4d` }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Icon className={cap.color} size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cap.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">{cap.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── PIPELINE ───────────────────────────────────────────────────── */}
          <section className="border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden" style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, transparent)` }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 hidden md:block pointer-events-none" />
            <div className="text-center mb-12 md:mb-20">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                {pipelinePl} <span style={{ color: accentTo }}>{pipelineAcc}</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
              {pipelineSteps.map((step, i) => (
                <div key={i} className="relative bg-[#020617] p-8 border border-white/10 rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-4 border-[#020617] flex items-center justify-center font-black text-white"
                    style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}80` }}>
                    {step.num}
                  </div>
                  <h4 className="text-xl font-bold text-center text-white mt-4 mb-4">{step.title}</h4>
                  <p className="text-center text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CASE STUDIES ───────────────────────────────────────────────── */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
              <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">
                  {csPl} <span style={{ color: accentFrom }}>{csAcc}</span>
                </h2>
                <p className="text-slate-400 font-medium">{csSubhead}</p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {caseStudies.map((study, i) => (
                <div key={i} className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg" style={{ color: accentFrom, background: `${accentFrom}1a` }}>{study.industry}</span>
                    <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2"><Clock size={12} /> {study.time}</span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Client Prompt</p>
                    <p className="text-slate-300 text-sm italic border-l-2 border-slate-700 pl-4 py-1">"{study.prompt}"</p>
                  </div>
                  <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: accentTo }}><Layers size={12} /> Manee's Stack Output</p>
                    <p className="font-mono text-sm text-white font-bold">{study.stack}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── SECURITY ───────────────────────────────────────────────────── */}
          <section className="relative rounded-[3rem] overflow-hidden border p-8 md:p-16 shadow-3xl text-center md:text-left"
            style={{ background: `linear-gradient(to bottom right, ${accentTo}33, #0f172a, #020617)`, borderColor: `${accentFrom}33` }}>
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              <div className="space-y-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto md:mx-0" style={{ background: '#10b9811a', border: '1px solid #10b98133' }}>
                  <Lock className="text-emerald-500" size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  {secPl}<br /><span className="text-emerald-400 italic">{secAcc}</span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg leading-relaxed">{secBody}</p>
                <ul className="text-sm font-bold text-slate-300 space-y-3 pt-2 text-left w-fit mx-auto md:mx-0">
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={16} /> {secBadge1}</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={16} /> {secBadge2}</li>
                </ul>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                <div className="bg-black/50 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative font-mono text-[10px] sm:text-xs text-slate-500 space-y-3 shadow-2xl text-left">
                  <p style={{ color: accentFrom }}>// SECURITY_PROTOCOL_LOCKED</p>
                  <p>&gt; Encrypting User Payload... [AES-256]</p>
                  <p>&gt; Synthesizing Architecture...</p>
                  <p>&gt; Wiping Volatile Memory State...</p>
                  <p className="text-emerald-500 mt-4">&gt; 0 BYTES RETAINED. IP SECURED.</p>
                </div>
              </div>
            </div>
          </section>

          <div className="flex items-center justify-center gap-3 pt-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <ShieldCheck size={14} style={{ color: accentFrom }} /> {secFooterNote}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}