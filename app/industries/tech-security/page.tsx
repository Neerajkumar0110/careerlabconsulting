// app/industry/tech-security/page.tsx
'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { ShieldAlert, EyeOff, Lock, Radar, Terminal, Fingerprint, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

interface FeatureCard  { title: string; desc: string; icon: string }
interface AlertItem    { label: string; type: string }
interface DetailPoint  { title: string; desc: string; icon: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = { Radar, Activity, Fingerprint, Lock, ShieldCheck, ShieldAlert, Terminal, Zap };

const ALERT_STYLES: Record<string, { bg: string; border: string; icon: React.ElementType; iconColor: string }> = {
  danger:  { bg: 'bg-red-500/5',     border: 'border-red-500/10',   icon: ShieldAlert, iconColor: 'text-red-500'    },
  success: { bg: 'bg-emerald-500/5', border: 'border-emerald-500/10',icon: ShieldCheck, iconColor: 'text-emerald-400'},
  info:    { bg: 'bg-white/5',       border: 'border-white/5',       icon: Terminal,    iconColor: 'text-gray-400'   },
};

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'AI Threat Hunting',      desc: 'Deploying autonomous agents that scan logs and network traffic to identify zero-day vulnerabilities.', icon: 'Radar'       },
  { title: 'Smart SOC Automation',   desc: 'Automating 90% of Level 1/2 triage using LLMs that can interpret alerts and suggest remediation.',    icon: 'Activity'    },
  { title: 'Adversarial AI Defense', desc: 'Hardening your models against prompt injection, model inversion, and membership inference attacks.',   icon: 'Fingerprint' },
]);
const DEFAULT_MONITOR_ALERTS = JSON.stringify([
  { label: 'ANOMALY DETECTED: IP_192.168.1.105',          type: 'danger'  },
  { label: 'AI REMEDIATION: PORT_ISOLATED (9ms latency)', type: 'success' },
  { label: 'THREAT SUMMARY: SQL Injection blocked',       type: 'info'    },
]);
const DEFAULT_DETAIL_POINTS = JSON.stringify([
  { title: 'Zero-Trust AI',        desc: 'Continuous model verification.',  icon: 'Lock'        },
  { title: 'Automated Compliance', desc: 'SOC2/FedRAMP mapping.',          icon: 'ShieldCheck' },
]);

export default function TechSecurityIndustryPage() {
  const { get } = usePageContent('industry-tech-security');

  const badgeText    = get('hero', 'badge_text',      'Offensive & Defensive AI Engineering');
  const heroPl       = get('hero', 'headline_plain',  'AUTONOMOUS');
  const heroAcc      = get('hero', 'headline_accent', 'CYBER DEFENSE');
  const heroBody     = get('hero', 'body_text',       'The perimeter is moving. We help security companies build AI models capable of real-time anomaly detection.');
  const ctaLabel     = get('hero', 'cta_label',       'Request Security Audit');
  const accentColor  = get('hero', 'accent_color',    '#ef4444');
  const accentColor2 = get('hero', 'accent_color_2',  '#991b1b');

  const featureCards = safeParse<FeatureCard[]>(get('features', 'items_json', DEFAULT_FEATURE_CARDS), []);

  const monitorPl    = get('monitor', 'headline_plain',     'Defend at');
  const monitorAcc   = get('monitor', 'headline_accent',    'Machine Speed');
  const monitorBody  = get('monitor', 'body_text',          'Human-only security teams cannot keep up with AI-powered attacks.');
  const panelLabel   = get('monitor', 'panel_label',        'Secure_Node_Monitor: ACTIVE');
  const alerts       = safeParse<AlertItem[]>(get('monitor', 'alerts_json', DEFAULT_MONITOR_ALERTS), []);
  const detailPoints = safeParse<DetailPoint[]>(get('monitor', 'detail_points_json', DEFAULT_DETAIL_POINTS), []);

  const ctaHeadline  = get('cta', 'headline',  'Hardening The Frontier');
  const ctaBody      = get('cta', 'body_text', 'Our security-focused AI engineers at DLF Cyber City are ready to harden your defensive architecture.');
  const ctaBtnLabel  = get('cta', 'btn_label', 'Secure My Stack');
  const ctaLocation  = get('cta', 'location',  'Red Team Location: Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}0d` }} />
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <ShieldAlert className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            {heroPl}<br />
            <span className="text-transparent bg-clip-text italic"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #a1a1aa, ${accentColor2})` }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}33` }}>
              {ctaLabel} <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Radar;
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
      </section>

      {/* ── MONITOR SECTION ──────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 rounded-full blur-[100px] pointer-events-none" style={{ background: `${accentColor}0d` }} />
            <div className="relative bg-[#050101] border border-white/10 rounded-3xl p-8 shadow-2xl font-mono">
              <div className="flex items-center gap-2 mb-6" style={{ color: accentColor }}>
                <Terminal className="w-4 h-4" />
                <span className="text-[10px] uppercase tracking-widest">{panelLabel}</span>
              </div>
              <div className="space-y-4">
                {alerts.map((alert, i) => {
                  const style = ALERT_STYLES[alert.type] ?? ALERT_STYLES.info;
                  const AlertIcon = style.icon;
                  return (
                    <div key={i} className={`p-3 rounded-lg border flex justify-between items-center ${style.bg} ${style.border} ${alert.type === 'danger' ? 'animate-pulse' : ''}`}>
                      <span className="text-[10px] text-gray-500 tracking-tighter">{alert.label}</span>
                      <AlertIcon className={`w-3 h-3 ${style.iconColor}`} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">
              {monitorPl}<br />{monitorAcc}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{monitorBody}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {detailPoints.map((pt, i) => {
                const Icon = ICON_MAP[pt.icon] ?? ShieldCheck;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <Icon className="shrink-0 mt-1" style={{ color: accentColor }} />
                    <div>
                      <h4 className="font-bold text-sm">{pt.title}</h4>
                      <p className="text-xs text-gray-500">{pt.desc}</p>
                    </div>
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
          style={{ background: `linear-gradient(to bottom right, ${accentColor2}66, #000)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(254,202,202,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl text-white"
                style={{ background: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaLocation}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}