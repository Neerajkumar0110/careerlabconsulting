"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Trophy,
  Zap,
  Crown,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Users,
  MessageSquare,
  Cpu,
} from 'lucide-react';
import Link from 'next/link';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { Cpu, Zap, Users, ShieldCheck, BarChart3, MessageSquare };

// ── Types ─────────────────────────────────────────────────────────────────────
interface Benefit  { title: string; desc: string; icon: string }
interface StatItem { label: string; val: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_BENEFITS = JSON.stringify([
  { title: 'Priority Engineering',    desc: 'Dedicated 100 hours/month. Aapki requests backlog mein nahi, seedhe execution queue mein jati hain.', icon: 'Cpu'   },
  { title: '1-Hour Critical Response',desc: 'Emergency situations ke liye hamara response time 1 ghante se bhi kam hai. 24/7/365 coverage.',         icon: 'Zap'   },
  { title: 'Dedicated Lead Architect',desc: 'Ek senior architect jo aapke long-term technical roadmap aur scaling strategy ko lead karega.',          icon: 'Users' },
]);
const DEFAULT_STATS = JSON.stringify([
  { label: 'Direct Slack Access', val: 'Enabled'   },
  { label: 'Security Audits',     val: 'Bi-Weekly' },
  { label: 'Dev Hours',           val: '100 hrs+'  },
  { label: 'Review Meetings',     val: 'Weekly'    },
]);

export default function GoldTierPage() {
  const { get } = usePageContent('services-gold');

  // ── Hero ────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',      'High-Performance Tier');
  const headlinePlain  = get('hero', 'headline_plain',  'Gold');
  const headlineAccent = get('hero', 'headline_accent', 'Velocity.');
  const bodyText       = get('hero', 'body_text',       'Uptime is revenue.');
  const btnLabel       = get('hero', 'btn_label',       'Secure Gold Access');
  const btnHref        = get('hero', 'btn_href',        '/contact');
  const accentFrom     = get('hero', 'accent_from',     '#fde68a');
  const accentMid      = get('hero', 'accent_mid',      '#eab308');
  const accentTo       = get('hero', 'accent_to',       '#d97706');
  const slaLabel       = get('hero', 'sla_label',       'SLA_Tier: Priority_1');
  const queueLabel     = get('hero', 'queue_label',     'TOP OF STACK');
  const uptimeVal      = get('hero', 'uptime_val',      '99.99%');
  const responseVal    = get('hero', 'response_val',    '< 60m');

  // ── Benchmark ───────────────────────────────────────────────────────────
  const benchLabel     = get('benchmark', 'section_label', 'Standard vs Gold Benchmark');
  const stats          = safeParse<StatItem[]>(get('benchmark', 'stats_json', DEFAULT_STATS), []);

  // ── Benefits ────────────────────────────────────────────────────────────
  const benefits       = safeParse<Benefit[]>(get('benefits', 'benefits_json', DEFAULT_BENEFITS), []);

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaLine1       = get('cta', 'headline_line1', 'Elite Support');
  const ctaLine2       = get('cta', 'headline_line2', 'For Industry Leaders.');
  const ctaQuote       = get('cta', 'quote_text',     '"Gold Tier isn\'t just a package; it\'s a technical partnership designed to win."');
  const ctaBtnLabel    = get('cta', 'btn_label',      'Apply for Gold Tier');
  const ctaBtnHref     = get('cta', 'btn_href',       '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-amber-600/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(245,158,11,0.12)_0%,_transparent_70%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <Crown size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {headlinePlain} <br />
              <span
                className="italic font-black"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{bodyText}</p>
            <Link
              href={btnHref}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl hover:scale-105 text-black"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid})`, boxShadow: `0 20px 40px ${accentMid}33` }}
            >
              {btnLabel} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentFrom}1a` }} />
            <div className="relative p-1 rounded-[3rem]" style={{ backgroundImage: `linear-gradient(to bottom right, ${accentFrom}66, transparent)` }}>
              <div className="bg-slate-950 p-10 rounded-[2.8rem] border border-white/5">
                <div className="flex justify-between items-center mb-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${accentMid}33` }}>
                    <Trophy size={16} style={{ color: accentMid }} />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest" style={{ color: accentMid }}>{slaLabel}</span>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Queue Placement</p>
                    <p className="text-xl font-black italic" style={{ color: accentFrom }}>{queueLabel}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[9px] text-slate-500 uppercase font-bold">Uptime SLA</p>
                      <p className="text-lg font-black italic">{uptimeVal}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                      <p className="text-[9px] text-slate-500 uppercase font-bold">Response</p>
                      <p className="text-lg font-black italic">{responseVal}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENCHMARK ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">{benchLabel}</h2>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => {
              const icons = [MessageSquare, ShieldCheck, BarChart3, Users];
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentMid }}>
                    <Icon size={22} />
                  </div>
                  <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, i) => {
            const Icon = ICON_MAP[benefit.icon] ?? Zap;
            return (
              <div key={i} className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all text-center md:text-left">
                <div
                  className="mb-6 w-fit p-4 rounded-2xl mx-auto md:mx-0 transition-all group-hover:text-black"
                  style={{ background: `${accentMid}1a`, color: accentFrom }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentMid; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentMid}1a`; }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{benefit.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">{benefit.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] text-center relative overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}33, transparent, #020617)`, border: `1px solid ${accentFrom}33` }}
        >
          <div className="relative z-10">
            <Crown className="mx-auto mb-8" size={60} style={{ color: accentMid }} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-[0.85]">
              {ctaLine1} <br />
              <span style={{ color: accentMid }}>{ctaLine2}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">{ctaQuote}</p>
            <Link
              href={ctaBtnHref}
              className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              {ctaBtnLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}