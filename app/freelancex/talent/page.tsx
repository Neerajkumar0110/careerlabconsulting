// app/freelancex/talent-pool/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, MapPin, Zap, Star, ShieldCheck,
  CheckCircle2, ChevronRight, Briefcase,
  Users, X, Loader2, Mail, LayoutTemplate,
  Binary, Layers, Activity, Globe,
} from 'lucide-react';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const VETTING_ICON_MAP: Record<string, React.ElementType> = { Binary, ShieldCheck, Activity, Layers };

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface TalentProfile { id: string; name: string; role: string; location: string; score: number; status: string; rate: string; skills: string[]; avatar: string; sprintsCompleted: number; category: string }
interface VettingStat   { label: string; icon: string; val: string }
interface HubRegion     { region: string; nodes: number; progress: string }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PROFILES = JSON.stringify([
  { id: 'N-01', name: 'Alex Chen',      role: 'Senior AI & System Architect',    location: 'San Francisco, US', score: 99, status: 'Available Now',       rate: '$85/hr', skills: ['Python', 'TensorFlow', 'AWS', 'Rust'],              avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150', sprintsCompleted: 42, category: 'AI/ML'      },
  { id: 'N-02', name: 'Sarah Jenkins',  role: 'Full Stack Engineer (React/Node)', location: 'London, UK',        score: 98, status: 'In Sprint',            rate: '$65/hr', skills: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'], avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150', sprintsCompleted: 38, category: 'Full Stack' },
  { id: 'N-03', name: 'Kenji Sato',    role: 'Web3 & Blockchain Dev',            location: 'Tokyo, JP',         score: 97, status: 'Available Now',       rate: '$95/hr', skills: ['Solidity', 'Rust', 'Smart Contracts', 'React'],   avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150', sprintsCompleted: 31, category: 'Web3'       },
  { id: 'N-04', name: 'Priya Sharma',  role: 'Lead UI/UX Visionary',             location: 'Bengaluru, IN',     score: 96, status: 'Available in 2 Days', rate: '$55/hr', skills: ['Figma', 'Framer', 'Design Systems', 'Tailwind'],  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',   sprintsCompleted: 29, category: 'Design'     },
  { id: 'N-05', name: 'Marcus Doe',    role: 'Cloud Ops & DevOps Lead',           location: 'Berlin, DE',        score: 95, status: 'Available Now',       rate: '$80/hr', skills: ['Docker', 'Kubernetes', 'AWS CI/CD', 'Go'],        avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150', sprintsCompleted: 45, category: 'DevOps'     },
  { id: 'N-06', name: 'Elena Rostova', role: 'Backend System Architect',          location: 'Remote, EU',        score: 94, status: 'In Sprint',            rate: '$70/hr', skills: ['Java', 'Microservices', 'Kafka', 'MongoDB'],      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150', sprintsCompleted: 22, category: 'Backend'    },
]);
const DEFAULT_CATEGORIES  = JSON.stringify(['All Talent', 'Full Stack', 'AI/ML', 'Web3', 'Design', 'DevOps', 'Backend']);
const DEFAULT_VETTING     = JSON.stringify([{ label: 'Logic Audit', icon: 'Binary', val: '99.8%' }, { label: 'Security Trace', icon: 'ShieldCheck', val: 'Hardened' }, { label: 'Sync Latency', icon: 'Activity', val: '1.2ms' }, { label: 'Identity Hash', icon: 'Layers', val: 'Verified' }]);
const DEFAULT_HUB_REGIONS = JSON.stringify([{ region: 'USA', nodes: 124, progress: '80%' }, { region: 'UK', nodes: 84, progress: '60%' }, { region: 'INDIA', nodes: 312, progress: '95%' }, { region: 'JAPAN', nodes: 45, progress: '40%' }]);

export default function TalentPage() {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeCategory, setActiveCategory] = useState('All Talent');
  const [isModalOpen, setIsModalOpen]   = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData]         = useState({ company: '', email: '', projectDetails: '' });

  const { get } = usePageContent('freelancex-talent-pool');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom        = get('hero', 'accent_from',         '#3b82f6');
  const accentTo          = get('hero', 'accent_to',           '#6366f1');
  const badgeText         = get('hero', 'badge_text',          'The 1% Network');
  const heroPl            = get('hero', 'headline_plain',      'Discover');
  const heroAcc           = get('hero', 'headline_accent',     'Elite Talent.');
  const heroBody          = get('hero', 'body_text',           'Access pre-vetted engineers, architects, and designers ready to integrate into your sprints within 48 hours.');
  const searchPlaceholder = get('hero', 'search_placeholder',  'Search by role, skill (e.g., React, Next.js, Rust)...');
  const categories        = safeParse<string[]>(get('hero', 'categories_json', DEFAULT_CATEGORIES), []);

  // ── Talent Grid ───────────────────────────────────────────────────────────
  const profiles          = safeParse<TalentProfile[]>(get('talent_grid', 'profiles_json', DEFAULT_PROFILES), []);
  const deployBtnLabel    = get('talent_grid', 'deploy_btn_label', 'Deploy Node');
  const emptyTitle        = get('talent_grid', 'empty_title',      'No nodes found');
  const emptyBody         = get('talent_grid', 'empty_body',       'Try adjusting your filters or search query.');
  const clearBtnLabel     = get('talent_grid', 'clear_btn_label',  'Clear Filters');

  // ── Vetting ───────────────────────────────────────────────────────────────
  const vettingPl         = get('vetting', 'headline_plain',  'Vetting');
  const vettingAcc        = get('vetting', 'headline_accent', 'Intelligence.');
  const vettingBody       = get('vetting', 'body_text',       "Our AI doesn't just scan resumes. It audits logic consistency, code security, and architectural depth through a rigorous neural sync process.");
  const vettingStats      = safeParse<VettingStat[]>(get('vetting', 'stats_json', DEFAULT_VETTING), []);

  // ── Global Hubs ───────────────────────────────────────────────────────────
  const hubsPl            = get('global_hubs', 'headline_plain',     'Global Presence');
  const hubsAcc           = get('global_hubs', 'headline_accent',    'Hubs.');
  const hubsBody          = get('global_hubs', 'body_text',          "Our talent isn't just remote; it's globally distributed across primary high-fidelity tech hubs for 24/7 project velocity.");
  const regions           = safeParse<HubRegion[]>(get('global_hubs', 'regions_json', DEFAULT_HUB_REGIONS), []);
  const securityTitle     = get('global_hubs', 'security_title',     'Enterprise Grade Protection');
  const securityBody      = get('global_hubs', 'security_body',      'All talent engagements are protected by E2E encrypted NDAs and milestone-based secure escrow.');
  const securityBtnLabel  = get('global_hubs', 'security_btn_label', 'View Security Specs');

  // ── Matchmaker CTA ────────────────────────────────────────────────────────
  const matchHeadline     = get('matchmaker_cta', 'headline',  "Can't find the exact match?");
  const matchBody         = get('matchmaker_cta', 'body_text', 'Let our AI matchmaker analyze your project requirements and automatically pair you with the perfect specialized node.');
  const matchBtnLabel     = get('matchmaker_cta', 'btn_label', 'Run AI Matchmaker');

  // ── Modal ─────────────────────────────────────────────────────────────────
  const modalBadge        = get('modal', 'badge_label',    'Deployment Protocol');
  const modalHeadline     = get('modal', 'headline',       'Initiate Contract');
  const modalBtnLabel     = get('modal', 'btn_label',      'Request Secure Contract');
  const modalFooterNote   = get('modal', 'footer_note',    '100% Escrow Protected • Instant WhatsApp Alert');
  const modalWaNumber     = get('modal', 'whatsapp_number','918700236923');

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredTalent = useMemo(() => profiles.filter(t => {
    const matchesCat    = activeCategory === 'All Talent' || t.category === activeCategory;
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  }), [searchQuery, activeCategory, profiles]);

  const handleHireClick = (talent: TalentProfile) => { setSelectedTalent(talent); setIsModalOpen(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const msg = `*🚀 New Hiring Inquiry (Talent Page)*%0A%0A*Target Node:* ${selectedTalent?.name} (${selectedTalent?.id})%0A*Role:* ${selectedTalent?.role}%0A%0A*Employer Company:* ${formData.company}%0A*Employer Email:* ${formData.email}%0A*Project Scope:* ${formData.projectDetails}`;
      window.open(`https://wa.me/${modalWaNumber}?text=${msg}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ company: '', email: '', projectDetails: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] md:h-[600px] blur-[150px] rounded-full pointer-events-none -z-0" style={{ background: `${accentFrom}1a` }} />
        <div className="absolute top-1/2 left-0 w-full md:w-[600px] h-[400px] md:h-[600px] blur-[150px] rounded-full pointer-events-none -z-0" style={{ background: `${accentTo}1a` }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-24">

          {/* ── HERO ───────────────────────────────────────────────────────── */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}>
              <Zap size={12} style={{ color: accentFrom }} />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>{badgeText}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
              {heroPl} <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>{heroAcc}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed px-4">
              {heroBody}
            </motion.p>
          </div>

          {/* ── SEARCH & FILTERS ───────────────────────────────────────────── */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(to right, ${accentFrom}33, ${accentTo}33)` }} />
              <div className="relative bg-[#0a0f1d]/80 border border-white/10 rounded-2xl p-2 backdrop-blur-xl flex items-center">
                <div className="pl-4 text-slate-400"><Search size={20} /></div>
                <input type="text" placeholder={searchPlaceholder}
                  className="w-full bg-transparent border-none px-4 py-3 md:py-4 outline-none text-white text-sm md:text-base placeholder:text-slate-500"
                  value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  <Filter size={14} /> Filters
                </button>
              </div>
            </div>
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 justify-start sm:justify-center">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${activeCategory === cat ? 'text-white shadow-lg' : 'bg-[#0a0f1d]/50 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
                  style={activeCategory === cat ? { background: accentFrom, boxShadow: `0 10px 20px ${accentFrom}40` } : {}}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* ── VETTING CONSOLE ────────────────────────────────────────────── */}
          <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 rounded-t-[3rem]" style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo}, #a855f7)` }} />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">
                  {vettingPl}<br className="hidden lg:block" /><span className="italic" style={{ color: accentFrom }}>{vettingAcc}</span>
                </h2>
                <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">{vettingBody}</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {vettingStats.map((stat, i) => {
                    const Icon = VETTING_ICON_MAP[stat.icon] ?? Binary;
                    return (
                      <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                        <Icon size={18} style={{ color: accentFrom }} className="mb-2" />
                        <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase mb-1">{stat.label}</p>
                        <span className="text-base md:text-lg font-black">{stat.val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" style={{ background: `linear-gradient(to right, ${accentFrom}, #a855f7)` }} />
                <div className="relative bg-[#020617] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="font-mono text-[10px] md:text-xs space-y-3 text-slate-500">
                    <p style={{ color: accentFrom }}>// ANALYZING_CANDIDATE_NODE</p>
                    <p>&gt; Scanning Repository logic... [OK]</p>
                    <p>&gt; Verifying Architectural Depth... [S-TIER]</p>
                    <p>&gt; Cross-referencing Global Indices... [NOMINAL]</p>
                    <p className="text-emerald-400 pt-4 animate-pulse">&gt; NODE_STATUS: ELITE_VERIFIED</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── TALENT GRID ────────────────────────────────────────────────── */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTalent.length > 0 ? (
                filteredTalent.map((talent, i) => (
                  <motion.div layout key={talent.id}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#0a0f1d]/60 border border-white/5 rounded-[2rem] overflow-hidden backdrop-blur-xl group transition-all flex flex-col h-full shadow-2xl"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <div className="p-6 md:p-8 flex-grow space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${talent.status === 'Available Now' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          <span className={`text-[9px] font-black uppercase tracking-widest ${talent.status === 'Available Now' ? 'text-emerald-400' : 'text-amber-400'}`}>{talent.status}</span>
                        </div>
                        <div className="px-3 py-1 rounded-full text-[10px] font-black tracking-widest flex items-center gap-1" style={{ background: `${accentTo}1a`, border: `1px solid ${accentTo}33`, color: accentTo }}>
                          <Star size={10} fill="currentColor" /> {talent.score} AI Match
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={talent.avatar} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" alt={talent.name} />
                          <div className="absolute -bottom-2 -right-2 bg-[#020617] rounded-full p-1 border border-white/10">
                            <ShieldCheck size={14} className="text-emerald-500" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{talent.name}</h3>
                          <p className="text-xs font-medium mt-1" style={{ color: accentFrom }}>{talent.role}</p>
                          <div className="flex items-center gap-1 mt-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                            <MapPin size={10} /> {talent.location}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {talent.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300">{skill}</span>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Success Rate</p>
                          <p className="text-sm font-bold text-white flex items-center gap-1"><CheckCircle2 size={12} className="text-emerald-500" /> 100%</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Completed</p>
                          <p className="text-sm font-bold text-white flex items-center gap-1"><Briefcase size={12} style={{ color: accentFrom }} /> {talent.sprintsCompleted} Sprints</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="text-sm font-black text-white">{talent.rate}</div>
                      <button onClick={() => handleHireClick(talent)}
                        className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all flex items-center gap-2"
                        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentFrom; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}>
                        {deployBtnLabel} <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10"><Search size={24} className="text-slate-500" /></div>
                  <h3 className="text-xl font-bold text-white mb-2">{emptyTitle}</h3>
                  <p className="text-slate-500 text-sm">{emptyBody}</p>
                  <button onClick={() => { setSearchQuery(''); setActiveCategory('All Talent'); }}
                    className="mt-6 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                    {clearBtnLabel}
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── GLOBAL HUBS ────────────────────────────────────────────────── */}
          <section className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none"><Globe size={250} /></div>
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black mb-4 tracking-tight uppercase">
                  {hubsPl}<br className="hidden md:block" /><span className="italic" style={{ color: accentFrom }}>{hubsAcc}</span>
                </h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">{hubsBody}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 relative z-10">
                {regions.map((hub, i) => (
                  <div key={i} className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{hub.region}</span>
                    <h4 className="text-xl font-black text-white">{hub.nodes} <span className="text-[9px] text-slate-500 uppercase">Nodes</span></h4>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: hub.progress }} className="h-full" style={{ background: accentFrom }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between shadow-3xl text-center md:text-left" style={{ background: `linear-gradient(to bottom right, ${accentTo}99, ${accentFrom}99)` }}>
              <ShieldCheck size={48} className="text-white mb-6 mx-auto md:mx-0" />
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">{securityTitle}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-8">{securityBody}</p>
              </div>
              <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl">{securityBtnLabel}</button>
            </div>
          </section>

          {/* ── MATCHMAKER CTA ─────────────────────────────────────────────── */}
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border p-8 md:p-16 text-center space-y-8 backdrop-blur-xl"
            style={{ background: `linear-gradient(to right, ${accentFrom}33, ${accentTo}33)`, borderColor: `${accentFrom}33` }}>
            <div className="absolute inset-0 blur-[100px] rounded-full pointer-events-none" style={{ background: `${accentFrom}0d` }} />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">{matchHeadline}</h2>
              <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto mb-8">{matchBody}</p>
              <button className="inline-flex items-center gap-3 px-8 py-4 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all shadow-xl"
                style={{ background: accentFrom }}>
                {matchBtnLabel} <Zap size={16} fill="currentColor" />
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* ── MODAL ──────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-xl w-full shadow-3xl overflow-hidden z-10">
              <div className="absolute top-0 right-0 w-64 h-64 blur-[80px] rounded-full pointer-events-none" style={{ background: `${accentFrom}0d` }} />
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={20} /></button>
              <div className="mb-8 text-center md:text-left border-b border-white/5 pb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] mb-2 block" style={{ color: accentFrom }}>{modalBadge}</span>
                <h3 className="text-2xl font-black mb-2 tracking-tight">{modalHeadline}</h3>
                {selectedTalent && (
                  <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                    <img src={selectedTalent.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" alt="Talent" />
                    <div className="text-left">
                      <p className="text-sm font-bold text-white">{selectedTalent.name}</p>
                      <p className="text-[10px] font-medium text-slate-400">{selectedTalent.role} • {selectedTalent.rate}</p>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input required type="text" placeholder="Your Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({ ...formData, company: e.target.value })} />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="relative group">
                  <LayoutTemplate className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <textarea required rows={3} placeholder="Brief Project Scope..." className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600 resize-none" onChange={e => setFormData({ ...formData, projectDetails: e.target.value })} />
                </div>
                <button disabled={isSubmitting} type="submit"
                  className="w-full py-4 md:py-5 font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs active:scale-95 disabled:opacity-50 bg-white text-black"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentFrom; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}>
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>{modalBtnLabel} <ShieldCheck size={16} /></>}
                </button>
                <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">{modalFooterNote}</p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}