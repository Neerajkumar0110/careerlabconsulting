"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { HeartHandshake, ShieldAlert, Scale, Eye, Lock, Zap, ArrowRight, ClipboardCheck, SearchCode } from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const DEFAULT_SERVICES = JSON.stringify([
  { title: 'Toxicity Filtering',   desc: 'Rigorous testing of output filters to prevent the generation of hate speech, harassment, or dangerous content.', icon: 'ShieldAlert' },
  { title: 'Bias Mitigation',      desc: 'Identifying and neutralizing systemic biases in model responses to ensure fair outcomes for all users.',         icon: 'Scale'       },
  { title: 'Constitutional AI',    desc: "Implementing secondary 'critic' models that evaluate and correct outputs based on your specific safety guidelines.", icon: 'ClipboardCheck' },
]);

const DEFAULT_GUARDRAIL_POINTS = JSON.stringify([
  { icon: 'Lock',       label: 'Dynamic Content Redaction'  },
  { icon: 'SearchCode', label: 'Automated Jailbreak Testing' },
  { icon: 'Eye',        label: 'Explainability Reports'     },
]);

const DEFAULT_METRICS = JSON.stringify([
  { label: 'Ethical Alignment', value: '98.4%', width: 98  },
  { label: 'Neutrality Bias',   value: 'Low Risk', width: 15 },
]);

const ICON_MAP: Record<string, React.ElementType> = { HeartHandshake, ShieldAlert, Scale, ClipboardCheck, Lock, SearchCode, Eye, Zap };

export default function AISafetyTestingPage() {
  const { get } = usePageContent('services-ai-safety-testing');

  const accentColor    = get('hero', 'accent_color',    '#10b981');
  const badgeText      = get('hero', 'badge_text',      'Alignment & Ethical Guardrails');
  const heroPl         = get('hero', 'headline_plain',  'ALIGNED');
  const heroAcc        = get('hero', 'headline_accent', 'AI SAFETY');
  const heroBody       = get('hero', 'body_text',       'Ensuring your AI remains a helpful ally. We specialize in stress-testing models for behavioral alignment, toxicity mitigation, and ethical decision-making frameworks.');
  const heroBtnLabel   = get('hero', 'btn_label',       'Run Safety Assessment');

  const services       = safeParse<{ title: string; desc: string; icon: string }[]>(get('services', 'items_json', DEFAULT_SERVICES), []);

  const guardPl        = get('guardrails', 'headline_plain',    'Behavioral');
  const guardAcc       = get('guardrails', 'headline_accent',   'Guardrails');
  const guardBody      = get('guardrails', 'body_text',         'We deploy real-time monitoring layers that act as a "moral compass" for your LLM. By using RLHF audits, we ensure the model\'s goals never drift from yours.');
  const policyLabel    = get('guardrails', 'policy_label',      'Safety_Policy_v2.0');
  const logText        = get('guardrails', 'log_text',          '"Unsafe prompt detected. Rerouting to Constitutional Safety Layer..."');
  const guardrailItems = safeParse<{ icon: string; label: string }[]>(get('guardrails', 'items_json', DEFAULT_GUARDRAIL_POINTS), []);
  const metrics        = safeParse<{ label: string; value: string; width: number }[]>(get('guardrails', 'metrics_json', DEFAULT_METRICS), []);

  const ctaHeadline    = get('cta', 'headline',   'Safety by Design');
  const ctaBody        = get('cta', 'body_text',  'Our safety engineers at DLF Cyber City help brands deploy AI without the risk of reputational damage.');
  const ctaBtnLabel    = get('cta', 'btn_label',  'START SAFETY AUDIT');
  const ctaLocation    = get('cta', 'location',   'Sector 24, Gurugram, India');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[120px] -z-10" style={{ background: `${accentColor}0d` }}></div>
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
            <HeartHandshake className="w-4 h-4" style={{ color: accentColor }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {heroPl} <br />
            <span className="italic" style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #14b8a6, #3b82f6)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
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
            const Icon = ICON_MAP[item.icon] ?? ShieldAlert;
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

      {/* GUARDRAILS */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">{guardPl} <br />{guardAcc}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{guardBody}</p>
            <div className="space-y-4 pt-8">
              {guardrailItems.map((point, idx) => {
                const Icon = ICON_MAP[point.icon] ?? Lock;
                return (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 transition-all"
                    onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}80`)}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                    <Icon style={{ color: accentColor }} />
                    <span className="font-bold">{point.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 blur-[100px] rounded-full" style={{ background: `${accentColor}0d` }}></div>
            <div className="relative border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden" style={{ background: '#03081a' }}>
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" style={{ color: accentColor }} />
                  <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{policyLabel}</span>
                </div>
                <div className="text-[10px] font-bold font-mono" style={{ color: accentColor }}>ENFORCING</div>
              </div>
              <div className="space-y-6">
                {metrics.map((m, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{m.label}</span>
                      <span style={{ color: accentColor }}>{m.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${m.width}%`, background: accentColor }}></div>
                    </div>
                  </div>
                ))}
                <div className="mt-8 p-4 rounded-xl bg-white/5 border border-dashed border-white/20">
                  <p className="text-[10px] text-gray-500 font-mono">SYSTEM_LOG:</p>
                  <p className="text-xs font-mono mt-1 italic" style={{ color: `${accentColor}cc` }}>{logText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5"><ExecutionFlow /></div>
      <FeatureGrid />

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}1a, #1e3a5f33)`, borderColor: `${accentColor}33` }}>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">{ctaHeadline}</h2>
            <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto" style={{ color: `${accentColor}b3` }}>{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl" style={{ color: '#022c22' }}>
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