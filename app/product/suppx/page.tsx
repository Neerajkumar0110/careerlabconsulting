'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Headphones, MessageCircle, Phone, Globe, Zap, ArrowRight,
  Play, Clock, Shield, BarChart2, Star, CheckCircle,
  RefreshCw, Activity, Users, TrendingUp, Mic, Bot
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
const Footer = dynamic(() => import("@/components/product/Footer"));

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
    icon: Bot,
    title: "24/7 Autonomous Global Agents",
    desc: "SuppX deploys AI agents that never sleep, never escalate unnecessarily, and never leave a customer waiting. Operating across time zones with full context retention, each agent handles thousands of simultaneous conversations — maintaining brand tone and resolution quality at scale.",
    accent: "#0ea5e9"
  },
  {
    icon: Mic,
    title: "Voice + Chat Intelligence",
    desc: "SuppX handles inbound calls, live chats, WhatsApp messages, and emails within a single unified intelligence layer. Voice agents understand natural speech, regional accents, and interruptions — providing human-quality phone support at a fraction of the cost.",
    accent: "#06b6d4"
  },
  {
    icon: CheckCircle,
    title: "Autonomous Ticket Resolution",
    desc: "SuppX reads, classifies, and resolves support tickets end-to-end — without routing to a human unless genuinely required. Order issues, account queries, refund requests, and technical problems handled with full system integration and zero manual touchpoints.",
    accent: "#10b981"
  },
  {
    icon: Globe,
    title: "Multi-Domain Industry Intelligence",
    desc: "Trained across e-commerce, healthcare, and ed-tech domains, SuppX understands industry-specific workflows, compliance requirements, and customer expectations out of the box. Domain switching is automatic based on the customer's context and query type.",
    accent: "#8b5cf6"
  },
  {
    icon: BarChart2,
    title: "Real-Time Support Analytics",
    desc: "Live dashboards tracking CSAT scores, resolution rates, average handle time, escalation rates, and sentiment trends by channel and agent. SuppX surfaces recurring issue patterns and product gaps to your ops and product teams automatically.",
    accent: "#f59e0b"
  },
  {
    icon: Shield,
    title: "Intelligent Escalation & Handoff",
    desc: "SuppX knows when a conversation needs a human — and executes the handoff seamlessly with full context transferred. Escalation triggers configured per business rule: sentiment threshold, topic category, VIP customer flag, or complexity score.",
    accent: "#ef4444"
  }
];

const STATS = [
  { value: 92, suffix: '%', label: 'First-Contact Resolution', sub: 'No re-open needed' },
  { value: 24, suffix: '/7', label: 'Always On', sub: 'Zero downtime globally' },
  { value: 60, suffix: '%', label: 'Support Cost Reduction', sub: 'Vs. human-only teams' },
  { value: 1200, suffix: '+', label: 'Businesses Supported', sub: 'Across 3 industries' },
];

const LIVE_TICKETS = [
  { id: 'TK-8821', msg: 'Order not delivered after 5 days', channel: 'Chat', status: 'Resolving', sentiment: 'Frustrated', color: '#0ea5e9' },
  { id: 'TK-8822', msg: 'Unable to access my course dashboard', channel: 'Email', status: 'Resolved', sentiment: 'Neutral', color: '#10b981' },
  { id: 'TK-8823', msg: 'Refund not processed for 3 weeks', channel: 'Voice', status: 'Escalated', sentiment: 'Angry', color: '#ef4444' },
  { id: 'TK-8824', msg: 'Need prescription clarification', channel: 'WhatsApp', status: 'Resolving', sentiment: 'Calm', color: '#06b6d4' },
];

export default function SuppXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="bg-[#030b0e] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
          <div className="absolute -top-20 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.7) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(rgba(6,182,212,0.8) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 my-5 md:my-4">
                <Headphones size={11} className="text-cyan-400" />
                <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em]">AI Support Intelligence</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-6">
                Supp
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-sky-500">X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-sky-400">Support Never Sleeps.</span>
                <br /><span className="text-slate-400">Every Customer, Resolved.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                SuppX is your autonomous customer support engine. AI agents handle voice calls, live chats, and tickets across e-commerce, healthcare, and ed-tech — resolving 92% of queries without human intervention, 24 hours a day, globally.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-cyan-900/30">
                  Deploy SuppX Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in SuppX and would like to hear an AI Call."
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

            {/* Right — Live Support Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#06101a] border border-white/10 rounded-3xl p-6 shadow-[0_0_80px_rgba(6,182,212,0.08)]">
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Live Support Queue</p>
                  <div className="flex items-center gap-1.5">
                    <Activity size={10} className="text-cyan-400 animate-pulse" />
                    <span className="text-[9px] text-cyan-400 font-bold">All Channels Active</span>
                  </div>
                </div>

                {/* Channel pills */}
                <div className="flex gap-2 mb-5">
                  {[
                    { label: 'Voice', count: 12, color: '#0ea5e9' },
                    { label: 'Chat', count: 48, color: '#06b6d4' },
                    { label: 'Email', count: 31, color: '#10b981' },
                    { label: 'WhatsApp', count: 27, color: '#8b5cf6' },
                  ].map((ch) => (
                    <div key={ch.label} className="flex-1 p-2 rounded-xl text-center bg-white/[0.03] border border-white/5">
                      <p className="font-black text-base" style={{ color: ch.color }}>{ch.count}</p>
                      <p className="text-slate-600 text-[8px] font-bold uppercase">{ch.label}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-5">
                  {LIVE_TICKETS.map((t, i) => (
                    <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="shrink-0">
                        <p className="text-[9px] font-black" style={{ color: t.color }}>{t.id}</p>
                        <p className="text-slate-600 text-[8px]">{t.channel}</p>
                      </div>
                      <p className="flex-1 text-slate-400 text-[10px] truncate">{t.msg}</p>
                      <span className="shrink-0 px-2 py-1 rounded-lg text-[8px] font-black uppercase"
                        style={{ backgroundColor: t.color + '15', color: t.color }}>
                        {t.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CSAT bar */}
                <div className="p-3 bg-white/[0.02] rounded-2xl border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">CSAT Score Today</p>
                    <p className="text-cyan-400 font-black text-sm">4.8 / 5.0</p>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5">
                    <motion.div initial={{ width: 0 }} animate={{ width: '96%' }} transition={{ delay: 1, duration: 1 }}
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
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

      {/* ── FEATURES ── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <Headphones size={11} /> Support Modules
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Complete Support<br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-sky-400">Intelligence Stack</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
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

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                The SuppX Engine
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Every ticket resolved.<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-sky-400">Every customer happy.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                SuppX integrates with your helpdesk, CRM, order management system, and communication channels in under 48 hours. It ingests your existing SOPs, knowledge base, and escalation rules — then immediately begins handling inbound support autonomously.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                On voice calls, SuppX agents speak naturally in the customer's preferred language, understand context across long conversations, and resolve issues by directly interacting with your backend systems — placing refunds, updating orders, or booking appointments in real time.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Over time, SuppX learns your product's failure patterns and flags them to your ops team — turning your support function from a reactive cost center into a proactive product intelligence engine.
              </p>
              <WhatsAppButton
                message="Hi, I'm interested in SuppX and would like to see how it can autonomously resolve support tickets and improve CSAT."
                buttonText="Explore SuppX"
                gradientFrom="from-cyan-500"
                gradientTo="to-sky-500"
                hoverFrom="hover:from-cyan-400"
                hoverTo="hover:to-sky-400"
                shadowColor="shadow-[0_0_40px_rgba(14,165,233,0.3)]"
                hoverShadowColor="hover:shadow-[0_0_60px_rgba(14,165,233,0.5)]"
                className="mt-8"
              />
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Channel & System Integration', desc: 'Connect voice lines, chat widgets, WhatsApp, email, and your CRM/helpdesk in under 48 hours.', color: '#0ea5e9' },
                { step: '02', title: 'Knowledge Base Ingestion', desc: 'SuppX reads your SOPs, FAQs, and escalation policies. Instantly trained on your product and workflows.', color: '#06b6d4' },
                { step: '03', title: 'Autonomous Query Handling', desc: 'All inbound queries — voice, chat, email — routed through SuppX AI. 92% resolved without human intervention.', color: '#10b981' },
                { step: '04', title: 'Live System Actions', desc: 'Agents directly interface with your order, billing, and scheduling systems to execute resolutions — not just provide answers.', color: '#8b5cf6' },
                { step: '05', title: 'Analytics & Continuous Learning', desc: 'CSAT, resolution rates, and sentiment trends tracked in real time. SuppX continuously improves from every interaction.', color: '#f59e0b' },
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
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-cyan-600/10 via-sky-700/10 to-blue-900/10 border border-cyan-500/20 text-center overflow-hidden">
            <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Your Support Team<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-sky-400">Available 24/7, Everywhere</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Resolve every ticket. Answer every call. Serve every customer — across every channel, at any hour. SuppX runs your support without limits.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-400 hover:to-sky-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-cyan-900/40">
                Deploy SuppX Now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="SuppX" productTagline="AI Support Intelligence" accentColor="#06b6d4" />
      <Footer />
    </main>
  );
}