'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Mail, Phone, Globe, Edit3, Save, X,
  Loader2, CheckCircle2, AlertCircle, LogOut, ExternalLink,
  Users, Briefcase, ChevronRight, Clock, MapPin, Wifi,
  DollarSign, BarChart3, TrendingUp, Plus, Eye, FileText,
  ChevronDown, ChevronUp, Star, Zap, Target, Sparkles, Search,
  LayoutDashboard, Menu, Github, Linkedin
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ─── Types ─────────────────────────────────────────────────────────────── */
interface RecruiterUser {
  id: string; email: string; phone?: string; role: 'RECRUITER'; isVerified: boolean; createdAt: string;
  recruiterProfile?: { companyName: string; companySize?: string; website?: string };
}
interface JobApplication {
  id: string; status: 'APPLIED' | 'SHORTLISTED' | 'REJECTED'; resumeUrl?: string; createdAt: string;
  user: { id: string; email: string; candidateProfile?: { fullName: string; headline?: string; skills?: string[]; experienceYears?: number } };
}
interface Job {
  id: string; title: string; description: string; company: string; location: string;
  isRemote: boolean; skills: string[]; salaryMin?: number; salaryMax?: number;
  createdAt: string; updatedAt: string; applications?: JobApplication[]; _count?: { applications: number };
}

/* ─── Constants ─────────────────────────────────────────────────────────── */
const statusConfig = {
  APPLIED:     { label: 'Applied',     bg: 'bg-sky-500/10',     text: 'text-sky-300',     border: 'border-sky-500/20',    dot: 'bg-sky-400' },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/20', dot: 'bg-blue-400' },
  REJECTED:    { label: 'Rejected',    bg: 'bg-rose-500/10',    text: 'text-rose-300',    border: 'border-rose-500/20',   dot: 'bg-rose-400' },
};
const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '501–1000', '1000+'];
const NAV_LINKS = [
  { name: 'Jobs', href: '/hirex/jobs' },
  { name: 'Browse Candidates', href: '/hirex/recruiter/candidates' },
  { name: 'AI Tests', href: '/hirex/ai-skill-tests' },
  { name: 'Insights', href: '/hirex/hiring-insights' },
];

/* ─── Toast ─────────────────────────────────────────────────────────────── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 4000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-6 right-5 z-[200] flex items-center gap-3 px-5 py-3.5 rounded-2xl border shadow-2xl text-sm font-semibold backdrop-blur-xl ${
        type === 'success' ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-300' : 'bg-rose-950/80 border-rose-500/30 text-rose-300'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
      {message}
    </motion.div>
  );
}

function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#03071a]/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl shadow-black/30 px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo isSticky={false} />

          {/* Nav links skeleton — recruiter has 4 links */}
          <div className="hidden md:flex items-center gap-1">
            {[48, 108, 60, 56].map((w, i) => (
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

/* ─── Navbar (consistent with HireX home) ───────────────────────────────── */
function Navbar({ user, onLogout }: { user: RecruiterUser | null; onLogout: () => void }) {
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
                    {user.recruiterProfile?.companyName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden sm:block text-[11px] font-bold text-slate-200 max-w-[100px] truncate">
                    {user.recruiterProfile?.companyName || user.email}
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
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-blue-300 text-[9px] font-black uppercase tracking-wider">Recruiter</span>
                      </div>
                      <Link href="/hirex/dashboard/recruiter" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                      >
                        <LayoutDashboard className="w-4 h-4 text-blue-400" />Dashboard
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

/* ─── Job Card ───────────────────────────────────────────────────────────── */
function JobCard({ job, index }: { job: Job; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const appCount = job.applications?.length ?? job._count?.applications ?? 0;
  const shortlisted = job.applications?.filter(a => a.status === 'SHORTLISTED').length ?? 0;
  const applied = job.applications?.filter(a => a.status === 'APPLIED').length ?? 0;
  const rejected = job.applications?.filter(a => a.status === 'REJECTED').length ?? 0;

  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} layout
      className="rounded-2xl bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] transition-all overflow-hidden group"
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center text-xl font-black text-blue-300 flex-shrink-0">
            {job.company.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-start gap-2 mb-2">
              <h3 className="text-white font-black text-sm sm:text-base">{job.title}</h3>
              {job.isRemote && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[10px] font-black">
                  <Wifi className="w-2.5 h-2.5" />Remote
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-500 mb-3">
              <span className="flex items-center gap-1"><Building2 className="w-3 h-3" />{job.company}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
              {(job.salaryMin || job.salaryMax) && (
                <span className="flex items-center gap-1 text-blue-400/70">
                  <DollarSign className="w-3 h-3" />
                  {job.salaryMin ? `$${(job.salaryMin / 1000).toFixed(0)}k` : ''}{job.salaryMin && job.salaryMax ? '–' : ''}{job.salaryMax ? `$${(job.salaryMax / 1000).toFixed(0)}k` : ''}
                </span>
              )}
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(job.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            {job.skills?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {job.skills.slice(0, 5).map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/8 text-slate-400 text-[10px] font-semibold">{s}</span>
                ))}
                {job.skills.length > 5 && <span className="px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/8 text-slate-500 text-[10px]">+{job.skills.length - 5}</span>}
              </div>
            )}
          </div>

          {/* Count + CTA */}
          <div className="flex sm:flex-col items-center sm:items-end gap-3 flex-shrink-0">
            <div className="text-center sm:text-right">
              <p className="text-3xl font-black text-white">{appCount}</p>
              <p className="text-[10px] text-slate-500 font-semibold">applicants</p>
            </div>
            <Link href={`/hirex/jobs/${job.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 text-blue-300 text-xs font-bold transition-all"
            >
              <Eye className="w-3.5 h-3.5" /><span className="hidden sm:inline">View Job</span>
            </Link>
          </div>
        </div>

        {/* Pipeline bar */}
        {appCount > 0 && (
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
              <span>Hiring Pipeline</span><span>{appCount} total</span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden flex">
              {applied > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(applied / appCount) * 100}%` }}
                  transition={{ duration: 0.9, delay: index * 0.1 + 0.3 }} className="h-full bg-sky-500" />
              )}
              {shortlisted > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(shortlisted / appCount) * 100}%` }}
                  transition={{ duration: 0.9, delay: index * 0.1 + 0.45 }} className="h-full bg-emerald-500" />
              )}
              {rejected > 0 && (
                <motion.div initial={{ width: 0 }} animate={{ width: `${(rejected / appCount) * 100}%` }}
                  transition={{ duration: 0.9, delay: index * 0.1 + 0.6 }} className="h-full bg-rose-500 rounded-r-full" />
              )}
            </div>
            <div className="flex gap-4 text-[10px]">
              <span className="flex items-center gap-1 text-sky-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-sky-400 inline-block" />{applied} applied</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />{shortlisted} shortlisted</span>
              <span className="flex items-center gap-1 text-rose-400 font-semibold"><span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />{rejected} rejected</span>
            </div>
          </div>
        )}

        {appCount > 0 && (
          <button onClick={() => setExpanded(!expanded)}
            className="mt-4 flex items-center gap-1.5 text-slate-500 hover:text-blue-300 text-xs font-bold transition-colors"
          >
            {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {expanded ? 'Hide' : 'Show'} applicants ({appCount})
          </button>
        )}
      </div>

      {/* Applicant list */}
      <AnimatePresence>
        {expanded && job.applications && job.applications.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }} className="border-t border-white/5 overflow-hidden"
          >
            <div className="p-4 sm:p-5 space-y-2.5">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Applicants</p>
              {job.applications.map((app, ai) => {
                const s = statusConfig[app.status];
                const cp = app.user.candidateProfile;
                return (
                  <motion.div key={app.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: ai * 0.05 }}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/10 flex items-center justify-center text-sm font-black text-slate-300 flex-shrink-0">
                      {cp?.fullName?.charAt(0)?.toUpperCase() || app.user.email.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm truncate">{cp?.fullName || 'Unknown'}</p>
                      <div className="flex flex-wrap gap-2 mt-0.5 text-xs text-slate-500">
                        <span>{app.user.email}</span>
                        {cp?.experienceYears !== undefined && <span>{cp.experienceYears}yr exp</span>}
                        {cp?.headline && <span className="truncate max-w-[180px]">{cp.headline}</span>}
                      </div>
                      {cp?.skills && (cp.skills as string[]).length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {(cp.skills as string[]).slice(0, 3).map(sk => (
                            <span key={sk} className="px-2 py-0.5 rounded-full bg-emerald-500/8 border border-emerald-500/15 text-blue-400/70 text-[10px] font-semibold">{sk}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${s.bg} ${s.text} ${s.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
                      </span>
                      {app.resumeUrl && (
                        <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────────────── */
export default function RecruiterProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<RecruiterUser | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'jobs'>('profile');
  const [form, setForm] = useState({ companySize: '', website: '' });

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [meRes, jobsRes] = await Promise.all([
          fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' }),
          fetch(`${API_BASE}/api/hirex/recruiter/jobs`, { credentials: 'include' }),
        ]);
        if (!meRes.ok) { router.push('/hirex/login'); return; }
        const meData: RecruiterUser = await meRes.json();
        if (meData.role !== 'RECRUITER') { router.push('/hirex/dashboard/candidate'); return; }
        setUser(meData);
        const rp = meData.recruiterProfile;
        setForm({ companySize: rp?.companySize || '', website: rp?.website || '' });
        if (jobsRes.ok) setJobs(await jobsRes.json());
      } catch { router.push('/hirex/login'); }
      finally { setLoading(false); }
    };
    fetchAll();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/recruiter/profile`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ companySize: form.companySize || undefined, website: form.website || undefined }),
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setUser(prev => prev ? { ...prev, recruiterProfile: { companyName: prev.recruiterProfile?.companyName || '', ...updated } } : prev);
      setEditing(false); setToast({ message: 'Profile updated successfully!', type: 'success' });
    } catch { setToast({ message: 'Failed to save. Try again.', type: 'error' }); }
    finally { setSaving(false); }
  };

  const handleLogout = async () => {
    await fetch(`${API_BASE}/api/hirex/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/hirex');
  };

  const totalApps = jobs.reduce((sum, j) => sum + (j.applications?.length ?? j._count?.applications ?? 0), 0);
  const totalShortlisted = jobs.reduce((sum, j) => sum + (j.applications?.filter(a => a.status === 'SHORTLISTED').length ?? 0), 0);
  const rp = user?.recruiterProfile;

  // if (loading) {
  //   return (
  //     <div className="min-h-screen bg-[#03071a] flex items-center justify-center">
  //       <div className="flex flex-col items-center gap-4">
  //         <div className="relative w-14 h-14">
  //           <div className="w-14 h-14 rounded-full border-2 border-emerald-500/20 border-t-emerald-500 animate-spin" />
  //           <div className="absolute inset-2 rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20" />
  //         </div>
  //         <p className="text-slate-500 text-sm font-medium">Loading your dashboard…</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (loading) return (
  <div className="min-h-screen bg-[#03071a]" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>
    <NavbarSkeleton/>
    {/* Background */}
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-violet-700/8 blur-[160px]" />
      <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-600/6 blur-[130px]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">

      {/* ── Hero skeleton ── */}
      <div className="relative overflow-hidden rounded-3xl mb-6 bg-gradient-to-br from-violet-950/60 via-[#06101f] to-cyan-950/40 border border-white/[0.07] p-7 sm:p-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-center">
          <div className="flex flex-col sm:flex-row gap-5 sm:items-center flex-1 min-w-0">
            {/* Company avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl skeleton-shimmer bg-white/[0.04] shrink-0" />
            <div className="space-y-3 flex-1">
              {/* Company name + badge */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="h-8 w-44 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                <div className="h-6 w-20 rounded-full skeleton-shimmer bg-white/[0.04]" />
              </div>
              {/* Meta */}
              <div className="flex flex-wrap gap-4">
                <div className="h-3.5 w-40 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3.5 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3.5 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
              {/* Website link */}
              <div className="h-3.5 w-36 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div className="h-11 w-36 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-11 w-36 rounded-2xl skeleton-shimmer bg-white/[0.04]" />
          </div>
        </div>

        {/* Metrics strip */}
        <div className="mt-7 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="text-center space-y-2">
              <div className="h-8 w-12 rounded skeleton-shimmer bg-white/[0.04] mx-auto" />
              <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04] mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat cards skeleton ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 space-y-3">
            <div className="w-8 h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-8 w-10 rounded skeleton-shimmer bg-white/[0.04]" />
            <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>
        ))}
      </div>

      {/* ── Tab bar skeleton ── */}
      <div className="flex gap-1 p-1 bg-white/[0.03] border border-white/[0.07] rounded-2xl w-fit mb-6">
        <div className="h-10 w-28 rounded-xl skeleton-shimmer bg-white/[0.04]" />
        <div className="h-10 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
      </div>

      {/* ── Jobs tab content skeleton (2 job cards) ── */}
      <div className="space-y-3">
        {[1, 2].map(i => (
          <div key={i} className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              {/* Company logo */}
              <div className="w-12 h-12 rounded-2xl skeleton-shimmer bg-white/[0.04] shrink-0" />
              <div className="flex-1 space-y-3">
                {/* Title + badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="h-5 w-48 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-5 w-16 rounded-full skeleton-shimmer bg-white/[0.04]" />
                </div>
                {/* Meta */}
                <div className="flex flex-wrap gap-3">
                  <div className="h-3.5 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3.5 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3.5 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {[60, 72, 56, 80, 64].map((w, j) => (
                    <div key={j} className="h-7 rounded-full skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
                  ))}
                </div>
              </div>
              {/* Count + CTA */}
              <div className="flex sm:flex-col items-center sm:items-end gap-3 shrink-0">
                <div className="space-y-1">
                  <div className="h-8 w-8 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
                <div className="h-9 w-24 rounded-xl skeleton-shimmer bg-white/[0.04]" />
              </div>
            </div>

            {/* Pipeline bar */}
            <div className="mt-5 space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3 w-12 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
              <div className="h-2 w-full rounded-full skeleton-shimmer bg-white/[0.04]" />
              <div className="flex gap-4">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-[#03071a] text-white" style={{ fontFamily: "'DM Sans', 'Inter', sans-serif" }}>

      {/* ── Deep space background (emerald tint for recruiter) ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-emerald-700/8 blur-[160px]" />
        <div className="absolute top-1/2 -left-20 w-[500px] h-[500px] rounded-full bg-cyan-600/6 blur-[130px]" />
        <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] rounded-full bg-teal-700/6 blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="rgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#rgrid)" />
        </svg>
      </div>

      <Navbar user={user} onLogout={handleLogout} />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">

        {/* ══════════════════════════════════════════════════════ HERO SECTION */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/60 via-[#06101f] to-cyan-950/40 rounded-3xl" />
          <div className="absolute inset-0 rounded-3xl border border-white/[0.07]" />
          <div className="absolute -top-16 -right-16 w-72 h-72 bg-violet-500/15 blur-[90px] rounded-full" />
          <div className="absolute -bottom-12 left-1/4 w-56 h-56 bg-cyan-400/10 blur-[70px] rounded-full" />

          <div className="relative z-10 p-7 sm:p-10">
            <div className="flex flex-col lg:flex-row gap-8 lg:items-center">

              {/* Company identity */}
              <div className="flex flex-col sm:flex-row gap-5 sm:items-center flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-violet-500 via-cyan-500 to-indigo-500 opacity-50 animate-pulse" />
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-violet-600/50 to-cyan-600/40 border border-white/10 flex items-center justify-center text-3xl font-black text-white">
                    {rp?.companyName?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  {user?.isVerified && (
                    <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-[#03071a] flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      {rp?.companyName || 'Your Company'}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-violet-300 text-[10px] font-black uppercase tracking-widest">
                      Recruiter
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mt-2">
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Mail className="w-3 h-3 text-blue-400/60" />{user?.email}</span>
                    {rp?.companySize && <span className="flex items-center gap-1.5 text-slate-500 text-xs"><Users className="w-3 h-3 text-cyan-400/60" />{rp.companySize} employees</span>}
                    <span className="flex items-center gap-1.5 text-slate-500 text-xs">
                      <Clock className="w-3 h-3 text-teal-400/60" />
                      Joined {new Date(user?.createdAt || '').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  {rp?.website && (
                    <a href={rp.website} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-3 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />{rp.website.replace(/^https?:\/\//, '')}<ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  )}
                </div>
              </div>

              {/* CTA cluster */}
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                <Link href="/hirex/jobs/new"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 hover:scale-[1.02] transition-all"
                >
                  <Plus className="w-4 h-4" />Post New Job
                </Link>
                <button onClick={() => setEditing(!editing)}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all ${
                    editing ? 'bg-white/5 border border-white/10 text-slate-400 hover:text-white' : 'bg-white/[0.04] border border-white/[0.1] text-slate-200 hover:bg-white/[0.08]'
                  }`}
                >
                  {editing ? <><X className="w-4 h-4" />Cancel</> : <><Edit3 className="w-4 h-4" />Edit Profile</>}
                </button>
              </div>
            </div>

            {/* Metrics strip */}
            <div className="mt-7 pt-6 border-t border-white/5 grid grid-cols-3 gap-4">
              {[
                { label: 'Active Jobs', value: jobs.length, color: 'text-blue-400' },
                { label: 'Total Applicants', value: totalApps, color: 'text-cyan-400' },
                { label: 'Shortlisted', value: totalShortlisted, color: 'text-teal-300' },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center">
                  <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
                  <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════════════════════════ EDIT FORM */}
        <AnimatePresence>
          {editing && (
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 to-cyan-950/20 p-7 sm:p-9 mb-6 backdrop-blur-sm"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-7">
                <div className="h-6 w-1 rounded-full bg-gradient-to-b from-blue-500 to-cyan-500" />
                <h2 className="font-black text-white text-sm tracking-tight">Edit Company Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Users className="w-3 h-3" />Company Size</label>
                  <div className="grid grid-cols-3 gap-2">
                    {COMPANY_SIZES.map(size => (
                      <button key={size} onClick={() => setForm(f => ({ ...f, companySize: f.companySize === size ? '' : size }))}
                        className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          form.companySize === size
                            ? 'bg-gradient-to-r from-blue-600/30 to-cyan-600/20 border-emerald-500/40 text-emerald-200'
                            : 'bg-white/[0.03] border-white/8 text-slate-400 hover:border-white/15 hover:text-white'
                        }`}
                      >{size}</button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5"><Globe className="w-3 h-3" />Website</label>
                  <input type="url" placeholder="https://yourcompany.com"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-white/5">
                <button onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm font-bold transition-all">Cancel</button>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/30"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Save Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════════════════════════════════════════════════ STAT CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Active Jobs', value: jobs.length, icon: Briefcase, from: 'from-emerald-500', to: 'to-teal-500', glow: 'shadow-emerald-900/30' },
            { label: 'Total Applicants', value: totalApps, icon: Users, from: 'from-cyan-500', to: 'to-sky-500', glow: 'shadow-cyan-900/30' },
            { label: 'Shortlisted', value: totalShortlisted, icon: Star, from: 'from-teal-500', to: 'to-emerald-500', glow: 'shadow-teal-900/30' },
            { label: 'Avg per Job', value: jobs.length > 0 ? Math.round(totalApps / jobs.length) : 0, icon: BarChart3, from: 'from-amber-500', to: 'to-orange-500', glow: 'shadow-amber-900/30' },
          ].map(({ label, value, icon: Icon, from, to, glow }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
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
          {(['profile', 'jobs'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${activeTab === tab ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {activeTab === tab && (
                <motion.div layoutId="r-tab-bg" className="absolute inset-0 bg-gradient-to-r from-violet-600 to-cyan-600 rounded-xl"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                {tab === 'profile' ? <Building2 className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
                {tab === 'profile' ? 'Company' : `Jobs${jobs.length > 0 ? ` (${jobs.length})` : ''}`}
              </span>
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════ TAB CONTENT */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div key="company-tab" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-4"
            >
              {/* Company info card */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 space-y-3 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/5 blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center">
                    <Building2 className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-black text-white text-sm">Company Info</h3>
                </div>
                {[
                  { Icon: Building2, label: 'Company Name', value: rp?.companyName, color: 'text-blue-300', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                  { Icon: Users, label: 'Team Size', value: rp?.companySize ? `${rp.companySize} employees` : null, color: 'text-cyan-300', bg: 'bg-cyan-500/10 border-cyan-500/20' },
                  { Icon: Globe, label: 'Website', value: rp?.website, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', isLink: true },
                ].map(({ Icon, label, value, color, bg, isLink }) => (
                  <div key={label} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                    <div className={`w-10 h-10 rounded-xl ${bg} border flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">{label}</p>
                      {value ? (
                        isLink ? (
                          <a href={value} target="_blank" rel="noopener noreferrer"
                            className={`${color} font-semibold text-sm truncate flex items-center gap-1 hover:underline`}
                          >{value.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3 opacity-50" /></a>
                        ) : (
                          <p className="text-white font-bold text-sm">{value}</p>
                        )
                      ) : (
                        <span className="text-slate-600 italic text-sm">Not specified</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions card */}
              <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 space-y-4 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-600/5 blur-[60px] pointer-events-none" />
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Zap className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h3 className="font-black text-white text-sm">Quick Actions</h3>
                </div>

                <Link href="/hirex/jobs/new"
                  className="flex items-center gap-4 p-4 rounded-xl bg-blue-600/8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Plus className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">Post a New Job</p>
                    <p className="text-slate-500 text-xs mt-0.5">Reach top engineers instantly</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
                </Link>

                <Link href="/hirex/recruiter/candidates"
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Search className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-bold text-sm">Browse Candidates</p>
                    <p className="text-slate-500 text-xs mt-0.5">Discover verified engineering talent</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
                </Link>

                {/* Pipeline health meter */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm">Pipeline Health</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                        <motion.div initial={{ width: 0 }}
                          animate={{ width: totalApps > 0 ? `${Math.min((totalShortlisted / totalApps) * 100, 100)}%` : '0%' }}
                          transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        />
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">
                        {totalApps > 0 ? Math.round((totalShortlisted / totalApps) * 100) : 0}% qualified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'jobs' && (
            <motion.div key="jobs-tab" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              {jobs.length === 0 ? (
                <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.02] py-20 flex flex-col items-center text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 to-transparent" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                      <Briefcase className="w-7 h-7 text-blue-400" />
                    </div>
                    <h3 className="text-white font-black text-xl mb-2">Start Building Your Team</h3>
                    <p className="text-slate-500 text-sm max-w-xs mb-6">Post your first role and get matched with top candidates in minutes.</p>
                    <Link href="/hirex/jobs/new"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 hover:scale-[1.02] transition-all"
                    >
                      <Plus className="w-4 h-4" />Post First Job
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {jobs.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.05] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-700 text-xs">© 2015–{new Date().getFullYear()} CLC HireX · Built for the ambitious.</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
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