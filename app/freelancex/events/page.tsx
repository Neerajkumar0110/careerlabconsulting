// app/freelancex/events/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Zap, Globe, ArrowRight,
  Users, X, Loader2,
  ShieldCheck, ChevronRight,
  Mail, PlayCircle, Radio,
  MessageSquare,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const EVENT_ICON_MAP: Record<string, React.ElementType> = { Zap, Globe, Radio };
const TICKER_ICON_MAP: Record<string, React.ElementType> = { Zap, Users, ShieldCheck };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_UPCOMING = JSON.stringify([
  { id: 1, title: 'Next.js 16 & Distributed Nodes', category: 'Masterclass',  date: 'March 15, 2026', attendees: '1.2k', image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000&auto=format&fit=crop', icon: 'Zap',   status: 'Trending' },
  { id: 2, title: 'AI Engineering Summit 2026',     category: 'Workshops',    date: 'March 22, 2026', attendees: '5k+',  image: 'https://img.freepik.com/free-photo/futuristic-scene-with-high-tech-robot-used-construction-industry_23-2151329506.jpg?w=1480', icon: 'Globe', status: 'Limited'  },
  { id: 3, title: 'The Gig Economy Manifesto',      category: 'Live Sprints', date: 'April 05, 2026', attendees: '800',  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop', icon: 'Radio', status: 'Open'     },
]);
const DEFAULT_VAULT = JSON.stringify([
  { id: 'dQw4w9WgXcQ', title: 'Autonomous DB Design', views: '12k', duration: '45:10',  img: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'L_o_O7v1h3A', title: 'RAG Pipeline Scaling', views: '8k',  duration: '52:00',  img: 'https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 'fLeJJPxua3E', title: 'Escrow Logic v4',       views: '15k', duration: '38:22',  img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: '6v2L2UGZJAM', title: 'Neural Vetting Intro',  views: '20k', duration: '1:05:12',img: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400' },
]);
const DEFAULT_TICKER = JSON.stringify([
  { label: 'Vetting Session Live', icon: 'Zap',         color: 'text-blue-500'    },
  { label: '1240+ Active Viewers', icon: 'Users',       color: 'text-emerald-500' },
  { label: 'Protocol Secure',      icon: 'ShieldCheck', color: 'text-indigo-500'  },
]);
const DEFAULT_NET_STATS = JSON.stringify([
  { value: '1:1',    label: 'Architect Sprints' },
  { value: 'Global', label: 'Node Connect'      },
]);
const CATEGORIES = ['All Events', 'Masterclass', 'Live Sprints', 'Workshops'];

// ── Types ─────────────────────────────────────────────────────────────────────
interface UpcomingEvent { id: number; title: string; category: string; date: string; attendees: string; image: string; icon: string; status: string }
interface VaultItem     { id: string; title: string; views: string; duration: string; img: string }
interface TickerItem    { label: string; icon: string; color: string }
interface NetStat       { value: string; label: string }

export default function EventsPage() {
  const [activeTab, setActiveTab]       = useState('All Events');
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [activeVideo, setActiveVideo]   = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [formData, setFormData]         = useState({ name: '', email: '' });

  const { get } = usePageContent('freelancex-events');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',     '#3b82f6');
  const accentTo         = get('hero', 'accent_to',       '#6366f1');
  const badgeText        = get('hero', 'badge_text',      'Live Infrastructure Hub');
  const heroPl           = get('hero', 'headline_plain',  'Technical');
  const heroAcc          = get('hero', 'headline_accent', 'Mastery.');
  const heroBody         = get('hero', 'body_text',       'Connect your node to the source. Exclusive workshops and masterclasses for the global elite engineering network.');
  const heroBtnLabel     = get('hero', 'btn_label',       'Initialize RSVP');
  const heroSyncedCount  = get('hero', 'synced_count',    '+1.4k Synced');
  const heroImageUrl     = get('hero', 'hero_image_url',  'https://img.freepik.com/free-photo/online-data_1098-16295.jpg?w=1480');
  const waNumber         = get('hero', 'whatsapp_number', '918700236923');
  const tickerItems      = safeParse<TickerItem[]>(get('hero', 'ticker_json', DEFAULT_TICKER), []);

  const upcomingPl       = get('upcoming', 'headline_plain',  'Upcoming');
  const upcomingAcc      = get('upcoming', 'headline_accent', 'Syncs.');
  const upcomingSubhead  = get('upcoming', 'subheading',      'Reserve your slot in the high-fidelity technical stream.');
  const upcomingItems    = safeParse<UpcomingEvent[]>(get('upcoming', 'items_json', DEFAULT_UPCOMING), []);

  const vaultPl          = get('vault', 'headline_plain',   'On-Demand');
  const vaultAcc         = get('vault', 'headline_accent',  'Vault.');
  const vaultSubhead     = get('vault', 'subheading',       'Access encrypted recordings of our highest-tier sessions.');
  const vaultUnlockBtn   = get('vault', 'unlock_btn_label', 'Unlock All Sessions');
  const vaultItems       = safeParse<VaultItem[]>(get('vault', 'items_json', DEFAULT_VAULT), []);

  const netPl            = get('networking', 'headline_plain',    'Private Peer');
  const netAcc           = get('networking', 'headline_accent',   'Networking.');
  const netBody          = get('networking', 'body_text',         'Protocol events are followed by private "Node Breakouts" where senior architects and leads discuss deployment strategies in a secure environment.');
  const netStats         = safeParse<NetStat[]>(get('networking', 'stats_json', DEFAULT_NET_STATS), []);
  const netConnectBtn    = get('networking', 'connect_btn_label', 'Initialize Connection');

  const ctaHeadline      = get('cta', 'headline',            'Sync With The Elite Global Pipeline.');
  const ctaBody          = get('cta', 'body_text',           'Join the next protocol session and elevate your technical grade. Secure your node in the ecosystem.');
  const ctaBtnPrimary    = get('cta', 'btn_primary_label',   'Join Protocol Now');
  const ctaBtnSecond     = get('cta', 'btn_secondary_label', 'View Session Catalog');
  const ctaVerified      = get('cta', 'verified_label',      'Verified Protocol Event Network');

  const modalBadge       = get('rsvp_modal', 'badge_label',      'Protocol Entry RSVP');
  const modalBtnLabel    = get('rsvp_modal', 'btn_label',        'Initialize Sync Protocol');
  const modalFooterNote  = get('rsvp_modal', 'footer_note',      'Secure node authentication powered by Manee Pro 2.5');
  const modalWaNumber    = get('rsvp_modal', 'whatsapp_number',  '918700236923');

  // ── Actions ───────────────────────────────────────────────────────────────
  const handleRegisterClick = (event: any) => { setSelectedEvent(event); setIsModalOpen(true); };

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const msg = `*🚀 Event RSVP*%0A*Event:* ${selectedEvent?.title}%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}`;
    setTimeout(() => {
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  const filteredEvents = activeTab === 'All Events'
    ? upcomingItems
    : upcomingItems.filter(e => e.category === activeTab);

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-24 relative">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="relative rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-slate-900/40 backdrop-blur-sm group">
            <div className="absolute inset-0 z-10" style={{
              background: `linear-gradient(to right, #020617, rgba(2,6,23,0.8), transparent)`,
            }} />
            <img src={heroImageUrl}
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-[5s]"
              alt="Conference Hall" />
            <div className="relative z-20 p-8 md:p-24 max-w-4xl space-y-8">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                <Radio size={14} className="animate-pulse" style={{ color: accentFrom }} />
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
              </motion.div>
              <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                {heroPl}<br className="hidden md:block" />
                <span className="font-extrabold" style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>{heroAcc}</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed">{heroBody}</p>
              <div className="flex flex-col sm:flex-row items-center gap-6 pt-6">
                <button onClick={() => handleRegisterClick({ title: 'Global Tech Mastery' })}
                  className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentFrom; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}>
                  {heroBtnLabel} <ArrowRight size={20} />
                </button>
                <div className="flex items-center gap-3 text-slate-400">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i + 20}`} className="w-10 h-10 rounded-full border-4 border-[#020617]" alt="node" />)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest">{heroSyncedCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── TICKER ───────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 mb-20 md:mb-32 overflow-hidden">
          <div className="flex items-center gap-8 py-6 border-y border-white/5 whitespace-nowrap">
            {[1, 2, 3].map((_, rep) => (
              <div key={rep} className="flex items-center gap-12 animate-marquee">
                {tickerItems.map((item, i) => {
                  const Icon = TICKER_ICON_MAP[item.icon] ?? Zap;
                  return (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                      <Icon size={14} className={item.color} /> {item.label}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* ── UPCOMING EVENTS ──────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32 space-y-12">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase leading-tight">
                {upcomingPl} <span className="italic" style={{ color: accentTo }}>{upcomingAcc}</span>
              </h2>
              <p className="text-slate-500 font-medium">{upcomingSubhead}</p>
            </div>
            <div className="flex p-1 bg-white/5 border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveTab(cat)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === cat ? 'text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  style={activeTab === cat ? { background: accentFrom, boxShadow: `0 10px 20px ${accentFrom}40` } : {}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map(event => {
              const Icon = EVENT_ICON_MAP[event.icon] ?? Zap;
              return (
                <motion.div key={event.id} whileHover={{ y: -10 }}
                  className="group bg-[#0a0f1d]/60 border border-white/5 rounded-[2.5rem] overflow-hidden backdrop-blur-xl transition-all shadow-xl cursor-pointer"
                  onClick={() => handleRegisterClick(event)}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={event.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={event.title} />
                    <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 flex items-center gap-2">
                      <Icon size={12} style={{ color: accentFrom }} />
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-200">{event.category}</span>
                    </div>
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg text-emerald-400 text-[9px] font-black uppercase tracking-widest"
                      style={{ background: '#10b9811a', border: '1px solid #10b98133' }}>
                      {event.status}
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <h3 className="text-xl font-bold leading-tight h-14 line-clamp-2 transition-colors"
                      style={{ color: '#fff' }}
                      onMouseEnter={e => (e.currentTarget.style.color = accentFrom)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#fff')}>
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-between py-4 border-y border-white/5">
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={14} style={{ color: accentTo }} /> {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                        <Users size={14} style={{ color: accentFrom }} /> {event.attendees}
                      </div>
                    </div>
                    <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-[9px] transition-all flex items-center justify-center gap-2 group-hover:bg-white group-hover:text-black">
                      Secure Access <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ── VAULT ────────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
              style={{ background: `${accentFrom}0d`, filter: 'blur(100px)' }} />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
                  {vaultPl} <span className="italic" style={{ color: accentFrom }}>{vaultAcc}</span>
                </h2>
                <p className="text-slate-500 font-medium text-sm md:text-base mt-2">{vaultSubhead}</p>
              </div>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {vaultUnlockBtn}
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {vaultItems.map((v, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}
                  onClick={() => setActiveVideo(v.id)}
                  className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-pointer group border border-white/5 shadow-2xl">
                  <img src={v.img} className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110" alt="vault thumbnail" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-all">
                    <PlayCircle size={48} className="text-white fill-white/20" />
                  </div>
                  <div className="absolute bottom-5 left-5 z-20">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: accentFrom }}>{v.views} Viewed</p>
                    <h4 className="text-sm font-bold text-white leading-tight">{v.title}</h4>
                  </div>
                  <div className="absolute top-4 right-4 z-20 px-2 py-1 rounded bg-black/60 text-[9px] font-mono text-white/70">{v.duration}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NETWORKING ───────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 md:mb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: `${accentTo}1a`, border: `1px solid ${accentTo}33` }}>
                <MessageSquare size={32} style={{ color: accentTo }} />
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight uppercase">
                {netPl}<br />
                <span className="italic font-black" style={{ color: accentTo }}>{netAcc}</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium">{netBody}</p>
              <div className="grid grid-cols-2 gap-4">
                {netStats.map((stat, i) => (
                  <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-md">
                    <p className="text-2xl font-black text-white mb-1">{stat.value}</p>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }} />
              <div className="relative bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-3xl">
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3 uppercase tracking-tighter">
                  <Users style={{ color: accentFrom }} /> Active Connections
                </h3>
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all cursor-default">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center font-black text-xs text-slate-500">Node</div>
                        <span className="text-sm font-bold text-slate-300 tracking-tight">Lead_Node_00{i + 10}</span>
                      </div>
                      <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Ready
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 py-5 text-white font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-xl hover:opacity-90 transition-all active:scale-95"
                  style={{ background: accentFrom }}>
                  {netConnectBtn}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden p-12 md:p-24 text-center"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}, ${accentTo})` }}>
            <div className="relative z-10 max-w-3xl mx-auto space-y-10">
              <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight uppercase">{ctaHeadline}</h2>
              <p className="text-lg md:text-xl font-medium" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <button onClick={() => handleRegisterClick({ title: 'Full Ecosystem Access' })}
                  className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-xs tracking-[0.2em] active:scale-95">
                  {ctaBtnPrimary}
                </button>
                <button className="w-full sm:w-auto px-12 py-5 bg-transparent border-2 border-white/20 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-xs tracking-[0.2em]">
                  {ctaBtnSecond}
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center py-20 text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-slate-600">
          <ShieldCheck size={14} className="text-emerald-500" />
          <span>{ctaVerified}</span>
        </div>
      </main>

      <Footer />

      {/* ── VIDEO MODAL ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeVideo && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-20">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
              className="absolute inset-0 bg-black/98 backdrop-blur-3xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10">
              <button onClick={() => setActiveVideo(null)} className="absolute top-6 right-6 z-50 p-4 bg-white/5 hover:bg-red-500 rounded-full transition-all">
                <X size={24} />
              </button>
              <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${activeVideo}`}
                title="Event Recording" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── RSVP MODAL ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] max-w-lg w-full shadow-3xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
              <div className="mb-10 text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: accentFrom }}>{modalBadge}</p>
                <h3 className="text-2xl font-black tracking-tight leading-tight uppercase text-white">{selectedEvent?.title}</h3>
              </div>
              <form onSubmit={handleRegistration} className="space-y-4">
                <div className="relative group">
                  <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                  <input required type="text" placeholder="Identity Label (Full Name)"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-400" size={16} />
                  <input required type="email" placeholder="Communication Email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 pl-12 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-5 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] sm:text-xs active:scale-95"
                  style={{ background: accentFrom }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : <>{modalBtnLabel} <ChevronRight size={18} /></>}
                </button>
                <p className="text-[8px] font-black text-center text-slate-600 uppercase tracking-widest mt-6 leading-relaxed border-t border-white/5 pt-4">
                  {modalFooterNote}
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        .animate-marquee { animation: marquee 50s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}