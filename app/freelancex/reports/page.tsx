// app/freelancex/reports/page.tsx

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3, Activity, TrendingUp, Download,
  Clock, ShieldCheck, Cpu, Terminal, ArrowRight,
  Wallet, History,
} from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon map ──────────────────────────────────────────────────────────────────

const ICON_MAP: Record<string, any> = {
  Wallet, Cpu, ShieldCheck, Clock, BarChart3, Activity,
  TrendingUp, Download, Terminal, ArrowRight, History,
};
function resolveIcon(name: string) {
  return ICON_MAP[name] ?? BarChart3;
}

// ── Default fallbacks ─────────────────────────────────────────────────────────

const DEFAULT_KPIS = [
  { label: 'Gross Liquidity', val: '$482,500', icon: 'Wallet',      color: 'text-emerald-400' },
  { label: 'Network Nodes',   val: '1,240',    icon: 'Cpu',         color: 'text-blue-400'    },
  { label: 'Active Escrows',  val: '₹14.2L',   icon: 'ShieldCheck', color: 'text-indigo-400'  },
  { label: 'Vetting Queue',   val: '42',        icon: 'Clock',       color: 'text-amber-400'   },
];

const DEFAULT_NODES = [
  { name: 'Node_JS_Architect', perf: 98, status: 'Active'  },
  { name: 'Rust_Core_Engine',  perf: 94, status: 'Vetting' },
  { name: 'NextJS_FullStack',  perf: 91, status: 'Active'  },
  { name: 'Python_ML_Pod',     perf: 88, status: 'Idle'    },
];

const DEFAULT_LEDGER = [
  { event: 'Escrow_Released', id: 'TX-9921', val: '+$1,200',   time: '2m ago'  },
  { event: 'Node_Activated',  id: 'HX-4401', val: 'N/A',       time: '14m ago' },
  { event: 'Audit_Certified', id: 'AC-1120', val: 'Score: 98', time: '1h ago'  },
];

const DEFAULT_MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
const DEFAULT_CHART_DATA = [30,50,40,80,60,90,45,100,70,85,55,95];
const DEFAULT_SEC_BADGES = [
  { label: 'E2E Encryption', value: 'AES-256 Active' },
  { label: 'Biometric Hash', value: 'Protocol v4'    },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const { get } = usePageContent('freelancex-reports');
  const [activeRange, setActiveRange] = useState('30D');

  // ── CMS values ──────────────────────────────────────────────────────────

  // Header
  const consoleTitle   = get('header', 'title',         'Intelligence Console');
  const protocolText   = get('header', 'protocol',      'Protocol v4.2 // Status: Nominal');
  const exportLabel    = get('header', 'export_label',  'Export CSV');
  const accentColor    = get('header', 'accent_color',  '#3b82f6');

  // KPIs
  const kpiItems = safeParse(get('kpis', 'items_json', ''), DEFAULT_KPIS);

  // Talent Grade
  const talentTitle  = get('talent_grade', 'title',      'Talent Grade Map');
  const nodesData    = safeParse(get('talent_grade', 'nodes_json', ''), DEFAULT_NODES);
  const ledgerCta    = get('talent_grade', 'cta_label',  'Open Vetting Ledger');

  // Sprint Chart
  const chartTitle   = get('sprint_chart', 'title',       'Sprint Velocity Telemetry');
  const liveLabel    = get('sprint_chart', 'live_label',  'LIVE_SYNC');
  const chartMonths  = safeParse(get('sprint_chart', 'months_json', ''), DEFAULT_MONTHS);
  const chartData    = safeParse(get('sprint_chart', 'data_json',   ''), DEFAULT_CHART_DATA);

  // Ledger Feed
  const feedTitle    = get('ledger_feed', 'title',        'Transactional Feed');
  const ledgerItems  = safeParse(get('ledger_feed', 'ledger_json', ''), DEFAULT_LEDGER);
  const feedExport   = get('ledger_feed', 'export_label', 'Full Audit Export');

  // Security
  const secHeadline  = get('security', 'headline',        'Trust');
  const secAccent    = get('security', 'headline_accent', 'Automated.');
  const secBody      = get('security', 'body_text',       'Every milestone payment and code commit is logged via cryptographic neural hashes.');
  const secBadges    = safeParse(get('security', 'badges_json', ''), DEFAULT_SEC_BADGES);
  const termLine1    = get('security', 'terminal_line1',  '// INITIALIZING_SECURITY_AUDIT...');
  const termLine2    = get('security', 'terminal_line2',  '> IDENTITY_VERIFIED: [SUCCESS]');
  const termPulse    = get('security', 'terminal_pulse',  '> ESCROW_STATE: SECURE_LOCKED');

  // CTA
  const ctaHeadline  = get('cta', 'headline',   'Scale Your Analytics.');
  const ctaBtnLabel  = get('cta', 'btn_label',  'Request Full Report');

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-28 lg:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] blur-[150px] rounded-full pointer-events-none -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none -z-10"
          style={{ background: `${accentColor}0d` }} />

        <div className="max-w-7xl mx-auto space-y-8">

          {/* ── HEADER BAR ──────────────────────────────────────────────────── */}
          <section className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 bg-[#0a0f1d]/60 border border-white/5 p-6 rounded-[2rem] backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center border"
                style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
                <BarChart3 size={24} style={{ color: accentColor }} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">{consoleTitle}</h1>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">{protocolText}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {['24H', '7D', '30D', '1Y'].map(range => (
                <button
                  key={range}
                  onClick={() => setActiveRange(range)}
                  className={`px-6 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all ${activeRange === range ? 'bg-white text-black shadow-lg shadow-white/10' : 'bg-white/5 text-slate-500 hover:text-white'}`}
                >
                  {range}
                </button>
              ))}
              <div className="h-8 w-px bg-white/10 mx-2" />
              <button
                className="flex items-center gap-2 px-6 py-2.5 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 shadow-xl"
                style={{ background: accentColor }}
              >
                <Download size={14} /> {exportLabel}
              </button>
            </div>
          </section>

          {/* ── KPIs + TALENT MAP ────────────────────────────────────────────── */}
          <section className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {kpiItems.map((s: typeof DEFAULT_KPIS[0], i: number) => {
                const Icon = resolveIcon(s.icon);
                return (
                  <motion.div key={i} whileHover={{ y: -5 }}
                    className="bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                      <Icon size={120} />
                    </div>
                    <Icon className={`${s.color} mb-6`} size={28} />
                    <h3 className="text-3xl font-black text-white mb-1 tracking-tight">{s.val}</h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{s.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="lg:col-span-4 bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full" style={{ background: `${accentColor}1a` }} />
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                <TrendingUp size={16} className="text-emerald-400" /> {talentTitle}
              </h3>
              <div className="space-y-6 flex-grow">
                {nodesData.map((node: typeof DEFAULT_NODES[0], i: number) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-300 font-mono group-hover:transition-colors" style={{ transition: 'color 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = accentColor)}
                        onMouseLeave={e => (e.currentTarget.style.color = '')}>
                        {node.name}
                      </span>
                      <span className="text-[9px] font-bold text-slate-600 uppercase mt-1">{node.status}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-black text-white">{node.perf}%</span>
                      <div className="w-16 h-1 bg-white/5 rounded-full mt-1">
                        <div className="h-full rounded-full" style={{ width: `${node.perf}%`, background: accentColor }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {ledgerCta}
              </button>
            </div>
          </section>

          {/* ── CHART + LEDGER FEED ──────────────────────────────────────────── */}
          <section className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8 shadow-3xl">
              <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
                  <Activity style={{ color: accentColor }} /> {chartTitle}
                </h3>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> {liveLabel}
                </div>
              </div>
              <div className="h-[300px] w-full flex items-end justify-between gap-2 sm:gap-4">
                {chartData.map((h: number, i: number) => (
                  <div key={i} className="w-full relative group cursor-crosshair">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full rounded-t-xl transition-all"
                      style={{
                        background: `linear-gradient(to top, ${accentColor}0d, ${accentColor}33, ${accentColor})`,
                      }}
                    />
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[9px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all z-20">
                      {h}%
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-8 border-t border-white/5 pt-6 text-[10px] font-black text-slate-600 uppercase tracking-widest overflow-x-auto no-scrollbar gap-8">
                {chartMonths.map((m: string) => <span key={m}>{m}</span>)}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] p-8 h-full">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 flex items-center gap-2">
                  <History size={16} style={{ color: accentColor }} /> {feedTitle}
                </h3>
                <div className="space-y-6">
                  {ledgerItems.map((log: typeof DEFAULT_LEDGER[0], i: number) => (
                    <div key={i} className="flex items-start justify-between border-b border-white/5 pb-4 last:border-0">
                      <div className="space-y-1">
                        <p className="text-[11px] font-bold text-white tracking-tight">{log.event}</p>
                        <p className="text-[9px] font-medium text-slate-500 font-mono">{log.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-black" style={{ color: accentColor }}>{log.val}</p>
                        <p className="text-[9px] font-bold text-slate-600 uppercase">{log.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="w-full mt-10 py-4 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all"
                  style={{ borderColor: `${accentColor}33`, background: `${accentColor}0d`, color: accentColor, border: `1px solid ${accentColor}33` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentColor; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = `${accentColor}0d`; (e.currentTarget as HTMLButtonElement).style.color = accentColor; }}
                >
                  {feedExport}
                </button>
              </div>
            </div>
          </section>

          {/* ── SECURITY SECTION ─────────────────────────────────────────────── */}
          <section
            className="border border-white/10 rounded-[3rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative shadow-2xl"
            style={{ background: 'linear-gradient(to right, #0a0f1d, #050b1d)' }}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <div className="relative z-10 lg:w-1/2">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-8">
                <ShieldCheck className="text-emerald-500" size={24} />
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight mb-6">
                {secHeadline} <br />
                <span className="text-emerald-400 italic">{secAccent}</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">{secBody}</p>
              <div className="grid grid-cols-2 gap-4">
                {secBadges.map((badge: typeof DEFAULT_SEC_BADGES[0], i: number) => (
                  <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest block mb-1">{badge.label}</span>
                    <span className="text-sm font-bold">{badge.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:w-5/12 w-full relative">
              <div className="absolute inset-0 blur-[100px] rounded-full" style={{ background: `${accentColor}1a` }} />
              <div className="relative bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                <Terminal style={{ color: accentColor }} className="mb-6" size={24} />
                <div className="font-mono text-[11px] space-y-3 text-slate-400">
                  <p style={{ color: accentColor }}>{termLine1}</p>
                  <p>&gt; IP_ORIGIN: 24.11.231.84</p>
                  <p>{termLine2}</p>
                  <p className="animate-pulse text-emerald-400">{termPulse}</p>
                  <p className="pt-4 text-slate-600 font-bold uppercase tracking-widest text-[9px]">Event_Signature_Verified</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
          <section className="text-center py-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6">{ctaHeadline}</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                className="w-full sm:w-auto px-10 py-5 font-black uppercase text-[10px] tracking-[0.3em] rounded-2xl shadow-xl flex items-center justify-center gap-2 transition-all"
                style={{ background: '#fff', color: '#0f172a' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentColor; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#0f172a'; }}
              >
                {ctaBtnLabel} <ArrowRight size={14} />
              </button>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}