"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  ShieldCheck,
  Zap,
  Clock,
  Package,
  ArrowRight,
  Coffee,
  LineChart,
  LifeBuoy,
} from 'lucide-react';
import Link from 'next/link';

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = { ShieldCheck, Zap, Clock, Package };

// ── Types ─────────────────────────────────────────────────────────────────────
interface Essential { title: string; desc: string; icon: string }
interface TierItem  { label: string; active: boolean }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_ESSENTIALS = JSON.stringify([
  { title: 'Critical Security Patches', desc: 'Hum ensure karte hain ki aapke core libraries aur OS hamesha vulnerabilities se safe rahein.', icon: 'ShieldCheck' },
  { title: '99.5% Uptime Monitoring',   desc: 'Standard monitoring setup jo aapko downtime ke baare mein turant alert karta hai.',               icon: 'Zap'         },
  { title: 'Next Business Day Support', desc: 'Email support with a guaranteed 24-hour response time for all your queries.',                      icon: 'Clock'       },
]);
const DEFAULT_TIERS = JSON.stringify([
  { label: 'Bronze', active: true  },
  { label: 'Silver', active: false },
  { label: 'Gold',   active: false },
]);

export default function BronzeTierPage() {
  const { get } = usePageContent('services-bronze');

  // ── Hero ────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',      'The Lean Support Model');
  const headlinePlain  = get('hero', 'headline_plain',  'Bronze');
  const headlineAccent = get('hero', 'headline_accent', 'Essentials.');
  const bodyText       = get('hero', 'body_text',       'Low volume but high importance?');
  const btnLabel       = get('hero', 'btn_label',       'Get Essential Coverage');
  const btnHref        = get('hero', 'btn_href',        '/contact');
  const accentFrom     = get('hero', 'accent_from',     '#fdba74');
  const accentMid      = get('hero', 'accent_mid',      '#f97316');
  const accentTo       = get('hero', 'accent_to',       '#b45309');
  const accentBtn      = get('hero', 'accent_btn',      '#c2410c');
  const devHoursLabel  = get('hero', 'dev_hours_label', 'Dev Hours');
  const devHoursVal    = get('hero', 'dev_hours_val',   '10 hrs/mo');

  // ── Essentials ──────────────────────────────────────────────────────────
  const essentials     = safeParse<Essential[]>(get('essentials', 'essentials_json', DEFAULT_ESSENTIALS), []);

  // ── Scaling ─────────────────────────────────────────────────────────────
  const scalingHeadline = get('scaling', 'headline',    'Scaling is Inevitable.');
  const tiers           = safeParse<TierItem[]>(get('scaling', 'tiers_json', DEFAULT_TIERS), []);

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaLine1       = get('cta', 'headline_line1', "Don't Leave It");
  const ctaLine2       = get('cta', 'headline_line2', 'To Chance.');
  const ctaQuote       = get('cta', 'quote_text',     '"Choti team ka matlab ye nahi ki support chota ho."');
  const ctaBtnLabel    = get('cta', 'btn_label',      'Claim Bronze Access');
  const ctaBtnHref     = get('cta', 'btn_href',       '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-orange-900/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(251,146,60,0.05)_0%,_transparent_70%)] -z-10" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <Package size={14} style={{ color: accentFrom }} />
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
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl text-white hover:scale-105"
              style={{ background: accentBtn, boxShadow: `0 20px 40px ${accentBtn}33` }}
            >
              {btnLabel} <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentFrom}0d` }} />
            <div className="relative p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] backdrop-blur-3xl">
              <div className="space-y-6">
                <div className="flex items-center gap-4" style={{ color: accentFrom }}>
                  <Coffee size={24} />
                  <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Starter_Module_Active</span>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{devHoursLabel}</span>
                    <span className="text-lg font-black italic">{devHoursVal}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full w-1/4 rounded-full" style={{ background: accentBtn }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ESSENTIALS ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {essentials.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? ShieldCheck;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/30 border border-white/5 hover:border-orange-500/30 transition-all">
                  <div
                    className="mb-6 w-fit p-4 rounded-2xl transition-all"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                  >
                    <Icon size={24} />
                  </div>
                  <h4 className="text-xl font-black uppercase italic mb-3 tracking-tighter">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SCALING ───────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <LineChart className="mx-auto mb-8" size={48} style={{ color: `${accentMid}80` }} />
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-12">
            {scalingHeadline.replace('Inevitable.', '')}
            <span style={{ color: accentMid }}>Inevitable.</span>
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            {tiers.map((tier, i) => (
              <React.Fragment key={i}>
                <div
                  className="px-8 py-4 rounded-full text-[10px] font-black tracking-widest uppercase"
                  style={tier.active
                    ? { background: `${accentBtn}33`, border: `1px solid ${accentBtn}4d`, color: accentFrom }
                    : { background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', color: '#64748b' }
                  }
                >
                  {tier.label}
                </div>
                {i < tiers.length - 1 && <ArrowRight className="hidden md:block text-slate-700" size={16} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: `${accentBtn}0d` }}>
        <div className="max-w-4xl mx-auto text-center">
          <LifeBuoy className="mx-auto mb-8" size={48} style={{ color: accentBtn }} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            {ctaLine1} <br />
            <span style={{ color: accentBtn }}>{ctaLine2}</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">{ctaQuote}</p>
          <Link
            href={ctaBtnHref}
            className="inline-block text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
            style={{ background: accentBtn, boxShadow: `0 20px 40px ${accentBtn}66` }}
          >
            {ctaBtnLabel}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}