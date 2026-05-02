// app/freelancex/referral-program/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, Share2, Copy, Users, DollarSign,
  TrendingUp, ShieldCheck, Zap, ArrowRight,
  CheckCircle2, Rocket, Award, CreditCard, ChevronRight, X, Loader2,
  Network, Workflow, BarChart3, Trophy,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const STAT_ICON_MAP: Record<string, React.ElementType> = {
  DollarSign, Users, TrendingUp, Award,
};
const FLOW_ICON_MAP: Record<string, React.ElementType> = {
  Network, Workflow, BarChart3,
};
const TIER_ICON_MAP: Record<string, React.ElementType> = {
  Zap, Award, Rocket,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_QUICK_STATS = JSON.stringify([
  { label: 'Pending Payout', val: '₹18,450', icon: 'DollarSign', color: 'text-emerald-400' },
  { label: 'Active Nodes',   val: '42',       icon: 'Users',      color: 'text-blue-400'    },
  { label: 'Growth Index',   val: '+14%',     icon: 'TrendingUp', color: 'text-indigo-400'  },
  { label: 'Current Tier',   val: 'Pro',      icon: 'Award',      color: 'text-amber-400'   },
]);
const DEFAULT_FLOW_STEPS = JSON.stringify([
  { title: 'Node Linkage',       desc: 'Share your code. When a freelancer joins and passes AI vetting, they are linked to your identity.',   icon: 'Network'   },
  { title: 'Sprint Execution',   desc: 'The talent begins working on enterprise projects. Every billable hour is logged on the ledger.',      icon: 'Workflow'  },
  { title: 'Instant Settlement', desc: 'A percentage of the project fee is automatically routed to your wallet. No questions asked.',        icon: 'BarChart3' },
]);
const DEFAULT_TIERS = JSON.stringify([
  { level: 'Starter', commission: '2%', activeReq: '0-5 Users',  icon: 'Zap',    color: 'text-blue-400',   bg: 'bg-blue-500/10'   },
  { level: 'Pro',     commission: '5%', activeReq: '6-20 Users', icon: 'Award',  color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  { level: 'Elite',   commission: '8%', activeReq: '21+ Users',  icon: 'Rocket', color: 'text-purple-400', bg: 'bg-purple-500/10' },
]);
const DEFAULT_AMBASSADORS = JSON.stringify([
  { name: 'Rahul S.',   earned: '₹1,42,000', nodes: 84, rank: 1, avatar: 'RS' },
  { name: 'Jessica W.', earned: '₹98,500',   nodes: 56, rank: 2, avatar: 'JW' },
  { name: 'Arjun K.',   earned: '₹76,200',   nodes: 39, rank: 3, avatar: 'AK' },
]);

// ── Types ─────────────────────────────────────────────────────────────────────
interface QuickStat  { label: string; val: string; icon: string; color: string }
interface FlowStep   { title: string; desc: string; icon: string }
interface TierItem   { level: string; commission: string; activeReq: string; icon: string; color: string; bg: string }
interface Ambassador { name: string; earned: string; nodes: number; rank: number; avatar: string }

export default function ReferralProgramPage() {
  const [copied, setCopied]           = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]       = useState({ name: '', email: '', phone: '' });

  const { get } = usePageContent('freelancex-referral-program');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom      = get('hero', 'accent_from',        '#3b82f6');
  const accentTo        = get('hero', 'accent_to',          '#6366f1');
  const badgeText       = get('hero', 'badge_text',         'Ecosystem Growth Protocol');
  const headlinePlain   = get('hero', 'headline_main',      'Earn While You');
  const headlineAccent  = get('hero', 'headline_accent',    'Onboard.');
  const heroBody        = get('hero', 'body_text',          'Bypass traditional recruitment fees. Unlock lifetime passive rewards by connecting top-tier talent to the global CLC network.');
  const btnPrimaryLabel = get('hero', 'btn_primary_label',  'Initialize Referral');
  const referralCode    = get('hero', 'referral_code',      'FREELANCEX-A91-NODE');
  const quickStats      = safeParse<QuickStat[]>(get('hero', 'quick_stats_json', DEFAULT_QUICK_STATS), []);

  const flowHeadPlain   = get('reward_flow', 'headline_plain',   'The Passive');
  const flowHeadAccent  = get('reward_flow', 'headline_accent',  'Reward Architecture.');
  const flowSubhead     = get('reward_flow', 'subheading',       'How the autonomous referral protocol distributes value back to you.');
  const flowSteps       = safeParse<FlowStep[]>(get('reward_flow', 'steps_json', DEFAULT_FLOW_STEPS), []);

  const tiersHeadPlain  = get('tiers', 'headline_plain',  'Earning');
  const tiersHeadAccent = get('tiers', 'headline_accent', 'Tiers.');
  const tierItems       = safeParse<TierItem[]>(get('tiers', 'items_json', DEFAULT_TIERS), []);

  const lbHeadPlain     = get('leaderboard', 'headline_plain',   'Top');
  const lbHeadAccent    = get('leaderboard', 'headline_accent',  'Ambassadors.');
  const lbBody          = get('leaderboard', 'body_text',        'Join the ranks of our most successful growth partners. High-volume referrers unlock quarterly bonus pools and invite-only masterclasses.');
  const lbCtaLabel      = get('leaderboard', 'cta_label',        'Explore Ecosystem Perks');
  const ambassadors     = safeParse<Ambassador[]>(get('leaderboard', 'ambassadors_json', DEFAULT_AMBASSADORS), []);

  const wdHeadPlain     = get('withdrawal_cta', 'headline_plain',   'Ready for');
  const wdHeadAccent    = get('withdrawal_cta', 'headline_accent',  'Settlement?');
  const wdBody          = get('withdrawal_cta', 'body_text',        'Your earnings are ready for direct bank transfer. Protocol settlement time: 2-4 hours.');
  const wdCredit        = get('withdrawal_cta', 'available_credit', '₹18,450');
  const wdBtnLabel      = get('withdrawal_cta', 'btn_label',        'Withdraw Earnings');

  const modalHeadline   = get('modal', 'headline',       'Become an Ambassador');
  const modalBody       = get('modal', 'body_text',      'Initialize your partnership node. Connect elite talent and start generating passive revenue.');
  const modalBtnLabel   = get('modal', 'btn_label',      'Register Ambassador');
  const modalWaNumber   = get('modal', 'whatsapp_number','918700236923');
  const modalWaMsg      = get('modal', 'whatsapp_message','*New Referral lead*');

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `${modalWaMsg}%0A*Name:* ${formData.name}%0A*Code:* ${referralCode}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36 pb-16 relative">
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-full md:w-[700px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `${accentFrom}1a`, filter: 'blur(150px)' }} />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 space-y-24 md:space-y-32">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
            <div className="space-y-8 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                <Gift size={14} style={{ color: accentFrom }} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{badgeText}</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
                {headlinePlain}{' '}
                <span className="font-extrabold" style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{headlineAccent}</span>
              </h1>

              <p className="text-slate-400 text-base md:text-[16px] max-w-lg mx-auto lg:mx-0 font-medium leading-relaxed">{heroBody}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-8 py-5 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-95"
                  style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
                  {btnPrimaryLabel}
                </button>
                <div className="flex items-center gap-3 px-6 py-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md">
                  <code className="text-sm font-bold" style={{ color: accentFrom }}>{referralCode}</code>
                  <button onClick={handleCopy} className="text-slate-500 hover:text-white transition-colors">
                    {copied ? <CheckCircle2 size={20} className="text-emerald-500" /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              {quickStats.map((stat, i) => {
                const Icon = STAT_ICON_MAP[stat.icon] ?? DollarSign;
                return (
                  <motion.div key={i} whileHover={{ y: -5 }}
                    className="bg-slate-900/40 border border-white/5 p-6 md:p-8 rounded-[2.5rem] backdrop-blur-xl">
                    <Icon className={stat.color} size={24} style={{ marginBottom: 16 }} />
                    <div className="text-2xl md:text-3xl font-black text-white">{stat.val}</div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── REWARD FLOW ──────────────────────────────────────────────── */}
          <section className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
                {flowHeadPlain}<br />
                <span className="italic" style={{ color: accentFrom }}>{flowHeadAccent}</span>
              </h2>
              <p className="text-slate-500 font-medium">{flowSubhead}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -z-10" />
              {flowSteps.map((step, i) => {
                const Icon = FLOW_ICON_MAP[step.icon] ?? Network;
                return (
                  <div key={i} className="bg-[#0a0f1d] border border-white/10 p-8 rounded-[2.5rem] relative group hover:border-white/20 transition-all"
                    style={{ ['--hover-border' as string]: `${accentFrom}50` }}>
                    <div className="w-12 h-12 rounded-full text-white flex items-center justify-center font-black mb-6 shadow-lg"
                      style={{ background: accentFrom }}>0{i + 1}</div>
                    <Icon size={32} style={{ color: accentFrom, marginBottom: 24 }} />
                    <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── TIERS ────────────────────────────────────────────────────── */}
          <div className="space-y-16">
            <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight">
              {tiersHeadPlain}{' '}
              <span style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{tiersHeadAccent}</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tierItems.map((tier, i) => {
                const Icon = TIER_ICON_MAP[tier.icon] ?? Zap;
                const isMid = i === 1;
                return (
                  <div key={i}
                    className={`p-8 md:p-10 rounded-[3rem] border transition-all duration-500 relative overflow-hidden ${isMid ? 'scale-105 z-10' : 'bg-white/[0.02] border-white/10'}`}
                    style={isMid ? {
                      background: `${accentTo}1a`,
                      borderColor: `${accentTo}80`,
                      boxShadow: `0 0 50px ${accentTo}1a`,
                    } : {}}>
                    <div className={`w-14 h-14 rounded-2xl ${tier.bg} flex items-center justify-center mb-8`}>
                      <Icon className={tier.color} size={28} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">{tier.level} Node</h3>
                    <div className="text-5xl font-black mb-8">
                      {tier.commission}
                      <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black block mt-1">Project Share</span>
                    </div>
                    <div className="pt-6 border-t border-white/5 space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tier.activeReq}</p>
                      <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: '60%' }}
                          className="h-full" style={{ background: accentTo }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── AMBASSADOR LEADERBOARD ───────────────────────────────────── */}
          <section className="grid lg:grid-cols-2 gap-12 items-center border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden"
            style={{ background: '#0a0f1d' }}>
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: '#10b98126', filter: 'blur(100px)' }} />
            <div className="space-y-6">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ background: '#10b9811a', border: '1px solid #10b98133' }}>
                <Trophy className="text-emerald-400" size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black leading-tight">
                {lbHeadPlain}<br />
                <span className="text-emerald-400 italic">{lbHeadAccent}</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">{lbBody}</p>
              <button className="text-emerald-400 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:text-emerald-300 transition-colors">
                {lbCtaLabel} <ArrowRight size={14} />
              </button>
            </div>

            <div className="space-y-4">
              {ambassadors.map((amb, i) => (
                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl flex items-center justify-between hover:bg-white/[0.04] transition-all cursor-default group">
                  <div className="flex items-center gap-6">
                    <div className="text-xl font-black text-slate-600 group-hover:text-emerald-500 transition-colors">0{amb.rank}</div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-black text-xs text-white shadow-xl">
                      {amb.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{amb.name}</h4>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{amb.nodes} Connected Nodes</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-white">{amb.earned}</div>
                    <div className="text-[8px] font-black text-emerald-400 uppercase tracking-tighter">Total Rewards</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── WITHDRAWAL CTA ───────────────────────────────────────────── */}
          <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden p-8 md:p-20 shadow-3xl"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}, ${accentTo})` }}>
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left space-y-6">
                <h2 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                  {wdHeadPlain}<br />
                  <span className="italic" style={{ color: `#ffffff`, textDecorationColor: `${accentFrom}80` }}>{wdHeadAccent}</span>
                </h2>
                <p className="font-medium text-lg max-w-md" style={{ color: 'rgba(219,234,254,0.8)' }}>{wdBody}</p>
              </div>
              <div className="bg-[#020617]/90 rounded-[2.5rem] p-8 md:p-12 space-y-8 backdrop-blur-xl border border-white/10 shadow-inner">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Available Credit</p>
                    <h4 className="text-4xl md:text-6xl font-black text-white mt-1">{wdCredit}</h4>
                  </div>
                  <div className="p-4 rounded-2xl" style={{ background: '#10b9811a', border: '1px solid #10b98133' }}>
                    <CreditCard className="text-emerald-400" size={40} />
                  </div>
                </div>
                <button className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95">
                  {wdBtnLabel} <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Trust footer */}
          <div className="flex items-center justify-center gap-4 py-10 border-t border-white/5 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            <ShieldCheck size={14} className="text-emerald-500" /> CLC HIRE-X VERIFIED GROWTH NETWORK
          </div>
        </div>
      </main>

      <Footer />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 50 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-lg w-full shadow-3xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors p-2 bg-white/5 rounded-full">
                <X size={20} />
              </button>
              <h3 className="text-3xl font-black mb-2 tracking-tight">{modalHeadline}</h3>
              <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">{modalBody}</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input required type="text" placeholder="Full Identity"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none transition-all text-sm placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                <input required type="email" placeholder="Corporate Email"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none transition-all text-sm placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                <input required type="tel" placeholder="WhatsApp Number"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none transition-all text-sm placeholder:text-slate-700 focus:border-blue-500"
                  value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all flex justify-center items-center gap-3 shadow-xl active:scale-95 disabled:opacity-50"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <><Zap size={18} /> {modalBtnLabel}</>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}