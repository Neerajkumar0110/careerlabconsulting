'use client';

import React, { useState, useEffect } from 'react';
import { Shield, ArrowRight, TrendingUp, Users, Zap, Wifi, Battery, Clock } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default fallbacks ─────────────────────────────────────────────────────────
const DEFAULT_TRUST_FEATURES = [
  { icon: 'Zap', title: 'Instant Setup', desc: 'Start in 5 minutes' },
  { icon: 'Users', title: 'Multi-User Scale', desc: 'Unlimited agents' },
];

const DEFAULT_STATUS_PILLS = [
  { label: 'Encryption', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  { label: 'IP Masking', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  { label: 'No Threats', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', dot: 'bg-green-400' },
  { label: 'AI Active', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', dot: 'bg-purple-400' },
];

const DEFAULT_SECONDARY_STATS = [
  { label: 'Deployments', value: '200+' },
  { label: 'Uptime', value: '99.97%' },
];

const Dot = ({ color = 'bg-red-500' }) => (
  <span className={`w-2.5 h-2.5 rounded-full ${color} inline-block`} />
);

const MetricBar = ({
  label,
  value,
  pct,
  color,
}: {
  label: string;
  value: string | number;
  pct: number;
  color: string;
}) => (
  <div className="space-y-0.5">
    <div className="flex justify-between text-[9px] md:text-[11px] font-mono">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-[2s] ease-out"
        style={{ width: `${pct}%`, background: color, boxShadow: `0 0 6px ${color}` }}
      />
    </div>
  </div>
);

interface TerminalLineProps {
  text: string;
  type?: 'info' | 'success' | 'warn' | 'sys';
  delay?: number;
}

const TerminalLine = ({
  text,
  type = 'info',
  delay = 0,
}: TerminalLineProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  const colors: Record<NonNullable<TerminalLineProps['type']>, string> = {
    info: 'text-blue-400',
    success: 'text-green-400',
    warn: 'text-yellow-400',
    sys: 'text-slate-500',
  };

  return (
    <div
      className={`font-mono text-[9px] md:text-[11px] leading-4 transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-x-0'
          : 'opacity-0 -translate-x-2'
      } ${colors[type]}`}
    >
      <span className="text-slate-600 select-none mr-1.5">›</span>
      {text}
    </div>
  );
};

interface GaugeProps {
  pct: number;
  label: string;
  color: string;
}

const Gaugev2 = ({ pct, label, color }: GaugeProps) => {
  const r = 17;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="42" height="42" viewBox="0 0 42 42">
        <circle
          cx="21"
          cy="21"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="3.5"
        />
        <circle
          cx="21"
          cy="21"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 21 21)"
          style={{
            filter: `drop-shadow(0 0 3px ${color})`,
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
        <text
          x="21"
          y="25"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          {pct}%
        </text>
      </svg>
      <span className="text-[8px] text-slate-500 font-mono uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

const Gauge = ({ pct, label, color }: GaugeProps) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="4"
        />
        <circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
        <text
          x="28"
          y="32"
          textAnchor="middle"
          fontSize="10"
          fontWeight="bold"
          fill="white"
          fontFamily="monospace"
        >
          {pct}%
        </text>
      </svg>
      <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
};

interface SparklineProps {
  values: number[];
  color?: string;
  isMobile?: boolean;
}

const Sparklinev2 = ({ values, color = '#3b82f6', isMobile = false }: SparklineProps) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const w = isMobile ? 120 : 180;
  const h = 32;
  const n = values.length;

  const pts = values
    .map((v: number, i: number) => {
      const x = (i / (n - 1)) * w;
      const y = h - ((v - min) / (max - min || 1)) * h;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="overflow-visible">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 3px ${color})` }}
      />
    </svg>
  );
};

export default function TrustSection() {
  const [tick, setTick] = useState(0);
  const [time, setTime] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const { get } = usePageContent('trust-section');

  // ── CMS values ────────────────────────────────────────────────────────────
  const badgeText = get('header', 'badge_text', 'Autonomous Operations');
  const headline1 = get('header', 'headline_1', 'Plug. Deploy.');
  const headline2 = get('header', 'headline_2', 'Scale Instantly.');
  const bodyText = get('header', 'body_text', 'Our suite of AI products integrates seamlessly into your business.');
  const trustFeaturesRaw = get('header', 'trust_features_json', JSON.stringify(DEFAULT_TRUST_FEATURES));
  const trustFeatures = safeParse<typeof DEFAULT_TRUST_FEATURES>(trustFeaturesRaw, DEFAULT_TRUST_FEATURES);
  const ctaButtonLabel = get('header', 'cta_button_label', 'Automate Your Business');
  const whatsappNumber = get('header', 'whatsapp_number', '918700236923');
  const whatsappMessage = get('header', 'whatsapp_message', "Hello, I'm interested in automating my business.");
  const accentColor = get('header', 'accent_color', '#3b82f6');

  const shieldBadgeLabel = get('monitor', 'shield_badge_label', 'Auto-Shield');
  const shieldBadgeVersion = get('monitor', 'shield_badge_version', 'v3.0 Active');
  const dashboardTitle = get('monitor', 'dashboard_title', 'auto-shield.dashboard');
  const roiPercentage = get('monitor', 'roi_percentage', '+248%');
  const roiChange = get('monitor', 'roi_change', '↑ 12.4% this week');
  const uptimePercentage = parseInt(get('monitor', 'uptime_percentage', '97'));
  const performancePercentage = parseInt(get('monitor', 'performance_percentage', '82'));
  const securityPercentage = parseInt(get('monitor', 'security_percentage', '88'));
  const costReduction = get('monitor', 'cost_reduction', '−35%');
  const taskAutomation = get('monitor', 'task_automation', '91%');
  const responseLatency = get('monitor', 'response_latency', '18 ms');
  const threatIntercept = get('monitor', 'threat_intercept', '100%');
  const statusPillsRaw = get('monitor', 'status_pills_json', JSON.stringify(DEFAULT_STATUS_PILLS));
  const statusPills = safeParse<typeof DEFAULT_STATUS_PILLS>(statusPillsRaw, DEFAULT_STATUS_PILLS);
  const liveBadgeText = get('monitor', 'live_badge_text', 'All Systems Normal');

  const uspLiveLabel = get('usp_banner', 'live_label', 'Verified Result');
  const uspPercentage = get('usp_banner', 'percentage', '40');
  const uspHeadline = get('usp_banner', 'headline', 'Cost Reduction');
  const uspSubheading = get('usp_banner', 'subheading', 'Average enterprise saving across 200+ deployments');
  const secondaryStatsRaw = get('usp_banner', 'secondary_stats_json', JSON.stringify(DEFAULT_SECONDARY_STATS));
  const secondaryStats = safeParse<typeof DEFAULT_SECONDARY_STATS>(secondaryStatsRaw, DEFAULT_SECONDARY_STATS);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    update();
    const id = setInterval(() => { update(); setTick(t => t + 1); }, 1000);
    return () => clearInterval(id);
  }, []);

  const roiData = [42, 71, 59, 88, 76, 102, 91, 118, 109, 137, 126, 152, 169, 158, 192, 210, 198, 235];

  const iconMap: Record<string, React.ReactNode> = {
    Zap: <Zap className="w-5 h-5 text-yellow-400" />,
    Users: <Users className="w-5 h-5 text-green-400" />,
  };

  return (
    <section className="py-12 md:py-20 bg-[#020617] relative overflow-hidden" aria-labelledby="trust-heading">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[150px] rounded-full -mr-48 -mt-48 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LHS ── */}
          <div className="space-y-6 order-2 lg:order-1">
            <header>
              <span className="inline-block bg-blue-500/10 text-blue-400 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-widest">
                {badgeText}
              </span>
              <h2 id="trust-heading" className="text-4xl sm:text-5xl md:text-6xl font-black text-white mt-4 leading-[1.1] tracking-tight">
                {headline1} <br />
                <span className="text-blue-500">{headline2}</span>
              </h2>
              <p className="text-slate-400 text-base mt-4 max-w-lg leading-relaxed">
                {bodyText}
              </p>
            </header>

            <div className="grid grid-cols-2 gap-3">
              {trustFeatures.map((item, i) => (
                <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-xl flex items-start gap-3 hover:bg-white/[0.05] transition-colors">
                  <div className="p-1.5 bg-white/5 rounded-lg shrink-0">{iconMap[item.icon] || iconMap.Zap}</div>
                  <div>
                    <h3 className="text-white font-bold text-xs">{item.title}</h3>
                    <p className="text-slate-500 text-[10px] mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                className='w-full'
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  aria-label="Automate and scale your enterprise"
                  className="w-full sm:w-auto px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 group active:scale-95 text-sm"
                  style={{ backgroundColor: accentColor }}
                >
                  {ctaButtonLabel}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
            </div>
          </div>

          {/* ── RHS — monitor mockup ── */}
          <div className="relative order-1 lg:order-2 flex flex-col items-center px-2 sm:px-0">
            <div className="absolute inset-0 bg-blue-500/8 blur-[80px] rounded-full pointer-events-none" />

            {/* floating badge top-right */}
            <div className="absolute top-0 right-0 sm:-top-3 sm:-right-3 bg-[#0b1628] border border-blue-500/30 rounded-xl px-2.5 py-2 shadow-2xl shadow-blue-900/40 backdrop-blur-xl z-20">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Shield className="w-3 h-3 text-blue-400" />
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] text-slate-500 font-mono uppercase tracking-wider leading-none">{shieldBadgeLabel}</p>
                  <p className="text-[10px] md:text-[12px] text-white font-bold leading-none mt-0.5">{shieldBadgeVersion}</p>
                </div>
              </div>
            </div>

            {/* monitor bezel */}
            <div className="relative w-full max-w-[480px] mt-8 sm:mt-4">
              <div
                className="relative rounded-[14px] overflow-hidden border border-white/[0.12]"
                style={{
                  background: 'linear-gradient(145deg,#0f172a,#0a0f1e)',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.7), 0 0 50px rgba(59,130,246,0.07)',
                }}
              >
                {/* title bar */}
                <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.07]"
                  style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-1.5">
                    <Dot color="bg-red-500" />
                    <Dot color="bg-yellow-500" />
                    <Dot color="bg-green-500" />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                    <Shield className="w-2.5 h-2.5 text-blue-400 shrink-0" />
                    <span className="text-[9px] font-mono text-slate-400 tracking-wide hidden md:inline">
                      {dashboardTitle}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 tracking-wide md:hidden">
                      dashboard
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Wifi className="w-3 h-3 text-green-400" />
                    <div className="hidden sm:flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span className="text-[9px] md:text-[10px] font-mono text-slate-400 w-14">{time}</span>
                    </div>
                  </div>
                </div>

                {/* dashboard body */}
                <div className="relative p-3 sm:p-4 space-y-2.5 overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 z-20"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg,rgba(0,0,0,0.07) 0px,rgba(0,0,0,0.07) 1px,transparent 1px,transparent 3px)' }} />

                  {/* row 1: ROI + gauges */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="rounded-lg border border-white/[0.07] p-3 relative overflow-hidden"
                      style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.12),rgba(59,130,246,0.03))' }}>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-2xl rounded-full" />
                      <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-0.5">Est. ROI</p>
                      <span className="text-xl font-black text-white leading-none tracking-tight">{roiPercentage}</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <TrendingUp className="w-2.5 h-2.5 text-green-400" />
                        <span className="text-[8px] md:text-[9px] text-green-400 font-mono">{roiChange}</span>
                      </div>
                      <div className="mt-2">
                        <Sparklinev2 values={roiData} color="#3b82f6" isMobile={isMobile} />
                      </div>
                    </div>

                    <div className="rounded-lg border border-white/[0.07] p-3 flex flex-col justify-between"
                      style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">System Health</p>
                      <div className="flex justify-around items-center">
                        {isMobile ? (
                          <>
                            <Gaugev2 pct={uptimePercentage} label="Uptime" color="#22c55e" />
                            <Gaugev2 pct={performancePercentage} label="Perf" color="#3b82f6" />
                            <Gaugev2 pct={securityPercentage} label="Secure" color="#a78bfa" />
                          </>
                        ) : (
                          <>
                            <Gauge pct={uptimePercentage} label="Uptime" color="#22c55e" />
                            <Gauge pct={performancePercentage} label="Perf" color="#3b82f6" />
                            <Gauge pct={securityPercentage} label="Secure" color="#a78bfa" />
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* row 2: metric bars */}
                  <div className="rounded-lg border border-white/[0.07] p-3 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Performance Metrics</p>
                    <MetricBar label="Cost Reduction" value={costReduction} pct={65} color="#22c55e" />
                    <MetricBar label="Task Automation" value={taskAutomation} pct={91} color="#3b82f6" />
                    <MetricBar label="Response Latency" value={responseLatency} pct={88} color="#a78bfa" />
                    <MetricBar label="Threat Intercept" value={threatIntercept} pct={100} color="#f59e0b" />
                  </div>

                  {/* row 3: terminal */}
                  <div className="rounded-lg border border-white/[0.07] p-3"
                    style={{ background: 'rgba(0,0,0,0.35)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[8px] md:text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live System Log</p>
                      <span className="flex items-center gap-1 text-[8px] font-mono text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                        LIVE
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      <TerminalLine text={`${shieldBadgeVersion} initialised — all modules active`} type="sys" delay={100} />
                      <TerminalLine text="Encryption AES-256 ✓ verified" type="success" delay={400} />
                      <div className="hidden sm:block">
                        <TerminalLine text="IP masking relay connected to 14 nodes" type="info" delay={750} />
                        <TerminalLine text="Threat scan complete — 0 anomalies" type="success" delay={1100} />
                        <TerminalLine text="AI engine: 1,247 tasks dispatched" type="info" delay={1450} />
                      </div>
                      <TerminalLine text={`Heartbeat #${(tick % 9999).toString().padStart(4,'0')} — nominal`} type="sys" delay={0} />
                    </div>
                  </div>

                  {/* row 4: status pills */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {statusPills.map((s) => (
                      <div key={s.label}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full border ${s.bg} ${s.border}`}>
                        <span className={`w-1 h-1 rounded-full ${s.dot} animate-pulse`} />
                        <span className={`text-[8px] md:text-[10px] font-mono font-bold ${s.color}`}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
                  style={{ background: 'linear-gradient(to top,rgba(59,130,246,0.04),transparent)' }} />
              </div>

              {/* stand */}
              <div className="flex justify-center">
                <div className="w-12 h-4 relative">
                  <div className="absolute inset-x-3 top-0 bottom-0 bg-gradient-to-b from-[#1e293b] to-[#0f172a] rounded-b-sm" />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="h-1.5 w-24 rounded-full"
                  style={{ background: 'linear-gradient(90deg,transparent,#1e293b,#334155,#1e293b,transparent)' }} />
              </div>
              <div className="mt-1 mx-8 h-4 rounded-[50%] blur-xl opacity-20"
                style={{ background: 'linear-gradient(90deg,transparent,#3b82f6,transparent)' }} />
            </div>

            {/* floating badge bottom-left */}
            <div className="absolute bottom-6 -left-1 sm:-left-3 bg-[#0b1628] border border-green-500/30 rounded-xl px-2.5 py-2 shadow-2xl backdrop-blur-xl z-20">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
                <p className="text-[10px] text-white font-bold">{liveBadgeText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}