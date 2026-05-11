'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, ArrowRight, Briefcase, Building2,
  Globe, Wifi, X, Clock, Banknote, Users, Loader2,
  Sparkles, LayoutGrid, List, AlertCircle, TrendingUp, Filter,
  LogOut, Zap, ChevronRight, Bell, Star, BadgeCheck,
  ChevronDown, LayoutDashboard, Menu, SlidersHorizontal,
  Flame, Trophy, Rocket, Target,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';
import { SmartSearchBox } from '@/components/hirex/SmartSearchBox';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ── */
interface Job {
  id: string; title: string; description: string; company: string;
  location: string; isRemote: boolean; skills: string[];
  salaryMin: number | null; salaryMax: number | null; createdAt: string;
  postedBy?: { recruiterProfile: { companyName: string; website: string | null } | null };
}
interface Company { company: string; jobCount: number; website: string | null; companySize: string | null; }
interface Filters { isRemote: '' | 'true' | 'false'; salaryMin: string; salaryMax: string; }

/* ── Helpers ── */
const timeAgo = (d: string) => {
  const diff = Date.now() - new Date(d).getTime(), days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today'; if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`; if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
};
const fmtSalary = (min: number | null, max: number | null) => {
  if (!min && !max) return null;
  const fmt = (n: number) => n >= 100000 ? `${(n / 100000).toFixed(1)}L` : `${(n / 1000).toFixed(0)}K`;
  if (min && max) return `₹${fmt(min)} – ₹${fmt(max)}`;
  if (min) return `₹${fmt(min)}+`; return `up to ₹${fmt(max!)}`;
};
const companyInitials = (n: string) => n.split(/\s+/).slice(0, 2).map(w => w[0]).join('').toUpperCase();
const AVATAR_COLORS = [
  { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300' },
  { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300' },
  { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-300' },
  { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-300' },
  { bg: 'bg-rose-500/20', border: 'border-rose-500/30', text: 'text-rose-300' },
  { bg: 'bg-cyan-500/20', border: 'border-cyan-500/30', text: 'text-cyan-300' },
];
const companyColor = (n: string) => {
  let h = 0; for (let i = 0; i < n.length; i++) h = n.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
};

/* ── Animated counter ── */
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const duration = 7200, steps = 260, step = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= value) { setDisplay(value); clearInterval(interval); }
      else setDisplay(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value]);
  return <span>{display.toLocaleString()}{suffix}</span>;
}

function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6">
        <div className="flex items-center justify-between h-16">
          <Logo isSticky={false} />
          <div className="hidden md:flex items-center gap-1">
            {[48, 64, 56].map((w, i) => (
              <div key={i} className="h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:block h-8 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
            <div className="h-9 w-20 rounded-xl skeleton-shimmer bg-white/[0.06]" />
            <div className="md:hidden w-8 h-8 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ── Navbar ── */
function Navbar() {
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
    window.location.href = '/hirex';
  };

  const NAV_LINKS = [
    { name: 'Jobs', href: '/hirex/jobs', active: true },
    { name: 'AI Tests', href: '/hirex/ai-skill-tests' },
    { name: 'Insights', href: '/hirex/hiring-insights' },
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
                  l.active ? 'text-blue-400 bg-cyan-300/10' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.name}
                {l.active && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            {user ? (
              <>
                {user.role === 'RECRUITER' && (
                  <Link href="/hirex/jobs/new"
                    className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30"
                  >Post Job</Link>
                )}
                <div className="relative" ref={dropdownRef}>
                  <button onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center gap-2 rounded-xl px-2.5 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-600 flex items-center justify-center text-white text-xs font-black uppercase">
                      {user?.name?.charAt(0) || user?.email?.charAt(0)}
                    </div>
                    <span className="hidden sm:block text-[11px] font-bold text-slate-200 max-w-[90px] truncate">{user?.name || user?.email}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                        className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#071428] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                      >
                        <div className="px-4 py-3 border-b border-white/5">
                          <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                          <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                        </div>
                        <Link href={user.role === 'RECRUITER' ? '/hirex/dashboard/recruiter' : '/hirex/dashboard/candidate'}
                          onClick={() => setDropdownOpen(false)}
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
              </>
            ) : (
              <>
                <Link href="/hirex/login"
                  className="hidden sm:block text-[11px] font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors px-3 py-2"
                >Log in</Link>
                <Link href="/hirex/signup"
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-[#020617] font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30"
                >Sign up</Link>
              </>
            )}
            <button className="md:hidden p-2 text-slate-400" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-white/8 overflow-hidden"
            >
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

/* ── Job Card ── */
// function JobCard({ job, index, view }: { job: Job; index: number; view: 'grid' | 'list' }) {
//   const salary = fmtSalary(job.salaryMin, job.salaryMax);
//   const color = companyColor(job.company);
//   const isNew = Date.now() - new Date(job.createdAt).getTime() < 3 * 86400000;
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.25), ease: [0.22, 1, 0.36, 1] }}
//       className={`group relative bg-[#0a1628]/60 hover:bg-[#0d1e38] border border-white/[0.07] hover:border-blue-500/30 rounded-2xl transition-all duration-300 overflow-hidden ${
//         view === 'grid' ? 'p-5' : 'p-4 sm:p-5 flex gap-4 items-start'
//       }`}
//     >
//       <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-cyan-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-r" />
//       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/[0.04] via-transparent to-transparent transition-opacity duration-500 pointer-events-none rounded-2xl" />
//       <div className={`relative flex-shrink-0 w-11 h-11 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center font-black text-sm ${color.text} ${view === 'grid' ? 'mb-4' : ''}`}>
//         {companyInitials(job.company)}
//         {isNew && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a1628]" />}
//       </div>
//       <div className={view === 'list' ? 'flex-1 min-w-0' : ''}>
//         <div className={`${view === 'list' ? 'flex items-start justify-between gap-2' : 'mb-2.5'}`}>
//           <div className={view === 'list' ? '' : 'mb-2.5'}>
//             <div className="flex items-center gap-2 mb-1 flex-wrap">
//               <h3 className="font-bold text-white text-sm leading-snug group-hover:text-blue-400 transition-colors">{job.title}</h3>
//               {isNew && <span className="px-1.5 py-0.5 rounded-md bg-blue-500/15 border border-blue-500/25 text-blue-400 text-[9px] font-bold uppercase tracking-wider">New</span>}
//             </div>
//             <p className="text-slate-500 text-xs font-medium">{job.company}</p>
//           </div>
//           <span className="text-[10px] text-slate-600 flex items-center gap-1 shrink-0 mt-0.5">
//             <Clock className="w-2.5 h-2.5" />{timeAgo(job.createdAt)}
//           </span>
//         </div>
//         <div className={`flex flex-wrap gap-1.5 ${view === 'grid' ? 'mb-3' : 'mt-2.5 mb-2.5'}`}>
//           <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[10px] text-slate-400 font-medium">
//             <MapPin className="w-2.5 h-2.5 text-slate-500" />{job.location}
//           </span>
//           {job.isRemote && (
//             <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-semibold">
//               <Wifi className="w-2.5 h-2.5" />Remote
//             </span>
//           )}
//           {salary && (
//             <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-medium">
//               <Banknote className="w-2.5 h-2.5" />{salary}
//             </span>
//           )}
//         </div>
//         {job.skills.length > 0 && (
//           <div className={`flex flex-wrap gap-1 ${view === 'grid' ? 'mb-4' : 'mb-3'}`}>
//             {job.skills.slice(0, 4).map(s => (
//               <span key={s} className="px-2 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-[10px] text-slate-400 font-mono">{s}</span>
//             ))}
//             {job.skills.length > 4 && <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 text-[10px] text-slate-600">+{job.skills.length - 4}</span>}
//           </div>
//         )}
//         <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">{job.description}</p>
//         <div className="flex items-center justify-between gap-2">
//           <Link href={`/hirex/jobs/${job.id}`}
//             className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600/15 hover:bg-blue-400 border border-blue-500/30 hover:border-transparent text-blue-400 hover:text-[#020617] text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group/btn"
//           >
//             View & Apply <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
//           </Link>
//           <div className="flex items-center gap-1 text-[10px] text-slate-700"><Users className="w-3 h-3" />Hiring</div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// FIND:

function JobCard({ job, index }: { job: Job; index: number }) {
  const salary = fmtSalary(job.salaryMin, job.salaryMax);
  const color = companyColor(job.company);
  const isNew = Date.now() - new Date(job.createdAt).getTime() < 3 * 86400000;
  const isHot = Date.now() - new Date(job.createdAt).getTime() < 1 * 86400000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay: Math.min(index * 0.05, 0.3), ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-[#0a1628] hover:bg-[#0d1e3a] border border-white/[0.08] hover:border-blue-500/40 rounded-2xl p-5 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-cyan-400 to-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center rounded-r" />
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-600/[0.06] via-transparent to-cyan-600/[0.03] transition-opacity duration-500 pointer-events-none rounded-2xl" />
      {/* Top shimmer line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex flex-col h-full">

        {/* ── Header row ── */}
        <div className="flex items-start gap-3 mb-4">
          {/* Company avatar */}
          <div className={`relative w-11 h-11 rounded-xl ${color.bg} border ${color.border} flex items-center justify-center font-black text-sm ${color.text} shrink-0 shadow-lg`}>
            {companyInitials(job.company)}
            {isHot && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-orange-500 border-2 border-[#0a1628] flex items-center justify-center">
                <Flame className="w-2 h-2 text-white" />
              </span>
            )}
            {isNew && !isHot && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-[#0a1628]" />
            )}
          </div>

          {/* Title + company */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-[15px] text-white leading-tight group-hover:text-blue-300 transition-colors truncate">
                  {job.title}
                </h3>
                <p className="text-slate-400 text-[12px] font-semibold mt-0.5 truncate">{job.company}</p>
              </div>
              {isNew && (
                <span className="shrink-0 px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-wider mt-0.5">
                  New
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ── Location / Remote / Salary chips ── */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-[11px] text-slate-300 font-medium">
            <MapPin className="w-2.5 h-2.5 text-slate-500" />{job.location}
          </span>
          {job.isRemote && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-[11px] text-cyan-300 font-semibold">
              <Wifi className="w-2.5 h-2.5" />Remote
            </span>
          )}
          {salary && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-300 font-semibold">
              <Banknote className="w-2.5 h-2.5" />{salary}
            </span>
          )}
        </div>

        {/* ── Skill tags ── */}
        {job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {job.skills.slice(0, 4).map(s => (
              <span key={s} className="px-2 py-0.5 rounded-md bg-blue-950/60 border border-blue-800/50 text-[10px] text-blue-300/80 font-mono font-medium">
                {s}
              </span>
            ))}
            {job.skills.length > 4 && (
              <span className="px-2 py-0.5 rounded-md bg-slate-800/60 border border-slate-700/40 text-[10px] text-slate-500 font-mono">
                +{job.skills.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ── Description ── */}
        <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-2 mb-4 flex-1">
          {job.description}
        </p>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-white/[0.06]">
          <span className="text-[10px] text-slate-600 flex items-center gap-1.5">
            <Clock className="w-3 h-3" />{timeAgo(job.createdAt)}
          </span>
          <Link href={`/hirex/jobs/${job.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-500 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all duration-200 group/btn shadow-sm shadow-blue-900/20 hover:shadow-blue-500/20"
          >
            Apply <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function JobSkeleton({ view }: { view: 'grid' | 'list' }) {
  return (
    <div className={`bg-[#0a1628]/60 border border-white/[0.06] rounded-2xl animate-pulse ${view === 'grid' ? 'p-5' : 'p-4 sm:p-5 flex gap-4'}`}>
      <div className={`bg-white/[0.04] rounded-xl flex-shrink-0 ${view === 'grid' ? 'w-11 h-11 mb-4' : 'w-11 h-11'}`} />
      <div className="flex-1 space-y-3">
        <div className="h-4 bg-white/[0.04] rounded-lg w-3/4" />
        <div className="h-3 bg-white/[0.04] rounded-lg w-2/5" />
        <div className="flex gap-2 mt-3"><div className="h-5 w-24 bg-white/[0.04] rounded-lg" /><div className="h-5 w-16 bg-white/[0.04] rounded-lg" /></div>
        <div className="flex gap-1.5">{[80,60,70].map((w,i) => <div key={i} style={{ width: w }} className="h-4 bg-white/[0.04] rounded-md" />)}</div>
      </div>
    </div>
  );
}


function JobCardSkeleton() {
  return (
    <div className="bg-[#0a1628]/80 border border-white/[0.07] rounded-2xl p-5 space-y-4">
      {/* Top row: avatar + meta */}
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <div className="h-4 w-3/4 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          <div className="h-3 w-2/5 rounded skeleton-shimmer bg-white/[0.04]" />
        </div>
        <div className="h-3 w-10 rounded skeleton-shimmer bg-white/[0.04] shrink-0 mt-1" />
      </div>
      {/* Tag chips */}
      <div className="flex flex-wrap gap-1.5">
        <div className="h-6 w-24 rounded-lg skeleton-shimmer bg-white/[0.04]" />
        <div className="h-6 w-16 rounded-lg skeleton-shimmer bg-white/[0.04]" />
        <div className="h-6 w-20 rounded-lg skeleton-shimmer bg-white/[0.04]" />
      </div>
      {/* Skill pills */}
      <div className="flex flex-wrap gap-1">
        {[52, 64, 44, 56].map((w, i) => (
          <div key={i} className="h-5 rounded-md skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
        ))}
      </div>
      {/* Description lines */}
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded skeleton-shimmer bg-white/[0.04]" />
        <div className="h-3 w-4/5 rounded skeleton-shimmer bg-white/[0.04]" />
      </div>
      {/* CTA row */}
      <div className="flex items-center justify-between pt-1">
        <div className="h-8 w-28 rounded-lg skeleton-shimmer bg-white/[0.04]" />
        <div className="h-3 w-12 rounded skeleton-shimmer bg-white/[0.04]" />
      </div>
    </div>
  );
}

function FilterPanel({ filters, setFilters, onApply, onReset, activeCount }: {
  filters: Filters; setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApply: () => void; onReset: () => void; activeCount: number;
}) {
  return (
    <div className="bg-[#0a1628] border border-white/[0.08] rounded-2xl p-5 space-y-5 sticky top-24">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />Filters
          {activeCount > 0 && <span className="w-5 h-5 rounded-full bg-blue-600 text-[#020617] text-[9px] font-black flex items-center justify-center">{activeCount}</span>}
        </h3>
        {activeCount > 0 && <button onClick={onReset} className="text-[10px] text-slate-500 hover:text-red-400 transition-colors font-bold uppercase tracking-wider">Clear</button>}
      </div>
      <div className="h-px bg-white/[0.06]" />
      <div className="space-y-2">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Work Type</p>
        {[{ label: 'All Types', value: '', icon: Globe }, { label: 'Remote Only', value: 'true', icon: Wifi }, { label: 'On-site', value: 'false', icon: Building2 }].map(({ label, value, icon: Icon }) => (
          <button key={value} onClick={() => setFilters(f => ({ ...f, isRemote: value as Filters['isRemote'] }))}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              filters.isRemote === value ? 'bg-blue-600/20 border border-blue-500/40 text-blue-400' : 'bg-white/[0.02] border border-white/[0.06] text-slate-500 hover:text-slate-300'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />{label}
            {filters.isRemote === value && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />}
          </button>
        ))}
      </div>
      <div className="h-px bg-white/[0.06]" />
      <div className="space-y-2">
        <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Salary (₹/year)</p>
        <div className="grid grid-cols-2 gap-2">
          {[{label:'Min',key:'salaryMin',ph:'0'},{label:'Max',key:'salaryMax',ph:'∞'}].map(({label,key,ph})=>(
            <div key={key}>
              <label className="text-[9px] text-slate-700 uppercase tracking-wider block mb-1 ml-1">{label}</label>
              <input type="number" min="0" step="50000" placeholder={ph} value={(filters as any)[key]}
                onChange={e => setFilters(f => ({...f, [key]: e.target.value}))}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-blue-500/50 placeholder:text-slate-700 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
      <button onClick={onApply} className="w-full bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all">Apply Filters</button>
    </div>
  );
}

/* ── Popular skills for hero ── */
const HERO_SKILLS = ['React', 'Node.js', 'Python', 'Golang', 'TypeScript', 'AWS', 'DevOps', 'Flutter', 'ML/AI', 'Solidity'];

/* ── Main inner component ── */
function HirexSearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [query, setQuery] = useState(searchParams.get('q') || '');
  // const [location, setLocation] = useState(searchParams.get('location') || '');
  // const [filters, setFilters] = useState<Filters>({ isRemote: '', salaryMin: '', salaryMax: '' });
  // const [activeFilters, setActiveFilters] = useState<Filters>({ isRemote: '', salaryMin: '', salaryMax: '' });
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [searchedQuery, setSearchedQuery] = useState(searchParams.get('q') || '');
  const [searchedLocation, setSearchedLocation] = useState(searchParams.get('location') || '');
  const [filters, setFilters] = useState<Filters>({ isRemote: '', salaryMin: '', salaryMax: '' });
  const [activeFilters, setActiveFilters] = useState<Filters>({ isRemote: '', salaryMin: '', salaryMax: '' });
  const [view, setView] = useState<'grid' | 'list'>('list');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState('');
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingMore = useRef(false);

  // const buildParams = useCallback((cursor?: string) => {
  //   const p = new URLSearchParams();
  //   if (query.trim()) p.set('q', query.trim());
  //   if (location.trim()) p.set('location', location.trim());
  //   if (activeFilters.isRemote) p.set('remote', activeFilters.isRemote);
  //   if (activeFilters.salaryMin) p.set('salaryMin', activeFilters.salaryMin);
  //   if (activeFilters.salaryMax) p.set('salaryMax', activeFilters.salaryMax);
  //   if (cursor) p.set('cursor', cursor);
  //   return p.toString();
  // }, [query, location, activeFilters]);

  const buildParams = useCallback((
    cursor?: string,
    overrideQuery?: string,
    overrideLocation?: string,
    overrideFilters?: Filters
  ) => {
    const p = new URLSearchParams();
    const q = overrideQuery !== undefined ? overrideQuery : searchedQuery;
    const loc = overrideLocation !== undefined ? overrideLocation : searchedLocation;
    const f = overrideFilters ?? activeFilters;
    if (q.trim()) p.set('q', q.trim());
    if (loc.trim()) p.set('location', loc.trim());
    if (f.isRemote) p.set('remote', f.isRemote);
    if (f.salaryMin) p.set('salaryMin', f.salaryMin);
    if (f.salaryMax) p.set('salaryMax', f.salaryMax);
    if (cursor) p.set('cursor', cursor);
    return p.toString();
  }, [searchedQuery, searchedLocation, activeFilters]);

  const fetchJobs = useCallback(async (
    reset = true,
    overrideQuery?: string,
    overrideLocation?: string,
    overrideFilters?: Filters
  ) => {
    if (loading) return;
    setLoading(true); setError('');
    try {
      const cursor = reset ? undefined : (nextCursor ?? undefined);
      const params = buildParams(cursor, overrideQuery, overrideLocation, overrideFilters);
      const res = await fetch(`${API_BASE}/api/hirex/jobs?${params}`);
      if (!res.ok) throw new Error('Failed to load jobs.');
      const data = await res.json();
      if (reset) setJobs(data.jobs); else setJobs(prev => [...prev, ...data.jobs]);
      setNextCursor(data.nextCursor); setHasMore(data.hasMore);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); setInitialLoad(false); loadingMore.current = false; }
  }, [buildParams, loading, nextCursor]);
  // const fetchJobs = useCallback(async (reset = true) => {
  //   if (loading) return;
  //   setLoading(true); setError('');
  //   try {
  //     const cursor = reset ? undefined : (nextCursor ?? undefined);
  //     const res = await fetch(`${API_BASE}/api/hirex/jobs?${buildParams(cursor)}`);
  //     if (!res.ok) throw new Error('Failed to load jobs.');
  //     const data = await res.json();
  //     if (reset) setJobs(data.jobs); else setJobs(prev => [...prev, ...data.jobs]);
  //     setNextCursor(data.nextCursor); setHasMore(data.hasMore);
  //   } catch (e: any) { setError(e.message); }
  //   finally { setLoading(false); setInitialLoad(false); loadingMore.current = false; }
  // }, [buildParams, loading, nextCursor]);

  useEffect(() => {
    fetch(`${API_BASE}/api/hirex/jobs/companies`).then(r => r.ok ? r.json() : null).then(d => d && setCompanies(d.companies)).catch(() => {});
    fetchJobs(true);
  }, []); // eslint-disable-line

  useEffect(() => {
    const el = sentinelRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && hasMore && !loadingMore.current && !loading) { loadingMore.current = true; fetchJobs(false); }
    }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, [hasMore, loading, fetchJobs]);

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    setNextCursor(null);
    fetchJobs(true, searchedQuery, searchedLocation, activeFilters);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedQuery, searchedLocation, activeFilters]);

  // const handleSearch = () => {
  //   const p = new URLSearchParams();
  //   if (query.trim()) p.set('q', query.trim());
  //   if (location.trim()) p.set('location', location.trim());
  //   router.push(`/hirex/jobs?${p.toString()}`, { scroll: false });
  //   setNextCursor(null); fetchJobs(true);
  // };

  const handleSearch = (overrideQuery?: string, overrideLocation?: string) => {
    const q = overrideQuery !== undefined ? overrideQuery : query;
    const loc = overrideLocation !== undefined ? overrideLocation : location;
    const p = new URLSearchParams();
    if (q.trim()) p.set('q', q.trim());
    if (loc.trim()) p.set('location', loc.trim());
    router.push(`/hirex/jobs?${p.toString()}`, { scroll: false });
    setSearchedQuery(q);
    setSearchedLocation(loc);
    setNextCursor(null);
  };

  const handleApplyFilters = () => {
  setActiveFilters(filters);
  setFiltersOpen(false);
  setNextCursor(null);
};

const handleResetFilters = () => {
  const e: Filters = { isRemote: '', salaryMin: '', salaryMax: '' };
  setFilters(e);
  setActiveFilters(e);
};

const handleClearAll = () => {
  const emptyFilters: Filters = { isRemote: '', salaryMin: '', salaryMax: '' };
  setQuery('');
  setLocation('');
  setSearchedQuery('');
  setSearchedLocation('');
  setFilters(emptyFilters);
  setActiveFilters(emptyFilters);
  setNextCursor(null);
  router.push('/hirex/jobs', { scroll: false });
};
  const activeFilterCount = [activeFilters.isRemote, activeFilters.salaryMin, activeFilters.salaryMax].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Deep atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.08] blur-[180px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/[0.05] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/[0.04] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />
        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,#020617_100%)]" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* ══════ HERO SECTION ══════ */}
        <div className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">

          {/* Floating orbs */}
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/4 left-[8%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"
          />
          <motion.div
            animate={{ y: [0, 16, 0], scale: [1, 0.95, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-1/4 right-[10%] w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] pointer-events-none"
          />

          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex items-center gap-2.5 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-blue-300 text-xs font-bold tracking-wide">Over 1,200+ companies trust HireX</span>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-center max-w-5xl mx-auto mb-6"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 leading-[1.05]">
              Your Dream Job Is
              <br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  One Click Away
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/0 via-cyan-400 to-blue-400/0 rounded-full origin-left"
                />
              </span>
            </h1>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Join <span className="text-white font-semibold">50,000+ engineers</span> who found their next big opportunity. 
              Top companies. Real roles. Zero noise.
            </p>
          </motion.div>

          {/* Search box — hero version */}
          <SmartSearchBox
            query={query}
            location={location}
            onQueryChange={setQuery}
            onLocationChange={setLocation}
            onSearch={handleSearch}
            onQueryClear={() => {
              setSearchedQuery('');
              handleSearch('', location);
            }}
            onLocationClear={() => {
              setSearchedLocation('');
              handleSearch(query, '');
            }}
          />

          {/* Popular skills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-2 mb-12"
          >
            <span className="text-slate-600 text-xs font-medium mr-1">Trending:</span>
            {HERO_SKILLS.map((skill, i) => (
              <motion.button
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.04 }}
                onClick={() => {
                  setQuery(skill);
                  setSearchedQuery(skill);
                  setSearchedLocation(location);
                  handleSearch(skill, location);
                }}
                className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/30 hover:bg-blue-500/10 text-slate-400 hover:text-blue-300 text-[11px] font-semibold transition-all"
              >
                {skill}
              </motion.button>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-8 sm:gap-16"
          >
            {[
              { value: 12400, suffix: '+', label: 'Open Roles', icon: Briefcase, color: 'text-blue-400' },
              { value: 1200, suffix: '+', label: 'Companies', icon: Building2, color: 'text-cyan-400' },
              { value: 50000, suffix: '+', label: 'Hired This Year', icon: Trophy, color: 'text-amber-400' },
            ].map(({ value, suffix, label, icon: Icon, color }) => (
              <div key={label} className="text-center">
                <div className="flex items-baseline gap-1 justify-center">
                  <Icon className={`w-4 h-4 ${color} mb-1`} />
                  <p className={`text-3xl font-black ${color}`}><AnimatedNumber value={value} suffix={suffix} /></p>
                </div>
                <p className="text-slate-500 text-xs font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ══════ BODY ══════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Company strip */}
          {companies?.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-blue-400" />Actively Hiring
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {companies.map(c => {
                  const col = companyColor(c.company);
                  return (
                    <button key={c.company}
                      onClick={() => { setQuery(c.company); setLocation(''); setTimeout(() => fetchJobs(true), 50); }}
                      className="shrink-0 flex items-center gap-2 px-3 py-2 bg-[#0a1628] border border-white/[0.07] rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:border-white/[0.14] transition-all"
                    >
                      <div className={`w-5 h-5 rounded-md ${col.bg} border ${col.border} flex items-center justify-center text-[8px] font-black ${col.text} shrink-0`}>
                        {companyInitials(c.company)}
                      </div>
                      {c.company}
                      <span className="text-slate-600 text-[10px] bg-white/5 px-1.5 py-0.5 rounded-md">{c.jobCount}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
              <FilterPanel filters={filters} setFilters={setFilters} onApply={handleApplyFilters} onReset={handleResetFilters} activeCount={activeFilterCount} />
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Results bar */}
              <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  {!initialLoad && (
                    <p className="text-xs text-slate-500">
                      <span className="text-white font-bold">{jobs.length}{hasMore ? '+' : ''}</span>
                      {searchedQuery || searchedLocation
                        ? <> results{searchedQuery ? ` for "${searchedQuery}"` : ''}{searchedLocation ? ` in ${searchedLocation}` : ''}</>
                        : <> open positions</>}
                    </p>
                  )}
                  {activeFilters.isRemote === 'true' && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold">
                      Remote <button onClick={() => setActiveFilters(f => ({ ...f, isRemote: '' }))} className="hover:text-red-400 transition-colors"><X className="w-2.5 h-2.5" /></button>
                    </span>
                  )}
                  {(searchedQuery || searchedLocation || activeFilterCount > 0) && (
                    <button
                      onClick={handleClearAll}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-[10px] font-bold transition-all"
                    >
                      <X className="w-2.5 h-2.5" />Clear All
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setFiltersOpen(f => !f)}
                    className={`lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold transition-all ${
                      activeFilterCount > 0 ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-white/[0.04] border-white/[0.08] text-slate-400'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />Filters{activeFilterCount > 0 && ` (${activeFilterCount})`}
                  </button>
                </div>
              </div>

              {/* Mobile filters */}
              <AnimatePresence>
                {filtersOpen && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden overflow-hidden mb-4">
                    <div className="bg-[#0a1628] border border-white/[0.08] rounded-2xl p-4 space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {[{label:'All',value:''},{label:'Remote',value:'true'},{label:'On-site',value:'false'}].map(opt => (
                          <button key={opt.value} onClick={() => setFilters(f => ({ ...f, isRemote: opt.value as Filters['isRemote'] }))}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${filters.isRemote === opt.value ? 'bg-blue-600/20 border-blue-500/40 text-blue-400' : 'bg-white/[0.04] border-white/[0.08] text-slate-400'}`}
                          >{opt.label}</button>
                        ))}
                      </div>
                      <button onClick={handleApplyFilters} className="w-full bg-blue-600 hover:bg-blue-500 text-[#020617] font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all">Apply</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-sm text-red-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />{error}
                  </motion.div>
                )}
              </AnimatePresence>

              {initialLoad ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => <JobCardSkeleton key={i} />)}
                </div>
              ) : (
                <>
                  {jobs.length === 0 && !loading ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mb-4">
                        <Briefcase className="w-7 h-7 text-slate-700" />
                      </div>
                      <h3 className="text-white font-black text-lg mb-2">No results found</h3>
                      <p className="text-slate-500 text-sm max-w-xs mb-5">Try different keywords or remove some filters.</p>
                      {(query || location || activeFilterCount > 0) && (
                        <button onClick={() => { setQuery(''); setLocation(''); handleResetFilters(); }}
                          className="px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all"
                        >Clear search</button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                    </div>
                  )}
                  {loading && !initialLoad && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {Array.from({ length: 3 }).map((_, i) => <JobCardSkeleton key={i} />)}
                    </div>
                  )}
                  <div ref={sentinelRef} className="h-8" />
                  {!hasMore && jobs.length > 0 && !loading && (
                    <div className="flex items-center gap-3 py-8">
                      <div className="flex-1 h-px bg-white/[0.06]" />
                      <p className="text-xs text-slate-700 font-medium">All {jobs.length} positions shown</p>
                      <div className="flex-1 h-px bg-white/[0.06]" />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function HirexSearchPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center">
//         <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
//       </div>
//     }>
//       <HirexSearchInner />
//     </Suspense>
//   );
// }

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-blue-600/[0.08] blur-[180px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/[0.05] blur-[140px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/[0.04] blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_60%,#020617_100%)]" />
      </div>

      <div className="relative z-10">
        <NavbarSkeleton />

        {/* Hero skeleton */}
        <div className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4">

          {/* Pill badge */}
          <div className="mb-8 h-9 w-72 rounded-full skeleton-shimmer bg-white/[0.04]" />

          {/* Headline */}
          <div className="text-center max-w-5xl mx-auto mb-6 space-y-4 w-full">
            <div className="h-14 sm:h-16 lg:h-20 w-3/4 mx-auto rounded-2xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-14 sm:h-16 lg:h-20 w-2/3 mx-auto rounded-2xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-6 w-2/3 mx-auto rounded-xl skeleton-shimmer bg-white/[0.04] mt-2" />
            <div className="h-6 w-1/2 mx-auto rounded-xl skeleton-shimmer bg-white/[0.04]" />
          </div>

          {/* Search box */}
          <div className="w-full max-w-3xl mx-auto mb-6">
            <div className="p-1.5 bg-white/[0.05] border border-white/[0.12] rounded-2xl">
              <div className="flex flex-col sm:flex-row gap-0">
                <div className="flex-1 h-14 skeleton-shimmer bg-white/[0.04] rounded-xl sm:rounded-r-none" />
                <div className="flex-1 h-14 skeleton-shimmer bg-white/[0.04] rounded-xl sm:rounded-l-none sm:rounded-r-none border-t sm:border-t-0 sm:border-l border-white/[0.06] mt-1.5 sm:mt-0 sm:ml-1.5" />
                <div className="h-14 w-full sm:w-36 skeleton-shimmer bg-white/[0.06] rounded-xl mt-1.5 sm:mt-0 sm:ml-1.5" />
              </div>
            </div>
          </div>

          {/* Popular skills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <div className="h-3.5 w-16 rounded skeleton-shimmer bg-white/[0.04] mr-1" />
            {[56, 64, 48, 72, 48, 56, 40, 56, 48, 64].map((w, i) => (
              <div key={i} className="h-8 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="text-center space-y-2">
                <div className="h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.04] mx-auto" />
                <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04] mx-auto" />
              </div>
            ))}
          </div>
        </div>

        {/* Body skeleton */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

          {/* Company strip */}
          <div className="mb-8">
            <div className="h-3 w-28 rounded skeleton-shimmer bg-white/[0.04] mb-3" />
            <div className="flex gap-2 overflow-hidden">
              {[96, 112, 88, 104, 96, 120, 88].map((w, i) => (
                <div key={i} className="h-10 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          <div className="flex gap-6 lg:gap-8">
            {/* Filter sidebar (desktop only) */}
            <aside className="hidden lg:block w-60 xl:w-64 shrink-0">
              <div className="bg-[#0a1628] border border-white/[0.08] rounded-2xl p-5 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
                <div className="h-px bg-white/[0.06]" />
                {/* Work type section */}
                <div className="space-y-2">
                  <div className="h-2.5 w-16 rounded skeleton-shimmer bg-white/[0.04] mb-3" />
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-10 w-full rounded-xl skeleton-shimmer bg-white/[0.04]" />
                  ))}
                </div>
                <div className="h-px bg-white/[0.06]" />
                {/* Salary section */}
                <div className="space-y-2">
                  <div className="h-2.5 w-24 rounded skeleton-shimmer bg-white/[0.04] mb-3" />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="h-10 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                    <div className="h-10 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                  </div>
                </div>
                {/* Apply button */}
                <div className="h-11 w-full rounded-xl skeleton-shimmer bg-white/[0.04]" />
              </div>
            </aside>

            {/* Job grid */}
            <div className="flex-1 min-w-0">
              {/* Results bar */}
              <div className="flex items-center justify-between mb-4 gap-3">
                <div className="h-4 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="flex items-center gap-2">
                  <div className="h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.04] lg:hidden" />
                  <div className="h-9 w-16 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                </div>
              </div>

              {/* Job cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HirexSearchPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HirexSearchInner />
    </Suspense>
  );
}