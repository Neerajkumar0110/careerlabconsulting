'use client';

import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import MethodologySection from '@/components/product/MethodologySection';
import FaqSection from '@/components/product/FaqSection';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon prop types ───────────────────────────────────────────────────────────
interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// ── Inline icons ──────────────────────────────────────────────────────────────
const GradCapIcon: FC<IconProps> = ({ size = 11, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);
const ArrowRightIcon: FC<IconProps> = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const UsersIcon: FC<IconProps> = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const BookOpenIcon: FC<IconProps> = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
  </svg>
);
const TrendingUpIcon: FC<IconProps> = ({ size = 14, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
  </svg>
);
const CheckIcon: FC<IconProps> = ({ size = 10, style = {} }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────
interface Module {
  label: string;
  pct: number;
  color: string;
}

interface ActivityItem {
  msg: string;
  time: string;
  color: string;
}

interface KpiItem {
  value: string;
  label: string;
  Icon: FC<IconProps>;
  color: string;
}

interface ModuleCard {
  title: string;
  desc: string;
  icon: string;
}

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1400, start = false): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Fade-in on scroll hook ────────────────────────────────────────────────────
function useFadeIn(): [React.RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES_JSON = JSON.stringify([
  'AI-curated curriculum pathways per student',
  'Real-time cohort performance analytics',
  'Zero-touch administrative automation',
]);

const DEFAULT_MODULES_JSON = JSON.stringify([
  { label: 'Curriculum AI',     pct: 88, color: '#6366f1' },
  { label: 'Student Analytics', pct: 94, color: '#3b82f6' },
  { label: 'Admin Automation',  pct: 76, color: '#8b5cf6' },
  { label: 'Outcomes Tracking', pct: 91, color: '#06b6d4' },
]);

const DEFAULT_ACTIVITY_JSON = JSON.stringify([
  { msg: 'Priya S. completed \'Advanced ML\'',      time: 'just now', color: '#6366f1' },
  { msg: 'Cohort B avg. score up +12pts',            time: '2m ago',   color: '#3b82f6' },
  { msg: 'Admin: 240 enrollment tasks processed',    time: '5m ago',   color: '#8b5cf6' },
  { msg: 'New curriculum pathway generated',         time: '9m ago',   color: '#06b6d4' },
]);

const DEFAULT_ENTERPRISE_MODULES_JSON = JSON.stringify([
  { title: 'Smart Curriculum AI', desc: 'Automated lesson planning and resource mapping.', icon: '📚' },
  { title: 'Student Predictive Analytics', desc: 'Identify students at risk and track performance trends.', icon: '📊' },
  { title: 'Admin Automation', desc: 'Reduce manual workload by 60% with AI workflow engines.', icon: '⚙️' },
]);

const EducationEnterprisePage = () => {
  const [ref, visible] = useFadeIn();
  const [countStart, setCountStart] = useState<boolean>(false);
  const [barStart, setBarStart] = useState<boolean>(false);
  const [bars, setBars] = useState<number[]>([0, 0, 0, 0]);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('education-enterprise');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor       = get('hero', 'accent_color',        '#6366f1');
  const badgeText         = get('hero', 'badge_text',          'Institutional Learning');
  const headline1         = get('hero', 'headline_1',          'REVOLU');
  const headline1b        = get('hero', 'headline_1b',         'TIONIZING');
  const headline2         = get('hero', 'headline_2',          'INSTITUTIONAL');
  const headline3         = get('hero', 'headline_3',          'LEARNING');
  const heroBody          = get('hero', 'body_text',           'Transform your educational infrastructure with AI-driven curriculum management, student analytics, and automated administrative workflows.');
  const heroBtnLabel      = get('hero', 'btn_label',           'Partner With Us');
  
  const featuresRaw       = get('hero', 'features_json',       DEFAULT_FEATURES_JSON);
  const features          = safeParse<string[]>(featuresRaw, []);

  const kpi1Value         = parseInt(get('dashboard', 'kpi_1_value', '12400'));
  const kpi1Label         = get('dashboard', 'kpi_1_label',    'Enrolled Students');
  const kpi2Value         = parseInt(get('dashboard', 'kpi_2_value', '98'));
  const kpi2Label         = get('dashboard', 'kpi_2_label',    'Completion Rate');
  const kpi3Value         = parseInt(get('dashboard', 'kpi_3_value', '340'));
  const kpi3Label         = get('dashboard', 'kpi_3_label',    'Courses Active');
  
  const modulesRaw        = get('dashboard', 'modules_json',   DEFAULT_MODULES_JSON);
  const modules           = safeParse<Module[]>(modulesRaw, []);
  
  const activityRaw       = get('dashboard', 'activity_json',  DEFAULT_ACTIVITY_JSON);
  const activity          = safeParse<ActivityItem[]>(activityRaw, []);
  
  const statusLabel       = get('dashboard', 'status_label',   'All Systems Operational');
  const uptimeText        = get('dashboard', 'uptime_text',    '99.97% uptime');

  const modulesHeadline   = get('modules', 'headline',         'Enterprise-Grade Modules');
  const modulesItemsRaw   = get('modules', 'items_json',       DEFAULT_ENTERPRISE_MODULES_JSON);
  const moduleCards       = safeParse<ModuleCard[]>(modulesItemsRaw, []);

  const ctaHeadline       = get('final_cta', 'headline',       'Ready to modernize your institution?');
  const ctaBody           = get('final_cta', 'body_text',      'Join the leading universities and schools that trust Career Lab Consulting for their digital transformation.');
  const ctaBtnLabel       = get('final_cta', 'btn_label',      'Book Today');

  const c1 = useCounter(kpi1Value, 1400, countStart);
  const c2 = useCounter(kpi2Value, 1200, countStart);
  const c3 = useCounter(kpi3Value, 1600, countStart);

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => { setCountStart(true); setBarStart(true); }, 400);
  }, [visible]);

  useEffect(() => {
    if (!barStart) return;
    modules.forEach((m, i) => {
      let v = 0;
      const iv = setInterval(() => {
        v = Math.min(v + 1, m.pct);
        setBars((b) => { const n = [...b]; n[i] = v; return n; });
        if (v >= m.pct) clearInterval(iv);
      }, 10 + i * 5);
    });
  }, [barStart, modules]);

  const kpis: KpiItem[] = [
    { value: c1.toLocaleString(), label: kpi1Label, Icon: UsersIcon,     color: '#6366f1' },
    { value: `${c2}%`,            label: kpi2Label, Icon: BookOpenIcon,  color: '#3b82f6' },
    { value: `${c3}`,             label: kpi3Label, Icon: TrendingUpIcon, color: '#8b5cf6' },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white">
      <Navbar />

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#04060f] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 70% 60% at 20% 50%, ${accentColor}0f 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, filter: "blur(100px)", opacity: 0.08 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${accentColor}1f 1px, transparent 1px)`, backgroundSize: "44px 44px", opacity: 0.25 }} />

        {/* Content grid */}
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — Typography */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentColor}50`, background: `${accentColor}1a` }}>
              <GradCapIcon size={11} style={{ color: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-tight md:leading-none mb-5"
              style={{ fontSize: "clamp(2rem, 4.5vw, 5.5rem)", letterSpacing: "-0.04em" }}>
              <span className="text-white">{headline1}</span>
              <span style={{ color: accentColor }}>{headline1b}</span>
              <br />
              <span style={{ WebkitTextStroke: `1.5px ${accentColor}73`, color: "transparent" }}>{headline2}</span>
              <br />
              <span className="text-white">{headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">
              {heroBody}
            </p>

            <div className="space-y-2.5 mb-8">
              {features.map((f) => (
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
              <button className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}40` }}
                onClick={() => setModalOpen(true)}>
                {heroBtnLabel}
                <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT — Dashboard graphic */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(36px)", transition: "all 0.8s ease 0.25s" }}>
            <div className="relative bg-[#070b19] border rounded-3xl p-5 md:p-7 overflow-hidden"
              style={{ borderColor: 'rgba(255,255,255,0.07)', boxShadow: `0 0 70px ${accentColor}1a` }}>

              {/* KPI row */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {kpis.map(({ value, label, Icon, color }) => (
                  <div key={label} className="p-3 rounded-2xl text-center"
                    style={{ background: color + "0d", border: `1px solid ${color}25` }}>
                    <div className="flex justify-center mb-1">
                      <Icon size={14} style={{ color }} />
                    </div>
                    <p className="text-white font-black text-base leading-none">{value}</p>
                    <p className="text-[8px] text-slate-600 uppercase tracking-wider mt-0.5">{label}</p>
                  </div>
                ))}
              </div>

              {/* Module performance bars */}
              <div className="mb-5">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">Module Performance</p>
                <div className="space-y-3">
                  {modules.map((m, i) => (
                    <div key={m.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-slate-400 font-bold">{m.label}</span>
                        <span className="text-[10px] text-white font-black">{bars[i]}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-75"
                          style={{ width: `${bars[i]}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}99)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity feed */}
              <div className="border-t border-white/[0.05] pt-4 mb-4">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">Live Student Activity</p>
                <div className="space-y-2">
                  {activity.map(({ msg, time, color }) => (
                    <div key={msg} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                      <p className="text-slate-500 text-[9px] flex-1 truncate">{msg}</p>
                      <p className="text-slate-700 text-[8px] shrink-0">{time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status footer */}
              <div className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}33` }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-green-400 text-[9px] font-black uppercase tracking-wider">{statusLabel}</p>
                </div>
                <p className="text-slate-600 text-[8px]">{uptimeText}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">{modulesHeadline}</h2>
            <div className="h-1.5 w-24 rounded-full mx-auto lg:mx-0" style={{ background: accentColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moduleCards.map((module, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                onMouseEnter={(e) => e.currentTarget.style.borderColor = `${accentColor}80`}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                <div className="text-4xl mb-6">{module.icon}</div>
                <h3 className="text-2xl font-bold mb-4 transition-colors"
                  style={{ color: '#fff' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}>{module.title}</h3>
                <p className="text-gray-400 leading-relaxed">{module.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ background: `${accentColor}05` }}>
        <MethodologySection />
      </div>
      <TrustedIntegration/>

      <FeatureGrid />

      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] p-8 md:p-16 border text-center"
          style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
          <h2 className="text-3xl md:text-5xl font-bold mb-8">{ctaHeadline}</h2>
          <p className="text-gray-400 text-lg mb-10">
            {ctaBody}
          </p>
          <button className="px-8 py-4 rounded-xl font-bold transition-all"
            style={{ background: '#fff', color: '#000' }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#e5e5e5'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
            onClick={() => setModalOpen(true)}>
            {ctaBtnLabel}
          </button>
        </div>
      </section>

      <FaqSection />
      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Education Enterprise" productTagline="Education + People + Finance" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default EducationEnterprisePage;