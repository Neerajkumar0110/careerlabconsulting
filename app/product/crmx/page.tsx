'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  TrendingUp, Target, Funnel, Zap, BarChart3, Mail,
  ArrowRight, Play, Users, Star, Database, RefreshCw,
  PieChart, Layers, ChevronUp, Activity, Award, BrainCircuit
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
const Footer = dynamic(() => import("@/components/product/Footer"));
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
import Link from 'next/link';

function Counter({ to, suffix = '', duration = 5000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const PIPELINE_STAGES = [
  { stage: 'Awareness', count: 4800, color: '#f59e0b', width: 100 },
  { stage: 'Interest', count: 3700, color: '#f97316', width: 70 },
  { stage: 'Consideration', count: 2600, color: '#ef4444', width: 60 },
  { stage: 'Intent', count: 2520, color: '#8b5cf6', width: 55 },
  { stage: 'Conversion', count: 2450, color: '#2563eb', width: 52 },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: "Predictive Lead Scoring",
    desc: "CRM-X assigns a proprietary score from 0–100 to every lead based on 200+ behavioral signals — website visits, email opens, social engagement, and firmographic data. Focus your team only on leads ready to buy.",
    accent: "#f59e0b"
  },
  {
    icon: Mail,
    title: "Autonomous Campaign Engine",
    desc: "Define goals. CRM-X designs, writes, A/B tests, and deploys multi-channel campaigns autonomously. It adjusts subject lines, send times, and content based on real-time engagement — without you lifting a finger.",
    accent: "#f97316"
  },
  {
    icon: Funnel,
    title: "Intelligent Funnel Optimization",
    desc: "CRM-X monitors every funnel stage and auto-detects drop-off points. It triggers personalized re-engagement sequences, adjusts messaging, and redistributes ad spend to fix leaks before they hurt revenue.",
    accent: "#8b5cf6"
  },
  {
    icon: Layers,
    title: "AI Content Generation",
    desc: "Need 50 personalized email sequences? CRM-X generates them in seconds. Blog posts, social captions, ad copy, landing page headlines — all aligned to your brand voice and SEO targets automatically.",
    accent: "#2563eb"
  },
  {
    icon: Database,
    title: "Unified Customer Intelligence",
    desc: "CRM-X aggregates data from 150+ sources — your CRM, social media, website analytics, support tickets, and purchase history — into a single enriched customer profile, updated in real-time.",
    accent: "#06b6d4"
  },
  {
    icon: BarChart3,
    title: "Revenue Attribution Engine",
    desc: "Know exactly which touchpoint drove each deal. CRM-X's multi-touch attribution model traces the full customer journey and calculates true ROI for every campaign, channel, and content piece.",
    accent: "#10b981"
  }
];

const STATS = [
  { value: 340, suffix: '%', label: 'Pipeline Growth', sub: 'Average across clients' },
  { value: 67, suffix: '%', label: 'Lead Conversion', sub: 'Improvement rate' },
  { value: 12, suffix: 'x', label: 'Content Output', sub: 'Vs human teams' },
  { value: 4.2, suffix: 'M+', label: 'Leads Managed', sub: 'Active across platform' },
];

export default function CRMXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
          <div className="absolute -top-20 right-0 w-[700px] h-[500px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: 'radial-gradient(rgba(245,158,11,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 my-5">
                <TrendingUp size={11} className="text-orange-400" />
                <span className="text-orange-400 text-[9px] font-black uppercase tracking-[0.3em]">Autonomous Growth Engine</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-7xl md:text-8xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                CRM
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-orange-500">—X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 italic">Grow Revenue.</span>{' '}<br/>
                <span className="text-slate-400">Autonomously.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                CRM-X is the AI-powered growth engine that replaces your entire marketing team's manual work. From lead scoring to content generation to campaign orchestration — it runs 24/7 without supervision, turning prospects into revenue on autopilot.
              </motion.p>

              <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4 }}
  className="flex flex-col sm:flex-row gap-4"
>
  <button
    onClick={() => setModalOpen(true)}
    className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-orange-900/30"
  >
    Activate CRM-X
    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
  </button>
<a
  href={`https://wa.me/919810984968?text=${encodeURIComponent(
    "Hello! I'm interested in CRM-X and would like to see a demo."
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

            {/* Right — Pipeline Funnel Visual */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6 shadow-[0_0_60px_rgba(245,158,11,0.1)]">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Live Pipeline</p>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold text-green-400">
                    <Activity size={10} className="animate-pulse" />
                    Optimizing in real-time
                  </div>
                </div>

                <div className="space-y-3">
                  {PIPELINE_STAGES.map((s, i) => (
                    <div key={s.stage}>
                      <div className="flex justify-between text-[10px] font-bold mb-1.5">
                        <span className="text-slate-400 uppercase tracking-wider">{s.stage}</span>
                        <span className="text-white">{s.count.toLocaleString()} leads</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-lg overflow-hidden mb-5">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${s.width}%` }} viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.15, ease: 'easeOut' }}
                          className="h-full rounded-lg flex items-center px-5"
                          style={{ backgroundColor: s.color, border: `1px solid ${s.color}90` }}>
                          <div className="h-1 rounded-full" style={{ width: '100%', backgroundColor: s.color + '0' }} />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-5 border-t border-white/5 grid grid-cols-3 gap-4">
                  {[
                    { label: 'Conversion', value: '3.75%', up: true },
                    { label: 'Avg Deal', value: '₹48K', up: true },
                    { label: 'Velocity', value: '12 days', up: false },
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <p className="text-white font-black text-base">{item.value}</p>
                      <p className="text-slate-600 text-[9px] uppercase tracking-widest mt-0.5">{item.label}</p>
                      <ChevronUp size={10} className={`mx-auto mt-0.5 ${item.up ? 'text-green-400' : 'text-red-400 rotate-180'}`} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 border-y border-white/5 bg-white/[0.01]">
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <TrendingUp size={11} /> Growth Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Your Autonomous<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 italic">Marketing Command</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                The CRM-X Engine
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Revenue growth<br />
                <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">on autopilot.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                CRM-X integrates with your existing data stack in under 48 hours. It begins analyzing your historical pipeline data, customer segments, and conversion patterns to build a proprietary growth model unique to your business.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                The autonomous campaign engine then starts running experiments — adjusting messaging, targeting, channels, and timing — optimizing relentlessly toward your revenue goals.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Every deal closed, every email ignored, every funnel drop-off becomes a data point that makes CRM-X smarter and more effective the next day.
              </p>
              <WhatsAppButton
                message="Hi, I'm interested in CRM-X and want to explore revenue automation."
                buttonText="Talk About CRM-X"
                gradientFrom="from-yellow-400"
                gradientTo="to-orange-500"
                hoverFrom="hover:from-yellow-300"
                hoverTo="hover:to-orange-400"
                shadowColor="shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                hoverShadowColor="hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
              />
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Data Integration', desc: 'Connect your CRM, ad platforms, website analytics, and email tools. CRM-X normalizes and enriches all incoming data.', color: '#f59e0b' },
                { step: '02', title: 'Audience Segmentation', desc: 'AI clusters your database into high-precision micro-segments based on behavior, intent, and firmographic signals.', color: '#f97316' },
                { step: '03', title: 'Campaign Orchestration', desc: 'Personalized campaigns launch across email, LinkedIn, WhatsApp, and paid channels simultaneously.', color: '#8b5cf6' },
                { step: '04', title: 'Funnel Optimization', desc: 'CRM-X monitors conversion rates in real-time and auto-adjusts messaging, offers, and targeting to maximize throughput.', color: '#2563eb' },
                { step: '05', title: 'Revenue Reporting', desc: 'Full attribution reporting shows which activities drove revenue. The model continuously retrains on closed-won data.', color: '#10b981' },
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

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <PricingSection />

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-yellow-600/10 via-orange-700/10 to-red-800/10 border border-orange-500/20 text-center overflow-hidden">
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Stop Managing<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r italic from-yellow-400 to-orange-400">Start Growing.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Let CRM-X handle your entire growth pipeline. Deploy in 48 hours, see results in 30 days.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-orange-900/40">
                Activate CRM-X <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="CRM-X" productTagline="Autonomous Growth Engine" accentColor="#f97316" />
        <Footer/>
    </main>
  );
}