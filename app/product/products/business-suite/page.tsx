'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import MethodologySection from '@/components/product/MethodologySection';
import FaqSection from '@/components/product/FaqSection';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Inline icons ──────────────────────────────────────────────────────────────
const LayersIconSvg = ({ size = 11, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const ZapIconSvg = ({ size = 10, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CheckIconSvg = ({ size = 10, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const ArrowRightIconSvg = ({ size = 13, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const LaptopIconSvg = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M2 20h20" />
  </svg>
);

// ── Animated counter hook ─────────────────────────────────────────────────────
function useCounter(target: number, duration = 1400, start = false): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setValue(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return value;
}

// ── Fade-in hook ──────────────────────────────────────────────────────────────
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

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURE_GRID_JSON = JSON.stringify([
  { title: 'Seamless Integration', desc: 'Plug into existing stacks'  },
  { title: 'Autonomous Growth',    desc: 'No human bottlenecks'       },
  { title: 'Real-time Insights',   desc: 'Live intelligence feeds'    },
  { title: 'Enterprise Security',  desc: 'SOC2 compliant'             },
]);

const DEFAULT_METRICS_JSON = JSON.stringify([
  { label: 'Automation Rate', color: '#6366f1', icon: 'Zap',    counterTarget: 340, suffix: '%' },
  { label: 'Accuracy',        color: '#3b82f6', icon: 'Check',  counterTarget: 98,  suffix: '%' },
  { label: 'Workflows Active', color: '#8b5cf6', icon: 'Layers', counterTarget: 12,  suffix: 'k' },
]);

const DEFAULT_DEPT_KPIS_JSON = JSON.stringify([
  { dept: 'Sales', value: '+34%', color: '#3b82f6' },
  { dept: 'Ops',   value: '+67%', color: '#6366f1' },
  { dept: 'HR',    value: '+21%', color: '#8b5cf6' },
]);

const DEFAULT_ACTIVITY_FEED_JSON = JSON.stringify([
  { msg: 'Agent deployed to Sales CRM',    time: '2s ago',  color: '#6366f1' },
  { msg: 'Workflow optimized: 18% faster', time: '1m ago',  color: '#3b82f6' },
  { msg: 'Report generated: 340 pages',    time: '3m ago',  color: '#8b5cf6' },
]);

const DEFAULT_HERO_STATS_JSON = JSON.stringify([
  { value: '94%',  label: 'Automation Rate'     },
  { value: '40%+', label: 'Cost Reduction'       },
  { value: '1.2k', label: 'Active Deployments'   },
  { value: 'A+',   label: 'Security Rating'      },
]);

const DEFAULT_VALUE_BULLETS_JSON = JSON.stringify([
  'Predictive Analytics',
  'Neural Training Integration',
  '24/7 Monitoring',
]);

// ── Metric icon resolver ──────────────────────────────────────────────────────
type MetricIconProps = { size?: number; style?: React.CSSProperties };
const METRIC_ICON_MAP: Record<string, React.ComponentType<MetricIconProps>> = {
  Zap:    ZapIconSvg,
  Check:  CheckIconSvg,
  Layers: LayersIconSvg,
};

const BusinessSuitePage = () => {
  const [ref, visible] = useFadeIn();
  const [countStart, setCountStart] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('business-suite');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentPrimary     = get('hero', 'accent_primary',     '#6366f1');
  const accentSecondary   = get('hero', 'accent_secondary',   '#3b82f6');
  const accentTertiary    = get('hero', 'accent_tertiary',    '#8b5cf6');
  const badgeText         = get('hero', 'badge_text',         'Enterprise Intelligence Suite');
  const headline1         = get('hero', 'headline_1',         'ELEVATE');
  const headline2         = get('hero', 'headline_2',         'ENTERPRISE');
  const headline3         = get('hero', 'headline_3',         'INTELLIGENCE');
  const heroBody          = get('hero', 'body_text',          'Architecting the next generation of digital workforces. Our Business Suite integrates seamlessly with your existing workflow to drive autonomous growth at scale.');
  const heroBtn1Label     = get('hero', 'btn_1_label',        'Deploy Now');
  const heroBtn2Label     = get('hero', 'btn_2_label',        'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',   "Hello! I'm interested in Business Suite and would like to see a demo.");

  const featureGridRaw    = get('hero', 'feature_grid_json',  DEFAULT_FEATURE_GRID_JSON);
  const featureGrid       = safeParse<{ title: string; desc: string }[]>(featureGridRaw, []);

  const dashboardTitle    = get('dashboard', 'title',         'Intelligence Dashboard');
  const dashboardSubtitle = get('dashboard', 'subtitle',      'Enterprise Suite · Q1 2026');
  const dashboardBadge    = get('dashboard', 'badge_label',   'All Systems Go');

  const metricsRaw        = get('dashboard', 'metrics_json',  DEFAULT_METRICS_JSON);
  const metrics           = safeParse<{ label: string; color: string; icon: string; counterTarget: number; suffix: string }[]>(metricsRaw, []);

  const deptKpisRaw       = get('dashboard', 'dept_kpis_json', DEFAULT_DEPT_KPIS_JSON);
  const deptKpis          = safeParse<{ dept: string; value: string; color: string }[]>(deptKpisRaw, []);

  const activityFeedRaw   = get('dashboard', 'activity_feed_json', DEFAULT_ACTIVITY_FEED_JSON);
  const activityFeed      = safeParse<{ msg: string; time: string; color: string }[]>(activityFeedRaw, []);

  const heroStatsRaw      = get('stats', 'items_json',        DEFAULT_HERO_STATS_JSON);
  const heroStats         = safeParse<{ value: string; label: string }[]>(heroStatsRaw, []);

  const valueImageUrl     = get('value', 'image_url',         'https://images.pexels.com/photos/7567529/pexels-photo-7567529.jpeg?auto=compress&cs=tinysrgb&w=800');
  const valueHeadline     = get('value', 'headline',          'Real-time Data Visualization');
  const valueBody         = get('value', 'body_text',         'Understand your business metrics like never before. Our suite provides deep-dive analytics powered by Gemini models to predict market trends.');
  const valueBulletsRaw   = get('value', 'bullets_json',      DEFAULT_VALUE_BULLETS_JSON);
  const valueBullets      = safeParse<string[]>(valueBulletsRaw, []);

  const ctaHeadline       = get('cta', 'headline',            'Ready to scale?');
  const ctaBody           = get('cta', 'body_text',           'Join 500+ companies transforming their operations with Career Lab Consulting.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'Connect Now');
  const ctaPhone          = get('cta', 'phone',               '+91 870023 6923');

  // Counter targets from metrics JSON (3 counters max)
  const c1Target = metrics[0]?.counterTarget ?? 340;
  const c2Target = metrics[1]?.counterTarget ?? 98;
  const c3Target = metrics[2]?.counterTarget ?? 12;
  const c1 = useCounter(c1Target, 1400, countStart);
  const c2 = useCounter(c2Target, 1200, countStart);
  const c3 = useCounter(c3Target, 1000, countStart);
  const counterValues = [c1, c2, c3];

  useEffect(() => {
    if (visible) setTimeout(() => setCountStart(true), 400);
  }, [visible]);

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#050912] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(-45deg, ${accentPrimary}ff 0px, ${accentPrimary}ff 1px, transparent 1px, transparent 12px)`, opacity: 0.03 }} />
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentPrimary} 0%, transparent 65%)`, filter: 'blur(100px)', opacity: 0.1 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'all 0.6s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border mb-5"
              style={{ borderColor: `${accentPrimary}50`, background: `${accentPrimary}1a` }}>
              <LayersIconSvg size={11} style={{ color: accentPrimary }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentPrimary }}>{badgeText}</span>
            </div>

            <h1 className="text-white font-black leading-none mb-2"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', letterSpacing: '-0.04em' }}>
              {headline1}<br />
              <span style={{ color: accentPrimary }}>{headline2}</span>
            </h1>
            <h2 className="font-black leading-none mb-6"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', letterSpacing: '-0.04em', WebkitTextStroke: `1.5px ${accentPrimary}66`, color: 'transparent' }}>
              {headline3}
            </h2>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            {/* Feature grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {featureGrid.map(({ title, desc }) => (
                <div key={title} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <p className="text-white text-xs font-black mb-0.5">{title}</p>
                  <p className="text-slate-600 text-[9px]">{desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="w-full group flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentPrimary, boxShadow: `0 20px 40px ${accentPrimary}40` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
                <ArrowRightIconSvg size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                {heroBtn2Label}
              </a>
            </div>
          </div>

          {/* RIGHT — Dashboard */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
            <div className="relative bg-[#080f1f] border border-white/[0.08] rounded-3xl p-5 md:p-7 overflow-hidden"
              style={{ boxShadow: `0 0 80px ${accentPrimary}1a, inset 0 1px 0 rgba(255,255,255,0.05)` }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white text-sm font-black">{dashboardTitle}</p>
                  <p className="text-slate-600 text-[9px]">{dashboardSubtitle}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/25">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 text-[8px] font-black uppercase tracking-wider">{dashboardBadge}</span>
                </div>
              </div>

              {/* Animated metric bars */}
              <div className="space-y-4 mb-5">
                {metrics.map((m, i) => {
                  const Icon = METRIC_ICON_MAP[m.icon] ?? ZapIconSvg;
                  const val = counterValues[i] ?? 0;
                  const barWidth = (val / m.counterTarget) * 100;
                  return (
                    <div key={m.label}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center"
                            style={{ background: m.color + '20', border: `1px solid ${m.color}40` }}>
                            <Icon size={10} style={{ color: m.color }} />
                          </div>
                          <span className="text-slate-400 text-[10px] font-bold">{m.label}</span>
                        </div>
                        <span className="text-white text-xs font-black">{val}{m.suffix}</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${barWidth}%`, background: `linear-gradient(90deg, ${m.color}, ${m.color}aa)` }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dept KPI cards */}
              <div className="grid gap-2 mb-4" style={{ gridTemplateColumns: `repeat(${deptKpis.length}, 1fr)` }}>
                {deptKpis.map(({ dept, value, color }) => (
                  <div key={dept} className="p-3 rounded-xl text-center"
                    style={{ background: color + '10', border: `1px solid ${color}25` }}>
                    <p className="text-white text-sm font-black">{value}</p>
                    <p className="text-[8px] uppercase tracking-widest" style={{ color }}>{dept}</p>
                  </div>
                ))}
              </div>

              {/* Activity feed */}
              <div className="space-y-2 pt-4 border-t border-white/5">
                {activityFeed.map(({ msg, time, color }) => (
                  <div key={msg} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
                    <p className="text-slate-500 text-[9px] flex-1 truncate">{msg}</p>
                    <p className="text-slate-700 text-[8px] shrink-0">{time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {heroStats.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: accentSecondary }}>{value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <TrustedIntegration />
      <MethodologySection />

      {/* ── VALUE SECTION ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 rounded-3xl overflow-hidden shadow-2xl">
            <img src={valueImageUrl} alt="Analysis" className="w-full h-[400px] object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{valueHeadline}</h2>
            <p className="text-gray-400 text-lg mb-6">{valueBody}</p>
            <ul className="space-y-4">
              {valueBullets.map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
                    style={{ background: `${accentSecondary}30`, color: accentSecondary }}>✓</span>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FaqSection />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 rounded-full scale-150 blur-3xl" style={{ background: `${accentSecondary}0d` }} />
        <div className="max-w-3xl mx-auto relative z-10 bg-white/5 border border-white/10 p-12 rounded-[2rem] backdrop-blur-xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{ctaHeadline}</h2>
          <p className="text-gray-400 mb-10 text-lg">{ctaBody}</p>
          <div className="flex flex-col items-center gap-4">
            <button
              className="px-10 py-5 bg-white text-black hover:bg-gray-200 rounded-2xl font-bold transition-all transform hover:scale-105"
              onClick={() => setModalOpen(true)}>
              {ctaBtnLabel}
            </button>
            <div className="flex items-center gap-3 font-mono text-sm" style={{ color: accentPrimary }}>
              <LaptopIconSvg size={16} />
              <span>{ctaPhone}</span>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Business Suite (Flagship)" productTagline="Sales + Marketing + Content" accentColor={accentPrimary} />
      <Footer />
    </main>
  );
};

export default BusinessSuitePage;