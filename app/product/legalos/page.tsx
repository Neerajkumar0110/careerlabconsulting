'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Scale, FileText, Shield, ArrowRight,
  Zap, Database, Clock, Users, BarChart3,
  Eye, Gavel, Search, Wifi
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

// ─── Static visual / icon data (not DB-driven) ────────────────────────────────
const FEATURE_ICONS   = [FileText, Search, Shield, Users, Database, Gavel];
const FEATURE_ACCENTS = ['#ef4444', '#f97316', '#8b5cf6', '#2563eb', '#06b6d4', '#10b981'];
const STEP_COLORS     = ['#ef4444', '#f97316', '#8b5cf6', '#2563eb', '#10b981'];

// Contract review mockup rows — static visual only
const MOCKUP_LINES = [
  { type: 'neutral', text: 'SOFTWARE LICENSE AGREEMENT' },
  { type: 'muted',   text: 'This Agreement entered into as of [DATE]...' },
  { type: 'muted',   text: 'between Company Inc. and Vendor LLC...' },
  { type: 'warning', text: '⚠ Section 4.2: Unlimited liability clause — high risk' },
  { type: 'muted',   text: '...indemnification shall extend to any and all...' },
  { type: 'danger',  text: '🚨 Missing: IP ownership provision' },
  { type: 'muted',   text: 'Termination: either party with 90-day notice...' },
  { type: 'success', text: '✓ Section 8: Acceptable data handling terms' },
];

const RISK_SUMMARY = [
  { label: 'High Risk', count: 2, color: '#ef4444' },
  { label: 'Medium',    count: 5, color: '#f59e0b' },
  { label: 'Compliant', count: 18, color: '#10b981' },
];

export default function LegalOSPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // ── Load all content from DB, with inline fallbacks ──────────────────────
  const { get, content } = usePageContent('legalos');
  const sectionVisible = (key: string) => !!content?.[key];

  // Hero
  const heroBadge   = get('hero', 'badge_text',         'Autonomous Legal Intelligence');
  const heroLine1   = get('hero', 'headline_line_1',    'LEGAL');
  const heroLine2   = get('hero', 'headline_line_2',    'OS');
  const heroSub1    = get('hero', 'subheading_1',       'Legal Protection.');
  const heroSub2    = get('hero', 'subheading_2',       'Fully Automated.');
  const heroBody    = get('hero', 'body',               'LegalOS is your AI-powered legal department. It drafts contracts, reviews agreements, monitors compliance, and manages your entire legal document lifecycle — autonomously, accurately, and at a fraction of legal team costs.');
  const ctaPrimary  = get('hero', 'cta_primary',        'Deploy LegalOS');
  const ctaWhatsApp = get('hero', 'cta_whatsapp',       'WhatsApp Demo');
  const waNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const waMsg       = get('hero', 'whatsapp_msg',       "Hello! I'm interested in LegalOS and would like to review a live contract.");
  const gradFrom    = get('hero', 'accent_color_from',  '#ef4444');
  const gradTo      = get('hero', 'accent_color_to',    '#f97316');

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
    value:  Number(get('stats', `stat_${n}_value`,  ['96', '90', '50000', '40'][n - 1])),
    suffix: get('stats', `stat_${n}_suffix`, ['%', '%', '+', '+'][n - 1]),
    label:  get('stats', `stat_${n}_label`,  ['Review Accuracy', 'Time Saved', 'Contracts Processed', 'Jurisdictions'][n - 1]),
    sub:    get('stats', `stat_${n}_sub`,    ['Vs. senior legal counsel', 'On contract workflows', 'Monthly across platform', 'Laws & regulations mapped'][n - 1]),
  }));

  // Features
  const featuresBadge  = get('features', 'section_badge',  'Legal Arsenal');
  const featuresHead   = get('features', 'headline',        'Your Autonomous');
  const featuresAccent = get('features', 'headline_accent', 'Legal Department');
  const features = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   FEATURE_ICONS[i],
    accent: FEATURE_ACCENTS[i],
    title:  get('features', `feat_${n}_title`, [
      'Autonomous Contract Drafting', 'Contract Intelligence & Review', 'Compliance Management',
      'HR Documentation Automation', 'Contract Repository & Tracking', 'Dispute Risk Assessment',
    ][i]),
    desc: get('features', `feat_${n}_desc`, [
      'Generate legally sound NDA, MSA, employment, vendor, and SaaS agreements in minutes. LegalOS uses clause-level intelligence trained on millions of contracts to draft documents that are jurisdiction-aware, risk-balanced, and fully customizable.',
      'Upload any contract and LegalOS extracts all key clauses, flags risky terms, identifies missing protections, and benchmarks against market-standard language. Get a full risk report in under 60 seconds.',
      'Track regulatory requirements across jurisdictions — GDPR, DPDPA, Companies Act, labor laws, and more. LegalOS monitors your policies and alerts you to compliance gaps before they become liabilities.',
      'Generate offer letters, employment contracts, NDAs, PIPs, and termination documents automatically — pre-populated with role-specific terms, statutory requirements, and company policy compliance built in.',
      'A centralized, searchable legal vault for all your agreements. Automated renewal alerts, obligation tracking, counterparty risk scoring, and full audit trails for every document and signature.',
      'LegalOS analyzes your contract portfolio to identify clauses most likely to generate disputes. It generates preventive recommendations and, when disputes arise, summarizes the contractual position and litigation risk.',
    ][i]),
  }));

  // How It Works
  const howBadge  = get('how_it_works', 'badge',           'LegalOS in Action');
  const howHead   = get('how_it_works', 'headline',        'Legal clarity,');
  const howAccent = get('how_it_works', 'headline_accent', 'without the legal bills.');
  const howBody1  = get('how_it_works', 'body_1',          'LegalOS integrates with your existing document systems, HR platforms, and procurement tools. It begins by building a legal profile of your organization — your jurisdiction, industry, contract types, and risk tolerance.');
  const howBody2  = get('how_it_works', 'body_2',          'When a new contract needs drafting, LegalOS generates a complete, jurisdiction-appropriate document in minutes. When a vendor sends you an agreement, LegalOS reviews it immediately — flagging risks, suggesting redlines, and summarizing key obligations.');
  const howBody3  = get('how_it_works', 'body_3',          'All documents live in a searchable central repository. Renewals are tracked. Obligations are monitored. Compliance is continuous. Your legal exposure is always under control.');
  const howCta    = get('how_it_works', 'cta_label',       'Discuss LegalOS');
  const howWaMsg  = get('how_it_works', 'whatsapp_msg',    "Hi, I'm interested in LegalOS and would like to understand how it can help with contract drafting, risk analysis, and compliance automation.");
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    step:  `0${n}`,
    color: STEP_COLORS[i],
    title: get('how_it_works', `step_${n}_title`, [
      'Legal Profile Setup', 'Contract Generation', 'Counterparty Review', 'Signature & Storage', 'Lifecycle Monitoring',
    ][i]),
    desc: get('how_it_works', `step_${n}_desc`, [
      "LegalOS learns your company's jurisdiction, industry, standard terms, and risk preferences to calibrate all document generation.",
      'Define the contract type and parties. LegalOS drafts a complete, clause-balanced agreement aligned to your standards in minutes.',
      'Incoming contracts are automatically analyzed. Risk flags, missing clauses, and redline suggestions are generated instantly.',
      'Approved documents are executed via integrated e-signature and stored in the encrypted legal vault with full audit trail.',
      "LegalOS tracks every contract's obligations, renewal dates, and compliance requirements — alerting you before anything falls through.",
    ][i]),
  }));

  // CTA Banner
  const ctaHead   = get('cta_banner', 'headline',        'Your Legal Risk');
  const ctaAccent = get('cta_banner', 'headline_accent', 'Starts Dropping Today');
  const ctaSub    = get('cta_banner', 'subtext',         'LegalOS pays for itself on the first contract it reviews. Protect your business at the speed of AI.');
  const ctaBtn    = get('cta_banner', 'cta_label',       'Get Legal Protection');

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px"
            style={{ background: `linear-gradient(to right, transparent, ${gradFrom}4D, transparent)` }} />
          <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradFrom}66 0%, transparent 70%)`, filter: 'blur(100px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradTo}66 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          {/* Diagonal lines decoration */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{ backgroundImage: `repeating-linear-gradient(45deg, ${gradFrom}80 0px, ${gradFrom}80 1px, transparent 1px, transparent 40px)` }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-5 md:my-4"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <Scale size={11} style={{ color: gradFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: gradFrom }}>
                  {heroBadge}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-8xl font-black text-white leading-none tracking-wide mb-4">
                {heroLine1}
                <span style={gText}>{heroLine2}</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="italic" style={gText}>{heroSub1}</span>
                <br />
                <span className="text-slate-400">{heroSub2}</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                {heroBody}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
                  style={{ background: gLR, boxShadow: `0 8px 32px ${gradFrom}50` }}>
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
            </div>

            {/* Right — Contract Review Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="relative">
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6 overflow-hidden"
                style={{ boxShadow: `0 0 80px ${gradFrom}15` }}>

                {/* Mockup Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: `${gradFrom}20`, border: `1px solid ${gradFrom}40` }}>
                      <Scale size={14} style={{ color: gradFrom }} />
                    </div>
                    <p className="text-white font-black text-xs uppercase tracking-widest">Contract Analysis</p>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest animate-pulse" style={{ color: gradFrom }}>
                    Reviewing...
                  </span>
                </div>

                {/* Document preview */}
                <div className="bg-white/[0.03] rounded-2xl border border-white/8 p-4 mb-4 font-mono text-[10px] space-y-1.5">
                  {MOCKUP_LINES.map((line, i) => (
                    <p key={i} className={`px-1 rounded ${
                      line.type === 'warning' ? 'text-yellow-400 bg-yellow-500/10' :
                      line.type === 'danger'  ? 'text-red-400 bg-red-500/10' :
                      line.type === 'success' ? 'text-green-400 bg-green-500/10' :
                      line.type === 'neutral' ? 'text-slate-400' :
                      'text-slate-600'
                    }`}>{line.text}</p>
                  ))}
                </div>

                {/* Risk summary */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {RISK_SUMMARY.map(item => (
                    <div key={item.label} className="p-3 rounded-xl border text-center"
                      style={{ borderColor: item.color + '30', backgroundColor: item.color + '08' }}>
                      <p className="font-black text-xl" style={{ color: item.color }}>{item.count}</p>
                      <p className="text-[9px] uppercase tracking-wider text-slate-500 mt-0.5">{item.label}</p>
                    </div>
                  ))}
                </div>

                <button className="w-full py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                  style={{ background: `${gradFrom}15`, border: `1px solid ${gradFrom}30`, color: gradFrom }}>
                  Generate Redlined Version
                </button>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-2 backdrop-blur-sm"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                <p className="text-green-400 text-[9px] font-black uppercase tracking-widest">96% Accuracy</p>
              </div>
              <div className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-2 backdrop-blur-sm"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: gradFrom }}>⚡ &lt; 60s Review</p>
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
              <Scale size={11} /> {featuresBadge}
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
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[400px] h-[300px] rounded-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${gradFrom} 0%, transparent 70%)`, filter: 'blur(80px)' }} />
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

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="LegalOS" productTagline="Autonomous Legal Intelligence" accentColor={gradFrom} />
      <Footer />
    </main>
  );
}