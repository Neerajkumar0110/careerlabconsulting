// jobs/new/page.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Briefcase, MapPin, Building2, Wifi, DollarSign,
  Code2, FileText, Plus, X, Loader2, CheckCircle2, AlertCircle,
  Zap, ChevronRight, Eye, Send, Shield, Sparkles,
  Info, LogOut, Banknote, Users, Globe, ChevronLeft,
  LayoutDashboard,
  Menu,
  ChevronDown,
} from 'lucide-react';
import Logo from '@/components/hirex/logo';

const API_BASE = process.env.NEXT_PUBLIC_HIREX_API_URL || 'https://clc-products-real-backend.vercel.app';

function NavbarSkeleton() {
  return (
    <header className="fixed left-0 right-0 z-[100] top-4 px-4 sm:px-6 lg:px-8">
      <nav className="max-w-7xl mx-auto bg-[#020617]/50 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6">
        <div className="flex items-center justify-between h-16">
          <Logo isSticky={false} />
          <div className="hidden md:flex items-center gap-1">
            {[56, 64, 56].map((w, i) => (
              <div key={i} className="h-8 rounded-xl skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
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

/* ── Input field wrapper ── */
function Field({
  label, hint, required, icon: Icon, error, children,
}: {
  label: string; hint?: string; required?: boolean; error?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[10px] font-black text-slate-500 uppercase tracking-widest">
        {Icon && <Icon className="w-3 h-3" />}
        {label}
        {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-400 text-xs flex items-center gap-1 mt-1">
          <AlertCircle className="w-3 h-3 shrink-0" />{error}
        </p>
      )}
      {!error && hint && <p className="text-[10px] text-slate-700 mt-1">{hint}</p>}
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 5000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
      className={`fixed bottom-6 right-4 sm:right-6 z-[100] flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl text-sm font-semibold max-w-sm ${
        type === 'success' ? 'bg-blue-400/10 border-blue-400/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
      }`}
    >
      {type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
      {message}
    </motion.div>
  );
}

/* ── Preview Modal ── */
function PreviewModal({ form, skills, onClose }: { form: any; skills: string[]; onClose: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl bg-[#0a1628] border border-white/[0.1] rounded-3xl p-6 sm:p-8 shadow-2xl my-4 sm:my-0 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Eye className="w-4 h-4 text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Preview</span>
            </div>
            <h2 className="text-xl font-black text-white">{form.title || 'Untitled Position'}</h2>
          </div>
          <button onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-slate-400 hover:text-white transition-all shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            {form.isRemote && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-400/10 border border-blue-400/20 text-blue-300 text-xs font-bold">
                <Wifi className="w-2.5 h-2.5" />Remote
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-slate-400">
            {form.company && <span className="flex items-center gap-1.5"><Building2 className="w-4 h-4 text-slate-600" />{form.company}</span>}
            {form.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-slate-600" />{form.location}</span>}
            {(form.salaryMin || form.salaryMax) && (
              <span className="flex items-center gap-1.5 text-blue-300">
                <Banknote className="w-4 h-4" />
                {form.salaryMin ? `₹${parseInt(form.salaryMin).toLocaleString()}` : ''}
                {form.salaryMin && form.salaryMax ? ' – ' : ''}
                {form.salaryMax ? `₹${parseInt(form.salaryMax).toLocaleString()}` : ''} / yr
              </span>
            )}
          </div>

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.map(s => (
                <span key={s} className="px-3 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/20 text-emerald-300 text-xs font-semibold font-mono">{s}</span>
              ))}
            </div>
          )}

          {form.description && (
            <div className="pt-4 border-t border-white/[0.07]">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mb-3">Description</p>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{form.description}</div>
            </div>
          )}
        </div>

        <button onClick={onClose}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-300 font-bold text-sm transition-all"
        >
          Close Preview
        </button>
      </motion.div>
    </motion.div>
  );
}

/* ── Step indicator ── */
function StepIndicator({ current, steps }: { current: number; steps: { label: string; desc: string }[] }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map(({ label, desc }, i) => {
        const n = i + 1;
        const done = current > n;
        const active = current === n;
        return (
          <React.Fragment key={n}>
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                active ? 'bg-blue-500 text-white shadow-lg shadow-emerald-900/40'
                : done ? 'bg-blue-500/20 border border-blue-400/30 text-blue-300'
                : 'bg-white/[0.04] border border-white/[0.08] text-slate-600'
              }`}>
                {done ? <CheckCircle2 className="w-4 h-4" /> : n}
              </div>
              <span className={`text-[9px] font-black mt-1.5 uppercase tracking-wider hidden sm:block ${
                active ? 'text-blue-300' : done ? 'text-slate-600' : 'text-slate-700'
              }`}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 sm:mx-3 transition-colors ${done ? 'bg-blue-500/40' : 'bg-white/[0.06]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── Main Page ── */
export default function PostJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [user, setUser] = useState<any>(null);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    isRemote: false,
    description: '',
    salaryMin: '',
    salaryMax: '',
  });

  /* ── Auth check ── */
  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/hirex/auth/me`, { credentials: 'include' });
        if (!res.ok) { router.push('/hirex/login'); return; }
        const data = await res.json();
        if (data.role !== 'RECRUITER') { router.push('/hirex/dashboard/candidate'); return; }
        setUser(data);
        if (data.recruiterProfile?.companyName) {
          setForm(f => ({ ...f, company: data.recruiterProfile.companyName }));
        }
      } catch { router.push('/hirex/login'); }
      finally { setChecking(false); }
    };
    check();
  }, [router]);

  const validate = (s: 1 | 2 | 3) => {
    const errs: Record<string, string> = {};
    if (s >= 1) {
      if (!form.title.trim()) errs.title = 'Job title is required';
      if (!form.company.trim()) errs.company = 'Company name is required';
      if (!form.location.trim()) errs.location = 'Location is required';
    }
    if (s >= 2) {
      if (!form.description.trim()) errs.description = 'Description is required';
      if (form.description.trim().length < 50) errs.description = 'Description must be at least 50 characters';
    }
    if (s >= 3) {
      if (form.salaryMin && form.salaryMax && parseInt(form.salaryMin) > parseInt(form.salaryMax)) {
        errs.salaryMax = 'Max salary must be greater than min';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const addSkill = () => {
    const s = newSkill.trim();
    if (s && !skills.includes(s)) setSkills(p => [...p, s]);
    setNewSkill('');
  };

  const nextStep = () => { if (validate(step)) setStep(s => Math.min(s + 1, 3) as 1 | 2 | 3); };

  const handleSubmit = async () => {
    if (!validate(3)) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/hirex/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          title: form.title.trim(), description: form.description.trim(),
          company: form.company.trim(), location: form.location.trim(),
          isRemote: form.isRemote, skills,
          salaryMin: form.salaryMin ? parseInt(form.salaryMin) : undefined,
          salaryMax: form.salaryMax ? parseInt(form.salaryMax) : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to post job');
      setToast({ message: 'Job published successfully! 🎉', type: 'success' });
      setTimeout(() => router.push(`/hirex/jobs/${data.id}`), 1500);
    } catch (err: any) {
      setToast({ message: err.message || 'Something went wrong.', type: 'error' });
    } finally { setLoading(false); }
  };

  // if (checking) return (
  //   <div className="min-h-screen bg-[#020617] flex items-center justify-center">
  //     <div className="w-8 h-8 rounded-full border-2 border-blue-400/30 border-t-blue-400 animate-spin" />
  //   </div>
  // );

  // Replace the if (checking) return (...) block with this:
if (checking) return (
  <main className="min-h-screen bg-[#020617] text-white font-sans">
    <NavbarSkeleton />

    {/* Atmosphere */}
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[180px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/[0.04] blur-[140px] rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />
    </div>

    <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 py-28 sm:py-32">

      {/* Page header skeleton */}
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 w-28 rounded-full skeleton-shimmer bg-white/[0.04]" />
          <div className="h-7 w-20 rounded-full skeleton-shimmer bg-white/[0.04]" />
        </div>
        <div className="h-9 w-40 rounded-xl skeleton-shimmer bg-white/[0.04] mb-2" />
        <div className="h-4 w-72 rounded skeleton-shimmer bg-white/[0.04]" />
      </div>

      {/* Step indicator skeleton */}
      <div className="flex items-center gap-0 mb-8">
        {[1, 2, 3].map((n, i) => (
          <React.Fragment key={n}>
            <div className="flex flex-col items-center">
              <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04]" />
              <div className="h-2.5 w-12 rounded skeleton-shimmer bg-white/[0.04] mt-1.5 hidden sm:block" />
            </div>
            {i < 2 && <div className="flex-1 h-px mx-2 sm:mx-3 skeleton-shimmer bg-white/[0.04]" />}
          </React.Fragment>
        ))}
      </div>

      {/* Form card skeleton */}
      <div className="bg-[#0a1628] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl">

        {/* Card header */}
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/[0.06]">
          <div className="w-7 h-7 rounded-lg skeleton-shimmer bg-white/[0.04]" />
          <div className="space-y-1.5">
            <div className="h-4 w-32 rounded skeleton-shimmer bg-white/[0.04]" />
            <div className="h-3 w-44 rounded skeleton-shimmer bg-white/[0.04]" />
          </div>
        </div>

        {/* Job title field */}
        <div className="space-y-1.5 mb-5">
          <div className="h-3 w-20 rounded skeleton-shimmer bg-white/[0.04]" />
          <div className="h-12 w-full rounded-xl skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Company + Location row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {[1, 2].map(i => (
            <div key={i} className="space-y-1.5">
              <div className="h-3 w-24 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-12 w-full rounded-xl skeleton-shimmer bg-white/[0.04]" />
            </div>
          ))}
        </div>

        {/* Remote toggle skeleton */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.07] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            <div className="space-y-1.5">
              <div className="h-4 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
              <div className="h-3 w-44 rounded skeleton-shimmer bg-white/[0.04]" />
            </div>
          </div>
          <div className="w-11 h-6 rounded-full skeleton-shimmer bg-white/[0.04] shrink-0" />
        </div>

        {/* Skills field */}
        <div className="space-y-1.5 mb-7">
          <div className="h-3 w-28 rounded skeleton-shimmer bg-white/[0.04]" />
          <div className="flex gap-2">
            <div className="flex-1 h-12 rounded-xl skeleton-shimmer bg-white/[0.04]" />
            <div className="w-20 h-12 rounded-xl skeleton-shimmer bg-white/[0.04] shrink-0" />
          </div>
          <div className="h-3 w-48 rounded skeleton-shimmer bg-white/[0.04]" />
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
          <div className="h-11 w-28 rounded-xl skeleton-shimmer bg-white/[0.04]" />
          <div className="h-11 w-28 rounded-xl skeleton-shimmer bg-white/[0.04]" />
        </div>
      </div>

      {/* Trust badges row */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        {[80, 96, 72, 76].map((w, i) => (
          <div key={i} className="h-3.5 rounded skeleton-shimmer bg-white/[0.04]" style={{ width: `${w}px` }} />
        ))}
      </div>
    </div>
  </main>
);

  const STEPS = [
    { label: 'Basics', desc: 'Title, company, location' },
    { label: 'Details', desc: 'Job description' },
    { label: 'Publish', desc: 'Compensation & review' },
  ];

  /* ── Input class helper ── */
  const inputCls = (err?: string) =>
    `w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 ${
      err ? 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-blue-400/50 focus:ring-blue-400/20'
    }`;

  return (
    <main className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-400/30">
      {/* Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-blue-500/[0.05] blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/[0.04] blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.006)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.006)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10">
        <Navbar/>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-24">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8 sm:mb-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/20 text-blue-300 text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />New Listing
              </span>
              <button
                onClick={() => setShowPreview(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-400 hover:text-white text-[10px] font-bold transition-all"
              >
                <Eye className="w-3 h-3" />Preview
              </button>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-1.5">
              Post a Job
            </h1>
            <p className="text-slate-500 text-sm">
              Reach thousands of verified engineers. Complete three steps to publish.
            </p>
          </motion.div>

          {/* Step indicator */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <StepIndicator current={step} steps={STEPS} />
          </motion.div>

          {/* Form card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0a1628] border border-white/[0.08] rounded-3xl p-6 sm:p-8 shadow-2xl"
            >
              {/* ── Step 1: Basics ── */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1 pb-4 border-b border-white/[0.06]">
                    <div className="w-7 h-7 rounded-lg bg-blue-400/10 border border-blue-400/20 flex items-center justify-center">
                      <Briefcase className="w-3.5 h-3.5 text-blue-300" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-white">Basic Information</h2>
                      <p className="text-[10px] text-slate-600">The essentials candidates see first</p>
                    </div>
                  </div>

                  <Field label="Job Title" required icon={Briefcase} error={errors.title}>
                    <input
                      type="text" placeholder="e.g. Senior Full-Stack Engineer"
                      className={inputCls(errors.title)}
                      value={form.title}
                      onChange={e => { setForm(f => ({ ...f, title: e.target.value })); setErrors(er => ({ ...er, title: '' })); }}
                    />
                  </Field>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Company Name" required icon={Building2} error={errors.company}>
                      <input
                        type="text" placeholder="Acme Technologies"
                        className={inputCls(errors.company)}
                        value={form.company}
                        onChange={e => { setForm(f => ({ ...f, company: e.target.value })); setErrors(er => ({ ...er, company: '' })); }}
                      />
                    </Field>
                    <Field label="Location" required icon={MapPin} error={errors.location}>
                      <input
                        type="text" placeholder="Mumbai, India"
                        className={inputCls(errors.location)}
                        value={form.location}
                        onChange={e => { setForm(f => ({ ...f, location: e.target.value })); setErrors(er => ({ ...er, location: '' })); }}
                      />
                    </Field>
                  </div>

                  {/* Remote toggle */}
                  <div
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      form.isRemote ? 'bg-blue-400/[0.08] border-blue-400/30' : 'bg-white/[0.02] border-white/[0.07]'
                    }`}
                    onClick={() => setForm(f => ({ ...f, isRemote: !f.isRemote }))}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${form.isRemote ? 'bg-blue-400/15 border border-blue-400/25' : 'bg-white/[0.04] border border-white/[0.08]'}`}>
                        <Wifi className={`w-4 h-4 transition-colors ${form.isRemote ? 'text-blue-300' : 'text-slate-600'}`} />
                      </div>
                      <div>
                        <p className="text-white font-bold text-sm">Remote Friendly</p>
                        <p className="text-slate-600 text-xs">Candidates can work from anywhere</p>
                      </div>
                    </div>
                    {/* Toggle */}
                    <div className={`relative w-11 h-6 rounded-full transition-all shrink-0 ${form.isRemote ? 'bg-blue-500' : 'bg-white/[0.08]'}`}>
                      <motion.div
                        animate={{ x: form.isRemote ? 22 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-4 h-4 rounded-full bg-white shadow"
                      />
                    </div>
                  </div>

                  {/* Skills */}
                  <Field label="Required Skills" icon={Code2} hint="Press Enter or click Add after each skill">
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        <AnimatePresence>
                          {skills.map(s => (
                            <motion.span key={s} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-400/10 border border-blue-400/20 text-emerald-300 text-xs font-semibold font-mono"
                            >
                              {s}
                              <button onClick={() => setSkills(p => p.filter(x => x !== s))} className="hover:text-red-400 transition-colors ml-0.5">
                                <X className="w-3 h-3" />
                              </button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text" placeholder="React, TypeScript, Node.js…"
                        className="flex-1 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/20 outline-none transition-all placeholder:text-slate-700"
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <button onClick={addSkill}
                        className="px-4 py-3 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-300 hover:bg-blue-500/30 transition-all text-sm font-bold flex items-center gap-1.5 shrink-0"
                      >
                        <Plus className="w-4 h-4" />Add
                      </button>
                    </div>
                  </Field>
                </div>
              )}

              {/* ── Step 2: Description ── */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1 pb-4 border-b border-white/[0.06]">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <FileText className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-white">Job Description</h2>
                      <p className="text-[10px] text-slate-600">Tell candidates what the role entails</p>
                    </div>
                  </div>

                  {/* Tip */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-500/[0.06] border border-blue-500/[0.15]">
                    <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-400/80 leading-relaxed">
                      <strong>Pro tip:</strong> Structured descriptions with bullet points get 3× more qualified applications. Include role overview, responsibilities, and requirements.
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <FileText className="w-3 h-3" />Description <span className="text-red-400">*</span>
                      </label>
                      <span className={`text-[10px] font-mono ${form.description.length < 50 ? 'text-red-400/70' : 'text-slate-700'}`}>
                        {form.description.length} chars {form.description.length < 50 && `(${50 - form.description.length} more needed)`}
                      </span>
                    </div>
                    <textarea
                      rows={12}
                      placeholder={`Describe the role, key responsibilities, and what you're looking for...\n\n• Build and maintain scalable services\n• Collaborate with cross-functional teams\n• Participate in code reviews\n\nRequirements:\n• 3+ years experience with relevant tech\n• Strong problem-solving skills`}
                      className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3.5 text-sm text-white outline-none transition-all placeholder:text-slate-700 focus:ring-1 resize-none leading-relaxed ${
                        errors.description ? 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-blue-500/50 focus:ring-blue-500/20'
                      }`}
                      value={form.description}
                      onChange={e => { setForm(f => ({ ...f, description: e.target.value })); setErrors(er => ({ ...er, description: '' })); }}
                    />
                    {errors.description && (
                      <p className="text-red-400 text-xs flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3 h-3 shrink-0" />{errors.description}
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Step 3: Compensation & Review ── */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="flex items-center gap-2 mb-1 pb-4 border-b border-white/[0.06]">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                      <Banknote className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div>
                      <h2 className="text-sm font-black text-white">Compensation & Review</h2>
                      <p className="text-[10px] text-slate-600">Optional salary info + final check</p>
                    </div>
                  </div>

                  <Field label="Salary Range" icon={Banknote} hint="Annual in ₹. Transparent ranges attract 40% more applicants." error={errors.salaryMax}>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-bold">₹</span>
                        <input type="number" placeholder="500,000" min={0}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-7 pr-10 py-3.5 text-sm text-white focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 outline-none transition-all placeholder:text-slate-700"
                          value={form.salaryMin}
                          onChange={e => { setForm(f => ({ ...f, salaryMin: e.target.value })); setErrors(er => ({ ...er, salaryMin: '' })); }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-[9px] font-bold uppercase">Min</span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-sm font-bold">₹</span>
                        <input type="number" placeholder="1,200,000" min={0}
                          className={`w-full bg-white/[0.04] border rounded-xl pl-7 pr-10 py-3.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${
                            errors.salaryMax ? 'border-red-500/40 focus:border-red-500/50 focus:ring-red-500/20' : 'border-white/[0.08] focus:border-amber-500/50 focus:ring-amber-500/20'
                          }`}
                          value={form.salaryMax}
                          onChange={e => { setForm(f => ({ ...f, salaryMax: e.target.value })); setErrors(er => ({ ...er, salaryMax: '' })); }}
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 text-[9px] font-bold uppercase">Max</span>
                      </div>
                    </div>
                  </Field>

                  {/* Review summary */}
                  <div className="rounded-2xl bg-white/[0.02] border border-white/[0.07] overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/[0.07] bg-white/[0.02]">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Review Summary</p>
                    </div>
                    <div className="p-4 space-y-0">
                      {[
                        { label: 'Title', value: form.title || '—', ok: !!form.title },
                        { label: 'Company', value: form.company || '—', ok: !!form.company },
                        { label: 'Location', value: `${form.location}${form.isRemote ? ' · Remote' : ''}` || '—', ok: !!form.location },
                        { label: 'Skills', value: skills.length > 0 ? `${skills.length} skill${skills.length > 1 ? 's' : ''} added` : 'None', ok: true },
                        { label: 'Description', value: form.description ? `${form.description.length} chars` : '—', ok: form.description.length >= 50 },
                        { label: 'Salary', value: (form.salaryMin || form.salaryMax) ? `₹${parseInt(form.salaryMin || '0').toLocaleString()} – ₹${parseInt(form.salaryMax || '0').toLocaleString()}` : 'Not specified', ok: true },
                      ].map(({ label, value, ok }) => (
                        <div key={label} className="flex items-center gap-3 py-2.5 border-b border-white/[0.05] last:border-0">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${ok ? 'bg-blue-400/15' : 'bg-red-500/15'}`}>
                            {ok ? <CheckCircle2 className="w-3 h-3 text-blue-300" /> : <AlertCircle className="w-3 h-3 text-red-400" />}
                          </div>
                          <span className="text-slate-600 text-xs w-20 shrink-0">{label}</span>
                          <span className={`text-xs font-semibold truncate flex-1 ${ok ? 'text-slate-300' : 'text-red-400'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legal note */}
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-400/[0.05] border border-blue-400/[0.14]">
                    <Shield className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-slate-500 leading-relaxed">
                      By publishing, you confirm this is a legitimate opportunity. Applications route to your recruiter account. You can edit or remove this post at any time.
                    </p>
                  </div>
                </div>
              )}

              {/* ── Navigation ── */}
              <div className="flex items-center justify-between mt-7 pt-5 border-t border-white/[0.06]">
                <button
                  onClick={() => step > 1 ? setStep(s => (s - 1) as 1 | 2 | 3) : router.back()}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.14] text-slate-400 hover:text-white text-sm font-bold transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {step === 1 ? 'Cancel' : 'Back'}
                </button>

                {step < 3 ? (
                  <button onClick={nextStep}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-400 hover:bg-blue-500 text-white font-black text-sm transition-all shadow-lg shadow-emerald-900/30 group"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-black text-sm transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/30 group"
                  >
                    {loading
                      ? <><Loader2 className="w-4 h-4 animate-spin" />Publishing…</>
                      : <><Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />Publish Job</>}
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Trust badges */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-700"
          >
            {['Verified job board', 'No spam candidates', 'Edit anytime', 'Free to post'].map(t => (
              <span key={t} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-slate-700" />{t}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showPreview && <PreviewModal form={form} skills={skills} onClose={() => setShowPreview(false)} />}
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </main>
  );
}