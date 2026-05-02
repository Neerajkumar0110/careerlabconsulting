//jobs/[id]/edit/page.tsx

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Briefcase, MapPin, Building2, Wifi, DollarSign,
  Code2, FileText, Plus, X, Loader2, CheckCircle2, AlertCircle,
  Zap, Save, Eye, Trash2, Shield, Info, RotateCcw, Users,
  LayoutDashboard,
  LogOut,
  Menu,
  ChevronDown,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ───────────────────────────────────────────────── */
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
  _count?: { applications: number };
}

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.48, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

/* ── Field wrapper ───────────────────────────────────────── */
function Field({
  label, hint, required, icon: Icon, error, children,
}: {
  label: string; hint?: string; required?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 group">
      <label className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest group-focus-within:text-blue-400 transition-colors">
        {Icon && <Icon className="w-3 h-3" />}{label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      {!error && hint && <p className="text-[10px] text-slate-600">{hint}</p>}
    </div>
  );
}

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

/* ── Toast ───────────────────────────────────────────────── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 5000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className={`fixed bottom-6 right-4 sm:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl text-sm font-semibold max-w-sm ${
        type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

/* ── Delete Modal ────────────────────────────────────────── */
function DeleteModal({ onClose, onConfirm, loading }: { onClose: () => void; onConfirm: () => void; loading: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm bg-[#0a1628] border border-red-500/20 rounded-[2rem] p-6 sm:p-8 shadow-2xl text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
          <Trash2 className="w-6 h-6 text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg mb-2">Delete This Job?</h3>
        <p className="text-slate-400 text-sm mb-6">All applications will be permanently removed. This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white text-sm font-bold transition-all">Cancel</button>
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

/* ── Main Page ───────────────────────────────────────────── */
export default function EditJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params?.id as string;

  const [originalJob, setOriginalJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    isRemote: false,
    description: '',
    salaryMin: '',
    salaryMax: '',
  });
  const [skills, setSkills] = useState<string[]>([]);

  /* ── Fetch job ── */
  useEffect(() => {
    const init = async () => {
      try {
        const [meRes, jobRes] = await Promise.all([
          fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' }),
          fetch(`${API_BASE}/api/hirex/jobs/${jobId}`, { credentials: 'include' }),
        ]);
        if (!meRes.ok) { router.push('/hirex/login'); return; }
        const me = await meRes.json();
        if (me.role !== 'RECRUITER') { router.push('/hirex/dashboard/candidate'); return; }

        if (!jobRes.ok) { router.push('/hirex/jobs'); return; }
        const job: Job = await jobRes.json();

        if (job.postedById !== me.id) {
          router.push(`/hirex/jobs/${jobId}`);
          return;
        }

        setOriginalJob(job);
        setForm({
          title: job.title,
          company: job.company,
          location: job.location,
          isRemote: job.isRemote,
          description: job.description,
          salaryMin: job.salaryMin?.toString() || '',
          salaryMax: job.salaryMax?.toString() || '',
        });
        setSkills(job.skills as string[]);
      } catch { router.push('/hirex/jobs'); }
      finally { setLoading(false); }
    };
    init();
  }, [jobId, router]);

  /* ── Track changes ── */
  useEffect(() => {
    if (!originalJob) return;
    const changed =
      form.title !== originalJob.title ||
      form.company !== originalJob.company ||
      form.location !== originalJob.location ||
      form.isRemote !== originalJob.isRemote ||
      form.description !== originalJob.description ||
      form.salaryMin !== (originalJob.salaryMin?.toString() || '') ||
      form.salaryMax !== (originalJob.salaryMax?.toString() || '') ||
      JSON.stringify(skills) !== JSON.stringify(originalJob.skills);
    setHasChanges(changed);
  }, [form, skills, originalJob]);

  const updateForm = (key: keyof typeof form, value: string | boolean) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) setSkills(prev => [...prev, s]);
    setNewSkill('');
  };

  const resetToOriginal = () => {
    if (!originalJob) return;
    setForm({
      title: originalJob.title,
      company: originalJob.company,
      location: originalJob.location,
      isRemote: originalJob.isRemote,
      description: originalJob.description,
      salaryMin: originalJob.salaryMin?.toString() || '',
      salaryMax: originalJob.salaryMax?.toString() || '',
    });
    setSkills(originalJob.skills as string[]);
    setErrors({});
  };

  /* ── Validate ── */
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.title.trim()) errs.title = 'Job title is required';
    if (!form.company.trim()) errs.company = 'Company name is required';
    if (!form.location.trim()) errs.location = 'Location is required';
    if (!form.description.trim()) errs.description = 'Description is required';
    if (form.description.trim().length < 30) errs.description = 'Description should be at least 30 characters';
    if (form.salaryMin && form.salaryMax && parseInt(form.salaryMin) > parseInt(form.salaryMax)) {
      errs.salaryMax = 'Max salary must be greater than min salary';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /* ── Save ── */
  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title.trim(),
          description: form.description.trim(),
          company: form.company.trim(),
          location: form.location.trim(),
          isRemote: form.isRemote,
          skills,
          salaryMin: form.salaryMin ? parseInt(form.salaryMin) : null,
          salaryMax: form.salaryMax ? parseInt(form.salaryMax) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update');
      setOriginalJob(data);
      setHasChanges(false);
      setToast({ message: 'Job updated successfully! ✓', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message || 'Something went wrong.', type: 'error' });
    } finally { setSaving(false); }
  };

  /* ── Delete ── */
  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs/${jobId}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      router.push('/hirex/dashboard/recruiter');
    } catch {
      setToast({ message: 'Failed to delete job.', type: 'error' });
      setShowDeleteModal(false);
    } finally { setDeleting(false); }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-500 animate-spin" />
        <p className="text-slate-500 text-sm font-mono">Loading job details…</p>
      </motion.div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-emerald-500/30">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* ── Header ── */}
      <Navbar/>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 mt-18">

        {/* ── Page Header ── */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mb-8 sm:mb-10">
          <motion.div variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-[0.2em] mb-4"
          >
            <Shield className="w-3 h-3" />Editing Job Post
          </motion.div>
          <motion.h1 variants={fadeUp} custom={1} className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1">
            Edit Job Post
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="text-slate-400 text-sm flex flex-wrap items-center gap-3">
            <span className="font-mono text-slate-600 text-xs">#{jobId.slice(0, 12)}…</span>
            {originalJob?._count?.applications !== undefined && (
              <span className="flex items-center gap-1 text-cyan-400 text-xs font-semibold">
                <Users className="w-3 h-3" />{originalJob._count.applications} applicant{originalJob._count.applications !== 1 ? 's' : ''}
              </span>
            )}
          </motion.p>
        </motion.div>

        {/* ── Changes indicator ── */}
        <AnimatePresence>
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 px-4 py-3 mb-6 rounded-2xl bg-amber-500/8 border border-amber-500/20"
            >
              <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <p className="text-amber-300 text-sm font-semibold flex-1">You have unsaved changes.</p>
              <button onClick={resetToOriginal} className="flex items-center gap-1.5 text-slate-500 hover:text-white text-xs font-bold transition-colors">
                <RotateCcw className="w-3.5 h-3.5" />Reset
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Form ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white/[0.03] border border-white/10 rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-2xl space-y-6 sm:space-y-8"
        >
          {/* ── Section: Basics ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <h2 className="text-sm font-bold text-white">Basic Information</h2>
            </div>
            <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-5">
              <motion.div variants={fadeUp} custom={0}>
                <Field label="Job Title" required icon={Briefcase} error={errors.title}>
                  <input type="text" placeholder="e.g. Senior Full-Stack Engineer"
                    className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 ${
                      errors.title ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500/50 focus:ring-emerald-500/20'
                    }`}
                    value={form.title} onChange={e => updateForm('title', e.target.value)}
                  />
                </Field>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <motion.div variants={fadeUp} custom={1}>
                  <Field label="Company Name" required icon={Building2} error={errors.company}>
                    <input type="text" placeholder="Acme Technologies"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 ${
                        errors.company ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500/50 focus:ring-emerald-500/20'
                      }`}
                      value={form.company} onChange={e => updateForm('company', e.target.value)}
                    />
                  </Field>
                </motion.div>
                <motion.div variants={fadeUp} custom={2}>
                  <Field label="Location" required icon={MapPin} error={errors.location}>
                    <input type="text" placeholder="San Francisco, CA"
                      className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 ${
                        errors.location ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500/50 focus:ring-emerald-500/20'
                      }`}
                      value={form.location} onChange={e => updateForm('location', e.target.value)}
                    />
                  </Field>
                </motion.div>
              </div>

              {/* Remote toggle */}
              <motion.div variants={fadeUp} custom={3}
                className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/8"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${form.isRemote ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-white/5 border border-white/10'}`}>
                    <Wifi className={`w-4 h-4 transition-colors ${form.isRemote ? 'text-blue-400' : 'text-slate-600'}`} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Remote Friendly</p>
                    <p className="text-slate-500 text-xs">Candidates can work from anywhere</p>
                  </div>
                </div>
                <button onClick={() => updateForm('isRemote', !form.isRemote)}
                  className="relative w-12 h-6 rounded-full transition-all focus:outline-none"
                >
                  <div className={`absolute inset-0 rounded-full transition-all ${form.isRemote ? 'bg-cyan-600' : 'bg-white/10'}`} />
                  <motion.div animate={{ x: form.isRemote ? 24 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm"
                  />
                </button>
              </motion.div>
            </motion.div>
          </div>

          <div className="h-px bg-white/5" />

          {/* ── Section: Description ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-blue-500 rounded-full" />
              <h2 className="text-sm font-bold text-white">Job Description</h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <FileText className="w-3 h-3" />Description <span className="text-red-400">*</span>
                </label>
                <span className={`text-[10px] font-mono ${form.description.length < 30 ? 'text-amber-400' : 'text-slate-600'}`}>
                  {form.description.length} chars
                </span>
              </div>
              <textarea rows={10}
                placeholder="Describe the role, responsibilities, requirements, and what makes your company a great place to work…"
                className={`w-full bg-white/5 border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 resize-none leading-relaxed ${
                  errors.description ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-blue-500/50 focus:ring-blue-500/20'
                }`}
                value={form.description}
                onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: '' })); }}
              />
              {errors.description && <p className="text-red-400 text-xs flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.description}</p>}
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* ── Section: Skills ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-cyan-500 rounded-full" />
              <h2 className="text-sm font-bold text-white">Required Skills</h2>
            </div>
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                <AnimatePresence>
                  {skills.map(s => (
                    <motion.span key={s} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-cyan-300 text-xs font-semibold"
                    >
                      {s}
                      <button onClick={() => setSkills(prev => prev.filter(x => x !== s))} className="hover:text-red-400 transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
              <div className="flex gap-2">
                <input type="text" placeholder="Add a skill (e.g. React, Python)…"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-blue-500/50 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-700"
                  value={newSkill}
                  onChange={e => setNewSkill(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <button onClick={addSkill}
                  className="px-4 py-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/30 transition-all text-sm font-bold flex items-center gap-1 shrink-0"
                >
                  <Plus className="w-4 h-4" />Add
                </button>
              </div>
            </div>
          </div>

          <div className="h-px bg-white/5" />

          {/* ── Section: Compensation ── */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-1 h-5 bg-amber-500 rounded-full" />
              <h2 className="text-sm font-bold text-white">Compensation</h2>
            </div>
            <div className="space-y-4">
              <Field label="Salary Range (Annual USD)" icon={DollarSign} hint="Transparent ranges attract 40% more applicants." error={errors.salaryMax}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-bold">$</span>
                    <input type="number" placeholder="80,000" min={0}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-12 py-3.5 text-sm text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all placeholder:text-slate-700"
                      value={form.salaryMin} onChange={e => updateForm('salaryMin', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-xs">Min</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-bold">$</span>
                    <input type="number" placeholder="120,000" min={0}
                      className={`w-full bg-white/5 border rounded-xl pl-8 pr-12 py-3.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${
                        errors.salaryMax ? 'border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/10 focus:border-amber-500/50 focus:ring-amber-500/20'
                      }`}
                      value={form.salaryMax} onChange={e => updateForm('salaryMax', e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-xs">Max</span>
                  </div>
                </div>
              </Field>
            </div>
          </div>

          {/* ── Warning if applicants exist ── */}
          {(originalJob?._count?.applications ?? 0) > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15"
            >
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-amber-300">Note:</strong> This job has {originalJob?._count?.applications} existing application{(originalJob?._count?.applications ?? 0) !== 1 ? 's' : ''}. Changes will apply immediately and existing applicants will see the updated posting.
              </p>
            </motion.div>
          )}

          {/* ── Action buttons ── */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-white/5">
            <button onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-400 hover:text-white text-sm font-bold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />Discard
            </button>
            <div className="flex gap-3">
              {hasChanges && (
                <button onClick={resetToOriginal}
                  className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-slate-500 hover:text-slate-300 text-sm font-bold transition-all"
                >
                  <RotateCcw className="w-4 h-4" />Reset
                </button>
              )}
              <motion.button
                whileHover={hasChanges ? { scale: 1.02 } : {}}
                whileTap={hasChanges ? { scale: 0.98 } : {}}
                onClick={handleSave}
                disabled={saving || !hasChanges}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/30"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving…' : hasChanges ? 'Save Changes' : 'No Changes'}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showDeleteModal && <DeleteModal onClose={() => setShowDeleteModal(false)} onConfirm={handleDelete} loading={deleting} />}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </main>
  );
}