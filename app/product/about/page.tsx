'use client';

import React, { useRef } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import Link from 'next/link';
import {
  ArrowRight, Shield, Cpu, Globe2, Layers,
  Users, Lock, BrainCircuit,
  Sparkles, Activity,
  BookOpen, GraduationCap,
  UserCheck, Scale, BarChart2, HeadphonesIcon,
  Clock, Heart, Target, MessageSquare, Bot,
  Home,
  ChevronRight,
} from 'lucide-react';

/* ─────────────────────────────────────────
    DATA
───────────────────────────────────────── */
const MILESTONES = [
  { year: '2015', event: 'Founded in Gurugram with a vision for autonomous logic and enterprise-grade AI infrastructure.' },
  { year: '2018', event: 'Launched our first core AI infrastructure for enterprise HR — deployed across 40+ companies in Year 1.' },
  { year: '2022', event: 'Reached 1M+ concurrent users across our modular ecosystem, expanding into legal, finance, and support verticals.' },
  { year: '2026', event: 'Expanding to global autonomous infrastructure standards with deployments across 12 countries.' },
];

const VALUES = [
  {
    icon: <Heart size={18} />,
    title: 'Empathy in Logic',
    desc: 'We build AI that understands the human context behind every task — precision without losing the human touch.',
  },
  {
    icon: <Target size={18} />,
    title: 'Precision First',
    desc: 'Autonomy is nothing without 99.9% execution accuracy. Every system is engineered to perform, not just function.',
  },
  {
    icon: <Clock size={18} />,
    title: 'Timeless Scale',
    desc: 'Our systems are built to evolve as your enterprise grows — from 10 users to 10 million without re-architecting.',
  },
];

const STATS = [
  { value: '11y', label: 'Innovation' },
  { value: '500+', label: 'Enterprises' },
  { value: '1M+', label: 'Concurrent Users' },
  { value: '12+', label: 'Countries' },
];

const PRODUCTS = [
  { icon: <MessageSquare size={16} />, name: 'Manee', desc: 'AI Communication Officer', color: 'from-violet-500 to-purple-600' },
  { icon: <Activity size={16} />, name: 'CRM-X', desc: 'Autonomous Growth Engine', color: 'from-blue-500 to-cyan-500' },
  { icon: <BookOpen size={16} />, name: 'LMS-X', desc: 'Immersive AI Learning', color: 'from-emerald-500 to-teal-500' },
  { icon: <GraduationCap size={16} />, name: 'EduX', desc: 'AI Infrastructure for Institutions', color: 'from-amber-500 to-orange-500' },
  { icon: <Bot size={16} />, name: 'TwinX', desc: 'Executive AI Assistant', color: 'from-pink-500 to-rose-500' },
  { icon: <Scale size={16} />, name: 'LegalOS', desc: 'Autonomous Legal Intelligence', color: 'from-slate-400 to-slate-600' },
  { icon: <BarChart2 size={16} />, name: 'ErpX', desc: 'AI Finance Command Center', color: 'from-indigo-500 to-blue-600' },
  { icon: <UserCheck size={16} />, name: 'HrX', desc: 'AI Recruitment Engine', color: 'from-fuchsia-500 to-violet-500' },
  { icon: <HeadphonesIcon size={16} />, name: 'SuppX', desc: 'Autonomous Support Intelligence', color: 'from-cyan-500 to-sky-500' },
];

/* ─────────────────────────────────────────
    PRIMITIVES
───────────────────────────────────────── */

// Ambient glow blob
const Glow = ({ className }: { className?: string }) => (
  <div className={`pointer-events-none absolute rounded-full blur-[140px] ${className}`} />
);

// Dot grid texture
const DotGrid = () => (
  <div
    className="pointer-events-none absolute inset-0 opacity-[0.035]"
    style={{
      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
      backgroundSize: '36px 36px',
    }}
  />
);

// Section eyebrow label
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/25 bg-indigo-500/10 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.22em] text-indigo-300">
    {children}
  </span>
);

// Thin horizontal divider
const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
);

// Breadcrumb Component
const Breadcrumb = () => (
  <nav className="relative z-20 flex items-center justify-center pt-30 sm:pt-32 px-4 pointer-events-auto">
    <ol className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md">
      <li className="flex items-center">
        <Link href="/product/" className="text-slate-400 hover:text-indigo-400 transition-colors">
          <Home size={14} />
        </Link>
      </li>
      <li className="flex items-center text-slate-700">
        <ChevronRight size={12} />
      </li>
      <li className="flex items-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white-400/80 cursor-default">
          About
        </span>
      </li>
    </ol>
  </nav>
);

/* ─────────────────────────────────────────
    PAGE
───────────────────────────────────────── */
const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[#060c1a] text-slate-100 overflow-x-hidden font-sans antialiased selection:bg-indigo-500/25">

      {/* Fixed ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <Glow className="w-[700px] h-[500px] bg-indigo-900/40 -top-40 left-1/2 -translate-x-1/2" />
        <Glow className="w-[400px] h-[400px] bg-blue-900/20 top-[60vh] -right-32" />
      </div>

      <Navbar />

      {/* Breadcrumb Section */}
      <Breadcrumb />

    {/* ── 1. HERO ── */}
    <section className="relative z-10 pt-8 pb-20 sm:pb-28 px-4 items-center text-center border-b border-white/[0.05] overflow-hidden">
      <DotGrid />

      <div className="max-w-6xl mx-auto flex flex-col items-center"> {/* Added flex/items-center for children */}
        <Eyebrow><Sparkles className="w-3 h-3" /> About the Company</Eyebrow>

        <h1 className="mt-7 text-[clamp(2.5rem,8vw,5rem)] font-black tracking-tight leading-[1.0] text-white">
          We exist to{' '}
          <span className="text-transparent bg-clip-text italic bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
            automate
          </span>
          <br className="hidden sm:block" />
          {' '}human potential.
        </h1>

        <p className="mt-7 max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed font-light mx-auto">
          Founded in 2015, we transitioned from a small R&D lab to the backbone of autonomous enterprise operations. We don't just build tools — we build the future of how work happens.
        </p>

        {/* Hero stats - Properly Centered */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center min-w-[120px]">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                {s.value}
              </span>
              <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* ── 2. OUR STORY + TIMELINE ── */}
      <section className="relative z-10 py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header centered on mobile, gap maintained */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 text-center sm:text-left">
            <Eyebrow><Users className="w-3 h-3" /> Our Story</Eyebrow>
            <div className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent w-full hidden sm:block" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: narrative - Centered on mobile, Left on Desktop */}
            <div className="flex flex-col justify-center text-center lg:text-left items-center lg:items-start">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                A decade of rethinking{' '}
                <span className="text-indigo-400">enterprise infrastructure.</span>
              </h2>
              <p className="mt-5 text-slate-400 text-sm sm:text-base leading-relaxed">
                The traditional SaaS model is broken. It relies on humans to click buttons, monitor dashboards, and fill in the gaps left by fragmented software. We believed there was a better way — where the software handles the mundane and humans focus purely on strategy.
              </p>
              <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
                What started as an experiment in autonomous HR logic became a full-stack AI operating system — spanning communication, legal, finance, learning, and beyond.
              </p>

              {/* Visual stat block */}
              <div className="mt-10 grid grid-cols-2 gap-4 w-full">
                {STATS.map((s, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#0b1122] border border-white/[0.07] flex flex-col items-center lg:items-start"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-indigo-400 tracking-tight">{s.value}</span>
                    <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[22px] top-6 bottom-6 w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent hidden sm:block" />

              <div className="space-y-4">
                {MILESTONES.map((m, i) => (
                  <div
                    key={i}
                    className="relative flex gap-5 p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-[#0b1122] hover:border-indigo-500/25 hover:bg-[#0d1430] transition-all duration-300 group"
                  >
                    {/* Timeline dot */}
                    <div className="hidden sm:flex shrink-0 w-[45px] items-start justify-center">
                      <div className="w-3 h-3 mt-1.5 rounded-full bg-indigo-500 border-2 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.6)] group-hover:shadow-[0_0_18px_rgba(99,102,241,0.8)] transition-all" />
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <span className="inline-block text-[12px] font-black uppercase tracking-[0.2em] text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full mb-3">
                        {m.year}
                      </span>
                      <p className="text-sm text-slate-300 leading-relaxed">{m.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Divider />

      {/* ── 3. VALUES ── */}
      <section className="relative z-10 py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">
            <Eyebrow><BrainCircuit className="w-3 h-3" /> Our Values</Eyebrow>
            <h2 className="mt-5 text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
              The{" "}
              <span className="text-transparent bg-clip-text italic bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                principles {" "}
              </span>
               behind {" "}
               <span className="text-transparent bg-clip-text italic bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
                every line of code
              </span>
                .
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Great products are built on convictions. Here are the three beliefs that shape how we engineer, ship, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={i}
                className="group relative p-7 rounded-2xl border border-white/[0.07] bg-[#0b1122] hover:border-indigo-500/30 hover:bg-[#0d1430] transition-all duration-300 overflow-hidden"
              >
                {/* Corner glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-5 group-hover:bg-indigo-500/20 transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-black tracking-tight text-white mb-3">{v.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 4. THE ECOSYSTEM ── */}
      <section className="relative z-10 py-20 sm:py-28 px-4">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center flex-col md:flex-row md:items-center gap-4 mb-5">
            <Eyebrow><Layers className="w-3 h-3" /> The Ecosystem</Eyebrow>
            <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
          </div>

          {/* Heading + sub split */}
          <div className="flex flex-col lg:flex-row text-center md:text-left lg:items-end justify-between gap-6 mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white max-w-lg leading-tight">
              One infrastructure.{' '}
              <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                Infinite possibilities.
              </span>
            </h2>
            <p className="text-slate-400 text-sm md:max-w-xs px-5 md:px-0 leading-relaxed lg:text-right">
              Our products function as a unified digital nervous system — each module purpose-built but deeply interconnected.
            </p>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRODUCTS.map((p, i) => (
            <div key={i} className="group p-5 relative flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-slate-900/20 hover:bg-slate-900/40 transition-all duration-300 cursor-pointer">
              
              {/* THE NEW GRADIENT BORDER ICON BOX */}
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${p.color} p-[1px]`}>
                <div className="w-full h-full rounded-xl bg-[#080c17] flex items-center justify-center transition-colors duration-300">
                  <div className="text-white opacity-60 group-hover:opacity-100 transition-opacity">
                    {p.icon}
                  </div>
                </div>
              </div>
                <div className="min-w-0">
                  <p className="text-md font-bold text-slate-100 tracking-tight">{p.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5 truncate">{p.desc}</p>
                </div>
                <ArrowRight size={14} className="shrink-0 ml-auto text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── 5. CTA ── */}
      <section className="relative z-10 py-24 sm:py-32 px-4 overflow-hidden">
        <DotGrid />
        <Glow className="w-[500px] h-[300px] bg-indigo-800/25 top-0 left-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Eyebrow><Sparkles className="w-3 h-3" /> What's Next</Eyebrow>

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-white leading-[1.05]">
            Ready to evolve<br />
            <span className="text-transparent italic bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">
              your enterprise?
            </span>
          </h2>

          <p className="mt-5 text-slate-400 text-sm sm:text-base md:text-[18px] max-w-md mx-auto leading-relaxed">
            We're always looking for partners and enterprises ready to bridge the gap between human effort and autonomous results.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <button className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm md:text-xl italic tracking-wide transition-all duration-200 shadow-lg shadow-indigo-900/50 hover:-translate-y-0.5 overflow-hidden">
              <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="relative z-10">Partner with us</span>
              <ArrowRight size={15} className="relative z-10 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button className="inline-flex items-center justify-center gap-2.5 px-7 py-4 border border-white/10 hover:border-white/20 hover:bg-white/[0.04] text-slate-300 rounded-xl  font-bold text-sm md:text-md tracking-wide transition-all duration-200">
              View open roles
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;