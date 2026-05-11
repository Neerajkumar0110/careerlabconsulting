'use client';

import React, { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, MapPin, Wifi, DollarSign,
  Briefcase, Clock, Users, ChevronRight, Loader2, ArrowUpRight,
  Sparkles, LogOut, User, Building2, RefreshCw, Tag, Send,
  CheckCircle, AlertCircle, Globe, ExternalLink, ChevronDown,
  Star, Zap, TrendingUp, ArrowRight, LayoutDashboard, Menu,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';
import { SmartGigSearchBox } from '@/components/freelancex/SmartGigSearchBox';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ─────────────────────────────────────────── */
interface ClientProfile {
  companyName: string | null;
  website: string | null;
  industry: string | null;
}
interface GigPoster {
  id: string;
  email: string;
  clientProfile: ClientProfile | null;
}
interface Gig {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budgetMin: number | null;
  budgetMax: number | null;
  isRemote: boolean;
  location: string | null;
  status: string;
  duration: string | null;
  createdAt: string;
  postedBy: GigPoster;
  _count: { proposals: number };
}
interface GigDetail extends Gig { proposals: any[]; }
interface AuthUser {
  id: string;
  role: 'FREELANCER' | 'CLIENT';
  email: string;
  freelancerProfile?: { fullName: string } | null;
  clientProfile?: { companyName: string | null } | null;
}

/* ── Markdown-lite description renderer ─────────────── */
function RichDescription({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-sm text-slate-300 leading-relaxed">
      {lines.map((line, i) => {
        // Bold: **text**
        const boldified = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-bold">$1</strong>');
        // Checkmarks ✓ → styled
        const withChecks = boldified.replace(/✓\s?/g, '<span class="text-emerald-400 mr-1">✓</span>');
        if (line.trim() === '') return <div key={i} className="h-1" />;
        return <p key={i} dangerouslySetInnerHTML={{ __html: withChecks }} />;
      })}
    </div>
  );
}

/* ── Animations ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: Math.min(i * 0.07, 0.4), ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const slidePanel = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
};

/* ── Helpers ─────────────────────────────────────────── */
const timeAgo = (date: string) => {
  const d = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (d < 60) return 'just now';
  if (d < 3600) return `${Math.floor(d / 60)}m ago`;
  if (d < 86400) return `${Math.floor(d / 3600)}h ago`;
  if (d < 604800) return `${Math.floor(d / 86400)}d ago`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
const budgetLabel = (min: number | null, max: number | null) => {
  if (!min && !max) return null;
  if (min && max) return `$${min.toLocaleString()} – $${max.toLocaleString()}`;
  if (min) return `From $${min.toLocaleString()}`;
  return `Up to $${max!.toLocaleString()}`;
};

/* ── Floating stat pill ──────────────────────────────── */
function FloatPill({ icon: Icon, value, label, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0d1526]/90 border border-white/10 backdrop-blur-xl shadow-xl"
    >
      <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-black text-white leading-none">{value}</p>
        <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest font-bold">{label}</p>
      </div>
    </motion.div>
  );
}

/* ── Consistent Navbar (matches home page) ───────────── */
const NAV_LINKS = [
  { name: 'Freelancers', href: '/freelancex/freelancers' },
  { name: 'Features', href: '/freelancex/features' },
  { name: 'Reports', href: '/freelancex/reports' },
];

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

function Navbar({ authUser, authLoading, onLogout, logoutLoading }: {
  authUser: AuthUser | null;
  authLoading: boolean;
  onLogout: () => void;
  logoutLoading: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const displayName = authUser?.freelancerProfile?.fullName || authUser?.clientProfile?.companyName || authUser?.email || '';
  const avatarLetter = (displayName.charAt(0) || authUser?.email?.charAt(0) || '?').toUpperCase();
  const dashHref = authUser?.role === 'CLIENT' ? '/freelancex/dashboard/client' : '/freelancex/dashboard/freelancer';
  const linkClass = scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-400 hover:text-white';

  return (
    <header className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'}`}>
      <nav className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${scrolled ? 'max-w-full rounded-none bg-white border-b border-slate-200 shadow-md px-8' : 'bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6'}`}>
        <div className="flex justify-between items-center h-16">
          <Logo isSticky={scrolled} />

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.name} href={link.href} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${linkClass}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {!authLoading && (
              authUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(o => !o)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${scrolled ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-black">{avatarLetter}</div>
                    <span className={`hidden sm:block text-[11px] font-black max-w-[120px] truncate ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}>{displayName}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-slate-500' : 'text-slate-400'}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div variants={dropdownVariants} initial="hidden" animate="visible" exit="exit"
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden py-1 z-50">
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                          <p className="text-xs font-bold text-white truncate mt-0.5">{authUser.email}</p>
                          <span className={`inline-flex mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${authUser.role === 'CLIENT' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20'}`}>
                            {authUser.role === 'CLIENT' ? 'Client' : 'Freelancer'}
                          </span>
                        </div>
                        <Link href={dashHref} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                          <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Dashboard
                        </Link>
                        <div className="border-t border-white/5 mt-1" />
                        <button onClick={() => { onLogout(); setDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/freelancex/login" className={`hidden sm:block text-[11px] font-black uppercase tracking-widest transition-colors ${linkClass}`}>Log in</Link>
                  <Link href="/freelancex/signup" className={`px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 ${scrolled ? 'bg-[#0f172a] text-white hover:bg-blue-700' : 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500'}`}>
                    Sign up
                  </Link>
                </>
              )
            )}
            <button onClick={() => setMobileOpen(o => !o)} className={`md:hidden p-1 transition-colors ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${scrolled ? 'border-slate-100 bg-white' : 'border-white/10'}`}>
              <div className="flex flex-col p-6 gap-5 text-center">
                {NAV_LINKS.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)} className={`text-xs font-black uppercase tracking-[0.3em] ${scrolled ? 'text-slate-600' : 'text-slate-400'}`}>{link.name}</Link>
                ))}
                <div className={`h-px w-full ${scrolled ? 'bg-slate-100' : 'bg-white/10'}`} />
                {authUser ? (
                  <>
                    <Link href={dashHref} onClick={() => setMobileOpen(false)} className={`text-xs font-black uppercase tracking-widest py-2 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}>Dashboard</Link>
                    <button onClick={() => { onLogout(); setMobileOpen(false); }} className="text-xs font-black uppercase tracking-widest py-2 text-red-400">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/freelancex/login" onClick={() => setMobileOpen(false)} className={`text-xs font-black uppercase tracking-widest py-2 ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}>Log In</Link>
                    <Link href="/freelancex/signup" onClick={() => setMobileOpen(false)} className="text-xs font-black uppercase tracking-widest py-2 text-indigo-400">Create Profile</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ── Skill pill ─────────────────────────────────────── */
function SkillPill({ skill, active, onClick }: { skill: string; active?: boolean; onClick?: () => void }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${active
        ? 'bg-indigo-600 border-indigo-500 text-white shadow-sm shadow-indigo-600/30'
        : 'bg-white/[0.04] border-white/10 text-slate-400 hover:border-indigo-500/40 hover:text-indigo-300'}`}>
      {skill}
    </motion.button>
  );
}

/* ── Proposal Modal ──────────────────────────────────── */
function ProposalModal({ gig, onClose, onSubmit }: {
  gig: Gig;
  onClose: () => void;
  onSubmit: (data: { coverLetter: string; bidAmount: string; portfolioUrl: string; deliveryDays: string }) => Promise<void>;
}) {
  const [form, setForm] = useState({ coverLetter: '', bidAmount: '', portfolioUrl: '', deliveryDays: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!form.coverLetter.trim()) { setError('Cover letter is required.'); return; }
    setLoading(true); setError('');
    try { await onSubmit(form); onClose(); }
    catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full sm:max-w-lg bg-[#0c1120] border border-white/10 rounded-t-3xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl max-h-[92vh] overflow-y-auto"
        initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '100%', opacity: 0 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-t-3xl" />
        <div className="w-10 h-1 bg-white/10 rounded-full mx-auto mb-5 sm:hidden" />
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Submit Proposal</p>
            <h3 className="text-base sm:text-lg font-black text-white leading-tight line-clamp-2">{gig.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{gig.postedBy.clientProfile?.companyName || gig.postedBy.email}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all ml-3 shrink-0">
            <X className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
        {error && (
          <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-xs text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Your Bid (USD) <span className="text-slate-600">(opt.)</span></label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                <input type="number" placeholder={gig.budgetMin?.toString() || '500'} value={form.bidAmount} onChange={e => setForm(f => ({ ...f, bidAmount: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
              </div>
            </div>
            <div className="space-y-1.5 group">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Delivery (days) <span className="text-slate-600">(opt.)</span></label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                <input type="number" placeholder="14" value={form.deliveryDays} onChange={e => setForm(f => ({ ...f, deliveryDays: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
              </div>
            </div>
          </div>
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Portfolio URL <span className="text-slate-600">(opt.)</span></label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
              <input type="url" placeholder="https://yourportfolio.com" value={form.portfolioUrl} onChange={e => setForm(f => ({ ...f, portfolioUrl: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-3 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
            </div>
          </div>
          <div className="space-y-1.5 group">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Cover Letter <span className="text-red-400">*</span></label>
            <textarea rows={5} placeholder="Explain why you're the perfect fit for this project..."
              value={form.coverLetter} onChange={e => setForm(f => ({ ...f, coverLetter: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all placeholder:text-slate-700 resize-none" />
            <p className="text-[10px] text-slate-600 text-right">{form.coverLetter.length} chars</p>
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-3 rounded-2xl border border-white/10 text-slate-400 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
          <motion.button onClick={handleSubmit} disabled={loading || !form.coverLetter.trim()}
            whileHover={!loading ? { scale: 1.02 } : {}} whileTap={!loading ? { scale: 0.98 } : {}}
            className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-3.5 h-3.5" /><span>Submit Proposal</span></>}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Gig Detail Side Panel ───────────────────────────── */
function GigDetailPanel({ gig, authUser, onClose, onPropose, appliedGigIds }: {
  gig: GigDetail | null;
  authUser: AuthUser | null;
  onClose: () => void;
  onPropose: (gig: Gig) => void;
  appliedGigIds: Set<string>;
}) {
  if (!gig) return null;
  const skills = Array.isArray(gig.skills) ? gig.skills : [];
  const isOwner = authUser?.id === gig.postedBy.id;
  const isFreelancer = authUser?.role === 'FREELANCER';
  const hasApplied = appliedGigIds.has(gig.id);

  return (
    <motion.div variants={slidePanel} initial="hidden" animate="visible" exit="exit"
      className="fixed inset-y-0 right-0 z-40 w-full sm:w-[480px] lg:w-[520px] bg-[#080e1a] border-l border-white/8 flex flex-col shadow-2xl overflow-hidden mt-18">
      <div className="p-5 sm:p-6 border-b border-white/5 bg-[#080e1a]">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black border bg-emerald-500/10 border-emerald-500/20 text-emerald-400 mb-2">{gig.status}</span>
            <h2 className="text-lg sm:text-xl font-black text-white leading-snug">{gig.title}</h2>
            <p className="text-xs text-slate-500 mt-1">{gig.postedBy.clientProfile?.companyName || gig.postedBy.email} · {timeAgo(gig.createdAt)}</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shrink-0 mt-1">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: DollarSign, label: 'Budget', value: budgetLabel(gig.budgetMin, gig.budgetMax) || 'Open' },
            { icon: MapPin, label: 'Location', value: gig.isRemote ? 'Remote' : (gig.location || 'On-site') },
            { icon: Users, label: 'Proposals', value: `${gig._count.proposals}` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-white/[0.03] border border-white/8 rounded-xl p-3 text-center">
              <Icon className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
              <p className="text-[9px] text-slate-600 uppercase tracking-widest font-black">{label}</p>
              <p className="text-xs font-black text-white mt-0.5 truncate">{value}</p>
            </div>
          ))}
        </div>

        {/* FIXED: Rich description renderer */}
        <div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Project Description</p>
          <RichDescription text={gig.description} />
        </div>

        {skills.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2.5 flex items-center gap-1.5"><Tag className="w-3 h-3" /> Required Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-xs text-indigo-300 font-bold">{s}</span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-4">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Posted By</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/40 to-indigo-500/40 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-indigo-300" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{gig.postedBy.clientProfile?.companyName || 'Independent Client'}</p>
              <p className="text-xs text-slate-500 truncate">{gig.postedBy.clientProfile?.industry || gig.postedBy.email}</p>
            </div>
            {gig.postedBy.clientProfile?.website && (
              <a href={gig.postedBy.clientProfile.website} target="_blank" rel="noopener noreferrer"
                className="ml-auto flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300 font-bold shrink-0">
                <ExternalLink className="w-3 h-3" /> Visit
              </a>
            )}
          </div>
        </div>

        {gig.duration && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>Duration: <span className="font-bold text-white">{gig.duration}</span></span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-6 border-t border-white/5 bg-[#080e1a]">
        {!authUser ? (
          <Link href="/freelancex/login"
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20">
            Sign In to Apply <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        ) : isOwner ? (
          <div className="flex items-center gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <p className="text-xs text-amber-300">You posted this gig.</p>
            <Link href="/freelancex/dashboard/client" className="ml-auto text-[10px] font-black text-amber-400 hover:text-amber-300 whitespace-nowrap">Manage →</Link>
          </div>
        ) : !isFreelancer ? (
          <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="text-xs text-slate-400">Only freelancers can submit proposals.</p>
          </div>
        ) : hasApplied ? (
          <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300 font-bold">Proposal submitted!</p>
            <Link href="/freelancex/dashboard/freelancer" className="ml-auto text-[10px] font-black text-emerald-400 whitespace-nowrap">View →</Link>
          </div>
        ) : (
          <motion.button onClick={() => onPropose(gig)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/25">
            <Send className="w-3.5 h-3.5" /> Submit Proposal
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

/* ── Gig Card ───────────────────────────────────────── */
function GigCard({ gig, index, onSelect, authUser, appliedGigIds, onPropose }: {
  gig: Gig; index: number; onSelect: (gig: Gig) => void;
  authUser: AuthUser | null; appliedGigIds: Set<string>; onPropose: (gig: Gig) => void;
}) {
  const skills = Array.isArray(gig.skills) ? gig.skills : [];
  const budget = budgetLabel(gig.budgetMin, gig.budgetMax);
  const isFreelancer = authUser?.role === 'FREELANCER';
  const hasApplied = appliedGigIds.has(gig.id);
  const isOwner = authUser?.id === gig.postedBy.id;

  return (
    <motion.div variants={fadeUp} custom={index} initial="hidden" animate="visible"
      className="group bg-white/[0.025] border border-white/8 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:bg-white/[0.04] hover:border-indigo-500/30 hover:shadow-lg hover:shadow-indigo-600/5 transition-all cursor-pointer relative overflow-hidden"
      onClick={() => onSelect(gig)}>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/0 to-purple-600/0 group-hover:from-indigo-600/3 group-hover:to-purple-600/2 transition-all duration-500 rounded-2xl sm:rounded-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              {gig.isRemote && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Wifi className="w-2.5 h-2.5" /> Remote
                </span>
              )}
              {hasApplied && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-black bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <CheckCircle className="w-2.5 h-2.5" /> Applied
                </span>
              )}
            </div>
            <h3 className="text-sm sm:text-base font-black text-white group-hover:text-indigo-200 transition-colors leading-snug line-clamp-2">{gig.title}</h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/20 flex items-center justify-center shrink-0">
            <Building2 className="w-4.5 h-4.5 text-indigo-300" />
          </div>
        </div>
        <p className="text-[11px] text-slate-500 mb-3">{gig.postedBy.clientProfile?.companyName || 'Independent Client'}{gig.postedBy.clientProfile?.industry ? ` · ${gig.postedBy.clientProfile.industry}` : ''}</p>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 mb-4">{gig.description.replace(/\*\*/g, '').replace(/✓/g, '•')}</p>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 4).map(s => (
              <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-full text-[10px] text-slate-400 font-mono">{s}</span>
            ))}
            {skills.length > 4 && <span className="text-[10px] text-slate-600 self-center">+{skills.length - 4}</span>}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            {budget && <span className="flex items-center gap-1 font-bold text-emerald-400"><DollarSign className="w-3 h-3" />{budget}</span>}
            {!gig.isRemote && gig.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{gig.location}</span>}
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{gig._count.proposals}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-600">{timeAgo(gig.createdAt)}</span>
            {isFreelancer && !hasApplied && !isOwner && (
              <motion.button onClick={e => { e.stopPropagation(); onPropose(gig); }}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-[10px] font-black text-indigo-400 hover:bg-indigo-600/30 transition-all">
                Apply
              </motion.button>
            )}
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Animated counter ────────────────────────────────── */
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 40;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

/* ── Main Page ───────────────────────────────────────── */
function BrowseGigsPage() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [appliedGigIds, setAppliedGigIds] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState('');
  // const [search, setSearch] = useState('');
  const [searchedQuery,   setSearchedQuery]   = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGig, setSelectedGig] = useState<GigDetail | null>(null);
  const [proposalGig, setProposalGig] = useState<Gig | null>(null);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams(); 
  const [isInitialized, setIsInitialized] = useState(false);

  const popularSkills = ['React', 'Node.js', 'TypeScript', 'Python', 'Flutter', 'AWS', 'PostgreSQL', 'Next.js'];

  useEffect(() => {
    fetch(`${API_BASE}/api/freelancex/auth/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null).then(d => { if (d) setAuthUser(d); }).catch(() => {}).finally(() => setAuthLoading(false));
  }, []);

  useEffect(() => {
    if (authUser?.role !== 'FREELANCER') return;
    fetch(`${API_BASE}/api/freelancex/freelancer/proposals`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : []).then((p: any[]) => setAppliedGigIds(new Set(p.map((x: any) => x.gigId)))).catch(() => {});
  }, [authUser]);

  // useEffect(() => {
  //   const qParam = searchParams.get('q');
  //   if (qParam) {
  //     setQuery(qParam);
  //     setSearch(qParam); // if you're using separate UI state
  //   }
  //   setIsInitialized(true);
  // }, [searchParams]);

  useEffect(() => {
    const qParam = searchParams.get('q');
    if (qParam) {
      setQuery(qParam);
      setSearchedQuery(qParam);
    }
    setIsInitialized(true);
  }, [searchParams]);

  // const fetchGigs = useCallback(async (cursor?: string) => {
  //   const params = new URLSearchParams();
    
  //   // Fix: query and skillFilter are separate — don't let skillFilter overwrite query
  //   if (query) params.set('q', query);
  //   if (skillFilter) params.set('q', skillFilter); // skillFilter takes priority when set
  //   if (query && skillFilter) params.set('q', `${query} ${skillFilter}`); // combine both
    
  //   if (remoteOnly) params.set('remote', 'true');
  //   if (budgetMin) params.set('budgetMin', budgetMin);
  //   if (budgetMax) params.set('budgetMax', budgetMax);
  //   if (cursor) params.set('cursor', cursor);
  //   params.set('limit', '12');
    
  //   try {
  //     const res = await fetch(`${API_BASE}/api/freelancex/gigs?${params}`, { credentials: 'include' });
  //     const data = await res.json();
  //     if (cursor) {
  //       setGigs(prev => {
  //         const ids = new Set(prev.map(g => g.id));
  //         return [...prev, ...data.gigs.filter((g: Gig) => !ids.has(g.id))];
  //       });
  //     } else {
  //       setGigs(data.gigs); // fresh results on new search — don't append
  //     }
  //     setNextCursor(data.nextCursor);
  //     setHasMore(data.hasMore);
  //   } catch {}
  // }, [query, remoteOnly, budgetMin, budgetMax, skillFilter]);

  const fetchGigs = useCallback(async (cursor?: string) => {
    const params = new URLSearchParams();
  
    // Use the committed search term only (avoids mid-keystroke refetches)
    if (searchedQuery) params.set('q', searchedQuery);
    if (skillFilter)   params.set('q', skillFilter);                         // skill pill takes priority
    if (searchedQuery && skillFilter) params.set('q', `${searchedQuery} ${skillFilter}`);
  
    if (remoteOnly)  params.set('remote', 'true');
    if (budgetMin)   params.set('budgetMin', budgetMin);
    if (budgetMax)   params.set('budgetMax', budgetMax);
    if (cursor)      params.set('cursor', cursor);
    params.set('limit', '12');
  
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/gigs?${params}`, { credentials: 'include' });
      const data = await res.json();
      if (cursor) {
        setGigs(prev => {
          const ids = new Set(prev.map(g => g.id));
          return [...prev, ...data.gigs.filter((g: Gig) => !ids.has(g.id))];
        });
      } else {
        setGigs(data.gigs);
      }
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {}
  }, [searchedQuery, remoteOnly, budgetMin, budgetMax, skillFilter]);  // ← searchedQuery, not query

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor || isFetchingRef.current) return;
    isFetchingRef.current = true; setLoadingMore(true);
    try { await fetchGigs(nextCursor); } finally { setLoadingMore(false); isFetchingRef.current = false; }
  }, [hasMore, nextCursor, fetchGigs]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => { if (entries[0].isIntersecting && hasMore) loadMore(); }, { rootMargin: '300px', threshold: 0.1 });
    if (node) observerRef.current.observe(node);
  }, [loadMore, hasMore, loadingMore]);

  useEffect(() => {
    if (!isInitialized) return; // 🚨 prevent early fetch

    setLoading(true);
    setGigs([]);

    fetchGigs().finally(() => setLoading(false));
  }, [fetchGigs, isInitialized]);

  const handleSearch = (overrideQuery?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : query;
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    router.push(`/freelancex/gigs?${p.toString()}`, { scroll: false });
    setSearchedQuery(q);
    setNextCursor(null);
  };

  const handleSelectGig = async (gig: Gig) => {
    setSelectedGig(gig as GigDetail);
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/gigs/${gig.id}`, { credentials: 'include' });
      if (res.ok) setSelectedGig(await res.json());
    } catch {}
  };

  const handlePropose = async (data: { coverLetter: string; bidAmount: string; portfolioUrl: string; deliveryDays: string }) => {
    const gig = proposalGig!;
    const res = await fetch(`${API_BASE}/api/freelancex/gigs/${gig.id}/propose`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ coverLetter: data.coverLetter, bidAmount: data.bidAmount ? parseInt(data.bidAmount) : null, portfolioUrl: data.portfolioUrl || null, deliveryDays: data.deliveryDays ? parseInt(data.deliveryDays) : null }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Submission failed');
    setAppliedGigIds(prev => new Set([...prev, gig.id]));
    setSuccessMsg(`Proposal submitted for "${gig.title}"!`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch(`${API_BASE}/api/freelancex/auth/logout`, { method: 'POST', credentials: 'include' });
    setAuthUser(null); setLogoutLoading(false);
  };

  // const clearFilters = () => {
  //   setSearch('');
  //   setQuery('');
  //   setBudgetMin('');
  //   setBudgetMax('');
  //   setRemoteOnly(false);
  //   setSkillFilter('');

  // router.replace('/freelancex/gigs');
  // };

  const clearFilters = () => {
    setQuery('');
    setSearchedQuery('');
    setBudgetMin('');
    setBudgetMax('');
    setRemoteOnly(false);
    setSkillFilter('');
    router.replace('/freelancex/gigs');
  };

  const hasActiveFilters = query || budgetMin || budgetMax || remoteOnly || skillFilter;

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] bg-indigo-600/6 blur-[180px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/5 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:55px_55px]" />
      </div>

      <Navbar authUser={authUser} authLoading={authLoading} onLogout={handleLogout} logoutLoading={logoutLoading} />

      {/* ── HERO SECTION ── */}
      <section className="relative z-20 pt-28 sm:pt-36 pb-16 sm:pb-20">
        {/* Hero-specific glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-gradient-radial from-indigo-600/10 via-blue-600/5 to-transparent blur-3xl" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            className="absolute top-10 right-[10%] w-[500px] h-[500px] opacity-10"
            style={{ background: 'conic-gradient(from 0deg, transparent 70%, #6366f1, transparent)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left: copy */}
            <div>
              {/* Live badge */}
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[11px] font-black uppercase tracking-[0.18em] mb-7">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                {loading ? 'Loading...' : <><AnimatedCounter value={1559} />+ Live Opportunities</>}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] mb-5">
                Your next big<br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400">
                    career move
                  </span>
                  {/* Underline accent */}
                  <motion.span
                    initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 origin-left rounded-full"
                  />
                </span>
                <br />starts here.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}
                className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                Top companies post high-impact gigs every day. Be the first to apply, win the work, and build a portfolio that speaks for itself.
              </motion.p>

              {/* Trust signals */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-10">
                {[
                  { icon: CheckCircle, text: 'No bidding wars', color: 'text-emerald-400' },
                  { icon: Zap, text: 'Instant notifications', color: 'text-amber-400' },
                  { icon: Star, text: 'Verified clients only', color: 'text-blue-400' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {text}
                  </div>
                ))}
              </motion.div>

              {/* CTA row */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42, duration: 0.5 }}
                className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('gigs-grid');
                    if (el) {
                      const yOffset = -80; // adjust this (negative = stop before reaching exact top)
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="group flex items-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl text-sm font-black text-white transition-all shadow-lg shadow-indigo-600/30 uppercase tracking-widest"
                >
                  Browse All Gigs
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                {!authUser && (
                  <Link href="/freelancex/signup"
                    className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl text-sm font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest">
                    Create Free Profile
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: floating stat cards */}
            <div className="hidden lg:block relative h-[400px]">
              {/* Central orb */}
              <motion.div
                animate={{ y: [0, -14, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 50%, transparent 80%)' }}
              >
                <div className="absolute inset-6 rounded-full border border-indigo-500/20 flex items-center justify-center">
                  <div className="absolute inset-4 rounded-full border border-indigo-500/10 flex items-center justify-center">
                    <Briefcase className="w-10 h-10 text-indigo-400/60" />
                  </div>
                </div>
              </motion.div>

              {/* Orbiting pings */}
              {[0, 1, 2].map(i => (
                <motion.div key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10 + i * 4, repeat: Infinity, ease: 'linear', delay: i * -3 }}
                  className="absolute top-1/2 left-1/2"
                  style={{ width: 180 + i * 60, height: 180 + i * 60, marginTop: -(90 + i * 30), marginLeft: -(90 + i * 30), borderRadius: '50%', border: '1px dashed rgba(99,102,241,0.12)' }}
                >
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 10 + i * 4, repeat: Infinity, ease: 'linear', delay: i * -3 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-400/60 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                  />
                </motion.div>
              ))}

              {/* Stat pills floating */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                className="absolute top-[10%] left-[-5%]">
                <FloatPill icon={TrendingUp} value="$8,400" label="Avg Project Value" color="bg-emerald-600" delay={0.5} />
              </motion.div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-[12%] right-[5%]">
                <FloatPill icon={Users} value="2,400+" label="Active Freelancers" color="bg-blue-600" delay={0.65} />
              </motion.div>
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute bottom-[20%] left-[0%]">
                <FloatPill icon={Zap} value="< 2hrs" label="Avg First Response" color="bg-violet-600" delay={0.8} />
              </motion.div>
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute bottom-[18%] right-[0%]">
                <FloatPill icon={Star} value="4.9 ★" label="Client Satisfaction" color="bg-amber-500" delay={0.95} />
              </motion.div>

              {/* Live activity blips */}
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }}
                className="absolute top-[42%] right-[-8%] flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-300">New gig posted 3m ago</span>
              </motion.div>
            </div>
          </div>

          {/* ── Freelancex Search bar ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.55 } }
            className="mt-10 max-w-3xl">
            <SmartGigSearchBox
              query={query}
              onQueryChange={setQuery}
              onSearch={handleSearch}
              onQueryClear={() => {
                setSearchedQuery('');
                handleSearch('');
              }}
            />

            {/* Filters panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden mt-2">
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="flex items-center justify-between sm:col-span-1 p-3 bg-white/[0.02] border border-white/8 rounded-xl">
                        <div>
                          <p className="text-xs font-black text-white">Remote Only</p>
                          <p className="text-[10px] text-slate-600">Filter remote gigs</p>
                        </div>
                        <button onClick={() => setRemoteOnly(!remoteOnly)} className={`w-10 h-5 rounded-full relative transition-colors ${remoteOnly ? 'bg-indigo-600' : 'bg-white/10'}`}>
                          <motion.div animate={{ x: remoteOnly ? 22 : 2 }} transition={{ duration: 0.2 }} className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                        </button>
                      </div>
                      <div className="space-y-1 group">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Min Budget ($)</label>
                        <input type="number" placeholder="500" value={budgetMin} onChange={e => setBudgetMin(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
                      </div>
                      <div className="space-y-1 group">
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-focus-within:text-indigo-400 transition-colors">Max Budget ($)</label>
                        <input type="number" placeholder="5000" value={budgetMax} onChange={e => setBudgetMax(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-indigo-500/50 outline-none transition-all placeholder:text-slate-700" />
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Quick Skill Filter</p>
                      <div className="flex flex-wrap gap-1.5">
                        {popularSkills.map(s => (
                          <SkillPill key={s} skill={s} active={skillFilter === s} onClick={() => setSkillFilter(skillFilter === s ? '' : s)} />
                        ))}
                      </div>
                    </div>
                    {hasActiveFilters && (
                      <button onClick={clearFilters} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold transition-colors">
                        <X className="w-3.5 h-3.5" /> Clear all filters
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Popular skills */}
            {!showFilters && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
                className="flex flex-wrap gap-2 mt-4">
                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest self-center">Trending:</span>
                {popularSkills.slice(0, 6).map(s => (
                  <SkillPill key={s} skill={s} active={skillFilter === s} onClick={() => setSkillFilter(skillFilter === s ? '' : s)} />
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Success toast ── */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-5 py-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl backdrop-blur-xl shadow-xl">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-black text-emerald-300">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Results ── */}
      <div id="gigs-grid" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
        <p className="text-xs text-slate-500 font-bold">
          {loading ? 'Searching...' : `${gigs.length} gig${gigs.length !== 1 ? 's' : ''} found`}
          {hasMore && <span className="text-slate-600"> · scroll for more</span>}
          {hasActiveFilters && <span className="text-indigo-400 ml-1">· filtered</span>}
        </p>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-black text-red-400 hover:bg-red-500/15 transition-all"
          >
            <X className="w-3 h-3" /> Clear All Filters
          </button>
        )}
      </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 animate-pulse">
                <div className="h-4 bg-white/5 rounded-lg mb-3 w-3/4" />
                <div className="h-3 bg-white/5 rounded-lg mb-2 w-1/2" />
                <div className="h-3 bg-white/5 rounded-lg mb-2 w-full" />
                <div className="h-3 bg-white/5 rounded-lg mb-4 w-5/6" />
                <div className="flex gap-2">{[1,2,3].map(j => <div key={j} className="h-5 w-14 bg-white/5 rounded-full" />)}</div>
              </div>
            ))}
          </div>
        ) : gigs.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-5">
              <Briefcase className="w-7 h-7 text-slate-600" />
            </div>
            <p className="text-white font-black text-lg mb-2">No gigs found</p>
            <p className="text-slate-500 text-sm">Try adjusting your filters or search terms.</p>
            <button onClick={clearFilters} className="mt-5 px-5 py-2.5 bg-indigo-600/20 border border-indigo-500/30 rounded-xl text-xs font-black text-indigo-400 hover:bg-indigo-600/30 transition-all">Reset Filters</button>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gigs.map((gig, i) => (
                <GigCard key={gig.id} gig={gig} index={i} onSelect={handleSelectGig}
                  authUser={authUser} appliedGigIds={appliedGigIds} onPropose={g => setProposalGig(g)} />
              ))}
            </div>
            <div ref={lastElementRef} className="h-10" />
            {hasMore && (
              <div className="flex justify-center mt-10">
                <motion.button onClick={loadMore} disabled={loadingMore} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest">
                  {loadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <><RefreshCw className="w-4 h-4" />Load More Gigs</>}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Side panel ── */}
      <AnimatePresence>
        {selectedGig && (
          <>
            <motion.div className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedGig(null)} />
            <GigDetailPanel gig={selectedGig} authUser={authUser} onClose={() => setSelectedGig(null)} onPropose={g => setProposalGig(g)} appliedGigIds={appliedGigIds} />
          </>
        )}
      </AnimatePresence>

      {/* ── Proposal modal ── */}
      <AnimatePresence>
        {proposalGig && (
          <ProposalModal gig={proposalGig} onClose={() => setProposalGig(null)} onSubmit={handlePropose} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function BrowseGigsPageWrapper() {
  return (
    <Suspense fallback={null}>
      <BrowseGigsPage />
    </Suspense>
  );
}