'use client';

import React from 'react';
import {
  Stethoscope,
  Video,
  ClipboardList,
  Brain,
  ShieldCheck,
  Activity,
  ArrowRight,
  HeartPulse,
  Microscope,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

interface FeatureCard { title: string; desc: string; icon: string }
interface TrustBadge  { label: string; icon: string }
interface StatItem    { value: string; label: string }

const ICON_MAP: Record<string, React.ElementType> = {
  ClipboardList, Brain, Activity, ShieldCheck, Microscope, HeartPulse, Video, Stethoscope,
};

const DEFAULT_FEATURES = JSON.stringify([
  { title: 'AI Scribe & EHR',  desc: 'Automated medical transcription that extracts symptoms and prescriptions from doctor-patient audio to update EHRs instantly.',          icon: 'ClipboardList' },
  { title: 'Virtual Triage',   desc: 'Intelligent patient intake bots that use medical-grade NLP to assess urgency and route patients to the correct specialty.',              icon: 'Brain'          },
  { title: 'RPM Monitoring',   desc: 'Remote Patient Monitoring (RPM) tools that analyze wearable data to alert doctors of cardiac or diabetic anomalies in real-time.',      icon: 'Activity'       },
]);
const DEFAULT_TRUST_BADGES = JSON.stringify([
  { label: 'HIPAA/GDPR Secure',   icon: 'ShieldCheck' },
  { label: 'FDA-Aligned Models',  icon: 'Microscope'  },
]);
const DEFAULT_STATS = JSON.stringify([
  { value: '99.4%', label: 'Transcription Accuracy' },
  { value: '<2s',   label: 'Triage Response Time'   },
]);

export default function HealthTelePage() {
  const { get } = usePageContent('industry-health-tele');

  // Hero
  const accentFrom      = get('hero', 'accent_from',       '#06b6d4');
  const accentTo        = get('hero', 'accent_to',         '#10b981');
  const badgeText       = get('hero', 'badge_text',        'Clinical AI & Remote Care Vertical');
  const heroPl          = get('hero', 'headline_plain',    'REMOTE');
  const heroAcc         = get('hero', 'headline_accent',   'DIAGNOSTICS');
  const heroBody        = get('hero', 'body_text',         'Bridging the gap between clinic and home. We build HIPAA-compliant AI systems for remote patient monitoring, automated clinical documentation, and real-time diagnostic assistance.');
  const heroBtnLabel    = get('hero', 'btn_label',         'Launch Health Solution');
  const heroImageUrl    = get('hero', 'hero_image_url',    '');

  // Features
  const featuresPl      = get('features', 'headline_plain',  'Core');
  const featuresAcc     = get('features', 'headline_accent', 'Capabilities');
  const featuresItems   = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURES), []);

  // Precision
  const precisionPl     = get('precision', 'headline_plain',  'Precision');
  const precisionAcc    = get('precision', 'headline_accent', 'Care Architecture');
  const precisionBody   = get('precision', 'body_text',       'We understand that in healthcare, accuracy is not a metric—it\'s a requirement. Our systems are built with medical-grade data encryption, strict HIPAA compliance, and doctor-in-the-loop oversight.');
  const trustBadges     = safeParse<TrustBadge[]>(get('precision', 'trust_badges_json', DEFAULT_TRUST_BADGES), []);
  const stats           = safeParse<StatItem[]>(get('precision', 'stats_json', DEFAULT_STATS), []);

  // CTA
  const ctaHeadline     = get('cta', 'headline',      'Heal Faster With AI');
  const ctaBody         = get('cta', 'body_text',     'Our health-tech engineers at DLF Cyber City are ready to build the future of patient care.');
  const ctaBtnLabel     = get('cta', 'btn_label',     'START MEDICAL BUILD');
  const ctaLocation     = get('cta', 'location_text', 'Clinical Engineering: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentFrom}1a` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
            <Stethoscope className="w-4 h-4" style={{ color: accentFrom }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentFrom }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl} <br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white mx-auto"
            style={{ background: accentFrom }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuresItems.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Activity;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-cyan-500/30 transition-all"
                style={{ background: `${accentFrom}08` }}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all group-hover:opacity-80"
                  style={{ background: `${accentFrom}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentFrom }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PRECISION ─────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Live UI Card */}
          <div className="relative">
            <div className="absolute -inset-10 rounded-full blur-[100px]" style={{ background: `${accentFrom}0d` }} />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" style={{ color: accentFrom }} />
                  <span className="font-mono text-[10px] text-gray-500 uppercase">Live_Consultation_Feed</span>
                </div>
                <HeartPulse className="w-4 h-4 text-emerald-500 animate-pulse" />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl border" style={{ background: `${accentFrom}0d`, borderColor: `${accentFrom}1a` }}>
                  <p className="text-[10px] text-gray-500 uppercase mb-2 italic">Real-time Sentiment & Health Indicators</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-xs font-bold">Vitals: <span className="text-emerald-400">Stable</span></div>
                    <div className="text-xs font-bold">Stress: <span className="text-yellow-400">Elevated</span></div>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-gray-500 uppercase mb-2">AI-Generated Summary</p>
                  <p className="text-[11px] leading-relaxed text-gray-300">
                    Patient reports persistent migraine (LHS) for 48h. Recommend blood pressure check and neurological screening.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {stats.map((s, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                      <p className="text-xl font-black" style={{ color: accentFrom }}>{s.value}</p>
                      <p className="text-[9px] text-gray-500 uppercase mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {precisionPl}<br /><span style={{ color: accentFrom }}>{precisionAcc}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{precisionBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {trustBadges.map((badge, i) => {
                const Icon = ICON_MAP[badge.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Icon style={{ color: accentFrom }} />
                    <span className="text-xs font-bold uppercase tracking-widest">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentFrom}1a, ${accentTo}1a)`, borderColor: `${accentFrom}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(219,234,254,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: '#0e7490' }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentFrom }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}