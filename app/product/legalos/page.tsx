'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Scale, FileText, Shield, AlertTriangle, CheckCircle2,
  ArrowRight, Play, Lock, Globe, Zap, Database,
  Clock, Users, BarChart3, Eye, Gavel, Search
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
    icon: FileText,
    title: "Autonomous Contract Drafting",
    desc: "Generate legally sound NDA, MSA, employment, vendor, and SaaS agreements in minutes. LegalOS uses clause-level intelligence trained on millions of contracts to draft documents that are jurisdiction-aware, risk-balanced, and fully customizable.",
    accent: "#ef4444"
  },
  {
    icon: Search,
    title: "Contract Intelligence & Review",
    desc: "Upload any contract and LegalOS extracts all key clauses, flags risky terms, identifies missing protections, and benchmarks against market-standard language. Get a full risk report in under 60 seconds.",
    accent: "#f97316"
  },
  {
    icon: Shield,
    title: "Compliance Management",
    desc: "Track regulatory requirements across jurisdictions — GDPR, DPDPA, Companies Act, labor laws, and more. LegalOS monitors your policies and alerts you to compliance gaps before they become liabilities.",
    accent: "#8b5cf6"
  },
  {
    icon: Users,
    title: "HR Documentation Automation",
    desc: "Generate offer letters, employment contracts, NDAs, PIPs, and termination documents automatically — pre-populated with role-specific terms, statutory requirements, and company policy compliance built in.",
    accent: "#2563eb"
  },
  {
    icon: Database,
    title: "Contract Repository & Tracking",
    desc: "A centralized, searchable legal vault for all your agreements. Automated renewal alerts, obligation tracking, counterparty risk scoring, and full audit trails for every document and signature.",
    accent: "#06b6d4"
  },
  {
    icon: Gavel,
    title: "Dispute Risk Assessment",
    desc: "LegalOS analyzes your contract portfolio to identify clauses most likely to generate disputes. It generates preventive recommendations and, when disputes arise, summarizes the contractual position and litigation risk.",
    accent: "#10b981"
  }
];

const STATS = [
  { value: 96, suffix: '%', label: 'Review Accuracy', sub: 'Vs. senior legal counsel' },
  { value: 90, suffix: '%', label: 'Time Saved', sub: 'On contract workflows' },
  { value: 50000, suffix: '+', label: 'Contracts Processed', sub: 'Monthly across platform' },
  { value: 40, suffix: '+', label: 'Jurisdictions', sub: 'Laws & regulations mapped' },
];

export default function LegalOSPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(239,68,68,0.4) 0%, transparent 70%)', filter: 'blur(100px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Diagonal lines decoration */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(239,68,68,0.5) 0px, rgba(239,68,68,0.5) 1px, transparent 1px, transparent 40px)' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 my-5 md:my-4">
                <Scale size={11} className="text-red-400" />
                <span className="text-red-400 text-[9px] font-black uppercase tracking-[0.3em]">Autonomous Legal Intelligence</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-8xl font-black text-white leading-none tracking-wide mb-4">
                LEGAL
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-red-400 to-rose-500">OS</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-red-400 to-orange-400">Legal Protection.</span>
                <br /><span className="text-slate-400">Fully Automated.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                LegalOS is your AI-powered legal department. It drafts contracts, reviews agreements, monitors compliance, and manages your entire legal document lifecycle — autonomously, accurately, and at a fraction of legal team costs.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-red-900/30">
                  Deploy LegalOS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in LegalOS and would like to review a live contract."
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

            {/* Right — Contract Review Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6 shadow-[0_0_80px_rgba(239,68,68,0.08)]">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Contract Analysis</p>
                  <span className="text-[9px] text-red-400 font-bold uppercase tracking-widest">Reviewing...</span>
                </div>

                {/* Document preview */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/8 p-4 mb-4 font-mono text-[10px] space-y-1.5">
                  <p className="text-slate-400">SOFTWARE LICENSE AGREEMENT</p>
                  <p className="text-slate-600">This Agreement entered into as of [DATE]...</p>
                  <p className="text-slate-600">between <span className="text-white">Company Inc.</span> and <span className="text-white">Vendor LLC</span>...</p>
                  <p className="text-yellow-400 bg-yellow-500/10 px-1 rounded">⚠ Section 4.2: Unlimited liability clause — high risk</p>
                  <p className="text-slate-600">...indemnification shall extend to any and all...</p>
                  <p className="text-red-400 bg-red-500/10 px-1 rounded">🚨 Missing: IP ownership provision</p>
                  <p className="text-slate-600">Termination: either party with 90-day notice...</p>
                  <p className="text-green-400 bg-green-500/10 px-1 rounded">✓ Section 8: Acceptable data handling terms</p>
                </div>

                {/* Risk summary */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: 'High Risk', count: 2, color: '#ef4444' },
                    { label: 'Medium', count: 5, color: '#f59e0b' },
                    { label: 'Compliant', count: 18, color: '#10b981' },
                  ].map(item => (
                    <div key={item.label} className="p-3 rounded-xl border text-center"
                      style={{ borderColor: item.color + '30', backgroundColor: item.color + '08' }}>
                      <p className="font-black text-xl" style={{ color: item.color }}>{item.count}</p>
                      <p className="text-[9px] uppercase tracking-wider text-slate-500 mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[9px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all">
                  Generate Redlined Version
                </button>
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
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <Scale size={11} /> Legal Arsenal
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Your Autonomous<br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-red-400 to-rose-400">Legal Department</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-red-500/30 transition-all duration-500 hover:-translate-y-2">
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
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                LegalOS in Action
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Legal clarity,<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-red-400 to-rose-400">without the legal bills.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                LegalOS integrates with your existing document systems, HR platforms, and procurement tools. It begins by building a legal profile of your organization — your jurisdiction, industry, contract types, and risk tolerance.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                When a new contract needs drafting, LegalOS generates a complete, jurisdiction-appropriate document in minutes. When a vendor sends you an agreement, LegalOS reviews it immediately — flagging risks, suggesting redlines, and summarizing key obligations.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                All documents live in a searchable central repository. Renewals are tracked. Obligations are monitored. Compliance is continuous. Your legal exposure is always under control.
              </p>
              <WhatsAppButton
                  message="Hi, I'm interested in LegalOS and would like to understand how it can help with contract drafting, risk analysis, and compliance automation."
                  buttonText="Discuss LegalOS"
                  gradientFrom="from-red-500"
                  gradientTo="to-rose-500"
                  hoverFrom="hover:from-red-400"
                  hoverTo="hover:to-rose-400"
                  shadowColor="shadow-[0_0_40px_rgba(239,68,68,0.3)]"
                  hoverShadowColor="hover:shadow-[0_0_60px_rgba(239,68,68,0.5)]"
                  className="mt-8"
                />
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Legal Profile Setup', desc: "LegalOS learns your company's jurisdiction, industry, standard terms, and risk preferences to calibrate all document generation.", color: '#ef4444' },
                { step: '02', title: 'Contract Generation', desc: 'Define the contract type and parties. LegalOS drafts a complete, clause-balanced agreement aligned to your standards in minutes.', color: '#f97316' },
                { step: '03', title: 'Counterparty Review', desc: 'Incoming contracts are automatically analyzed. Risk flags, missing clauses, and redline suggestions are generated instantly.', color: '#8b5cf6' },
                { step: '04', title: 'Signature & Storage', desc: 'Approved documents are executed via integrated e-signature and stored in the encrypted legal vault with full audit trail.', color: '#2563eb' },
                { step: '05', title: 'Lifecycle Monitoring', desc: "LegalOS tracks every contract's obligations, renewal dates, and compliance requirements — alerting you before anything falls through.", color: '#10b981' },
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
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-red-600/10 via-rose-700/10 to-purple-900/10 border border-red-500/20 text-center overflow-hidden">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Your Legal Risk<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-red-400 to-rose-400">Starts Dropping Today</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                LegalOS pays for itself on the first contract it reviews. Protect your business at the speed of AI.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-red-900/40">
                Get Legal Protection <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="LegalOS" productTagline="Autonomous Legal Intelligence" accentColor="#ef4444" />
        <Footer/>
    </main>
  );
}