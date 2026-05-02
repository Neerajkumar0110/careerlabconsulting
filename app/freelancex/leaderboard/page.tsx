// app/freelancex/leaderboard/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, CheckCircle2, Zap,
  Target, Cpu, Users, X, Loader2,
  ArrowRight, Activity, Layers,
  Binary, ShieldAlert,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const AUDIT_ICON_MAP: Record<string, React.ElementType> = { Binary, ShieldAlert, Layers, Activity };
const PERK_ICON_MAP:  Record<string, React.ElementType> = { Target, Cpu, Wallet };

// ── Wallet icon (inline) ──────────────────────────────────────────────────────
function Wallet({ className, size }: { className?: string; size?: number }) {
  return (
    <svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
    </svg>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_LEADERBOARD = JSON.stringify([
  { rank: 1, category: 'AI Architects',  name: 'Alex Chen',     role: 'AI Systems Architect', score: '9,985', sprint: 42, country: 'US', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', tier: 'Legend'      },
  { rank: 2, category: 'Frontend',       name: 'Sarah Jenkins', role: 'Full Stack Lead',       score: '9,840', sprint: 38, country: 'UK', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150', tier: 'Grandmaster' },
  { rank: 3, category: 'Backend & Cloud',name: 'Kenji Sato',    role: 'Rust Blockchain Eng.',  score: '9,720', sprint: 31, country: 'JP', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', tier: 'Grandmaster' },
  { rank: 4, category: 'Frontend',       name: 'Priya Sharma',  role: 'UI/UX Visionary',       score: '9,650', sprint: 29, country: 'IN', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',   tier: 'Master'      },
  { rank: 5, category: 'Backend & Cloud',name: 'Marcus Doe',    role: 'DevOps & Cloud',        score: '9,500', sprint: 45, country: 'DE', avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150', tier: 'Master'      },
]);
const DEFAULT_AUDIT_VECTORS = JSON.stringify([
  { label: 'Logic Consistency',  val: 98, icon: 'Binary'     },
  { label: 'Security Hardening', val: 94, icon: 'ShieldAlert' },
  { label: 'System Design',      val: 91, icon: 'Layers'      },
  { label: 'Velocity Index',     val: 89, icon: 'Activity'    },
]);
const DEFAULT_GROWTH_PERKS = JSON.stringify([
  { rank: 'Diamond+',    perk: 'Direct Client Access',   desc: 'Skip the queue. Get direct notifications for high-ticket enterprise bounties.', icon: 'Target' },
  { rank: 'Grandmaster', perk: 'Permanent Equity Share', desc: 'Earn a percentage of the total ecosystem liquidity pool every quarter.',        icon: 'Wallet' },
  { rank: 'Legend',      perk: 'Architect Governance',   desc: 'Influence the protocol roadmap and vote on vetting logic updates.',             icon: 'Cpu'    },
]);

const CATEGORIES = ['Global Elite', 'AI Architects', 'Frontend', 'Backend & Cloud'];

// ── Types ─────────────────────────────────────────────────────────────────────
interface LeaderUser  { rank: number; category: string; name: string; role: string; score: string; sprint: number; country: string; avatar: string; tier: string }
interface AuditVector { label: string; val: number; icon: string }
interface GrowthPerk  { rank: string; perk: string; desc: string; icon: string }

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState('Global Elite');
  const [isModalOpen, setIsModalOpen]       = useState(false);
  const [isSubmitting, setIsSubmitting]     = useState(false);
  const [formData, setFormData]             = useState({ name: '', email: '', role: '' });

  const { get } = usePageContent('freelancex-leaderboard');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom    = get('hero', 'accent_from',    '#3b82f6');
  const accentMid     = get('hero', 'accent_mid',     '#6366f1');
  const accentTo      = get('hero', 'accent_to',      '#a855f7');
  const heroBadge     = get('hero', 'badge_text',     'Biological Hall of Fame');
  const heroPl        = get('hero', 'headline_plain', 'The Protocol');
  const heroAcc       = get('hero', 'headline_accent','Elite.');
  const heroBody      = get('hero', 'body_text',      'Real-time rankings of the top 1% technical minds. Verified by autonomous AI logic and sprint execution metrics.');

  const lbItems       = safeParse<LeaderUser[]>(get('podium', 'items_json', DEFAULT_LEADERBOARD), []);
  const scoreUnit     = get('podium', 'score_unit', 'IQ');

  const auditPl       = get('audit', 'headline_plain',  'Verifiable');
  const auditAcc      = get('audit', 'headline_accent', 'Assessment Logic.');
  const auditBody     = get('audit', 'body_text',       'Our autonomous neural engine evaluates every line of code across 4 core intelligence vectors to determine global ranking.');
  const auditVectors  = safeParse<AuditVector[]>(get('audit', 'vectors_json', DEFAULT_AUDIT_VECTORS), []);
  const termLine1     = get('audit', 'terminal_line_1', '> Analyzing Git Commit Hash: 0x9f2a...');
  const termLine2     = get('audit', 'terminal_line_2', '> Validating Cognitive Weight: [SUCCESS]');
  const termLine3     = get('audit', 'terminal_line_3', '> Cross-Referencing 31k Talent Nodes...');
  const termResult    = get('audit', 'terminal_result', '> SUBJECT RANK: LEGEND_LEVEL_S1');

  const growthPl      = get('growth_roadmap', 'headline_plain',  'The Growth');
  const growthAcc     = get('growth_roadmap', 'headline_accent', 'Roadmap.');
  const growthSubhead = get('growth_roadmap', 'subheading',      'Elevate your node grade to unlock exclusive ecosystem perks.');
  const growthPerks   = safeParse<GrowthPerk[]>(get('growth_roadmap', 'items_json', DEFAULT_GROWTH_PERKS), []);

  const tableLabel    = get('list_view', 'table_label',      'Global Network Ranking');
  const effLabel      = get('list_view', 'efficiency_label', 'Logic Efficiency');

  const ctaHeadline   = get('cta', 'headline',             'Initialize Your Technical Audit.');
  const ctaBody       = get('cta', 'body_text',            'Stop bidding. Start proving. Deploy your neural hash on the global ledger and let the work find you.');
  const ctaBtnPrimary = get('cta', 'btn_primary_label',    'Start Assessment');
  const ctaBtnSecond  = get('cta', 'btn_secondary_label',  'View Methodology');

  const modalHeadline = get('modal', 'headline',          'Initialize Protocol');
  const modalBtnLabel = get('modal', 'btn_label',         'Request Node Access');
  const modalWaNumber = get('modal', 'whatsapp_number',   '918700236923');
  const modalWaMsg    = get('modal', 'whatsapp_message',  '*🚀 New Assessment Request*');

  // ── Derived ───────────────────────────────────────────────────────────────
  const filteredData  = activeCategory === 'Global Elite' ? lbItems : lbItems.filter(u => u.category === activeCategory);
  const topThree      = filteredData.slice(0, 3);
  const listItems     = filteredData.slice(3);

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const msg = `${modalWaMsg}%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Role:* ${formData.role}`;
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36 pb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] rounded-full pointer-events-none -z-0"
          style={{ background: `${accentFrom}0d`, filter: 'blur(150px)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-32">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <section className="text-center space-y-6 max-w-4xl mx-auto pt-10 px-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{heroBadge}</span>
            </motion.div>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
              {heroPl}<br />
              <span className="font-extrabold" style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid}, ${accentTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">{heroBody}</p>
          </section>

          {/* ── PODIUM ───────────────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-6xl mx-auto px-4 pt-12">
            {topThree.length >= 3 && (
              <>
                {/* 2nd Place */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  className="order-2 lg:order-1 bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] text-center relative group h-fit">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-slate-400 z-30 shadow-xl">2</div>
                  <img src={topThree[1].avatar} className="w-24 h-24 rounded-full mx-auto border-4 border-slate-500/20 mb-6 object-cover" alt="rank2" />
                  <h3 className="text-xl font-bold mb-1">{topThree[1].name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{topThree[1].role}</p>
                  <div className="px-6 py-2 bg-white/5 rounded-full text-xs font-black tracking-widest border border-white/5">
                    {topThree[1].score} {scoreUnit}
                  </div>
                </motion.div>

                {/* 1st Place */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                  className="order-1 lg:order-2 border p-10 rounded-[3rem] text-center relative group scale-110 mb-8 lg:mb-0"
                  style={{
                    background: `linear-gradient(to bottom, ${accentMid}1a, ${accentFrom}14)`,
                    borderColor: `${accentFrom}50`,
                    boxShadow: `0 0 60px ${accentFrom}26`,
                  }}>
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-lg z-50"
                    style={{ background: 'linear-gradient(to bottom, #facc15, #d97706)', boxShadow: '0 0 30px rgba(234,179,8,0.4)' }}>
                    <Trophy className="text-black" size={32} />
                  </div>
                  <img src={topThree[0].avatar} className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500/50 mb-6 object-cover relative z-10" alt="rank1" />
                  <h2 className="text-2xl font-black mb-1">{topThree[0].name}</h2>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] mb-8" style={{ color: accentFrom }}>{topThree[0].role}</p>
                  <div className="px-8 py-3 bg-yellow-500 text-black rounded-full text-sm font-black tracking-widest shadow-xl">
                    {topThree[0].score} {scoreUnit}
                  </div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  className="order-3 bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] text-center relative group h-fit">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-orange-400/80 z-30 shadow-xl">3</div>
                  <img src={topThree[2].avatar} className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500/20 mb-6 object-cover" alt="rank3" />
                  <h3 className="text-xl font-bold mb-1">{topThree[2].name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{topThree[2].role}</p>
                  <div className="px-6 py-2 bg-white/5 rounded-full text-xs font-black tracking-widest border border-white/5">
                    {topThree[2].score} {scoreUnit}
                  </div>
                </motion.div>
              </>
            )}
          </div>

          {/* ── AUDIT INTELLIGENCE ───────────────────────────────────────── */}
          <section className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full -z-10 pointer-events-none"
              style={{ background: `${accentFrom}0d`, filter: 'blur(120px)' }} />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase">
                  {auditPl}<br />
                  <span className="italic" style={{ color: accentMid }}>{auditAcc}</span>
                </h2>
                <p className="text-slate-400 text-base md:text-lg">{auditBody}</p>
                <div className="grid grid-cols-2 gap-4">
                  {auditVectors.map((v, i) => {
                    const Icon = AUDIT_ICON_MAP[v.icon] ?? Activity;
                    return (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <Icon className="mb-3" size={18} style={{ color: accentFrom }} />
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{v.label}</p>
                        <span className="text-lg font-black text-white">{v.val}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative p-6 bg-black rounded-3xl border border-white/10 font-mono text-[11px] text-slate-500 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="w-2.5 h-2.5 bg-red-500/50 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-500/50 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-500/50 rounded-full" />
                </div>
                <p style={{ color: accentMid }}>// INITIALIZING_NEURAL_AUDIT_v4.2</p>
                <p>{termLine1}</p>
                <p>{termLine2}</p>
                <p>{termLine3}</p>
                <p className="animate-pulse mt-4 text-emerald-400">{termResult}</p>
              </div>
            </div>
          </section>

          {/* ── GROWTH ROADMAP ───────────────────────────────────────────── */}
          <section className="space-y-12 px-4">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                {growthPl} <span className="italic" style={{ color: accentFrom }}>{growthAcc}</span>
              </h2>
              <p className="text-slate-500 font-medium">{growthSubhead}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {growthPerks.map((perk, i) => {
                const Icon = PERK_ICON_MAP[perk.icon] ?? Cpu;
                return (
                  <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentMid}50`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"
                      style={{ background: `${accentMid}1a` }}>
                      <Icon className="text-indigo-400" size={24} />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">{perk.perk}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{perk.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── LIST VIEW ────────────────────────────────────────────────── */}
          <section className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-10 backdrop-blur-xl max-w-6xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-8 px-2">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'text-white' : 'text-slate-500 bg-white/5 hover:text-white'}`}
                  style={activeCategory === cat ? { background: accentFrom } : {}}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between px-6 mb-8 border-b border-white/5 pb-6">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{tableLabel}</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{effLabel}</span>
            </div>
            <div className="space-y-4">
              {listItems.map((user, i) => (
                <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-white/[0.02] border border-white/5 rounded-3xl transition-all group"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="flex items-center gap-6">
                    <span className="text-sm md:text-lg font-black text-slate-600 w-6">{user.rank}</span>
                    <img src={user.avatar} className="w-10 h-10 md:w-14 md:h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-all" alt={user.name} />
                    <div>
                      <h4 className="text-sm md:text-lg font-bold text-white flex items-center gap-2 transition-colors"
                        onMouseEnter={e => (e.currentTarget.style.color = accentFrom)}
                        onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>
                        {user.name} <CheckCircle2 size={14} className="text-emerald-500 hidden md:block" />
                      </h4>
                      <p className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-500 mt-1">{user.role}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">
                      {user.sprint} Sprints
                    </div>
                    <div className="text-lg md:text-2xl font-black text-white">{user.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FINAL CTA ────────────────────────────────────────────────── */}
          <section className="px-4 pb-20">
            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden p-[1px] shadow-3xl"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid}, ${accentTo})` }}>
              <div className="relative bg-[#020617] rounded-[2.95rem] md:rounded-[3.95rem] p-10 md:p-24 text-center space-y-8 overflow-hidden">
                <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: `${accentFrom}0d`, filter: 'blur(120px)' }} />
                <h2 className="text-3xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase">{ctaHeadline}</h2>
                <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto px-4">{ctaBody}</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
                  <button onClick={() => setIsModalOpen(true)}
                    className="w-full sm:w-auto px-10 md:px-16 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-xs shadow-2xl active:scale-95">
                    {ctaBtnPrimary}
                  </button>
                  <button className="w-full sm:w-auto px-10 md:px-16 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-xs">
                    {ctaBtnSecond}
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-lg w-full shadow-3xl overflow-hidden z-10">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all">
                <X size={24} />
              </button>
              <h3 className="text-2xl font-black mb-10 tracking-tight uppercase tracking-widest text-white">{modalHeadline}</h3>
              <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                <input required type="text" placeholder="Identity Label (Full Name)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input required type="email" placeholder="Professional Email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="text" placeholder="Specialization (e.g. AI Core, Backend)"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] active:scale-95"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtnLabel} <ArrowRight size={18} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}