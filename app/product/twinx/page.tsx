'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Bot, BarChart3, Brain, Zap, Activity, Target,
  ArrowRight, Play, TrendingUp, Clock, Eye, LineChart,
  Shield, Cpu, Database, Globe, Layers, ChevronUp
} from 'lucide-react';

import Navbar from "@/components/product/Navbar";
const Footer = dynamic(() => import("@/components/product/Footer"));
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';

function Counter({ to, suffix = '', duration = 5000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  {
    icon: Brain,
    title: "Role-Aware Executive Intelligence",
    desc: "TwinX doesn't give generic reports. It understands your specific role — CEO, CFO, CMO, or COO — and generates insights relevant to your decisions. It thinks like your most experienced advisor, available 24/7.",
    accent: "#10b981"
  },
  {
    icon: BarChart3,
    title: "Autonomous Business Reports",
    desc: "Daily, weekly, and monthly business reports generated automatically — no analyst required. TwinX aggregates data from every department, synthesizes key signals, and presents executive-ready summaries with action items.",
    accent: "#06b6d4"
  },
  {
    icon: Activity,
    title: "Real-Time KPI Monitoring",
    desc: "Every critical metric across sales, operations, finance, HR, and marketing is tracked in real-time. TwinX sends intelligent alerts when KPIs deviate from targets — with root cause analysis included.",
    accent: "#f59e0b"
  },
  {
    icon: Target,
    title: "Strategic Decision Support",
    desc: "Feed TwinX a business problem and receive a structured strategic analysis — SWOT assessment, scenario modeling, competitive benchmarking, and recommended courses of action based on your company's data.",
    accent: "#8b5cf6"
  },
  {
    icon: Globe,
    title: "Market Intelligence Integration",
    desc: "TwinX continuously scans news, competitor filings, market data, and industry reports. It proactively surfaces trends and threats relevant to your business, so you're always ahead of the curve.",
    accent: "#2563eb"
  },
  {
    icon: Shield,
    title: "Board-Ready Report Generation",
    desc: "Investor decks, board presentations, and quarterly reports generated in hours, not weeks. TwinX formats data into compelling narratives with charts, forecasts, and strategic recommendations aligned to your vision.",
    accent: "#ef4444"
  }
];

const STATS = [
  { value: 18, suffix: 'hrs', label: 'Saved Per Week', sub: 'Per executive on average' },
  { value: 200, suffix: '+', label: 'Data Sources', sub: 'Auto-integrated' },
  { value: 3, suffix: 'sec', label: 'Report Generation', sub: 'Executive briefings' },
  { value: 94, suffix: '%', label: 'Decision Accuracy', sub: 'Prediction validation rate' },
];

const DASHBOARD_METRICS = [
  { label: 'MRR', value: '₹42.8L', change: '+12.4%', up: true },
  { label: 'Burn Rate', value: '₹18.2L', change: '-3.1%', up: true },
  { label: 'CAC', value: '₹4,200', change: '-8.7%', up: true },
  { label: 'NPS Score', value: '74', change: '+6pts', up: true },
];

export default function TwinXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)', filter: 'blur(100px)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(16,185,129,0.3) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 my-5 md:my-4">
                <Bot size={11} className="text-emerald-400" />
                <span className="text-emerald-400 text-[9px] font-black uppercase tracking-[0.3em]">Intelligent Executive AI</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                TWIN
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-500">X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-emerald-400 to-teal-400">Your Digital Brain.</span>
                <br /><span className="text-slate-400">Always On Duty.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                TwinX is your AI executive twin — a role-aware intelligence layer that monitors your entire business, generates autonomous reports, surfaces strategic insights, and helps you make faster, smarter decisions without information overload.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-emerald-900/30">
                  Activate TwinX <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in TwinX and would like to view Intelligence Demo."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
                >
                  {/* Original WhatsApp Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>

                  WhatsApp Demo
                </a>
              </motion.div>
            </div>

            {/* Right — Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6 shadow-[0_0_80px_rgba(16,185,129,0.12)]">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Cpu size={14} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white text-[10px] font-black">Executive Briefing</p>
                      <p className="text-emerald-400 text-[8px] font-bold">Auto-generated · Just now</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-slate-500 font-bold">
                    <Activity size={10} className="text-green-400 animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {DASHBOARD_METRICS.map((m, i) => (
                    <div key={m.label} className="p-3 bg-white/[0.03] rounded-xl border border-white/8">
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1">{m.label}</p>
                      <p className="text-white font-black text-lg leading-none">{m.value}</p>
                      <div className={`flex items-center gap-0.5 mt-1 text-[9px] font-bold ${m.up ? 'text-green-400' : 'text-red-400'}`}>
                        <ChevronUp size={10} className={m.up ? '' : 'rotate-180'} />
                        {m.change}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl mb-4">
                  <p className="text-emerald-400 text-[9px] font-black uppercase tracking-widest mb-2">AI Insight</p>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Enterprise segment CAC dropped 8.7% this week following the LinkedIn campaign optimization. Recommend increasing Q4 budget allocation by ₹3.2L to capitalize on improved conversion efficiency.
                  </p>
                </div>

                <div className="flex gap-2">
                  {['Daily Report', 'Board Deck', 'Forecast'].map((action) => (
                    <button key={action} className="flex-1 py-2 rounded-xl bg-white/[0.03] border border-white/8 text-slate-400 text-[9px] font-black uppercase tracking-wider hover:border-emerald-500/30 hover:text-emerald-400 transition-all">
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white mb-2 tabular-nums">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-slate-600 text-[10px]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <Brain size={11} /> Executive Intelligence
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Intelligence that works<br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-emerald-400 to-teal-400">while you sleep</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border"
                  style={{ backgroundColor: feat.accent + '15', borderColor: feat.accent + '40' }}>
                  <feat.icon size={20} style={{ color: feat.accent }} />
                </div>
                <h2 className="text-white font-black text-base mb-3 tracking-tight">{feat.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                The TwinX Intelligence Loop
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Your company's data,<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-emerald-400 to-teal-400">transformed into foresight.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                TwinX begins by integrating with your entire data infrastructure — finance systems, CRM, HR software, marketing platforms, and operational tools. It builds a living model of your business that updates in real-time.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                Your AI executive twin is then configured to your role and priorities. It learns your decision patterns, aligns with your OKRs, and begins generating proactive insights — not just dashboards, but actual recommendations with business rationale.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Over time, TwinX gets better at predicting what you'll need before you ask for it — flagging risks early, surfacing opportunities at the right moment, and reducing the cognitive load of running a complex business.
              </p>
              <WhatsAppButton
                  message="Hi, I'm interested in TwinX and would like to understand how it can transform our business data into predictive insights and executive recommendations."
                  buttonText="Discover TwinX"
                  gradientFrom="from-emerald-500"
                  gradientTo="to-teal-500"
                  hoverFrom="hover:from-emerald-400"
                  hoverTo="hover:to-teal-400"
                  shadowColor="shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                  hoverShadowColor="hover:shadow-[0_0_60px_rgba(16,185,129,0.5)]"
                  className="mt-8"
                />
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Data Integration', desc: 'Connect 200+ data sources including ERP, CRM, analytics, finance, and market feeds into one unified business model.', color: '#10b981' },
                { step: '02', title: 'Role Calibration', desc: 'TwinX is configured to your specific executive role, priorities, reporting structure, and decision-making style.', color: '#06b6d4' },
                { step: '03', title: 'Continuous Monitoring', desc: 'Real-time tracking of all KPIs with intelligent threshold-based alerting and anomaly detection.', color: '#f59e0b' },
                { step: '04', title: 'Insight Generation', desc: 'AI synthesizes cross-functional data into actionable insights with supporting evidence and strategic recommendations.', color: '#8b5cf6' },
                { step: '05', title: 'Autonomous Reporting', desc: 'Executive briefings, board packs, and investor reports generated automatically on your chosen cadence.', color: '#2563eb' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-all group">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black"
                    style={{ backgroundColor: step.color + '20', color: step.color, border: `1px solid ${step.color}40` }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-emerald-600/10 via-teal-700/10 to-cyan-900/10 border border-emerald-500/20 text-center overflow-hidden">
            <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Your Digital Twin<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-emerald-400 to-teal-400">Awaits Activation</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Stop drowning in data. Let TwinX surface what matters, when it matters.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-emerald-900/40">
                Activate TwinX <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="TwinX" productTagline="Intelligent Executive AI" accentColor="#10b981" />
        <Footer/>
    </main>
  );
}