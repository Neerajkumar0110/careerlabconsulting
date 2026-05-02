'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Search, Users, Code2, Briefcase, Github, Linkedin,
  Zap, Filter, X, ChevronRight, CheckCircle2, Clock, Eye, Mail,
  SlidersHorizontal, TrendingUp, Sparkles, ExternalLink, BarChart3,
  User, RefreshCw, AlertCircle, ChevronDown, LayoutDashboard, LogOut, Menu, Bell,
  Rocket, Target, Shield, Crown, Star, ArrowUpRight,
  ArrowRight,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ── */
interface Candidate {
  id: string; email: string; createdAt: string;
  candidateProfile?: {
    fullName: string; headline?: string; skills?: string[];
    experienceYears?: number; githubUrl?: string; linkedinUrl?: string;
  };
}

/* ── Animation variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const } }),
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };
const cardIn = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i = 0) => ({ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as const } }),
};

/* ── Animated counter ── */
function AnimCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const steps = 40, dur = 1000;
    let cur = 0;
    const iv = setInterval(() => {
      cur += to / steps;
      if (cur >= to) { setVal(to); clearInterval(iv); } else setVal(Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(iv);
  }, [to]);
  return <>{val.toLocaleString()}{suffix}</>;
}

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
            {/* Post Job button */}
            <div className="hidden sm:block h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.06]" />
            {/* Avatar pill */}
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

/* ── Candidate Card ── */
function CandidateCard({ candidate, index }: { candidate: Candidate; index: number }) {
  const cp = candidate.candidateProfile;
  const skills = (cp?.skills as string[]) ?? [];
  const initials = cp?.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || candidate.email.slice(0, 2).toUpperCase();
  const gradients = [
    'from-blue-500/30 to-cyan-500/20 border-blue-500/20 text-blue-300',
    'from-blue-500/30 to-cyan-500/20 border-blue-500/20 text-blue-300',
    'from-violet-500/30 to-purple-500/20 border-violet-500/20 text-violet-300',
    'from-amber-500/30 to-orange-500/20 border-amber-500/20 text-amber-300',
    'from-rose-500/30 to-pink-500/20 border-rose-500/20 text-rose-300',
    'from-teal-500/30 to-cyan-500/20 border-teal-500/20 text-teal-300',
  ];
  const gradientClass = gradients[candidate.id.charCodeAt(0) % gradients.length];

  return (
    <motion.div
      variants={cardIn}
      custom={index}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative rounded-[1.75rem] bg-white/[0.03] border border-white/8 hover:border-blue-500/25 transition-all overflow-hidden cursor-pointer"
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {/* Hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/0 group-hover:from-blue-600/[0.04] group-hover:to-transparent transition-all duration-500 rounded-[1.75rem] pointer-events-none" />

      <div className="relative p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradientClass} border flex items-center justify-center text-base font-black shrink-0 shadow-lg`}>
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-base leading-tight truncate group-hover:text-blue-300 transition-colors">
              {cp?.fullName || 'Unknown Candidate'}
            </h3>
            {cp?.headline && <p className="text-slate-400 text-xs mt-0.5 truncate">{cp.headline}</p>}
            <div className="flex items-center gap-2 mt-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
              <span className="text-emerald-400 text-[10px] font-semibold">Verified</span>
              {cp?.experienceYears !== undefined && cp.experienceYears !== null && (
                <>
                  <span className="text-slate-700">·</span>
                  <span className="text-slate-500 text-[10px] flex items-center gap-1">
                    <Briefcase className="w-2.5 h-2.5" />{cp.experienceYears}yr
                  </span>
                </>
              )}
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-700 group-hover:text-blue-400 transition-all shrink-0 group-hover:rotate-0 -rotate-12" />
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {skills.slice(0, 5).map(s => (
              <span key={s} className="px-2.5 py-1 rounded-full bg-white/5 border border-blue-500/15 text-blue-400/80 text-[10px] font-semibold">{s}</span>
            ))}
            {skills.length > 5 && (
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-500 text-[10px]">+{skills.length - 5}</span>
            )}
          </div>
        )}

        {!cp?.headline && skills.length === 0 && (
          <div className="mb-4 py-3 text-center border border-dashed border-white/8 rounded-xl">
            <p className="text-slate-600 text-xs">Profile in progress</p>
          </div>
        )}

        {/* Footer row */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div className="flex items-center gap-2">
            {cp?.githubUrl && (
              <a href={cp.githubUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all"
              ><Github className="w-3.5 h-3.5" /></a>
            )}
            {cp?.linkedinUrl && (
              <a href={cp.linkedinUrl} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}
                className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 flex items-center justify-center text-blue-400 hover:text-blue-300 transition-all"
              ><Linkedin className="w-3.5 h-3.5" /></a>
            )}
            <a href={`mailto:${candidate.email}`} onClick={e => e.stopPropagation()}
              className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-all"
            ><Mail className="w-3.5 h-3.5" /></a>
          </div>
          <Link href={`/hirex/recruiter/candidates/${candidate.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 text-xs font-bold transition-all"
          >
            View <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function BrowseCandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(true);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [expFilter, setExpFilter] = useState<'any' | '0-2' | '2-5' | '5+'>('any');
  const [sortBy, setSortBy] = useState<'recent' | 'experienced' | 'skills'>('recent');
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' });
        if (!res.ok) { router.push('/hirex/login'); return; }
        const data = await res.json();
        if (data.role !== 'RECRUITER') { router.push('/hirex/dashboard/candidate'); return; }
      } catch { router.push('/hirex/login'); }
      finally { setChecking(false); }
    };
    check();
  }, [router]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/recruiter/candidates`, { credentials: 'include' });
      if (res.ok) setCandidates(await res.json());
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { if (!checking) fetchCandidates(); }, [checking]);

  const filtered = useMemo(() => {
    let list = [...candidates];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.candidateProfile?.fullName?.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.candidateProfile?.headline?.toLowerCase().includes(q) ||
        (c.candidateProfile?.skills as string[] ?? []).some(s => s.toLowerCase().includes(q))
      );
    }
    if (skillFilter.trim()) {
      const q = skillFilter.toLowerCase();
      list = list.filter(c => (c.candidateProfile?.skills as string[] ?? []).some(s => s.toLowerCase().includes(q)));
    }
    if (expFilter !== 'any') {
      list = list.filter(c => {
        const exp = c.candidateProfile?.experienceYears;
        if (exp === undefined || exp === null) return false;
        if (expFilter === '0-2') return exp <= 2;
        if (expFilter === '2-5') return exp > 2 && exp <= 5;
        if (expFilter === '5+') return exp > 5;
        return true;
      });
    }
    if (sortBy === 'experienced') list.sort((a, b) => (b.candidateProfile?.experienceYears ?? 0) - (a.candidateProfile?.experienceYears ?? 0));
    else if (sortBy === 'skills') list.sort((a, b) => ((b.candidateProfile?.skills as string[] ?? []).length) - ((a.candidateProfile?.skills as string[] ?? []).length));
    else list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }, [candidates, search, skillFilter, expFilter, sortBy]);

  const paginated = filtered.slice(0, page * PER_PAGE);
  const hasMore = paginated.length < filtered.length;

  const allSkills = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach(c => (c.candidateProfile?.skills as string[] ?? []).forEach(s => set.add(s)));
    return Array.from(set).slice(0, 20);
  }, [candidates]);

  const withProfiles = candidates.filter(c => c.candidateProfile?.headline || (c.candidateProfile?.skills as string[] ?? []).length > 0).length;
  const avgExp = candidates.reduce((sum, c) => sum + (c.candidateProfile?.experienceYears ?? 0), 0) / (candidates.length || 1);
  const activeFilters = [skillFilter ? `Skill: ${skillFilter}` : null, expFilter !== 'any' ? `Exp: ${expFilter}` : null].filter(Boolean);

  // if (checking) return (
  //   <div className="min-h-screen bg-[#020617] flex items-center justify-center">
  //     <div className="w-8 h-8 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
  //   </div>
  // );

  if (checking) return (
  <main className="min-h-screen bg-[#020617] text-white font-sans">
    <NavbarSkeleton />

    {/* Atmosphere */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.07] blur-[180px] rounded-full" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-600/[0.04] blur-[140px] rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:60px_60px]" />
    </div>

    {/* Hero section skeleton */}
    <div className="relative pt-28 pb-20 px-4 sm:px-6">
      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Badge row */}
        <div className="mb-8 flex items-center gap-3">
          <div className="h-9 w-64 rounded-full skeleton-shimmer bg-white/[0.04]" />
          <div className="h-9 w-16 rounded-full skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Headline */}
        <div className="space-y-3 mb-6">
          <div className="h-14 sm:h-16 lg:h-20 w-3/4 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
          <div className="h-14 sm:h-16 lg:h-20 w-1/2 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Subtitle */}
        <div className="space-y-2 mb-10">
          <div className="h-5 w-2/3 rounded skeleton-shimmer bg-white/[0.04]" />
          <div className="h-5 w-1/2 rounded skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap gap-3 mb-10">
          {[140, 160, 128].map((w, i) => (
            <div key={i} className="h-10 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-4">
          <div className="h-12 w-44 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
          <div className="h-12 w-40 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Stats row */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] flex flex-col gap-2.5">
              <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04]" />
              <div className="h-8 w-14 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Search + Grid section skeleton */}
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">

      {/* Search bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 h-14 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
        <div className="flex gap-2">
          <div className="h-14 w-28 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
          <div className="h-14 w-28 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
        </div>
      </div>

      {/* Results count */}
      <div className="h-4 w-36 rounded skeleton-shimmer bg-white/[0.04]" />

      {/* Candidate cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-[1.75rem] bg-white/[0.03] border border-white/8 p-5 sm:p-6">
            {/* Header */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl skeleton-shimmer bg-white/[0.04] shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3 w-1/2 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="flex items-center gap-2">
                  <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3 w-12 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              </div>
              <div className="w-4 h-4 rounded skeleton-shimmer bg-white/[0.04] shrink-0" />
            </div>
            {/* Skill pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {[56, 72, 48, 64].map((w, j) => (
                <div key={j} className="h-7 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
              ))}
            </div>
            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5">
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
              </div>
              <div className="h-7 w-20 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </main>
);

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.07] blur-[180px] rounded-full" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-600/[0.04] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/[0.04] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,#020617_100%)]" />
      </div>

      <RecruiterNavbar />

      {/* ══════ HERO SECTION ══════ */}
      <div className="relative pt-28 pb-20 px-4 sm:px-6 overflow-hidden">

        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-16 left-[5%] w-72 h-72 bg-emerald-500/8 rounded-full blur-[90px] pointer-events-none"
        />
        <motion.div
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-32 right-[8%] w-52 h-52 bg-cyan-500/8 rounded-full blur-[70px] pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl">

            {/* Badge */}
            <motion.div variants={fadeUp} custom={0} className="mb-8 inline-flex items-center gap-3">
              <div className="flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm">
                <Crown className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-blue-300 text-xs font-bold tracking-wide">Recruiter Portal · Verified Talent Only</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                <span className="text-slate-400 text-[10px] font-semibold">Live</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={fadeUp} custom={1} className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-[1.04]">
              Hire the Builders<br />
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  of Tomorrow.
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-cyan-400 to-blue-400/0 rounded-full origin-left"
                />
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-lg sm:text-xl max-w-2xl leading-relaxed font-light mb-10">
              Every great product starts with the right team.{' '}
              <span className="text-white font-medium">Browse verified engineers</span> — filtered by skills, experience, and ambition. Your next key hire is already here.
            </motion.p>

            {/* Trust signals */}
            <motion.div variants={fadeUp} custom={3} className="flex flex-wrap items-center gap-4 mb-10">
              {[
                { icon: Shield, text: 'All profiles verified', color: 'text-emerald-400' },
                { icon: Zap, text: 'AI-skill tested candidates', color: 'text-cyan-400' },
                { icon: Star, text: 'Top 10% talent pool', color: 'text-amber-400' },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/8">
                  <Icon className={`w-3.5 h-3.5 ${color}`} />
                  <span className="text-slate-300 text-xs font-semibold">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA row */}
            <motion.div variants={fadeUp} custom={4} className="flex flex-wrap items-center gap-4">
              <Link href="/hirex/jobs/new"
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 text-white font-black text-sm transition-all shadow-xl shadow-emerald-900/40"
              >
                <Briefcase className="w-4 h-4" />
                Post a Job Opening
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <button
                onClick={() => document.getElementById('candidates-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all"
              >
                Browse Talent Pool
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>

          {/* Stats row — live data */}
          {!loading && candidates.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
            >
              {[
                { label: 'Total Candidates', value: candidates.length, suffix: '', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                { label: 'Full Profiles', value: withProfiles, suffix: '', icon: User, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                { label: 'Avg. Experience', value: parseFloat(avgExp.toFixed(1)), suffix: 'yr', icon: TrendingUp, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
                { label: 'Unique Skills', value: allSkills.length, suffix: '+', icon: Code2, color: 'text-violet-400', bg: 'bg-violet-500/10 border-violet-500/20' },
              ].map(({ label, value, suffix, icon: Icon, color, bg }) => (
                <motion.div key={label} whileHover={{ y: -2 }} className={`p-5 sm:p-6 rounded-2xl bg-white/[0.02] border ${bg} flex flex-col gap-2.5`}>
                  <div className={`w-9 h-9 rounded-xl ${bg} border flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className={`text-3xl font-black ${color}`}>
                    <AnimCounter to={typeof value === 'number' ? value : 0} suffix={suffix} />
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{label}</p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ══════ SEARCH + FILTERS + GRID ══════ */}
      <div id="candidates-grid" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-6">

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by name, skill, headline, or email…"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700 backdrop-blur-sm"
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
              {search && (
                <button onClick={() => { setSearch(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-sm font-bold transition-all ${
                  showFilters || activeFilters.length > 0
                    ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />Filters
                {activeFilters.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-[#020617] text-[10px] font-black flex items-center justify-center">{activeFilters.length}</span>
                )}
              </button>
              <button onClick={fetchCandidates} disabled={loading}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-bold transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
            </div>
          </div>

          {/* Expanded filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Code2 className="w-3 h-3" />Filter by Skill</label>
                      <div className="relative">
                        <input type="text" placeholder="e.g. React, Python…"
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 outline-none transition-all placeholder:text-slate-700"
                          value={skillFilter} onChange={e => { setSkillFilter(e.target.value); setPage(1); }}
                        />
                        {skillFilter && <button onClick={() => { setSkillFilter(''); setPage(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"><X className="w-3.5 h-3.5" /></button>}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Briefcase className="w-3 h-3" />Experience</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {(['any', '0-2', '2-5', '5+'] as const).map(opt => (
                          <button key={opt} onClick={() => { setExpFilter(opt); setPage(1); }}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${expFilter === opt ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                          >{opt === 'any' ? 'Any' : `${opt}yr`}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><BarChart3 className="w-3 h-3" />Sort By</label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {([{value:'recent',label:'Recent'},{value:'experienced',label:'Senior'},{value:'skills',label:'Skills'}] as const).map(({value,label}) => (
                          <button key={value} onClick={() => setSortBy(value)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all border ${sortBy === value ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20 hover:text-white'}`}
                          >{label}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {allSkills.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Popular Skills</p>
                      <div className="flex flex-wrap gap-1.5">
                        {allSkills.map(s => (
                          <button key={s} onClick={() => { setSkillFilter(skillFilter === s ? '' : s); setPage(1); }}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all border ${
                              skillFilter === s ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300' : 'bg-white/5 border-white/8 text-slate-500 hover:border-white/15 hover:text-slate-300'
                            }`}
                          >{s}</button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFilters.length > 0 && (
                    <button onClick={() => { setSkillFilter(''); setExpFilter('any'); setPage(1); }}
                      className="flex items-center gap-1.5 text-slate-500 hover:text-red-400 text-xs font-bold transition-colors"
                    ><X className="w-3.5 h-3.5" />Clear all filters</button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active filter chips */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap gap-2">
                {activeFilters.map(f => (
                  <span key={f} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold">
                    <Filter className="w-3 h-3" />{f}
                  </span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-slate-500 text-sm">
            {loading ? 'Loading candidates…' : (
              <><span className="text-white font-bold">{filtered.length}</span>{' '}candidate{filtered.length !== 1 ? 's' : ''}{search || activeFilters.length > 0 ? ' found' : ' available'}</>
            )}
          </p>
          {(search || activeFilters.length > 0) && filtered.length > 0 && (
            <button onClick={() => { setSearch(''); setSkillFilter(''); setExpFilter('any'); setPage(1); }}
              className="text-slate-500 hover:text-emerald-400 text-xs font-semibold transition-colors flex items-center gap-1"
            ><X className="w-3 h-3" />Clear all</button>
          )}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="rounded-[1.75rem] bg-white/[0.02] border border-white/5 p-5 sm:p-6 h-52 animate-pulse">
                  <div className="flex gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5" />
                    <div className="flex-1 space-y-2"><div className="h-4 bg-white/5 rounded-lg w-3/4" /><div className="h-3 bg-white/5 rounded-lg w-1/2" /></div>
                  </div>
                  <div className="flex gap-2 mb-4">{[1,2,3].map(n => <div key={n} className="h-6 w-16 bg-white/5 rounded-full" />)}</div>
                  <div className="h-px bg-white/5 mb-3" />
                  <div className="flex justify-between">
                    <div className="flex gap-2">{[1,2].map(n => <div key={n} className="w-7 h-7 rounded-lg bg-white/5" />)}</div>
                    <div className="w-20 h-7 rounded-xl bg-white/5" />
                  </div>
                </div>
              ))}
            </motion.div>
          ) : filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="flex flex-col items-center py-24 text-center rounded-[2rem] bg-white/[0.02] border border-white/8"
            >
              {candidates.length === 0 ? (
                <>
                  <Users className="w-14 h-14 text-slate-700 mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">No Candidates Yet</h3>
                  <p className="text-slate-500 text-sm max-w-sm">Candidates will appear here as they register.</p>
                </>
              ) : (
                <>
                  <Search className="w-14 h-14 text-slate-700 mb-4" />
                  <h3 className="text-white font-bold text-lg mb-2">No Matches Found</h3>
                  <p className="text-slate-500 text-sm max-w-sm mb-5">Try adjusting your search or filters.</p>
                  <button onClick={() => { setSearch(''); setSkillFilter(''); setExpFilter('any'); setPage(1); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#020617] font-black text-sm transition-all"
                  ><X className="w-4 h-4" />Clear Filters</button>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div key="grid" variants={stagger} initial="hidden" animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {paginated.map((candidate, i) => (
                <CandidateCard key={candidate.id} candidate={candidate} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {hasMore && (
          <div className="flex justify-center pt-4">
            <button onClick={() => setPage(p => p + 1)}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-sm font-bold transition-all"
            >
              Load More Candidates <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom nav */}
        <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
          <Link href="/hirex/dashboard/recruiter" className="flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium transition-colors">
            <BarChart3 className="w-4 h-4" />Dashboard
          </Link>
          <Link href="/hirex/jobs/new" className="flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-sm font-medium transition-colors">
            <Briefcase className="w-4 h-4" />Post a Job
          </Link>
          <Link href="/hirex/jobs" className="flex items-center gap-2 text-slate-500 hover:text-white text-sm font-medium transition-colors">
            <Eye className="w-4 h-4" />Browse Jobs
          </Link>
        </div>
      </div>
    </main>
  );
}