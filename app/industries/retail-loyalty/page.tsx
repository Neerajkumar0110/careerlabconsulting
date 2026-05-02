'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Trophy, Users, Heart, Zap, Gift,
  PieChart, ArrowRight, Target, Sparkles,
} from 'lucide-react';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface StatBadge   { label: string; icon: string }

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  Target, Gift, Heart, Users, Zap, Sparkles, Trophy, PieChart,
};

export default function RetailLoyaltyPage() {
  const { get } = usePageContent('industry-loyalty');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#f59e0b');
  const accentColorTo    = get('hero', 'accent_color_to',  '#a16207');
  const badgeText        = get('hero', 'badge_text',       'Retention & LTV Maximization Vertical');
  const heroPl           = get('hero', 'headline_plain',   'INFINITE');
  const heroAcc          = get('hero', 'headline_accent',  'RETENTION');
  const heroBody         = get('hero', 'body_text',        'Turn one-time shoppers into lifelong brand advocates. We build AI loyalty ecosystems that predict churn before it happens and deliver hyper-individualized rewards that resonate on an emotional level.');
  const heroBtnLabel     = get('hero', 'btn_label',        'Revolutionize Loyalty');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresPl    = get('features', 'headline_plain',  'Loyalty');
  const featuresAcc   = get('features', 'headline_accent', 'Stack');
  const featuresItems = safeParse<FeatureCard[]>(get('features', 'items_json', JSON.stringify([
    { title: 'Churn Prediction',        desc: 'Machine learning models that identify "at-risk" customers by analyzing subtle shifts in frequency, sentiment, and engagement patterns.', icon: 'Target' },
    { title: 'Behavioral Incentives',   desc: 'Dynamic reward engines that skip generic points in favor of rewards tailored to a users specific lifestyle and buying habits.',          icon: 'Gift'   },
    { title: 'Sentiment Orchestration', desc: 'Using NLP to monitor social and support interactions, automatically triggering "surprise & delight" campaigns for top-tier fans.',       icon: 'Heart'  },
  ])), []);

  // ── Detail ────────────────────────────────────────────────────────────────
  const detailPl    = get('detail', 'headline_plain',  'Emotional');
  const detailAcc   = get('detail', 'headline_accent', 'Intelligence');
  const detailBody  = get('detail', 'body_text',       'We move beyond the "Points-for-Purchase" model. Our AI architectures analyze the psychological drivers behind loyalty, enabling brands to deliver the right incentive at the exact micro-moment it\'s most needed.');
  const detailStats = safeParse<StatBadge[]>(get('detail', 'stats_json', JSON.stringify([
    { label: 'Cohort Analysis AI',   icon: 'Users' },
    { label: 'Real-time Attribution',icon: 'Zap'   },
  ])), []);

  // ── Metrics panel ─────────────────────────────────────────────────────────
  const metricTitle       = get('metrics', 'panel_title',      'LTV_Propensity_Model');
  const metricStatus      = get('metrics', 'status_label',     'Processing...');
  const metricSegment     = get('metrics', 'segment_label',    'Platinum-Active');
  const metricClv         = get('metrics', 'clv_value',        '$12,450');
  const metricRetention   = get('metrics', 'retention_score',  '98.2%');
  const metricReferral    = get('metrics', 'referral_index',   'High');
  const metricActionText  = get('metrics', 'action_text',      'AGENT_LOG: "Triggering personalized early-access invite for upcoming product drop. Probability of conversion: 94.1%"');

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline  = get('cta', 'headline',       'Own The Customer Link');
  const ctaBody      = get('cta', 'body_text',      'Our retention engineers at DLF Cyber City are ready to build the most sophisticated loyalty infrastructure on the market.');
  const ctaBtnLabel  = get('cta', 'btn_label',      'START LOYALTY BUILD');
  const ctaLocation  = get('cta', 'location_label', 'Retention Lab: Gurugram, India');

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
            <Trophy className="w-4 h-4" style={{ color: accentColor }} />
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
              const Icon = FEATURE_ICON_MAP[item.icon] ?? Target;
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
          {/* Metrics panel — left on loyalty page */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full pointer-events-none"
              style={{ background: `${accentColor}0d`, filter: 'blur(100px)' }} />
            <div className="relative border rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono"
              style={{ background: '#0a0701', borderColor: `${accentColor}1a` }}>
              <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest">{metricTitle}</span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: accentColor }}>{metricStatus}</div>
              </div>
              <div className="space-y-8">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[9px] text-gray-500 uppercase mb-4">Customer Segment: "{metricSegment}"</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] text-gray-400">Predicted CLV</p>
                      <p className="text-2xl font-bold" style={{ color: accentColor }}>{metricClv}</p>
                    </div>
                    <PieChart className="w-8 h-8" style={{ color: `${accentColor}66` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border text-center"
                    style={{ background: `${accentColor}0d`, borderColor: `${accentColor}1a` }}>
                    <p className="text-[8px] text-gray-500 uppercase">Retention Score</p>
                    <p className="text-xl font-bold">{metricRetention}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[8px] text-gray-500 uppercase">Referral Index</p>
                    <p className="text-xl font-bold text-emerald-400">{metricReferral}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 p-4 rounded-xl border border-dashed text-[10px] italic"
                style={{ background: `${accentColor}1a`, borderColor: `${accentColor}4d`, color: `${accentColor}cc` }}>
                {metricActionText}
              </div>
            </div>
          </div>

          {/* Text — right */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {detailPl}<br />{detailAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{detailBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {detailStats.map((stat, i) => {
                const Icon = FEATURE_ICON_MAP[stat.icon] ?? Users;
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