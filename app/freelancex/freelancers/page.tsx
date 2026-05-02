'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, SlidersHorizontal, X, Github, Linkedin, Globe,
  DollarSign, Clock, Star, Briefcase, ChevronRight, Loader2,
  LogOut, User, RefreshCw, Tag, MapPin, Award, CheckCircle,
  AlertCircle, ExternalLink, ArrowUpRight, Shield, BookOpen,
  Users, Zap, TrendingUp, ArrowRight, LayoutDashboard, Menu,
  ChevronDown, Sparkles,
  Save,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ─────────────────────────────────────────────── */
interface FreelancerProfile {
  fullName: string;
  headline: string | null;
  bio: string | null;
  skills: string[] | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  avgRating: number | null;
  reviewCount: number | null;
  jobSuccessScore: number | null;
  completedJobs: number | null;
  country: string | null;
}
interface Review {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  client: { id: string; clientProfile: { companyName: string | null } | null };
  gig: { id: string; title: string };
}
interface Freelancer {
  id: string;
  email: string;
  createdAt: string;
  freelancerProfile: FreelancerProfile | null;
}
interface AuthUser {
  id: string;
  role: 'FREELANCER' | 'CLIENT';
  email: string;
  freelancerProfile?: { fullName: string } | null;
  clientProfile?: { companyName: string | null } | null;
}

interface ClientProfile {
  id?: string;
  companyName: string | null;
  website: string | null;
  industry: string | null;
  displayName?: string | null;
  isCompany?: boolean;
  country?: string | null;
  totalPosted?: number | null;
  memberSince?: string | null;
}

interface User {
  id: string;
  email: string;
  phone: string | null;
  role: 'CLIENT';
  isVerified: boolean;
  createdAt: string;
  clientProfile: ClientProfile | null;
}

interface FreelancerProfile {
  fullName: string;
  headline: string | null;
  skills: string[] | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
}

interface ProposalUser {
  id: string;
  email: string;
  freelancerProfile: FreelancerProfile | null;
}

interface Proposal {
  id: string;
  userId: string;
  gigId: string;
  status: 'SUBMITTED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
  coverLetter: string | null;
  bidAmount: number | null;
  portfolioUrl: string | null;
  createdAt: string;
  deliveryDays: number | null;
  user: ProposalUser;
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
  status: 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  hiredUserId: string | null;
  proposals: Proposal[];
  _count: { proposals: number };
}


/* ── Animations ─────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: Math.min(i * 0.07, 0.4), ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.065 } } };
const slidePanel = {
  hidden: { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, x: '100%', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const } },
};
const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -6, scale: 0.97, transition: { duration: 0.15 } },
};

/* ── Helpers ─────────────────────────────────────────────── */
const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) => {
  const s = size === 'lg' ? 'w-4 h-4' : 'w-3 h-3';
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className={`${s} ${i <= Math.round(rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}`} />
      ))}
    </div>
  );
};

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

const ScoreRing = ({ score, size = 48 }: { score: number; size?: number }) => {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = score >= 80 ? '#34d399' : score >= 60 ? '#fbbf24' : '#f87171';
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={5} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={5}
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
};

/* ── Skill Tag Input ─────────────────────────────────── */
function SkillTagInput({ value, onChange }: { value: string[]; onChange: (skills: string[]) => void }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const addSkill = (raw: string) => {
    const skill = raw.trim();
    if (!skill) return;
    if (value.map(s => s.toLowerCase()).includes(skill.toLowerCase())) {
      setError(`"${skill}" already added`);
      setTimeout(() => setError(''), 2000);
      return;
    }
    onChange([...value, skill]);
    setInput('');
    setError('');
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (['Enter', ',', 'Tab'].includes(e.key)) { e.preventDefault(); addSkill(input); }
    if (e.key === 'Backspace' && !input && value.length) onChange(value.slice(0, -1));
  };

  return (
    <div>
      <div className="min-h-[46px] flex flex-wrap gap-1.5 items-center bg-[#111827] border border-white/10 rounded-xl px-3 py-2 focus-within:border-violet-500/50 focus-within:ring-1 focus-within:ring-violet-500/30 transition-all">
        {value.map(s => (
          <span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-violet-500/15 border border-violet-500/25 rounded-lg text-[11px] text-violet-300 font-semibold">
            {s}
            <button onClick={() => onChange(value.filter(x => x !== s))} className="text-violet-400 hover:text-white transition-colors ml-0.5">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} onBlur={() => addSkill(input)}
          placeholder={value.length === 0 ? 'React, Node.js… (press Enter)' : 'Add skill…'}
          className="flex-1 min-w-[120px] bg-transparent text-sm text-white outline-none placeholder:text-slate-600" />
      </div>
      {error && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      <p className="text-[10px] text-slate-600 mt-1">Press Enter or comma to add each skill</p>
    </div>
  );
}


/* ── Create/Edit Gig Modal ──────────────────────────── */
function GigModal({ gig, onClose, onSave }: { gig?: Gig | null; onClose: () => void; onSave: (data: any) => Promise<void> }) {
  const isEdit = !!gig;
  const [form, setForm] = useState({
    title: gig?.title || '', description: gig?.description || '',
    skills: Array.isArray(gig?.skills) ? gig.skills : [] as string[],
    budgetMin: gig?.budgetMin?.toString() || '', budgetMax: gig?.budgetMax?.toString() || '',
    isRemote: gig?.isRemote ?? true, location: gig?.location || '', status: gig?.status || 'OPEN',
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Job title is required.';
    else if (form.title.trim().length < 5) e.title = 'Title must be at least 5 characters.';
    if (!form.description.trim()) e.description = 'Description is required.';
    else if (form.description.trim().length < 20) e.description = 'Description must be at least 20 characters.';
    if (form.skills.length === 0) e.skills = 'At least one skill is required.';
    if (form.budgetMin && form.budgetMax && parseInt(form.budgetMin) > parseInt(form.budgetMax)) e.budgetMax = 'Max must be greater than min.';
    if (!form.isRemote && !form.location.trim()) e.location = 'Location is required for on-site gigs.';
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true); setErrors({});
    try {
      await onSave({ title: form.title, description: form.description, skills: form.skills, budgetMin: form.budgetMin ? parseInt(form.budgetMin) : null, budgetMax: form.budgetMax ? parseInt(form.budgetMax) : null, isRemote: form.isRemote, location: form.location || null, ...(isEdit && { status: form.status }) });
      onClose();
    } catch (e: any) { setErrors({ global: e.message }); }
    finally { setSaving(false); }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 pt-20"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full max-w-xl bg-[#0b1120] border border-white/[0.09] rounded-3xl shadow-2xl overflow-y-auto max-h-[92vh]"
        initial={{ scale: 0.95, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <div className="h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl font-extrabold italic text-white">{isEdit ? 'Edit Gig' : 'Post a New Gig'}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{isEdit ? 'Update gig details' : 'Find the perfect freelancer for your project'}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.09] transition-all">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          {errors.global && <div className="mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-400 flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{errors.global}</div>}

          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Job Title *</label>
              <input type="text" placeholder="Senior React Developer" value={form.title}
                onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(e => ({...e, title: ''})); }}
                className={`w-full bg-[#111827] border rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${errors.title ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-white/10 focus:border-violet-500/50 focus:ring-violet-500/30'}`} />
              {errors.title && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.title}</p>}
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Description *</label>
              <textarea rows={4} placeholder="Describe the project scope, expectations, and deliverables..." value={form.description}
                onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(e => ({...e, description: ''})); }}
                className={`w-full bg-[#111827] border rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 resize-none ${errors.description ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-white/10 focus:border-violet-500/50 focus:ring-violet-500/30'}`} />
              {errors.description && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
            </div>
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Required Skills *</label>
              <SkillTagInput value={form.skills} onChange={skills => { setForm(f => ({ ...f, skills })); setErrors(e => ({...e, skills: ''})); }} />
              {errors.skills && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.skills}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{k: 'budgetMin', l: 'Budget Min ($)', p: '500'}, {k: 'budgetMax', l: 'Budget Max ($)', p: '2000'}].map(({k, l, p}) => (
                <div key={k}>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">{l}</label>
                  <input type="number" placeholder={p} value={(form as any)[k]}
                    onChange={e => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(e => ({...e, [k]: ''})); }}
                    className={`w-full bg-[#111827] border rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${errors[k] ? 'border-rose-500/50' : 'border-white/10 focus:border-violet-500/50 focus:ring-violet-500/30'}`} />
                  {errors[k] && <p className="text-xs text-rose-400 mt-1">{errors[k]}</p>}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111827] border border-white/[0.08] rounded-xl">
              <div>
                <p className="text-sm font-semibold text-white">Remote Work</p>
                <p className="text-xs text-slate-500 mt-0.5">Can be done from anywhere</p>
              </div>
              <button onClick={() => setForm(f => ({ ...f, isRemote: !f.isRemote }))}
                className={`w-12 h-6 rounded-full transition-all duration-300 relative ${form.isRemote ? 'bg-violet-600' : 'bg-white/10'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${form.isRemote ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
            {!form.isRemote && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Location *</label>
                <input type="text" placeholder="New York, USA" value={form.location}
                  onChange={e => { setForm(f => ({ ...f, location: e.target.value })); setErrors(e => ({...e, location: ''})); }}
                  className={`w-full bg-[#111827] border rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${errors.location ? 'border-rose-500/50' : 'border-white/10 focus:border-violet-500/50 focus:ring-violet-500/30'}`} />
                {errors.location && <p className="text-xs text-rose-400 mt-1">{errors.location}</p>}
              </motion.div>
            )}
            {isEdit && (
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Status</label>
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as typeof f.status }))}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 outline-none transition-all">
                  {['OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'].map(s => (
                    <option key={s} value={s} className="bg-[#0b1120]">{s.replace('_', ' ')}</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/[0.09] text-slate-400 text-sm font-semibold hover:bg-white/[0.04] transition-all">Cancel</button>
            <motion.button onClick={handleSave} disabled={saving}
              whileHover={!saving ? { scale: 1.01 } : {}} whileTap={!saving ? { scale: 0.99 } : {}}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-violet-600/20">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" />{isEdit ? 'Update Gig' : 'Post Gig'}</>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const steps = 40; const increment = value / steps; let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, 30);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count.toLocaleString()}{suffix}</span>;
}

/* ── Floating stat pill ─────────────────────────────────── */
function FloatPill({ icon: Icon, value, label, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-[#0d1526]/90 border border-white/10 backdrop-blur-xl shadow-xl">
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

/* ── Avatar profile stack (hero visual element) ─────────── */
function ProfileStack() {
  const colors = ['from-purple-500 to-indigo-600', 'from-blue-500 to-cyan-500', 'from-emerald-500 to-teal-500', 'from-amber-500 to-orange-500', 'from-pink-500 to-rose-500'];
  const letters = ['A', 'R', 'S', 'M', 'J'];
  return (
    <div className="flex -space-x-3">
      {letters.map((l, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
          className={`w-9 h-9 rounded-full bg-gradient-to-br ${colors[i]} border-2 border-[#020617] flex items-center justify-center text-xs font-black text-white shadow-lg`}>
          {l}
        </motion.div>
      ))}
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
        className="w-9 h-9 rounded-full bg-white/10 border-2 border-[#020617] flex items-center justify-center text-[10px] font-black text-slate-400">
        +2k
      </motion.div>
    </div>
  );
}

/* ── Mini freelancer preview card (hero visual) ─────────── */
function HeroCard({ name, role, rate, score, letter, color, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="px-4 py-3 rounded-2xl bg-[#0d1526]/95 border border-white/10 backdrop-blur-xl shadow-2xl w-56">
      <div className="flex items-center gap-3 mb-2.5">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-sm font-black text-white`}>{letter}</div>
        <div className="min-w-0">
          <p className="text-xs font-black text-white truncate">{name}</p>
          <p className="text-[10px] text-slate-500 truncate">{role}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black text-emerald-400">${rate}/hr</span>
        <div className="flex items-center gap-1">
          <div className="relative w-6 h-6">
            <ScoreRing score={score} size={24} />
            <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-white rotate-[90deg]">{score}</span>
          </div>
          <span className="text-[9px] text-slate-600 font-bold">JSS</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Consistent Navbar ──────────────────────────────────── */
const NAV_LINKS = [
  { name: 'Browse Gigs', href: '/freelancex/gigs' },
  { name: 'Features', href: '/freelancex/features' },
  { name: 'Reports', href: '/freelancex/reports' },
];

function Navbar({ authUser, authLoading, onLogout }: { authUser: AuthUser | null; authLoading: boolean; onLogout: () => void; }) {
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
              <Link key={link.name} href={link.href} className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${linkClass}`}>{link.name}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {!authLoading && (
              authUser ? (
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(o => !o)}
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${scrolled ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                    <div className="w-7 h-7 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-black">{avatarLetter}</div>
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
                          <span className={`inline-flex mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${authUser.role === 'CLIENT' ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-purple-400 bg-purple-500/10 border-purple-500/20'}`}>
                            {authUser.role === 'CLIENT' ? 'Client' : 'Freelancer'}
                          </span>
                        </div>
                        <Link href={dashHref} onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                          <LayoutDashboard className="w-4 h-4 text-purple-400" /> Dashboard
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
                    <Link href="/freelancex/signup" onClick={() => setMobileOpen(false)} className="text-xs font-black uppercase tracking-widest py-2 text-purple-400">Create Profile</Link>
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

const popularSkills = ['React', 'Node.js', 'TypeScript', 'Python', 'Flutter', 'AWS', 'PostgreSQL', 'Next.js', 'Vue', 'Go', 'Rust', 'Solidity'];

/* ── Freelancer Detail Panel ─────────────────────────────── */
function FreelancerDetailPanel({ freelancer, reviews, reviewsLoading, authUser, onClose }: {
  freelancer: Freelancer; reviews: Review[]; reviewsLoading: boolean;
  authUser: AuthUser | null; onClose: () => void;
}) {
  const fp = freelancer.freelancerProfile;
  const skills = Array.isArray(fp?.skills) ? fp.skills : [];
  return (
    <motion.div variants={slidePanel} initial="hidden" animate="visible" exit="exit"
      className="fixed inset-y-0 right-0 z-40 w-full sm:w-[500px] lg:w-[540px] bg-[#070d1a] border-l border-white/8 flex flex-col shadow-2xl overflow-hidden mt-18">
      <div className="relative p-5 sm:p-6 border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 to-indigo-600/5" />
        <div className="relative">
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <span className="text-2xl font-black text-white">{fp?.fullName?.[0]?.toUpperCase() || '?'}</span>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-black text-white">{fp?.fullName || 'Freelancer'}</h2>
                <p className="text-xs text-slate-400 mt-0.5 leading-snug line-clamp-1">{fp?.headline || 'Available for work'}</p>
                {fp?.country && <p className="text-[10px] text-slate-600 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" />{fp.country}</p>}
              </div>
            </div>
            <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all shrink-0">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Rate', value: fp?.hourlyRate ? `$${fp.hourlyRate}/h` : '—', icon: DollarSign, color: 'text-emerald-400' },
              { label: 'Exp', value: fp?.experienceYears ? `${fp.experienceYears}y` : '—', icon: Clock, color: 'text-blue-400' },
              { label: 'Jobs', value: fp?.completedJobs ?? '—', icon: Briefcase, color: 'text-purple-400' },
              { label: 'Rating', value: fp?.avgRating ? fp.avgRating.toFixed(1) : '—', icon: Star, color: 'text-amber-400' },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white/[0.03] border border-white/8 rounded-xl p-2.5 text-center">
                <Icon className={`w-3.5 h-3.5 mx-auto mb-1 ${color}`} />
                <p className="text-xs font-black text-white">{value}</p>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest font-bold">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
        {fp?.bio && (
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-1.5"><BookOpen className="w-3 h-3" /> About</p>
            <span className="text-sm text-slate-300 leading-relaxed"><RichDescription text={fp.bio}/></span>
          </div>
        )}
        {skills.length > 0 && (
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2.5 flex items-center gap-1.5"><Tag className="w-3 h-3" /> Skills</p>
            <div className="flex flex-wrap gap-2">
              {skills.map(s => <span key={s} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-xs text-purple-300 font-bold">{s}</span>)}
            </div>
          </div>
        )}
        {fp?.jobSuccessScore && (
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Shield className="w-3 h-3" /> Job Success Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${fp.jobSuccessScore >= 80 ? 'bg-emerald-400' : fp.jobSuccessScore >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                  initial={{ width: 0 }} animate={{ width: `${fp.jobSuccessScore}%` }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
              </div>
              <span className={`text-sm font-black ${fp.jobSuccessScore >= 80 ? 'text-emerald-400' : fp.jobSuccessScore >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{fp.jobSuccessScore}%</span>
            </div>
          </div>
        )}
        {(fp?.githubUrl || fp?.linkedinUrl || fp?.portfolioUrl) && (
          <div>
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2.5">Links</p>
            <div className="flex flex-wrap gap-2">
              {fp?.githubUrl && <a href={fp.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/8 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all"><Github className="w-3.5 h-3.5" /> GitHub</a>}
              {fp?.linkedinUrl && <a href={fp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/8 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all"><Linkedin className="w-3.5 h-3.5" /> LinkedIn</a>}
              {fp?.portfolioUrl && <a href={fp.portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-2 bg-white/5 border border-white/8 rounded-xl text-xs font-bold text-slate-300 hover:text-white hover:border-white/20 transition-all"><Globe className="w-3.5 h-3.5" /> Portfolio</a>}
            </div>
          </div>
        )}
        <div>
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Star className="w-3 h-3" /> Reviews ({fp?.reviewCount ?? 0})</p>
          {reviewsLoading ? (
            <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 text-purple-400 animate-spin" /></div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 bg-white/[0.02] border border-white/5 rounded-2xl">
              <Star className="w-6 h-6 text-slate-700 mx-auto mb-2" />
              <p className="text-xs text-slate-600">No reviews yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map(review => (
                <motion.div key={review.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white/[0.02] border border-white/8 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <p className="text-xs font-bold text-white">{review.client.clientProfile?.companyName || 'Client'}</p>
                      <p className="text-[10px] text-slate-600">{review.gig.title}</p>
                    </div>
                    <div className="shrink-0"><StarRating rating={review.rating} /></div>
                  </div>
                  {review.comment && <p className="text-xs text-slate-400 leading-relaxed italic">"{review.comment}"</p>}
                  <p className="text-[10px] text-slate-700 mt-2">{new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        <div className="text-center text-xs text-slate-600 pb-2">Member since {new Date(freelancer.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
      </div>

      <div className="p-5 sm:p-6 border-t border-white/5 bg-[#070d1a]">
        {!authUser ? (
          <Link href="/freelancex/login" className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20">
            Sign In to Contact <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        ) : authUser.role === 'CLIENT' ? (
          <a
            href={`mailto:${freelancer.email}?subject=${encodeURIComponent(`Opportunity via FreelanceX`)}&body=${encodeURIComponent(
          `Hi ${fp?.fullName || 'Freelancer'},

          I came across your profile on FreelanceX and was impressed with your background.

          I’d like to connect and explore potential collaboration opportunities with you.

          Let me know a convenient time to discuss further.

          Best regards,  
          ${authUser?.clientProfile?.companyName || 'Client'}  
          ${authUser?.email}
          `
            )}`}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-600/20"
          >
            <Briefcase className="w-3.5 h-3.5" /> Outreach Freelancer
          </a>
        ) : (
          <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl">
            <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
            <p className="text-xs text-slate-400">Post a gig to hire freelancers.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ── Freelancer Card ─────────────────────────────────────── */
function FreelancerCard({ freelancer, index, onSelect }: { freelancer: Freelancer; index: number; onSelect: (f: Freelancer) => void }) {
  const fp = freelancer.freelancerProfile;
  const skills = Array.isArray(fp?.skills) ? fp.skills : [];
  const score = fp?.jobSuccessScore ?? 0;
  const hasScore = fp?.jobSuccessScore != null;
  return (
    <motion.div variants={fadeUp} custom={index} initial="hidden" animate="visible"
      onClick={() => onSelect(freelancer)}
      className="group relative bg-white/[0.025] border border-white/8 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:bg-white/[0.04] hover:border-purple-500/25 hover:shadow-lg hover:shadow-purple-600/5 transition-all cursor-pointer overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-indigo-600/0 group-hover:from-purple-600/4 group-hover:to-indigo-600/3 transition-all duration-500 rounded-2xl sm:rounded-3xl" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-md shadow-purple-500/20">
                <span className="text-lg font-black text-white">{fp?.fullName?.[0]?.toUpperCase() || '?'}</span>
              </div>
              {fp?.jobSuccessScore && fp.jobSuccessScore >= 80 && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#020617] flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white group-hover:text-purple-200 transition-colors">{fp?.fullName || 'Freelancer'}</h3>
              {fp?.country && <p className="text-[10px] text-slate-600 flex items-center gap-1 mt-0.5"><MapPin className="w-2.5 h-2.5" />{fp.country}</p>}
            </div>
          </div>
          {fp?.jobSuccessScore ? (
            <div className="relative shrink-0">
              {hasScore && score >= 85 && (
                <div className="px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
                  Top Rated
                </div>
              )}
            </div>
          ) : null}
        </div>
        <p className="text-xs text-slate-400 leading-snug mb-3 line-clamp-1">{fp?.headline || <span className="italic text-slate-600">No headline</span>}</p>
        <div className="flex items-center gap-3 mb-4">
          {fp?.avgRating ? (
            <div className="flex items-center gap-1.5">
              <StarRating rating={fp.avgRating} />
              <span className="text-[11px] font-black text-amber-400">{fp.avgRating.toFixed(1)}</span>
              <span className="text-[10px] text-slate-600">({fp.reviewCount})</span>
            </div>
          ) : <span className="text-[10px] text-slate-600 italic">No reviews yet</span>}
        </div>
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 4).map(s => <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/8 rounded-full text-[10px] text-slate-400 font-mono">{s}</span>)}
            {skills.length > 4 && <span className="text-[10px] text-slate-600 self-center">+{skills.length - 4}</span>}
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-3 text-[11px] text-slate-500">
            {fp?.hourlyRate && <span className="flex items-center gap-1 font-black text-emerald-400"><DollarSign className="w-3 h-3" />${fp.hourlyRate}/hr</span>}
            {fp?.experienceYears && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{fp.experienceYears}yr{fp.experienceYears !== 1 ? 's' : ''}</span>}
            {fp?.completedJobs ? <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{fp.completedJobs} done</span> : null}
          </div>
          <div className="flex items-center gap-2">
            {(fp?.githubUrl || fp?.portfolioUrl) && <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />}
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-purple-400 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ───────────────────────────────────────────── */
export default function BrowseFreelancersPage() {
  const [freelancers, setFreelancers] = useState<Freelancer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minExp, setMinExp] = useState('');
  const [country, setCountry] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'rate_asc' | 'rate_desc' | 'jobs'>('jobs');
  const [selectedFreelancer, setSelectedFreelancer] = useState<Freelancer | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [editingGig, setEditingGig] = useState<Gig | null>(null);
  const [gigModalOpen, setGigModalOpen] = useState(false);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [gigsLoading, setGigsLoading] = useState(true);
  const isFetchingRef = useRef(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/freelancex/auth/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null).then(d => { if (d) setAuthUser(d); }).catch(() => {}).finally(() => setAuthLoading(false));
  }, []);

   const fetchGigs = async () => {
      setGigsLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/freelancex/client/gigs`, { credentials: 'include' });
        if (res.ok) setGigs(await res.json());
      } catch {}
      finally { setGigsLoading(false); }
    };
  
    useEffect(() => { fetchGigs(); }, []);
  

    const handleCreateGig = async (data: any) => {
      const res = await fetch(`${API_BASE}/api/freelancex/gigs`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to create gig');
      await fetchGigs();
    };

    const handleUpdateGig = async (data: any) => {
      const res = await fetch(`${API_BASE}/api/freelancex/gigs/${editingGig!.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to update gig');
      await fetchGigs();
    };


  const fetchFreelancers = useCallback(async (cursor?: string) => {
    const params = new URLSearchParams();
    
    // Text search — name, headline, bio
    if (query) params.set('q', query);
    
    // Skill filter — sent as separate param
    if (skillFilter) params.set('skills', skillFilter);
    
    if (minRate) params.set('minRate', minRate);
    if (maxRate) params.set('maxRate', maxRate);
    if (minExp) params.set('minExp', minExp);
    if (country) params.set('country', country);
    if (cursor) params.set('cursor', cursor);
    params.set('limit', '16');
    
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/freelancers?${params}`, { credentials: 'include' });
      const data = await res.json();
      let list: Freelancer[] = data.freelancers || [];
      
      // Client-side sort (since backend may not support it)
      list = [...list].sort((a, b) => {
        const ap = a.freelancerProfile, bp = b.freelancerProfile;
        if (sortBy === 'rating') return (bp?.avgRating ?? 0) - (ap?.avgRating ?? 0);
        if (sortBy === 'rate_asc') return (ap?.hourlyRate ?? 0) - (bp?.hourlyRate ?? 0);
        if (sortBy === 'rate_desc') return (bp?.hourlyRate ?? 0) - (ap?.hourlyRate ?? 0);
        if (sortBy === 'jobs') return (bp?.completedJobs ?? 0) - (ap?.completedJobs ?? 0);
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      if (cursor) {
        setFreelancers(prev => [...prev, ...list]);
      } else {
        setFreelancers(list); // fresh results — don't append on new search
      }
      setNextCursor(data.nextCursor);
      setHasMore(data.hasMore);
    } catch {}
  }, [query, skillFilter, minRate, maxRate, minExp, country, sortBy]);

  useEffect(() => {
    setLoading(true); setFreelancers([]);
    fetchFreelancers().finally(() => setLoading(false));
  }, [fetchFreelancers]);

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor || isFetchingRef.current) return;
    isFetchingRef.current = true; setLoadingMore(true);
    try { await fetchFreelancers(nextCursor); } finally { setLoadingMore(false); isFetchingRef.current = false; }
  }, [hasMore, nextCursor, fetchFreelancers]);

  const lastElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loadingMore) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => { if (entries[0].isIntersecting && hasMore) loadMore(); }, { rootMargin: '200px', threshold: 0 });
    if (node) observerRef.current.observe(node);
  }, [loadMore, hasMore, loadingMore]);

  const onPostGig = () => {
    setEditingGig(null); setGigModalOpen(true);
  }

  const handleSelectFreelancer = async (f: Freelancer) => {
    setSelectedFreelancer(f); setReviews([]); setReviewsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/freelancers/${f.id}/reviews`);
      if (res.ok) setReviews(await res.json());
    } catch {} finally { setReviewsLoading(false); }
  };

  const clearFilters = () => { 
    setSearch(''); 
    setQuery('');   // ← this was missing! Without it, fetchFreelancers re-runs with old query
    setSkillFilter(''); 
    setMinRate(''); 
    setMaxRate(''); 
    setMinExp(''); 
    setCountry(''); 
  };
  const hasActiveFilters = search || skillFilter || minRate || maxRate || minExp || country;

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch(`${API_BASE}/api/freelancex/auth/logout`, { method: 'POST', credentials: 'include' });
    setAuthUser(null); setLogoutLoading(false);
  };

  const topRated = freelancers.filter(f => (f.freelancerProfile?.avgRating ?? 0) >= 4.5).length;

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-purple-500/30">

      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] bg-purple-600/6 blur-[170px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] bg-indigo-600/5 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:55px_55px]" />
      </div>

      <Navbar authUser={authUser} authLoading={authLoading} onLogout={handleLogout} />

      {/* ── HERO SECTION ── */}
      <section className="relative z-10 pt-28 sm:pt-36 pb-16 sm:pb-20 overflow-hidden">
        {/* Hero-specific glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-purple-600/10 via-indigo-600/5 to-transparent blur-3xl" />
          <motion.div
            animate={{ rotate: -360 }} transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-[-5%] w-[600px] h-[600px] opacity-8"
            style={{ background: 'conic-gradient(from 0deg, transparent 75%, #a855f7, transparent)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left: copy */}
            <div>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300 text-[11px] font-black uppercase tracking-[0.18em] mb-7">
                <Sparkles className="w-3.5 h-3.5" />
                {loading ? 'Loading...' : <><AnimatedCounter value={1956} />+ Verified Experts</>}
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.04] mb-5">
                Hire talent that<br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
                    actually delivers.
                  </span>
                  <motion.span initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                    transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400 origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}
                className="text-slate-400 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Stop gambling with hires. Every freelancer on FreelanceX is verified, rated by real clients, and ready to ship — not just talk about it.
              </motion.p>

              {/* Social proof row */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
                className="flex items-center gap-4 mb-8">
                <ProfileStack />
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                    <span className="text-xs font-black text-white ml-1">4.9</span>
                  </div>
                  <p className="text-[11px] text-slate-500">Trusted by <span className="text-white font-bold">2,400+</span> businesses</p>
                </div>
              </motion.div>

              {/* Trust signals */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                className="flex flex-wrap items-center gap-4 mb-10">
                {[
                  { icon: Shield, text: 'Identity verified', color: 'text-emerald-400' },
                  { icon: Award, text: 'Skill-tested pros', color: 'text-purple-400' },
                  { icon: Zap, text: 'Start within 24hrs', color: 'text-amber-400' },
                ].map(({ icon: Icon, text, color }) => (
                  <div key={text} className="flex items-center gap-1.5 text-[12px] text-slate-400 font-medium">
                    <Icon className={`w-3.5 h-3.5 ${color}`} />
                    {text}
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46, duration: 0.5 }}
                className="flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('freelancers-grid');
                    if (el) {
                      const yOffset = -80; // tweak this value
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;

                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className="group flex items-center gap-2 px-6 py-3.5 bg-purple-600 hover:bg-purple-500 rounded-2xl text-sm font-black text-white transition-all shadow-lg shadow-purple-600/30 uppercase tracking-widest"
                >
                  Browse All Experts
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                {authUser?.role === 'CLIENT' && (
                  <div
                    onClick={onPostGig}
                    className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl text-sm font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest">
                    Post a Gig
                  </div>
                )}
                {!authUser && (
                  <Link href="/freelancex/signup"
                    className="flex items-center gap-2 px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl text-sm font-black text-slate-300 hover:text-white transition-all uppercase tracking-widest">
                    Sign Up Free
                  </Link>
                )}
              </motion.div>
            </div>

            {/* Right: floating freelancer cards */}
            <div className="hidden lg:flex flex-col gap-4 items-end relative">

              {/* Floating glow behind cards */}
              <div className="absolute inset-0 bg-gradient-radial from-purple-600/10 to-transparent blur-2xl rounded-full" />

              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0 }}>
                <HeroCard name="Arjun Sharma" role="Full Stack Developer" rate={95} score={98} letter="A" color="from-indigo-500 to-blue-600" delay={0.5} />
              </motion.div>

              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }} className="ml-8">
                <HeroCard name="Riya Patel" role="UI/UX Designer" rate={75} score={94} letter="R" color="from-pink-500 to-rose-600" delay={0.65} />
              </motion.div>

              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}>
                <HeroCard name="Sam Okonkwo" role="Blockchain Engineer" rate={130} score={91} letter="S" color="from-amber-500 to-orange-500" delay={0.8} />
              </motion.div>

              {/* Live hire notification */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-xl self-start ml-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-[11px] font-bold text-emerald-300">Client just hired · 5m ago</span>
              </motion.div>

              {/* Stats */}
              <div className="flex gap-3 self-end">
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}>
                  <FloatPill icon={TrendingUp} value="94%" label="Hire Success Rate" color="bg-purple-600" delay={1.1} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* ── Search bar ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58, duration: 0.55 }}
            className="mt-10 max-w-3xl space-y-2">
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/12 rounded-2xl p-2 shadow-2xl backdrop-blur-sm focus-within:border-purple-500/50 focus-within:bg-white/[0.07] transition-all">
              <Search className="w-4 h-4 text-slate-500 ml-2 shrink-0" />
              <input type="text" placeholder="Search by name, skill, or expertise..."
                value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => { 
                  if (e.key === 'Enter') { 
                    setQuery(search); 
                    setSkillFilter(''); 
                  } 
                }}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-600 outline-none py-2 min-w-0" />
              {search && (
                <button onClick={() => { setSearch(''); setQuery(''); }} className="p-1.5 hover:bg-white/5 rounded-lg transition-all">
                  <X className="w-3.5 h-3.5 text-slate-500" />
                </button>
              )}
              <button onClick={() => { setQuery(search); setSkillFilter(''); }} 
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-black text-white uppercase tracking-widest transition-all shrink-0 shadow-lg shadow-purple-600/25">
                Search
              </button>
              <motion.button onClick={() => setShowFilters(!showFilters)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${showFilters || hasActiveFilters ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'}`}>
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:block">Filters</span>
                {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </motion.button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ opacity: 0, height: 0, y: -8 }} animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden">
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 backdrop-blur-xl">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { key: 'minRate', label: 'Min Rate ($/hr)', placeholder: '20', state: minRate, set: setMinRate },
                        { key: 'maxRate', label: 'Max Rate ($/hr)', placeholder: '200', state: maxRate, set: setMaxRate },
                        { key: 'minExp', label: 'Min Exp (yrs)', placeholder: '2', state: minExp, set: setMinExp },
                        { key: 'country', label: 'Country', placeholder: 'India, USA...', state: country, set: setCountry },
                      ].map(({ key, label, placeholder, state, set }) => (
                        <div key={key} className="space-y-1 group">
                          <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-focus-within:text-purple-400 transition-colors">{label}</label>
                          <input type={key === 'country' ? 'text' : 'number'} placeholder={placeholder} value={state} onChange={e => set(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-purple-500/50 outline-none transition-all placeholder:text-slate-700" />
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Filter by Skill</p>
                      <div className="flex flex-wrap gap-1.5">
                        {popularSkills.map(s => (
                          <motion.button key={s} onClick={() => setSkillFilter(skillFilter === s ? '' : s)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black border transition-all ${skillFilter === s ? 'bg-purple-600 border-purple-500 text-white shadow-sm shadow-purple-600/30' : 'bg-white/[0.04] border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-purple-300'}`}>
                            {s}
                          </motion.button>
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

            {!showFilters && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}
                className="flex flex-wrap gap-2 mt-2">
                <span className="text-[10px] text-slate-600 font-black uppercase tracking-widest self-center">Skills:</span>
                {popularSkills.slice(0, 7).map(s => (
                  <motion.button key={s} onClick={() => setSkillFilter(skillFilter === s ? '' : s)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black border transition-all ${skillFilter === s ? 'bg-purple-600 border-purple-500 text-white' : 'bg-white/[0.04] border-white/10 text-slate-400 hover:border-purple-500/40 hover:text-purple-300'}`}>
                    {s}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <div id="freelancers-grid" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <p className="text-xs text-slate-500 font-bold">
            {loading ? 'Searching...' : `${freelancers.length} freelancer${freelancers.length !== 1 ? 's' : ''} found`}
            {hasActiveFilters && <span className="text-purple-400 ml-1">· filtered</span>}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-black text-red-400 hover:bg-red-500/15 transition-all"
              >
                <X className="w-3 h-3" /> Clear All Filters
              </button>
            )}
            <div className="flex items-center gap-2">
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest hidden sm:block">Sort:</p>
              <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-300 font-bold outline-none focus:border-purple-500/40 transition-all">
                <option value="rate_asc" className="bg-[#0c1120]">Rate: Low → High</option>
                <option value="rate_desc" className="bg-[#0c1120]">Rate: High → Low</option>
                <option value="jobs" className="bg-[#0c1120]">Most Jobs Done</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-white/5 rounded-lg w-3/4" />
                    <div className="h-2 bg-white/5 rounded-lg w-1/2" />
                  </div>
                </div>
                <div className="h-3 bg-white/5 rounded-lg mb-2 w-full" />
                <div className="flex gap-1.5 mt-3">{[1,2,3].map(j => <div key={j} className="h-5 w-14 bg-white/5 rounded-full" />)}</div>
              </div>
            ))}
          </div>
        ) : freelancers.length === 0 ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-5">
              <Users className="w-7 h-7 text-slate-600" />
            </div>
            <p className="text-white font-black text-lg mb-2">No freelancers found</p>
            <p className="text-slate-500 text-sm">Try adjusting your search or filters.</p>
            <button onClick={clearFilters} className="mt-5 px-5 py-2.5 bg-purple-600/20 border border-purple-500/30 rounded-xl text-xs font-black text-purple-400 hover:bg-purple-600/30 transition-all">Reset Filters</button>
          </motion.div>
        ) : (
          <>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {freelancers.map((f, i) => <FreelancerCard key={f.id} freelancer={f} index={i} onSelect={handleSelectFreelancer} />)}
            </motion.div>
            <div ref={lastElementRef} className="h-10" />
            {hasMore && (
              <div className="flex justify-center mt-10">
                <motion.button onClick={loadMore} disabled={loadingMore} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-black text-slate-300 hover:bg-white/10 hover:text-white transition-all uppercase tracking-widest">
                  {loadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <><RefreshCw className="w-4 h-4" />Load More</>}
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Detail Panel ── */}
      <AnimatePresence>
        {selectedFreelancer && (
          <>
            <motion.div className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedFreelancer(null)} />
            <FreelancerDetailPanel freelancer={selectedFreelancer} reviews={reviews} reviewsLoading={reviewsLoading} authUser={authUser} onClose={() => setSelectedFreelancer(null)} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {gigModalOpen && (
          <GigModal gig={editingGig} onClose={() => { setGigModalOpen(false); setEditingGig(null); }}
            onSave={editingGig ? handleUpdateGig : handleCreateGig} />
        )}
      </AnimatePresence>
    </main>
  );
}