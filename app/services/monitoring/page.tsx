"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Activity,
  Eye,
  Bell,
  ShieldAlert,
  BarChart3,
  ArrowRight,
  MonitorCheck,
  Zap,
  Radio,
  Network,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const FEATURE_ICON_MAP: Record<string, React.ElementType> = { Network, Eye, Activity, Bell, ShieldAlert };
const STACK_ICON_MAP: Record<string, React.ElementType> = {
  'Log Analysis':  BarChart3,
  'Smart Alerts':  Bell,
  'Recovery':      Zap,
  'Vulnerability': ShieldAlert,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface MonitorFeature { title: string; desc: string; icon: string; img: string }
interface StackStat      { label: string; val: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'Infrastructure Observability', desc: 'Cloud, On-prem, aur Hybrid systems ki deep monitoring taaki bottlenecks ko impact se pehle resolve kiya ja sake.', icon: 'Network', img: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
  { title: 'Real-User Monitoring (RUM)',   desc: 'Analyze kijiye ki real users aapki app ke sath kaise interact kar rahe hain aur latency kahan hit ho rahi hai.',    icon: 'Eye',     img: 'https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' },
]);
const DEFAULT_STACK = JSON.stringify([
  { label: 'Log Analysis',  val: 'Real-time'  },
  { label: 'Smart Alerts',  val: 'AI-Powered' },
  { label: 'Recovery',      val: 'Auto-Scale' },
  { label: 'Vulnerability', val: 'Constant'   },
]);

export default function MonitoringPage() {
  const { get } = usePageContent('services-monitoring');

  // ── Hero ────────────────────────────────────────────────────────────────
  const badgeText      = get('hero', 'badge_text',      '24/7 Global Surveillance');
  const headlinePlain  = get('hero', 'headline_plain',  'Active');
  const headlineAccent = get('hero', 'headline_accent', 'Vigilance.');
  const bodyText       = get('hero', 'body_text',       'Hum sirf alerts nahi bhejte, hum stability ensure karte hain.');
  const btnLabel       = get('hero', 'btn_label',       'Start Monitoring Now');
  const btnHref        = get('hero', 'btn_href',        '/contact');
  const accentFrom     = get('hero', 'accent_from',     '#22d3ee');
  const accentTo       = get('hero', 'accent_to',       '#3b82f6');
  const accentBtn      = get('hero', 'accent_btn',      '#0891b2');
  const uptimeVal      = get('hero', 'uptime_val',      '99.999%');
  const alertsVal      = get('hero', 'alerts_val',      '12 Fixed');
  const criticalVal    = get('hero', 'critical_val',    '0');

  // ── Stack ───────────────────────────────────────────────────────────────
  const stackLabel     = get('stack', 'section_label', 'The Surveillance Stack');
  const stackStats     = safeParse<StackStat[]>(get('stack', 'stack_json', DEFAULT_STACK), []);

  // ── Features ────────────────────────────────────────────────────────────
  const features       = safeParse<MonitorFeature[]>(get('features', 'features_json', DEFAULT_FEATURES), []);
  const featureBadge   = get('features', 'feature_badge', 'Zero-Downtime Architecture');

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaLine1       = get('cta', 'headline_line1', 'Sleep Better.');
  const ctaLine2       = get('cta', 'headline_line2', "We're Watching.");
  const ctaBody        = get('cta', 'body_text',      "System failures don't wait for office hours.");
  const ctaBtnLabel    = get('cta', 'btn_label',      'Get Monitoring Quote');
  const ctaBtnHref     = get('cta', 'btn_href',       '/contact');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-600/30 font-sans">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(circle at 50% 30%, ${accentFrom}1a 0%, transparent 70%)` }} />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <Radio size={14} className="animate-pulse" style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {headlinePlain} <br />
              <span
                className="italic font-black"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {headlineAccent}
              </span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{bodyText}</p>
            <button
              onClick={() => window.location.href = btnHref}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl text-white hover:scale-105"
              style={{ background: accentBtn, boxShadow: `0 20px 40px ${accentBtn}33` }}
            >
              {btnLabel} <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentFrom}1a` }} />
            <div className="relative p-8 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                  <MonitorCheck size={20} style={{ color: accentFrom }} />
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Sys_Health: OK</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: accentFrom, animationDelay: `${i * 0.2}s` }} />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-500">Global Uptime</p>
                    <p className="text-2xl font-black italic">{uptimeVal}</p>
                  </div>
                  <Activity style={{ color: accentFrom }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Alerts (24h)</p>
                    <p className="text-xl font-black italic text-yellow-500">{alertsVal}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Critical</p>
                    <p className="text-xl font-black italic text-red-500">{criticalVal}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">{stackLabel}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stackStats.map((stat, i) => {
              const Icon = STACK_ICON_MAP[stat.label] ?? Zap;
              return (
                <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                  <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>
                    <Icon size={24} />
                  </div>
                  <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = FEATURE_ICON_MAP[feature.icon] ?? Network;
            return (
              <div
                key={i}
                className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <img src={feature.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" alt={feature.title} />
                <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                  <div
                    className="mb-6 p-4 rounded-2xl w-fit transition-all group-hover:text-white"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentBtn; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentFrom}1a`; }}
                  >
                    <Icon size={30} />
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>
                    <ShieldAlert size={14} /> {featureBadge}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6" style={{ background: `${accentFrom}08` }}>
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-slate-900 border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85]">
              {ctaLine1} <br />
              <span style={{ color: accentFrom }}>{ctaLine2}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">{ctaBody}</p>
            <button
              onClick={() => window.location.href = ctaBtnHref}
              className="text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
              style={{ background: accentBtn, boxShadow: `0 20px 40px ${accentBtn}4d` }}
            >
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}