'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import SuccessStories from '@/components/product/SuccessStories';
import { Truck, Box, BarChart, Globe, Zap, ShieldCheck } from 'lucide-react';
import CTAModal from '@/components/product/CTAModel';
import Link from 'next/link';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface IconProps { size?: number; className?: string; style?: CSSProperties }

interface ChipItem     { label: string }
interface KpiStat     { icon: string; value: string; label: string; color: string }
interface RouteNode   { label: string; sub: string; color: string }
interface FeatureItem { icon: string; title: string; desc: string }
interface FlowPoint   { icon: string; title: string; desc: string }
interface StatItem    { value: string; label: string }

interface Shipment {
  id: string;
  route: string;
  status: string;
  eta: string;
  color: string;
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const TruckIconSvg: FC<IconProps> = ({ size = 11, className = '', style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const ArrowRightIconSvg: FC<{ size?: number; className?: string }> = ({ size = 13, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const MapPinIconSvg: FC<IconProps> = ({ size = 12, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const PackageIconSvg: FC<IconProps> = ({ size = 12, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);
const GlobeIconSvg: FC<IconProps> = ({ size = 12, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ZapIconSvg: FC<IconProps> = ({ size = 12, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const CheckIconSvg: FC<IconProps> = ({ size = 9, style }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Icon maps ─────────────────────────────────────────────────────────────────
const KPI_ICON_MAP: Record<string, React.ElementType> = {
  Package: PackageIconSvg,
  Globe:   GlobeIconSvg,
  Zap:     ZapIconSvg,
};

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Box, Globe, BarChart,
};

const FLOW_ICON_MAP: Record<string, React.ElementType> = {
  Zap, ShieldCheck, Truck,
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

// ── Static shipment pool (not CMS — it's runtime data) ───────────────────────
const SHIPMENT_POOL: Shipment[] = [
  { id: 'SHP-4821', route: 'Shanghai → Los Angeles', status: 'IN TRANSIT',  eta: '2d 4h',  color: '#3b82f6' },
  { id: 'SHP-4820', route: 'Rotterdam → New York',   status: 'CUSTOMS',     eta: '6h 20m', color: '#fbbf24' },
  { id: 'SHP-4819', route: 'Dubai → Frankfurt',      status: 'DELIVERED',   eta: 'Done',   color: '#34d399' },
  { id: 'SHP-4818', route: 'Singapore → Sydney',     status: 'IN TRANSIT',  eta: '1d 12h', color: '#3b82f6' },
  { id: 'SHP-4817', route: 'Chicago → Toronto',      status: 'OUT FOR DEL', eta: '3h',     color: '#a78bfa' },
  { id: 'SHP-4816', route: 'Mumbai → London',        status: 'IN TRANSIT',  eta: '3d 8h',  color: '#3b82f6' },
];

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CHIPS = ['Predictive ETA with 96% accuracy', 'Autonomous last-mile optimization', 'Real-time global freight visibility'];
const DEFAULT_KPI: KpiStat[] = [
  { icon: 'Package', value: '98K',  label: 'Shipments/day', color: '#3b82f6' },
  { icon: 'Globe',   value: '180+', label: 'Countries',     color: '#6366f1' },
  { icon: 'Zap',     value: '96%',  label: 'On-time',       color: '#06b6d4' },
];
const DEFAULT_ROUTE: RouteNode[] = [
  { label: 'Origin',  sub: 'Shanghai',    color: '#3b82f6' },
  { label: 'Hub',     sub: 'Hong Kong',   color: '#6366f1' },
  { label: 'Transit', sub: 'Pacific',     color: '#8b5cf6' },
  { label: 'Dest',    sub: 'Los Angeles', color: '#06b6d4' },
];
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'Box',      title: 'Predictive Sourcing',       desc: 'AI models that anticipate supply shortages and automatically trigger alternative procurement workflows.'              },
  { icon: 'Globe',    title: 'Real-time Orchestration',   desc: 'Dynamic routing agents that adjust logistics paths based on live weather, traffic, and geopolitical shifts.'           },
  { icon: 'BarChart', title: 'Inventory Intelligence',    desc: 'Neural-driven warehouse management that reduces holding costs by aligning stock perfectly with demand signals.'        },
];
const DEFAULT_FLOW: FlowPoint[] = [
  { icon: 'Zap',        title: 'Automated Customs',    desc: 'Digital documentation agents that clear international hurdles in seconds, not days.'      },
  { icon: 'ShieldCheck', title: 'Verified Traceability', desc: 'End-to-end blockchain-backed logs for every item in your supply chain.'                  },
  { icon: 'Truck',      title: 'Last-Mile Autonomy',   desc: 'Optimized delivery algorithms that maximize fleet efficiency and fuel savings.'            },
];
const DEFAULT_STATS: StatItem[] = [
  { value: '98K+',  label: 'Shipments/day'     },
  { value: '180+',  label: 'Countries'         },
  { value: '96%',   label: 'On-time Delivery'  },
  { value: '4.2B+', label: 'Packages Tracked'  },
];

// ═════════════════════════════════════════════════════════════════════════════
const LogisticsSupplyPage = () => {
  const [ref, visible] = useFadeIn();
  const [shipments, setShipments] = useState<Shipment[]>(SHIPMENT_POOL.slice(0, 4));
  const [nodeActive, setNodeActive] = useState(0);
  const [modalOpen, setModalOpen]   = useState(false);

  const { get } = usePageContent('inventory-supply-chain');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentColor     = get('hero', 'accent_color',      '#3b82f6');
  const accentSecondary = get('hero', 'accent_secondary',  '#6366f1');
  const badgeText       = get('hero', 'badge_text',        'Autonomous Logistics & Supply');
  const headline1       = get('hero', 'headline_1',        'LOGISTICS');
  const headline2       = get('hero', 'headline_2',        'SUPPLY');
  const headline3       = get('hero', 'headline_3',        'CHAIN');
  const heroBody        = get('hero', 'body_text',         'Eliminate supply chain friction with predictive intelligence. Deploy autonomous agents to orchestrate global freight, manage warehouse inventories, and optimize last-mile delivery in real-time.');
  const btn1Label       = get('hero', 'btn_1_label',       'Optimize My Chain');
  const btn2Label       = get('hero', 'btn_2_label',       'View Case Studies');
  const btn2Href        = get('hero', 'btn_2_href',        '/case-study');
  const chips           = safeParse<string[]>(get('hero', 'chips_json', ''), DEFAULT_CHIPS);

  const widgetTitle     = get('tracker', 'widget_title',     'Global Freight Control');
  const widgetSubtitle  = get('tracker', 'widget_subtitle',  'Autonomous · Real-time');
  const liveLabel       = get('tracker', 'live_label',       'Live Tracking');
  const kpiStats        = safeParse<KpiStat[]>(get('tracker', 'kpi_stats_json', ''), DEFAULT_KPI);
  const routeNodes      = safeParse<RouteNode[]>(get('tracker', 'route_nodes_json', ''), DEFAULT_ROUTE);
  const routeLabel      = get('tracker', 'route_label',     'Active Route · SHP-4821');
  const floatingBadge   = get('tracker', 'floating_badge',  '🌐 180 Countries');

  const featureItems    = safeParse<FeatureItem[]>(get('features', 'items_json', ''), DEFAULT_FEATURES);

  const flowHeadline    = get('flow', 'headline',   'Frictionless Flow');
  const flowPoints      = safeParse<FlowPoint[]>(get('flow', 'points_json', ''), DEFAULT_FLOW);
  const flowImageUrl    = get('flow', 'image_url',  'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg?auto=compress&cs=tinysrgb&w=1260');

  const statsItems      = safeParse<StatItem[]>(get('stats', 'items_json', ''), DEFAULT_STATS);

  const ctaHeadline     = get('cta', 'headline',   'ACCELERATE SUPPLY');
  const ctaBody         = get('cta', 'body_text',  'Our engineering team at DLF Cyber City is ready to architect your autonomous logistics network.');
  const ctaBtnLabel     = get('cta', 'btn_label',  'SECURE ACCESS');
  const ctaPhone        = get('cta', 'phone',      '+91 870023 6923');

  // ── Animations ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!visible) return;
    let idx = 4;
    const iv = setInterval(() => {
      setShipments(s => [SHIPMENT_POOL[idx % SHIPMENT_POOL.length], ...s.slice(0, 4)]);
      idx++;
    }, 2200);
    const nodeIv = setInterval(() => setNodeActive(n => (n + 1) % Math.max(routeNodes.length, 1)), 1000);
    return () => { clearInterval(iv); clearInterval(nodeIv); };
  }, [visible, routeNodes.length]);

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
          style={{ background: `radial-gradient(ellipse 60% 55% at 15% 50%, ${accentColor}0f 0%, transparent 70%)` }} />
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 65%)`, filter: 'blur(120px)', opacity: 0.07 }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: `linear-gradient(${accentColor}07 1px, transparent 1px), linear-gradient(90deg, ${accentColor}07 1px, transparent 1px)`, backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentColor}4d`, background: `${accentColor}1a` }}>
              <TruckIconSvg size={11} style={{ color: accentColor }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-none mb-5"
              style={{ fontSize: 'clamp(2.8rem, 8.5vw, 5.5rem)', letterSpacing: '-0.05em' }}>
              <span className="text-white">{headline1}</span>
              <br />
              <span style={{ WebkitTextStroke: `1.5px ${accentColor}80`, color: 'transparent' }}>{headline2}</span>{' '}
              <span style={{ color: accentColor }}>{headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            <div className="space-y-2.5 mb-8">
              {chips.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${accentColor}33`, border: `1px solid ${accentColor}66` }}>
                    <CheckIconSvg size={9} style={{ color: accentColor }} />
                  </div>
                  <p className="text-slate-300 text-sm">{f}</p>
                </div>
              ))}
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
              <Link href={btn2Href} className="w-full">
                <button className="flex w-full items-center justify-center gap-2 px-7 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all border border-white/10">
                  {btn2Label}
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT — Freight tracker */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s', position: 'relative' }}>
            <div className="relative rounded-3xl overflow-hidden p-5 md:p-6"
              style={{ background: '#060c1c', border: '1px solid rgba(255,255,255,0.07)', boxShadow: `0 0 60px ${accentColor}1a` }}>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-white text-sm font-black">{widgetTitle}</p>
                  <p className="text-slate-600 text-[9px]">{widgetSubtitle}</p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}40` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentColor }} />
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentColor }}>{liveLabel}</span>
                </div>
              </div>

              {/* KPI row */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {kpiStats.map(({ icon, value, label, color }) => {
                  const Icon = KPI_ICON_MAP[icon] ?? ZapIconSvg;
                  return (
                    <div key={label} className="p-2.5 rounded-xl text-center"
                      style={{ background: `${color}0d`, border: `1px solid ${color}26` }}>
                      <Icon size={12} style={{ color, margin: '0 auto 3px' }} />
                      <p className="text-white font-black text-sm">{value}</p>
                      <p className="text-[8px] uppercase tracking-wider" style={{ color }}>{label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Route visualiser */}
              <div className="mb-4 p-3 rounded-xl"
                style={{ background: `${accentColor}0a`, border: `1px solid ${accentColor}1a` }}>
                <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-3">{routeLabel}</p>
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-4 right-4 top-4 h-px"
                    style={{ background: `${accentColor}33` }} />
                  {routeNodes.map((node, i) => (
                    <div key={node.label} className="flex flex-col items-center relative z-10">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 transition-all duration-500"
                        style={{
                          background: nodeActive >= i ? `${node.color}26` : 'rgba(255,255,255,0.04)',
                          border: `2px solid ${nodeActive >= i ? node.color : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: nodeActive >= i ? `0 0 12px ${node.color}66` : 'none',
                        }}>
                        <MapPinIconSvg size={12} style={{ color: nodeActive >= i ? node.color : '#374151' }} />
                      </div>
                      <p className="text-[7px] font-black uppercase"
                        style={{ color: nodeActive >= i ? node.color : '#374151' }}>
                        {node.label}
                      </p>
                      <p className="text-[7px] text-slate-600 truncate max-w-12 text-center">{node.sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipment feed */}
              <div className="space-y-2">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Live Shipments</p>
                {shipments.map((s, i) => (
                  <div key={`${s.id}-${i}`} className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500"
                    style={{
                      background: i === 0 ? `${s.color}0d` : 'rgba(255,255,255,0.02)',
                      border: `1px solid ${i === 0 ? s.color + '4d' : 'rgba(255,255,255,0.04)'}`,
                      opacity: 1 - i * 0.18,
                    }}>
                    <TruckIconSvg size={11} style={{ color: s.color, flexShrink: 0 }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] text-slate-300 truncate font-bold">{s.route}</p>
                      <p className="text-[8px] text-slate-600">{s.id}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-[8px] font-black" style={{ color: s.color }}>{s.status}</p>
                      <p className="text-[8px] text-slate-600">{s.eta}</p>
                    </div>
                  </div>
                ))}
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

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureItems.map((item, i) => {
            const Icon = FEATURE_ICON_MAP[item.icon] ?? Box;
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

      {/* ── FLOW SECTION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img src={flowImageUrl} alt="Global Logistics Hub"
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">{flowHeadline}</h2>
            <div className="space-y-8">
              {flowPoints.map((point, idx) => {
                const Icon = FLOW_ICON_MAP[point.icon] ?? Zap;
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
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
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
                <GlobeIconSvg size={16} style={{ color: '#facc15' }} />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Inventory & Supply chain" productTagline="Predictive Logistics" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default LogisticsSupplyPage;