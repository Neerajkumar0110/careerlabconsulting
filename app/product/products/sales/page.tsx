'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Zap, ArrowRight, ShieldCheck, Rocket, X, Mail, User, Send,
  ExternalLink, Layers, Globe, Cpu, Database, BarChart2, Users,
  MessageSquare, TrendingUp, Bot, Brain, Shield, Sparkles,
  CheckCircle, Star, Lock, Settings, Activity, Bell,
} from 'lucide-react';

import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

const B2BPricingSection = dynamic(() => import('@/components/product/B2BPricingSection'), {
  loading: () => <div className="h-96 flex items-center justify-center text-blue-400">Initializing Core...</div>,
  ssr: false,
});

// ─── Icon registry ────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Target, Zap, ShieldCheck, Rocket, Layers, Globe, Cpu, Database,
  BarChart2, Users, MessageSquare, TrendingUp, Bot, Brain, Shield,
  Sparkles, CheckCircle, Star, Lock, Settings, Activity, Bell,
  ExternalLink, ArrowRight,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface StatItem    { value: string; label: string }
interface FeatureItem { icon: string; title: string; desc: string }
interface StepItem    { title: string; desc: string }
interface SpecItem    { icon: string; label: string; detail: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { value: '1.2M+', label: 'Vessels Scanned'      },
  { value: '99.9%', label: 'Warp Velocity'         },
  { value: '500+',  label: 'Systems Integrated'    },
  { value: '4.5x',  label: 'Fuel Efficiency'       },
];

const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'Target',     title: 'Deep Space Target',   desc: 'Identify high-intent buyers in the farthest reaches of the market using AI signals.'          },
  { icon: 'ShieldCheck',title: 'Atmospheric Shield',  desc: 'Bank-grade security layers protecting your CRM data during high-speed transfers.'              },
  { icon: 'Zap',        title: 'Fusion Outreach',     desc: 'Personalized communication that hits like a solar flare. 10x engagement guaranteed.'           },
];

const DEFAULT_STEPS: StepItem[] = [
  { title: 'Scan Market',       desc: 'AI scans millions of companies and buyer signals.'       },
  { title: 'Identify Buyers',   desc: 'Detects high-intent prospects using behavioral data.'    },
  { title: 'Automate Outreach', desc: 'Personalized campaigns launched automatically.'          },
  { title: 'Close Deals',       desc: 'AI guides the lead until conversion.'                    },
];

const DEFAULT_SPECS: SpecItem[] = [
  { icon: 'Cpu',      label: 'AI Core',   detail: 'Neural Engine v4.2'    },
  { icon: 'Database', label: 'Data Pool', detail: '1.2B B2B Nodes'        },
  { icon: 'Globe',    label: 'Reach',     detail: 'Multi-Galaxy Sync'     },
  { icon: 'Layers',   label: 'Stack',     detail: 'Quantum Encryption'    },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
const StarChartModal = ({
  isOpen, onClose, specs, quote, title,
}: {
  isOpen: boolean; onClose: () => void;
  specs: SpecItem[]; quote: string; title: string;
}) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#020617]/90 backdrop-blur-md"
        />
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 40 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#0f172a] border border-blue-500/40 rounded-[2rem] sm:rounded-[3rem] shadow-[0_0_100px_rgba(59,130,246,0.2)] p-6 sm:p-10 max-h-[70vh] sm:max-h-none overflow-y-auto"
        >
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
            <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors"><X /></button>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-black italic text-white mb-6 uppercase tracking-tighter">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {specs.map((spec, i) => {
                const Icon = resolveIcon(spec.icon);
                return (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="text-blue-400"><Icon className="w-5 h-5" /></div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{spec.label}</p>
                      <p className="text-white font-bold">{spec.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-5 sm:p-6 bg-blue-600/10 border border-blue-500/20 rounded-2xl sm:rounded-3xl">
              <p className="text-blue-200 text-sm leading-relaxed italic">"{quote}"</p>
            </div>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const ActionModal = ({
  isOpen, onClose, title, subtitle, btnLabel, whatsappNumber,
}: {
  isOpen: boolean; onClose: () => void;
  title: string; subtitle: string; btnLabel: string; whatsappNumber: string;
}) => {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Mission Protocol Activated*%0A%0A*Action:* ${title}%0A*Commander:* ${formData.name}%0A*Email:* ${formData.email}%0A%0A_Sent via Sales Suite AI Dashboard_`;
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
            className="relative w-full max-w-lg bg-[#0f172a] border border-blue-500/30 p-8 rounded-[2.5rem] shadow-[0_0_80px_rgba(37,99,235,0.25)]"
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600/10 rounded-3xl flex items-center justify-center mb-6 mx-auto border border-blue-500/20">
                <Rocket className="w-10 h-10 text-blue-400 animate-pulse" />
              </div>
              <h3 className="text-4xl font-black italic tracking-tighter mb-2 uppercase text-white">{title}</h3>
              <p className="text-slate-400 mb-8 font-medium text-sm">{subtitle}</p>
              <form className="space-y-4 text-left" onSubmit={handleSubmit}>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400" />
                  <input required type="text" placeholder="Commander Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-400" />
                  <input required type="email" placeholder="Email Address" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-4 outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" />
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-600/20">
                  {btnLabel} <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const ModuleCard = ({ icon, title, desc, accentColor }: { icon: string; title: string; desc: string; accentColor: string }) => {
  const Icon = resolveIcon(icon);
  return (
    <motion.div
      whileHover={{ y: -12 }}
      className="p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl group hover:border-blue-500/30 transition-all"
    >
      <div className="mb-10 w-16 h-16 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-2xl group-hover:text-white transition-all shadow-inner"
        style={{ ['--hover-bg' as string]: accentColor }}
        onMouseEnter={e => (e.currentTarget.style.background = `${accentColor}33`)}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(59,130,246,0.1)')}
      >
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-lg">{desc}</p>
    </motion.div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SalesSuitePage() {
  const [modalType, setModalType] = useState<string | null>(null);
  const [isChartOpen, setIsChartOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { get, content } = usePageContent('sales-suite');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroBadgeText   = get('hero', 'badge_text',      'Live Telemetry Active');
  const heroHead1       = get('hero', 'headline_1',      'Scale Beyond');
  const heroHead2       = get('hero', 'headline_2',      'Atmosphere');
  const heroBtn1Label   = get('hero', 'btn_1_label',     'Initiate Mission');
  const heroBtn2Label   = get('hero', 'btn_2_label',     'View Star Chart');
  const heroAccentFrom  = get('hero', 'accent_from',     '#3b82f6');
  const heroAccentTo    = get('hero', 'accent_to',       '#818cf8');

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statsRaw = get('stats', 'items_json', JSON.stringify(DEFAULT_STATS));
  const stats    = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresHead   = get('features', 'headline',        'Modules');
  const featuresAccent = get('features', 'headline_accent', 'Arsenal');
  const featuresRaw    = get('features', 'items_json',      JSON.stringify(DEFAULT_FEATURES));
  const features       = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  // ── How It Works ──────────────────────────────────────────────────────────
  const howHead    = get('how_it_works', 'headline',    'How The Engine Works');
  const howSubhead = get('how_it_works', 'subheading',  'Our AI powered pipeline scans, qualifies and converts B2B leads automatically.');
  const stepsRaw   = get('how_it_works', 'items_json',  JSON.stringify(DEFAULT_STEPS));
  const steps      = safeParse<StepItem[]>(stepsRaw, DEFAULT_STEPS);

  // ── Star Chart Modal ───────────────────────────────────────────────────────
  const chartTitle = get('star_chart', 'title',  'Sales Suite Architecture');
  const chartQuote = get('star_chart', 'quote',  'The Star Chart represents our proprietary mapping of the B2B landscape. It uses real-time telemetry to identify revenue clusters before your competitors even scan the sector.');
  const specsRaw   = get('star_chart', 'specs_json', JSON.stringify(DEFAULT_SPECS));
  const specs      = safeParse<SpecItem[]>(specsRaw, DEFAULT_SPECS);

  // ── Action Modal ───────────────────────────────────────────────────────────
  const modalTitle      = get('action_modal', 'title',          'Initiate Mission');
  const modalSubtitle   = get('action_modal', 'subtitle',       'Transmit coordinates to the Command Center.');
  const modalBtnLabel   = get('action_modal', 'btn_label',      'Launch Sequence');
  const whatsappNumber  = get('action_modal', 'whatsapp_number','918700236923');

  // ── CTA Banner ─────────────────────────────────────────────────────────────
  const ctaHead    = get('cta_banner', 'headline',  'Ready for Lift-Off?');
  const ctaBtn     = get('cta_banner', 'btn_label', 'CLAIM YOUR COMMAND');
  const ctaAccentFrom = get('cta_banner', 'accent_from', '#050a24');
  const ctaAccentTo   = get('cta_banner', 'accent_to',   '#020617');

  const gradientText: React.CSSProperties = {
    backgroundImage: `linear-gradient(to bottom, white, ${heroAccentFrom}, ${heroAccentTo})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  return (
    <>
      <Head>
        <title>Sales Suite AI | Interstellar Revenue Growth</title>
      </Head>

      <main className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden selection:bg-blue-500/30">
        <Navbar />

        <ActionModal
          isOpen={!!modalType}
          onClose={() => setModalType(null)}
          title={modalTitle}
          subtitle={modalSubtitle}
          btnLabel={modalBtnLabel}
          whatsappNumber={whatsappNumber}
        />
        <StarChartModal
          isOpen={isChartOpen}
          onClose={() => setIsChartOpen(false)}
          specs={specs}
          quote={chartQuote}
          title={chartTitle}
        />

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        {sectionVisible('hero') && (
          <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
            <div className="absolute inset-0 z-0 stars-container opacity-40" />
            <div className="max-w-7xl mx-auto relative z-10 text-center">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="inline-flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-md mb-10"
                style={{ background: `${heroAccentFrom}1a`, border: `1px solid ${heroAccentFrom}33` }}
              >
                <div className="w-2 h-2 rounded-full animate-ping" style={{ background: heroAccentFrom }} />
                <span className="text-xs font-bold tracking-[0.3em] uppercase" style={{ color: heroAccentFrom }}>{heroBadgeText}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tighter italic uppercase leading-[0.85] text-white"
              >
                {heroHead1} <br />
                <span style={gradientText}>{heroHead2}</span>
              </motion.h1>

              <div className="flex flex-col sm:flex-row gap-6 justify-center mt-12">
                <button
                  onClick={() => setModalType('mission')}
                  className="group relative px-10 py-6 rounded-2xl font-black text-md transition-all hover:scale-105 flex items-center gap-3"
                  style={{
                    background: heroAccentFrom,
                    boxShadow: `0 0 50px ${heroAccentFrom}66`,
                  }}
                >
                  {heroBtn1Label} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setIsChartOpen(true)}
                  className="px-10 py-6 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl font-bold text-md hover:bg-white/10 transition-all flex items-center gap-3"
                >
                  {heroBtn2Label} <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-20 warp-lines" />
          </section>
        )}

        {/* ── STATS ─────────────────────────────────────────────────────── */}
        {sectionVisible('stats') && (
          <section className="py-24 border-y border-white/5 bg-slate-950/50 backdrop-blur-md relative z-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center text-white">
              {stats.map((s, i) => (
                <div key={i}>
                  <div className="text-4xl md:text-6xl font-black mb-2">{s.value}</div>
                  <div className="text-blue-500/60 text-xs font-bold tracking-[0.3em] uppercase">{s.label}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FEATURES ──────────────────────────────────────────────────── */}
        {sectionVisible('features') && (
          <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-5xl font-black tracking-tight mb-4">
                {featuresHead}{' '}
                <span
                  className="italic"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${heroAccentFrom}, ${heroAccentTo})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {featuresAccent}
                </span>
              </h2>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <ModuleCard key={i} icon={f.icon} title={f.title} desc={f.desc} accentColor={heroAccentFrom} />
              ))}
            </div>
          </section>
        )}

        {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
        {sectionVisible('how_it_works') && (
          <section className="py-32 px-6 bg-slate-950/40">
            <div className="max-w-7xl mx-auto text-center mb-20">
              <h2 className="text-5xl font-black tracking-tight mb-6">{howHead}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{howSubhead}</p>
            </div>
            <div className="grid md:grid-cols-4 gap-10 max-w-7xl mx-auto">
              {steps.map((step, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-3xl border border-white/10">
                  <div className="font-black text-3xl mb-4" style={{ color: heroAccentFrom }}>{i + 1}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <TrustedIntegration />

        {/* ── PRICING ───────────────────────────────────────────────────── */}
        <section id="pricing" className="py-20 relative z-10">
          <B2BPricingSection />
        </section>

        {/* ── CTA BANNER ────────────────────────────────────────────────── */}
        {sectionVisible('cta_banner') && (
          <section className="py-32 px-6">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden border border-blue-500/20 shadow-[0_0_100px_rgba(37,99,235,0.1)]"
              style={{ background: `linear-gradient(to bottom right, ${ctaAccentFrom}, ${ctaAccentTo})` }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent opacity-50" />
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-10 italic tracking-tighter text-white uppercase leading-none text-center">
                  {ctaHead}
                </h2>
                <button
                  onClick={() => setModalType('command')}
                  className="bg-white text-slate-950 px-16 py-7 rounded-[2rem] font-black text-2xl hover:bg-blue-400 hover:text-white transition-all shadow-2xl active:scale-95"
                >
                  {ctaBtn}
                </button>
              </div>
            </motion.div>
          </section>
        )}

        <CTAModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          productName="Sales Suite"
          productTagline="AI Lead Conversions"
          accentColor="#4f46e5"
        />
        <Footer />
      </main>

      <style jsx global>{`
        .stars-container {
          background-image:
            radial-gradient(1.5px 1.5px at 20px 30px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 150px 150px, #fff, rgba(0,0,0,0));
          background-size: 300px 300px;
          animation: spaceRotate 200s linear infinite;
        }
        @keyframes spaceRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .warp-lines {
          background: repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 98%,
            rgba(59,130,246,0.03) 98%,
            rgba(59,130,246,0.03) 100%
          );
          background-size: 100px 100%;
          animation: warp 1.5s linear infinite;
        }
        @keyframes warp { 0% { opacity: 0.2; } 50% { opacity: 0.5; } 100% { opacity: 0.2; } }
      `}</style>
    </>
  );
}