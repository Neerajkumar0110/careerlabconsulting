'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import SuccessStories from '@/components/product/SuccessStories';
import { ShieldCheck, Lock, FileText, Eye, Scale, Fingerprint } from 'lucide-react';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface IconProps { size?: number; className?: string; style?: CSSProperties }

interface PillarItem   { icon: string; title: string; desc: string }
interface Framework    { label: string; score: number; color: string }
interface FeatureItem  { icon: string; title: string; desc: string }
interface PointItem    { icon: string; title: string; desc: string }
interface StatItem     { value: string; label: string }

interface RadarDot { angle: number; r: number }
interface SecurityEvent { msg: string; type: string; color: string }

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const ShieldCheckIconSvg: FC<IconProps> = ({ size = 11, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
  </svg>
);
const ArrowRightIconSvg: FC<{ size?: number; className?: string }> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const AlertIconSvg: FC<IconProps> = ({ size = 9, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const LockIconSvg: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const EyeIconSvg: FC<IconProps> = ({ size = 11, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const CheckIconSvg: FC<IconProps> = ({ size = 9, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Icon maps ─────────────────────────────────────────────────────────────────
const PILLAR_ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck: ShieldCheckIconSvg,
  Eye:         EyeIconSvg,
  Lock:        LockIconSvg,
  Check:       CheckIconSvg,
};

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Scale, Lock, FileText,
};

const VISIBILITY_ICON_MAP: Record<string, React.ElementType> = {
  Eye, Fingerprint, ShieldCheck,
};

// ── Helpers ───────────────────────────────────────────────────────────────────
function useFadeIn(): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Static data ───────────────────────────────────────────────────────────────
const RADAR_DOTS: RadarDot[] = [
  { angle: 30,  r: 0.4 }, { angle: 100, r: 0.7 }, { angle: 200, r: 0.5 },
  { angle: 280, r: 0.8 }, { angle: 150, r: 0.3 }, { angle: 320, r: 0.6 },
];

const EVENT_POOL: SecurityEvent[] = [
  { msg: 'Anomaly detected → auto-quarantined',  type: 'warn', color: '#fbbf24' },
  { msg: 'AI model audit passed — 100%',          type: 'pass', color: '#34d399' },
  { msg: 'Access policy enforced: 2,410 ops',     type: 'info', color: '#60a5fa' },
  { msg: 'Ethics monitor: no violations found',   type: 'pass', color: '#34d399' },
  { msg: 'Compliance report generated',           type: 'info', color: '#a78bfa' },
  { msg: 'Zero-trust perimeter validated',        type: 'pass', color: '#34d399' },
  { msg: 'Suspicious login → blocked + logged',   type: 'warn', color: '#fbbf24' },
];

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_PILLARS: PillarItem[] = [
  { icon: 'ShieldCheck', title: 'Zero-Trust Architecture', desc: 'Every request verified'  },
  { icon: 'Eye',         title: 'AI Ethics Monitoring',   desc: 'Continuous oversight'    },
  { icon: 'Lock',        title: 'Encryption at Rest',     desc: 'AES-256 always-on'       },
  { icon: 'Check',       title: 'Audit Trails',           desc: 'Immutable log chain'     },
];
const DEFAULT_FRAMEWORKS: Framework[] = [
  { label: 'SOC 2 Type II', score: 100, color: '#3b82f6' },
  { label: 'ISO 27001',     score: 100, color: '#6366f1' },
  { label: 'GDPR',          score: 98,  color: '#8b5cf6' },
  { label: 'HIPAA',         score: 100, color: '#06b6d4' },
  { label: 'PCI-DSS',       score: 97,  color: '#3b82f6' },
];
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'Scale',    title: 'Ethical AI Guardrails',  desc: 'Real-time monitoring to ensure your AI agents remain within corporate policy and ethical boundaries.'  },
  { icon: 'Lock',     title: 'Zero-Trust Integration', desc: 'Every API call and data transfer is verified with multi-layered encryption and biometric handshakes.'  },
  { icon: 'FileText', title: 'Automated Compliance',   desc: 'Instant alignment with GDPR, SOC2, and regional data laws across all 8 of our primary tech hubs.'     },
];
const DEFAULT_VISIBILITY: PointItem[] = [
  { icon: 'Eye',         title: 'Neural Activity Logs',  desc: 'Deep-dive into every decision made by your autonomous workforce.'       },
  { icon: 'Fingerprint', title: 'Biometric Verification', desc: 'Secure access control for high-stakes AI administration.'               },
  { icon: 'ShieldCheck', title: 'Global Risk Scoring',   desc: "Real-time assessment of your digital infrastructure's vulnerability."   },
];
const DEFAULT_STATS: StatItem[] = [
  { value: '99.999%', label: 'Uptime SLA'            },
  { value: 'AAA+',    label: 'Trust Score'           },
  { value: '5',       label: 'Compliance Frameworks' },
  { value: '0',       label: 'Breaches to Date'      },
];

// ═════════════════════════════════════════════════════════════════════════════
const GovernanceSecurityPage = () => {
  const [ref, visible] = useFadeIn();
  const [bars, setBars]               = useState<number[]>([0, 0, 0, 0, 0]);
  const [events, setEvents]           = useState<SecurityEvent[]>([]);
  const [radarAngle, setRadarAngle]   = useState(0);
  const [threats, setThreats]         = useState(0);
  const [modalOpen, setModalOpen]     = useState(false);

  const { get } = usePageContent('governance-suite');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor     = get('hero', 'accent_color',      '#3b82f6');
  const accentSecondary = get('hero', 'accent_secondary',  '#6366f1');
  const badgeText       = get('hero', 'badge_text',        'Enterprise Security Protocol');
  const headline1       = get('hero', 'headline_1',        'GOVERNANCE');
  const headlineAccent  = get('hero', 'headline_accent',   '&');
  const headline2       = get('hero', 'headline_2',        'TRUST');
  const headline3       = get('hero', 'headline_3',        'SUITE');
  const heroBody        = get('hero', 'body_text',         'Secure your autonomous future. Architectural guardrails, compliance frameworks, and ethical AI monitoring required for global enterprise operations.');
  const btn1Label       = get('hero', 'btn_1_label',       'Audit My Stack');
  const btn2Label       = get('hero', 'btn_2_label',       'WhatsApp Demo');
  const whatsappNumber  = get('hero', 'whatsapp_number',   '919810984968');
  const whatsappMsg     = get('hero', 'whatsapp_message',  "Hello! I'm interested in Governance Suite and would like to see a demo.");
  const pillars         = safeParse<PillarItem[]>(get('hero', 'pillars_json', ''), DEFAULT_PILLARS);

  const radarLabel      = get('compliance', 'radar_label',       'Threat Radar');
  const liveEventsLabel = get('compliance', 'live_events_label', 'Live Events');
  const trustScore      = get('compliance', 'trust_score',       'AAA+');
  const trustScoreLabel = get('compliance', 'trust_score_label', 'Trust Score');
  const complianceLabel = get('compliance', 'compliance_label',  'Compliance Frameworks');
  const frameworks      = safeParse<Framework[]>(get('compliance', 'frameworks_json', ''), DEFAULT_FRAMEWORKS);
  const badgeLabels     = safeParse<string[]>(get('compliance', 'badge_labels_json', ''), ['SOC2', 'ISO', 'GDPR', 'HIPAA']);

  const featureItems    = safeParse<FeatureItem[]>(get('features', 'items_json', ''), DEFAULT_FEATURES);

  const visibilityHead  = get('visibility', 'headline',   'Total Visibility');
  const visibilityPts   = safeParse<PointItem[]>(get('visibility', 'points_json', ''), DEFAULT_VISIBILITY);
  const visibilityImg   = get('visibility', 'image_url',  'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260');

  const statsItems      = safeParse<StatItem[]>(get('stats', 'items_json', ''), DEFAULT_STATS);

  const ctaHeadline     = get('cta', 'headline',   'SECURE YOUR SCALE');
  const ctaBody         = get('cta', 'body_text',  'Our security architects at DLF Cyber City are ready to harden your autonomous infrastructure.');
  const ctaBtnLabel     = get('cta', 'btn_label',  'CONTACT HUB');
  const ctaPhone        = get('cta', 'phone',      '+91 870023 6923');

  // ── Animations ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      frameworks.forEach((f, i) => {
        let v = 0;
        const iv = setInterval(() => {
          v = Math.min(v + 1, f.score);
          setBars(b => { const n = [...b]; n[i] = v; return n; });
          if (v >= f.score) clearInterval(iv);
        }, 10 + i * 3);
      });
    }, 300);
  }, [visible, frameworks.length]);

  useEffect(() => {
    if (!visible) return;
    const iv = setInterval(() => setRadarAngle(a => (a + 2) % 360), 30);
    return () => clearInterval(iv);
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    let idx = 0;
    const iv = setInterval(() => {
      setEvents(e => [EVENT_POOL[idx % EVENT_POOL.length], ...e.slice(0, 4)]);
      setThreats(t => t + (Math.random() > 0.7 ? 1 : 0));
      idx++;
    }, 1800);
    return () => clearInterval(iv);
  }, [visible]);

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#030810] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `repeating-linear-gradient(0deg, ${accentColor}04 0px, ${accentColor}04 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, ${accentColor}04 0px, ${accentColor}04 1px, transparent 1px, transparent 60px)` }} />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`, filter: 'blur(100px)', opacity: 0.07 }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentSecondary} 0%, transparent 70%)`, filter: 'blur(100px)', opacity: 0.06 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentColor}4d`, background: `${accentColor}1a` }}>
              <ShieldCheckIconSvg size={11} style={{ color: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-none mb-5"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)', letterSpacing: '-0.05em' }}>
              <span className="text-white">{headline1}</span>
              <br />
              <span style={{ color: accentColor }}>{headlineAccent}</span>{' '}
              <span style={{ WebkitTextStroke: `1.5px ${accentColor}80`, color: 'transparent' }}>{headline2}</span>
              <span className="text-white"> {headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {pillars.map(({ icon, title, desc }) => {
                const PillarIcon = PILLAR_ICON_MAP[icon] ?? ShieldCheckIconSvg;
                return (
                  <div key={title} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${accentColor}26`, border: `1px solid ${accentColor}40` }}>
                      <PillarIcon size={11} style={{ color: accentColor }} />
                    </div>
                    <div>
                      <p className="text-white text-[10px] font-black">{title}</p>
                      <p className="text-slate-600 text-[9px]">{desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}40` }}
                onClick={() => setModalOpen(true)}
              >
                {btn1Label}
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
                {btn2Label}
              </a>
            </div>
          </div>

          {/* RIGHT — Radar + Compliance widget */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
            <div className="relative bg-[#060b18] border border-white/[0.07] rounded-3xl overflow-hidden p-5 md:p-6"
              style={{ boxShadow: `0 0 60px ${accentColor}14` }}>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Radar */}
                <div className="flex items-center justify-center">
                  <div className="relative" style={{ width: 140, height: 140 }}>
                    {[1, 0.66, 0.33].map((r, i) => (
                      <div key={i} className="absolute rounded-full border" style={{
                        top: `${(1 - r) * 50}%`, left: `${(1 - r) * 50}%`,
                        width: `${r * 100}%`, height: `${r * 100}%`,
                        borderColor: `${accentColor}${i === 0 ? '14' : i === 1 ? '1e' : '28'}`,
                        background: i === 2 ? `${accentColor}0a` : 'transparent',
                      }} />
                    ))}
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: `conic-gradient(from ${radarAngle}deg, ${accentColor}4d 0deg, ${accentColor}0d 50deg, transparent 60deg)` }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-px" style={{ background: `${accentColor}1a` }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-full w-px" style={{ background: `${accentColor}1a` }} />
                    </div>
                    {RADAR_DOTS.map((d, i) => {
                      const rad = (d.angle * Math.PI) / 180;
                      const x = 50 + d.r * 50 * Math.cos(rad);
                      const y = 50 + d.r * 50 * Math.sin(rad);
                      const swept = ((d.angle - radarAngle + 360) % 360) < 60;
                      return (
                        <div key={i} className="absolute w-1.5 h-1.5 rounded-full transition-all duration-200"
                          style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', background: swept ? accentColor : `${accentColor}40`, boxShadow: swept ? `0 0 6px ${accentColor}` : 'none' }} />
                      );
                    })}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full animate-pulse" style={{ background: `${accentColor}66`, border: `1px solid ${accentColor}99` }} />
                    </div>
                    <div className="absolute -bottom-5 left-0 right-0 text-center">
                      <p className="text-[8px] text-slate-600 font-black uppercase tracking-widest">{radarLabel}</p>
                    </div>
                  </div>
                </div>

                {/* Event feed */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest">{liveEventsLabel}</p>
                    <div className="flex items-center gap-1">
                      <AlertIconSvg size={9} style={{ color: '#fbbf24' }} />
                      <span className="text-[8px] text-yellow-400 font-black">{threats} flagged</span>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    {events.map((e, i) => (
                      <div key={i} className="flex items-start gap-1.5" style={{ opacity: 1 - i * 0.2 }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: e.color }} />
                        <p className="text-[8px] text-slate-500 leading-tight">{e.msg}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Compliance bars */}
              <div className="border-t border-white/[0.05] pt-4 mb-4">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-3">{complianceLabel}</p>
                <div className="space-y-2.5">
                  {frameworks.map((f, i) => (
                    <div key={f.label}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] text-slate-400 font-bold">{f.label}</span>
                        <span className="text-[10px] font-black" style={{ color: f.color }}>{bars[i] ?? 0}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                        <div className="h-full rounded-full transition-all duration-75"
                          style={{ width: `${bars[i] ?? 0}%`, background: `linear-gradient(90deg, ${f.color}, ${f.color}99)` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust score footer */}
              <div className="flex items-center justify-between p-3 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${accentColor}1a, ${accentSecondary}14)`, border: `1px solid ${accentColor}33` }}>
                <div>
                  <p className="text-[9px] text-slate-600 uppercase tracking-widest">{trustScoreLabel}</p>
                  <p className="text-white font-black text-xl">{trustScore}</p>
                </div>
                <div className="flex gap-1">
                  {badgeLabels.map(c => (
                    <div key={c} className="px-1.5 py-0.5 rounded text-[7px] font-black"
                      style={{ background: `${accentColor}26`, color: accentColor, border: `1px solid ${accentColor}40` }}>
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = FEATURE_ICON_MAP[item.icon] ?? Scale;
            return (
              <div key={i}
                className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}0d` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentColor}1a` }}
                  onMouseEnter={e => (e.currentTarget.style.background = accentColor)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${accentColor}1a`)}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      {/* ── VISIBILITY ───────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">{visibilityHead}</h2>
            <div className="space-y-8">
              {visibilityPts.map((point, idx) => {
                const Icon = VISIBILITY_ICON_MAP[point.icon] ?? Eye;
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="mt-1"><Icon style={{ color: accentColor }} /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                      <p className="text-gray-400">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img src={visibilityImg} alt="Security Infrastructure"
              className="w-full h-auto opacity-60 group-hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom right, ${accentColor}33, transparent)` }} />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 border-t border-white/5">
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          {statsItems.map(({ value, label }) => (
            <div key={label} className="p-8 rounded-3xl border border-white/5"
              style={{ background: `${accentColor}0d` }}>
              <p className="text-4xl font-black mb-2" style={{ color: accentColor }}>{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}66, ${accentSecondary}66)`, border: `1px solid ${accentColor}33` }}>
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
            style={{ background: `${accentColor}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: '#fff', color: '#0f172a' }}
                onClick={() => setModalOpen(true)}>
                {ctaBtnLabel}
              </button>
              <div className="flex items-center gap-3 font-mono" style={{ color: accentColor }}>
                <LockIconSvg size={16} style={{ color: '#facc15' }} />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Governance Suite" productTagline="AI safety & Compliance" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default GovernanceSecurityPage;