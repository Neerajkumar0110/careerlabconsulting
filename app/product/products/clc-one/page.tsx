'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import { Activity, Layers, Zap, Shield, Cpu, BarChart3, BarChart2, Megaphone, PieChart, Users } from 'lucide-react';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Inline icons ──────────────────────────────────────────────────────────────
const LayersIconSvg = ({ size = 24, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const ArrowRightIconSvg = ({ size = 13, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

// ── Icon registry for orbit nodes ─────────────────────────────────────────────
type LucideIcon = React.ElementType;
const ORBIT_ICON_MAP: Record<string, LucideIcon> = {
  Users, Activity, Megaphone, PieChart, BarChart3, BarChart2,
  Zap, Cpu, Shield, Layers,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface OrbitModule  { label: string; color: string; icon: string; deg: number; }
interface FeatureCard  { title: string; desc: string; icon: string; }
interface StatItem     { value: string; label: string; }
interface CheckPoint   { text: string; }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_INNER_MODULES_JSON = JSON.stringify([
  { label: 'Business',   color: '#3b82f6', icon: 'Users',    deg: 0   },
  { label: 'Growth',     color: '#8b5cf6', icon: 'Activity', deg: 60  },
  { label: 'Operations', color: '#06b6d4', icon: 'Megaphone',deg: 120 },
  { label: 'Finance',    color: '#f59e0b', icon: 'PieChart', deg: 180 },
  { label: 'Marketing',  color: '#10b981', icon: 'BarChart3',deg: 240 },
  { label: 'Sales',      color: '#ec4899', icon: 'BarChart2',deg: 300 },
]);

const DEFAULT_OUTER_MODULES_JSON = JSON.stringify([
  { label: 'Analytics',   color: '#f59e0b', icon: 'PieChart',  deg: 30  },
  { label: 'AI Core',     color: '#ec4899', icon: 'Cpu',       deg: 90  },
  { label: 'Security',    color: '#ef4444', icon: 'Shield',    deg: 150 },
  { label: 'Automation',  color: '#14b8a6', icon: 'Zap',       deg: 210 },
  { label: 'Insights',    color: '#a855f7', icon: 'Activity',  deg: 270 },
  { label: 'Integration', color: '#06b6d4', icon: 'Layers',    deg: 330 },
]);

const DEFAULT_FEATURES_JSON = JSON.stringify([
  { title: 'Unified Data',    desc: 'No more silos. Your data flows across all suites instantly.',                       icon: 'Layers' },
  { title: 'Quantum Speed',   desc: 'Powered by custom LLM architectures for sub-second responses.',                    icon: 'Zap'    },
  { title: 'Neural Security', desc: 'Self-healing security protocols that learn from threats.',                          icon: 'Shield' },
  { title: 'Auto-Scale',      desc: 'Intelligence that grows as your enterprise expands.',                               icon: 'Cpu'    },
]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { value: '4.2B+',    label: 'Workflow Executions'     },
  { value: '99.999%',  label: 'System Reliability'      },
  { value: '2ms',      label: 'Processing Latency'      },
  { value: '120+',     label: 'Enterprise Integrations' },
]);

const DEFAULT_CHECKPOINTS_JSON = JSON.stringify([
  { text: 'Single Sign-On (SSO)'   },
  { text: 'Global Support Hub'     },
  { text: 'Custom AI Training'     },
]);

// ── Page ──────────────────────────────────────────────────────────────────────
const CLCOnePage = () => {
  const [ref, visible] = useFadeIn();
  const [modalOpen, setModalOpen]   = useState(false);
  const [isMobile,  setIsMobile]    = useState(false);
  const [mounted,   setMounted]     = useState(false);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { get } = usePageContent('clc-one');

  // ── CMS values ─────────────────────────────────────────────────────────────
  // Hero
  const accentFrom        = get('hero', 'accent_from',          '#2563eb');
  const accentTo          = get('hero', 'accent_to',            '#06b6d4');
  const accentIndigo      = get('hero', 'accent_indigo',        '#6366f1');
  const badgeText         = get('hero', 'badge_text',           'All-In-One Intelligence');
  const headline1         = get('hero', 'headline_1',           'CLC');
  const headline2         = get('hero', 'headline_2',           'ONE');
  const heroBody          = get('hero', 'body_text',            'The ultimate unified platform. Integrating Business, Growth, and Operations into a single, seamless AI nervous system.');
  const heroBtn1Label     = get('hero', 'btn_1_label',          'Get Full Access');
  const heroBtn2Label     = get('hero', 'btn_2_label',          'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',      '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',     "Hello! I'm interested in CLC-ONE and would like to see long term vision.");

  // Orbital
  const innerModulesRaw   = get('orbital', 'inner_modules_json', DEFAULT_INNER_MODULES_JSON);
  const outerModulesRaw   = get('orbital', 'outer_modules_json', DEFAULT_OUTER_MODULES_JSON);
  const innerModules      = safeParse<OrbitModule[]>(innerModulesRaw, []);
  const outerModules      = safeParse<OrbitModule[]>(outerModulesRaw, []);

  // Dashboard image strip
  const dashImageUrl      = get('dashboard', 'image_url',         'https://images.pexels.com/photos/5900222/pexels-photo-5900222.jpeg?auto=compress&cs=tinysrgb&w=1600');
  const dashBadgeLabel    = get('dashboard', 'badge_label',       'System Efficiency');
  const dashBadgeValue    = get('dashboard', 'badge_value',       '99.98% Optimized');

  // Features
  const featuresRaw       = get('features', 'items_json',         DEFAULT_FEATURES_JSON);
  const featureItems      = safeParse<FeatureCard[]>(featuresRaw, []);

  // Stats
  const statsHeadline     = get('stats', 'headline',              'Proven Automation Performance');
  const statsSubhead      = get('stats', 'subheading',            'Built to scale mission-critical enterprise workflows.');
  const statsRaw          = get('stats', 'items_json',            DEFAULT_STATS_JSON);
  const statsItems        = safeParse<StatItem[]>(statsRaw, []);

  // Subscription section
  const subHeadline       = get('subscription', 'headline',       'One Subscription. \nTotal Control.');
  const subBody           = get('subscription', 'body_text',      "Why manage five different vendors when you can have one partner? CLC ONE replaces fragmented software stacks with a single source of truth.");
  const subWhatsappMsg    = get('subscription', 'whatsapp_message', "Hello! I'm interested in CLC ONE subscription and would like more info.");
  const subCheckpointsRaw = get('subscription', 'checkpoints_json', DEFAULT_CHECKPOINTS_JSON);
  const subCheckpoints    = safeParse<CheckPoint[]>(subCheckpointsRaw, []);
  const subImg1           = get('subscription', 'image_1_url',    'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600');
  const subImg2           = get('subscription', 'image_2_url',    'https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=600');

  // CTA
  const ctaHeadline       = get('cta', 'headline',                'UNIFY NOW');
  const ctaBody           = get('cta', 'body_text',               'Transform your organization with the power of CLC ONE.');
  const ctaBtnLabel       = get('cta', 'btn_label',               'REQUEST INVITE');

  // Orbit sizes
  const innerR  = isMobile ?  82 : 140;
  const outerR  = isMobile ? 135 : 220;
  const nodeW   = isMobile ?  56 :  84;
  const nodeH   = isMobile ?  48 :  72;
  const canvasS = isMobile ? 300 : 520;

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <style>{`
        @keyframes orbit-cw   { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes counter-cw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        .orbit-inner  { animation: orbit-cw   38s linear infinite; }
        .orbit-outer  { animation: orbit-cw   38s linear infinite; }
        .node-inner   { animation: counter-cw 38s linear infinite; pointer-events: none; }
        .node-outer   { animation: counter-cw 38s linear infinite; pointer-events: none; }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#02040a] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 60% 50% at 80% 50%, ${accentFrom}12 0%, transparent 70%)` }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${accentIndigo}26 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.3 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'all 0.7s ease' }}
            className="justify-center text-center md:text-left">

            <div className="inline-flex items-center text-center mx-auto gap-2 px-3 py-1.5 mb-5 rounded-lg"
              style={{ background: `linear-gradient(135deg, ${accentFrom}26, ${accentIndigo}26)`, border: `1px solid ${accentIndigo}4d` }}>
              <span className="text-[9px] font-black uppercase tracking-[0.3em]"
                style={{ background: `linear-gradient(90deg, ${accentFrom}cc, ${accentIndigo}cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {badgeText}
              </span>
            </div>

            <div className="my-7 mt-4 md:my-0 md:mb-10">
              <div className="pointer-events-none flex items-center justify-center md:justify-start flex-nowrap gap-4 text-center md:text-left md:my-5">
                <h1 className="leading-none mb-0 whitespace-nowrap"
                  style={{ fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.02em', fontFamily: '"Bebas Neue","Impact","Arial Narrow",sans-serif' }}>
                  {headline1}
                </h1>
                <h1 className="leading-none mb-0 whitespace-nowrap"
                  style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', letterSpacing: '0.02em', fontFamily: '"Bebas Neue","Impact","Arial Narrow",sans-serif', WebkitTextStroke: '2px rgba(255,255,255,0.2)', background: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  {headline2}
                </h1>
              </div>
            </div>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8 text-center md:text-left">
              {heroBody}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group w-full flex items-center justify-center gap-2 px-8 py-4 text-black font-black text-[10px] tracking-[0.2em] uppercase rounded-xl transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #fff, #e0e7ff)', boxShadow: '0 0 40px rgba(255,255,255,0.15)' }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label} <ArrowRightIconSvg size={13} />
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

          {/* RIGHT — Orbital */}
          <div
            className="flex items-center justify-center w-full px-4 md:px-0"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'scale(0.9)', transition: 'all 0.9s ease 0.3s', minWidth: isMobile ? 'auto' : '520px', minHeight: isMobile ? 'auto' : '520px' }}
          >
            <div className="relative pointer-events-none" style={{ width: canvasS, height: canvasS, maxWidth: '100%' }}>

              {/* Orbit ring borders */}
              <div className="absolute rounded-full border pointer-events-none"
                style={{ top: '50%', left: '50%', width: innerR * 2, height: innerR * 2, marginLeft: -innerR, marginTop: -innerR, borderColor: `${accentIndigo}2e` }} />
              <div className="absolute rounded-full border pointer-events-none"
                style={{ top: '50%', left: '50%', width: outerR * 2, height: outerR * 2, marginLeft: -outerR, marginTop: -outerR, borderColor: `${accentIndigo}1a` }} />

              {/* Center core */}
              <div className="absolute rounded-full flex items-center justify-center pointer-events-none"
                style={{ top: '50%', left: '50%', width: isMobile ? 64 : 100, height: isMobile ? 64 : 100, marginLeft: isMobile ? -32 : -50, marginTop: isMobile ? -32 : -50, background: `radial-gradient(circle, ${accentIndigo}73, ${accentFrom}40)`, border: `1px solid ${accentIndigo}99`, boxShadow: `0 0 60px ${accentIndigo}73`, zIndex: 10 }}>
                <LayersIconSvg size={isMobile ? 22 : 36} className="text-indigo-200" />
              </div>

              {/* Center glow */}
              <div className="absolute rounded-full animate-pulse pointer-events-none"
                style={{ top: '50%', left: '50%', width: isMobile ? 110 : 180, height: isMobile ? 110 : 180, marginLeft: isMobile ? -55 : -90, marginTop: isMobile ? -55 : -90, background: `radial-gradient(circle, ${accentIndigo}14 0%, transparent 70%)` }} />

              {/* Inner orbit */}
              <div className="orbit-inner absolute rounded-full pointer-events-none"
                style={{ top: '50%', left: '50%', width: innerR * 2, height: innerR * 2, marginLeft: -innerR, marginTop: -innerR }}>
                {innerModules.map((m, i) => {
                  const rad = (m.deg * Math.PI) / 180;
                  const nx = innerR + innerR * Math.cos(rad) - nodeW / 2;
                  const ny = innerR + innerR * Math.sin(rad) - nodeH / 2;
                  const Icon = ORBIT_ICON_MAP[m.icon] ?? Zap;
                  return (
                    <div key={i} className="absolute" style={{ left: nx, top: ny, width: nodeW, height: nodeH }}>
                      <div className="node-inner w-full h-full flex flex-col items-center justify-center rounded-lg text-center"
                        style={{ background: `${m.color}33`, border: `1px solid ${m.color}66`, backdropFilter: 'blur(10px)', boxShadow: `0 4px 18px ${m.color}33` }}>
                        <Icon size={isMobile ? 13 : 20} style={{ color: m.color }} />
                        <p className="font-bold uppercase tracking-wide leading-tight mt-0.5"
                          style={{ color: m.color, fontSize: isMobile ? '7px' : '10px', padding: isMobile ? '0 2px' : '0 4px' }}>{m.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Outer orbit */}
              <div className="orbit-outer absolute rounded-full pointer-events-none"
                style={{ top: '50%', left: '50%', width: outerR * 2, height: outerR * 2, marginLeft: -outerR, marginTop: -outerR }}>
                {outerModules.map((m, i) => {
                  const rad = (m.deg * Math.PI) / 180;
                  const nx = outerR + outerR * Math.cos(rad) - nodeW / 2;
                  const ny = outerR + outerR * Math.sin(rad) - nodeH / 2;
                  const Icon = ORBIT_ICON_MAP[m.icon] ?? Zap;
                  return (
                    <div key={i} className="absolute" style={{ left: nx, top: ny, width: nodeW, height: nodeH }}>
                      <div className="node-outer w-full h-full flex flex-col items-center justify-center rounded-lg text-center"
                        style={{ background: `${m.color}33`, border: `1px solid ${m.color}66`, backdropFilter: 'blur(10px)', boxShadow: `0 4px 18px ${m.color}33` }}>
                        <Icon size={isMobile ? 13 : 20} style={{ color: m.color }} />
                        <p className="font-bold uppercase tracking-wide leading-tight mt-0.5"
                          style={{ color: m.color, fontSize: isMobile ? '7px' : '10px', padding: isMobile ? '0 2px' : '0 4px' }}>{m.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD IMAGE STRIP ─────────────────────────────────────────── */}
      <section className="px-6 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative group p-[1px] rounded-[2.5rem]"
            style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }}>
            <div className="relative rounded-[2.4rem] overflow-hidden bg-[#03081a] border border-white/5">
              <img
                src={dashImageUrl}
                alt="CLC One Dashboard Preview"
                className="w-full h-auto opacity-60 group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl hidden md:block">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center animate-pulse"
                    style={{ background: accentFrom }}>
                    <BarChart3 className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">{dashBadgeLabel}</div>
                    <div className="text-xl font-bold">{dashBadgeValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureItems.map((item, i) => {
              const Icon = ORBIT_ICON_MAP[item.icon] ?? Layers;
              return (
                <div key={i}
                  className="p-8 rounded-3xl border border-white/5 hover:border-blue-500/40 transition-all hover:bg-white/[0.08] group"
                  style={{ background: `${accentFrom}08` }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all group-hover:text-white"
                    style={{ background: `${accentFrom}1a`, color: `${accentFrom}cc` }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = accentFrom; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${accentFrom}1a`; }}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <TrustedIntegration />

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">{statsHeadline}</h2>
          <p className="text-gray-400">{statsSubhead}</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {statsItems.map(({ value, label }) => (
            <div key={label} className="p-8 rounded-3xl border border-white/5"
              style={{ background: `${accentFrom}0d` }}>
              <p className="text-4xl font-black mb-2" style={{ color: accentFrom }}>{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SUBSCRIPTION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5"
        style={{ background: `linear-gradient(to bottom, transparent, ${accentFrom}0d)` }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic leading-tight whitespace-pre-line">
              {subHeadline}
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">{subBody}</p>
            <div className="space-y-4 mb-8">
              {subCheckpoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: `${accentFrom}33`, color: accentFrom }}>✓</div>
                  <span className="text-gray-300 font-medium">{point.text}</span>
                </div>
              ))}
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(subWhatsappMsg)}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex w-full md:w-auto items-center gap-3 border border-white/10 hover:bg-green-600 hover:text-white transition-colors duration-300 text-gray-200 font-semibold px-6 py-4 rounded-2xl shadow-md"
              style={{ background: `${accentFrom}1a` }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M20.52 3.478A11.937 11.937 0 0012 0C5.373 0 0 5.373 0 12c0 2.108.554 4.09 1.605 5.812L0 24l6.428-1.586A11.947 11.947 0 0012 24c6.627 0 12-5.373 12-12 0-3.193-1.26-6.214-3.48-8.522zm-8.513 17.313a9.928 9.928 0 01-5.032-1.464l-.359-.213-3.813.943.991-3.717-.233-.379a9.928 9.928 0 01-1.497-5.06c0-5.517 4.483-10 10-10s10 4.483 10 10-4.483 10-10 10zm5.78-7.18c-.079-.131-.285-.211-.593-.37-.307-.159-1.82-.896-2.103-.998-.283-.102-.49-.158-.697.16-.206.317-.797.998-.977 1.203-.18.206-.361.232-.667.079-.307-.154-1.295-.477-2.466-1.521-.912-.812-1.527-1.813-1.707-2.13-.18-.317-.02-.488.137-.646.142-.142.307-.369.461-.553.154-.184.206-.317.307-.529.102-.212.051-.397-.026-.555-.079-.159-.697-1.682-.956-2.31-.252-.607-.509-.525-.697-.534l-.593-.012c-.19 0-.5.071-.762.335s-1.003.979-1.003 2.387c0 1.407 1.028 2.763 1.172 2.956.143.193 2.028 3.09 4.917 4.333.688.297 1.224.474 1.64.606.688.218 1.316.188 1.813.114.553-.08 1.82-.743 2.076-1.462.256-.719.256-1.336.179-1.462z" />
              </svg>
              Contact on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="h-64 bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
              <img src={subImg1} className="w-full h-full object-cover opacity-50" alt="Meeting" />
            </div>
            <div className="h-64 bg-white/5 rounded-3xl border border-white/10 mt-12 overflow-hidden">
              <img src={subImg2} className="w-full h-full object-cover opacity-50" alt="Code" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto p-12 md:p-24 rounded-[4rem] border border-white/10 relative overflow-hidden group"
          style={{ background: `linear-gradient(to right, ${accentFrom}cc, ${accentIndigo}cc, ${accentFrom}cc)` }}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100 text-lg md:text-xl mb-12 opacity-80">{ctaBody}</p>
            <button
              className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
              style={{ background: '#fff', color: accentFrom }}
              onClick={() => setModalOpen(true)}
            >
              {ctaBtnLabel}
            </button>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="CLC One" productTagline="All in One SaaS" accentColor={accentIndigo} />
      <Footer />
    </main>
  );
};

export default CLCOnePage;