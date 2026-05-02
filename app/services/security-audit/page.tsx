"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { ShieldAlert, Lock, Terminal, Search, EyeOff, Fingerprint, ArrowRight, ShieldCheck, Binary, Skull } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_SERVICES = JSON.stringify([
  { title: 'Prompt Injection Defense', desc: 'Stress-testing your LLM against jailbreaking, indirect injection, and prompt leakage attacks.',                          icon: 'Terminal' },
  { title: 'Inference Security',       desc: 'Auditing the API endpoints and middleware to prevent model inversion and unauthorized extraction.',                       icon: 'Lock'     },
  { title: 'Data Poisoning Scans',     desc: "Analyzing training pipelines to ensure fine-tuning data hasn't been compromised with backdoors.",                        icon: 'Skull'    },
]);

const DEFAULT_AUDIT_ROWS = JSON.stringify([
  { label: 'Internal Weights Access',   status: 'BLOCKED',      color: 'emerald' },
  { label: 'System Prompt Extraction',  status: 'INTERCEPTED',  color: 'red'     },
  { label: 'Token Exhaustion Attack',   status: 'MITIGATED',    color: 'emerald' },
]);

const DEFAULT_FEATURES = JSON.stringify([
  { icon: 'EyeOff',      label: 'PII Redaction'    },
  { icon: 'Fingerprint', label: 'Weight Integrity'  },
]);

const ICON_MAP: Record<string, React.ElementType> = { Terminal, Lock, Skull, ShieldAlert, Search, EyeOff, Fingerprint, ShieldCheck, Binary };
const COLOR_MAP: Record<string, string> = { emerald: '#34d399', red: '#f87171' };

export default function AISecurityAuditPage() {
  const { get } = usePageContent('services-ai-security-audit');

  const accentColor     = get('hero', 'accent_color',      '#ef4444');
  const badgeText       = get('hero', 'badge_text',        'Offensive & Defensive AI Security');
  const heroPl          = get('hero', 'headline_plain',    'FORTIFY YOUR');
  const heroAcc         = get('hero', 'headline_accent',   'AI BOUNDARY');
  const heroBody        = get('hero', 'body_text',         'Models are the new attack vector. We provide comprehensive security audits, vulnerability assessments, and prompt injection defense to protect your proprietary weights and user data.');
  const heroBtnLabel    = get('hero', 'btn_label',         'Request Penetration Test');
  const scanLabel       = get('hero', 'scan_label',        'SCANNING_VULNERABILITIES...');

  const services        = safeParse<{ title: string; desc: string; icon: string }[]>(get('services', 'items_json', DEFAULT_SERVICES), []);

  const ztPl            = get('zero_trust', 'headline_plain',  'Zero-Trust');
  const ztAcc           = get('zero_trust', 'headline_accent', 'AI Framework');
  const ztBody          = get('zero_trust', 'body_text',       'Standard firewalls don\'t understand LLM intents. We deploy specialized AI Gateways and WAFs designed to interpret and sanitize prompts before they reach your core compute clusters.');
  const auditRows       = safeParse<{ label: string; status: string; color: string }[]>(get('zero_trust', 'audit_rows_json', DEFAULT_AUDIT_ROWS), []);
  const featureItems    = safeParse<{ icon: string; label: string }[]>(get('zero_trust', 'features_json', DEFAULT_FEATURES), []);

  const ctaHeadline     = get('cta', 'headline',   'Hardening Your Innovation');
  const ctaBody         = get('cta', 'body_text',  'Our red-teamers at DLF Cyber City are ready to find your vulnerabilities before the world does.');
  const ctaBtnLabel     = get('cta', 'btn_label',  'START SECURITY AUDIT');
  const ctaPhone        = get('cta', 'phone',      '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10" style={{ background: `${accentColor}0d` }}></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <ShieldAlert className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl} <br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #f97316, ${accentColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {heroAcc}
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">{heroBody}</p>
          <button className="px-10 py-5 text-white rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 mx-auto"
            style={{ background: accentColor }}>
            {heroBtnLabel} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, i) => {
            const Icon = ICON_MAP[item.icon] ?? Terminal;
            return (
              <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: `${accentColor}08` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all" style={{ background: `${accentColor}1a` }}>
                  <Icon className="w-8 h-8" style={{ color: accentColor }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ZERO TRUST */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -inset-10 blur-[100px] rounded-full" style={{ background: `${accentColor}0d` }}></div>
            <div className="relative border border-white/5 rounded-[3rem] p-12 shadow-2xl overflow-hidden" style={{ background: '#050101' }}>
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full animate-ping" style={{ background: accentColor }}></div>
                  <span className="font-mono text-xs tracking-tighter" style={{ color: accentColor }}>{scanLabel}</span>
                </div>
                <Binary className="w-5 h-5 text-gray-700" />
              </div>
              <div className="space-y-4">
                {auditRows.map((row, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-[10px]">
                    <span className="text-gray-400">{row.label}</span>
                    <span className="font-bold" style={{ color: COLOR_MAP[row.color] ?? '#34d399' }}>{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{ztPl} <br />{ztAcc}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{ztBody}</p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {featureItems.map((feat, i) => {
                const Icon = ICON_MAP[feat.icon] ?? EyeOff;
                return (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                    <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    <span className="text-xs font-bold">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <FeatureGrid />

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, #020617)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: 'rgba(254,202,202,0.7)' }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: accentColor }}>
                {ctaBtnLabel}
              </button>
              <div className="font-mono text-sm tracking-widest uppercase" style={{ color: accentColor }}>{ctaPhone}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}