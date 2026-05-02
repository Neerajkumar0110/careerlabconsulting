// app/freelancex/community/page.tsx

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, Trophy, Gift, Calendar,
  ArrowUpRight, MessageSquare, Star,
  ShieldCheck, Zap, Globe, Share2, ChevronRight,
  MessageCircle, Heart, Repeat,
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const EVENT_ICON_MAP: Record<string, React.ElementType> = { Zap, Globe, Star };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_LEADERBOARD = JSON.stringify([
  { rank: 1, name: 'Sarah Jenkins', role: 'AI Strategist',   score: 9920, avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { rank: 2, name: 'Daniel Cruz',   role: 'Full Stack Lead', score: 9850, avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' },
  { rank: 3, name: 'Aarav Mehta',   role: 'UI Architect',    score: 9780, avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150' },
]);
const DEFAULT_DISCUSSIONS = JSON.stringify([
  { title: 'Optimizing RAG Pipelines for Scale', author: 'DevNode_01', likes: 142, comments: 28 },
  { title: 'Post-Quantum Cryptography in Web3',  author: 'Security_X', likes: 89,  comments: 12 },
  { title: 'Edge Computing vs Cloud Serverless', author: 'Cloud_Arch', likes: 215, comments: 45 },
]);
const DEFAULT_EVENTS = JSON.stringify([
  { title: 'Next.js 16 Deep Dive',  date: 'March 15, 2026', type: 'Virtual Workshop',  icon: 'Zap'  },
  { title: 'Global AI Networking',  date: 'March 22, 2026', type: 'Conference',         icon: 'Globe'},
  { title: 'Freelance Mastery',     date: 'April 05, 2026', type: 'Closed Masterclass', icon: 'Star' },
]);

// ── Types ─────────────────────────────────────────────────────────────────────
interface LeaderboardUser { rank: number; name: string; role: string; score: number; avatar: string }
interface Discussion      { title: string; author: string; likes: number; comments: number }
interface EventItem       { title: string; date: string; type: string; icon: string }

export default function CommunityPage() {
  const { get } = usePageContent('freelancex-community');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom    = get('hero', 'accent_from',    '#6366f1');
  const accentTo      = get('hero', 'accent_to',      '#22d3ee');
  const badgeText     = get('hero', 'badge_text',     'Global Talent Network');
  const heroPl        = get('hero', 'headline_plain', 'The Protocol');
  const heroAcc       = get('hero', 'headline_accent','Community.');
  const heroBody      = get('hero', 'body_text',      'Connect with the top 1% of technical minds. Participate in exclusive sprints, earn credentials, and scale your network.');

  const lbHeadline    = get('leaderboard', 'headline',         'Elite Leaderboard');
  const lbUpdateLabel = get('leaderboard', 'update_label',     'Update: Hourly');
  const lbViewBtn     = get('leaderboard', 'view_btn_label',   'View Full Ranking');
  const lbItems       = safeParse<LeaderboardUser[]>(get('leaderboard', 'items_json', DEFAULT_LEADERBOARD), []);

  const rcHeadPl      = get('referral_card', 'headline_plain',  'Refer & Earn');
  const rcHeadAcc     = get('referral_card', 'headline_accent', 'Exclusive Rewards.');
  const rcBody        = get('referral_card', 'body_text',       'Grow the ecosystem. Invite elite talent and receive up to 5% commission on their first 12 months of sprints.');
  const rcCode        = get('referral_card', 'referral_code',   'HIREX-00X2-PROTOCOL');
  const rcBtnLabel    = get('referral_card', 'btn_label',       'Initialize Referral');

  const discHeadPl    = get('discussions', 'headline_plain',  'Knowledge');
  const discHeadAcc   = get('discussions', 'headline_accent', 'Exchange.');
  const discSubhead   = get('discussions', 'subheading',      'Decentralized engineering discussions and problem-solving.');
  const discExplore   = get('discussions', 'explore_label',   'Explore Forum');
  const discItems     = safeParse<Discussion[]>(get('discussions', 'items_json', DEFAULT_DISCUSSIONS), []);

  const evtHeadPl     = get('events', 'headline_plain',  'Protocol');
  const evtHeadAcc    = get('events', 'headline_accent', 'Events.');
  const evtSubhead    = get('events', 'subheading',      'Reserved sessions for verified professionals.');
  const evtItems      = safeParse<EventItem[]>(get('events', 'items_json', DEFAULT_EVENTS), []);

  const ctaHeadline   = get('cta', 'headline',           'Ready to integrate with the elite?');
  const ctaBody       = get('cta', 'body_text',          'Join thousands of architects and engineers shaping the future of decentralized work.');
  const ctaBtnPrimary = get('cta', 'btn_primary_label',  'Initialize Profile');
  const ctaBtnSecond  = get('cta', 'btn_secondary_label','Download Manifesto');
  const ctaVerified   = get('cta', 'verified_label',     'Protocol X-Secure Verified Community');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-24 relative">
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] rounded-full pointer-events-none -z-0"
          style={{ background: `${accentFrom}1a`, filter: 'blur(150px)' }} />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 space-y-24">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6 md:space-y-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
              <Users size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9]">
              {heroPl}<br className="hidden sm:block" />
              <span className="font-extrabold" style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, white, ${accentTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{heroAcc}</span>
            </h1>
            <p className="text-slate-400 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">{heroBody}</p>
          </div>

          {/* ── LEADERBOARD + REFERRAL BENTO ─────────────────────────────── */}
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8">
            {/* Leaderboard */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-7 bg-[#0a0f1d]/60 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 backdrop-blur-2xl">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <h2 className="text-xl md:text-2xl font-black flex items-center gap-3 uppercase tracking-tight">
                  <Trophy className="text-yellow-500" /> {lbHeadline}
                </h2>
                <span className="hidden sm:block text-[10px] font-black uppercase text-slate-500 tracking-widest">{lbUpdateLabel}</span>
              </div>
              <div className="space-y-4">
                {lbItems.map((user, idx) => (
                  <div key={idx} className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 p-5 md:p-6 rounded-[2rem] transition-all flex items-center justify-between"
                    style={{ ['--hover-border-color' as string]: `${accentFrom}50` }}>
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className={`text-lg md:text-xl font-black ${idx === 0 ? 'text-yellow-500' : 'text-slate-500'}`}>0{user.rank}</span>
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl object-cover border border-white/10" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-white truncate" style={{ ['transition' as string]: 'color 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.color = accentFrom)}
                          onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>{user.name}</h4>
                        <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest truncate">{user.role}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base md:text-lg font-black text-white">{user.score.toLocaleString()}</div>
                      <div className="text-[8px] md:text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Verified Node</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                {lbViewBtn}
              </button>
            </motion.div>

            {/* Referral + support */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
              <div className="border rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 relative overflow-hidden flex-grow flex flex-col justify-center backdrop-blur-md"
                style={{ background: `linear-gradient(to bottom right, ${accentFrom}33, ${accentTo}33)`, borderColor: `${accentFrom}33` }}>
                <div className="absolute top-[-10%] right-[-10%] opacity-10 pointer-events-none"><Gift size={200} /></div>
                <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                  {rcHeadPl}<br />
                  <span style={{ color: accentFrom }}>{rcHeadAcc}</span>
                </h2>
                <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">{rcBody}</p>
                <div className="space-y-4">
                  <div className="bg-[#020617]/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                    <code className="text-[10px] md:text-xs truncate mr-4" style={{ color: accentFrom }}>{rcCode}</code>
                    <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all shrink-0"><Share2 size={16} /></button>
                  </div>
                  <button className="w-full py-4 md:py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl active:scale-[0.98]"
                    style={{ background: accentFrom }}>
                    {rcBtnLabel}
                  </button>
                </div>
              </div>
              <div className="rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex items-center justify-between group cursor-pointer transition-all"
                style={{ background: '#10b9810d', border: '1px solid #10b98114' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#10b9821a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#10b9810d')}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center" style={{ background: '#10b9821a' }}>
                    <MessageSquare className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm md:text-base">Community Support</h4>
                    <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">Instant Response Node</p>
                  </div>
                </div>
                <ChevronRight className="text-slate-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>

          {/* ── DISCUSSIONS ──────────────────────────────────────────────── */}
          <div className="space-y-12">
            <div className="text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  {discHeadPl} <span className="italic" style={{ color: accentTo }}>{discHeadAcc}</span>
                </h2>
                <p className="text-slate-500 font-medium">{discSubhead}</p>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-all flex items-center justify-center gap-2 mx-auto md:mx-0"
                style={{ color: accentFrom }}>
                {discExplore} <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {discItems.map((topic, i) => (
                <motion.div key={i} whileHover={{ y: -5 }}
                  className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col h-full relative group cursor-pointer transition-all"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentTo}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="flex items-center gap-2 mb-6">
                    <MessageCircle size={16} style={{ color: accentTo }} />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Thread</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-6 flex-grow leading-snug transition-colors"
                    onMouseEnter={e => (e.currentTarget.style.color = accentTo)}
                    onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>
                    {topic.title}
                  </h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Heart size={12} /> {topic.likes}</span>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400"><Repeat size={12} /> {topic.comments}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-600 font-mono">@{topic.author}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── EVENTS ───────────────────────────────────────────────────── */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 text-center md:text-left">
              <div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                  {evtHeadPl} <span style={{ color: accentFrom }}>{evtHeadAcc}</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-base">{evtSubhead}</p>
              </div>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2 mx-auto md:mx-0">
                Calendar View <Calendar size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {evtItems.map((event, i) => {
                const Icon = EVENT_ICON_MAP[event.icon] ?? Zap;
                return (
                  <motion.div key={i} whileHover={{ scale: 1.02 }}
                    className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 transition-all relative overflow-hidden group shadow-lg"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="absolute top-0 right-0 p-6 pointer-events-none" style={{ color: `${accentFrom}14` }}>
                      <Icon size={80} />
                    </div>
                    <div className="relative z-10 space-y-6">
                      <span className="inline-block px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border"
                        style={{ background: `${accentFrom}1a`, color: accentFrom, borderColor: `${accentFrom}33` }}>
                        {event.type}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold leading-tight">{event.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{event.date}</span>
                        <button className="hover:text-white transition-colors" style={{ color: accentFrom }}><ArrowUpRight size={18} /></button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── FINAL CTA ────────────────────────────────────────────────── */}
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden p-[1px]"
            style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, white, ${accentTo})` }}>
            <div className="relative bg-[#020617] rounded-[2.45rem] md:rounded-[2.95rem] p-8 md:p-24 text-center space-y-8 md:space-y-10 overflow-hidden">
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: `${accentFrom}0d`, filter: 'blur(120px)' }} />
              <h2 className="text-3xl md:text-6xl font-black text-white leading-tight">{ctaHeadline}</h2>
              <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto px-4 leading-relaxed">{ctaBody}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
                <Link href="/freelancex/signup"
                  className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-xs md:text-sm">
                  {ctaBtnPrimary}
                </Link>
                <button className="w-full sm:w-auto px-10 md:px-12 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-xs md:text-sm">
                  {ctaBtnSecond}
                </button>
              </div>
              <div className="flex items-center justify-center gap-3 pt-6">
                <ShieldCheck className="text-blue-500" size={16} />
                <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">{ctaVerified}</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}