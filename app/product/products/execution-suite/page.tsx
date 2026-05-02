'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import SuccessStories from '@/components/product/SuccessStories';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import Link from 'next/link';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Icon prop types ───────────────────────────────────────────────────────────
interface IconProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// ── Inline icons ──────────────────────────────────────────────────────────────
const ZapIcon: FC<IconProps> = ({ size = 11, className = "", style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ArrowRightIcon: FC<IconProps> = ({ size = 13, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const CheckCircleIcon: FC<IconProps> = ({ size = 10, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ActivityIcon: FC<IconProps> = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const TargetIcon: FC<IconProps> = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
  </svg>
);

const ServerIcon: FC<IconProps> = ({ size = 14, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" /><rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" /><line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

// ── Data types ────────────────────────────────────────────────────────────────
interface LogEntry {
  text: string;
  color: string;
}

interface StatItem {
  label: string;
  color: string;
  value: string;
}

interface ChipItem {
  Icon: FC<IconProps>;
  value: string;
  label: string;
  color: string;
}

interface FeatureCard {
  title: string;
  desc: string;
  img: string;
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

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Static data ───────────────────────────────────────────────────────────────
const LOG_POOL: LogEntry[] = [
  { text: "task:deploy       → region:us-east-1   [OK]",    color: "#22d3ee" },
  { text: "qa:audit          → suite:full          [PASS]",  color: "#34d399" },
  { text: "delivery:cycle    → v4.2.1              [DONE]",  color: "#60a5fa" },
  { text: "agent:spawn       → id:ax-7741          [LIVE]",  color: "#a78bfa" },
  { text: "task:validate     → schema:strict       [OK]",    color: "#22d3ee" },
  { text: "pipeline:trigger  → upstream:3 deps     [GO]",    color: "#34d399" },
  { text: "exec:benchmark    → 99.9% accuracy      [✓]",    color: "#fbbf24" },
  { text: "deploy:rollback   → skipped — nominal   [OK]",   color: "#60a5fa" },
  { text: "monitor:latency   → p99: 2.1ms          [OK]",    color: "#34d399" },
  { text: "task:queue        → 14,302 items → 0    [DONE]",  color: "#a78bfa" },
];

const SPARKLINE: number[] = [30, 45, 38, 60, 52, 71, 65, 82, 74, 90, 85, 95];

const ICON_MAP: Record<string, FC<IconProps>> = {
  Activity: ActivityIcon,
  Target: TargetIcon,
  Server: ServerIcon,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CHIPS_JSON = JSON.stringify([
  { icon: 'Activity', value: '99.9%', label: 'Accuracy', color: '#06b6d4' },
  { icon: 'Target',   value: '<3ms',  label: 'Latency',  color: '#3b82f6' },
  { icon: 'Server',   value: '∞',     label: 'Scale',    color: '#8b5cf6' },
]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { label: 'Deploy',  color: '#06b6d4', value: 'OK'    },
  { label: 'QA',      color: '#34d399', value: 'PASS'  },
  { label: 'Latency', color: '#fbbf24', value: '2.1ms' },
  { label: 'Uptime',  color: '#a78bfa', value: '99.9%' },
]);

const DEFAULT_FEATURES_JSON = JSON.stringify([
  { title: 'Rapid Prototyping', desc: 'Go from concept to MVP in days, not months, using our generative execution blocks.', img: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { title: 'Quality Guardrails', desc: 'Real-time AI monitoring ensures every output meets enterprise-grade standards.', img: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { title: 'Adaptive Scaling', desc: 'Automatically adjust resources based on project complexity and deadline pressure.', img: 'https://images.pexels.com/photos/7413915/pexels-photo-7413915.jpeg?auto=compress&cs=tinysrgb&w=400' },
]);

// ── Component ──────────────────────
const ExecutionSuitePage = () => {
  const [ref, visible] = useFadeIn();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0);
  const logRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('execution-suite');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor       = get('hero', 'accent_color',        '#06b6d4');
  const badgeText         = get('hero', 'badge_text',          'High-Performance Delivery');
  const headline1         = get('hero', 'headline_1',          'EXECUTION');
  const headline2         = get('hero', 'headline_2',          'WITHOUT');
  const headline3         = get('hero', 'headline_3',          'LIMITS');
  const heroBody          = get('hero', 'body_text',           'Turn vision into reality with our autonomous execution engine. Automate task deployment, quality assurance, and delivery cycles with 99.9% accuracy.');
  const heroBtn1Label     = get('hero', 'btn_1_label',         'Deploy Suite');
  const heroBtn2Label     = get('hero', 'btn_2_label',         'View Case Studies');
  
  const chipsRaw          = get('hero', 'chips_json',          DEFAULT_CHIPS_JSON);
  const chips             = safeParse<{ icon: string; value: string; label: string; color: string }[]>(chipsRaw, []);

  const terminalTitle     = get('terminal', 'title',           'exec://engine/autonomous · cluster-prod');
  const terminalLiveLabel = get('terminal', 'live_label',      'LIVE');
  const throughputLabel   = get('terminal', 'throughput_label', 'Throughput');
  const statsRaw          = get('terminal', 'stats_json',      DEFAULT_STATS_JSON);
  const stats             = safeParse<StatItem[]>(statsRaw, []);
  const floatingBadge     = get('terminal', 'floating_badge',  '⚡ Zero Downtime');

  const imageUrl          = get('image', 'image_url',          'https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=1600');
  const imageAlt          = get('image', 'alt_text',           'High Speed Execution');

  const featuresRaw       = get('features', 'items_json',      DEFAULT_FEATURES_JSON);
  const featureCards      = safeParse<FeatureCard[]>(featuresRaw, []);

  const ctaHeadline       = get('cta', 'headline',             'EXECUTION WITHOUT LIMITS');
  const ctaBody           = get('cta', 'body_text',            'Turn vision into reality with our autonomous execution engine.');
  const ctaBtnLabel       = get('cta', 'btn_label',            'Deploy Suite');

  useEffect(() => {
    if (!visible) return;
    let i = 0;
    const iv = setInterval(() => {
      setLogs((l) => [...l.slice(-10), LOG_POOL[i % LOG_POOL.length]]);
      setTaskCount((c) => c + Math.floor(Math.random() * 80 + 40));
      i++;
    }, 950);
    return () => clearInterval(iv);
  }, [visible]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section
        ref={ref as RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#030a10] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 50% 60% at 10% 50%, ${accentColor}0d 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 65%)`, filter: "blur(120px)", opacity: 0.06 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${accentColor}08 1px, transparent 1px), linear-gradient(90deg, ${accentColor}08 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />

        {/* Content grid */}
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Typography */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(30px)", transition: "all 0.7s ease" }}>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentColor}50`, background: `${accentColor}1a` }}>
              <ZapIcon size={11} style={{ color: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1
              className="font-black leading-none mb-5"
              style={{ fontSize: "clamp(2.6rem, 7vw, 5.5rem)", letterSpacing: "-0.05em" }}
            >
              <span className="text-white">{headline1}</span>{" "}
              <span style={{ WebkitTextStroke: `2px ${accentColor}80`, color: "transparent" }}>
                {headline2}
              </span>
              <br />
              <span style={{ color: accentColor }}>{headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">
              {heroBody}
            </p>

            {/* Stat chips */}
            <div className="grid grid-cols-3 gap-3 mb-8">
              {chips.map(({ icon, value, label, color }) => {
                const Icon = ICON_MAP[icon] ?? ActivityIcon;
                return (
                  <div key={label} className="p-3 rounded-xl text-center"
                    style={{ background: color + "0d", border: `1px solid ${color}25` }}>
                    <Icon size={14} style={{ color, margin: "0 auto 4px" }} />
                    <p className="text-white font-black text-sm">{value}</p>
                    <p className="text-[8px] uppercase tracking-wider" style={{ color }}>{label}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}40` }}
                onClick={() => setModalOpen(true)}>
                {heroBtn1Label}
                <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <Link href={'/case-study'} className='w-full'>
                <button className="flex items-center w-full justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all border border-white/10">
                  {heroBtn2Label}
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT — Live execution terminal */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(36px)", transition: "all 0.8s ease 0.25s" }}>
            <div className="relative bg-[#040d14] border rounded-3xl overflow-hidden"
              style={{ borderColor: `${accentColor}26`, boxShadow: `0 0 60px ${accentColor}14` }}>

              {/* Chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b bg-white/[0.02]"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="flex gap-1.5">
                  {["#ff5f57", "#ffbd2e", "#28c840"].map((c) => (
                    <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-1 mx-3 h-5 rounded bg-white/[0.04] flex items-center px-3">
                  <span className="text-[9px] text-slate-600 font-mono">{terminalTitle}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
                  <span className="text-[8px] font-black uppercase" style={{ color: accentColor }}>{terminalLiveLabel}</span>
                </div>
              </div>

              {/* Sparkline throughput */}
              <div className="px-5 pt-4 pb-2">
                <div className="flex items-end justify-between mb-1">
                  <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{throughputLabel}</p>
                  <p className="text-[10px] font-black" style={{ color: accentColor }}>{taskCount.toLocaleString()} tasks processed</p>
                </div>
                <div className="flex items-end gap-0.5 h-10">
                  {SPARKLINE.map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all duration-300"
                      style={{ height: `${h}%`, background: `${accentColor}${Math.floor(0.2 + (i / SPARKLINE.length) * 0.6 * 255).toString(16).padStart(2, '0')}` }} />
                  ))}
                </div>
              </div>

              {/* Log stream */}
              <div ref={logRef} className="px-4 pb-2 h-52 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
                <div className="font-mono space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className="flex items-center gap-2 text-[9px] transition-all duration-300"
                      style={{ opacity: 0.4 + (i / logs.length) * 0.6 }}>
                      <CheckCircleIcon size={10} style={{ color: log.color, flexShrink: 0 }} />
                      <span style={{ color: log.color }}>{log.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status bar */}
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  {stats.map(({ label, color, value }) => (
                    <div key={label} className="flex-1 p-2 rounded-lg text-center"
                      style={{ background: color + "0d", border: `1px solid ${color}25` }}>
                      <p className="text-[7px] text-slate-600 uppercase tracking-widest">{label}</p>
                      <p className="text-[10px] font-black" style={{ color }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 rounded-xl px-3 py-1.5 backdrop-blur-sm hidden sm:block"
              style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}50` }}>
              <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: accentColor }}>{floatingBadge}</p>
            </div>
          </div>

        </div>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-6xl mx-auto relative">
          <div className="absolute -inset-4 blur-3xl rounded-full" style={{ background: `${accentColor}1a` }}></div>
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-[#03081a]">
            <img 
              src={imageUrl} 
              alt={imageAlt} 
              className="w-full h-auto opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, i) => (
            <div key={i} className="group bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/30 transition-all duration-500"
              style={{ ['--hover-color' as any]: accentColor }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = `${accentColor}80`}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              <div className="h-48 overflow-hidden">
                <img src={card.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={card.title} />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TrustedIntegration/>

      <SuccessStories />

      <div className="border-t border-white/5">
        <FeatureGrid />
      </div>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Execution Suite" productTagline="Automation + Support + Governance" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default ExecutionSuitePage;