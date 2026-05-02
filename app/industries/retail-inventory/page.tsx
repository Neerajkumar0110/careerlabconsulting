'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Package, Truck, BarChart3, Zap,
  Warehouse, Search, ArrowRight, Boxes, ClipboardCheck,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface StatBadge   { label: string; icon: string }

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Zap, Truck, Search, Boxes, ClipboardCheck, Package, BarChart3, Warehouse,
};

export default function RetailInventoryPage() {
  const { get } = usePageContent('industry-inventory');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#14b8a6');
  const accentColorTo    = get('hero', 'accent_color_to',  '#3b82f6');
  const badgeText        = get('hero', 'badge_text',       'Autonomous Inventory & Supply Ops');
  const heroPl           = get('hero', 'headline_plain',   'LIQUID');
  const heroAcc          = get('hero', 'headline_accent',  'LOGISTICS');
  const heroBody         = get('hero', 'body_text',        'Eliminate dead stock and stockouts with surgical precision. We build AI-driven inventory engines that synchronize global supply chains with real-time consumer demand.');
  const heroBtnLabel     = get('hero', 'btn_label',        'Optimize My Stock');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresPl    = get('features', 'headline_plain',  'Supply');
  const featuresAcc   = get('features', 'headline_accent', 'Intelligence');
  const featuresItems = safeParse<FeatureCard[]>(get('features', 'items_json', JSON.stringify([
    { title: 'Demand Sensing AI',       desc: 'Beyond historical averages—AI that ingests weather, social trends, and local events to predict SKU-level demand with 95% accuracy.', icon: 'Zap'    },
    { title: 'Automated Replenishment', desc: 'Self-correcting supply chains that automatically trigger purchase orders based on lead times and predicted surges.',                   icon: 'Truck'  },
    { title: 'Computer Vision Audits',  desc: 'Deploying edge AI to monitor warehouse shelves and retail floors, detecting low-stock or misplaced items in real-time.',             icon: 'Search' },
  ])), []);

  // ── Detail ────────────────────────────────────────────────────────────────
  const detailPl    = get('detail', 'headline_plain',  'Zero-Waste');
  const detailAcc   = get('detail', 'headline_accent', 'Fulfillment');
  const detailBody  = get('detail', 'body_text',       'We bridge the "Phygital" gap. By integrating with your ERP and WMS, we transform static inventory data into a dynamic, predictive asset that reduces holding costs by up to 30%.');
  const detailStats = safeParse<StatBadge[]>(get('detail', 'stats_json', JSON.stringify([
    { label: 'Multi-Node Sync',      icon: 'Boxes'         },
    { label: 'Lead Time Prediction', icon: 'ClipboardCheck' },
  ])), []);

  // ── Metrics panel ─────────────────────────────────────────────────────────
  const metricTitle       = get('metrics', 'panel_title',    'Stock_Optimizer_X1');
  const metricStatus      = get('metrics', 'status_label',   'HEALTH_CHECK_OK');
  const metricHealthScore = get('metrics', 'health_score',   '94');
  const metricOverstock   = get('metrics', 'overstock_risk', '0.02%');
  const metricFillRate    = get('metrics', 'fill_rate',      '99.8%');
  const metricActionText  = get('metrics', 'action_text',    '"Regional surge detected in NCR Zone. Re-routing 500 units from Warehouse_A to Micro-Hub_4 to minimize last-mile latency."');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline  = get('cta', 'headline',       'Sync Your Operations');
  const ctaBody      = get('cta', 'body_text',      'Our supply chain engineers at DLF Cyber City are building the nervous system of modern commerce.');
  const ctaBtnLabel  = get('cta', 'btn_label',      'START OPERATIONS AUDIT');
  const ctaLocation  = get('cta', 'location_label', 'Ops Center: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}>
            <Warehouse className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl}<br />
            <span className="italic" style={{
              backgroundImage: `linear-gradient(to right, ${accentColor}, ${accentColorTo})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>{heroAcc}</span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto"
            style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black uppercase tracking-tight text-center mb-12">
            {featuresPl} <span className="italic" style={{ color: accentColor }}>{featuresAcc}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuresItems.map((item, i) => {
              const Icon = FEATURE_ICON_MAP[item.icon] ?? Zap;
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentColor}08` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block" style={{ background: `${accentColor}1a` }}>
                    <Icon className="w-8 h-8" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── DETAIL ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {detailPl}<br />{detailAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{detailBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {detailStats.map((stat, i) => {
                const Icon = FEATURE_ICON_MAP[stat.icon] ?? Boxes;
                return (
                  <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon className="shrink-0" style={{ color: accentColor }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Metrics panel */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}0d`, filter: 'blur(100px)' }} />
            <div className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
              style={{ background: '#020a08' }}>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{metricTitle}</span>
                </div>
                <div className="text-[10px] font-bold animate-pulse tracking-widest" style={{ color: accentColor }}>{metricStatus}</div>
              </div>
              <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-3">Inventory Health Score</p>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ background: accentColor, width: `${metricHealthScore}%` }} />
                    </div>
                    <span className="text-xs font-bold">{metricHealthScore}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border" style={{ background: `${accentColor}0d`, borderColor: `${accentColor}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Overstock Risk</p>
                    <p className="text-xl font-bold text-emerald-400">{metricOverstock}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Fill Rate</p>
                    <p className="text-xl font-bold">{metricFillRate}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px]"
                style={{ background: `${accentColor}0d`, borderColor: `${accentColor}33`, color: `${accentColor}cc` }}>
                <p className="font-bold mb-1 uppercase tracking-widest">Decision Engine:</p>
                <p className="italic">{metricActionText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ backgroundImage: `linear-gradient(to bottom right, ${accentColor}66, #000)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentColor }}>{ctaBtnLabel}</button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}