'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Mail, Phone, Github, Linkedin, Briefcase,
  Code2, Edit3, Save, X, Plus, Loader2, CheckCircle2, AlertCircle,
  ChevronRight, Clock, Building2, MapPin, LogOut, ExternalLink,
  TrendingUp, Award, Zap, FileText, Eye, Star, BarChart3,
  Sparkles, Search, ChevronDown, LayoutDashboard, Menu
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface CandidateProfile {
  id: string; email: string; phone?: string; role: 'CANDIDATE';
  isVerified: boolean; createdAt: string;
  candidateProfile?: {
    fullName: string; headline?: string; skills?: string[];
    githubUrl?: string; linkedinUrl?: string; experienceYears?: number;
  };
}
interface Application {
  id: string; status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED';
  resumeUrl?: string; createdAt: string;
  job: { id: string; title: string; company: string; location: string };
}

/* ─── Constants ─────────────────────────────────────────────────────────── */
const statusConfig = {
  APPLIED:     { label: 'Applied',     bg: 'bg-sky-500/10',     text: 'text-sky-300',     border: 'border-sky-500/20',    dot: 'bg-sky-400' },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  REJECTED:    { label: 'Rejected',    bg: 'bg-rose-500/10',    text: 'text-rose-300',    border: 'border-rose-500/20',   dot: 'bg-rose-400' },
};

const NAV_LINKS = [
  { name: 'Jobs', href: '/hirex/jobs' },
  { name: 'AI Tests', href: '/hirex/ai-skill-tests' },
  { name: 'Insights', href: '/hirex/hiring-insights' },
];

/* ─── Sub-components ─────────────────────────────────────────────────────── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-5 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl text-sm font-semibold backdrop-blur-xl ${
        type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/80 border-rose-500/30 text-rose-300'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

function SkillPill({ label, onRemove }: { label: string; onRemove?: () => void }) {
  return (
    <motion.span layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold
        bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-violet-200"
    >
      {label}
      {onRemove && <button onClick={onRemove} className="hover:text-rose-400 transition-colors"><X className="w-3 h-3" /></button>}
    </motion.span>
  );
}

/* ─── Navbar (consistent with HireX home navbar style) ──────────────────── */
function Navbar({ user, onLogout }: { user: CandidateProfile | null; onLogout: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'}`}>
      <nav className={`max-w-7xl mx-auto transition-all duration-500 ${
        scrolled
          ? 'max-w-full rounded-none bg-[#03071a]/95 border-b border-white/8 shadow-xl shadow-black/40 backdrop-blur-2xl px-8'
          : 'bg-[#03071a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/30 px-6'
      }`}>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo isSticky={scrolled} />

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <Link key={link.name} href={link.href}
                className="px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
              >{link.name}</Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">

            {user && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(o => !o)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white text-xs font-black">
                    {user.candidateProfile?.fullName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold text-slate-200 max-w-[100px] truncate">
                    {user.candidateProfile?.fullName || user.email}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.97 }}
                      transition={{ duration: 0.16 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#06101f] border border-white/10 shadow-2xl py-1 z-50 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                        <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[9px] font-black uppercase tracking-wider">Candidate</span>
                      </div>
                      <Link href="/hirex/dashboard/candidate" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-violet-400" />Dashboard
                      </Link>
                      <div className="border-t border-white/5 mt-1" />
                      <button onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/5 transition-all"
                      >
                        <LogOut className="w-4 h-4" />Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/8 overflow-hidden"
            >
              <div className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >{link.name}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#03071a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/30 px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo isSticky={false} />

          {/* Nav links skeleton */}
          <div className="hidden md:flex items-center gap-1">
            {[48, 60, 56].map((w, i) => (
              <div key={i} className="h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>

          {/* Right side skeleton */}
          <div className="flex items-center gap-2">
            {/* Avatar pill */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
              <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.06]" />
              <div className="hidden sm:block h-3.5 w-24 rounded skeleton-shimmer bg-white/[0.06]" />
              <div className="h-3 w-3 rounded skeleton-shimmer bg-white/[0.06]" />
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden w-8 h-8 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export default function CandidateProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<CandidateProfile | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'applications'>('profile');
  const [form, setForm] = useState({ headline: '', skills: [] as string[], githubUrl: '', linkedinUrl: '', experienceYears: '' });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [meRes, appsRes] = await Promise.all([
          fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' }),
          fetch(`${API_BASE}/api/hirex/candidate/applications`, { credentials: 'include' }),
        ]);
        if (!meRes.ok) { router.push('/hirex/login'); return; }
        const meData: CandidateProfile = await meRes.json();
        if (meData.role !== 'CANDIDATE') { router.push('/hirex/dashboard/recruiter'); return; }
        setUser(meData);
        const cp = meData.candidateProfile;
        setForm({ headline: cp?.headline || '', skills: (cp?.skills as string[]) || [], githubUrl: cp?.githubUrl || '', linkedinUrl: cp?.linkedinUrl || '', experienceYears: cp?.experienceYears?.toString() || '' });
        if (appsRes.ok) setApplications(await appsRes.json());
      } catch { router.push('/hirex/login'); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/candidate/profile`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ headline: form.headline || undefined, skills: form.skills, githubUrl: form.githubUrl || undefined, linkedinUrl: form.linkedinUrl || undefined, experienceYears: form.experienceYears ? parseInt(form.experienceYears) : undefined }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(prev => prev ? { ...prev, candidateProfile: { ...prev.candidateProfile, fullName: prev.candidateProfile?.fullName || '', ...updated } } : prev);
      setEditing(false); setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch { setToast({ message: 'Failed to save. Try again.', type: 'error' }); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/hirex/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/hirex');
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !form.skills.includes(s)) setForm(f => ({ ...f, skills: [...f.skills, s] }));
    setNewSkill('');
  };

  const stats = {
    total: applications.length,
    shortlisted: applications.filter(a => a.status === 'SHORTLISTED').length,
    applied: applications.filter(a => a.status === 'APPLIED').length,
  };

  const cp = user?.candidateProfile;
  const initials = cp?.fullName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || '?';

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#03071a] flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="relative w-14 h-14">
  //           <div className="w-14 h-14 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
  //           <div className="absolute inset-2 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20" />
  //         </div>
  //         <p className="text-slate-500 text-sm font-medium">Preparing your workspace…</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) return (
  <div className="min-h-screen bg-[#03071a]" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
    <NavbarSkeleton/>
    {/* Background */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-700/10 blur-[150px]" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">

      {/* ── Hero skeleton ── */}
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-gradient-to-br from-violet-950/60 via-[#06101f] to-cyan-950/40 border border-white/[0.07] p-7 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center flex-1 min-w-0">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl skeleton-shimmer bg-white/[0.04] shrink-0" />
            <div className="space-y-3 flex-1">
              {/* Name + badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-48 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                <div className="h-6 w-20 rounded-full skeleton-shimmer bg-white/[0.04]" />
              </div>
              {/* Headline */}
              <div className="h-4 w-64 rounded skeleton-shimmer bg-white/[0.04]" />
              {/* Meta row */}
              <div className="flex flex-wrap gap-4">
                <div className="h-3.5 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3.5 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3.5 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="flex flex-col gap-3 shrink-0">
            <div className="h-11 w-36 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
              <div className="h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
        </div>

        {/* Skills strip */}
        <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
          {[72, 56, 88, 64, 80, 48].map((w, i) => (
            <div key={i} className="h-8 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>

      {/* ── Stat cards skeleton ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 space-y-3">
            <div className="w-8 h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-8 w-10 rounded skeleton-shimmer bg-white/[0.04]" />
            <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>
        ))}
      </div>

      {/* ── Tab bar skeleton ── */}
      <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl w-fit mb-6">
        <div className="h-10 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
        <div className="h-10 w-36 rounded-xl skeleton-shimmer bg-white/[0.04]" />
      </div>

      {/* ── Profile tab content skeleton ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Skills card */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
            <div className="h-4 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>
          <div className="flex flex-wrap gap-2">
            {[72, 56, 88, 64, 80, 48, 96, 60].map((w, i) => (
              <div key={i} className="h-8 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>
        </div>

        {/* Experience & Links card */}
        <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
            <div className="h-4 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>
          {/* Experience row */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
            <div className="space-y-2">
              <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-5 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
          {/* GitHub row */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-12 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-4 w-44 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
          {/* LinkedIn row */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
            <div className="space-y-2 flex-1">
              <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-4 w-52 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-[#03071a] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Deep space background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-cyan-600/8 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-700/8 blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cgrid)" />
        </svg>
      </div>

      <Navbar user={user} onLogout={handleLogout} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">

        {/* ══════════════════════════════════════════════════════ HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl mb-6"
        >
          {/* Background gradient card */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-[#06101f] to-cyan-950/40 rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl border border-white/[0.07]" />
          {/* Glow orb */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-violet-500/15 blur-[80px] rounded-full" />
          <div className="absolute -bottom-8 left-1/4 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full" />

          <div className="relative z-10 p-7 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

              {/* Avatar + identity */}
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  {/* Animated ring */}
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-violet-500 via-cyan-500 to-indigo-500 opacity-40 animate-pulse" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-600/50 to-cyan-600/40 border border-white/10 flex items-center justify-center text-3xl font-black text-white">
                    {initials}
                  </div>
                  {user?.isVerified && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border-2 border-[#03071a] flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {cp?.fullName || 'Set Your Name'}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-[10px] font-black uppercase tracking-widest">
                      Candidate
                    </span>
                  </div>
                  {cp?.headline ? (
                    <p className="text-slate-400 text-sm sm:text-base font-medium mb-3">{cp.headline}</p>
                  ) : (
                    <p className="text-slate-600 text-sm italic mb-3">Add a professional headline…</p>
                  )}
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Mail className="w-3 h-3 text-violet-400/60" />{user?.email}</span>
                    {cp?.experienceYears != null && (
                      <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Briefcase className="w-3 h-3 text-cyan-400/60" />{cp.experienceYears}yr exp</span>
                    )}
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Clock className="w-3 h-3 text-indigo-400/60" />
                      Joined {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: CTA cluster */}
              <div className="flex flex-col gap-3 flex-shrink-0">
                <button
                  onClick={() => setEditing(!editing)}
                  className={`group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                    editing
                      ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white'
                      : 'bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-lg shadow-violet-900/40 hover:shadow-violet-900/60 hover:scale-[1.02]'
                  }`}
                >
                  {editing ? <><X className="w-4 h-4" />Cancel</> : <><Edit3 className="w-4 h-4" />Edit Profile</>}
                </button>
                {!editing && (cp?.githubUrl || cp?.linkedinUrl) && (
                  <div className="flex gap-2">
                    {cp?.githubUrl && (
                      <a href={cp.githubUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 text-xs font-bold transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />GitHub
                      </a>
                    )}
                    {cp?.linkedinUrl && (
                      <a href={cp.linkedinUrl} target="_blank" rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-sky-500/10 border border-sky-500/20 hover:border-sky-500/40 text-sky-300 text-xs font-bold transition-all"
                      >
                        <Linkedin className="w-3.5 h-3.5" />LinkedIn
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Skills strip */}
            {(cp?.skills as string[] || []).length > 0 && !editing && (
              <div className="mt-6 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                {(cp?.skills as string[] || []).map((s, i) => (
                  <motion.span key={s} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                    className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-violet-200"
                  >{s}</motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════ EDIT FORM */}
        <AnimatePresence>
          {editing && (
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-950/40 to-cyan-950/20 p-7 sm:p-9 mb-6 backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-7">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-500 to-cyan-500" />
                <h2 className="font-black text-white text-sm tracking-tight">Edit Profile Details</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
                {[
                  { label: 'Professional Headline', field: 'headline', placeholder: 'e.g. Full-Stack Engineer · React · Node.js', span: 2 },
                ].map(({ label, field, placeholder, span }) => (
                  <div key={field} className={`${span === 2 ? 'sm:col-span-2' : ''} space-y-2`}>
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">{label}</label>
                    <input type="text" placeholder={placeholder}
                      className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                      value={form[field as keyof typeof form] as string}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Years of Experience</label>
                  <input type="number" min={0} max={50} placeholder="3"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                    value={form.experienceYears} onChange={e => setForm(f => ({ ...f, experienceYears: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Github className="w-3 h-3" />GitHub URL</label>
                  <input type="url" placeholder="https://github.com/username"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                    value={form.githubUrl} onChange={e => setForm(f => ({ ...f, githubUrl: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Linkedin className="w-3 h-3" />LinkedIn URL</label>
                  <input type="url" placeholder="https://linkedin.com/in/username"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500/40 focus:ring-1 focus:ring-violet-500/20 transition-all"
                    value={form.linkedinUrl} onChange={e => setForm(f => ({ ...f, linkedinUrl: e.target.value }))}
                  />
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Code2 className="w-3 h-3" />Skills</label>
                  <div className="flex flex-wrap gap-2 min-h-[2rem]">
                    <AnimatePresence>
                      {form.skills.map(s => <SkillPill key={s} label={s} onRemove={() => setForm(f => ({ ...f, skills: f.skills.filter(x => x !== s) }))} />)}
                    </AnimatePresence>
                  </div>
                  <div className="flex gap-2">
                    <input type="text" placeholder="Add a skill (e.g. React, Python…)"
                      className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-violet-500/40 transition-all"
                      value={newSkill} onChange={e => setNewSkill(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    />
                    <button onClick={addSkill}
                      className="px-4 py-2.5 rounded-xl bg-violet-600/20 border border-violet-500/25 text-violet-300 hover:bg-violet-600/35 transition-all text-sm font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />Add
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-white/5">
                <button onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm font-bold transition-all">
                  Cancel
                </button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════ STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Applied', value: stats.total, icon: FileText, from: 'from-sky-500', to: 'to-indigo-500', glow: 'shadow-sky-900/30' },
            { label: 'Shortlisted', value: stats.shortlisted, icon: Star, from: 'from-emerald-500', to: 'to-teal-500', glow: 'shadow-emerald-900/30' },
            { label: 'In Review', value: stats.applied, icon: Eye, from: 'from-amber-500', to: 'to-orange-500', glow: 'shadow-amber-900/30' },
            { label: 'Skills Listed', value: (cp?.skills as string[] || []).length, icon: Zap, from: 'from-violet-500', to: 'to-cyan-500', glow: 'shadow-violet-900/30' },
          ].map(({ label, value, icon: Icon, from, to, glow }, i) => (
            <motion.div key={label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
              className="relative overflow-hidden group rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 hover:border-white/[0.12] transition-all hover:-translate-y-0.5"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${from} ${to} opacity-0 group-hover:opacity-8 blur-2xl transition-opacity duration-500`} />
              <div className={`w-8 h-8 mb-3 rounded-xl bg-gradient-to-br ${from} ${to} shadow-lg ${glow} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <p className="text-3xl font-black text-white mb-0.5">{value}</p>
              <p className="text-[11px] text-slate-500 font-semibold">{label}</p>
            </motion.div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════ TABS */}
        <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl w-fit mb-6">
          {(['profile', 'applications'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {activeTab === tab && (
                <motion.div layoutId="c-tab-bg" className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab === 'profile' ? <User className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                {tab === 'profile' ? 'Profile' : `Applications${applications.length > 0 ? ` (${applications.length})` : ''}`}
              </span>
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════ TAB CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div key="profile-tab" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {/* Skills Card */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-40 h-40 bg-violet-600/5 blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-black text-white text-sm">Technical Skills</h3>
                </div>
                {(cp?.skills as string[] || []).length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {(cp?.skills as string[] || []).map((s, i) => (
                      <motion.span key={s} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}
                        className="px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500/10 to-cyan-500/10 border border-violet-500/20 text-violet-200"
                      >{s}</motion.span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-center">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
                      <Code2 className="w-5 h-5 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm mb-2">No skills added yet</p>
                    <button onClick={() => setEditing(true)} className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">+ Add your first skill</button>
                  </div>
                )}
              </div>

              {/* Experience & Links Card */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 space-y-3 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-600/5 blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-indigo-500 flex items-center justify-center">
                    <TrendingUp className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-black text-white text-sm">Experience & Links</h3>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/20 flex items-center justify-center">
                    <Award className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">Experience</p>
                    <p className="text-white font-black text-base">
                      {cp?.experienceYears != null ? `${cp.experienceYears} Year${cp.experienceYears !== 1 ? 's' : ''}` : <span className="text-slate-600 font-normal italic text-sm">Not specified</span>}
                    </p>
                  </div>
                </div>

                {cp?.githubUrl ? (
                  <a href={cp.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <Github className="w-4 h-4 text-slate-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">GitHub</p>
                      <p className="text-white font-semibold text-sm truncate">{cp.githubUrl.replace('https://', '')}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
                  </a>
                ) : null}

                {cp?.linkedinUrl ? (
                  <a href={cp.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-sky-500/5 border border-sky-500/15 hover:border-sky-500/30 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                      <Linkedin className="w-4 h-4 text-sky-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">LinkedIn</p>
                      <p className="text-sky-300 font-semibold text-sm truncate">{cp.linkedinUrl.replace('https://', '')}</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 transition-colors" />
                  </a>
                ) : null}

                {!cp?.githubUrl && !cp?.linkedinUrl && (
                  <div className="flex flex-col items-center py-6 text-center border border-dashed border-white/8 rounded-xl">
                    <p className="text-slate-500 text-sm mb-1.5">No social links added</p>
                    <button onClick={() => setEditing(true)} className="text-violet-400 hover:text-violet-300 text-xs font-bold transition-colors">+ Add links</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'applications' && (
            <motion.div key="apps-tab" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {applications.length === 0 ? (
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] py-20 flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-7 h-7 text-violet-400" />
                    </div>
                    <h3 className="text-white font-black text-xl mb-2">Your Journey Starts Here</h3>
                    <p className="text-slate-500 text-sm max-w-xs mb-6">Thousands of roles are waiting. Apply once, get discovered by the best companies.</p>
                    <Link href="/hirex/jobs"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50 hover:scale-[1.02] transition-all"
                    >
                      Browse Jobs <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {applications.map((app, i) => {
                    const s = statusConfig[app.status];
                    return (
                      <motion.div key={app.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-white/[0.1] transition-all group"
                      >
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-500/10 border border-violet-500/20 flex items-center justify-center text-base font-black text-violet-300 flex-shrink-0">
                          {app.job.company.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h4 className="text-white font-bold text-sm">{app.job.title}</h4>
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black border ${s.bg} ${s.text} ${s.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{app.job.company}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.job.location}</span>
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {app.resumeUrl && (
                            <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-xs font-semibold transition-all"
                            >
                              <FileText className="w-3.5 h-3.5" />Resume
                            </a>
                          )}
                          <Link href={`/hirex/jobs/${app.job.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600/10 border border-violet-500/20 hover:border-violet-500/40 text-violet-300 text-xs font-bold transition-all"
                          >
                            View <ChevronRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.05] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-xs">© 2015–{new Date().getFullYear()} CLC HireX · Built for the ambitious.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest">All Systems Nominal</span>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </div>
  );
}