'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2, Mail, Globe, Briefcase, Edit3, Save, X,
  LogOut, Loader2, Sparkles, AlertCircle, RefreshCw,
  Plus, Users, FileText, CheckCircle, XCircle, Star,
  ChevronDown, ExternalLink, BarChart3, TrendingUp,
  DollarSign, MapPin, Clock, Zap, ArrowUpRight,
  Trash2, Eye, EyeOff, Tag, ToggleLeft, ToggleRight,
  Shield, Activity, Search, Filter, Award, Package,
  ChevronRight, Info, AtSign, Menu, LayoutDashboard,
  Rocket, Flame, Target, Crown, MessageSquare,
} from 'lucide-react';
import Logo from '@/components/freelancex/logo/logo';
import NotificationBell from '@/components/freelancex/NotificationBell';
import { WorkReviewPanel } from '@/components/freelancex/WorkReviewPanel';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://clc-products-real-backend.vercel.app';

/* ── Types ──────────────────────────────────────────── */
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

const isClientProfileIncomplete = (p?: ClientProfile | null) => {
  if (!p) return true;

  return (
    !p.companyName?.trim() ||
    !p.website?.trim() ||
    !p.industry?.trim()
  );
};

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
  jobSuccessScore?: number | null;
  completedJobs?: number | null;
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

/* ── Particle system ─────────────────────────────────────── */
interface Particle {
  id: number;
  x: number;
  duration: number;
  delay: number;
  size: number;
  color: string;
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

/* ── Status Configs ─────────────────────────────────── */
const proposalStatusConfig = {
  SUBMITTED:   { label: 'Submitted',   color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    dot: 'bg-sky-400'     },
  SHORTLISTED: { label: 'Shortlisted', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  dot: 'bg-amber-400'   },
  REJECTED:    { label: 'Rejected',    color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',   dot: 'bg-rose-400'    },
  HIRED:       { label: 'Hired',       color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',dot: 'bg-emerald-400' },
};

const gigStatusConfig: Record<string, { label: string; color: string; bg: string; border: string; dot: string }> = {
  OPEN:        { label: 'Open',        color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-amber-400',   bg: 'bg-amber-500/10',   border: 'border-amber-500/20',  dot: 'bg-amber-400'   },
  COMPLETED:   { label: 'Completed',   color: 'text-sky-400',     bg: 'bg-sky-500/10',     border: 'border-sky-500/20',    dot: 'bg-sky-400'     },
  CANCELLED:   { label: 'Cancelled',   color: 'text-rose-400',    bg: 'bg-rose-500/10',    border: 'border-rose-500/20',   dot: 'bg-rose-400'    },
};

/* ── Animated Number ─────────────────────────────────── */
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) { setDisplay(end); return; }
    const duration = 1200;
    const step = Math.max(end / (duration / 16), 1);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setDisplay(end); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{prefix}{display}{suffix}</>;
}

/* ── Rating Stars (FIXED) ───────────────────────────── */
function RatingStars({ rating, max = 5, size = 'sm', showLabel = false }: {
  rating: number; max?: number; size?: 'sm' | 'md'; showLabel?: boolean;
}) {
  const filled = Math.round(Math.min(Math.max(rating, 0), max));
  const starSize = size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <Star key={i}
            className={`${starSize} transition-colors ${i < filled ? 'text-amber-400 fill-amber-400' : 'text-slate-700 fill-slate-800'}`}
          />
        ))}
      </div>
      {showLabel && <span className="text-xs text-amber-400 font-bold ml-1">{rating.toFixed(1)}</span>}
    </div>
  );
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


/* ── Navbar (consistent with FreelanceX home) ───────── */
function DashboardNavbar({ user, onLogout, logoutLoading, onPostGig }: {
  user: User;
  onLogout: () => void;
  logoutLoading: boolean;
  onPostGig: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profile = user.clientProfile;
  const displayName = profile?.companyName || profile?.displayName || user.email;
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
    { name: 'Find Talent', href: '/freelancex/freelancers' },
    { name: 'Reports', href: '/freelancex/reports' },
    { name: 'AI Employers', href: '/freelancex/ai-employers' },
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
            <motion.button onClick={onPostGig}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                scrolled
                  ? 'bg-[#0f172a] text-white hover:bg-blue-700'
                  : 'bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:bg-violet-500'
              }`}>
              <Plus className="w-3.5 h-3.5" /> Post Gig
            </motion.button>

            <div className="relative" ref={dropdownRef}>
              <button onClick={() => setDropdownOpen(o => !o)}
                className={`flex items-center gap-2 rounded-full px-3 py-1.5 border transition-all ${
                  scrolled ? 'bg-slate-100 border-slate-200 hover:bg-slate-200' : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black uppercase">
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
                      <span className="inline-flex mt-1.5 text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border text-blue-400 bg-blue-500/10 border-blue-500/20">
                        Client
                      </span>
                    </div>
                    <Link href="/freelancex/dashboard/client" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                      <LayoutDashboard className="w-4 h-4 text-violet-400" /> Dashboard
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
                <button onClick={() => { onPostGig(); setMobileOpen(false); }}
                  className="text-xs font-black uppercase tracking-widest py-2 text-violet-400">
                  + Post a Gig
                </button>
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

function ClientHero({
  user,
  gigs,
  onPostGig,
}: {
  user: User;
  gigs: Gig[];
  onPostGig: () => void;
}) {
  const profile = user.clientProfile;
  const orgName =
    profile?.companyName ||
    profile?.displayName ||
    user.email.split("@")[0];

  const openGigs = gigs.filter((g) => g.status === "OPEN").length;
  const inProgressGigs = gigs.filter((g) => g.status === "IN_PROGRESS").length;
  const totalProposals = gigs.reduce((acc, g) => acc + g._count.proposals, 0);
  const hiresTotal = gigs.filter((g) => g.hiredUserId).length;

  /* motivational messages — cycles by gig count */
  const motivMessages = [
    {
      icon: Flame,
      color: "#F59E0B",
      text: `${totalProposals} freelancer${totalProposals !== 1 ? "s" : ""} applied to your gigs — review them now.`,
    },
    {
      icon: Zap,
      color: "#818CF8",
      text: "Top clients on FreelanceX hire within 48 hours of posting.",
    },
    {
      icon: TrendingUp,
      color: "#10B981",
      text: "Add a detailed brief to attract higher-quality proposals.",
    },
  ];
  const motiv = motivMessages[gigs.length % motivMessages.length];
  const MotivIcon = motiv.icon;

  const getTimeGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <>
      {/* ── Scoped keyframes + fx-* utility classes (identical to FreelancerHero) ── */}
      <style>{`
        .fx-gradient-text-client {
          background: linear-gradient(135deg, #818CF8 0%, #06B6D4 50%, #10B981 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .fx-syne { font-family: 'Syne', sans-serif; }

        @keyframes fx-orb-drift {
          0%,100% { transform: translate(0,0) scale(1); }
          25%      { transform: translate(28px,-18px) scale(1.04); }
          50%      { transform: translate(-18px,26px) scale(0.97); }
          75%      { transform: translate(18px,8px) scale(1.03); }
        }
        @keyframes fx-pulse-dot {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:0.45; transform:scale(0.65); }
        }
        @keyframes fx-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes fx-shimmer {
          from { left: -100%; }
          to   { left: 100%; }
        }

        /* Primary CTA — matches FreelancerHero exactly */
        .fx-btn-primary-client {
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
        @keyframes fx-float {
        0% { opacity:0; transform:translateY(0) scale(0); }
        10% { opacity:0.85; transform:translateY(-12px) scale(1); }
        90% { opacity:0.25; }
        100% { opacity:0; transform:translateY(-220px) scale(0.4); }
      }
        .fx-btn-primary-client::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.13), transparent);
          animation: fx-shimmer 2.8s ease-in-out infinite;
        }
        .fx-btn-primary-client:hover {
          transform: translateY(-2px) scale(1.025);
          box-shadow: 0 16px 40px rgba(79,70,229,0.5);
        }

        /* Stat cards with colored bottom accent on hover */
        .fx-stat-card-client {
          position: relative;
          overflow: hidden;
        }
        .fx-stat-card-client::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          border-radius: 0 0 14px 14px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .fx-stat-card-client:hover::after { opacity: 1; }
        .fx-stat-violet::after  { background: #818CF8; }
        .fx-stat-emerald2::after { background: #10B981; }
        .fx-stat-amber2::after  { background: #F59E0B; }

        /* Ticker fade mask */
        .fx-ticker-mask-client {
          -webkit-mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent);
        }
      `}</style>

      <div className="relative overflow-hidden bg-[#050915] pb-0 pt-0">
        {/* ── Cinematic background (mirrors FreelancerHero orbs) ── */}
        <div className="pointer-events-none absolute inset-0">
          {/* Orbs — hue-shifted slightly toward violet to suit "client" context */}
          {[
            { w: 700, h: 700, top: -200, left: -100,  color: "rgba(99,102,241,0.15)", dur: "20s" },
            { w: 500, h: 500, top: -60,  right: -80,  color: "rgba(6,182,212,0.10)",  dur: "28s", delay: "-8s" },
            { w: 360, h: 360, top: 320,  left: "38%", color: "rgba(139,92,246,0.08)", dur: "34s", delay: "-15s" },
            { w: 260, h: 260, bottom: 80,right: "18%", color: "rgba(16,185,129,0.07)", dur: "22s", delay: "-5s" },
          ].map((o, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width:  o.w,
                height: o.h,
                top:    (o as any).top,
                left:   (o as any).left,
                right:  (o as any).right,
                bottom: (o as any).bottom,
                background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
                filter: "blur(88px)",
                animation: `fx-orb-drift ${o.dur} ${(o as any).delay ?? "0s"} ease-in-out infinite`,
              }}
            />
          ))}

          {/* Subtle grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(99,102,241,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
              maskImage:
                "radial-gradient(ellipse 80% 55% at 50% 0%, black 0%, transparent 100%)",
            }}
          />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 90% 60% at 50% 0%, transparent 30%, #050915 100%)",
            }}
          />
        </div>

        {/* ── Particle field (same component as FreelancerHero) ── */}
        <ParticleField />

        {/* ══════════ CONTENT ══════════ */}
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-0">
          <motion.div
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            {/* ── Nav badge ── */}
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
                  FreelanceX · Client Dashboard
                </span>
              </div>
            </motion.div>

            {/* ── Greeting divider ── */}
            <motion.div className="mb-2 flex items-center gap-3">
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(129,140,248,0.45))",
                }}
              />
              <span
                className="text-[11px] font-medium uppercase tracking-[0.18em]"
                style={{ color: "#64748B" }}
              >
                {getTimeGreeting()}
              </span>
              <div
                className="h-px w-8"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(129,140,248,0.45), transparent)",
                }}
              />
            </motion.div>

            {/* ── Headline ── */}
            <motion.div className="mb-4">
              <h1
                className="fx-syne leading-[1.03] tracking-tight"
                style={{
                  fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  color: "white",
                }}
              >
                {orgName},
                <br />
                <span className="fx-gradient-text-client">
                  build your dream team.
                </span>
              </h1>
            </motion.div>

            {/* ── Subheadline ── */}
            <motion.div className="mb-6 max-w-xl">
              <p
                className="text-base leading-relaxed"
                style={{ color: "#94A3B8", fontWeight: 300 }}
              >
                {profile?.industry
                  ? `${profile.industry} · Access the world's top freelance talent to accelerate your projects.`
                  : "Post a gig and receive curated proposals from top freelancers within hours."}
              </p>
            </motion.div>

            {/* ── Motivation strip ── */}
            <motion.div className="mb-8">
              <div
                className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5"
                style={{
                  background: `${motiv.color}14`,
                  borderColor: `${motiv.color}28`,
                }}
              >
                <MotivIcon
                  className="h-[14px] w-[14px]"
                  style={{ color: motiv.color }}
                />
                <p className="text-xs font-medium" style={{ color: motiv.color }}>
                  {motiv.text}
                </p>
              </div>
            </motion.div>

          

            {/* ── Mega stats ── */}
            <motion.div className="w-full max-w-3xl">
              {/* Primary — total proposals */}
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
                    className="fx-syne leading-none"
                    style={{
                      fontSize: "3rem",
                      fontWeight: 800,
                      color: "white",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <AnimatedNumber value={totalProposals} />
                  </p>
                  <p
                    className="mt-1 text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: "#475569" }}
                  >
                    Total Proposals Received
                  </p>
                </div>
                <div
                  className="flex items-center gap-2 text-xs"
                  style={{ color: "#818CF8" }}
                >
                  <Users className="h-[14px] w-[14px]" strokeWidth={1.5} />
                  Talent Pipeline
                </div>
              </div>

              {/* Secondary stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: gigs.length,
                    label: "Total Gigs",
                    icon: Briefcase,
                    color: "#818CF8",
                    cls: "fx-stat-violet",
                  },
                  {
                    value: openGigs,
                    label: "Active Gigs",
                    icon: Zap,
                    color: "#10B981",
                    cls: "fx-stat-emerald2",
                  },
                  {
                    value: hiresTotal,
                    label: "Hires Made",
                    icon: CheckCircle,
                    color: "#F59E0B",
                    cls: "fx-stat-amber2",
                  },
                ].map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      className={`fx-stat-card-client ${stat.cls} flex items-center justify-between rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-0.5`}
                      style={{
                        background: "rgba(255,255,255,0.025)",
                        borderColor: "rgba(255,255,255,0.07)",
                      }}
                    >
                      <div>
                        <p
                          className="fx-syne leading-none"
                          style={{
                            fontSize: "1.55rem",
                            fontWeight: 700,
                            color: "white",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          <AnimatedNumber value={stat.value} />
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

            {/* ── Social proof ── */}
            <motion.div className="mt-6 flex items-center gap-3">
              <div className="flex">
                {[
                  { initials: "TK", bg: "#4F46E5" },
                  { initials: "MR", bg: "#0891B2" },
                  { initials: "AS", bg: "#059669" },
                  { initials: "PL", bg: "#B45309" },
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
                <span style={{ color: "#64748B", fontWeight: 500 }}>
                  8,200+ clients
                </span>{" "}
                hired top talent on FreelanceX this month.
              </span>
            </motion.div>

            {/* ── CTA strip ── */}
            <motion.div className="mt-6 mb-4 flex items-center gap-3">
              <button onClick={onPostGig} className="fx-btn-primary-client">
                <Plus className="h-[14px] w-[14px]" />
                Post a New Gig
                <ArrowUpRight className="h-[14px] w-[14px]" />
              </button>
              <Link
                href="/freelancex/gigs"
                className="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-normal transition-all duration-200 hover:bg-white/5"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                  color: "#64748B",
                  textDecoration: "none",
                }}
              >
                <Users className="h-[14px] w-[14px]" />
                Browse Freelancers
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* ── Live activity ticker ── */}
        <div className="fx-ticker-mask-client relative z-10 mt-8 w-full overflow-hidden">
          <div
            className="flex gap-4"
            style={{
              width: "max-content",
              animation: "fx-ticker 36s linear infinite",
            }}
          >
            {[...CLIENT_TICKER_ITEMS, ...CLIENT_TICKER_ITEMS].map((t, i) => (
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
                  style={{
                    background: t.color,
                    boxShadow: `0 0 5px ${t.color}`,
                  }}
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

/* ─────────────────────────────────────────────────────────────
   CLIENT_TICKER_ITEMS
   Drop-in replacement for TICKER_ITEMS — same shape, client-
   flavoured copy. Add or remove entries freely.
───────────────────────────────────────────────────────────── */
const CLIENT_TICKER_ITEMS = [
  { label: "Acme Corp hired a React dev · 2 min ago",          color: "#10B981" },
  { label: "New proposal received on your UI gig",             color: "#818CF8" },
  { label: "Stripe awarded 5★ to their freelancer",            color: "#F59E0B" },
  { label: "FinTech startup filled a Node.js role · 5 min ago",color: "#06B6D4" },
  { label: "43 new freelancers joined FreelanceX today",       color: "#10B981" },
  { label: "Shopify client closed 3 gigs this week",           color: "#F59E0B" },
  { label: "AI/ML gig received 18 proposals · 10 min ago",     color: "#818CF8" },
  { label: "Remote design contract signed · $8,400",           color: "#06B6D4" },
];


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

/* ── Edit Profile Modal ─────────────────────────────── */
function EditProfileModal({ profile, onClose, onSave }: {
  profile: ClientProfile;
  onClose: () => void;
  onSave: (data: Partial<ClientProfile>) => Promise<void>;
}) {
  const [form, setForm] = useState({ companyName: profile.companyName || '', website: profile.website || '', industry: profile.industry || '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const validate = () => {
    if (!form.companyName.trim()) return 'Organization name is required.';
    if (form.website && !/^https?:\/\/.+/.test(form.website)) return 'Website must start with http:// or https://';
    return '';
  };

  const handleSave = async () => {
    const err = validate(); if (err) { setError(err); return; }
    setSaving(true); setError('');
    try { await onSave({ companyName: form.companyName || null, website: form.website || null, industry: form.industry || null }); onClose(); }
    catch (e: any) { setError(e.message); }
    finally { setSaving(false); }
  };

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full max-w-md bg-[#0b1120] border border-white/[0.09] rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 24 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
        <div className="h-1 bg-gradient-to-r from-violet-600 via-indigo-500 to-cyan-500" />
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-white">Edit Organization Profile</h3>
              <p className="text-xs text-slate-500 mt-0.5">Update your company information</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.09] transition-all">
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
          {error && <div className="mb-4 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-xs text-rose-400 flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0" />{error}</div>}
          <div className="space-y-4">
            {[
              { key: 'companyName', label: 'Organization Name *', placeholder: 'Acme Corp Ltd.' },
              { key: 'website',     label: 'Website URL',         placeholder: 'https://yourcompany.com' },
              { key: 'industry',    label: 'Industry',            placeholder: 'Software, Finance, Healthcare...' },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-1.5">
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</label>
                <input type="text" placeholder={placeholder} value={(form as any)[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  className="w-full bg-[#111827] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 outline-none transition-all placeholder:text-slate-700" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/[0.09] text-slate-400 text-sm font-semibold hover:bg-white/[0.04] transition-all">Cancel</button>
            <motion.button onClick={handleSave} disabled={saving}
              whileHover={!saving ? { scale: 1.01 } : {}} whileTap={!saving ? { scale: 0.99 } : {}}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-violet-600/20">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4" />Save Changes</>}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
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

/* ── Delete Confirm Modal ───────────────────────────── */
function DeleteModal({ gig, onClose, onConfirm }: { gig: Gig; onClose: () => void; onConfirm: () => Promise<void> }) {
  const [loading, setLoading] = useState(false);
  const isCompleted = gig.status === 'COMPLETED';

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />
      <motion.div className="relative w-full max-w-sm bg-[#0b1120] border border-white/[0.09] rounded-3xl shadow-2xl overflow-hidden"
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <div className={`h-1 ${isCompleted ? 'bg-gradient-to-r from-sky-500 to-indigo-500' : 'bg-gradient-to-r from-rose-600 to-orange-500'}`} />
        <div className="p-6">
          <div className={`w-12 h-12 rounded-2xl ${isCompleted ? 'bg-sky-500/10 border border-sky-500/20' : 'bg-rose-500/10 border border-rose-500/20'} flex items-center justify-center mx-auto mb-4`}>
            {isCompleted ? <Shield className="w-5 h-5 text-sky-400" /> : <Trash2 className="w-5 h-5 text-rose-400" />}
          </div>
          <h3 className="text-base font-bold text-white text-center mb-2">{isCompleted ? 'Cannot Delete Completed Gig' : 'Delete Gig'}</h3>
          <p className="text-xs text-slate-400 text-center mb-5 leading-relaxed">
            {isCompleted
              ? `"${gig.title}" has been completed and is preserved for record-keeping.`
              : `This will permanently remove "${gig.title}" and all ${gig._count.proposals} proposal(s). Cannot be undone.`}
          </p>
          {isCompleted ? (
            <button onClick={onClose} className="w-full py-2.5 rounded-xl bg-sky-600/20 border border-sky-500/30 text-sky-400 text-sm font-semibold hover:bg-sky-600/30 transition-all">Got it, close</button>
          ) : (
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-white/[0.09] text-slate-400 text-sm font-semibold hover:bg-white/[0.04] transition-all">Cancel</button>
              <motion.button onClick={async () => { setLoading(true); await onConfirm(); setLoading(false); }} disabled={loading}
                whileHover={!loading ? { scale: 1.01 } : {}} whileTap={!loading ? { scale: 0.99 } : {}}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4" />Delete</>}
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Proposal Row (with fixed ratings) ──────────────── */
function ProposalRow({ proposal, gigId, onStatusUpdate }: {
  proposal: Proposal; gigId: string;
  onStatusUpdate: (gigId: string, proposalId: string, status: string) => Promise<void>;
}) {
  const [updating, setUpdating] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const cfg = proposalStatusConfig[proposal.status];
  const fp = proposal.user.freelancerProfile;
  const skills = Array.isArray(fp?.skills) ? fp.skills : [];
  const freelancerName = fp?.fullName || proposal.user.email.split('@')[0];
  const rating = fp?.jobSuccessScore != null ? (fp.jobSuccessScore / 100) * 5 : null;

  const handleStatus = async (status: string) => {
    setUpdating(true);
    try { await onStatusUpdate(gigId, proposal.id, status); }
    finally { setUpdating(false); }
  };

  return (
    <motion.div layout className="bg-[#0f1629] border border-white/[0.07] rounded-xl overflow-hidden hover:border-white/[0.12] transition-all">
      <div className="p-4 cursor-pointer" onClick={() => setExpanded(e => !e)}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shrink-0 text-sm font-black text-white shadow-lg shadow-indigo-500/20">
            {freelancerName[0]?.toUpperCase() || '?'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-white">{freelancerName}</p>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate mt-0.5">{fp?.headline || proposal.user.email}</p>
            {/* Ratings in proposal row — FIXED */}
            {rating !== null && (
              <div className="flex items-center gap-1.5 mt-1">
                <RatingStars rating={rating} size="sm" />
                <span className="text-[10px] text-amber-400 font-semibold">{fp!.jobSuccessScore}%</span>
              </div>
            )}
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
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <div className="px-4 pb-4 border-t border-white/[0.05] pt-4 space-y-4">

              {/* Experience & full rating */}
              <div className="flex items-center gap-4 flex-wrap">
                {fp?.experienceYears != null && (
                  <span className="text-xs text-slate-500">{fp.experienceYears} yrs exp.</span>
                )}
                {fp?.hourlyRate && (
                  <span className="text-xs text-slate-500">${fp.hourlyRate}/hr</span>
                )}
                {fp?.completedJobs != null && (
                  <span className="text-xs text-slate-500">{fp.completedJobs} jobs completed</span>
                )}
                {rating !== null && (
                  <div className="flex items-center gap-1.5">
                    <RatingStars rating={rating} size="sm" showLabel />
                    <span className="text-[10px] text-slate-600">success score</span>
                  </div>
                )}
              </div>

              {skills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {skills.slice(0, 6).map(s => (
                    <span key={s} className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-full text-[10px] text-violet-300 font-medium">{s}</span>
                  ))}
                  {skills.length > 6 && <span className="text-[10px] text-slate-600 self-center">+{skills.length - 6}</span>}
                </div>
              )}

              {proposal.coverLetter && (
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Cover Letter</p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-4">"{proposal.coverLetter}"</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {proposal.portfolioUrl && (
                  <a href={proposal.portfolioUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-indigo-400 hover:text-white hover:border-white/[0.15] transition-all font-medium">
                    <ExternalLink className="w-3 h-3" /> Portfolio
                  </a>
                )}
                {fp?.githubUrl && (
                  <a href={fp.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] border border-white/[0.08] rounded-lg text-xs text-slate-400 hover:text-white hover:border-white/[0.15] transition-all font-medium">
                    <ExternalLink className="w-3 h-3" /> GitHub
                  </a>
                )}
              </div>

              {proposal.status !== 'HIRED' && (
                <div className="pt-3 border-t border-white/[0.05]">
                  <p className="text-[10px] text-slate-600 font-semibold uppercase tracking-wider mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {(['SHORTLISTED', 'REJECTED', 'HIRED'] as const).filter(s => s !== proposal.status).map(status => {
                      const c = proposalStatusConfig[status];
                      return (
                        <motion.button key={status} onClick={() => handleStatus(status)} disabled={updating}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all disabled:opacity-50 ${c.bg} ${c.border} ${c.color} hover:opacity-80`}>
                          {updating ? <Loader2 className="w-3 h-3 animate-spin" /> : <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />}
                          {c.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}
              {proposal.status === 'HIRED' && (
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold pt-2 border-t border-white/[0.05]">
                  <CheckCircle className="w-4 h-4" /> This freelancer has been hired
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Gig Card ───────────────────────────────────────── */
function GigCard({ gig, index, onEdit, onDelete, onStatusUpdate, onRefresh }: {
  gig: Gig; index: number;
  onEdit: (gig: Gig) => void;
  onDelete: (gig: Gig) => void;
  onStatusUpdate: (gigId: string, proposalId: string, status: string) => Promise<void>;
  onRefresh: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [proposalTab, setProposalTab] = useState<'all' | 'SUBMITTED' | 'SHORTLISTED' | 'HIRED' | 'REJECTED'>('all');
  const statusCfg = gigStatusConfig[gig.status] || gigStatusConfig.OPEN;
  const skills = Array.isArray(gig.skills) ? gig.skills : [];
  const filteredProposals = proposalTab === 'all' ? gig.proposals : gig.proposals.filter(p => p.status === proposalTab);
  const hiredProposal = gig.proposals.find(p => p.status === 'HIRED');
  const hiredName = hiredProposal?.user?.freelancerProfile?.fullName || hiredProposal?.user?.email || '';

  return (
    <motion.div variants={fadeUp} custom={index} layout
      className={`relative bg-[#0b1120] border rounded-2xl overflow-hidden transition-all duration-300 group ${
        gig.status === 'IN_PROGRESS'
          ? 'border-amber-500/20 hover:border-amber-500/35'
          : gig.status === 'COMPLETED'
          ? 'border-sky-500/20 hover:border-sky-500/35'
          : 'border-white/[0.07] hover:border-white/[0.13]'
      }`}>

      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b ${
        gig.status === 'OPEN' ? 'from-emerald-500 to-teal-600' :
        gig.status === 'IN_PROGRESS' ? 'from-amber-500 to-orange-500' :
        gig.status === 'COMPLETED' ? 'from-sky-500 to-blue-600' :
        'from-rose-500 to-rose-700'
      }`} />

      <div className="p-5">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${statusCfg.bg} ${statusCfg.border} ${statusCfg.color}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot} ${gig.status === 'OPEN' ? 'animate-pulse' : ''}`} />
                {statusCfg.label}
              </span>
              <span className="text-[11px] text-slate-600">
                {new Date(gig.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <h4 className="text-sm font-black text-white group-hover:text-violet-300 transition-colors">{gig.title}</h4>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <motion.button onClick={() => onEdit(gig)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] hover:border-white/[0.15] transition-all">
              <Edit3 className="w-3.5 h-3.5 text-slate-400" />
            </motion.button>
            <motion.button onClick={() => onDelete(gig)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-rose-500/[0.08] border border-rose-500/20 flex items-center justify-center hover:bg-rose-500/15 transition-all">
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-slate-500 mb-3">
          {(gig.budgetMin || gig.budgetMax) && (
            <span className="flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" />
              {gig.budgetMin && gig.budgetMax ? `$${gig.budgetMin} – $${gig.budgetMax}` : gig.budgetMin ? `From $${gig.budgetMin}` : `Up to $${gig.budgetMax}`}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />{gig.isRemote ? 'Remote' : (gig.location || 'On-site')}
          </span>
        </div>

        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {skills.slice(0, 5).map(s => (
              <span key={s} className="px-2 py-0.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[11px] text-slate-400 font-mono">{s}</span>
            ))}
            {skills.length > 5 && <span className="text-[11px] text-slate-600 self-center">+{skills.length - 5}</span>}
          </div>
        )}

        {hiredName && (
          <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-emerald-500/5 border border-emerald-500/15 rounded-xl">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300 font-semibold">
              Hired: <span className="font-black text-white">{hiredName}</span>
              {hiredProposal?.bidAmount && <span className="text-emerald-400"> · ${hiredProposal.bidAmount.toLocaleString()}</span>}
            </p>
          </div>
        )}

        <button onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors font-semibold">
          <Users className="w-3.5 h-3.5" />
          <span>{gig._count.proposals} Proposal{gig._count.proposals !== 1 ? 's' : ''}</span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.05]">
            <div className="p-5 pt-4 space-y-3">
              {(gig.status === 'IN_PROGRESS' || gig.status === 'COMPLETED') && (
                <div className="border border-white/[0.05] rounded-xl p-4 bg-white/[0.02]">
                  <WorkReviewPanel gigId={gig.id} gigTitle={gig.title} gigStatus={gig.status}
                    budgetAmount={hiredProposal?.bidAmount || gig.budgetMin}
                    hiredFreelancerName={hiredName} clientEmail={''} onRefresh={onRefresh} />
                </div>
              )}

              {gig.proposals.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">No proposals yet.</p>
                  <p className="text-xs text-slate-700 mt-0.5">Share your gig to attract talent.</p>
                </div>
              ) : (
                <>
                  <div className="flex gap-1 overflow-x-auto pb-1">
                    {([
                      ['all', `All (${gig.proposals.length})`],
                      ['SUBMITTED', `New (${gig.proposals.filter(p => p.status === 'SUBMITTED').length})`],
                      ['SHORTLISTED', `Listed (${gig.proposals.filter(p => p.status === 'SHORTLISTED').length})`],
                      ['HIRED', `Hired (${gig.proposals.filter(p => p.status === 'HIRED').length})`],
                      ['REJECTED', `Rejected (${gig.proposals.filter(p => p.status === 'REJECTED').length})`],
                    ] as const).map(([key, label]) => (
                      <button key={key} onClick={() => setProposalTab(key as any)}
                        className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${
                          proposalTab === key
                            ? 'bg-violet-600 text-white shadow-sm shadow-violet-500/30'
                            : 'bg-white/[0.04] text-slate-500 border border-white/[0.07] hover:text-slate-300'
                        }`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <AnimatePresence mode="wait">
                      {filteredProposals.map(proposal => (
                        <ProposalRow key={proposal.id} proposal={proposal} gigId={gig.id} onStatusUpdate={onStatusUpdate} />
                      ))}
                    </AnimatePresence>
                    {filteredProposals.length === 0 && (
                      <p className="text-xs text-slate-600 text-center py-6">No proposals with this status.</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Page ───────────────────────────────────────── */
export default function ClientDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);
  const [gigsLoading, setGigsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [gigModalOpen, setGigModalOpen] = useState(false);
  const [editingGig, setEditingGig] = useState<Gig | null>(null);
  const [deletingGig, setDeletingGig] = useState<Gig | null>(null);
  const [gigFilter, setGigFilter] = useState<'all' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'>('all');
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [hasSkippedProfile, setHasSkippedProfile] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/auth/me`, { credentials: 'include' });
      if (!res.ok) { router.push('/freelancex/login'); return; }
      const data = await res.json();
      if (data.role !== 'CLIENT') { router.push('/freelancex/dashboard/freelancer'); return; }
      setUser(data);
    } catch { setError('Failed to load profile.'); }
    finally { setLoading(false); }
  };

  const fetchGigs = async () => {
    setGigsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/freelancex/client/gigs`, { credentials: 'include' });
      if (res.ok) setGigs(await res.json());
    } catch {}
    finally { setGigsLoading(false); }
  };

  useEffect(() => { fetchUser(); fetchGigs(); }, []);

  useEffect(() => {
  if (!user || editOpen || hasSkippedProfile) return;

  if (isClientProfileIncomplete(user.clientProfile)) {
    setEditOpen(true);
  }
}, [user, editOpen, hasSkippedProfile]);

  const handleUpdateProfile = async (data: Partial<ClientProfile>) => {
    const res = await fetch(`${API_BASE}/api/freelancex/client/profile`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Update failed');
    await fetchUser();
  };

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

  const handleDeleteGig = async () => {
    const res = await fetch(`${API_BASE}/api/freelancex/gigs/${deletingGig!.id}`, { method: 'DELETE', credentials: 'include' });
    if (!res.ok) throw new Error('Failed to delete gig');
    setDeletingGig(null);
    await fetchGigs();
  };

  const handleProposalStatusUpdate = async (gigId: string, proposalId: string, status: string) => {
    const res = await fetch(`${API_BASE}/api/freelancex/gigs/${gigId}/proposals/${proposalId}`, {
      method: 'PATCH', headers: { 'Content-Type': 'application/json' }, credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error((await res.json()).message || 'Failed to update');
    await fetchGigs();
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await fetch(`${API_BASE}/api/freelancex/auth/logout`, { method: 'POST', credentials: 'include' });
    router.push('/freelancex/login');
  };

  const openGigs = gigs.filter(g => g.status === 'OPEN').length;
  const filteredGigs = gigFilter === 'all' ? gigs : gigs.filter(g => g.status === gigFilter);
  const profile = user?.clientProfile;

  if (loading) {
  return (
    <div className="min-h-screen bg-[#060d1f] text-white">
      {/* Shimmer keyframe */}
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
              {/* "Post Gig" button shimmer — client only, remove for freelancer file */}
              <div className="hidden sm:block sk h-9 w-24 rounded-full" />
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
          <div className="sk h-7 w-52 rounded-full mb-7" />
          {/* Greeting divider */}
          <div className="sk h-3 w-32 rounded-full mb-4" />
          {/* Headline */}
          <div className="sk h-12 w-80 rounded-2xl mb-3" />
          <div className="sk h-10 w-64 rounded-2xl mb-6" />
          {/* Subheadline */}
          <div className="sk h-4 w-72 rounded-full mb-2" />
          <div className="sk h-4 w-56 rounded-full mb-8" />
          {/* Motivation strip */}
          <div className="sk h-9 w-80 rounded-full mb-8" />
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
          <div className="sk h-6 w-64 rounded-full mb-6" />
          {/* CTAs */}
          <div className="flex items-center gap-3">
            <div className="sk h-11 w-40 rounded-2xl" />
            <div className="sk h-11 w-36 rounded-2xl" />
          </div>
        </div>
        {/* Ticker */}
        <div className="mt-8 px-4 flex gap-3 overflow-hidden">
          {[180, 220, 160, 200, 175, 190].map((w, i) => (
            <div key={i} className={`sk h-8 rounded-full flex-shrink-0`} style={{ width: w }} />
          ))}
        </div>
      </div>

      {/* ── Main content skeleton ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT: Profile skeleton */}
          <div className="lg:col-span-1 space-y-4">
            {/* Profile card */}
            <div className="bg-[#0b1120] border border-white/[0.07] rounded-3xl overflow-hidden">
              {/* Banner */}
              <div className="sk h-20 rounded-none" />
              <div className="px-5 pb-5">
                {/* Avatar + edit btn */}
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <div className="sk w-16 h-16 rounded-2xl" />
                  <div className="sk h-7 w-16 rounded-xl" />
                </div>
                {/* Name + industry */}
                <div className="sk h-4 w-40 rounded-full mb-2" />
                <div className="sk h-3 w-28 rounded-full mb-2" />
                <div className="sk h-3 w-24 rounded-full mb-4" />
                {/* Divider */}
                <div className="border-t border-white/[0.06] pt-4 space-y-3">
                  <div className="sk h-3 w-full rounded-full" />
                  <div className="sk h-3 w-4/5 rounded-full" />
                </div>
              </div>
            </div>

            {/* Activity overview */}
            <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5 space-y-4">
              <div className="sk h-3 w-32 rounded-full" />
              {[60, 40, 80, 20].map((pct, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="sk h-3 w-20 rounded-full" />
                    <div className="sk h-3 w-6 rounded-full" />
                  </div>
                  <div className="sk h-1.5 w-full rounded-full" />
                </div>
              ))}
            </div>

            {/* Member since */}
            <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-4 flex flex-col items-center gap-2">
              <div className="sk h-3 w-24 rounded-full" />
              <div className="sk h-4 w-32 rounded-full" />
            </div>
          </div>

          {/* RIGHT: Gigs skeleton */}
          <div className="lg:col-span-2">
            {/* Section header */}
            <div className="flex items-center justify-between mb-5">
              <div className="space-y-2">
                <div className="sk h-6 w-28 rounded-xl" />
                <div className="sk h-3 w-48 rounded-full" />
              </div>
              <div className="flex gap-2">
                <div className="sk h-9 w-9 rounded-xl" />
                <div className="sk h-9 w-24 rounded-xl" />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 mb-5">
              {[80, 70, 85, 65, 80].map((w, i) => (
                <div key={i} className="sk h-9 rounded-xl flex-shrink-0" style={{ width: w }} />
              ))}
            </div>

            {/* Gig cards */}
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5">
                  {/* Status + date row */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="flex-1 space-y-2">
                      <div className="flex gap-2 mb-2">
                        <div className="sk h-5 w-16 rounded-full" />
                        <div className="sk h-5 w-20 rounded-full" />
                      </div>
                      <div className="sk h-4 w-3/4 rounded-full" />
                    </div>
                    <div className="flex gap-1.5">
                      <div className="sk h-8 w-8 rounded-lg" />
                      <div className="sk h-8 w-8 rounded-lg" />
                    </div>
                  </div>
                  {/* Meta row */}
                  <div className="flex gap-4 mb-3">
                    <div className="sk h-3 w-24 rounded-full" />
                    <div className="sk h-3 w-20 rounded-full" />
                  </div>
                  {/* Skill tags */}
                  <div className="flex gap-1.5 mb-3">
                    {[60, 50, 70, 55].map((w, j) => (
                      <div key={j} className="sk h-5 rounded-lg flex-shrink-0" style={{ width: w }} />
                    ))}
                  </div>
                  {/* Proposals toggle */}
                  <div className="sk h-4 w-32 rounded-full" />
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
          <button onClick={() => router.push('/freelancex/login')} className="text-violet-400 text-sm font-semibold hover:text-violet-300">Go to Login →</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#060d1f] text-white">
      {/* Navbar */}
      <DashboardNavbar user={user} onLogout={handleLogout} logoutLoading={logoutLoading}
        onPostGig={() => { setEditingGig(null); setGigModalOpen(true); }} />

      {/* Hero */}
      <ClientHero user={user} gigs={gigs} onPostGig={() => { setEditingGig(null); setGigModalOpen(true); }} />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* LEFT: Profile */}
          <motion.div className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>

            {/* Profile card */}
            <div className="bg-[#0b1120] border border-white/[0.07] rounded-3xl overflow-hidden">
              <div className="relative h-20 bg-gradient-to-r from-violet-600/20 via-indigo-600/20 to-blue-600/20 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.06)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
              <div className="px-5 pb-5">
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-violet-500/30 border-2 border-[#0b1120]">
                    <Building2 className="w-7 h-7 text-white" />
                  </div>
                  <motion.button onClick={() => setEditProfileOpen(true)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.05] border border-white/[0.09] rounded-xl text-slate-400 text-xs font-semibold hover:text-white hover:bg-white/[0.09] transition-all">
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </motion.button>
                </div>
                <h2 className="text-base font-black text-white">{profile?.companyName || <span className="text-slate-600 italic text-sm">No org name set</span>}</h2>
                <p className="text-xs text-slate-400 mt-0.5">{profile?.industry || <span className="italic text-slate-600">Industry not set</span>}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="text-[11px] text-violet-400 font-semibold">Actively Hiring</span>
                </div>

                <div className="space-y-2.5 mt-4 pt-4 border-t border-white/[0.06]">
                  {[
                    { icon: Mail, label: user.email, href: `mailto:${user.email}` },
                    { icon: Globe, label: profile?.website || 'No website', href: profile?.website || null },
                  ].map(({ icon: Icon, label, href }, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-500">
                      <Icon className="w-3.5 h-3.5 text-slate-700 shrink-0" />
                      {href
                        ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="hover:text-violet-400 transition-colors truncate">{label}</a>
                        : <span className="text-slate-600 italic truncate">{label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity overview */}
            <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-5">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-4">
                <Activity className="w-3.5 h-3.5" /> Activity Overview
              </p>
              {[
                { label: 'Open Gigs',   value: openGigs,                                               color: 'text-emerald-400', bar: 'from-emerald-500 to-teal-500' },
                { label: 'In Progress', value: gigs.filter(g => g.status === 'IN_PROGRESS').length,    color: 'text-amber-400',   bar: 'from-amber-500 to-orange-500' },
                { label: 'Completed',   value: gigs.filter(g => g.status === 'COMPLETED').length,      color: 'text-sky-400',     bar: 'from-sky-500 to-blue-500' },
                { label: 'Cancelled',   value: gigs.filter(g => g.status === 'CANCELLED').length,      color: 'text-rose-400',    bar: 'from-rose-500 to-rose-700' },
              ].map(({ label, value, color, bar }) => (
                <div key={label} className="mb-3.5 last:mb-0">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-500">{label}</span>
                    <span className={`font-black ${color}`}>{value}</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${bar} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: gigs.length ? `${(value / gigs.length) * 100}%` : '0%' }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0b1120] border border-white/[0.07] rounded-2xl p-4 text-center">
              <p className="text-[11px] text-slate-600 uppercase tracking-wider font-medium">Member Since</p>
              <p className="text-sm font-bold text-white mt-1">
                {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            <motion.button onClick={() => { setEditingGig(null); setGigModalOpen(true); }}
              whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
              className="sm:hidden w-full py-3.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-violet-600/25">
              <Plus className="w-4 h-4" /> Post New Gig
            </motion.button>
          </motion.div>

          {/* RIGHT: Gigs */}
          <motion.div className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.35 }}>

            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-2xl italic font-black text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-violet-400" /> My Gigs
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">Manage your posted projects and proposals</p>
              </div>
              <div className="flex items-center gap-2">
                <motion.button onClick={fetchGigs} whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center hover:bg-white/[0.08] transition-all">
                  <RefreshCw className="w-4 h-4 text-slate-500" />
                </motion.button>
                <motion.button onClick={() => { setEditingGig(null); setGigModalOpen(true); }}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/25 rounded-xl text-xs font-bold text-violet-400 hover:from-violet-600/30 hover:to-indigo-600/30 transition-all">
                  <Plus className="w-3.5 h-3.5" /> New Gig
                </motion.button>
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 mb-5">
              {([
                ['all', `All (${gigs.length})`, 'text-white'],
                ['OPEN', `Open (${openGigs})`, 'text-emerald-400'],
                ['IN_PROGRESS', `Active (${gigs.filter(g => g.status === 'IN_PROGRESS').length})`, 'text-amber-400'],
                ['COMPLETED', `Done (${gigs.filter(g => g.status === 'COMPLETED').length})`, 'text-sky-400'],
                ['CANCELLED', `Cancelled (${gigs.filter(g => g.status === 'CANCELLED').length})`, 'text-rose-400'],
              ] as const).map(([key, label, textColor]) => (
                <button key={key} onClick={() => setGigFilter(key as any)}
                  className={`shrink-0 px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${
                    gigFilter === key
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25'
                      : `bg-white/[0.04] ${textColor} border border-white/[0.07] hover:bg-white/[0.07]`
                  }`}>
                  {label}
                </button>
              ))}
            </div>

            {gigsLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-6 h-6 text-violet-400 animate-spin" />
                  <p className="text-slate-600 text-xs">Loading gigs...</p>
                </div>
              </div>
            ) : filteredGigs.length === 0 ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-24 bg-[#0b1120] border border-white/[0.07] rounded-3xl">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600/20 to-indigo-600/20 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-7 h-7 text-violet-400/50" />
                </div>
                <p className="text-slate-400 text-sm font-bold">{gigFilter !== 'all' ? `No ${gigFilter.replace('_', ' ')} gigs.` : 'No gigs posted yet.'}</p>
                <p className="text-slate-600 text-xs mt-1 mb-6">Post your first gig to start hiring amazing talent.</p>
                <motion.button onClick={() => { setEditingGig(null); setGigModalOpen(true); }}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl text-sm text-white font-bold shadow-lg shadow-violet-500/25">
                  <Plus className="w-4 h-4" /> Post First Gig
                </motion.button>
              </motion.div>
            ) : (
              <motion.div key={gigFilter} variants={stagger} initial="hidden" animate="visible" className="space-y-4">
                <AnimatePresence mode="wait">
                  {filteredGigs.map((gig, i) => (
                    <GigCard key={gig.id} gig={gig} index={i}
                      onEdit={g => { setEditingGig(g); setGigModalOpen(true); }}
                      onDelete={g => setDeletingGig(g)}
                      onStatusUpdate={handleProposalStatusUpdate}
                      onRefresh={fetchGigs} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      
      <AnimatePresence>
        {editProfileOpen && profile && (
          <EditProfileModal profile={profile} onClose={() => setEditProfileOpen(false)} onSave={handleUpdateProfile} />
        )}
        {gigModalOpen && (
          <GigModal gig={editingGig} onClose={() => { setGigModalOpen(false); setEditingGig(null); }}
            onSave={editingGig ? handleUpdateGig : handleCreateGig} />
        )}
        {deletingGig && (
          <DeleteModal gig={deletingGig} onClose={() => setDeletingGig(null)} onConfirm={handleDeleteGig} />
        )}
      </AnimatePresence>
      <AnimatePresence>
      {editOpen && (
        <EditProfileModal
          profile={profile ?? {
            companyName: '',
            website: '',
            industry: '',
          }}
          onClose={() => {
            setHasSkippedProfile(true);
            setEditOpen(false);
          }}
          onSave={handleUpdateProfile}
        />
      )}
    </AnimatePresence>
    </main>
  );
}