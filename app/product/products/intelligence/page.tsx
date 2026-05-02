'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import FeatureGrid from '@/components/product/FeatureGrid';
import SuccessStories from '@/components/product/SuccessStories';
import { BrainCircuit, LineChart, Binary, Search, Database, Fingerprint } from 'lucide-react';
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
const BrainIcon: FC<IconProps> = ({ size = 11, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.96-3 2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 4.46-2.04" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.96-3 2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 0-4.46-2.04" />
  </svg>
);

const ArrowRightIcon: FC<IconProps> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const TrendingUpIcon: FC<IconProps> = ({ size = 12, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </svg>
);

const DatabaseIconSvg: FC<IconProps> = ({ size = 12, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const ZapIconSvg: FC<IconProps> = ({ size = 12, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckIcon: FC<IconProps> = ({ size = 9, style }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Data types ────────────────────────────────────────────────────────────────
interface ChartBar { height: number }
interface InsightItem { label: string; value: string; delta: string; Icon: FC<IconProps> }
interface DatasetRow { label: string; value: number }

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

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Static chart data ─────────────────────────────────────────────────────────
const CHART_BARS: ChartBar[] = [
  { height: 40 }, { height: 65 }, { height: 50 }, { height: 80 },
  { height: 60 }, { height: 90 }, { height: 70 }, { height: 100 },
  { height: 75 }, { height: 85 }, { height: 55 }, { height: 95 },
];

const STREAM_MESSAGES = [
  'Pattern detected: revenue spike in APAC +34%',
  'Anomaly flagged: latency outlier — auto-resolved',
  'Forecast updated: Q2 growth revised to +28%',
  'Segment identified: 12K high-value accounts',
  'Correlation found: churn signal in cohort B',
];

// ── Default fallback data ─────────────────────────────────────────────────────
const DEFAULT_FEATURES_JSON = JSON.stringify([
  { title: 'Predictive Modeling', desc: 'Deploy neural networks that forecast market trends and operational bottlenecks with extreme precision.', icon: 'LineChart' },
  { title: 'Semantic Data Mining', desc: 'Extract meaningful insights from unstructured data across your entire documentation and communication stack.', icon: 'Binary' },
  { title: 'Real-time Signal Detection', desc: 'Identify critical business signals as they happen, enabling sub-second response times to market shifts.', icon: 'Search' },
]);

const DEFAULT_DATASET_JSON = JSON.stringify([
  { label: 'Revenue Signals', value: 94 },
  { label: 'Churn Prediction', value: 87 },
  { label: 'Market Sentiment', value: 72 },
  { label: 'Anomaly Detection', value: 98 },
]);

const DEFAULT_CHECKLIST_JSON = JSON.stringify([
  'Real-time terabyte processing',
  'Predictive growth opportunity detection',
  'Cross-functional BI dashboards',
]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { value: '4.8TB', label: 'Data / second' },
  { value: '99.4%', label: 'Model Accuracy' },
  { value: '340K', label: 'Live Queries' },
  { value: '120+', label: 'Integrations' },
]);

const DEFAULT_DNA_POINTS_JSON = JSON.stringify([
  { title: 'Automated Data Cleaning', desc: 'Our agents automatically resolve data inconsistencies before analysis begins.', icon: 'Fingerprint' },
  { title: 'Custom BI Dashboards', desc: 'Stakeholder-specific visualizations generated instantly via natural language.', icon: 'LineChart' },
  { title: 'Secure Sovereignty', desc: 'Intelligence models that run entirely within your private cloud architecture.', icon: 'Database' },
]);

const ICON_COMPONENT_MAP: Record<string, React.ElementType> = {
  LineChart, Binary, Search, Database, Fingerprint, BrainCircuit,
};

const IntelligenceSuitePage = () => {
  const [ref, visible] = useFadeIn();
  const [countStart, setCountStart] = useState<boolean>(false);
  const [barWidths, setBarWidths] = useState<number[]>([0, 0, 0, 0]);
  const [streamIdx, setStreamIdx] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('intelligence-suite');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentFrom      = get('hero', 'accent_from',      '#3b82f6');
  const accentTo        = get('hero', 'accent_to',        '#818cf8');
  const badgeText       = get('hero', 'badge_text',       'Advanced Analytics & BI');
  const headline1       = get('hero', 'headline_1',       'INTELLI');
  const headline2       = get('hero', 'headline_2',       'GENCE');
  const headline3       = get('hero', 'headline_3',       'SUITE');
  const heroBody        = get('hero', 'body_text',        'Turn raw data into decisive action. Our intelligence engine processes terabytes of enterprise information in real-time to uncover hidden patterns and predictive growth opportunities.');
  const heroBtn1Label   = get('hero', 'btn_1_label',      'Analyze My Data');
  const heroBtn2Label   = get('hero', 'btn_2_label',      'WhatsApp Demo');
  const whatsappNumber  = get('hero', 'whatsapp_number',  '919810984968');
  const whatsappMsg     = get('hero', 'whatsapp_message', "Hello! I'm interested in Intelligence Suite and would like to see a demo.");
  const heroImageUrl    = get('hero', 'hero_image_url',   'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260');

  const checklistRaw    = get('hero', 'checklist_json',   DEFAULT_CHECKLIST_JSON);
  const checklist       = safeParse<string[]>(checklistRaw, ['Real-time terabyte processing', 'Predictive growth opportunity detection', 'Cross-functional BI dashboards']);

  const dashboardTitle  = get('dashboard', 'title',        'Intelligence Engine');
  const dashboardSub    = get('dashboard', 'subtitle',     'Live · Terabyte-scale processing');
  const processingLabel = get('dashboard', 'processing_label', 'Processing');
  const chartTitle      = get('dashboard', 'chart_title',  'Signal Volume · Last 12h');

  const datasetRaw      = get('dashboard', 'dataset_json', DEFAULT_DATASET_JSON);
  const datasetRows     = safeParse<DatasetRow[]>(datasetRaw, [
    { label: 'Revenue Signals', value: 94 }, { label: 'Churn Prediction', value: 87 },
    { label: 'Market Sentiment', value: 72 }, { label: 'Anomaly Detection', value: 98 },
  ]);

  const featuresHeadline = get('features', 'headline',    'Core Intelligence');
  const featuresAccent   = get('features', 'accent_word', 'Capabilities');
  const featuresRaw      = get('features', 'items_json',  DEFAULT_FEATURES_JSON);
  const featureItems     = safeParse<{ title: string; desc: string; icon: string }[]>(featuresRaw, []);

  const statsRaw         = get('stats', 'items_json',     DEFAULT_STATS_JSON);
  const statsItems       = safeParse<{ value: string; label: string }[]>(statsRaw, []);

  const dnaHeadline      = get('dna', 'headline',         'The DNA of Enterprise Data');
  const dnaImageUrl      = get('dna', 'image_url',        'https://images.pexels.com/photos/1850619/pexels-photo-1850619.jpeg?auto=compress&cs=tinysrgb&w=1260');
  const dnaPointsRaw     = get('dna', 'points_json',      DEFAULT_DNA_POINTS_JSON);
  const dnaPoints        = safeParse<{ title: string; desc: string; icon: string }[]>(dnaPointsRaw, []);

  const ctaHeadline      = get('cta', 'headline',         'DECODE GROWTH');
  const ctaBody          = get('cta', 'body_text',        'Connect with our data scientists at the Gurugram Hub to build your predictive intelligence roadmap.');
  const ctaBtnLabel      = get('cta', 'btn_label',        'REQUEST AUDIT');
  const ctaPhone         = get('cta', 'phone',            '+91 870023 6923');

  // ── Counter data ──────────────────────────────────────────────────────────
  const tb = useCounter(4.8, 1400, countStart);
  const queries = useCounter(340000, 1600, countStart);

  const insights: InsightItem[] = [
    { label: 'Data Processed', value: `${tb}TB`, delta: '+12% vs last hr', Icon: DatabaseIconSvg },
    { label: 'Live Queries', value: queries.toLocaleString(), delta: 'real-time', Icon: ZapIconSvg },
    { label: 'Accuracy', value: '99.4%', delta: 'model confidence', Icon: TrendingUpIcon },
  ];

  useEffect(() => {
    if (!visible) return;
    setTimeout(() => {
      setCountStart(true);
      datasetRows.forEach((row, i) => {
        let v = 0;
        const iv = setInterval(() => {
          v = Math.min(v + 1, row.value);
          setBarWidths((b) => { const n = [...b]; n[i] = v; return n; });
          if (v >= row.value) clearInterval(iv);
        }, 10 + i * 4);
      });
    }, 350);
    const streamIv = setInterval(() => setStreamIdx((s) => s + 1), 1400);
    return () => clearInterval(streamIv);
  }, [visible]);

  // ── Derived colors ────────────────────────────────────────────────────────
  const accentMid = accentTo; // second gradient stop used as secondary accent

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#030811] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse 65% 55% at 15% 50%, ${accentFrom}12 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentFrom} 0%, transparent 65%)`, filter: 'blur(110px)', opacity: 0.09 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `radial-gradient(${accentFrom}14 1px, transparent 1px)`, backgroundSize: '40px 40px', opacity: 0.4 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentFrom}50`, background: `${accentFrom}1a` }}>
              <BrainIcon size={11} style={{ color: accentFrom }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(3rem, 5.5vw, 7rem)', letterSpacing: '-0.05em' }}>
              <span className="text-white">{headline1}</span>
              <span style={{ color: accentFrom }}>{headline2}</span>
              <br />
              <span style={{ WebkitTextStroke: `2px ${accentFrom}73`, color: 'transparent' }}>{headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            <div className="space-y-2.5 mb-8">
              {checklist.map((f) => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${accentFrom}33`, border: `1px solid ${accentFrom}66` }}>
                    <CheckIcon size={9} style={{ color: accentFrom }} />
                  </div>
                  <p className="text-slate-300 text-sm">{f}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
                <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
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

          {/* RIGHT — Dashboard graphic */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
            <div className="relative bg-[#060c1c] border border-white/[0.07] rounded-3xl overflow-hidden p-5 md:p-6"
              style={{ boxShadow: `0 0 70px ${accentFrom}1a` }}>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white text-sm font-black">{dashboardTitle}</p>
                  <p className="text-slate-600 text-[9px]">{dashboardSub}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}40` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentFrom }} />
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentFrom }}>{processingLabel}</span>
                </div>
              </div>

              {/* KPI chips */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {insights.map(({ label, value, delta, Icon }, idx) => {
                  const colors = [accentFrom, accentTo, '#06b6d4'];
                  const c = colors[idx] ?? accentFrom;
                  return (
                    <div key={label} className="p-2.5 rounded-xl text-center"
                      style={{ background: `${c}0d`, border: `1px solid ${c}25` }}>
                      <Icon size={12} style={{ color: c, margin: '0 auto 3px' }} />
                      <p className="text-white font-black text-sm leading-none">{value}</p>
                      <p className="text-[7px] text-slate-600 mt-0.5 truncate">{delta}</p>
                    </div>
                  );
                })}
              </div>

              {/* Bar chart */}
              <div className="mb-4">
                <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">{chartTitle}</p>
                <div className="flex items-end gap-1 h-16 p-2 rounded-xl"
                  style={{ background: `${accentFrom}0a`, border: `1px solid ${accentFrom}1a` }}>
                  {CHART_BARS.map((bar, i) => (
                    <div key={i} className="flex-1 rounded-sm transition-all duration-500"
                      style={{
                        height: visible ? `${bar.height}%` : '0%',
                        background: i % 2 === 0 ? `${accentFrom}99` : `${accentTo}99`,
                        transitionDelay: `${i * 60}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Model accuracy rows */}
              <div className="mb-4">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">Model Accuracy</p>
                <div className="space-y-2">
                  {datasetRows.map((row, i) => {
                    const colors = [accentFrom, accentTo, '#8b5cf6', '#06b6d4'];
                    const c = colors[i % colors.length];
                    return (
                      <div key={row.label}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[9px] text-slate-400 font-bold">{row.label}</span>
                          <span className="text-[9px] font-black" style={{ color: c }}>{barWidths[i] ?? 0}%</span>
                        </div>
                        <div className="h-1 rounded-full bg-white/[0.05] overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-75"
                            style={{ width: `${barWidths[i] ?? 0}%`, background: `linear-gradient(90deg, ${c}, ${c}88)` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live insight stream */}
              <div className="p-3 rounded-xl"
                style={{ background: `${accentFrom}0f`, border: `1px solid ${accentFrom}26` }}>
                <div className="flex items-center gap-2">
                  <BrainIcon size={10} style={{ color: accentFrom }} className="shrink-0" />
                  <p className="text-[9px] text-slate-400 transition-all duration-500 truncate">
                    <span className="font-black" style={{ color: accentFrom }}>AI Insight: </span>
                    {STREAM_MESSAGES[streamIdx % STREAM_MESSAGES.length]}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 rounded-xl px-3 py-1.5 backdrop-blur-sm hidden sm:block"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}50` }}>
              <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: accentFrom }}>4.8TB / sec</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            {featuresHeadline}{' '}
            <span style={{ color: accentFrom }}>{featuresAccent}</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = ICON_COMPONENT_MAP[item.icon] ?? LineChart;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 transition-all"
                style={{ ['--hover-border' as string]: `${accentFrom}50` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentFrom}1a` }}
                  onMouseEnter={e => (e.currentTarget.style.background = accentFrom)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${accentFrom}1a`)}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Proven Intelligence Performance</h2>
          <p className="text-gray-400">Built to scale mission-critical data workflows.</p>
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

      {/* ── DNA SECTION ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img
              src={dnaImageUrl}
              alt="Data Infrastructure"
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 p-6 backdrop-blur-xl rounded-2xl"
              style={{ background: `${accentFrom}26`, border: `1px solid ${accentFrom}50` }}>
              <Database className="w-10 h-10 mb-2" style={{ color: accentFrom }} />
              <div className="text-2xl font-black italic">TB/SEC</div>
              <div className="text-xs text-gray-400 font-mono tracking-tighter">PROCESSING_CAPACITY</div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{dnaHeadline}</h2>
            <div className="space-y-8">
              {dnaPoints.map((point, idx) => {
                const Icon = ICON_COMPONENT_MAP[point.icon] ?? Database;
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="mt-1"><Icon style={{ color: accentFrom }} /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                      <p className="text-gray-400">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <TrustedIntegration />
      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}26, ${accentTo}1a)`, border: `1px solid ${accentFrom}33` }}>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
            style={{ background: `${accentFrom}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter italic">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: '#fff', color: '#0f172a' }}
                onClick={() => setModalOpen(true)}
              >
                {ctaBtnLabel}
              </button>
              <div className="flex items-center gap-3 font-mono" style={{ color: accentFrom }}>
                <BrainCircuit className="w-4 h-4" />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Intelligence Suite" productTagline="Advanced Analytics" accentColor={accentFrom} />
      <Footer />
    </main>
  );
};

export default IntelligenceSuitePage;