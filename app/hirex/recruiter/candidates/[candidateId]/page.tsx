'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Mail, Phone, Github, Linkedin, Briefcase, Code2,
  CheckCircle2, AlertCircle, Loader2, Zap, Clock, ExternalLink,
  Users, MapPin, Wifi, FileText, Eye, Building2, Star,
  TrendingUp, ChevronDown, Shield, Award, Target, BarChart3,
  LogOut, LayoutDashboard, Menu, X, Bell, ChevronRight,
  Sparkles, Crown, ArrowUpRight, Copy, Check,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ── */
type AppStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED';

interface CandidateDetail {
  id: string; email: string; phone?: string; createdAt: string;
  candidateProfile?: {
    fullName: string; headline?: string; skills?: string[];
    experienceYears?: number; githubUrl?: string; linkedinUrl?: string;
  };
  applications: {
    id: string; status: AppStatus; resumeUrl?: string; createdAt: string;
    job: {
      id: string; title: string; company: string; location: string;
      isRemote: boolean; skills: string[]; salaryMin?: number; salaryMax?: number; postedById: string;
    };
  }[];
}

/* ── Animation variants ── */
const cardIn = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.48, delay: 0.07, ease: [0.22, 1, 0.36, 1] as const } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

/* ── Status config ── */
const statusCfg: Record<AppStatus, { label: string; bg: string; text: string; border: string; dot: string; glow: string }> = {
  APPLIED:     { label: 'Applied',     bg: 'bg-blue-500/15',    text: 'text-blue-400',    border: 'border-blue-500/30',    dot: 'bg-blue-400',    glow: 'shadow-blue-500/20'    },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-blue-500/30', dot: 'bg-emerald-400', glow: 'shadow-emerald-500/20' },
  REJECTED:    { label: 'Rejected',    bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/30',     dot: 'bg-red-400',     glow: 'shadow-red-500/20'     },
};

// Add above CandidateDetailPage
function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6">
        <div className="flex items-center justify-between h-16">
          <Logo isSticky={false} />
          <div className="hidden md:flex items-center gap-1">
            {[72, 48, 60].map((w, i) => (
              <div key={i} className="h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.06]" />
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
              <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.06]" />
              <div className="hidden sm:block h-3.5 w-20 rounded skeleton-shimmer bg-white/[0.06]" />
              <div className="h-3 w-3 rounded skeleton-shimmer bg-white/[0.06]" />
            </div>
            <div className="md:hidden w-8 h-8 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ── Navbar ── */
function RecruiterNavbar() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null).then(d => setUser(d)).catch(() => {});
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/hirex/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/hirex');
  };

  const NAV_LINKS = [
    { name: 'Candidates', href: '/hirex/recruiter/candidates', active: true },
    { name: 'Jobs', href: '/hirex/jobs' },
    { name: 'AI Tests', href: '/hirex/ai-skill-tests' },
  ];

  return (
    <header className={`fixed left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'
    }`}>
      <nav className={`max-w-7xl mx-auto transition-all duration-500 ${
        scrolled
          ? 'max-w-full rounded-none bg-[#020617]/95 border-b border-white/8 shadow-xl backdrop-blur-2xl px-8'
          : 'bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6'
      }`}>
        <div className="flex items-center justify-between h-16">
          <Logo isSticky={scrolled} />

          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(l => (
              <Link key={l.name} href={l.href}
                className={`relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all rounded-xl ${
                  l.active ? 'text-blue-400 bg-blue-500/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.name}
                {l.active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <Link href="/hirex/jobs/new"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30"
            >
              <Briefcase className="w-3.5 h-3.5" />Post Job
            </Link>
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(o => !o)}
                  className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-xs font-black uppercase">
                    {user?.name?.charAt(0) || user?.email?.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold text-slate-200 max-w-[80px] truncate">{user?.name || user?.email}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#071428] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Recruiter Account</p>
                        <p className="text-xs font-bold text-white truncate mt-0.5">{user?.email}</p>
                      </div>
                      <Link href="/hirex/dashboard/recruiter" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-400" />Dashboard
                      </Link>
                      <div className="border-t border-white/5 mt-1" />
                      <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all"
                      >
                        <LogOut className="w-4 h-4" />Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
            <button className="md:hidden p-2 text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden border-t border-white/8 overflow-hidden">
              <div className="flex flex-col p-4 gap-1">
                {NAV_LINKS.map(l => (
                  <Link key={l.name} href={l.href} onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >{l.name}</Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ── Toast ── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed bottom-6 right-4 sm:right-6 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl text-sm font-semibold max-w-sm backdrop-blur-xl ${
        type === 'success'
          ? 'bg-blue-500/10 border-blue-500/30 text-emerald-300 shadow-emerald-900/20'
          : 'bg-red-500/10 border-red-500/30 text-red-300 shadow-red-900/20'
      }`}
    >
      {type === 'success'
        ? <CheckCircle2 className="w-4 h-4 shrink-0" />
        : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

/* ── Status Dropdown ── */
function StatusDropdown({ appId, jobId, current, onUpdate }: {
  appId: string; jobId: string; current: AppStatus;
  onUpdate: (appId: string, status: AppStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const s = statusCfg[current];

  const change = async (status: AppStatus) => {
    if (status === current) { setOpen(false); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}/applications/${appId}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (res.ok) onUpdate(appId, status);
    } catch {} finally { setSaving(false); setOpen(false); }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} disabled={saving}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer hover:opacity-90 transition-all shadow-sm ${s.bg} ${s.text} ${s.border} ${s.glow}`}
      >
        {saving
          ? <Loader2 className="w-3 h-3 animate-spin" />
          : <span className={`w-1.5 h-1.5 rounded-full ${s.dot} shadow-sm`} />}
        {s.label}
        <ChevronDown className="w-3 h-3 opacity-60" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 top-full mt-2 z-40 bg-[#071428] border border-white/10 rounded-2xl shadow-2xl overflow-hidden min-w-[160px] py-1"
            >
              {(['APPLIED', 'SHORTLISTED', 'REJECTED'] as AppStatus[]).map(st => {
                const c = statusCfg[st];
                return (
                  <button key={st} onClick={() => change(st)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/5 ${current === st ? c.text : 'text-slate-400 hover:text-white'}`}
                  >
                    <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                    {c.label}
                    {current === st && <CheckCircle2 className="w-3 h-3 ml-auto opacity-60" />}
                  </button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Copy button ── */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy}
      className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-500 hover:text-white transition-all shrink-0"
    >
      {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

/* ── Skill badge ── */
function SkillBadge({ skill, index }: { skill: string; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.035 + 0.1 }}
      className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-500/15 text-cyan-300 text-xs font-semibold transition-all cursor-default"
    >
      {skill}
    </motion.span>
  );
}

/* ── Gradient avatar ── */
function CandidateAvatar({ name, size = 'lg' }: { name: string; size?: 'sm' | 'lg' }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const gradients = [
    'from-blue-400/40 to-cyan-500/30 border-blue-500/30 text-blue-200',
    'from-blue-400/40 to-cyan-500/30 border-blue-500/30 text-blue-200',
    'from-violet-400/40 to-purple-500/30 border-violet-500/30 text-violet-200',
    'from-amber-400/40 to-orange-500/30 border-amber-500/30 text-amber-200',
  ];
  const g = gradients[name.charCodeAt(0) % gradients.length];
  if (size === 'sm') {
    return (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${g} border flex items-center justify-center text-sm font-black shrink-0 shadow-lg`}>
        {initials}
      </div>
    );
  }
  return (
    <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] bg-gradient-to-br ${g} border-2 flex items-center justify-center text-4xl font-black mx-auto shadow-2xl`}>
      {initials}
      {/* Shimmer */}
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />
    </div>
  );
}

/* ── Main Page ── */
export default function CandidateDetailPage() {
  const router = useRouter();
  const params = useParams();
  const candidateId = params?.candidateId as string;

  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [candidateRes, meRes] = await Promise.all([
          fetch(`${API_BASE}/api/hirex/recruiter/candidates/${candidateId}`, { credentials: 'include' }),
          fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' }),
        ]);
        if (!candidateRes.ok) { router.push('/hirex/recruiter/candidates'); return; }
        if (meRes.ok) {
          const me = await meRes.json();
          if (me.role !== 'RECRUITER') { router.push('/hirex/dashboard/candidate'); return; }
          setCurrentUserId(me.id);
        } else { router.push('/hirex/login'); return; }
        setCandidate(await candidateRes.json());
      } catch { router.push('/hirex/recruiter/candidates'); }
      finally { setLoading(false); }
    };
    init();
  }, [candidateId, router]);

  const handleStatusUpdate = useCallback((appId: string, status: AppStatus) => {
    setCandidate(prev => !prev ? prev : {
      ...prev,
      applications: prev.applications.map(a => a.id === appId ? { ...a, status } : a),
    });
    setToast({ message: `Status updated to ${statusCfg[status].label}.`, type: 'success' });
  }, []);

  /* ── Loading ── */
  // if (loading) return (
  //   <div className="min-h-screen bg-[#020617] flex items-center justify-center">
  //     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
  //       <div className="relative w-14 h-14">
  //         <div className="w-14 h-14 rounded-full border-2 border-blue-500/20 border-t-emerald-500 animate-spin" />
  //         <div className="absolute inset-2 rounded-full border border-blue-500/10 border-t-emerald-400/60 animate-spin" style={{ animationDuration: '0.7s', animationDirection: 'reverse' }} />
  //       </div>
  //       <p className="text-slate-500 text-sm font-medium">Loading candidate profile…</p>
  //     </motion.div>
  //   </div>
  // );

  // Replace if (loading) return (...) with:
if (loading) return (
  <main className="min-h-screen bg-[#020617] text-white font-sans">
    <NavbarSkeleton />

    {/* Atmosphere */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.07] blur-[180px] rounded-full" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-600/[0.04] blur-[120px] rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    {/* Hero banner skeleton */}
    <div className="relative pt-24 pb-0 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          <div className="h-4 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
          <div className="h-3 w-3 rounded skeleton-shimmer bg-white/[0.04]" />
          <div className="h-4 w-32 rounded skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Profile hero card */}
        <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[2rem] skeleton-shimmer bg-white/[0.04] shrink-0 mx-auto sm:mx-0" />

            {/* Info */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-48 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                <div className="h-6 w-20 rounded-full skeleton-shimmer bg-white/[0.04]" />
              </div>
              <div className="h-5 w-64 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="flex flex-wrap gap-4">
                <div className="h-4 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-4 w-32 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-4 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
            </div>

            {/* CTA (desktop) */}
            <div className="hidden lg:flex flex-col gap-2 shrink-0">
              <div className="h-10 w-32 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>

          {/* Stats mini-row */}
          <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-6 w-8 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Main content skeleton */}
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        {/* LEFT sidebar skeleton */}
        <div className="space-y-4 lg:space-y-5">

          {/* Contact card */}
          <div className="rounded-[1.75rem] bg-white/[0.03] border border-white/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 rounded-full skeleton-shimmer bg-white/[0.04]" />
              <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-8 h-8 rounded-lg skeleton-shimmer bg-white/[0.04] shrink-0" />
                  <div className="flex-1 h-4 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="w-6 h-6 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </div>

          {/* Experience card */}
          <div className="rounded-[1.75rem] bg-white/[0.03] border border-white/10 p-5 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-4 rounded-full skeleton-shimmer bg-white/[0.04]" />
              <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                    <div className="h-4 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT main skeleton */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">

          {/* Skills card */}
          <div className="rounded-[2rem] bg-white/[0.03] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                <div className="space-y-1.5">
                  <div className="h-4 w-32 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3 w-44 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              </div>
              <div className="h-7 w-16 rounded-full skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[72, 56, 88, 64, 80, 48, 96, 60, 76].map((w, i) => (
                <div key={i} className="h-8 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          {/* Applied to Your Jobs card */}
          <div className="rounded-[2rem] bg-white/[0.02] border border-blue-500/20 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full skeleton-shimmer bg-white/[0.04]" />
                <div className="h-4 w-40 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
              <div className="h-7 w-8 rounded-full skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-40 rounded skeleton-shimmer bg-white/[0.04]" />
                      <div className="h-5 w-14 rounded-full skeleton-shimmer bg-white/[0.04]" />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                      <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                      <div className="h-3 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-8 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                    <div className="h-8 w-20 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                    <div className="h-8 w-16 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Other applications card */}
          <div className="rounded-[2rem] bg-white/[0.02] border border-white/10 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 rounded-full skeleton-shimmer bg-white/[0.04]" />
                <div className="space-y-1.5">
                  <div className="h-4 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              </div>
              <div className="h-7 w-8 rounded-full skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
                      <div className="h-5 w-14 rounded-full skeleton-shimmer bg-white/[0.04]" />
                    </div>
                    <div className="flex gap-3">
                      <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                      <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="h-7 w-20 rounded-full skeleton-shimmer bg-white/[0.04]" />
                    <div className="h-7 w-16 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  </main>
);

  if (!candidate) return null;

  const cp = candidate.candidateProfile;
  const apps = candidate.applications ?? [];
  const skills = (cp?.skills as string[]) ?? [];
  const shortlisted = apps.filter(a => a.status === 'SHORTLISTED').length;
  const appliedCount = apps.filter(a => a.status === 'APPLIED').length;
  const myJobApps = apps.filter(a => a.job.postedById === currentUserId);
  const otherApps = apps.filter(a => a.job.postedById !== currentUserId);
  const displayName = cp?.fullName || candidate.email.split('@')[0];

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30">

      {/* ── Atmosphere ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.07] blur-[180px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-600/[0.04] blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/[0.04] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,#020617_100%)]" />
      </div>

      <RecruiterNavbar />

      {/* ── Hero banner ── */}
      <div className="relative pt-24 pb-0 overflow-hidden">
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-0 left-[10%] w-64 h-64 bg-blue-500/[0.07] rounded-full blur-[80px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-0 right-[10%] w-48 h-48 bg-cyan-500/[0.06] rounded-full blur-[60px] pointer-events-none"
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 mb-8 text-xs text-slate-600"
          >
            <button onClick={() => router.back()} className="flex items-center gap-1.5 text-slate-500 hover:text-white transition-all group">
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium">Candidates</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-700" />
            <span className="text-slate-500 font-medium truncate max-w-[200px]">{displayName}</span>
          </motion.div>

          {/* Profile hero */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-0"
          >
            {/* Gradient top strip */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/60 to-transparent" />
            {/* Gradient bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.05] via-transparent to-cyan-600/[0.03] pointer-events-none" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

                {/* Avatar */}
                <div className="shrink-0">
                  <CandidateAvatar name={cp?.fullName || candidate.email} size="lg" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">{displayName}</h1>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-emerald-400 text-[10px] font-bold">
                      <CheckCircle2 className="w-3 h-3" />Verified
                    </span>
                  </div>
                  {cp?.headline && (
                    <p className="text-slate-400 text-base mb-3 leading-snug">{cp.headline}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    {cp?.experienceYears !== undefined && cp.experienceYears !== null && (
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-cyan-500" />
                        <span className="text-slate-300 font-semibold">{cp.experienceYears}</span> yr experience
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      Joined {new Date(candidate.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
                      {apps.length} application{apps.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Quick actions (desktop) */}
                <div className="hidden lg:flex flex-col gap-2 shrink-0">
                  <a href={`mailto:${candidate.email}`}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500/15 border border-blue-500/30 hover:border-blue-500/50 hover:bg-blue-500/20 text-blue-400 text-sm font-bold transition-all"
                  >
                    <Mail className="w-4 h-4" />Send Email
                  </a>
                </div>
              </div>

              {/* Stats mini-row */}
              <div className="mt-6 pt-6 border-t border-white/8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: 'Applications', value: apps.length, icon: FileText, color: 'text-blue-400', accent: 'bg-blue-500/10' },
                  { label: 'Shortlisted', value: shortlisted, icon: Star, color: 'text-emerald-400', accent: 'bg-blue-500/10' },
                  { label: 'In Review', value: appliedCount, icon: Eye, color: 'text-amber-400', accent: 'bg-amber-500/10' },
                  { label: 'Skills', value: skills.length, icon: Code2, color: 'text-cyan-400', accent: 'bg-cyan-500/10' },
                ].map(({ label, value, icon: Icon, color, accent }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl ${accent} flex items-center justify-center shrink-0`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      <p className={`text-xl font-black ${color}`}>{value}</p>
                      <p className="text-[10px] text-slate-600 font-medium">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── LEFT sidebar ── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-4 lg:space-y-5"
          >

            {/* Contact card */}
            <motion.div variants={cardIn} custom={0}
              className="rounded-[1.75rem] bg-white/[0.03] border border-white/10 p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Contact</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/12 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate flex-1">{candidate.email}</span>
                  <CopyButton text={candidate.email} />
                </div>
                {candidate.phone && (
                  <a href={`tel:${candidate.phone}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/12 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{candidate.phone}</span>
                  </a>
                )}
                {cp?.githubUrl && (
                  <a href={cp.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Github className="w-3.5 h-3.5 text-slate-300" />
                    </div>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors truncate flex-1">
                      {cp.githubUrl.replace('https://', '')}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-slate-400 shrink-0" />
                  </a>
                )}
                {cp?.linkedinUrl && (
                  <a href={cp.linkedinUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15 hover:border-blue-500/30 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-sm text-blue-300 group-hover:text-blue-200 transition-colors truncate flex-1">
                      {cp.linkedinUrl.replace('https://', '')}
                    </span>
                    <ExternalLink className="w-3 h-3 text-blue-800 group-hover:text-blue-400 shrink-0" />
                  </a>
                )}
              </div>
            </motion.div>

            {/* Quick actions (mobile) */}
            <motion.div variants={cardIn} custom={1}
              className="lg:hidden rounded-[1.75rem] bg-white/[0.03] border border-white/10 p-5 space-y-2"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-emerald-400 to-cyan-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h3>
              </div>
              <a href={`mailto:${candidate.email}`}
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 hover:bg-blue-600/15 text-emerald-400 hover:text-emerald-300 text-sm font-bold transition-all"
              >
                <Mail className="w-4 h-4" />Send Email
              </a>
              <Link href="/hirex/jobs/new"
                className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-bold transition-all"
              >
                <Briefcase className="w-4 h-4" />Post a New Job
              </Link>
            </motion.div>

            {/* Experience overview */}
            <motion.div variants={cardIn} custom={2}
              className="rounded-[1.75rem] bg-white/[0.03] border border-white/10 p-5 sm:p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 mb-0.5">Years of Experience</p>
                    <p className="text-white font-bold text-sm">
                      {cp?.experienceYears !== undefined && cp.experienceYears !== null
                        ? `${cp.experienceYears} Year${cp.experienceYears !== 1 ? 's' : ''}`
                        : <span className="text-slate-600 font-normal italic text-xs">Not specified</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-600 mb-0.5">Total Applications</p>
                    <p className="text-white font-bold text-sm">{apps.length} job{apps.length !== 1 ? 's' : ''}</p>
                  </div>
                </div>
                {myJobApps.length > 0 && (
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                      <Star className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-600 mb-0.5">Applied to Your Jobs</p>
                      <p className="text-emerald-400 font-bold text-sm">{myJobApps.length} application{myJobApps.length !== 1 ? 's' : ''}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT main ── */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">

            {/* Skills section */}
            <motion.div variants={cardIn} initial="hidden" animate="visible" custom={0}
              className="rounded-[2rem] bg-white/[0.03] border border-white/10 p-6 sm:p-8 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Technical Skills</h2>
                    <p className="text-[10px] text-slate-600 mt-0.5">Candidate's declared expertise</p>
                  </div>
                </div>
                {skills.length > 0 && (
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black">{skills.length} skills</span>
                )}
              </div>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => <SkillBadge key={s} skill={s} index={i} />)}
                </div>
              ) : (
                <div className="flex flex-col items-center py-10 text-center border border-dashed border-white/8 rounded-2xl">
                  <Code2 className="w-10 h-10 text-slate-700 mb-3" />
                  <p className="text-slate-500 text-sm font-medium">No skills added yet</p>
                  <p className="text-slate-700 text-xs mt-1">Candidate hasn't filled their profile</p>
                </div>
              )}
            </motion.div>

            {/* Applied to YOUR jobs */}
            <motion.div variants={cardIn} initial="hidden" animate="visible" custom={1}
              className="rounded-[2rem] overflow-hidden border border-blue-500/20 bg-white/[0.02] relative"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-400/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/[0.04] to-transparent pointer-events-none" />

              <div className="relative p-6 sm:p-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-6 bg-gradient-to-b from-blue-400 to-cyan-500 rounded-full" />
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">Applied to Your Jobs</h2>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${
                    myJobApps.length > 0
                      ? 'bg-blue-500/15 border-blue-500/30 text-blue-400'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}>{myJobApps.length}</span>
                </div>

                {myJobApps.length === 0 ? (
                  <div className="flex flex-col items-center py-10 text-center mt-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/8 flex items-center justify-center mb-3">
                      <Briefcase className="w-6 h-6 text-slate-700" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">No applications yet</p>
                    <p className="text-slate-700 text-xs mt-1 max-w-xs">This candidate hasn't applied to any of your job postings</p>
                    <Link href="/hirex/jobs/new"
                      className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 text-xs font-bold transition-all"
                    >
                      <Briefcase className="w-3.5 h-3.5" />Post a Job
                    </Link>
                  </div>
                ) : (
                  <>
                    <p className="text-slate-500 text-xs mb-5 ml-5">
                      Applied to <span className="text-white font-semibold">{myJobApps.length}</span> of your posting{myJobApps.length > 1 ? 's' : ''}
                    </p>
                    <div className="space-y-3">
                      {myJobApps.map((app, i) => (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="group flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-blue-500/[0.04] border border-blue-500/12 hover:border-blue-500/25 hover:bg-blue-500/[0.07] transition-all"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-1.5">
                              <p className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors">{app.job.title}</p>
                              {app.job.isRemote && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold">
                                  <Wifi className="w-2 h-2" />Remote
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
                              <span className="flex items-center gap-1.5"><Building2 className="w-3 h-3" />{app.job.company}</span>
                              <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" />{app.job.location}</span>
                              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />
                                {new Date(app.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0 flex-wrap">
                            <StatusDropdown appId={app.id} jobId={app.job.id} current={app.status} onUpdate={handleStatusUpdate} />
                            {app.resumeUrl && (
                              <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-[11px] font-semibold transition-all"
                              >
                                <FileText className="w-3 h-3" />Resume
                              </a>
                            )}
                            <Link href={`/hirex/jobs/${app.job.id}`}
                              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 text-blue-400 hover:text-blue-300 text-[11px] font-bold transition-all"
                            >
                              <Eye className="w-3 h-3" />Job
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Other applications (if any) */}
            {otherApps.length > 0 && (
              <motion.div variants={cardIn} initial="hidden" animate="visible" custom={2}
                className="rounded-[2rem] bg-white/[0.02] border border-white/10 overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
                      <div>
                        <h2 className="text-sm font-black text-white uppercase tracking-wider">Other Applications</h2>
                        <p className="text-[10px] text-slate-600 mt-0.5">Jobs at other companies</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 text-xs font-black">{otherApps.length}</span>
                  </div>
                  <div className="space-y-2.5">
                    {otherApps.map((app, i) => {
                      const s = statusCfg[app.status];
                      return (
                        <motion.div
                          key={app.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-all group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-white font-semibold text-sm group-hover:text-slate-200 transition-colors truncate">{app.job.title}</p>
                              {app.job.isRemote && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-500 text-[9px] font-bold shrink-0">
                                  <Wifi className="w-2 h-2" />Remote
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-3 text-[11px] text-slate-600">
                              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{app.job.company}</span>
                              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{app.job.location}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${s.bg} ${s.text} ${s.border}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                            </span>
                            {app.resumeUrl && (
                              <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/8 hover:border-white/15 text-slate-500 hover:text-slate-300 text-[10px] font-medium transition-all"
                              >
                                <FileText className="w-3 h-3" />Resume
                              </a>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </main>
  );
}