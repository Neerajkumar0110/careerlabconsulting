'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import SuccessStories from '@/components/product/SuccessStories';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon prop types ───────────────────────────────────────────────────────────
interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// ── Inline icons ──────────────────────────────────────────────────────────────
const TrendingUpIcon: FC<IconProps> = ({ size = 11, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const ArrowRightIcon: FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const ZapIcon: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TargetIcon: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const UsersIcon: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const MailIcon: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckIcon: FC<IconProps> = ({ size = 9, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Data types ────────────────────────────────────────────────────────────────
interface FunnelStage   { label: string; value: string; pct: number; color: string; }
interface ChannelItem   { label: string; icon: string; rate: number; color: string; }
interface FeatureItem   { title: string; desc: string; number: string; }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES_JSON = JSON.stringify([
  { title: 'Predictive Lead Scoring',  desc: 'Identify high-value prospects before they even visit your site.',                   number: '01' },
  { title: 'Automated Outreach',       desc: 'Hyper-personalized email and LinkedIn sequences that feel human.',                   number: '02' },
  { title: 'Growth Dashboard',         desc: 'Real-time tracking of every dollar spent and every lead earned.',                    number: '03' },
]);

const DEFAULT_CHIPS_JSON = JSON.stringify([
  'Autonomous outbound at infinite scale',
  'Predictive lead scoring & qualification',
  'Multi-channel campaign orchestration',
]);

const DEFAULT_FUNNEL_JSON = JSON.stringify([
  { label: 'Reach',     value: '240K', pct: 100, color: '#10b981' },
  { label: 'Engaged',   value: '96K',  pct: 75,  color: '#34d399' },
  { label: 'Qualified', value: '28K',  pct: 50,  color: '#6ee7b7' },
  { label: 'Converted', value: '9.4K', pct: 30,  color: '#a7f3d0' },
]);

const DEFAULT_CHANNELS_JSON = JSON.stringify([
  { label: 'Email',    icon: 'Mail',        rate: 42, color: '#10b981' },
  { label: 'Social',   icon: 'Users',       rate: 67, color: '#3b82f6' },
  { label: 'Outbound', icon: 'Zap',         rate: 38, color: '#8b5cf6' },
  { label: 'SEO',      icon: 'TrendingUp',  rate: 81, color: '#f59e0b' },
]);

const DEFAULT_SPARKLINE_JSON = JSON.stringify([18, 32, 25, 48, 40, 62, 55, 75, 68, 88, 80, 100]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { label: 'Efficiency Boost',  value: '+300%' },
  { label: 'Conversion Rate',   value: '9.4%'  },
  { label: 'ROI Increase',      value: '340%'  },
  { label: 'Deals Closed',      value: '9.4K'  },
]);

const CHANNEL_ICON_MAP: Record<string, FC<IconProps>> = {
  Mail: MailIcon,
  Users: UsersIcon,
  Zap: ZapIcon,
  TrendingUp: TrendingUpIcon,
};

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1400, start = false): number {
  const [value, setValue] = useState<number>(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (t0 === null) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Fade-in on scroll hook ────────────────────────────────────────────────────
function useFadeIn(): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<boolean>(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Page Component ────────────────────────────────────────────────────────────
const GrowthSuitePage = () => {
  const [ref, visible] = useFadeIn();
  const [countStart, setCountStart] = useState<boolean>(false);
  const [channelBars, setChannelBars] = useState<number[]>([0, 0, 0, 0]);
  const [bonusRevenue, setBonusRevenue] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('growth-suite');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor       = get('hero', 'accent_color',       '#10b981');
  const accentSecondary   = get('hero', 'accent_secondary',   '#059669');
  const badgeText         = get('hero', 'badge_text',         'Scale Your Revenue Faster');
  const headline1         = get('hero', 'headline_1',         'GROWTH');
  const headline2         = get('hero', 'headline_2',         'SUITE');
  const heroBody          = get('hero', 'body_text',          'Advanced AI-driven marketing and sales automation tools designed to hyper-scale your business outreach and conversion rates.');
  const heroBtn1Label     = get('hero', 'btn_1_label',        'Start Free Trial');
  const heroBtn2Label     = get('hero', 'btn_2_label',        'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',   "Hello! I'm interested in Growth Suite and would like to see a demo.");
  const heroImageUrl      = get('hero', 'hero_image_url',     'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=1600');
  const chipsRaw          = get('hero', 'chips_json',         DEFAULT_CHIPS_JSON);
  const chips             = safeParse<string[]>(chipsRaw, []);

  const dashboardTitle    = get('dashboard', 'title',           'Growth Engine');
  const dashboardSubtitle = get('dashboard', 'subtitle',        'AI-Powered · Real-time');
  const liveLabel         = get('dashboard', 'live_label',      'Scaling Now');
  const roiLabel          = get('dashboard', 'roi_label',       '↑ 340% YoY');
  const floatingBadge     = get('dashboard', 'floating_badge',  '↑ 340% ROI');
  const revenueTarget     = parseInt(get('dashboard', 'revenue_target', '4800000'), 10);
  const sparklineRaw      = get('dashboard', 'sparkline_json',  DEFAULT_SPARKLINE_JSON);
  const sparkline         = safeParse<number[]>(sparklineRaw, [18, 32, 25, 48, 40, 62, 55, 75, 68, 88, 80, 100]);
  const funnelRaw         = get('dashboard', 'funnel_json',     DEFAULT_FUNNEL_JSON);
  const funnelStages      = safeParse<FunnelStage[]>(funnelRaw, []);
  const channelsRaw       = get('dashboard', 'channels_json',   DEFAULT_CHANNELS_JSON);
  const channels          = safeParse<ChannelItem[]>(channelsRaw, []);

  const featuresHeadline  = get('features', 'headline',         'AI-Powered Lead Generation');
  const featuresQuote     = get('features', 'quote',            '"Traditional sales are dead. Autonomous growth is the future."');
  const featuresRaw       = get('features', 'items_json',       DEFAULT_FEATURES_JSON);
  const featureItems      = safeParse<FeatureItem[]>(featuresRaw, []);

  const statsRaw          = get('stats', 'items_json',          DEFAULT_STATS_JSON);
  const statsItems        = safeParse<{ label: string; value: string }[]>(statsRaw, []);

  const ctaHeadline       = get('cta', 'headline',              'Stop guessing. \nStart growing.');
  const ctaBtnLabel       = get('cta', 'btn_label',             'GET THE SUITE');

  const rev = useCounter(revenueTarget, 1800, countStart);

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      setCountStart(true);
      channels.forEach((ch, i) => {
        let v = 0;
        const iv = setInterval(() => {
          v = Math.min(v + 1, ch.rate);
          setChannelBars((b) => { const n = [...b]; n[i] = v; return n; });
          if (v >= ch.rate) clearInterval(iv);
        }, 12 + i * 4);
      });
    }, 350);
    const ticker = setInterval(
      () => setBonusRevenue((r) => r + Math.floor(Math.random() * 8000 + 2000)),
      1200
    );
    return () => clearInterval(ticker);
  }, [visible, channels.length]);

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#030a06] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 55% at 15% 50%, ${accentColor}0d 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentSecondary} 0%, transparent 70%)`, filter: 'blur(120px)', opacity: 0.06 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${accentColor}06 1px, transparent 1px), linear-gradient(90deg, ${accentColor}06 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentColor}4d`, background: `${accentColor}1a` }}>
              <TrendingUpIcon size={11} style={{ color: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(3.2rem, 9vw, 5.5rem)', letterSpacing: '-0.05em' }}>
              <span className="text-white">{headline1}</span>
              <br />
              <span style={{ WebkitTextStroke: `2px ${accentColor}66`, color: 'transparent' }}>{headline2}</span>
            </h1>

            {/* Live revenue ticker */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-xl"
              style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}33` }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} />
              <p className="font-black text-sm font-mono" style={{ color: accentColor }}>
                +${(rev + bonusRevenue).toLocaleString()} generated today
              </p>
            </div>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            <div className="space-y-2.5 mb-8">
              {chips.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}66` }}>
                    <CheckIcon size={9} style={{ color: accentColor }} />
                  </div>
                  <p className="text-slate-300 text-sm">{f}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentSecondary})`, boxShadow: `0 0 30px ${accentColor}4d` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
                <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                {heroBtn2Label}
              </a>
            </div>
          </div>

          {/* RIGHT — Growth Dashboard */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s', position: 'relative' }}>
            <div className="relative border border-white/[0.07] rounded-3xl overflow-hidden p-5 md:p-6"
              style={{ background: '#050d08', boxShadow: `0 0 60px ${accentColor}14` }}>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white text-sm font-black">{dashboardTitle}</p>
                  <p className="text-slate-600 text-[9px]">{dashboardSubtitle}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
                  style={{ background: `${accentColor}1a`, borderColor: `${accentColor}40` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentColor }}>{liveLabel}</span>
                </div>
              </div>

              {/* Revenue sparkline */}
              <div className="mb-4">
                <div className="flex items-end justify-between mb-1.5">
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest">Revenue Trajectory</p>
                  <p className="text-[10px] font-black" style={{ color: accentColor }}>{roiLabel}</p>
                </div>
                <div className="flex items-end gap-1 h-12 p-2 rounded-xl"
                  style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}1a` }}>
                  {sparkline.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                      style={{ height: `${h}%`, background: `${accentColor}${Math.round((0.15 + (i / sparkline.length) * 0.65) * 255).toString(16).padStart(2, '0')}` }} />
                  ))}
                </div>
              </div>

              {/* Conversion funnel */}
              <div className="mb-4">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">Conversion Funnel</p>
                <div className="space-y-1.5">
                  {funnelStages.map((f) => (
                    <div key={f.label} className="flex items-center gap-3">
                      <p className="text-[9px] text-slate-500 w-16 shrink-0">{f.label}</p>
                      <div className="flex-1 h-4 rounded-md bg-white/[0.04] overflow-hidden">
                        <div className="h-full rounded-md flex items-center px-2 transition-all duration-1000"
                          style={{ width: `${f.pct}%`, background: f.color + '30', border: `1px solid ${f.color}40` }}>
                          <span className="text-[8px] font-black" style={{ color: f.color }}>{f.value}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Channel performance */}
              <div className="border-t border-white/[0.05] pt-4">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">Channel Performance</p>
                <div className="grid grid-cols-2 gap-2">
                  {channels.map((ch, i) => {
                    const Icon = CHANNEL_ICON_MAP[ch.icon] ?? ZapIcon;
                    return (
                      <div key={ch.label} className="p-2.5 rounded-xl"
                        style={{ background: ch.color + '0a', border: `1px solid ${ch.color}20` }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <Icon size={11} style={{ color: ch.color }} />
                            <span className="text-[9px] text-slate-400 font-bold">{ch.label}</span>
                          </div>
                          <span className="text-[10px] font-black" style={{ color: ch.color }}>{channelBars[i] ?? 0}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-75"
                            style={{ width: `${channelBars[i] ?? 0}%`, background: `linear-gradient(90deg, ${ch.color}, ${ch.color}88)` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 rounded-xl px-3 py-1.5 backdrop-blur-sm hidden sm:block"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}4d` }}>
              <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{floatingBadge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IMAGE SECTION ────────────────────────────────────────────────── */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img src={heroImageUrl} alt="Growth Analytics" className="w-full h-auto" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5"
        style={{ background: `${accentColor}08` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsItems.map((stat, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-xs md:text-sm font-medium uppercase tracking-widest" style={{ color: `${accentColor}cc` }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="bg-white/[0.01] py-20">
        <FeatureGrid />
      </div>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">{featuresHeadline}</h2>
            <p className="text-gray-400 text-lg mb-8 italic">{featuresQuote}</p>
            <div className="space-y-6">
              {featureItems.map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center font-bold"
                    style={{ background: `${accentColor}33`, color: accentColor }}>
                    {item.number}
                  </div>
                  <div>
                    <h4 className="font-semibold text-xl mb-1">{item.title}</h4>
                    <p className="text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-2xl mt-8" alt="Team" />
            <img src="https://images.pexels.com/photos/5900226/pexels-photo-5900226.jpeg?auto=compress&cs=tinysrgb&w=600" className="rounded-2xl" alt="Growth Graph" />
          </div>
        </div>
      </section>

      <ExecutionFlow />

      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6"
        style={{ background: `linear-gradient(to right, ${accentColor}1a, ${accentSecondary}14)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 italic text-white/90 whitespace-pre-line">
            {ctaHeadline}
          </h2>
          <button
            className="px-12 py-5 rounded-full font-black text-xl transition-all shadow-xl hover:scale-105"
            style={{ background: '#fff', color: '#0f172a' }}
            onClick={() => setModalOpen(true)}
          >
            {ctaBtnLabel}
          </button>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Growth Suite" productTagline="Business + Finance + Support" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default GrowthSuitePage;