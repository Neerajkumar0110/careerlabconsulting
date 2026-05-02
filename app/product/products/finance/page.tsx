'use client';

import React, { CSSProperties, FC, RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import SuccessStories from '@/components/product/SuccessStories';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Wallet, Landmark, Receipt, ShieldCheck, BarChart4, PieChart,
  Zap, Globe2, TrendingUp, Users, Brain, Star, Layers, Cpu,
  Database, Activity, Bell, MessageSquare, Settings, Lock,
  Rocket, BarChart3, Target, Mail, FileText, RefreshCcw,
  Globe, ArrowRight, Check,
} from 'lucide-react';

// ─── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Wallet, Landmark, Receipt, ShieldCheck, BarChart4, PieChart,
  Zap, Globe2, TrendingUp, Users, Brain, Star, Layers, Cpu,
  Database, Activity, Bell, MessageSquare, Settings, Lock,
  Rocket, BarChart3, Target, Mail, FileText, RefreshCcw,
  Globe, ArrowRight, Check,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface MiniFeatureItem  { icon: string; title: string; desc: string }
interface FeatureCardItem  { icon: string; title: string; desc: string }
interface TransactionItem  { id: string; desc: string; amount: string; flag: string; color_key: string }
interface ComplianceBadge  { label: string }
interface LedgerStatItem   { label: string; value: string; color_key: string }
interface BarItem          { height: number }
interface FiscalPointItem  { icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_MINI_FEATURES: MiniFeatureItem[] = [
  { icon: 'ShieldCheck', title: 'SOC2 Compliant',      desc: 'Bank-grade security' },
  { icon: 'RefreshCcw',  title: 'Auto Reconciliation',  desc: 'Zero manual effort'  },
  { icon: 'Globe',       title: '140+ Currencies',      desc: 'Global reach'        },
  { icon: 'TrendingUp',  title: 'Real-time Audit',      desc: 'Instant accuracy'    },
];
const DEFAULT_FEATURE_CARDS: FeatureCardItem[] = [
  { icon: 'PieChart',   title: 'Autonomous Ledger',   desc: 'Self-correcting accounting systems that reconcile every transaction in real-time across global entities.' },
  { icon: 'ShieldCheck',title: 'Smart Compliance',    desc: 'Automated tax logic and regulatory monitoring for over 150+ jurisdictions instantly.'                      },
  { icon: 'Receipt',    title: 'Revenue Operations',  desc: 'Streamline high-volume commerce with AI-driven fraud detection and dynamic billing cycles.'               },
];
const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  { id: 'TX-9941', desc: 'Invoice reconciliation', amount: '+$24,800',    flag: 'MATCHED', color_key: 'green'  },
  { id: 'TX-9940', desc: 'Global transfer: EU→US', amount: '$142,000',    flag: 'CLEARED', color_key: 'from'   },
  { id: 'TX-9939', desc: 'Automated audit pass',   amount: '4,200 items', flag: 'AUDITED', color_key: 'to'     },
  { id: 'TX-9938', desc: 'Commerce order batch',   amount: '$8,340',      flag: 'SETTLED', color_key: 'green'  },
  { id: 'TX-9937', desc: 'Payroll disbursement',   amount: '$1.2M',       flag: 'DONE',    color_key: 'from'   },
  { id: 'TX-9936', desc: 'FX conversion: JPY→USD', amount: '¥18.4M',     flag: 'LIVE',    color_key: 'yellow' },
];
const DEFAULT_COMPLIANCE_BADGES: ComplianceBadge[] = [
  { label: 'SOC2'     },
  { label: 'PCI-DSS'  },
  { label: 'ISO 27001'},
  { label: 'GDPR'     },
];
const DEFAULT_LEDGER_STATS: LedgerStatItem[] = [
  { label: 'Total Volume Processed', value: '$0.00M',  color_key: 'white' },
  { label: 'Accuracy',               value: '99.97%',  color_key: 'from'  },
];
const DEFAULT_BARS: BarItem[] = [
  { height: 55 }, { height: 72 }, { height: 48 }, { height: 91 }, { height: 63 },
  { height: 85 }, { height: 77 }, { height: 94 }, { height: 68 }, { height: 100 },
];
const DEFAULT_FISCAL_POINTS: FiscalPointItem[] = [
  { icon: 'BarChart4',   title: 'Predictive Cashflow',   desc: 'Forecast liquidity with neural modeling based on historical market volatility.'     },
  { icon: 'Wallet',      title: 'Universal Settlement',  desc: 'Automate cross-border payments with instant fiat-to-digital conversions.'           },
  { icon: 'ShieldCheck', title: 'Audit-Ready Logs',      desc: 'Immutable transaction logs designed for enterprise-grade transparency.'             },
];

// ─── Fade-in hook ──────────────────────────────────────────────────────────────
function useFadeIn(): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function FinanceCommercePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ref, visible] = useFadeIn();
  const { get, content } = usePageContent('finance-&-commerce');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ────────────────────────────────────────────────────────────────────
  const heroBadge     = get('hero', 'badge_text',      'Automated Ledger & Commerce');
  const heroHead1     = get('hero', 'headline_1',      'FINANCE');
  const heroHead2     = get('hero', 'headline_2',      '&');
  const heroHead3     = get('hero', 'headline_3',      'COMMERCE');
  const heroBody      = get('hero', 'body',            'Engineered for fiscal precision. Deploy autonomous financial agents to handle real-time auditing, automated reconciliation, and global commerce operations.');
  const heroBtn1      = get('hero', 'btn_1_label',     'Integrate Ledger');
  const heroBtn2      = get('hero', 'btn_2_label',     'WhatsApp Demo');
  const heroWA        = get('hero', 'whatsapp_number', '919810984968');
  const accentFrom    = get('hero', 'accent_from',     '#2563eb');
  const accentTo      = get('hero', 'accent_to',       '#6366f1');
  const miniFeatsRaw  = get('hero', 'mini_features_json', JSON.stringify(DEFAULT_MINI_FEATURES));
  const miniFeatures  = safeParse<MiniFeatureItem[]>(miniFeatsRaw, DEFAULT_MINI_FEATURES);

  // ── Ledger Card ─────────────────────────────────────────────────────────────
  const ledgerTitle   = get('ledger_card', 'title',          'Autonomous Ledger');
  const ledgerSub     = get('ledger_card', 'subtitle',       'Real-time · Global Operations');
  const ledgerBadge   = get('ledger_card', 'badge_text',     'Live Reconciling');
  const ledgerStatsRaw= get('ledger_card', 'stats_json',     JSON.stringify(DEFAULT_LEDGER_STATS));
  const ledgerStats   = safeParse<LedgerStatItem[]>(ledgerStatsRaw, DEFAULT_LEDGER_STATS);
  const barsRaw       = get('ledger_card', 'bars_json',      JSON.stringify(DEFAULT_BARS));
  const bars          = safeParse<BarItem[]>(barsRaw, DEFAULT_BARS);
  const txRaw         = get('ledger_card', 'transactions_json', JSON.stringify(DEFAULT_TRANSACTIONS));
  const txPool        = safeParse<TransactionItem[]>(txRaw, DEFAULT_TRANSACTIONS);
  const badgesRaw     = get('ledger_card', 'compliance_badges_json', JSON.stringify(DEFAULT_COMPLIANCE_BADGES));
  const complianceBadges = safeParse<ComplianceBadge[]>(badgesRaw, DEFAULT_COMPLIANCE_BADGES);
  const encryptedLabel= get('ledger_card', 'encrypted_label', 'Encrypted');

  // ── Feature Cards ───────────────────────────────────────────────────────────
  const featureCardsRaw = get('features', 'items_json', JSON.stringify(DEFAULT_FEATURE_CARDS));
  const featureCards    = safeParse<FeatureCardItem[]>(featureCardsRaw, DEFAULT_FEATURE_CARDS);

  // ── Fiscal Section ──────────────────────────────────────────────────────────
  const fiscalHead    = get('fiscal_section', 'headline',  'Next-Gen Fiscal Clarity');
  const fiscalImg     = get('fiscal_section', 'image_url', 'https://images.pexels.com/photos/53621/calculator-calculation-insurance-finance-53621.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  const fiscalRaw     = get('fiscal_section', 'items_json', JSON.stringify(DEFAULT_FISCAL_POINTS));
  const fiscalPoints  = safeParse<FiscalPointItem[]>(fiscalRaw, DEFAULT_FISCAL_POINTS);

  // ── CTA Banner ──────────────────────────────────────────────────────────────
  const ctaHead  = get('cta_banner', 'headline',  'FINALIZE PRECISION');
  const ctaBody  = get('cta_banner', 'body',      'Our financial architects are ready to automate your commerce stack.');
  const ctaBtn   = get('cta_banner', 'btn_label', 'SECURE ACCESS');
  const ctaPhone = get('cta_banner', 'phone',     '+91 870023 6923');

  // ── Live transaction animation ───────────────────────────────────────────────
  const [txList, setTxList] = useState<TransactionItem[]>([]);
  const [volumeRaw, setVolumeRaw] = useState(0);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (txPool.length) setTxList(txPool.slice(0, 4));
  }, [txRaw]);

  useEffect(() => {
    if (!visible || !txPool.length) return;
    let idx = 4;
    const iv = setInterval(() => {
      setTxList(l => [txPool[idx % txPool.length], ...l.slice(0, 4)]);
      setVolumeRaw(v => v + Math.floor(Math.random() * 120000 + 40000));
      setPulse(true);
      setTimeout(() => setPulse(false), 300);
      idx++;
    }, 2000);
    return () => clearInterval(iv);
  }, [visible, txRaw]);

  // ── Derived theme ────────────────────────────────────────────────────────────
  const btnShadow = `0 0 40px ${accentFrom}66`;

  // Resolve a color_key in transaction/stat items to a real hex
  function resolveColor(colorKey: string): string {
    if (colorKey === 'to')     return accentTo;
    if (colorKey === 'green')  return '#34d399';
    if (colorKey === 'yellow') return '#fbbf24';
    if (colorKey === 'white')  return '#ffffff';
    return accentFrom; // 'from' or default
  }

  // Display volume counter (starts at 0, increments via animation)
  const displayVolume = `$${(volumeRaw / 1e6).toFixed(2)}M`;

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
        <section
          ref={ref as RefObject<HTMLElement>}
          className="relative min-h-screen flex items-center overflow-hidden bg-[#030810] px-5 sm:px-8 lg:px-14 py-20 pt-28"
        >
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 50% at 15% 50%, ${accentFrom}0f 0%, transparent 70%)` }} />
          <div className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: `radial-gradient(circle, ${accentFrom} 0%, transparent 70%)`, filter: 'blur(100px)', opacity: 0.08 }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ backgroundImage: `radial-gradient(${accentFrom}1a 1px, transparent 1px)`, backgroundSize: '36px 36px', opacity: 0.2 }} />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ border: `1px solid ${accentFrom}4d`, background: `${accentFrom}1a` }}>
                <Landmark className="w-3 h-3" style={{ color: accentFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-none mb-5"
                style={{ fontSize: 'clamp(3rem,8.5vw,6.5rem)', letterSpacing: '-0.05em' }}>
                <span className="text-white">{heroHead1}</span>{' '}
                <span style={{ color: accentFrom }}>{heroHead2}</span>
                <br />
                <span style={{ WebkitTextStroke: `2px ${accentFrom}80`, color: 'transparent' }}>{heroHead3}</span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

              {/* Mini feature grid */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                {miniFeatures.map((f, i) => {
                  const Icon = resolveIcon(f.icon);
                  return (
                    <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${accentFrom}26`, border: `1px solid ${accentFrom}4d` }}>
                        <Icon size={12} style={{ color: accentFrom }} />
                      </div>
                      <div>
                        <p className="text-white text-[10px] font-black">{f.title}</p>
                        <p className="text-slate-600 text-[9px]">{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                  style={{ background: accentFrom, boxShadow: btnShadow }}
                  onClick={() => setModalOpen(true)}
                >
                  {heroBtn1}
                  <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/${heroWA}?text=${encodeURIComponent("Hello! I'm interested in Finance Suite and would like to see security protocols.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366] bg-white/5 hover:bg-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  {heroBtn2}
                </a>
              </div>
            </div>

            {/* Right — Live Ledger Card */}
            {sectionVisible('ledger_card') && (
              <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
                <div className="relative bg-[#060c1c] border border-white/[0.07] rounded-3xl overflow-hidden"
                  style={{ boxShadow: `0 0 60px ${accentFrom}1a` }}>

                  {/* Card header */}
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
                    <div>
                      <p className="text-white text-sm font-black">{ledgerTitle}</p>
                      <p className="text-slate-600 text-[9px]">{ledgerSub}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300`}
                      style={{
                        background: pulse ? `${accentFrom}26` : `${accentFrom}1a`,
                        borderColor: pulse ? `${accentFrom}80` : `${accentFrom}40`,
                      }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentFrom }} />
                      <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentFrom }}>{ledgerBadge}</span>
                    </div>
                  </div>

                  {/* Volume + sparkbar */}
                  <div className="px-5 pt-4 pb-2">
                    <div className="flex items-end justify-between mb-2">
                      {ledgerStats.map((s, i) => (
                        <div key={i} className={i > 0 ? 'text-right' : ''}>
                          <p className="text-[9px] text-slate-600 uppercase tracking-widest">{s.label}</p>
                          <p className="font-black text-xl"
                            style={{ color: s.color_key === 'white' ? '#fff' : s.color_key === 'from' ? accentFrom : accentTo }}>
                            {i === 0 ? displayVolume : s.value}
                          </p>
                        </div>
                      ))}
                    </div>
                    {/* Spark bars */}
                    <div className="flex items-end gap-1 h-8 mt-2">
                      {bars.map((b, i) => (
                        <div key={i} className="flex-1 rounded-sm"
                          style={{ height: `${b.height}%`, background: `${accentFrom}${Math.round((0.15 + (i / bars.length) * 0.55) * 255).toString(16).padStart(2, '0')}` }} />
                      ))}
                    </div>
                  </div>

                  {/* Transaction feed */}
                  <div className="px-5 py-3 space-y-2">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Live Transactions</p>
                    {txList.map((tx, i) => {
                      const clr = resolveColor(tx.color_key);
                      return (
                        <div key={`${tx.id}-${i}`}
                          className="flex items-center gap-3 p-2.5 rounded-xl transition-all duration-500"
                          style={{
                            background: i === 0 ? `${clr}0d` : 'rgba(255,255,255,0.02)',
                            border:     `1px solid ${i === 0 ? `${clr}30` : 'rgba(255,255,255,0.04)'}`,
                            opacity:    1 - i * 0.15,
                          }}>
                          <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
                            style={{ background: `${clr}20` }}>
                            <Check size={9} style={{ color: clr }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-slate-400 truncate">{tx.desc}</p>
                            <p className="text-[8px] text-slate-600">{tx.id}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-[10px] font-black text-white">{tx.amount}</p>
                            <p className="text-[8px] font-black" style={{ color: clr }}>{tx.flag}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Compliance strip */}
                  <div className="flex items-center gap-3 px-5 py-3 border-t border-white/[0.05]">
                    {complianceBadges.map((b) => (
                      <div key={b.label} className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06]">
                        <span className="text-[8px] text-slate-500 font-black">{b.label}</span>
                      </div>
                    ))}
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: accentFrom }} />
                      <span className="text-[8px] text-slate-600">{encryptedLabel}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FEATURE CARDS ─────────────────────────────────────────────────── */}
      {sectionVisible('features') && (
        <section className="py-24 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {featureCards.map((item, i) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentFrom}0d` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                    onMouseEnter={e => { (e.currentTarget.style.background = accentFrom); (e.currentTarget.style.color = '#fff'); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = `${accentFrom}1a`); (e.currentTarget.style.color = accentFrom); }}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      {/* ── FISCAL SECTION ────────────────────────────────────────────────── */}
      {sectionVisible('fiscal_section') && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
              <img
                src={fiscalImg}
                alt="Precision Finance"
                className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{fiscalHead}</h2>
              <div className="space-y-8">
                {fiscalPoints.map((point, idx) => {
                  const Icon = resolveIcon(point.icon);
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
      )}

      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      {sectionVisible('cta_banner') && (
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto border rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}40)`,
              borderColor: `${accentFrom}33`,
            }}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHead}</h2>
              <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
              <div className="flex flex-col items-center gap-6">
                <button
                  className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                  style={{ color: accentFrom }}
                  onClick={() => setModalOpen(true)}
                >
                  {ctaBtn}
                </button>
                <div className="flex items-center gap-3 font-mono text-sm tracking-widest" style={{ color: accentFrom }}>
                  <ShieldCheck className="w-4 h-4" />
                  <span>{ctaPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Finance & Commerce"
        productTagline="Automated Ledger"
        accentColor={accentFrom}
      />
      <Footer />
    </main>
  );
}