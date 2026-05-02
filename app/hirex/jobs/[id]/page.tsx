// jobs/[id]/page.tsx

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, MapPin, Building2, Wifi, DollarSign, Clock,
  Briefcase, CheckCircle2, AlertCircle, Loader2, Send,
  ChevronRight, ExternalLink, Users, Zap, FileText,
  X, Edit3, Trash2, Eye, TrendingUp, Shield,
  Code2, Globe, ChevronDown, ChevronUp, LogOut,
  Banknote, Share2, Bookmark, BadgeCheck, Star,
  Menu,
  LayoutDashboard,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

type AppStatus = 'APPLIED' | 'SHORTLISTED' | 'REJECTED';

interface Application {
  id: string;
  status: AppStatus;
  resumeUrl?: string;
  createdAt: string;
  user: {
    id: string;
    email: string;
    candidateProfile?: {
      fullName: string;
      headline?: string;
      skills?: string[];
      experienceYears?: number;
    };
  };
}

interface Job {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  isRemote: boolean;
  skills: string[];
  salaryMin?: number;
  salaryMax?: number;
  postedById: string;
  createdAt: string;
  updatedAt: string;
  _count?: { applications: number };
  applications: Application[];
  postedBy?: {
    id: string;
    email: string;
    recruiterProfile?: { companyName: string; companySize?: string; website?: string };
  };
}

interface CurrentUser { id: string; role: 'CANDIDATE' | 'RECRUITER'; email: string; }

const statusCfg: Record<AppStatus, { label: string; bg: string; text: string; border: string; dot: string }> = {
  APPLIED:     { label: 'Applied',     bg: 'bg-blue-500/15',    text: 'text-blue-400',    border: 'border-blue-500/30',    dot: 'bg-blue-400'    },
  SHORTLISTED: { label: 'Shortlisted', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', dot: 'bg-emerald-400' },
  REJECTED:    { label: 'Rejected',    bg: 'bg-red-500/15',     text: 'text-red-400',     border: 'border-red-500/30',     dot: 'bg-red-400'     },
};

const AVATAR_COLORS = [
  { bg: 'bg-blue-400/20', border: 'border-blue-400/30', text: 'text-cyan-300' },
  { bg: 'bg-blue-500/20', border: 'border-blue-500/30', text: 'text-blue-300' },
  { bg: 'bg-violet-500/20', border: 'border-violet-500/30', text: 'text-violet-300' },
  { bg: 'bg-amber-500/20', border: 'border-amber-500/30', text: 'text-amber-300' },
];
const companyColor = (name: string) => {
  let h = 0; for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length];
};

const timeAgo = (dateStr: string) => {
  const d = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (d === 0) return 'Today'; if (d === 1) return 'Yesterday';
  if (d < 7) return `${d} days ago`; if (d < 30) return `${Math.floor(d / 7)} weeks ago`;
  return `${Math.floor(d / 30)} months ago`;
};

function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Logo isSticky={false} />

          {/* Nav links skeleton */}
          <div className="hidden md:flex items-center gap-1">
            {[56, 64, 56].map((w, i) => (
              <div key={i} className="h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>

          {/* Right side skeleton */}
          <div className="flex items-center gap-2">
            {/* Avatar pill */}
            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/5">
              <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.06]" />
              <div className="hidden sm:block h-3.5 w-20 rounded skeleton-shimmer bg-white/[0.06]" />
              <div className="h-3 w-3 rounded skeleton-shimmer bg-white/[0.06]" />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

/* ── Navbar ── */
function Navbar({ isOwner = false, onDelete }: { isOwner?: boolean; onDelete?: () => void }) {
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
                  className="px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-[11px] uppercase tracking-wider transition-all shadow-lg shadow-emerald-900/30"
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
                <div className="flex flex-col p-4 gap-1">
                  {NAV_LINKS.map(l => (
                    <Link key={l.name} href={l.href} onClick={() => setMenuOpen(false)}
                      className="px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                    >{l.name}</Link>
                  ))}
                </div>
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
  useEffect(() => { const t = setTimeout(onClose, 4500); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
      className={`fixed bottom-6 right-4 sm:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl text-sm font-semibold max-w-sm ${
        type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-cyan-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

/* ── Apply Modal ── */
function ApplyModal({ job, onClose, onSuccess }: { job: Job; onClose: () => void; onSuccess: (app: Application) => void }) {
  const [resumeUrl, setResumeUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${job.id}/apply`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ resumeUrl: resumeUrl.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Application failed');
      onSuccess(data);
    } catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-[#0a1628] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-black text-white mb-0.5">Apply for this Role</h3>
            <p className="text-slate-500 text-sm">{job.title} · {job.company}</p>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Info box */}
        <div className="mb-5 p-3.5 rounded-xl bg-blue-500/[0.06] border border-blue-500/[0.15]">
          <p className="text-xs text-blue-400/80 leading-relaxed">
            Your profile including skills and experience will automatically be shared with the recruiter. A resume link helps you stand out.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3 h-3" />Resume URL <span className="text-slate-700 normal-case font-normal tracking-normal">— optional but recommended</span>
            </label>
            <input type="url" placeholder="https://drive.google.com/your-resume.pdf"
              className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
              value={resumeUrl} onChange={e => setResumeUrl(e.target.value)}
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-red-300 text-xs flex items-center gap-2"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-sm font-bold transition-all">
              Cancel
            </button>
            <button onClick={handleApply} disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/30"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" />Submit Application</>}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Status Dropdown ── */
function StatusDropdown({ app, jobId, onUpdate }: { app: Application; jobId: string; onUpdate: (id: string, s: AppStatus) => void }) {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const cfg = statusCfg[app.status];

  const change = async (status: AppStatus) => {
    if (status === app.status) { setOpen(false); return; }
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}/applications/${app.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
        body: JSON.stringify({ status }),
      });
      if (res.ok) onUpdate(app.id, status);
    } catch {} finally { setSaving(false); setOpen(false); }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)} disabled={saving}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-bold border cursor-pointer hover:opacity-90 transition-all ${cfg.bg} ${cfg.text} ${cfg.border}`}
      >
        {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />}
        {cfg.label}
        <ChevronDown className="w-2.5 h-2.5 opacity-60" />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
            <motion.div initial={{ opacity: 0, y: 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }}
              className="absolute right-0 top-full mt-1.5 z-40 bg-[#0d1f38] border border-white/[0.1] rounded-2xl shadow-2xl overflow-hidden min-w-[140px]"
            >
              {(['APPLIED', 'SHORTLISTED', 'REJECTED'] as AppStatus[]).map(st => {
                const c = statusCfg[st];
                return (
                  <button key={st} onClick={() => change(st)}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold transition-all hover:bg-white/[0.05] ${app.status === st ? c.text : 'text-slate-400'}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />{c.label}
                    {app.status === st && <CheckCircle2 className="w-3 h-3 ml-auto opacity-60" />}
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

/* ── Delete Modal ── */
function DeleteModal({ onClose, onConfirm, loading }: { onClose: () => void; onConfirm: () => void; loading: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-sm bg-[#0a1628] border border-red-500/20 rounded-3xl p-6 sm:p-8 text-center shadow-2xl"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg mb-2">Delete this Job?</h3>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">This action is permanent. All applications for this job will also be removed.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white text-sm font-bold transition-all">Cancel</button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm transition-all disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4" />Delete</>}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Page ── */
export default function ViewJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [myApplication, setMyApplication] = useState<Application | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAllApplicants, setShowAllApplicants] = useState(false);

  const fetchJob = useCallback(async (): Promise<Job | null> => {
    const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}`, { credentials: 'include' });
    if (!res.ok) { router.push('/hirex/jobs'); return null; }
    return res.json();
  }, [jobId, router]);

  useEffect(() => {
    const init = async () => {
      try {
        const [jobData, meRes] = await Promise.all([
          fetchJob(),
          fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' }),
        ]);
        if (!jobData) return;
        setJob(jobData);
        if (meRes.ok) {
          const me = await meRes.json();
          setCurrentUser({ id: me.id, role: me.role, email: me.email });
          if (me.role === 'CANDIDATE') {
            const appsRes = await fetch(`${API_BASE}/api/hirex/candidate/applications`, { credentials: 'include' });
            if (appsRes.ok) {
              const apps = await appsRes.json();
              const ex = apps.find((a: any) => a.job?.id === jobId || a.jobId === jobId);
              if (ex) { setHasApplied(true); setMyApplication(ex); }
            }
          }
        }
      } catch { router.push('/hirex/jobs'); }
      finally { setLoading(false); }
    };
    init();
  }, [fetchJob, jobId, router]);

  const handleApplySuccess = useCallback(async (newApp: Application) => {
    setShowApplyModal(false); setHasApplied(true); setMyApplication(newApp);
    const refreshed = await fetchJob();
    if (refreshed) setJob(refreshed);
    setToast({ message: 'Application submitted! The recruiter has been notified. 🎉', type: 'success' });
  }, [fetchJob]);

  const handleStatusUpdate = (appId: string, status: AppStatus) => {
    setJob(prev => !prev ? prev : {
      ...prev, applications: prev.applications.map(a => a.id === appId ? { ...a, status } : a),
    });
    setToast({ message: `Status updated to ${statusCfg[status].label}.`, type: 'success' });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error();
      router.push('/hirex/dashboard/recruiter');
    } catch {
      setToast({ message: 'Failed to delete job.', type: 'error' }); setShowDeleteModal(false);
    } finally { setDeleting(false); }
  };

  // if (loading) return (
  //   <div className="min-h-screen bg-[#020617] flex items-center justify-center">
  //     <div className="flex flex-col items-center gap-3">
  //       <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
  //       <p className="text-slate-600 text-xs font-mono tracking-wider">Loading…</p>
  //     </div>
  //   </div>
  // );

  if (loading) return (
  <main className="min-h-screen bg-[#020617] text-white font-sans">
    <NavbarSkeleton />
    {/* Atmosphere */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-emerald-600/[0.05] blur-[180px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/[0.04] blur-[140px] rounded-full" />
    </div>

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-28">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        {/* ── Main Column Skeleton ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Hero card skeleton */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Company avatar */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl skeleton-shimmer bg-white/[0.04] shrink-0" />
              <div className="flex-1 space-y-3">
                {/* Badges row */}
                <div className="flex gap-2">
                  <div className="h-6 w-16 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-6 w-20 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                </div>
                {/* Title */}
                <div className="h-8 w-3/4 rounded-xl skeleton-shimmer bg-white/[0.04]" />
                <div className="h-8 w-1/2 rounded-xl skeleton-shimmer bg-white/[0.04] sm:hidden" />
                {/* Meta row */}
                <div className="flex flex-wrap gap-4">
                  <div className="h-4 w-28 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-4 w-24 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-4 w-20 rounded-lg skeleton-shimmer bg-white/[0.04]" />
                </div>
                <div className="h-3 w-48 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
            </div>
            {/* Quick stats */}
            <div className="mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04]" />
                  <div className="h-4 w-12 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </div>

          {/* Skills card skeleton */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
              <div className="h-4 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[80, 64, 96, 72, 56, 88].map(w => (
                <div key={w} className={`h-8 rounded-lg skeleton-shimmer bg-white/[0.04]`} style={{ width: `${w}px` }} />
              ))}
            </div>
          </div>

          {/* Description card skeleton */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-7">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
              <div className="h-4 w-32 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
            <div className="space-y-2.5">
              {[100, 90, 75, 95, 60, 85, 70, 55].map((w, i) => (
                <div key={i} className="h-3.5 rounded skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}%` }} />
              ))}
              <div className="h-3" />
              {[88, 72, 95, 65].map((w, i) => (
                <div key={i} className="h-3.5 rounded skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Sidebar Skeleton ── */}
        <div className="space-y-4 lg:sticky lg:top-24">

          {/* Apply CTA card */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5 space-y-3">
            <div className="h-12 w-full rounded-xl skeleton-shimmer bg-white/[0.04]" />
            <div className="h-3 w-3/4 mx-auto rounded skeleton-shimmer bg-white/[0.04]" />
          </div>

          {/* Overview card */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5">
            <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04] mb-4" />
            <div className="space-y-1">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                  <div className="w-3.5 h-3.5 rounded skeleton-shimmer bg-white/[0.04] shrink-0" />
                  <div className="h-3 w-16 rounded skeleton-shimmer bg-white/[0.04] flex-1" />
                  <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
                </div>
              ))}
            </div>
          </div>

          {/* Company info card */}
          <div className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5">
            <div className="h-3 w-32 rounded skeleton-shimmer bg-white/[0.04] mb-4" />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl skeleton-shimmer bg-white/[0.04]" />
              <div className="space-y-1.5">
                <div className="h-4 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
                <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
              </div>
            </div>
            <div className="h-3 w-40 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>

          {/* Browse more */}
          <div className="h-12 w-full rounded-2xl skeleton-shimmer bg-white/[0.04]" />
        </div>

      </div>
    </div>
  </main>
);

  if (!job) return null;

  const isOwner = currentUser?.id === job.postedById;
  const apps = job.applications ?? [];
  const appCount = apps.length;
  const shortlisted = apps.filter(a => a.status === 'SHORTLISTED').length;
  const appliedCount = apps.filter(a => a.status === 'APPLIED').length;
  const rejected = apps.filter(a => a.status === 'REJECTED').length;
  const visibleApps = showAllApplicants ? apps : apps.slice(0, 6);
  const col = companyColor(job.company);

  const salaryStr = (() => {
    if (!job.salaryMin && !job.salaryMax) return null;
    const fmt = (n: number) => n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : `₹${(n / 1000).toFixed(0)}K`;
    if (job.salaryMin && job.salaryMax) return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)}/yr`;
    if (job.salaryMin) return `${fmt(job.salaryMin)}+/yr`;
    return `Up to ${fmt(job.salaryMax!)}/yr`;
  })();

  return (
    <main className="min-h-screen mt-18 bg-[#020617] text-white font-sans selection:bg-emerald-500/30">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/3 w-[600px] h-[600px] bg-emerald-600/[0.05] blur-[180px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/[0.04] blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10">
        <Navbar
          isOwner={isOwner}
          onDelete={() => setShowDeleteModal(true)}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

            {/* ── Main Column ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Hero card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-8"
              >
                {/* Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/[0.07] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col sm:flex-row gap-5">
                  {/* Company avatar */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl ${col.bg} border ${col.border} flex items-center justify-center text-2xl font-black ${col.text} shrink-0 shadow-lg`}>
                    {job.company.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {job.isRemote && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                          <Wifi className="w-2.5 h-2.5" />Remote
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-slate-700">#{job.id.slice(0, 8)}</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight mb-2">
                      {job.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-600" />{job.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-600" />{job.location}
                      </span>
                      {salaryStr && (
                        <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <Banknote className="w-3.5 h-3.5" />{salaryStr}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 mt-2 flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />Posted {timeAgo(job.createdAt)} · {new Date(job.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="relative z-10 mt-5 pt-5 border-t border-white/[0.06] grid grid-cols-3 gap-4">
                  {[
                    { label: 'Applicants', value: (job._count?.applications ?? appCount).toString(), color: 'text-cyan-400' },
                    { label: 'Work Type', value: job.isRemote ? 'Remote' : 'On-site', color: job.isRemote ? 'text-emerald-400' : 'text-slate-300' },
                    { label: 'Salary', value: salaryStr || 'Not specified', color: salaryStr ? 'text-emerald-400' : 'text-slate-600' },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-[10px] text-slate-600 font-medium mb-0.5">{s.label}</p>
                      <p className={`text-xs font-bold ${s.color} truncate`}>{s.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Skills */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}
                className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-7"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Code2 className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Required Skills</h2>
                </div>
                {job.skills.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((s, i) => (
                      <motion.span key={s} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 + 0.2 }}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold font-mono hover:bg-emerald-500/15 transition-colors"
                      >{s}</motion.span>
                    ))}
                  </div>
                ) : <p className="text-slate-600 text-sm">No specific skills listed.</p>}
              </motion.div>

              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4 }}
                className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-7"
              >
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                  </div>
                  <h2 className="text-xs font-black text-white uppercase tracking-widest">Job Description</h2>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                  {job.description.split('\n').map((para, i) =>
                    para.trim()
                      ? <p key={i} className="text-slate-300 leading-relaxed text-sm mb-3 last:mb-0">{para}</p>
                      : <div key={i} className="h-2" />
                  )}
                </div>
              </motion.div>

              {/* Applicants panel — owner only */}
              {isOwner && (
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}
                  className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-6 sm:p-7"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                        <Users className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <h2 className="text-xs font-black text-white uppercase tracking-widest">Applicants</h2>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold">{appCount}</span>
                    </div>
                    {appCount > 0 && (
                      <div className="flex items-center gap-3 text-[10px]">
                        <span className="flex items-center gap-1 text-blue-400"><span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />{appliedCount}</span>
                        <span className="flex items-center gap-1 text-emerald-400"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />{shortlisted}</span>
                        <span className="flex items-center gap-1 text-red-400"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />{rejected}</span>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  {appCount > 0 && (
                    <div className="mb-5 h-1.5 rounded-full bg-white/[0.05] overflow-hidden flex">
                      {appliedCount > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${(appliedCount / appCount) * 100}%` }} transition={{ duration: 0.8, delay: 0.3 }} className="h-full bg-blue-500 rounded-l-full" />}
                      {shortlisted > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${(shortlisted / appCount) * 100}%` }} transition={{ duration: 0.8, delay: 0.4 }} className="h-full bg-emerald-500" />}
                      {rejected > 0 && <motion.div initial={{ width: 0 }} animate={{ width: `${(rejected / appCount) * 100}%` }} transition={{ duration: 0.8, delay: 0.5 }} className="h-full bg-red-500 rounded-r-full" />}
                    </div>
                  )}

                  {appCount === 0 ? (
                    <div className="flex flex-col items-center py-10 text-center">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-slate-700" />
                      </div>
                      <p className="text-slate-600 text-sm">No applications yet.</p>
                      <p className="text-slate-700 text-xs mt-1">Share this job to attract candidates.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {visibleApps.map((app, i) => {
                        const cp = app.user.candidateProfile;
                        return (
                          <motion.div key={app.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                            className="flex flex-col sm:flex-row sm:items-center gap-3 p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all group"
                          >
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-white/[0.08] flex items-center justify-center text-sm font-black text-slate-300 shrink-0">
                              {cp?.fullName?.charAt(0)?.toUpperCase() || app.user.email.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-bold text-sm">{cp?.fullName || 'Unknown Candidate'}</p>
                              <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 mt-0.5 text-xs text-slate-600">
                                <span className="truncate max-w-[180px]">{app.user.email}</span>
                                {cp?.experienceYears !== undefined && <span>{cp.experienceYears}yr exp</span>}
                              </div>
                              {cp?.skills && (cp.skills as string[]).length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1.5">
                                  {(cp.skills as string[]).slice(0, 3).map(sk => (
                                    <span key={sk} className="px-1.5 py-0.5 rounded-md bg-emerald-500/[0.07] border border-emerald-500/[0.14] text-emerald-500/70 text-[9px] font-mono">{sk}</span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                              <StatusDropdown app={app} jobId={job.id} onUpdate={handleStatusUpdate} />
                              {app.resumeUrl && (
                                <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-400 hover:text-white text-[11px] font-semibold transition-all"
                                >
                                  <FileText className="w-3 h-3" />CV
                                </a>
                              )}
                              <Link href={`/hirex/recruiter/candidates/${app.user.id}`}
                                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 text-cyan-400 text-[11px] font-bold transition-all"
                              >
                                <Eye className="w-3 h-3" />View
                              </Link>
                            </div>
                          </motion.div>
                        );
                      })}

                      {appCount > 6 && (
                        <button onClick={() => setShowAllApplicants(p => !p)}
                          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] text-slate-500 hover:text-white text-xs font-bold transition-all mt-1"
                        >
                          {showAllApplicants
                            ? <><ChevronUp className="w-4 h-4" />Show less</>
                            : <><ChevronDown className="w-4 h-4" />View all {appCount} applicants</>}
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-4 lg:sticky lg:top-24">

              {/* Apply CTA */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5"
              >
                {!currentUser ? (
                  <div className="space-y-3">
                    <p className="text-slate-400 text-sm text-center mb-4">Sign in to apply for this role</p>
                    <Link href="/hirex/login"
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-[#020617] font-black text-sm transition-all shadow-lg shadow-emerald-900/30"
                    >
                      Sign In to Apply <ChevronRight className="w-4 h-4" />
                    </Link>
                    <Link href="/hirex/signup"
                      className="w-full flex items-center justify-center py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-300 font-bold text-sm transition-all"
                    >Create Account</Link>
                  </div>
                ) : currentUser.role === 'RECRUITER' && !isOwner ? (
                  <div className="text-center py-3">
                    <Shield className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                    <p className="text-slate-600 text-sm">Recruiters cannot apply to jobs.</p>
                  </div>
                ) : currentUser.role === 'CANDIDATE' ? (
                  hasApplied ? (
                    <div className="text-center space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-emerald-400 font-black text-sm mb-1">Application Submitted</p>
                        {myApplication && (
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusCfg[myApplication.status].bg} ${statusCfg[myApplication.status].text} ${statusCfg[myApplication.status].border}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${statusCfg[myApplication.status].dot}`} />
                            {statusCfg[myApplication.status].label}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-xs">The recruiter will review your profile.</p>
                      <Link href="/hirex/dashboard/candidate"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-300 font-bold text-sm transition-all"
                      >
                        My Applications
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button onClick={() => setShowApplyModal(true)}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-sm transition-all shadow-lg shadow-emerald-900/30 group"
                      >
                        <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        Apply Now
                      </button>
                      <p className="text-[10px] text-slate-700 text-center">Your profile is shared with the recruiter</p>
                    </div>
                  )
                ) : isOwner ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-blue-500/[0.08] border border-blue-500/[0.18]">
                      <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      <span className="text-blue-400 text-xs font-bold">You own this posting</span>
                    </div>
                    <Link href={`/hirex/jobs/${job.id}/edit`}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-300 hover:text-white font-bold text-sm transition-all"
                    >
                      <Edit3 className="w-4 h-4" />Edit Job Post
                    </Link>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/[0.06] border border-red-500/[0.15] hover:border-red-500/[0.35] hover:bg-red-500/[0.12] text-red-400 hover:text-red-300 font-bold text-sm transition-all"
                    >
                      <Trash2 className="w-4 h-4" />Delete Job
                    </button>
                  </div>
                ) : null}
              </motion.div>

              {/* Overview card */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5"
              >
                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Overview</h3>
                <div className="space-y-1">
                  {[
                    { icon: Users, label: 'Applicants', value: (job._count?.applications ?? appCount).toString(), color: 'text-cyan-400' },
                    { icon: MapPin, label: 'Location', value: job.location, color: 'text-slate-300' },
                    { icon: Wifi, label: 'Work Style', value: job.isRemote ? 'Remote Friendly' : 'On-site Only', color: job.isRemote ? 'text-emerald-400' : 'text-slate-300' },
                    { icon: Clock, label: 'Posted', value: timeAgo(job.createdAt), color: 'text-slate-400' },
                  ].map(({ icon: Icon, label, value, color }) => (
                    <div key={label} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                      <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
                      <span className="text-slate-600 text-xs flex-1">{label}</span>
                      <span className={`text-xs font-bold ${color} truncate max-w-[120px] text-right`}>{value}</span>
                    </div>
                  ))}
                  {salaryStr && (
                    <div className="flex items-center gap-3 py-2.5">
                      <Banknote className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-slate-600 text-xs flex-1">Salary</span>
                      <span className="text-xs font-bold text-emerald-400">{salaryStr}</span>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Company info */}
              {job.postedBy?.recruiterProfile && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                  className="rounded-3xl bg-[#0a1628] border border-white/[0.08] p-5"
                >
                  <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">About the Company</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 border border-blue-500/20 flex items-center justify-center text-lg font-black text-blue-300">
                      {job.postedBy.recruiterProfile.companyName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{job.postedBy.recruiterProfile.companyName}</p>
                      {job.postedBy.recruiterProfile.companySize && (
                        <p className="text-slate-600 text-xs">{job.postedBy.recruiterProfile.companySize} employees</p>
                      )}
                    </div>
                  </div>
                  {job.postedBy.recruiterProfile.website && (
                    <a href={job.postedBy.recruiterProfile.website} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-xs font-semibold transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      {job.postedBy.recruiterProfile.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </motion.div>
              )}

              {/* Browse more */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Link href="/hirex/jobs"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-white/[0.12] text-slate-500 hover:text-white text-sm font-semibold transition-all"
                >
                  <Briefcase className="w-4 h-4" />Browse More Jobs
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showApplyModal && <ApplyModal job={job} onClose={() => setShowApplyModal(false)} onSuccess={handleApplySuccess} />}
        {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} loading={deleting} />}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </main>
  );
}