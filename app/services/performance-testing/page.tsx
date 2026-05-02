"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Zap,
  Gauge,
  Activity,
  BarChart3,
  Flame,
  Timer,
  ArrowRight,
  ShieldAlert,
  HardDrive,
  Cpu,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface ServiceCard { title: string; desc: string; img: string }
interface StatItem    { label: string; val: string }

const DEFAULT_SERVICE_CARDS = JSON.stringify([
  {
    title: 'Load & Stress Testing',
    desc:  'Hum aapke system ko extreme traffic levels par push karte hain taaki breaking point aur recovery time ka pata chal sake.',
    img:   'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    title: 'Scalability Analysis',
    desc:  'Infrastructure ki capacity check karna taaki user growth ke sath system automatically scale ho sake.',
    img:   'https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]);

const DEFAULT_STATS = JSON.stringify([
  { label: 'Concurrency', val: '50k+' },
  { label: 'Stability',   val: '99.99%' },
  { label: 'Throughput',  val: '1M+' },
  { label: 'Latency Red.', val: '60%' },
]);

const DEFAULT_HERO_BARS = JSON.stringify([40, 60, 45, 90, 100, 80, 110, 130, 95, 150]);

const STAT_ICONS = [<Cpu key="cpu" />, <ShieldAlert key="sa" />, <HardDrive key="hd" />, <Timer key="t" />];

export default function PerformanceTesting() {
  const { get } = usePageContent('services-performance-testing');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom       = get('hero', 'accent_from',       '#f97316');
  const accentTo         = get('hero', 'accent_to',         '#ef4444');
  const badgeText        = get('hero', 'badge_text',        'High-Velocity Optimization');
  const heroPl           = get('hero', 'headline_plain',    'Peak');
  const heroAcc          = get('hero', 'headline_accent',   'Performance.');
  const heroBody         = get('hero', 'body_text',         "Don't let slow load times kill your conversion. Hum aapke application ko optimize karte hain 100ms response times aur infinite scaling ke liye.");
  const heroBtnLabel     = get('hero', 'btn_label',         'Analyze Latency');
  const heroImageUrl     = get('hero', 'hero_image_url',    '');
  const responseTime     = get('hero', 'response_time',     '142ms');
  const throughput       = get('hero', 'throughput',        '8.5k req/s');
  const heroBars         = safeParse<number[]>(get('hero', 'bars_json', DEFAULT_HERO_BARS), []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statsPl          = get('stats', 'section_label',   'Testing Methodology');
  const statsItems       = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // ── Services ──────────────────────────────────────────────────────────────
  const serviceCards     = safeParse<ServiceCard[]>(get('services', 'cards_json', DEFAULT_SERVICE_CARDS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline      = get('cta', 'headline',          'Latency Is The Enemy.');
  const ctaAccent        = get('cta', 'headline_accent',   'The Enemy.');
  const ctaBody          = get('cta', 'body_text',         'Har ek millisecond revenue par asar dalta hai. Hum optimize karenge aapka system har load level ke liye.');
  const ctaBtnLabel      = get('cta', 'btn_label',         'Get Performance Audit');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-orange-600/30 font-sans">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(circle at 70% 30%, ${accentFrom}1a 0%, transparent 60%)` }}
        />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-8 backdrop-blur-xl"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}
            >
              <Zap size={14} style={{ color: accentFrom }} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>
                {badgeText}
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              {heroPl} <br />
              <span
                className="italic font-black"
                style={{
                  backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {heroAcc}
              </span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">{heroBody}</p>
            <button
              onClick={() => (window.location.href = '/contact')}
              className="text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl"
              style={{ background: accentFrom }}
            >
              {heroBtnLabel} <ArrowRight size={16} />
            </button>
          </div>

          {/* Hero widget */}
          <div className="lg:w-1/2 relative group w-full">
            <div
              className="absolute -inset-4 blur-3xl rounded-full"
              style={{ background: `${accentFrom}1a` }}
            />
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
              <div className="flex justify-between items-center mb-10">
                <div className="flex gap-4">
                  <Activity style={{ color: accentFrom }} className="animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Real-time Load Monitoring</span>
                </div>
                <span
                  className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                  style={{ background: `${accentTo}1a`, border: `1px solid ${accentTo}33`, color: accentTo }}
                >
                  Stress Level: High
                </span>
              </div>
              <div className="h-40 flex items-end gap-1 mb-6">
                {heroBars.map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%`, backgroundImage: `linear-gradient(to top, ${accentFrom}, ${accentTo})` }}
                    className="flex-1 rounded-t-md opacity-80"
                  />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Response Time</p>
                  <p className="text-xl font-black italic">{responseTime}</p>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl">
                  <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Throughput</p>
                  <p className="text-xl font-black italic">{throughput}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">
            {statsPl}
          </h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsItems.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform" style={{ color: accentFrom }}>
                  {STAT_ICONS[i % STAT_ICONS.length]}
                </div>
                <h4 className="text-3xl font-black italic mb-1">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE CARDS ────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCards.map((service, i) => (
              <div
                key={i}
                className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 transition-all"
                style={{ ['--hover-border' as any]: `${accentFrom}4d` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <img
                  src={service.img}
                  className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000"
                  alt={service.title}
                />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div
                    className="mb-6 p-4 rounded-2xl w-fit transition-all"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = accentFrom;
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = `${accentFrom}1a`;
                      (e.currentTarget as HTMLElement).style.color = accentFrom;
                    }}
                  >
                    {i === 0 ? <Flame size={30} /> : <Gauge size={30} />}
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">{service.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{service.desc}</p>
                  <BarChart3 className="text-slate-700 opacity-20 absolute top-10 right-10" size={120} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] border relative overflow-hidden text-center"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${accentFrom}33, rgba(15,23,42,0.5), #020617)`,
            borderColor: `${accentFrom}33`,
          }}
        >
          <div className="relative z-10">
            <Timer className="mx-auto mb-8" size={48} style={{ color: accentFrom }} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              {ctaHeadline.replace(ctaAccent, '')}
              <br />
              <span style={{ color: accentFrom }}>{ctaAccent}</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto">{ctaBody}</p>
            <button
              onClick={() => (window.location.href = '/contact')}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
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