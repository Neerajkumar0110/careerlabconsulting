'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MessageSquare, Phone, Mail, Globe, Zap, Activity,
  ArrowRight, Bot, Wifi, Shield,
  BarChart3, Clock, Layers, Radio
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
import { usePageContent } from '@/hooks/usePageContent';

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

// ─── Static visual data (not DB-driven) ───────────────────────────────────────
const CHAT_MESSAGES = [
  { side: 'in',  text: 'Hi, I need help with my order #4821', time: '09:41' },
  { side: 'out', text: 'Of course! Order #4821 is out for delivery. Expected by 3 PM today.', time: '09:41' },
  { side: 'in',  text: 'Can I reschedule to tomorrow?', time: '09:42' },
  { side: 'out', text: "Done! Rescheduled to tomorrow 10 AM–2 PM. You'll get an SMS confirmation.", time: '09:42' },
  { side: 'in',  text: 'Perfect, thank you!', time: '09:42' },
  { side: 'out', text: '😊 Happy to help! Is there anything else I can assist with?', time: '09:43' },
];

const CHANNELS = [
  { icon: MessageSquare, label: 'WhatsApp', color: '#25D366' },
  { icon: Mail,          label: 'Email',    color: '#4285F4' },
  { icon: Phone,         label: 'Calls',    color: '#FF6B35' },
  { icon: Globe,         label: 'Web Chat', color: '#8B5CF6' },
  { icon: Radio,         label: 'SMS',      color: '#EC4899' },
];

const FEATURE_ICONS   = [Layers, Bot, Activity, BarChart3, Clock, Shield];
const FEATURE_ACCENTS = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'];
const STEP_COLORS     = ['#2563eb', '#7c3aed', '#0891b2', '#059669', '#d97706'];

export default function ManeePage() {
  const [modalOpen, setModalOpen]             = useState(false);
  const [activeChannel, setActiveChannel]     = useState(0);
  const [visibleMessages, setVisibleMessages] = useState(1);

  // ── Load all content from DB, with inline fallbacks ──────────────────────
  const { get, content } = usePageContent('manee');
  const sectionVisible = (key: string) => !!content?.[key];

  // Hero
  const heroBadge   = get('hero', 'badge_text',       'AI Communication · Live');
  const heroTitle   = get('hero', 'headline',          'MANEE');
  const heroSub1    = get('hero', 'subheading_1',      'Every Channel.');
  const heroSub2    = get('hero', 'subheading_2',      'One AI Brain.');
  const heroBody    = get('hero', 'body',              "MANEE is your autonomous communication command center. It handles inbound and outbound interactions across WhatsApp, email, voice, and social — without a single human touch, around the clock, at infinite scale.");
  const ctaPrimary  = get('hero', 'cta_primary',       'Deploy MANEE');
  const ctaWhatsApp = get('hero', 'cta_whatsapp',      'WhatsApp Demo');
  const waNumber    = get('hero', 'whatsapp_number',   '919810984968');
  const waMsg       = get('hero', 'whatsapp_msg',      "Hello! I'm interested in MANEE and would like to see a demo.");
  const gradFrom    = get('hero', 'accent_color_from', '#2563eb');
  const gradTo      = get('hero', 'accent_color_to',   '#06b6d4');

  // Derived style helpers — all colours flow from gradFrom / gradTo
  const gLR      = `linear-gradient(to right, ${gradFrom}, ${gradTo})`;
  const gLL      = `linear-gradient(to right, ${gradFrom}, ${gradFrom})`;
  const gBR      = `linear-gradient(to bottom right, ${gradFrom}, ${gradTo})`;
  const gText: React.CSSProperties = {
    backgroundImage: gLR,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  // Stats
  const stats = [1, 2, 3, 4].map((n) => ({
    value:  Number(get('stats', `stat_${n}_value`,  ['98', '2.8', '10000', '500'][n - 1])),
    suffix: get('stats', `stat_${n}_suffix`, ['%', 's', '+', '+'][n - 1]),
    label:  get('stats', `stat_${n}_label`,  ['Resolution Rate', 'Avg Response Time', 'Concurrent Chats', 'Enterprise Clients'][n - 1]),
    sub:    get('stats', `stat_${n}_sub`,    ['Without human intervention', 'Across all channels', 'Handled simultaneously', 'Globally deployed'][n - 1]),
  }));

  // Features
  const featuresBadge  = get('features', 'section_badge',  'Core Capabilities');
  const featuresHead   = get('features', 'headline',        'Everything You Need to');
  const featuresAccent = get('features', 'headline_accent', 'Communicate at Scale');
  const features = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   FEATURE_ICONS[i],
    accent: FEATURE_ACCENTS[i],
    title:  get('features', `feat_${n}_title`, [
      'Unified Omni-Channel Inbox', 'Autonomous AI Responder', 'Real-Time Sentiment Analysis',
      'Conversation Intelligence Dashboard', '24/7 Zero-Downtime Operations', 'Enterprise-Grade Security',
    ][i]),
    desc: get('features', `feat_${n}_desc`, [
      'Every message from WhatsApp, email, phone, Instagram, and web chat lands in a single intelligent hub. No tab-switching. No missed conversations.',
      "MANEE doesn't just answer — it understands context, sentiment, and intent. Powered by multi-layer NLP, it handles complex queries and escalates to humans when needed.",
      'Every incoming message is analyzed for emotional tone in under 50ms. MANEE detects frustration, urgency, or satisfaction and adapts its communication style accordingly.',
      'Deep analytics on response times, customer satisfaction scores, channel performance, and agent efficiency. Drill into any conversation thread.',
      'MANEE operates continuously without fatigue. With redundant infrastructure across multiple regions, it delivers consistent response times under 3 seconds.',
      'End-to-end encryption on all channels. SOC 2 Type II certified. GDPR and DPDPA compliant. Role-based access controls and full audit logs.',
    ][i]),
  }));

  // How It Works
  const howBadge  = get('how_it_works', 'badge',           'How MANEE Works');
  const howHead   = get('how_it_works', 'headline',        'Intelligence that learns,');
  const howAccent = get('how_it_works', 'headline_accent', 'adapts, and acts.');
  const howBody1  = get('how_it_works', 'body_1',          "MANEE's multi-layer AI architecture starts by ingesting your brand voice, product knowledge base, and historical conversations. It then deploys a dynamic intent engine that classifies every incoming message in real-time.");
  const howBody2  = get('how_it_works', 'body_2',          'The response module generates contextually accurate replies, pulling from your knowledge base, CRM data, and live inventory systems. When confidence drops or emotional escalation is detected, it seamlessly hands off to a human agent with full context preserved.');
  const howBody3  = get('how_it_works', 'body_3',          "Every interaction feeds back into MANEE's learning loop, making it more accurate and more attuned to your customers with every passing day.");
  const howCta    = get('how_it_works', 'cta_label',       'Talk About MANEE');
  const howWaMsg  = get('how_it_works', 'whatsapp_msg',    "Hi, I'm interested in MANEE and want to understand how it can automate and enhance our customer conversations across channels.");
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    step:  `0${n}`,
    color: STEP_COLORS[i],
    title: get('how_it_works', `step_${n}_title`, [
      'Message Ingestion', 'Intent Classification', 'Context Assembly', 'Response Generation', 'Delivery & Learning',
    ][i]),
    desc: get('how_it_works', `step_${n}_desc`, [
      'All channels funnel into a unified message bus. Duplicates are deduplicated. Priority is assigned.',
      'NLP models classify intent across 200+ categories in under 20ms with 97.3% accuracy.',
      'CRM data, order history, previous conversations, and account status are assembled into full context.',
      'The generative module crafts a brand-aligned response. Multilingual. Tone-matched. Accurate.',
      'Response is sent. Customer feedback and resolution status loop back to improve future interactions.',
    ][i]),
  }));

  // CTA Banner
  const ctaHead   = get('cta_banner', 'headline',        'Ready to Deploy');
  const ctaAccent = get('cta_banner', 'headline_accent', 'MANEE Today?');
  const ctaSub    = get('cta_banner', 'subtext',         "Join 500+ enterprises who've already automated their customer communication with MANEE.");
  const ctaBtn    = get('cta_banner', 'cta_label',       'Get Started Free');

  useEffect(() => {
    const t = setInterval(() => setVisibleMessages(v => (v < CHAT_MESSAGES.length ? v + 1 : 1)), 1800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setActiveChannel(v => (v + 1) % CHANNELS.length), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px"
            style={{ background: `linear-gradient(to right, transparent, ${gradFrom}4D, transparent)` }} />
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: `radial-gradient(circle, ${gradFrom}80 0%, transparent 70%)`, filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradTo}80 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: `radial-gradient(${gradFrom} 1px, transparent 1px)`, backgroundSize: '36px 36px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-4 mt-8 md:my-3"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: gradFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: gradFrom }}>
                  {heroBadge}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                {heroTitle}
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl font-black mb-6 uppercase tracking-tight leading-tight italic"
                style={gText}>
                {heroSub1}<br />{heroSub2}
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                {heroBody}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
                  style={{ background: gLL, boxShadow: `0 8px 32px ${gradFrom}50` }}>
                  {ctaPrimary}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  {ctaWhatsApp}
                </a>
              </motion.div>

              {/* Channel pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-2 mt-10">
                {CHANNELS.map((ch, i) => (
                  <div key={ch.label}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-500"
                    style={activeChannel === i
                      ? { borderColor: ch.color + '80', backgroundColor: ch.color + '15', color: ch.color, transform: 'scale(1.05)' }
                      : { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.02)', color: '#64748b' }}>
                    <ch.icon size={10} />
                    {ch.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Live chat mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="relative">
              <div className="relative bg-[#0B1121] border border-white/10 rounded-3xl h-[500px] flex flex-col overflow-hidden"
                style={{ boxShadow: `0 0 80px ${gradFrom}26` }}>

                {/* Chat Header */}
                <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: `${gradFrom}20`, border: `1px solid ${gradFrom}4D` }}>
                    <Bot size={16} style={{ color: gradFrom }} />
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
                <div className="flex-1 p-5 space-y-3 overflow-y-auto">
                  {CHAT_MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.side === 'out' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.side === 'out' ? 'rounded-br-sm text-white' : 'bg-white/[0.05] border border-white/10 text-slate-300 rounded-bl-sm'}`}
                        style={msg.side === 'out' ? { background: gLL } : {}}>
                        <p className="text-xs leading-relaxed">{msg.text}</p>
                        <p className="text-[9px] mt-1" style={{ color: msg.side === 'out' ? 'rgba(255,255,255,0.5)' : '#475569' }}>{msg.time}</p>
                      </div>
                    </motion.div>
                  ))}
                  {visibleMessages < CHAT_MESSAGES.length && (
                    <div className="flex justify-end">
                      <div className="flex gap-1 px-4 py-3 rounded-2xl" style={{ background: `${gradFrom}20` }}>
                        {[0, 1, 2].map(i => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{ background: gradFrom, animationDelay: `${i * 150}ms` }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Channel toggle tabs */}
                <div className="flex gap-1 p-3 border-t border-white/5 bg-white/[0.01]">
                  {CHANNELS.map((ch, i) => (
                    <button key={ch.label} onClick={() => setActiveChannel(i)}
                      className="flex-1 flex flex-col items-center py-2 rounded-xl text-[8px] font-black uppercase tracking-wider transition-all"
                      style={activeChannel === i
                        ? { background: `${gradFrom}20`, color: gradFrom }
                        : { color: '#475569' }}>
                      <ch.icon size={12} className="mb-0.5" />
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-2 backdrop-blur-sm"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <p className="text-green-400 text-[9px] font-black uppercase tracking-widest">↑ 98% Resolution</p>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2 backdrop-blur-sm"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: gradFrom }}>⚡ &lt; 3s Response</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      {sectionVisible('stats') && (
      <section className="relative py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
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
      )}

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      {sectionVisible('features') && (
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-6"
              style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
              <Zap size={11} /> {featuresBadge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              {featuresHead}<br />
              <span className="italic" style={gText}>{featuresAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative p-7 rounded-3xl bg-white/[0.02] border border-white/8 transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${gradFrom}4D`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
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
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      {sectionVisible('how_it_works') && (
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-8"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
                {howBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                {howHead}<br />
                <span className="italic" style={gText}>{howAccent}</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">{howBody1}</p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">{howBody2}</p>
              <p className="text-slate-400 text-base leading-relaxed">{howBody3}</p>
              <div className="mt-8">
                <WhatsAppButton
                  message={howWaMsg}
                  buttonText={howCta}
                  gradientFrom={gradFrom}
                  gradientTo={gradTo}
                  hoverFrom="hover:brightness-110"
                  hoverTo="hover:brightness-110"
                  shadowColor={`shadow-[0_0_40px_${gradFrom}4D]`}
                  hoverShadowColor={`hover:shadow-[0_0_60px_${gradFrom}80]`}
                />
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, i) => (
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
      )}

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <PricingSection />

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      {sectionVisible('cta_banner') && (
      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] text-center overflow-hidden"
            style={{ background: `linear-gradient(to bottom right, ${gradFrom}1A, ${gradTo}1A)`, border: `1px solid ${gradFrom}33` }}>
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${gradFrom} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                {ctaHead}<br />
                <span className="italic" style={gText}>{ctaAccent}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">{ctaSub}</p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all"
                style={{ background: gLR, boxShadow: `0 8px 40px ${gradFrom}50` }}>
                {ctaBtn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="MANEE" productTagline="Omnichannel AI Communication" accentColor={gradFrom} />
      <Footer />
    </main>
  );
}