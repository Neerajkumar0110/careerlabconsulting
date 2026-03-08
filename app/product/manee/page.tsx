'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare, Phone, Mail, Globe, Zap, Activity,
  ArrowRight, Play, ChevronRight, Bot, Wifi, Shield,
  BarChart3, Clock, Users, Star, Check, Layers, Radio
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";

import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
import Link from 'next/link';

const Footer = dynamic(() => import("@/components/product/Footer"));

// ─── Animated Counter ─────────────────────────────────────────────────────────
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

// ─── Live chat animation ───────────────────────────────────────────────────────
const CHAT_MESSAGES = [
  { side: 'in', text: 'Hi, I need help with my order #4821', time: '09:41' },
  { side: 'out', text: 'Of course! Order #4821 is out for delivery. Expected by 3 PM today.', time: '09:41' },
  { side: 'in', text: 'Can I reschedule to tomorrow?', time: '09:42' },
  { side: 'out', text: 'Done! Rescheduled to tomorrow 10 AM–2 PM. You\'ll get an SMS confirmation.', time: '09:42' },
  { side: 'in', text: 'Perfect, thank you!', time: '09:42' },
  { side: 'out', text: '😊 Happy to help! Is there anything else I can assist with?', time: '09:43' },
];

const CHANNELS = [
  { icon: MessageSquare, label: 'WhatsApp', color: '#25D366' },
  { icon: Mail, label: 'Email', color: '#4285F4' },
  { icon: Phone, label: 'Calls', color: '#FF6B35' },
  { icon: Globe, label: 'Web Chat', color: '#8B5CF6' },
  { icon: Radio, label: 'SMS', color: '#EC4899' },
];

const FEATURES = [
  {
    icon: Layers,
    title: "Unified Omni-Channel Inbox",
    desc: "Every message from WhatsApp, email, phone, Instagram, and web chat lands in a single intelligent hub. No tab-switching. No missed conversations. MANEE routes, prioritizes, and responds across all channels simultaneously.",
    accent: "#2563eb"
  },
  {
    icon: Bot,
    title: "Autonomous AI Responder",
    desc: "MANEE doesn't just answer — it understands context, sentiment, and intent. Powered by multi-layer NLP, it handles complex queries, escalates to humans when needed, and continuously learns from every interaction.",
    accent: "#7c3aed"
  },
  {
    icon: Activity,
    title: "Real-Time Sentiment Analysis",
    desc: "Every incoming message is analyzed for emotional tone in under 50ms. MANEE detects frustration, urgency, or satisfaction and adapts its communication style accordingly — de-escalating tense conversations automatically.",
    accent: "#0891b2"
  },
  {
    icon: BarChart3,
    title: "Conversation Intelligence Dashboard",
    desc: "Deep analytics on response times, customer satisfaction scores, channel performance, and agent efficiency. Drill into any conversation thread. Export reports. Set automated alerts for SLA breaches.",
    accent: "#059669"
  },
  {
    icon: Clock,
    title: "24/7 Zero-Downtime Operations",
    desc: "MANEE operates continuously without fatigue. With redundant infrastructure across multiple regions, it delivers consistent response times under 3 seconds — even during peak traffic spikes of 10,000+ concurrent conversations.",
    accent: "#d97706"
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    desc: "End-to-end encryption on all channels. SOC 2 Type II certified. GDPR and DPDPA compliant. Role-based access controls, full audit logs, and automatic PII masking keep your customer data completely protected.",
    accent: "#dc2626"
  }
];

const STATS = [
  { value: 98, suffix: '%', label: 'Resolution Rate', sub: 'Without human intervention' },
  { value: 2.8, suffix: 's', label: 'Avg Response Time', sub: 'Across all channels' },
  { value: 10000, suffix: '+', label: 'Concurrent Chats', sub: 'Handled simultaneously' },
  { value: 500, suffix: '+', label: 'Enterprise Clients', sub: 'Globally deployed' },
];

export default function ManeePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleMessages(v => (v < CHAT_MESSAGES.length ? v + 1 : 1));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChannel(v => (v + 1) % CHANNELS.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        {/* BG Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.5) 0%, transparent 70%)', filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'radial-gradient(rgba(96,165,250,1) 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left — Typography */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 my-4 mt-8 md:my-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-400 text-[9px] font-black uppercase tracking-[0.3em]">AI Communication · Live</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                MANEE
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-black text-transparent  bg-clip-text bg-gradient-to-r italic from-blue-400 to-indigo-400 mb-6 uppercase tracking-tight leading-tight">
                Every Channel.<br />One AI Brain.
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                MANEE is your autonomous communication command center. It handles inbound and outbound interactions across WhatsApp, email, voice, and social — without a single human touch, around the clock, at infinite scale.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-blue-900/30">
                  Deploy MANEE <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in MANEE and would like to see a demo."
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

              {/* Channel pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-10">
                {CHANNELS.map((ch, i) => (
                  <div key={ch.label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-500
                      ${activeChannel === i ? 'border-opacity-60 bg-opacity-20 text-white scale-105' : 'border-white/10 bg-white/[0.02] text-slate-500'}`}
                    style={activeChannel === i ? { borderColor: ch.color + '80', backgroundColor: ch.color + '15', color: ch.color } : {}}>
                    <ch.icon size={10} />
                    {ch.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Live chat mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="relative">
              <div className="relative bg-[#0B1121] border border-white/10 rounded-3xl 
                shadow-[0_0_80px_rgba(37,99,235,0.15)]
                h-[500px] flex flex-col overflow-hidden">
                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-black">MANEE AI</p>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <p className="text-green-400 text-[9px] font-bold">Online · Responding</p>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <Wifi size={12} />
                    <span>WhatsApp</span>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-5 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500/20">
                  {CHAT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.side === 'out' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.side === 'out'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-white/[0.05] border border-white/10 text-slate-300 rounded-bl-sm'}`}>
                        <p className="text-xs leading-relaxed">{msg.text}</p>
                        <p className={`text-[9px] mt-1 ${msg.side === 'out' ? 'text-blue-200/60' : 'text-slate-600'}`}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  {visibleMessages < CHAT_MESSAGES.length && (
                    <div className="flex justify-end">
                      <div className="flex gap-1 px-4 py-3 bg-blue-600/20 rounded-2xl">
                        {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Channel toggle tabs */}
                <div className="flex gap-1 p-3 border-t border-white/5 bg-white/[0.01]">
                  {CHANNELS.map((ch, i) => (
                    <button key={ch.label} onClick={() => setActiveChannel(i)}
                      className={`flex-1 flex flex-col items-center py-2 rounded-xl text-[8px] font-black uppercase tracking-wider transition-all
                        ${activeChannel === i ? 'bg-blue-500/20 text-blue-400' : 'text-slate-600 hover:text-slate-400'}`}>
                      <ch.icon size={12} className="mb-0.5" />
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-green-500/10 border border-green-500/30 rounded-2xl px-4 py-2 backdrop-blur-sm">
                <p className="text-green-400 text-[9px] font-black uppercase tracking-widest">↑ 98% Resolution</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl px-4 py-2 backdrop-blur-sm">
                <p className="text-blue-400 text-[9px] font-black uppercase tracking-widest">⚡ &lt; 3s Response</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="relative py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-2 tabular-nums">
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
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <Zap size={11} /> Core Capabilities
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Everything You Need to<br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-blue-400 to-indigo-400">Communicate at Scale</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border"
                    style={{ backgroundColor: feat.accent + '15', borderColor: feat.accent + '40' }}>
                    <feat.icon size={20} style={{ color: feat.accent }} />
                  </div>
                  <h2 className="text-white font-black text-base mb-3 tracking-tight">{feat.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                How MANEE Works
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Intelligence that learns,<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-blue-400 to-cyan-400">adapts, and acts.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                MANEE's multi-layer AI architecture starts by ingesting your brand voice, product knowledge base, and historical conversations. It then deploys a dynamic intent engine that classifies every incoming message in real-time.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-8">
                The response module generates contextually accurate replies, pulling from your knowledge base, CRM data, and live inventory systems. When confidence drops below threshold or emotional escalation is detected, it seamlessly hands off to a human agent with full context preserved.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Every interaction feeds back into MANEE's learning loop, making it more accurate and more attuned to your customers with every passing day.
              </p>
              <WhatsAppButton
                message="Hi, I'm interested in MANEE and want to understand how it can automate and enhance our customer conversations across channels."
                buttonText="Talk About MANEE"
                gradientFrom="from-blue-500"
                gradientTo="to-cyan-500"
                hoverFrom="hover:from-blue-400"
                hoverTo="hover:to-cyan-400"
                shadowColor="shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                hoverShadowColor="hover:shadow-[0_0_60px_rgba(59,130,246,0.5)]"
                className="mt-8"
              />
            </div>

            <div className="space-y-4">
              {[
                { step: '01', title: 'Message Ingestion', desc: 'All channels funnel into a unified message bus. Duplicates are deduplicated. Priority is assigned.', color: '#2563eb' },
                { step: '02', title: 'Intent Classification', desc: 'NLP models classify intent across 200+ categories in under 20ms with 97.3% accuracy.', color: '#7c3aed' },
                { step: '03', title: 'Context Assembly', desc: 'CRM data, order history, previous conversations, and account status are assembled into full context.', color: '#0891b2' },
                { step: '04', title: 'Response Generation', desc: 'The generative module crafts a brand-aligned response. Multilingual. Tone-matched. Accurate.', color: '#059669' },
                { step: '05', title: 'Delivery & Learning', desc: 'Response is sent. Customer feedback and resolution status loop back to improve future interactions.', color: '#d97706' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-all group">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black"
                    style={{ backgroundColor: step.color + '20', color: step.color, border: `1px solid ${step.color}40` }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <PricingSection  />

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-blue-600/20 via-blue-700/10 to-indigo-800/20 border border-blue-500/20 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Ready to Deploy<br />
                <span className="text-blue-400 italic">MANEE Today?</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Join 500+ enterprises who've already automated their customer communication with MANEE.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-blue-900/40">
                Get Started Free <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="MANEE" productTagline="Omnichannel AI Communication" />

        <Footer/>
    </main>
  );
}