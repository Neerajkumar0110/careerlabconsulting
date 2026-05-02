'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  User, Mail, Phone, Globe, Github, Linkedin, Briefcase,
  DollarSign, Clock, Star, Edit3, Save, X, LogOut, ChevronDown,
  TrendingUp, CheckCircle, XCircle, Loader2,
  ExternalLink, FileText, Award, BarChart3, Zap, Sparkles,
  ArrowUpRight, AlertCircle, RefreshCw, Tag, MapPin, Activity,
  Shield, Info, AtSign, MessageSquare, Menu, LayoutDashboard,
  Bell, ChevronRight, Target, Flame, Rocket, Crown,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';
import NotificationBell from '@/components/freelancex/NotificationBell';
import { WorkSubmissionPanel } from '@/components/freelancex/WorkSubmissionPanel';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ──────────────────────────────────────────── */
interface FreelancerProfile {
  fullName: string;
  headline: string | null;
  bio: string | null;
  skills: string[] | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  experienceYears: number | null;
  hourlyRate: number | null;
  jobSuccessScore?: number | null;
  totalEarned?: number | null;
  completedJobs?: number | null;
  country?: string | null;
}

const isProfileIncomplete = (p?: FreelancerProfile | null) => {
  if (!p) return true;

  return (
    !p.headline?.trim() ||
    !p.bio?.trim() ||
    !(Array.isArray(p.skills) && p.skills.length > 0) ||
    !p.githubUrl?.trim() ||
    !p.linkedinUrl?.trim() ||
    !p.portfolioUrl?.trim() ||
    !p.experienceYears ||
    !p.hourlyRate
  );
};

interface UserData {
  id: string;
  email: string;
  phone: string | null;
  role: 'FREELANCER';
  isVerified: boolean;
  createdAt: string;
  freelancerProfile: FreelancerProfile | null;
}

interface GigDetails {
  id: string;
  title: string;
  budgetMin: number | null;
  budgetMax: number | null;
  isRemote: boolean;
  location: string | null;
  skills: string[];
  status: string;
  postedById: string;
}

interface Proposal {
  id: string;
  gigId: string;
  status: 'SUBMITTED' | 'SHORTLISTED' | 'REJECTED' | 'HIRED';
  coverLetter: string | null;
  bidAmount: number | null;
  portfolioUrl: string | null;
  createdAt: string;
  deliveryDays: number | null;
  gig: GigDetails;
}

/* ── Animations ─────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] as const },
  }),
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ── Status Config ─────────────────────────────────── */
const statusConfig = {
  SUBMITTED:   { label: 'Applied',     color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    dot: 'bg-sky-400',     glow: 'shadow-sky-500/20',     icon: FileText },
  SHORTLISTED: { label: 'Shortlisted', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  dot: 'bg-amber-400',   glow: 'shadow-amber-500/20',   icon: Star },
  REJECTED:    { label: 'Rejected',    color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',   dot: 'bg-rose-400',    glow: 'shadow-rose-500/20',    icon: XCircle },
  HIRED:       { label: 'Hired 🎉',    color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',dot: 'bg-emerald-400', glow: 'shadow-emerald-500/20', icon: CheckCircle },
};

const gigStatusColor: Record<string, { text: string; bg: string; border: string; dot: string }> = {
  OPEN:        { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  IN_PROGRESS: { text: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  dot: 'bg-amber-400'   },
  COMPLETED:   { text: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    dot: 'bg-sky-400'     },
  CANCELLED:   { text: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',   dot: 'bg-rose-400'    },
};

/* ── Navbar (consistent with FreelanceX home) ───────── */
function DashboardNavbar({ user, onLogout, logoutLoading }: {
  user: UserData;
  onLogout: () => void;
  logoutLoading: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profile = user.freelancerProfile;
  const displayName = profile?.fullName || user.email;
  const avatarLetter = (displayName.charAt(0) || '?').toUpperCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NAV_LINKS = [
    { name: 'Browse Gigs', href: '/freelancex/gigs' },
    { name: 'Reports', href: '/freelancex/reports' },
    { name: 'AI Test', href: '/freelancex/ai-test' },
  ];

  const linkClass = scrolled
    ? 'text-slate-600 hover:text-blue-600'
    : 'text-slate-400 hover:text-white';

  return (
    <header className={`fixed left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${scrolled ? 'top-0 px-0' : 'top-4 px-4 sm:px-6 lg:px-8'}`}>
      <nav
        className={`max-w-7xl mx-auto transition-all duration-500 ease-in-out ${
          scrolled
            ? 'max-w-full rounded-none bg-white border-b border-slate-200 shadow-md px-8'
            : 'bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6'
        }`}
      >
        <div className="flex justify-between items-center h-16">
          <Logo isSticky={scrolled} />

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link key={link.name} href={link.href}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${linkClass}`}>
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* <NotificationBell /> */}
            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(o => !o)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
                  scrolled ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xs font-black uppercase">
                  {avatarLetter}
                </div>
                <span className={`hidden sm:block text-[11px] font-black max-w-[120px] truncate ${scrolled ? 'text-slate-700' : 'text-slate-200'}`}>
                  {displayName}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? 'rotate-180' : ''} ${scrolled ? 'text-slate-500' : 'text-slate-400'}`} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden py-1 z-50"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Signed in as</p>
                      <p className="text-xs font-bold text-white truncate mt-0.5">{user.email}</p>
                      <span className="inline-flex mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border text-indigo-400 bg-indigo-500/10 border-indigo-500/20">
                        Freelancer
                      </span>
                    </div>
                    <Link href="/freelancex/dashboard/freelancer" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                      <LayoutDashboard className="w-4 h-4 text-indigo-400" /> Dashboard
                    </Link>
                    <div className="border-t border-white/5 mt-1" />
                    <button onClick={() => { onLogout(); setDropdownOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-all">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className={`md:hidden p-1 transition-colors ${scrolled ? 'text-[#0f172a]' : 'text-white'}`}
              onClick={() => setMobileOpen(o => !o)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden border-t overflow-hidden ${scrolled ? 'border-slate-100 bg-white' : 'border-white/10'}`}
            >
              <div className="flex flex-col p-6 gap-5 text-center">
                {NAV_LINKS.map(link => (
                  <Link key={link.name} href={link.href} onClick={() => setMobileOpen(false)}
                    className={`text-xs font-black uppercase tracking-[0.3em] ${scrolled ? 'text-slate-600' : 'text-slate-400'}`}>
                    {link.name}
                  </Link>
                ))}
                <div className={`h-px w-full ${scrolled ? 'bg-slate-100' : 'bg-white/10'}`} />
                <button onClick={() => { onLogout(); setMobileOpen(false); }}
                  className="text-xs font-black uppercase tracking-widest py-2 text-red-400">
                  Sign Out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ── Animated Counter ───────────────────────────────── */
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1200;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{prefix}{display}{suffix}</>;
}

/* ── Rating Stars (fixed) ───────────────────────────── */
function RatingStars({ rating, max = 5, size = 'sm', showLabel = false }: {
  rating: number; max?: number; size?: 'sm' | 'md' | 'lg'; showLabel?: boolean;
}) {
  const filled = Math.round(Math.min(Math.max(rating, 0), max));
  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star
            key={i}
            className={`${starSize} transition-colors ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-800'}`}
          />
        ))}
      </div>
      {showLabel && (
        <span className="text-xs text-amber-400 font-bold ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}

/* ── Animated counter hook ───────────────────────────────── */
function useAnimatedCount(target: number, delay: number = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(eased * target));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, delay]);
  return value;
}



/* ── Particle system ─────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
}

function ParticleField() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const counterRef = useRef(0);
  const colors = ["#818CF8", "#06B6D4", "#10B981", "#F59E0B"];

  useEffect(() => {
    const spawn = () => {
      const id = counterRef.current++;
      const p: Particle = {
        id,
        x: Math.random() * 100,
        duration: 5 + Math.random() * 7,
        delay: Math.random() * 1.5,
        size: 1 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setParticles((prev) => [...prev.slice(-30), p]);
    };
    const interval = setInterval(spawn, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: 0,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `fx-float ${p.duration}s ${p.delay}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Live ticker items ───────────────────────────────────── */
const TICKER_ITEMS = [
  { color: "#10B981", label: "React Dev hired · $8,400/mo" },
  { color: "#06B6D4", label: "UI/UX Designer shortlisted · $120/hr" },
  { color: "#4F46E5", label: "Backend Engineer hired · $140/hr" },
  { color: "#F59E0B", label: "Data Scientist interviewed · $95/hr" },
  { color: "#F43F5E", label: "DevOps Engineer · 3 offers today" },
  { color: "#8B5CF6", label: "Mobile Dev hired · $110/hr" },
  { color: "#10B981", label: "Full-Stack Dev shortlisted · $130/hr" },
  { color: "#06B6D4", label: "Product Manager hired · $9,200/mo" },
  { color: "#4F46E5", label: "Cloud Architect · 5 proposals sent" },
  { color: "#F59E0B", label: "ML Engineer hired · $160/hr" },
];

/* ── Stagger variants ────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/* ── Greeting helper ─────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning,";
  if (h < 17) return "Good afternoon,";
  return "Good evening,";
}

/* ── Hero Section ───────────────────────────────────── */
// function FreelancerHero({ user, proposals }: { user: UserData; proposals: Proposal[] }) {
//   const profile = user.freelancerProfile;
//   const firstName = profile?.fullName?.split(' ')[0] || 'Freelancer';
//   const hired = proposals.filter(p => p.status === 'HIRED').length;
//   const shortlisted = proposals.filter(p => p.status === 'SHORTLISTED').length;
//   const successRate = proposals.length ? Math.round((hired / proposals.length) * 100) : 0;
//   const rating = profile?.jobSuccessScore ? (profile.jobSuccessScore / 100) * 5 : 0;

//   const getTimeGreeting = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 17) return 'Good afternoon';
//     return 'Good evening';
//   };

//   const motivationalMessages = [
//     { icon: Rocket, text: 'You\'re in the top 10% of active freelancers', color: 'text-indigo-400' },
//     { icon: Flame, text: `${hired} client${shortlisted !== 1 ? 's' : ''} are interested in your profile`, color: 'text-amber-400' },
//     { icon: Target, text: 'Complete your profile to unlock premium gigs', color: 'text-emerald-400' },
//   ];
//   const motivational = motivationalMessages[hired % motivationalMessages.length];
//   const MotivIcon = motivational.icon;

//   return (
//     <div className="relative pt-28 pb-0 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       {/* Cinematic background layers */}
//       <div className="absolute inset-0 pointer-events-none">
//         {/* Deep space gradient */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#060d1f] via-[#0a0f2e] to-[#060d1f]" />
//         {/* Aurora streaks */}
//         <div className="absolute top-0 left-0 right-0 h-[600px] overflow-hidden">
//           <div className="absolute top-[-200px] left-[5%] w-[700px] h-[700px] bg-indigo-600/[0.12] rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '6s' }} />
//           <div className="absolute top-[-100px] right-[10%] w-[500px] h-[500px] bg-blue-500/[0.08] rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
//           <div className="absolute top-[100px] left-[40%] w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
//         </div>
//         {/* Subtle grid */}
//         <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
//         {/* Vignette */}
//         <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,transparent_40%,#060d1f_100%)]" />
//       </div>

//       <div className="relative max-w-7xl mx-auto">
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={stagger}
//           className="text-center mb-12"
//         >
//           {/* Badge */}
//           <motion.div variants={fadeUp} custom={0} className="flex items-center justify-center mb-6">
//             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-sm">
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
//               <span className="text-[11px] font-black uppercase tracking-[0.25em] text-indigo-300">
//                 FreelanceX · Freelancer Dashboard
//               </span>
//             </div>
//           </motion.div>

//           {/* Main greeting */}
//           <motion.div variants={fadeUp} custom={1}>
//             <p className="text-slate-500 text-sm font-semibold mb-2 tracking-widest uppercase">{getTimeGreeting()},</p>
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-4">
//               <span className="text-white">{firstName}</span>
//               <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
//                 Your empire awaits.
//               </span>
//             </h1>
//             <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
//               {profile?.headline || 'Complete your profile headline to attract the best clients worldwide.'}
//             </p>
//           </motion.div>

//           {/* Motivational strip */}
//           <motion.div variants={fadeUp} custom={2} className="flex items-center justify-center mt-6">
//             <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
//               <MotivIcon className={`w-4 h-4 ${motivational.color}`} />
//               <p className={`text-xs font-semibold ${motivational.color}`}>{motivational.text}</p>
//             </div>
//           </motion.div>

//           {/* Rating display (FIXED) */}
//           {(profile?.jobSuccessScore != null || proposals.length > 0) && (
//             <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-6 mt-6">
//               {profile?.jobSuccessScore != null && (
//                 <div className="flex flex-col items-center gap-1.5">
//                   <RatingStars
//                     rating={(profile.jobSuccessScore / 100) * 5}
//                     size="md"
//                     showLabel={true}
//                   />
//                   <span className="text-[10px] text-slate-600 font-medium uppercase tracking-widest">
//                     Success Score: {profile.jobSuccessScore}%
//                   </span>
//                 </div>
//               )}
//               {profile?.completedJobs != null && profile.completedJobs > 0 && (
//                 <div className="flex items-center gap-1.5">
//                   <Crown className="w-4 h-4 text-amber-400" />
//                   <span className="text-xs text-slate-400 font-semibold">{profile.completedJobs} completed jobs</span>
//                 </div>
//               )}
//             </motion.div>
//           )}

//           {/* Mega stats */}
//           <motion.div
//   variants={fadeUp}
//   custom={4}
//   className="mt-10 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4"
// >
//   {/* PRIMARY METRIC */}
//   <div className="sm:col-span-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex items-center justify-between">
//     <div>
//       <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
//         Total Applications
//       </p>
//       <p className="text-4xl font-semibold text-white mt-1 tracking-tight">
//         <AnimatedNumber value={proposals.length} />
//       </p>
//     </div>

//     <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium">
//       <FileText className="w-4 h-4" strokeWidth={1.5} />
//       Submission Pipeline
//     </div>
//   </div>

//   {/* SECONDARY METRICS */}
//   {[
//     {
//       value: shortlisted,
//       label: 'Shortlisted',
//       icon: Star,
//       color: 'text-amber-400', // attention / interest
//     },
//     {
//       value: hired,
//       label: 'Hired',
//       icon: CheckCircle,
//       color: 'text-emerald-400', // success
//     },
//     {
//       value: successRate,
//       label: 'Success Rate',
//       icon: TrendingUp,
//       color: 'text-cyan-400', // growth / performance
//       suffix: '%',
//     },
//   ].map((stat, i) => {
//     const Icon = stat.icon;

//     return (
//       <motion.div
//         key={stat.label}
//         variants={fadeUp}
//         custom={i + 5}
//         className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 flex items-center justify-between group transition-all hover:border-white/[0.12]"
//       >
//         {/* LEFT */}
//         <div>
//           <p className="text-lg font-semibold text-white tracking-tight">
//             <AnimatedNumber value={stat.value} suffix={stat.suffix || ''} />
//           </p>
//           <p className="text-xs text-slate-500 mt-0.5">
//             {stat.label}
//           </p>
//         </div>

//         {/* ICON */}
//         <div className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center">
//           <Icon
//             className={`${stat.color} opacity-80 group-hover:opacity-100 transition-all`}
//             strokeWidth={1.5}
//           />
//         </div>
//       </motion.div>
//     );
//   })}
// </motion.div>

//           {/* CTA strip */}
//           <motion.div variants={fadeUp} custom={9} className="flex items-center justify-center gap-3 mt-8 mb-4">
//             <Link href="/freelancex/gigs"
//               className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm font-bold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300">
//               <Zap className="w-4 h-4" />
//               Browse Live Gigs
//               <ArrowUpRight className="w-4 h-4" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Wave separator */}
//       <div className="relative h-16">
//         <svg className="absolute bottom-0 w-full" viewBox="0 0 1440 64" fill="none" preserveAspectRatio="none">
//           <path d="M0 64L1440 64L1440 0C1440 0 1080 64 720 64C360 64 0 0 0 0L0 64Z" fill="#060d1f" opacity="0.4" />
//         </svg>
//       </div>
//     </div>
//   );
// }


/* ═══════════════════════════════════════════════════════════
   MAIN COMPONENT — drop-in replacement for FreelancerHero
═══════════════════════════════════════════════════════════ */
export function FreelancerHero({
  user,
  proposals,
}: {
  user: UserData;
  proposals: Proposal[];
}) {
  const profile = user.freelancerProfile;
  const firstName = profile?.fullName?.split(" ")[0] || "Freelancer";
  const hired = proposals.filter((p) => p.status === "HIRED").length;
  const shortlisted = proposals.filter((p) => p.status === "SHORTLISTED").length;
  const successRate = proposals.length
    ? Math.round((hired / proposals.length) * 100)
    : 0;

  /* motivational message — cycles by hire count */
  const motivMessages = [
    {
      icon: Flame,
      color: "#F59E0B",
      text: `${shortlisted} client${shortlisted !== 1 ? "s" : ""} shortlisted you — don't keep them waiting.`,
    },
    {
      icon: Zap,
      color: "#818CF8",
      text: "You're in the top 10% of active freelancers on FreelanceX.",
    },
    {
      icon: TrendingUp,
      color: "#10B981",
      text: "Complete your profile to unlock premium enterprise gigs.",
    },
  ];
  const motiv = motivMessages[hired % motivMessages.length];
  const MotivIcon = motiv.icon;

  return (
    <>
      {/* keyframe injection — scoped, one-time */}
      <style>{`
       .fx-gradient-text {
          background: linear-gradient(135deg, #818CF8 0%, #06B6D4 50%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .  { font-family: 'Syne', sans-serif; }

        @keyframes fx-orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          25% { transform: translate(28px,-18px) scale(1.04); }
          50% { transform: translate(-18px,26px) scale(0.97); }
          75% { transform: translate(18px,8px) scale(1.03); }
        }
        @keyframes fx-pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:0.45; transform:scale(0.65); }
        }
        @keyframes fx-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fx-float {
          0% { opacity:0; transform:translateY(0) scale(0); }
          10% { opacity:0.85; transform:translateY(-12px) scale(1); }
          90% { opacity:0.25; }
          100% { opacity:0; transform:translateY(-220px) scale(0.4); }
        }
        @keyframes fx-shimmer {
          from { left: -100%; }
          to { left: 100%; }
        }

        .fx-btn-primary {
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          background: linear-gradient(135deg, #4F46E5, #2563EB);
          border: none;
          border-radius: 14px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          box-shadow: 0 8px 32px rgba(79,70,229,0.35), 0 0 0 1px rgba(255,255,255,0.08) inset;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          text-decoration: none;
        }
        .fx-btn-primary::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);
          animation: fx-shimmer 2.8s ease-in-out infinite;
        }
        .fx-btn-primary:hover {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 16px 40px rgba(79,70,229,0.5);
        }

        .fx-stat-card {
          position: relative;
          overflow: hidden;
        }
        .fx-stat-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 0 0 14px 14px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fx-stat-card:hover::after { opacity: 1; }
        .fx-stat-amber::after { background: #F59E0B; }
        .fx-stat-emerald::after { background: #10B981; }
        .fx-stat-cyan::after { background: #06B6D4; }

        .fx-ticker-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
      `}</style>

      <div className="relative overflow-hidden bg-[#050915] pb-0 pt-0">
        {/* ── Cinematic background ── */}
        <div className="pointer-events-none absolute inset-0">
          {/* orbs */}
          {[
            { w: 700, h: 700, top: -200, left: -100, color: "rgba(79,70,229,0.16)", dur: "20s" },
            { w: 500, h: 500, top: -60, right: -80, color: "rgba(6,182,212,0.11)", dur: "28s", delay: "-8s" },
            { w: 360, h: 360, top: 320, left: "38%", color: "rgba(16,185,129,0.09)", dur: "34s", delay: "-15s" },
            { w: 260, h: 260, bottom: 80, right: "18%", color: "rgba(244,63,94,0.07)", dur: "22s", delay: "-5s" },
          ].map((o, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: o.w,
                height: o.h,
                top: (o as any).top,
                left: (o as any).left,
                right: (o as any).right,
                bottom: (o as any).bottom,
                background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
                filter: "blur(88px)",
                animation: `fx-orb-drift ${o.dur} ${(o as any).delay ?? "0s"} ease-in-out infinite`,
              }}
            />
          ))}

          {/* subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage: "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 100%)",
            }}
          />

          {/* vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 0%, transparent 30%, #050915 100%)",
            }}
          />
        </div>

        {/* ── Particle field ── */}
        <ParticleField />

        {/* ══════════ CONTENT ══════════ */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-0">
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* Nav badge */}
            <motion.div className="mb-7">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
                style={{
                  background: "rgba(79,70,229,0.1)",
                  borderColor: "rgba(79,70,229,0.22)",
                }}
              >
                <span
                  className="h-[6px] w-[6px] rounded-full"
                  style={{
                    background: "#10B981",
                    boxShadow: "0 0 6px #10B981",
                    animation: "fx-pulse-dot 2s ease-in-out infinite",
                  }}
                />
                <span
                  className="text-[10px] font-medium uppercase tracking-[0.18em]"
                  style={{ color: "#818CF8" }}
                >
                  FreelanceX · Freelancer Dashboard
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div className="mb-2 flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(129,140,248,0.45))",
                }}
              />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "#64748B" }}
              >
                {getGreeting()}
              </span>
              <div
                className="h-px w-8"
                style={{
                  background: "linear-gradient(90deg, rgba(129,140,248,0.45), transparent)",
                }}
              />
            </motion.div>

            {/* Headline */}
            <motion.div   className="mb-4">
              <h1
                className="  leading-[1.03] tracking-tight"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "white",
                }}
              >
                {firstName},<br />
                <span className="fx-gradient-text">your empire awaits.</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.div  className="mb-6 max-w-md">
              <p
                className="text-base leading-relaxed"
                style={{ color: "#94A3B8", fontWeight: 300 }}
              >
                {profile?.headline ||
                  "Complete your profile headline to attract the best clients worldwide."}
              </p>
            </motion.div>

            {/* Motivation strip */}
            <motion.div   className="mb-8">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5"
                style={{
                  background: `${motiv.color}14`,
                  borderColor: `${motiv.color}28`,
                }}
              >
                <MotivIcon className="h-[14px] w-[14px]" style={{ color: motiv.color }} />
                <p className="text-xs font-medium" style={{ color: motiv.color }}>
                  {motiv.text}
                </p>
              </div>
            </motion.div>

            {/* Rating row */}
            {(profile?.jobSuccessScore != null || profile?.completedJobs != null) && (
              <motion.div   className="mb-8 flex items-center gap-4">
                {profile?.jobSuccessScore != null && (
                  <>
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex gap-[3px]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="h-[13px] w-[13px]"
                            fill={
                              s <= Math.round((profile.jobSuccessScore! / 100) * 5)
                                ? "#F59E0B"
                                : "transparent"
                            }
                            style={{ color: "#F59E0B" }}
                          />
                        ))}
                      </div>
                      <span
                        className="text-[10px] uppercase tracking-[0.15em]"
                        style={{ color: "#475569" }}
                      >
                        Success Score: {profile.jobSuccessScore}%
                      </span>
                    </div>
                    <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.08)" }} />
                  </>
                )}
                {profile?.completedJobs != null && profile.completedJobs > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Crown className="h-[14px] w-[14px]" style={{ color: "#F59E0B" }} />
                    <span className="text-xs font-medium" style={{ color: "#94A3B8" }}>
                      {profile.completedJobs} completed jobs
                    </span>
                  </div>
                )}
              </motion.div>
            )}

            {/* ── Mega stats ── */}
            <motion.div   className="w-full max-w-3xl">
              {/* Primary — total applications */}
              <div
                className="mb-3 flex items-center justify-between rounded-2xl border px-6 py-5 transition-all duration-300 hover:border-indigo-500/30"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderColor: "rgba(255,255,255,0.07)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, rgba(79,70,229,0.05) 0%, transparent 60%)",
                    pointerEvents: "none",
                  }}
                />
                <div>
                  <p
                    className="  leading-none"
                    style={{ fontSize: "3rem", fontWeight: 800, color: "white", letterSpacing: "-0.04em" }}
                  >
                    <AnimatedNumber value={proposals.length}/>
                  </p>
                  <p
                    className="mt-1 text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: "#475569" }}
                  >
                    Total Applications
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#818CF8" }}
                >
                  <FileText className="h-[14px] w-[14px]" strokeWidth={1.5} />
                  Submission Pipeline
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: shortlisted,
                    label: "Shortlisted",
                    icon: Star,
                    color: "#F59E0B",
                    cls: "fx-stat-amber",
                  },
                  {
                    value: hired,
                    label: "Hired",
                    icon: CheckCircle,
                    color: "#10B981",
                    cls: "fx-stat-emerald",
                  },
                  {
                    value: successRate,
                    label: "Success Rate",
                    icon: TrendingUp,
                    color: "#06B6D4",
                    cls: "fx-stat-cyan",
                    suffix: "%",
                  },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                       
                      className={`fx-stat-card ${stat.cls} flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5`}
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        borderColor: "rgba(255,255,255,0.07)",
                      }}
                    >
                      <div>
                        <p
                          className="  leading-none"
                          style={{
                            fontSize: "1.55rem",
                            fontWeight: 700,
                            color: "white",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          <AnimatedNumber
                            value={stat.value}
                            suffix={stat.suffix ?? ""}
                          />
                        </p>
                        <p
                          className="mt-1 text-[11px]"
                          style={{ color: "#64748B" }}
                        >
                          {stat.label}
                        </p>
                      </div>
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-xl border"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          borderColor: "rgba(255,255,255,0.07)",
                        }}
                      >
                        <Icon
                          className="h-[16px] w-[16px] opacity-70"
                          style={{ color: stat.color }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Social proof */}
            <motion.div   className="mt-6 flex items-center gap-3">
              <div className="flex">
                {[
                  { initials: "JR", bg: "#4F46E5" },
                  { initials: "AM", bg: "#0891B2" },
                  { initials: "KL", bg: "#059669" },
                  { initials: "SC", bg: "#B45309" },
                  { initials: "+", bg: "#7C3AED" },
                ].map((av, i) => (
                  <div
                    key={i}
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full text-[9px] font-bold text-white"
                    style={{
                      background: av.bg,
                      border: "2px solid #050915",
                      marginLeft: i === 0 ? 0 : -8,
                    }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <span className="text-xs" style={{ color: "#475569" }}>
                <span style={{ color: "#64748B", fontWeight: 500 }}>12,400+ freelancers</span>{" "}
                landed dream clients this month.
              </span>
            </motion.div>

            {/* CTA strip */}
            <motion.div   className="mt-6 mb-4 flex items-center gap-3">
              <Link href="/freelancex/gigs" className="fx-btn-primary">
                <Zap className="h-[14px] w-[14px]" />
                Browse Live Gigs
                <ArrowUpRight className="h-[14px] w-[14px]" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Live activity ticker ── */}
        <div className="fx-ticker-mask relative z-10 mt-8 w-full overflow-hidden">
          <div
            className="flex gap-4"
            style={{
              width: "max-content",
              animation: "fx-ticker 36s linear infinite",
            }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
              <div
                key={i}
                className="flex flex-shrink-0 items-center gap-2 rounded-full border px-4 py-1.5"
                style={{
                  background: "rgba(255,255,255,0.025)",
                  borderColor: "rgba(255,255,255,0.07)",
                  whiteSpace: "nowrap",
                  fontSize: 11,
                  color: "#475569",
                }}
              >
                <span
                  className="h-[5px] w-[5px] flex-shrink-0 rounded-full"
                  style={{ background: t.color, boxShadow: `0 0 5px ${t.color}` }}
                />
                {t.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Wave separator ── */}
        <div className="relative mt-8 h-16">
          <svg
            className="absolute bottom-0 w-full"
            viewBox="0 0 1440 64"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 64L1440 64L1440 0C1440 0 1080 64 720 64C360 64 0 0 0 0L0 64Z"
              fill="#050915"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
    </>
  );
}

/* ── Edit Profile Modal ─────────────────────────────── */
function EditProfileModal({ profile, onClose, onSave, isIncomplete }: {
  profile: FreelancerProfile;
  onClose: () => void;
  onSave: (data: Partial<FreelancerProfile>) => Promise<void>;
  isIncomplete: boolean;
}) {
  const [form, setForm] = useState({
    headline: profile.headline || '',
    bio: profile.bio || '',
    skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
    githubUrl: profile.githubUrl || '',
    linkedinUrl: profile.linkedinUrl || '',
    portfolioUrl: profile.portfolioUrl || '',
    experienceYears: profile.experienceYears?.toString() || '',
    hourlyRate: profile.hourlyRate?.toString() || '',
  });
  const initialForm = {
    headline: profile.headline || '',
    bio: profile.bio || '',
    skills: Array.isArray(profile.skills) ? profile.skills.join(', ') : '',
    githubUrl: profile.githubUrl || '',
    linkedinUrl: profile.linkedinUrl || '',
    portfolioUrl: profile.portfolioUrl || '',
    experienceYears: profile.experienceYears?.toString() || '',
    hourlyRate: profile.hourlyRate?.toString() || '',
  };
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isUnchanged = JSON.stringify(form) === JSON.stringify(initialForm);
  
  const rawSkills = form.skills.split(',').map(s => s.trim()).filter(Boolean);
  const uniqueSkills = new Set(rawSkills.map(s => s.toLowerCase()));


  const validate = () => {
    
    const e: Record<string, string> = {};
    if (!form.headline.trim()) e.headline = 'Headline is required.';
    if (form.skills) {
      const raw = form.skills.split(',').map(s => s.trim()).filter(Boolean);
      const unique = new Set(raw.map(s => s.toLowerCase()));

      if (raw.length !== unique.size) {
        e.skills = 'Duplicate skills are not allowed.';
      }
    }
    if (form.experienceYears && (isNaN(+form.experienceYears) || +form.experienceYears < 0 || +form.experienceYears > 50))
      e.experienceYears = 'Enter a valid number (0–50).';
    if (form.hourlyRate && (isNaN(+form.hourlyRate) || +form.hourlyRate < 1))
      e.hourlyRate = 'Enter a valid hourly rate.';
    if (form.githubUrl && !/^https?:\/\/.+/.test(form.githubUrl)) e.githubUrl = 'Must start with http:// or https://';
    if (form.linkedinUrl && !/^https?:\/\/.+/.test(form.linkedinUrl)) e.linkedinUrl = 'Must start with http:// or https://';
    if (form.portfolioUrl && !/^https?:\/\/.+/.test(form.portfolioUrl)) e.portfolioUrl = 'Must start with http:// or https://';
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaving(true); setErrors({});
    try {
      await onSave({
        headline: form.headline || null,
        bio: form.bio || null,
        skills: form.skills ? parseSkills(form.skills) : null,
        githubUrl: form.githubUrl || null,
        linkedinUrl: form.linkedinUrl || null,
        portfolioUrl: form.portfolioUrl || null,
        experienceYears: form.experienceYears ? parseInt(form.experienceYears) : null,
        hourlyRate: form.hourlyRate ? parseInt(form.hourlyRate) : null,
      });
      onClose();
    } catch (e: any) { setErrors({ global: e.message }); }
    finally { setSaving(false); }
  };

  const parseSkills = (input: string) => {
    return Array.from(
      new Set(
        input
          .split(',')
          .map(s => s.trim().toLowerCase()) // normalize
          .filter(Boolean)
      )
    );
  };

  const fields = [
    { key: 'headline',       label: 'Professional Headline *',  placeholder: 'Full-Stack Engineer · React · Node.js', type: 'text' },
    { key: 'githubUrl',      label: 'GitHub URL',               placeholder: 'https://github.com/username',          type: 'url'  },
    { key: 'linkedinUrl',    label: 'LinkedIn URL',             placeholder: 'https://linkedin.com/in/username',     type: 'url'  },
    { key: 'portfolioUrl',   label: 'Portfolio URL',            placeholder: 'https://yourportfolio.com',            type: 'url'  },
    { key: 'experienceYears',label: 'Years of Experience',      placeholder: '5',                                    type: 'number'},
    { key: 'hourlyRate',     label: 'Hourly Rate (USD)',         placeholder: '75',                                   type: 'number'},
  ];

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 mt-12 pt-20"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={!isIncomplete ? onClose : onClose}
      />
      <motion.div
        className="relative w-full max-w-lg bg-[#0b1120] border border-white/[0.09] rounded-3xl shadow-2xl overflow-y-auto max-h-[90vh]"
        initial={{ scale: 0.95, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="h-1 bg-gradient-to-r from-indigo-600 via-blue-500 to-cyan-500" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-2xl italic font-bold text-white">
                {isIncomplete ? 'Complete Profile' : 'Edit Profile'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Keep your profile up to date to attract better clients</p>
            </div>
            <button onClick={!isIncomplete ? onClose : onClose} className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.09] transition-all">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {errors.global && (
            <div className="mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />{errors.global}
            </div>
          )}

          <div className="space-y-4">
            {fields.map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">{label}</label>
                <input type={type} placeholder={placeholder} value={(form as any)[key]}
                  onChange={e => { setForm(f => ({ ...f, [key]: e.target.value })); setErrors(er => ({...er, [key]: ''})); }}
                  className={`w-full bg-[#111827] border rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 outline-none transition-all placeholder:text-slate-700 ${
                    errors[key] ? 'border-rose-500/50 focus:ring-rose-500/30' : 'border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/30'
                  }`} />
                {errors[key] && <p className="text-xs text-rose-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors[key]}</p>}
              </div>
            ))}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Skills (comma-separated)</label>
              <input type="text" placeholder="React, Node.js, TypeScript, PostgreSQL" value={form.skills}
                onChange={e => {
                  const value = e.target.value;
                  setForm(f => ({ ...f, skills: value }));

                  // optional: live validation (non-destructive)
                  const raw = value.split(',').map(s => s.trim()).filter(Boolean);
                  const unique = new Set(raw.map(s => s.toLowerCase()));

                  setErrors(er => ({
                    ...er,
                    skills:
                      raw.length !== unique.size
                        ? 'Duplicate skills are not allowed.'
                        : ''
                  }));
                }}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-700" />
            </div>
             {errors.skills && (
                <p className="text-xs text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.skills}
                </p>
              )}
            <div>
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">Bio</label>
              <textarea rows={4} placeholder="Tell clients about yourself, your expertise, and what makes you unique..."
                value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 outline-none transition-all placeholder:text-slate-700 resize-none" />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/[0.09] text-slate-400 text-sm font-semibold hover:bg-white/[0.04] transition-all"
            >
              {isIncomplete ? 'Skip for now' : 'Cancel'}
            </button>
            <motion.button onClick={handleSave} disabled={saving || isUnchanged}
              whileHover={!saving ? { scale: 1.01 } : {}} whileTap={!saving ? { scale: 0.99 } : {}}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-indigo-600/25">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" />Save Changes</>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Proposal Card ────────────────────────────────────── */
function ProposalCard({ proposal, index, onRefresh }: { proposal: Proposal; index: number; onRefresh: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const cfg = statusConfig[proposal.status];
  const StatusIcon = cfg.icon;
  const skills = Array.isArray(proposal.gig.skills) ? proposal.gig.skills : [];
  const gigStat = gigStatusColor[proposal.gig.status] || gigStatusColor.OPEN;

  const showSubmission = proposal.status === 'HIRED' &&
    (proposal.gig.status === 'IN_PROGRESS' || proposal.gig.status === 'COMPLETED');

  return (
    <motion.div variants={fadeUp} custom={index} layout
      className={`relative bg-[#0b1120] border rounded-2xl overflow-hidden transition-all duration-300 group ${
        proposal.status === 'HIRED'
          ? 'border-emerald-500/25 hover:border-emerald-500/40'
          : 'border-white/[0.07] hover:border-white/[0.13]'
      }`}>

      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${
        proposal.status === 'HIRED' ? 'from-emerald-500 to-teal-600' :
        proposal.status === 'SHORTLISTED' ? 'from-amber-500 to-orange-500' :
        proposal.status === 'REJECTED' ? 'from-rose-500 to-rose-700' :
        'from-indigo-500 to-blue-600'
      }`} />

      {proposal.status === 'SHORTLISTED' && (
        <div className="bg-amber-500/[0.08] border-b border-amber-500/20 px-5 py-2.5 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-300 font-medium">Shortlisted — the client may reach out soon. Polish your pitch!</p>
        </div>
      )}
      {proposal.gig.status !== 'COMPLETED' && proposal.status === 'HIRED' && (
        <div className="bg-emerald-500/[0.08] border-b border-emerald-500/20 px-5 py-2.5 flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 font-medium">Congratulations! You've been hired for this gig.</p>
        </div>
      )}
      {proposal.gig.status === 'COMPLETED' && (
        <div className="bg-emerald-500/[0.08] border-b border-emerald-500/20 px-5 py-2.5 flex items-start gap-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-300 font-medium">Congratulations! You've been completed this gig.</p>
        </div>
      )}

      <div className="px-5 py-4 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}>
            <StatusIcon className={`w-4.5 h-4.5 ${cfg.color}`} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${gigStat.bg} ${gigStat.border} ${gigStat.text}`}>
                {proposal.gig.status.replace('_', ' ')}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors leading-tight">{proposal.gig.title}</h4>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Applied {new Date(proposal.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {proposal.bidAmount && (
              <div className="text-right">
                <p className="text-sm font-black text-emerald-400">${proposal.bidAmount.toLocaleString()}</p>
                {proposal.deliveryDays && <p className="text-[10px] text-slate-600">{proposal.deliveryDays}d delivery</p>}
              </div>
            )}
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </motion.div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 ml-13">
            {skills.slice(0, 5).map(s => (
              <span key={s} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[10px] text-slate-500 font-mono">{s}</span>
            ))}
            {skills.length > 5 && <span className="text-[10px] text-slate-600 self-center">+{skills.length - 5}</span>}
          </div>
        )}
      </div>

      { (proposal.gig.status.replace('_', ' ') !== 'COMPLETED') && showSubmission && (
        <div className="px-5 pb-4 border-t border-white/[0.05] pt-4">
          <WorkSubmissionPanel gigId={proposal.gigId} gigTitle={proposal.gig.title} onSuccess={onRefresh} />
        </div>
      )}

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-white/[0.05] pt-4 space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {proposal.gig.budgetMin && (
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Budget</p>
                    <p className="text-sm font-bold text-white">${proposal.gig.budgetMin}–${proposal.gig.budgetMax || '?'}</p>
                  </div>
                )}
                {proposal.deliveryDays && (
                  <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Delivery</p>
                    <p className="text-sm font-bold text-white">{proposal.deliveryDays} days</p>
                  </div>
                )}
                <div className="bg-white/[0.03] rounded-xl p-3 border border-white/[0.06]">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-1">Location</p>
                  <p className="text-sm font-bold text-white">{proposal.gig.isRemote ? 'Remote' : (proposal.gig.location || 'On-site')}</p>
                </div>
              </div>

              {proposal.coverLetter && (
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" /> Your Cover Letter
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-5">{proposal.coverLetter}</p>
                </div>
              )}

              {proposal.portfolioUrl && (
                <a href={proposal.portfolioUrl} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-xs text-indigo-400 hover:text-white hover:border-white/[0.15] transition-all font-semibold">
                  <ExternalLink className="w-3.5 h-3.5" /> View Submitted Portfolio
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Profile Card ───────────────────────────────────── */
function ProfileCard({ user, profile, proposals, onEdit }: {
  user: UserData;
  profile: FreelancerProfile;
  proposals: Proposal[];
  onEdit: () => void;
}) {
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const successRate = proposals.length ? Math.round((proposals.filter(p => p.status === 'HIRED').length / proposals.length) * 100) : 0;
  const rating = profile.jobSuccessScore != null ? (profile.jobSuccessScore / 100) * 5 : 0;

  return (
    <div className="space-y-4">
      {/* Main profile card */}
      <div className="bg-[#0b1120] border border-white/[0.07] rounded-3xl overflow-hidden">
        {/* Gradient header */}
        <div className="relative h-20 bg-gradient-to-r from-indigo-600/20 via-blue-600/20 to-cyan-600/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        </div>

        <div className="px-5 pb-5">
          {/* Avatar overlap */}
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-2xl font-black text-white shadow-xl shadow-indigo-500/30 border-2 border-[#0b1120]">
                {profile.fullName?.[0]?.toUpperCase() || 'F'}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0b1120] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-900 animate-pulse" />
              </div>
            </div>
            <motion.button onClick={onEdit}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] border border-white/[0.09] rounded-xl text-slate-400 text-xs font-semibold hover:text-white hover:bg-white/[0.09] transition-all">
              <Edit3 className="w-3.5 h-3.5" /> Edit
            </motion.button>
          </div>

          <h2 className="text-base font-black text-white">{profile.fullName || '—'}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{profile.headline || <span className="text-slate-600 italic">No headline set</span>}</p>

          {/* Ratings section — FIXED */}
          {profile.jobSuccessScore != null && (
            <div className="mt-4 p-3.5 bg-gradient-to-br from-amber-500/[0.08] to-orange-500/[0.04] border border-amber-500/20 rounded-2xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <p className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Success Score</p>
                </div>
                <span className="text-sm font-black text-amber-300">{profile.jobSuccessScore}%</span>
              </div>
              {/* Stars */}
              <div className="flex items-center gap-2 mb-2">
                <RatingStars rating={rating} size="md" />
                <span className="text-xs text-amber-400 font-bold">{rating.toFixed(1)} / 5.0</span>
              </div>
              {/* Bar */}
              <div className="h-1.5 bg-black/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profile.jobSuccessScore}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                />
              </div>
              {profile.completedJobs != null && (
                <p className="text-[10px] text-slate-500 mt-2">
                  Based on {profile.completedJobs} completed job{profile.completedJobs !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          <div className="space-y-2.5 mt-4 pt-4 border-t border-white/[0.06]">
            {[
              { icon: Mail, value: user.email, href: `mailto:${user.email}` },
              { icon: Clock, value: profile.experienceYears ? `${profile.experienceYears} yrs experience` : 'Experience not set', href: null },
              { icon: DollarSign, value: profile.hourlyRate ? `$${profile.hourlyRate}/hr` : 'Rate not set', href: null },
            ].map(({ icon: Icon, value, href }, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-slate-500">
                <Icon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                {href
                  ? <a href={href} className="hover:text-indigo-400 transition-colors truncate">{value}</a>
                  : <span className="truncate">{value}</span>}
              </div>
            ))}
          </div>

          {(profile.githubUrl || profile.linkedinUrl || profile.portfolioUrl) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/[0.06]">
              {profile.githubUrl && (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-slate-400 hover:text-white hover:border-white/[0.15] transition-all font-medium">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </a>
              )}
              {profile.linkedinUrl && (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-slate-400 hover:text-white hover:border-white/[0.15] transition-all font-medium">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              )}
              {profile.portfolioUrl && (
                <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-[11px] text-slate-400 hover:text-white hover:border-white/[0.15] transition-all font-medium">
                  <Globe className="w-3.5 h-3.5" /> Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bio */}
      {profile.bio && (
        <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mb-3">About</p>
          <p className="text-xs text-slate-400 leading-relaxed">{profile.bio}</p>
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5">
          <p className="text-[11px] text-slate-500 uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Skills
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skills.map(skill => (
              <span key={skill} className="px-2.5 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-[11px] text-indigo-300 font-semibold">{skill}</span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-4 text-center">
        <p className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Member Since</p>
        <p className="text-sm font-bold text-white mt-1">
          {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function FreelancerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [proposalsLoading, setProposalsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'SUBMITTED' | 'SHORTLISTED' | 'HIRED' | 'REJECTED'>('all');
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [autoOpenAllowed, setAutoOpenAllowed] = useState(true);

  

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/auth/me`, { credentials: 'include' });
      if (!res.ok) { router.push('/freelancex/login'); return; }
      const data = await res.json();
      if (data.role !== 'FREELANCER') { router.push('/freelancex/dashboard/client'); return; }
      setUser(data);
    } catch { setError('Failed to load profile.'); }
    finally { setLoading(false); }
  };

  const fetchProposals = async () => {
    setProposalsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/freelancer/proposals`, { credentials: 'include' });
      if (res.ok) setProposals(await res.json());
    } catch {}
    finally { setProposalsLoading(false); }
  };

  useEffect(() => { fetchUser(); fetchProposals(); }, []);
  useEffect(() => {
  if (!user) return;

  const incomplete = isProfileIncomplete(user.freelancerProfile);

  console.log('PROFILE CHECK:', user.freelancerProfile, incomplete);

  if (incomplete) {
    setEditOpen(true);
  }
}, [user?.freelancerProfile]);

  const handleUpdateProfile = async (data: Partial<FreelancerProfile>) => {
    const res = await fetch(`${API_BASE}/api/freelancex/freelancer/profile`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) { const d = await res.json(); throw new Error(d.message || 'Update failed'); }
    setAutoOpenAllowed(false);
    await fetchUser();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch(`${API_BASE}/api/freelancex/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/freelancex/login');
  };

  const proposalStats = {
    total: proposals.length,
    hired: proposals.filter(p => p.status === 'HIRED').length,
    shortlisted: proposals.filter(p => p.status === 'SHORTLISTED').length,
    rejected: proposals.filter(p => p.status === 'REJECTED').length,
    submitted: proposals.filter(p => p.status === 'SUBMITTED').length,
  };

  const filteredProposals = activeTab === 'all' ? proposals : proposals.filter(p => p.status === activeTab);
  const profile = user?.freelancerProfile;

  const tabs: Array<{ key: typeof activeTab; label: string; count: number; color: string }> = [
    { key: 'all',         label: 'All',         count: proposals.length,          color: 'text-white' },
    { key: 'SUBMITTED',   label: 'Applied',      count: proposalStats.submitted,   color: 'text-sky-400' },
    { key: 'SHORTLISTED', label: 'Shortlisted',  count: proposalStats.shortlisted, color: 'text-amber-400' },
    { key: 'HIRED',       label: 'Hired',        count: proposalStats.hired,       color: 'text-emerald-400' },
    { key: 'REJECTED',    label: 'Rejected',     count: proposalStats.rejected,    color: 'text-rose-400' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060d1f] text-white">
        <style>{`
          @keyframes sk-shimmer {
            0% { background-position: -600px 0; }
            100% { background-position: 600px 0; }
          }
          .sk {
            background: linear-gradient(
              90deg,
              rgba(255,255,255,0.04) 0px,
              rgba(255,255,255,0.09) 80px,
              rgba(255,255,255,0.04) 160px
            );
            background-size: 600px 100%;
            animation: sk-shimmer 1.6s ease-in-out infinite;
            border-radius: 8px;
          }
        `}</style>

        {/* ── Navbar skeleton ── */}
        <div className="fixed top-4 left-4 right-4 z-[100]">
          <nav className="max-w-7xl mx-auto bg-[#020617]/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl px-6">
            <div className="flex justify-between items-center h-16">
              
              {/* Real Logo — no auth needed */}
              <Logo isSticky={false} />

              {/* Nav links — shimmer */}
              <div className="hidden md:flex items-center gap-8">
                <div className="sk h-2.5 w-20 rounded-full" />
                <div className="sk h-2.5 w-16 rounded-full" />
                <div className="sk h-2.5 w-24 rounded-full" />
              </div>

              {/* Right side — shimmer for CTA + user pill */}
              <div className="flex items-center gap-3">
                {/* User pill shimmer */}
                <div className="sk h-9 w-36 rounded-full" />
                {/* Mobile menu icon shimmer */}
                <div className="md:hidden sk h-6 w-6 rounded-md" />
              </div>

            </div>
          </nav>
        </div>

        {/* ── Hero skeleton ── */}
        <div className="relative bg-[#050915] pt-28 pb-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
            {/* Badge */}
            <div className="sk h-7 w-56 rounded-full mb-7" />
            {/* Greeting */}
            <div className="sk h-3 w-28 rounded-full mb-4" />
            {/* Headline */}
            <div className="sk h-12 w-72 rounded-2xl mb-3" />
            <div className="sk h-10 w-60 rounded-2xl mb-6" />
            {/* Subheadline */}
            <div className="sk h-4 w-80 rounded-full mb-2" />
            <div className="sk h-4 w-64 rounded-full mb-8" />
            {/* Motivation strip */}
            <div className="sk h-9 w-88 rounded-full mb-8" />
            {/* Rating row */}
            <div className="flex items-center gap-4 mb-8">
              <div className="sk h-5 w-28 rounded-full" />
              <div className="sk h-4 w-px" />
              <div className="sk h-4 w-36 rounded-full" />
            </div>
            {/* Primary stat card */}
            <div className="w-full max-w-3xl mb-3">
              <div className="sk h-[88px] w-full rounded-2xl" />
            </div>
            {/* Secondary stat cards */}
            <div className="w-full max-w-3xl grid grid-cols-3 gap-3 mb-6">
              <div className="sk h-20 rounded-2xl" />
              <div className="sk h-20 rounded-2xl" />
              <div className="sk h-20 rounded-2xl" />
            </div>
            {/* Social proof */}
            <div className="sk h-6 w-60 rounded-full mb-6" />
            {/* CTA */}
            <div className="sk h-11 w-44 rounded-2xl" />
          </div>
          {/* Ticker */}
          <div className="mt-8 px-4 flex gap-3 overflow-hidden">
            {[160, 200, 180, 220, 170, 195].map((w, i) => (
              <div key={i} className="sk h-8 rounded-full flex-shrink-0" style={{ width: w }} />
            ))}
          </div>
        </div>

        {/* ── Main content skeleton ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT: Profile skeleton */}
            <div className="lg:col-span-1 space-y-4">
              {/* Main profile card */}
              <div className="bg-[#0b1120] border border-white/[0.07] rounded-3xl overflow-hidden">
                {/* Banner */}
                <div className="sk h-20 rounded-none" />
                <div className="px-5 pb-5">
                  {/* Avatar + edit */}
                  <div className="flex items-end justify-between -mt-8 mb-4">
                    <div className="sk w-16 h-16 rounded-2xl" />
                    <div className="sk h-7 w-16 rounded-xl" />
                  </div>
                  {/* Name + headline */}
                  <div className="sk h-4 w-36 rounded-full mb-2" />
                  <div className="sk h-3 w-52 rounded-full mb-4" />
                  {/* Success score card */}
                  <div className="sk h-24 w-full rounded-2xl mb-4" />
                  {/* Meta fields */}
                  <div className="border-t border-white/[0.06] pt-4 space-y-3">
                    <div className="sk h-3 w-full rounded-full" />
                    <div className="sk h-3 w-3/4 rounded-full" />
                    <div className="sk h-3 w-4/5 rounded-full" />
                  </div>
                  {/* Links */}
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="sk h-7 w-20 rounded-lg" />
                    <div className="sk h-7 w-24 rounded-lg" />
                    <div className="sk h-7 w-22 rounded-lg" />
                  </div>
                </div>
              </div>

              {/* Bio card */}
              <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5 space-y-2">
                <div className="sk h-3 w-12 rounded-full mb-3" />
                <div className="sk h-3 w-full rounded-full" />
                <div className="sk h-3 w-5/6 rounded-full" />
                <div className="sk h-3 w-4/6 rounded-full" />
              </div>

              {/* Skills card */}
              <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5">
                <div className="sk h-3 w-14 rounded-full mb-3" />
                <div className="flex flex-wrap gap-1.5">
                  {[55, 70, 60, 80, 50, 65, 45].map((w, i) => (
                    <div key={i} className="sk h-6 rounded-lg flex-shrink-0" style={{ width: w }} />
                  ))}
                </div>
              </div>

              {/* Member since */}
              <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-4 flex flex-col items-center gap-2">
                <div className="sk h-3 w-24 rounded-full" />
                <div className="sk h-4 w-32 rounded-full" />
              </div>
            </div>

            {/* RIGHT: Applications skeleton */}
            <div className="lg:col-span-2">
              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <div className="space-y-2">
                  <div className="sk h-6 w-40 rounded-xl" />
                  <div className="sk h-3 w-52 rounded-full" />
                </div>
                <div className="flex gap-2">
                  <div className="sk h-9 w-9 rounded-xl" />
                  <div className="sk h-9 w-28 rounded-xl" />
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex gap-1.5 mb-5">
                {[60, 75, 90, 60, 75].map((w, i) => (
                  <div key={i} className="sk h-9 rounded-xl flex-shrink-0" style={{ width: w }} />
                ))}
              </div>

              {/* Proposal cards */}
              <div className="space-y-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-[#0b1120] border border-white/[0.07] rounded-2xl px-5 py-4">
                    <div className="flex items-start gap-3">
                      {/* Status icon */}
                      <div className="sk w-10 h-10 rounded-xl flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        {/* Status badge row */}
                        <div className="flex gap-2">
                          <div className="sk h-5 w-16 rounded-full" />
                          <div className="sk h-5 w-20 rounded-full" />
                        </div>
                        {/* Gig title */}
                        <div className="sk h-4 w-2/3 rounded-full" />
                        {/* Applied date */}
                        <div className="sk h-3 w-32 rounded-full" />
                      </div>
                      {/* Bid + delivery */}
                      <div className="space-y-1 flex-shrink-0">
                        <div className="sk h-4 w-16 rounded-full" />
                        <div className="sk h-3 w-14 rounded-full" />
                      </div>
                    </div>
                    {/* Skill tags */}
                    <div className="flex gap-1.5 mt-3 ml-13">
                      {[50, 65, 55, 70].map((w, j) => (
                        <div key={j} className="sk h-5 rounded-lg flex-shrink-0" style={{ width: w }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-screen bg-[#060d1f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <p className="text-slate-400">{error || 'Something went wrong.'}</p>
          <button onClick={() => router.push('/freelancex/login')} className="text-indigo-400 text-sm font-semibold hover:text-indigo-300">Go to Login →</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#060d1f] text-white">
      {/* Navbar */}
      <DashboardNavbar user={user} onLogout={handleLogout} logoutLoading={logoutLoading} />

      {/* Hero */}
      <FreelancerHero user={user} proposals={proposals} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT: Profile */}
          <motion.div className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            {profile && (
              <ProfileCard user={user} profile={profile} proposals={proposals} onEdit={() => {setAutoOpenAllowed(true); setEditOpen(true)}} />
            )}
          </motion.div>

          {/* RIGHT: Proposals */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>

            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  My Applications
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">Track every proposal you've submitted</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button onClick={fetchProposals} whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all">
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                </motion.button>
                <Link href="/freelancex/gigs"
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-600/20 to-blue-600/20 border border-indigo-500/25 rounded-xl text-xs font-bold text-indigo-400 hover:from-indigo-600/30 hover:to-blue-600/30 transition-all">
                  <Zap className="w-3.5 h-3.5" /> Find Gigs
                </Link>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5">
              {tabs.map(tab => (
                <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
                    activeTab === tab.key
                      ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/25'
                      : `bg-white/[0.04] ${tab.color} border border-white/[0.07] hover:bg-white/[0.07]`
                  }`}>
                  {tab.label}
                  <span className={`ml-1.5 ${activeTab === tab.key ? 'text-white/70' : 'text-slate-600'}`}>
                    ({tab.count})
                  </span>
                </button>
              ))}
            </div>

            {proposalsLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                  <p className="text-slate-600 text-xs">Loading applications...</p>
                </div>
              </div>
            ) : filteredProposals.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 bg-[#0b1120] border border-white/[0.07] rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-7 h-7 text-indigo-400/50" />
                </div>
                <p className="text-slate-400 text-sm font-bold">No proposals {activeTab !== 'all' ? `with status "${activeTab}"` : 'yet'}</p>
                <p className="text-slate-600 text-xs mt-1 mb-6">Start applying to open gigs to build your pipeline.</p>
                <Link href="/freelancex/gigs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-xl text-sm text-white font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all">
                  Browse Open Gigs <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key={activeTab}  
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="space-y-3"
              >
                <AnimatePresence mode="wait">
                  {filteredProposals.map((proposal, i) => (
                    <ProposalCard key={proposal.id} proposal={proposal} index={i} onRefresh={fetchProposals} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {editOpen && autoOpenAllowed && (
          <EditProfileModal
            profile={profile || {
              fullName: '',
              headline: '',
              bio: '',
              skills: [],
              githubUrl: '',
              linkedinUrl: '',
              portfolioUrl: '',
              experienceYears: null,
              hourlyRate: null,
            }}
            onClose={() => setEditOpen(false)}
            onSave={handleUpdateProfile}
            isIncomplete={isProfileIncomplete(profile)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}